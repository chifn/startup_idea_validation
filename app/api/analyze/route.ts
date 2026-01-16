import { NextRequest, NextResponse } from 'next/server';
import { analyzeIdea } from '@/lib/llm';
import { IdeaInput } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idea }: { idea: IdeaInput } = body;

    // 验证输入
    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入你的想法' },
        { status: 400 }
      );
    }

    // 调用LLM进行分析
    const result = await analyzeIdea(idea.trim());

    return NextResponse.json(result);
  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '分析失败，请重试' },
      { status: 500 }
    );
  }
}
