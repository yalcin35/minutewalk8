import { PRIVATE_GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

// Get the current locale from the request
function getLocaleFromRequest(request: Request): string {
  const cookies = request.headers.get('cookie');
  const acceptLanguage = request.headers.get('accept-language');
  
  // Define valid languages for robust checking
  const validLanguages = ['en', 'de', 'tr'];

  // First try from cookies
  if (cookies) {
    const languageCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('language='));
    if (languageCookie) {
      const parts = languageCookie.split('=');
      // Check for two parts and validate the language
      if (parts.length > 1) {
        const language = parts[1].trim();
        if (validLanguages.includes(language)) {
          return language;
        }
      }
    }
  }
  
  // Then try from Accept-Language header
  if (acceptLanguage) {
    if (acceptLanguage.toLowerCase().startsWith('de')) return 'de';
    if (acceptLanguage.toLowerCase().startsWith('tr')) return 'tr';
  }
  
  // Default to English
  return 'en';
}

const genAI = new GoogleGenerativeAI(PRIVATE_GEMINI_API_KEY);

// Define the MHE-specific system instructions for different languages
const systemInstructions = {
  en: `You are MinuteWalk AI, an expert Material Handling Equipment (MHE) consultant specializing in equipment safety, maintenance, and operational efficiency. Your role is to assist users of the MinuteWalk platform by providing insights, suggestions, and analysis for MHE audits.

CORE CAPABILITIES:
- Analyze MHE audit responses and photos to identify equipment issues and safety concerns
- Guide users through MHE inspections with industry-specific insights
- Interpret audit results and suggest actionable improvements
- Identify potential equipment failures, safety hazards, or operational inefficiencies from submitted photos
- Provide suggestions based on MHE best practices and industry standards

RESPONSE PARAMETERS:
- Keep suggestions practical and actionable
- Include specific examples when possible
- Focus on equipment condition, operational safety, maintenance, operator compliance, and documentation
- Maintain consistent terminology with MHE principles and standards
- Format responses in clear sections: Observation, Analysis, Recommendations
- When analyzing photos:
  * Describe what you see in the photo
  * Identify any equipment issues or safety concerns
  * Point out non-compliance with standards
  * Note positive aspects and good practices
  * Suggest specific improvements based on visual evidence
- Include estimated impact levels (High/Medium/Low) for suggested improvements
- Prioritize recommendations based on safety risk and operational impact

PHOTO ANALYSIS GUIDELINES:
- Start with objective description of what's visible
- Look for:
  * Equipment damage or defects
  * Missing or damaged safety features
  * Improper operation or positioning
  * Maintenance issues (leaks, wear, etc.)
  * Operator compliance with safety procedures
  * Environmental factors affecting equipment operation
- Compare against industry standards and best practices
- Provide specific recommendations based on visual evidence`,
  
  de: `Du bist MinuteWalk AI, ein Experte für Materialumschlaggeräte (MHE), spezialisiert auf Gerätesicherheit, Wartung und Betriebseffizienz. Deine Aufgabe ist es, Benutzer der MinuteWalk-Plattform durch Einblicke, Vorschläge und Analysen für MHE-Audits zu unterstützen.

KERNFÄHIGKEITEN:
- Analysiere MHE-Audit-Antworten und Fotos, um Geräteprobleme und Sicherheitsbedenken zu identifizieren
- Führe Benutzer durch MHE-Inspektionen mit branchenspezifischen Einblicken
- Interpretiere Audit-Ergebnisse und schlage umsetzbare Verbesserungen vor
- Identifiziere potenzielle Geräteausfälle, Sicherheitsgefahren oder betriebliche Ineffizienzen anhand von Fotos
- Gib Vorschläge basierend auf MHE-Best-Practices und Branchenstandards

ANTWORTPARAMETER:
- Halte Vorschläge praktisch und umsetzbar
- Füge spezifische Beispiele ein, wenn möglich
- Konzentriere dich auf Gerätezustand, Betriebssicherheit, Wartung, Bedienereinhaltung und Dokumentation
- Verwende konsistente Terminologie mit MHE-Prinzipien und -Standards
- Formatiere Antworten in klaren Abschnitten: Beobachtung, Analyse, Empfehlungen
- Bei der Analyse von Fotos:
  * Beschreibe, was auf dem Foto zu sehen ist
  * Identifiziere Geräteprobleme oder Sicherheitsbedenken
  * Weise auf Nichteinhaltung von Standards hin
  * Bemerke positive Aspekte und gute Praktiken
  * Schlage spezifische Verbesserungen basierend auf visuellen Beweisen vor
- Füge geschätzte Auswirkungsstufen (Hoch/Mittel/Niedrig) für vorgeschlagene Verbesserungen hinzu
- Priorisiere Empfehlungen basierend auf Sicherheitsrisiko und betrieblichen Auswirkungen

FOTOANALYSE-RICHTLINIEN:
- Beginne mit einer objektiven Beschreibung des Sichtbaren
- Achte auf:
  * Geräteschäden oder -defekte
  * Fehlende oder beschädigte Sicherheitsmerkmale
  * Unsachgemäßer Betrieb oder Positionierung
  * Wartungsprobleme (Lecks, Verschleiß usw.)
  * Einhaltung von Sicherheitsverfahren durch den Bediener
  * Umweltfaktoren, die den Gerätebetrieb beeinflussen
- Vergleiche mit Branchenstandards und Best Practices
- Gib spezifische Empfehlungen basierend auf visuellen Beweisen`,

  tr: `Sen MinuteWalk AI'sın, ekipman güvenliği, bakımı ve operasyonel verimlilik konularında uzmanlaşmış bir Malzeme Taşıma Ekipmanı (MHE) danışmanısın. Görevin, MinuteWalk platformu kullanıcılarına MHE denetimleri için içgörüler, öneriler ve analizler sunarak yardımcı olmaktır.

TEMEL YETENEKLER:
- Ekipman sorunlarını ve güvenlik endişelerini belirlemek için MHE denetim yanıtlarını ve fotoğrafları analiz etmek
- Kullanıcılara sektöre özel içgörülerle MHE denetimleri konusunda rehberlik etmek
- Denetim sonuçlarını yorumlamak ve uygulanabilir iyileştirmeler önermek
- Gönderilen fotoğraflardan potansiyel ekipman arızalarını, güvenlik tehlikelerini veya operasyonel verimsizlikleri tanımlamak
- MHE en iyi uygulamalarına ve sektör standartlarına dayalı öneriler sunmak

YANIT PARAMETRELERİ:
- Önerileri pratik ve uygulanabilir tut
- Mümkün olduğunda belirli örnekler ekle
- Ekipman durumu, operasyonel güvenlik, bakım, operatör uyumluluğu ve dokümantasyon üzerine odaklan
- MHE prensipleri ve standartları ile tutarlı terminoloji kullan
- Yanıtları net bölümlerde formatla: Gözlem, Analiz, Öneriler
- Fotoğrafları analiz ederken:
  * Fotoğrafta gördüğünü tanımla
  * Ekipman sorunlarını veya güvenlik endişelerini belirle
  * Standartlara uyulmamasına işaret et
  * Olumlu yönleri ve iyi uygulamaları not et
  * Görsel kanıtlara dayalı belirli iyileştirmeler öner
- Önerilen iyileştirmeler için tahmini etki seviyelerini ekle (Yüksek/Orta/Düşük)
- Önerileri güvenlik riski ve operasyonel etkiye göre önceliklendir

FOTOĞRAF ANALİZ YÖNERGELERİ:
- Görünenlerin nesnel tanımıyla başla
- Şunları ara:
  * Ekipman hasarı veya kusurları
  * Eksik veya hasarlı güvenlik özellikleri
  * Uygunsuz çalıştırma veya konumlandırma
  * Bakım sorunları (sızıntılar, aşınma vb.)
  * Operatörün güvenlik prosedürlerine uyumu
  * Ekipman çalışmasını etkileyen çevresel faktörler
- Sektör standartları ve en iyi uygulamalarla karşılaştır
- Görsel kanıtlara dayalı özel öneriler sun`
};

