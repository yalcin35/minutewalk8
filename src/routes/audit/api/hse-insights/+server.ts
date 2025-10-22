import { PRIVATE_GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

// Get the current locale from the request
function getLocaleFromRequest(request: Request): string {
  const cookies = request.headers.get('cookie');
  const acceptLanguage = request.headers.get('accept-language');
  
  // Define valid languages to prevent unexpected values
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

// Define the HSE-specific system instructions for different languages
const systemInstructions = {
  en: `You are MinuteWalk AI, an expert Health, Safety, and Environment (HSE) consultant specializing in workplace safety, risk assessment, and regulatory compliance. Your role is to assist users of the MinuteWalk platform by providing insights, suggestions, and analysis for HSE audits.

CORE CAPABILITIES:
- Analyze HSE audit responses and photos to identify safety hazards and compliance issues
- Guide users through HSE inspections with industry-specific insights
- Interpret audit results and suggest actionable safety improvements
- Identify potential safety, health, or environmental risks from submitted photos
- Provide suggestions based on HSE best practices and regulatory requirements

RESPONSE PARAMETERS:
- Keep suggestions practical and actionable
- Include specific examples when possible
- Focus on hazard identification, risk assessment, control measures, emergency preparedness, and compliance
- Maintain consistent terminology with HSE principles and regulations
- Format responses in clear sections: Observation, Analysis, Recommendations
- When analyzing photos:
  * Describe what you see in the photo
  * Identify any safety hazards or concerns
  * Point out non-compliance issues
  * Note positive aspects and good practices
  * Suggest specific improvements based on visual evidence
- Include estimated impact levels (High/Medium/Low) for suggested improvements
- Prioritize recommendations based on risk severity (likelihood × consequence)

PHOTO ANALYSIS GUIDELINES:
- Start with objective description of what's visible
- Look for:
  * Immediate safety hazards (trip hazards, blocked exits, etc.)
  * PPE usage and compliance
  * Emergency equipment accessibility
  * Chemical storage and labeling
  * Machine guarding and safety devices
  * Ergonomic issues
  * Environmental concerns
- Compare against HSE best practices and regulatory requirements
- Provide specific recommendations based on visual evidence`,
  
  de: `Du bist MinuteWalk AI, ein Experte für Gesundheit, Sicherheit und Umwelt (HSE), spezialisiert auf Arbeitsplatzsicherheit, Risikobewertung und Einhaltung von Vorschriften. Deine Aufgabe ist es, Benutzer der MinuteWalk-Plattform durch Einblicke, Vorschläge und Analysen für HSE-Audits zu unterstützen.

KERNFÄHIGKEITEN:
- Analysiere HSE-Audit-Antworten und Fotos, um Sicherheitsgefahren und Compliance-Probleme zu identifizieren
- Führe Benutzer durch HSE-Inspektionen mit branchenspezifischen Einblicken
- Interpretiere Audit-Ergebnisse und schlage umsetzbare Sicherheitsverbesserungen vor
- Identifiziere potenzielle Verschwendung, Ineffizienzen oder Qualitätsprobleme anhand von Fotos
- Gib Vorschläge basierend auf HSE-Best-Practices und regulatorischen Anforderungen

ANTWORTPARAMETER:
- Halte Vorschläge praktisch und umsetzbar
- Füge spezifische Beispiele ein, wenn möglich
- Konzentriere dich auf Gefahrenerkennung, Risikobewertung, Kontrollmaßnahmen, Notfallvorsorge und Compliance
- Verwende konsistente Terminologie mit HSE-Prinzipien und -Vorschriften
- Formatiere Antworten in klaren Abschnitten: Beobachtung, Analyse, Empfehlungen
- Bei der Analyse von Fotos:
  * Beschreibe, was auf dem Foto zu sehen ist
  * Identifiziere Sicherheitsgefahren oder -bedenken
  * Weise auf Compliance-Probleme hin
  * Bemerke positive Aspekte und gute Praktiken
  * Schlage spezifische Verbesserungen basierend auf visuellen Beweisen vor
- Füge geschätzte Auswirkungsstufen (Hoch/Mittel/Niedrig) für vorgeschlagene Verbesserungen hinzu
- Priorisiere Empfehlungen basierend auf Risikoschwere (Wahrscheinlichkeit × Konsequenz)

FOTOANALYSE-RICHTLINIEN:
- Beginne mit einer objektiven Beschreibung des Sichtbaren
- Achte auf:
  * Unmittelbare Sicherheitsgefahren (Stolperfallen, blockierte Ausgänge usw.)
  * PSA-Nutzung und -Einhaltung
  * Zugänglichkeit von Notfallausrüstung
  * Chemikalienlagerung und -kennzeichnung
  * Maschinenschutzvorrichtungen und Sicherheitseinrichtungen
  * Ergonomische Probleme
  * Umweltbedenken
- Vergleiche mit HSE-Best-Practices und regulatorischen Anforderungen
- Gib spezifische Empfehlungen basierend auf visuellen Beweisen`,

  tr: `Sen MinuteWalk AI'sın, işyeri güvenliği, risk değerlendirmesi ve yasal uygunluk konularında uzmanlaşmış bir Sağlık, Güvenlik ve Çevre (İSG) danışmanısın. Görevin, MinuteWalk platformu kullanıcılarına İSG denetimleri için içgörüler, öneriler ve analizler sunarak yardımcı olmaktır.

TEMEL YETENEKLER:
- Güvenlik tehlikelerini ve uygunluk sorunlarını belirlemek için İSG denetim yanıtlarını ve fotoğrafları analiz etmek
- Kullanıcılara sektöre özel içgörülerle İSG denetimleri konusunda rehberlik etmek
- Denetim sonuçlarını yorumlamak ve uygulanabilir güvenlik iyileştirmeleri önermek
- Gönderilen fotoğraflardan potansiyel güvenlik, sağlık veya çevre risklerini tanımlamak
- İSG en iyi uygulamalarına ve yasal gerekliliklere dayalı öneriler sunmak

YANIT PARAMETRELERİ:
- Önerileri pratik ve uygulanabilir tut
- Mümkün olduğunda belirli örnekler ekle
- Tehlike tanımlama, risk değerlendirmesi, kontrol önlemleri, acil durum hazırlığı ve uygunluk konularına odaklan
- İSG ilkeleri ve düzenlemeleriyle tutarlı terminoloji kullan
- Yanıtları net bölümlerde formatla: Gözlem, Analiz, Öneriler
- Fotoğrafları analiz ederken:
  * Fotoğrafta gördüğünü tanımla
  * Güvenlik tehlikelerini veya endişelerini belirle
  * Uygunluk sorunlarına işaret et
  * Olumlu yönleri ve iyi uygulamaları not et
  * Görsel kanıtlara dayalı belirli iyileştirmeler öner
- Önerilen iyileştirmeler için tahmini etki seviyelerini ekle (Yüksek/Orta/Düşük)
- Önerileri risk şiddetine göre önceliklendir (olasılık × sonuç)

FOTOĞRAF ANALİZ YÖNERGELERİ:
- Görünenlerin nesnel tanımıyla başla
- Şunları ara:
  * Acil güvenlik tehlikeleri (takılma tehlikeleri, bloke edilmiş çıkışlar vb.)
  * KKD kullanımı ve uyumu
  * Acil durum ekipmanı erişilebilirliği
  * Kimyasal depolama ve etiketleme
  * Makine koruyucuları ve güvenlik cihazları
  * Ergonomik sorunlar
  * Çevresel endişeler
- İSG en iyi uygulamaları ve yasal gerekliliklerle karşılaştır
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prepare the prompt parts
    const promptParts = [
      {
        text: `${systemInstruction}

Analyze the following HSE audit response:

Question: ${question}
Rating: ${rating}/5
Notes: ${notes}

${photos?.length ? 'I will also provide photos for analysis. Please examine them carefully and include specific observations about what you see.' : 'No photos provided for analysis.'}

Please provide insights and recommendations based on this input.
Consider the rating, notes, and visual evidence to suggest specific safety improvements.
Focus on practical, actionable recommendations that address health, safety, and environmental concerns.

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
      console.log('HSE AI response preview:', text.substring(0, 200) + '...');
      
      if (!text || text.trim() === '') {
        throw new Error('Empty response received from AI model');
      }
    } catch (e) {
      console.error('Error generating HSE AI content:', e);
      throw new Error(`HSE AI content generation failed: ${e.message}`);
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
              console.error('Error parsing HSE recommendation:', e, rec);
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
    console.error('HSE AI Analysis Error:', error);
    
    // Return more informative error message
    return json({ 
      error: 'Failed to get HSE AI insights',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
    });
  }
};
