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
  en: `You are MinuteWalk AI, an expert manufacturing and operations consultant specializing in SQCDPE+ (Safety, Quality, Cost, Delivery, People, Environment, Plus) assessments. Your task is to analyze daily check-in data and provide valuable insights and recommendations.
CRITICAL: You must ONLY return a valid JSON object with the following structure:
{
  "summary": "Brief analysis of the current situation based on category statuses and notes",
  "key_concerns": [
    {
      "category": "Category name",
      "issue": "Description of the issue",
      "severity": "high|medium|low",
      "impact": "Potential impact on operations"
    }
  ],
  "recommendations": [
    "Specific, actionable recommendation based on the issues identified"
  ],
  "follow_up": [
    "Suggested follow-up actions or questions"
  ]
}`,

  de: `Du bist MinuteWalk AI, ein Experte für Fertigung und Betriebsabläufe, spezialisiert auf SQCDPE+ (Sicherheit, Qualität, Kosten, Lieferung, Personal, Umwelt, Plus) Bewertungen. Deine Aufgabe ist es, tägliche Check-in-Daten zu analysieren und wertvolle Einblicke und Empfehlungen zu geben.
KRITISCH: Du musst NUR ein gültiges JSON-Objekt mit der folgenden Struktur zurückgeben:
{
  "summary": "Kurze Analyse der aktuellen Situation basierend auf Kategoriestatus und Notizen",
  "key_concerns": [
    {
      "category": "Kategoriename",
      "issue": "Beschreibung des Problems",
      "severity": "high|medium|low",
      "impact": "Potenzielle Auswirkungen auf den Betrieb"
    }
  ],
  "recommendations": [
    "Spezifische, umsetzbare Empfehlung basierend auf den identifizierten Problemen"
  ],
  "follow_up": [
    "Vorgeschlagene Folgemaßnahmen oder Fragen"
  ]
}`,

  tr: `Sen MinuteWalk AI'sın, SQCDPE+ (Güvenlik, Kalite, Maliyet, Teslimat, İnsan, Çevre, Artı) değerlendirmelerinde uzmanlaşmış bir üretim ve operasyon danışmanısın. Görevin, günlük check-in verilerini analiz etmek ve değerli içgörüler ve öneriler sunmaktır.
KRİTİK: SADECE aşağıdaki yapıya sahip geçerli bir JSON nesnesi döndürmelisin:
{
  "summary": "Kategori durumları ve notlara dayalı mevcut durumun kısa analizi",
  "key_concerns": [
    {
      "category": "Kategori adı",
      "issue": "Sorunun açıklaması",
      "severity": "high|medium|low",
      "impact": "Operasyonlar üzerindeki potansiyel etki"
    }
  ],
  "recommendations": [
    "Belirlenen sorunlara dayalı özel, uygulanabilir öneri"
  ],
  "follow_up": [
    "Önerilen takip eylemleri veya soruları"
  ]
}`
};

// Define the field names for different languages
const fieldNames = {
  en: {
    summary: "summary",
    key_concerns: "key_concerns",
    recommendations: "recommendations",
    follow_up: "follow_up",
    category: "category",
    issue: "issue",
    severity: "severity",
    impact: "impact"
  },
  de: {
    summary: "summary",
    key_concerns: "key_concerns",
    recommendations: "recommendations",
    follow_up: "follow_up",
    category: "category",
    issue: "issue",
    severity: "severity",
    impact: "impact"
  },
  tr: {
    summary: "summary",
    key_concerns: "key_concerns",
    recommendations: "recommendations",
    follow_up: "follow_up",
    category: "category",
    issue: "issue",
    severity: "severity",
    impact: "impact"
  }
};

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
    
    const { categories, generalNotes } = requestData;
    
    // Determine the language from the request
    const locale = getLocaleFromRequest(request);
    const systemInstruction = systemInstructions[locale] || systemInstructions.en;
    const fields = fieldNames[locale] || fieldNames.en;

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Updated to gemini-2.5-flash
      generationConfig: {
        temperature: 0.1 // Lower temperature to make responses more deterministic
      }
    });

    // Prepare the prompt
    const prompt = `${systemInstruction}
Analyze the following SQCDPE+ daily check-in data:
Categories:
${categories.map(c => `${c.id.toUpperCase()}: ${c.status} - ${c.notes || 'No notes provided'}`).join('\n')}
General Notes:
${generalNotes || 'No general notes provided'}

Your response must be in ${locale === 'en' ? 'English' : locale === 'de' ? 'German' : 'Turkish'}.
CRITICAL: You must return ONLY a valid JSON object matching the format specified above.
Do not include any other text, do not wrap your response in markdown code blocks, and do not add any formatting.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Log the first part of the response for debugging
    console.log('AI response preview:', text.substring(0, 200) + '...');
    
    // Clean the text by removing any markdown code block notation
    text = text.replace(/```json|```/g, '').trim();
    
    try {
      // First try direct JSON parse
      const insights = JSON.parse(text);
      return json(insights);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // If direct parse fails, try to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const extractedJson = JSON.parse(jsonMatch[0]);
          return json(extractedJson);
        } catch (extractError) {
          console.error('Extracted JSON Parse Error:', extractError);
          throw new Error('Failed to parse extracted JSON');
        }
      }
      
      // If all parsing attempts fail, return a structured fallback
      return json({
        [fields.summary]: locale === 'en' 
          ? "Unable to generate detailed insights. Please review the check-in data manually."
          : locale === 'de'
          ? "Es konnten keine detaillierten Erkenntnisse generiert werden. Bitte überprüfen Sie die Check-in-Daten manuell."
          : "Detaylı içgörüler üretilemiyor. Lütfen check-in verilerini manuel olarak gözden geçirin.",
        [fields.key_concerns]: [{
          [fields.category]: locale === 'en' ? "System" : locale === 'de' ? "System" : "Sistem",
          [fields.issue]: locale === 'en' 
            ? "AI analysis failed" 
            : locale === 'de' 
            ? "KI-Analyse fehlgeschlagen" 
            : "AI analizi başarısız oldu",
          [fields.severity]: "low",
          [fields.impact]: locale === 'en' 
            ? "Manual review recommended" 
            : locale === 'de' 
            ? "Manuelle Überprüfung empfohlen" 
            : "Manuel inceleme önerilir"
        }],
        [fields.recommendations]: locale === 'en'
          ? [
            "Review all red and yellow status categories carefully",
            "Document any patterns or recurring issues"
          ]
          : locale === 'de'
          ? [
            "Überprüfen Sie alle Kategorien mit rotem und gelbem Status sorgfältig",
            "Dokumentieren Sie alle Muster oder wiederkehrenden Probleme"
          ]
          : [
            "Kırmızı ve sarı durum kategorilerini dikkatle inceleyin",
            "Herhangi bir model veya tekrarlayan sorunları belgelendirin"
          ],
        [fields.follow_up]: locale === 'en'
          ? [
            "Are there any immediate actions required?",
            "Have all critical issues been properly documented?"
          ]
          : locale === 'de'
          ? [
            "Sind sofortige Maßnahmen erforderlich?",
            "Wurden alle kritischen Probleme ordnungsgemäß dokumentiert?"
          ]
          : [
            "Herhangi bir acil eylem gerekiyor mu?",
            "Tüm kritik sorunlar düzgün bir şekilde belgelenmiş mi?"
          ]
      });
    }
  } catch (error) {
    // Enhanced error logging
    console.error('AI Analysis Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Return more informative error message
    return json({ 
      error: 'Failed to analyze check-in data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
    });
  }
};
