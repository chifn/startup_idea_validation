import OpenAI from 'openai';
import { IdeaInput, AnalysisResult } from '@/types';
import { generateAnalysisPrompt } from './prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function analyzeIdea(ideaInput: IdeaInput): Promise<AnalysisResult> {
  const prompt = generateAnalysisPrompt(ideaInput);

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的产品顾问，擅长帮助技术背景的创业者验证产品想法。你总是输出结构化的JSON格式结果，从不添加额外的解释文字。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('LLM返回内容为空');
    }

    // 解析JSON响应
    const parsed = JSON.parse(content);

    // 生成ID和时间戳
    const id = `idea-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const createdAt = new Date().toISOString();

    // 构建完整的AnalysisResult对象
    const result: AnalysisResult = {
      id,
      ideaSummary: parsed.ideaSummary,
      userPersona: parsed.userPersona,
      jtbd: parsed.jtbd,
      problemStrength: parsed.problemStrength,
      differentiation: parsed.differentiation,
      nextSteps: parsed.nextSteps,
      createdAt,
    };

    return result;
  } catch (error) {
    console.error('LLM分析错误:', error);
    throw new Error(`分析失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}