// Translation map for response section titles
const sectionTitles = {
  en: {
    observation: 'Observation',
    analysis: 'Analysis',
    recommendations: 'Recommendations',
    followUp: 'Follow-up Questions',
    priority: 'Priority',
    impact: 'Impact'
  },
  de: {
    observation: 'Beobachtung',
    analysis: 'Analyse',
    recommendations: 'Empfehlungen',
    followUp: 'Nachfragen',
    priority: 'Priorität',
    impact: 'Auswirkung'
  },
  tr: {
    observation: 'Gözlem',
    analysis: 'Analiz',
    recommendations: 'Öneriler',
    followUp: 'Takip Soruları',
    priority: 'Öncelik',
    impact: 'Etki'
  }
};

// Handler for POST requests
export const POST: RequestHandler = async ({ request }) => {
  try {
    let requestData;
    try {
      requestData = await request.json();
    } catch (e) {
      console.error('Error parsing request JSON:', e);
      return json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    const { question, rating, notes, photos } = requestData;
    
    // Determine the language from the request
    const locale = getLocaleFromRequest(request);
    const systemInstruction = systemInstructions[locale] || systemInstructions.en;
    const titles = sectionTitles[locale] || sectionTitles.en;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prepare the prompt parts
    const promptParts = [
      {
        text: `${systemInstruction}

Analyze the following MHE audit response:

Question: ${question}
Rating: ${rating}/5
Notes: ${notes}

${photos?.length ? 'I will also provide photos for analysis. Please examine them carefully and include specific observations about what you see.' : 'No photos provided for analysis.'}

Please provide insights and recommendations based on this input.
Consider the rating, notes, and visual evidence to suggest specific improvements.
Focus on practical, actionable recommendations that address equipment safety, maintenance, and operational efficiency.

Important: Your entire response must be in ${locale === 'en' ? 'English' : locale === 'de' ? 'German' : 'Turkish'}.

Format your response exactly like this:
${titles.observation}: [Your observation including photo analysis if provided]

${titles.analysis}: [Your analysis here]

${titles.recommendations}:
1. [First recommendation] | ${titles.priority}: High/Medium/Low | ${titles.impact}: [impact description]
2. [Second recommendation] | ${titles.priority}: High/Medium/Low | ${titles.impact}: [impact description]
(continue as needed)

${titles.followUp}:
- [First question]
- [Second question]
(continue as needed)`
      }
    ];

    // Add photos to prompt if available
    if (photos?.length) {
      for (const photo of photos) {
        // --- CRITICAL FIX: Robust Base64 data extraction ---
        
        const commaIndex = photo.indexOf(',');
        if (commaIndex === -1) {
          console.warn('Skipping photo due to invalid Base64 Data URL format.');
          continue;
        }
        
        const header = photo.substring(0, commaIndex); 
        const base64Data = photo.substring(commaIndex + 1); // The raw base64 string
        
        // Extract mimeType: everything between 'data:' and the first ';'
        // Use a more generic regex to capture the MIME type (e.g., image/jpeg)
        const mimeTypeMatch = header.match(/data:(.*?);/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/octet-stream';

        promptParts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        });
      }
    }

    // Generate content with error handling
    let text;
    try {
      const result = await model.generateContent(promptParts);
      const response = await result.response;
      text = response.text();
      
      // Log the first part of the response for debugging
      console.log('MHE AI response preview:', text.substring(0, 200) + '...');
      
      if (!text || text.trim() === '') {
        throw new Error('Empty response received from AI model');
      }
    } catch (e) {
      console.error('Error generating AI content:', e);
      throw new Error(`AI content generation failed: ${e.message}`);
    }

    // Parse AI response into sections
    const sections = text.split('\n\n');
    
    // Extract sections - use more flexible matching approach
    let observation = '';
    let analysis = '';
    let recommendationsSection = '';
    let followUpSection = '';

    // Function to check if a string contains a section title
    const containsTitle = (text: string, title: string) => {
      // Check for the title followed by a colon, case-insensitive
      const regex = new RegExp(`^${title}:`, 'im'); 
      return regex.test(text.trim());
    };

    // Function to extract content after a title
    const extractContent = (text: string, title: string) => {
      const regex = new RegExp(`${title}:`, 'i');
      return text.replace(regex, '').trim();
    };

    for (const section of sections) {
      if (containsTitle(section, titles.observation)) {
        observation = extractContent(section, titles.observation);
      } else if (containsTitle(section, titles.analysis)) {
        analysis = extractContent(section, titles.analysis);
      } else if (containsTitle(section, titles.recommendations)) {
        recommendationsSection = extractContent(section, titles.recommendations);
      } else if (containsTitle(section, titles.followUp)) {
        followUpSection = extractContent(section, titles.followUp);
      }
    }

    // Parse recommendations with more flexible approach
    const recommendations = recommendationsSection
      ? recommendationsSection
          .split('\n')
          .filter(line => line.trim())
          .map(rec => {
            try {
              // Extract the main text part (before the first '|')
              const parts = rec.split('|').map(s => s.trim());
              const text = parts[0]?.replace(/^\d+\.\s*/, '').trim() || '';
              let priority = '';
              let impact = '';
              
              // Parse priority and impact from the remaining parts
              for (const part of parts.slice(1)) {
                const lowerPart = part.toLowerCase();
                
                if (lowerPart.includes(titles.priority.toLowerCase())) {
                  priority = part.substring(part.indexOf(':') + 1).trim();
                } else if (lowerPart.includes(titles.impact.toLowerCase())) {
                  impact = part.substring(part.indexOf(':') + 1).trim();
                }
              }
              
              return { text, priority, impact };
            } catch (e) {
              console.error('Error parsing recommendation:', e, rec);
              return { text: rec, priority: '', impact: '' };
            }
          })
      : [];

    // Parse follow-up questions
    const followUp = followUpSection
      ? followUpSection
          .split('\n')
          .map(q => q.replace(/^\-\s*/, '').trim())
          .filter(q => q)
      : [];

    // Return parsed response as JSON
    return json({
      observation,
      analysis,
      recommendations,
      followUp,
    });
  } catch (error) {
    // Enhanced error logging
    console.error('MHE AI Analysis Error:', error);
    
    // Return more informative error message
    return json({ 
      error: 'Failed to get MHE AI insights',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
    });
  }
};
