// 用户只需要输入想法本身
export type IdeaInput = string;

// 最终的分析结果
export interface AnalysisResult {
  id: string;
  ideaSummary: {
    originalIdea: string;
    refinedIdea: string;
  };
  userPersona: {
    tags: string[];
    typicalDay: string;
    typicalWorkflow: string;
    tools: string[];
    communities: string[];
  };
  jtbd: {
    scenario: string;
    jobStatement: string;
    motivationType: 'personal_pain' | 'technical_curiosity' | 'market_trend' | 'other';
    motivationDescription: string;
  };
  problemStrength: {
    frequencyScore: number; // 1-5
    painCostScore: number; // 1-5
    alternativesPainScore: number; // 1-5
    overallScore: number; // 1-5
    reasoning: string;
  };
  differentiation: {
    level: 'low' | 'medium' | 'high';
    competitors: string[];
    keyDifferences: string[];
    risks: string[];
  };
  nextSteps: {
    qualitativeInterview: {
      description: string;
      whoToTalkTo: string;
      questions: string[];
    };
    quantitativeSignal: {
      description: string;
      action: string;
      template: string;
    };
    riskValidation: {
      description: string;
      hypothesis: string;
      testMethod: string;
    };
  };
  createdAt: string;
}
