export interface AIInsight {
  observation: string;
  analysis: string;
  recommendations: Array<{
    text: string;
    priority: 'High' | 'Medium' | 'Low';
    impact: string;
  }>;
  followUp: string[];
}