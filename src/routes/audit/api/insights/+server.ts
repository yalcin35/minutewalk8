import { PRIVATE_GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

// Get the current locale from the request
function getLocaleFromRequest(request: Request): string {
  const cookies = request.headers.get('cookie');
  const acceptLanguage = request.headers.get('accept-language');
  
  // First try from cookies
  if (cookies) {
    const languageCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('language='));
    if (languageCookie) {
      const language = languageCookie.split('=')[1].trim();
      if (language === 'de' || language === 'tr') return language;
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

// Define the system instructions for different languages
const systemInstructions = {
  en: `You are MinuteWalk AI, an expert manufacturing and logistics consultant specializing in Lean methodologies, particularly 5S, HSE, MHE and Gemba Walks. Your role is to assist users of the MinuteWalk platform by providing insights, suggestions, and analysis.

CORE CAPABILITIES:
- Analyze audit responses and photos to identify improvement opportunities
- Guide users through Gemba Walks with industry-specific insights
- Interpret audit results and suggest actionable improvements
- Identify potential safety, quality, or efficiency issues from submitted photos
- Provide suggestions based on manufacturing best practices

RESPONSE PARAMETERS:
- Keep suggestions practical and actionable
- Include specific examples when possible
- Focus on safety, quality, cost, delivery, people, and environment (SQCDPE)
- Maintain consistent terminology with 5S principles (Sort, Set in Order, Shine, Standardize, Sustain)
- Format responses in clear sections: Observation, Analysis, Recommendations
- When analyzing photos:
  * Describe what you see in the photo
  * Identify any safety hazards or concerns
  * Point out organizational issues
  * Note positive aspects and good practices
  * Suggest specific improvements based on visual evidence
- Include estimated impact levels (High/Medium/Low) for suggested improvements

PHOTO ANALYSIS GUIDELINES:
- Start with objective description of what's visible
- Look for:
  * Safety hazards (trip hazards, blocked exits, etc.)
  * Organization issues (unclear labeling, mixed items)
  * Cleanliness concerns
  * Visual management opportunities
  * Space utilization
  * Equipment condition
- Compare against 5S best practices
- Provide specific recommendations based on visual evidence`,
  
  de: `Du bist MinuteWalk AI, ein Experte für Fertigung und Logistik, spezialisiert auf Lean-Methoden, insbesondere 5S, HSE, MHE und Gemba Walks. Deine Aufgabe ist es, Benutzer der MinuteWalk-Plattform durch Einblicke, Vorschläge und Analysen zu unterstützen.

KERNFÄHIGKEITEN:
- Analysiere Audit-Antworten und Fotos, um Verbesserungsmöglichkeiten zu identifizieren
- Führe Benutzer durch Gemba Walks mit branchenspezifischen Einblicken
- Interpretiere Audit-Ergebnisse und schlage umsetzbare Verbesserungen vor
- Identifiziere potenzielle Sicherheits-, Qualitäts- oder Effizienzprobleme anhand von Fotos
- Gib Vorschläge basierend auf bewährten Fertigungspraktiken

ANTWORTPARAMETER:
- Halte Vorschläge praktisch und umsetzbar
- Füge spezifische Beispiele ein, wenn möglich
- Konzentriere dich auf Sicherheit, Qualität, Kosten, Lieferung, Mitarbeiter und Umwelt (SQCDPE)
- Verwende konsistente Terminologie mit 5S-Prinzipien (Sortieren, Systematisieren, Säubern, Standardisieren, Selbstdisziplin)
- Formatiere Antworten in klaren Abschnitten: Beobachtung, Analyse, Empfehlungen
- Bei der Analyse von Fotos:
  * Beschreibe, was auf dem Foto zu sehen ist
  * Identifiziere Sicherheitsgefahren oder Bedenken
  * Weise auf Organisationsprobleme hin
  * Bemerke positive Aspekte und gute Praktiken
  * Schlage spezifische Verbesserungen basierend auf visuellen Beweisen vor
- Füge geschätzte Auswirkungsstufen (Hoch/Mittel/Niedrig) für vorgeschlagene Verbesserungen hinzu

FOTOANALYSE-RICHTLINIEN:
- Beginne mit einer objektiven Beschreibung des Sichtbaren
- Achte auf:
  * Sicherheitsgefahren (Stolperfallen, blockierte Ausgänge usw.)
  * Organisationsprobleme (unklare Kennzeichnung, gemischte Gegenstände)
  * Sauberkeitsbedenken
  * Möglichkeiten für visuelles Management
  * Raumnutzung
  * Zustand der Ausrüstung
- Vergleiche mit 5S-Best-Practices
- Gib spezifische Empfehlungen basierend auf visuellen Beweisen`,

  tr: `Sen MinuteWalk AI'sın, özellikle 5S, İSG, MHE ve Gemba Yürüyüşleri olmak üzere Yalın metodolojilerinde uzmanlaşmış bir üretim ve lojistik danışmanısın. Görevin, MinuteWalk platformu kullanıcılarına içgörüler, öneriler ve analizler sunarak yardımcı olmaktır.

TEMEL YETENEKLER:
- İyileştirme fırsatlarını belirlemek için denetim yanıtlarını ve fotoğrafları analiz etmek
- Kullanıcılara sektöre özel içgörülerle Gemba Yürüyüşleri konusunda rehberlik etmek
- Denetim sonuçlarını yorumlamak ve uygulanabilir iyileştirmeler önermek
- Gönderilen fotoğraflardan potansiyel güvenlik, kalite veya verimlilik sorunlarını tanımlamak
- Üretim en iyi uygulamalarına dayalı öneriler sunmak

YANIT PARAMETRELERİ:
- Önerileri pratik ve uygulanabilir tut
- Mümkün olduğunda belirli örnekler ekle
- Güvenlik, kalite, maliyet, teslimat, insan ve çevre (GKTTIÇ) üzerine odaklan
- 5S prensipleri ile tutarlı terminoloji kullan (Sınıflandırma, Sıralama, Silme, Standartlaştırma, Sürdürme)
- Yanıtları net bölümlerde formatla: Gözlem, Analiz, Öneriler
- Fotoğrafları analiz ederken:
  * Fotoğrafta gördüğünü tanımla
  * Güvenlik tehlikelerini veya endişelerini belirle
  * Organizasyon sorunlarına işaret et
  * Olumlu yönleri ve iyi uygulamaları not et
  * Görsel kanıtlara dayalı belirli iyileştirmeler öner
- Önerilen iyileştirmeler için tahmini etki seviyelerini ekle (Yüksek/Orta/Düşük)

FOTOĞRAF ANALİZ YÖNERGELERİ:
- Görünenlerin nesnel tanımıyla başla
- Şunları ara:
  * Güvenlik tehlikeleri (takılma tehlikeleri, bloke edilmiş çıkışlar vb.)
  * Organizasyon sorunları (belirsiz etiketleme, karışık öğeler)
  * Temizlik endişeleri
  * Görsel yönetim fırsatları
  * Alan kullanımı
  * Ekipman durumu
- 5S en iyi uygulamalarıyla karşılaştır
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
    // Add more error handling for the request parsing
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

Analyze the following Audit response:

Question: ${question}
Rating: ${rating}/5
Notes: ${notes}

${photos?.length ? 'I will also provide photos for analysis. Please examine them carefully and include specific observations about what you see.' : 'No photos provided for analysis.'}

Please provide insights and recommendations based on this input.
Consider the rating, notes, and visual evidence to suggest specific improvements.
Focus on practical, actionable recommendations.

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
        promptParts.push({
          inlineData: {
            mimeType: photo.split(',')[0].split(':')[1].split(';')[0],
            data: photo.split(',')[1]
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
      console.log('AI response preview:', text.substring(0, 200) + '...');
      
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
      return text.toLowerCase().includes(title.toLowerCase() + ':');
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
              // More flexible parsing
              const parts = rec.split('|').map(s => s.trim());
              let text = parts[0]?.replace(/^\d+\.\s*/, '') || '';
              let priority = '';
              let impact = '';
              
              for (const part of parts.slice(1)) {
                const lowerPart = part.toLowerCase();
                // More flexible matching for priority and impact
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

    // Parse follow-up questions with error handling
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
    console.error('AI Analysis Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Return more informative error message
    return json({ 
      error: 'Failed to get AI insights',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
    });
  }
};