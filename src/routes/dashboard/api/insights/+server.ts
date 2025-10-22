import { json } from '@sveltejs/kit';
import { PRIVATE_GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

const getSystemInstruction = (language) => {
  // Base system instruction
  const baseInstruction = `You are MinuteWalk AI, an expert manufacturing operations consultant specializing in 5S, Gemba, MHE (Material Handling Equipment), HSE (Health, Safety & Environment), and SQCDPE+ methodologies. Your task is to analyze the dashboard data and provide concise, actionable insights.

EXPERTISE AREAS:
- 5S: Sort, Set in Order, Shine, Standardize, Sustain
- Gemba: Process observation, people engagement, visual management
- MHE: Equipment safety, maintenance, operational efficiency
- HSE: Workplace safety, risk assessment, compliance
- SQCDPE+: Safety, Quality, Cost, Delivery, People, Environment, Plus

RESPONSE FORMAT:
{
  "summary": "2-3 sentence executive summary of key findings across all areas",
  "walkAnalysis": {
    "5s": {
      "score": "Current score",
      "trend": "improving|stable|declining",
      "keyIssues": ["1-2 key issues"],
      "quickWins": ["1-2 immediate actions"]
    },
    "gemba": { /* Same structure as 5s */ },
    "mhe": { /* Same structure as 5s */ },
    "hse": { /* Same structure as 5s */ }
  },
  "sqcdpeAnalysis": {
    "safety": {
      "status": "green|yellow|red",
      "trend": "improving|stable|declining",
      "keyIssue": "Single most critical issue",
      "action": "Single most important action"
    },
    "quality": { /* Same structure as safety */ },
    "cost": { /* Same structure as safety */ },
    "delivery": { /* Same structure as safety */ },
    "people": { /* Same structure as safety */ },
    "environment": { /* Same structure as safety */ },
    "plus": { /* Same structure as safety */ }
  },
  "criticalPoints": [
    {
      "point": "Critical issue description (max 15 words)",
      "severity": "high|medium|low",
      "category": "5s|gemba|mhe|hse|safety|quality|cost|delivery|people|environment|plus"
    }
  ],
  "recommendations": [
    {
      "text": "Specific recommendation (max 20 words)",
      "priority": "High|Medium|Low",
      "category": "5s|gemba|mhe|hse|safety|quality|cost|delivery|people|environment|plus",
      "impact": "Expected impact (max 10 words)",
      "timeframe": "immediate|short-term|long-term"
    }
  ],
  "actionItems": [
    {
      "description": "Action item (max 15 words)",
      "category": "5s|gemba|mhe|hse|safety|quality|cost|delivery|people|environment|plus",
      "priority": "high|medium|low",
      "owner": "Role responsible",
      "timeline": "immediate|this-week|this-month"
    }
  ]
}

GUIDELINES:
- Keep all text concise and actionable
- Focus on highest impact items
- Prioritize safety and compliance
- Consider relationships between areas
- Suggest practical, achievable actions
- Balance quick wins and strategic improvements
- CRITICAL: Return ONLY valid JSON matching format above`;

  // Add language instruction
  const languageInstruction = language && language !== 'en' 
    ? `\n\nIMPORTANT: Respond in ${language} language. All text content in the JSON response should be in ${language} while maintaining the JSON structure.` 
    : '';

  return baseInstruction + languageInstruction;
};

const genAI = new GoogleGenerativeAI(PRIVATE_GEMINI_API_KEY);

/** Build a prompt for the AI based on provided data */
function buildPrompt({
  view,
  stats,
  dateRange,
  site,
  department,
  sqcdpeData,
  language
}: {
  view: string;
  stats: any;
  dateRange: { start: string; end: string };
  site?: string;
  department?: string;
  sqcdpeData?: any;
  language?: string;
}) {
  return `${getSystemInstruction(language)}

Analyze the following dashboard data:

View Level: ${view}
Date Range: ${dateRange.start} to ${dateRange.end}
${site ? `Site: ${site}` : 'All Sites'}
${department ? `Department: ${department}` : 'All Departments'}

Statistics:
${JSON.stringify(stats, null, 2)}

SQCDPE+ Overview:
${sqcdpeData ? JSON.stringify(sqcdpeData, null, 2) : 'No SQCDPE+ data available'}

Please provide insights, analysis, and actionable recommendations in the JSON format specified above.`;
}

/** Extract the JSON object from any extra text (e.g. markdown wrappers) */
function extractJSON(text: string): string {
  const jsonMatch = text.match(/{[\s\S]*}/);
  return jsonMatch ? jsonMatch[0] : text;
}

/** Validate and ensure that critical arrays are not empty */
function validateInsights(insights: any) {
  if (!insights.summary || insights.summary.trim() === "") {
    insights.summary = "No summary provided.";
  }
  if (!insights.analysis || insights.analysis.trim() === "") {
    insights.analysis = "No detailed analysis provided.";
  }
  if (!Array.isArray(insights.criticalPoints) || insights.criticalPoints.length === 0) {
    insights.criticalPoints = [{
       point: "No critical points identified. Please review the data for potential issues.",
       severity: "low"
    }];
  }
  if (!Array.isArray(insights.recommendations) || insights.recommendations.length === 0) {
    insights.recommendations = [{
      text: "No recommendations provided. Please consider further analysis.",
      priority: "Medium",
      impact: "Minimal impact expected."
    }];
  }
  if (!Array.isArray(insights.todos) || insights.todos.length === 0) {
    insights.todos = ["No action items provided. Consider identifying key improvement actions."];
  }
  return insights;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { view, stats, dateRange, site, department, sqcdpeData, language } = await request.json();

    // Validate required inputs
    if (!view || !stats || !dateRange?.start || !dateRange?.end) {
      return json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Build prompt with all available data including language
    const prompt = buildPrompt({ view, stats, dateRange, site, department, sqcdpeData, language });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    let insights;
    try {
      const jsonText = extractJSON(text);
      insights = JSON.parse(jsonText);
      insights = validateInsights(insights);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Provide fallback response in the requested language or default to English
      insights = {
        summary: "Dashboard analysis completed. Some metrics require attention. Review recommended actions.",
        walkAnalysis: {
          "5s": {
            score: "N/A",
            trend: "stable",
            keyIssues: ["Unable to analyze 5S data"],
            quickWins: ["Review 5S implementation"]
          },
          "gemba": {
            score: "N/A",
            trend: "stable", 
            keyIssues: ["Unable to analyze Gemba data"],
            quickWins: ["Schedule Gemba walk"]
          },
          "mhe": {
            score: "N/A",
            trend: "stable",
            keyIssues: ["Unable to analyze MHE data"],
            quickWins: ["Review equipment status"]
          },
          "hse": {
            score: "N/A",
            trend: "stable",
            keyIssues: ["Unable to analyze HSE data"],
            quickWins: ["Conduct safety review"]
          }
        },
        sqcdpeAnalysis: {
          safety: {
            status: "yellow",
            trend: "stable",
            keyIssue: "Safety metrics need review",
            action: "Schedule safety assessment"
          },
          quality: {
            status: "yellow",
            trend: "stable",
            keyIssue: "Quality metrics need review",
            action: "Review quality processes"
          },
          cost: {
            status: "yellow",
            trend: "stable",
            keyIssue: "Cost metrics need review",
            action: "Analyze cost drivers"
          },
          delivery: {
            status: "yellow",
            trend: "stable",
            keyIssue: "Delivery metrics need review",
            action: "Review delivery performance"
          },
          people: {
            status: "yellow",
            trend: "stable",
            keyIssue: "People metrics need review",
            action: "Review team performance"
          },
          environment: {
            status: "yellow",
            trend: "stable",
            keyIssue: "Environmental metrics need review",
            action: "Assess environmental impact"
          },
          plus: {
            status: "yellow",
            trend: "stable",
            keyIssue: "Additional metrics need review",
            action: "Review improvement opportunities"
          }
        },
        criticalPoints: [{
          point: "Dashboard data analysis requires attention",
          severity: "medium",
          category: "quality"
        }],
        recommendations: [{
          text: "Review and validate dashboard metrics",
          priority: "Medium",
          category: "quality",
          impact: "Improve data accuracy",
          timeframe: "immediate"
        }],
        actionItems: [{
          description: "Validate dashboard data sources",
          category: "quality",
          priority: "high",
          owner: "Process Owner",
          timeline: "immediate"
        }]
      };
    }

    return json(insights);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return json(
      { error: error instanceof Error ? error.message : 'Failed to get AI insights' },
      { status: 500 }
    );
  }
};
