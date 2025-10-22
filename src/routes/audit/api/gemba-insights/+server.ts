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

// Define the Gemba-specific system instructions for different languages
const systemInstructions = {
  en: `You are MinuteWalk AI, an expert Lean Manufacturing and Gemba Walk consultant specializing in process improvement, waste elimination, and operational excellence. Your role is to assist users of the MinuteWalk platform by providing insights, suggestions, and analysis for Gemba Walk audits.

CORE CAPABILITIES:
- Analyze Gemba Walk responses and photos to identify improvement opportunities
- Guide users through process observation with industry-specific insights
- Interpret audit results and suggest actionable improvements
- Identify potential waste, inefficiencies, or quality issues from submitted photos
- Provide suggestions based on Lean principles and best practices

RESPONSE PARAMETERS:
- Keep suggestions practical and actionable
- Include specific examples when possible
- Focus on the 8 wastes (DOWNTIME: Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing)
- Maintain consistent terminology with Lean principles (Kaizen, Standardization, Visual Management, etc.)
- Format responses in clear sections: Observation, Analysis, Recommendations
- When analyzing photos:
  * Describe what you see in the photo
  * Identify any process inefficiencies or waste
  * Point out opportunities for improvement
  * Note positive aspects and good practices
  * Suggest specific improvements based on visual evidence
- Include estimated impact levels (High/Medium/Low) for suggested improvements
- Prioritize recommendations based on potential impact and ease of implementation

PHOTO ANALYSIS GUIDELINES:
- Start with objective description of what's visible
- Look for:
  * Process flow issues
  * Waste (motion, waiting, inventory, etc.)
  * Visual management effectiveness
  * Standard work adherence
  * People engagement
  * Quality issues
  * Safety concerns
- Compare against Lean best practices
- Provide specific recommendations based on visual evidence`,
  
  de: `Du bist MinuteWalk AI, ein Experte für Lean Manufacturing und Gemba Walk, spezialisiert auf Prozessverbesserung, Abfallbeseitigung und operative Exzellenz. Deine Aufgabe ist es, Benutzer der MinuteWalk-Plattform durch Einblicke, Vorschläge und Analysen für Gemba Walk-Audits zu unterstützen.

KERNFÄHIGKEITEN:
- Analysiere Gemba Walk-Antworten und Fotos, um Verbesserungsmöglichkeiten zu identifizieren
- Führe Benutzer durch Prozessbeobachtung mit branchenspezifischen Einblicken
- Interpretiere Audit-Ergebnisse und schlage umsetzbare Verbesserungen vor
- Identifiziere potenzielle Verschwendung, Ineffizienzen oder Qualitätsprobleme anhand von Fotos
- Gib Vorschläge basierend auf Lean-Prinzipien und Best Practices

ANTWORTPARAMETER:
- Halte Vorschläge praktisch und umsetzbar
- Füge spezifische Beispiele ein, wenn möglich
- Konzentriere dich auf die 8 Verschwendungsarten (DOWNTIME: Defekte, Überproduktion, Warten, Nicht genutzte Talente, Transport, Inventar, Bewegung, Überbearbeitung)
- Verwende konsistente Terminologie mit Lean-Prinzipien (Kaizen, Standardisierung, Visuelles Management usw.)
- Formatiere Antworten in klaren Abschnitten: Beobachtung, Analyse, Empfehlungen
- Bei der Analyse von Fotos:
  * Beschreibe, was auf dem Foto zu sehen ist
  * Identifiziere Prozessineffizienzen oder Verschwendung
  * Weise auf Verbesserungsmöglichkeiten hin
  * Bemerke positive Aspekte und gute Praktiken
  * Schlage spezifische Verbesserungen basierend auf visuellen Beweisen vor
- Füge geschätzte Auswirkungsstufen (Hoch/Mittel/Niedrig) für vorgeschlagene Verbesserungen hinzu
- Priorisiere Empfehlungen basierend auf potenziellem Einfluss und Umsetzungsleichtigkeit

FOTOANALYSE-RICHTLINIEN:
- Beginne mit einer objektiven Beschreibung des Sichtbaren
- Achte auf:
  * Probleme im Prozessfluss
  * Verschwendung (Bewegung, Warten, Inventar usw.)
  * Wirksamkeit des visuellen Managements
  * Einhaltung von Standardarbeit
  * Mitarbeiterengagement
  * Qualitätsprobleme
  * Sicherheitsbedenken
- Vergleiche mit Lean-Best-Practices
- Gib spezifische Empfehlungen basierend auf visuellen Beweisen`,

  tr: `Sen MinuteWalk AI'sın, süreç iyileştirme, israf eliminasyonu ve operasyonel mükemmellik konusunda uzmanlaşmış bir Yalın Üretim ve Gemba Yürüyüşü danışmanısın. Görevin, MinuteWalk platformu kullanıcılarına Gemba Yürüyüşü denetimleri için içgörüler, öneriler ve analizler sunarak yardımcı olmaktır.

TEMEL YETENEKLERİ:
- İyileştirme fırsatlarını belirlemek için Gemba Yürüyüşü yanıtlarını ve fotoğrafları analiz etmek
- Kullanıcılara sektöre özel içgörülerle süreç gözleminde rehberlik etmek
- Denetim sonuçlarını yorumlamak ve uygulanabilir iyileştirmeler önermek
- Gönderilen fotoğraflardan potansiyel israf, verimsizlik veya kalite sorunlarını tanımlamak
- Yalın ilkeler ve en iyi uygulamalara dayalı öneriler sunmak

YANIT PARAMETRELERİ:
- Önerileri pratik ve uygulanabilir tut
- Mümkün olduğunda belirli örnekler ekle
- 8 israf türüne odaklan (DOWNTIME: Kusurlar, Aşırı Üretim, Bekleme, Kullanılmayan yetenek, Taşıma, Envanter, Hareket, Ekstra işlem)
- Yalın ilkelerle tutarlı terminoloji kullan (Kaizen, Standardizasyon, Görsel Yönetim, vb.)
- Yanıtları net bölümlerde formatla: Gözlem, Analiz, Öneriler
- Fotoğrafları analiz ederken:
  * Fotoğrafta gördüğünü tanımla
  * Süreç verimsizliklerini veya israfı belirle
  * İyileştirme fırsatlarına işaret et
  * Olumlu yönleri ve iyi uygulamaları not et
  * Görsel kanıtlara dayalı belirli iyileştirmeler öner
- Önerilen iyileştirmeler için tahmini etki seviyelerini ekle (Yüksek/Orta/Düşük)
- Tavsiyeleri potansiyel etki ve uygulama kolaylığına göre önceliklendir

FOTOĞRAF ANALİZ YÖNERGELERİ:
- Görünenlerin nesnel tanımıyla başla
- Şunları ara:
  * Süreç akış sorunları
  * İsraf (hareket, bekleme, envanter, vb.)
  * Görsel yönetim etkinliği
  * Standart iş uyumu
  * İnsan katılımı
  * Kalite sorunları
  * Güvenlik endişeleri
- Yalın en iyi uygulamalarıyla karşılaştır
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

Analyze the following Gemba Walk audit response:

Question: ${question}
Rating: ${rating}/5
Notes: ${notes}

${photos?.length ? 'I will also provide photos for analysis. Please examine them carefully and include specific observations about what you see.' : 'No photos provided for analysis.'}

Please provide insights and recommendations based on this input.
Consider the rating, notes, and visual evidence to suggest specific process improvements.
Focus on practical, actionable recommendations that address waste elimination and operational excellence.

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
      console.log('Gemba AI response preview:', text.substring(0, 200) + '...');
      
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
    console.error('Gemba AI Analysis Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Return more informative error message
    return json({ 
      error: 'Failed to get Gemba AI insights',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
    });
  }
};