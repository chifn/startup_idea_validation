'use client';

import { AnalysisResult } from '@/types';
import { useRouter } from 'next/navigation';

interface ResultDisplayProps {
  result: AnalysisResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const router = useRouter();

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 4) return 'bg-green-100';
    if (score >= 3) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getDifferentiationColor = (level: string) => {
    if (level === 'high') return 'text-green-600 bg-green-100';
    if (level === 'medium') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMotivationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      personal_pain: '个人痛点',
      technical_curiosity: '技术好奇',
      market_trend: '市场趋势',
      other: '其他',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">分析结果</h1>
          <button
            onClick={() => router.push('/analyze')}
            className="px-4 py-2 text-primary-600 hover:text-primary-700 border border-primary-600 rounded-lg hover:bg-primary-50"
          >
            分析新想法
          </button>
        </div>
        <p className="text-gray-500 text-sm">
          生成时间：{new Date(result.createdAt).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* Idea Summary */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">💡 想法摘要</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">原始想法</h3>
            <p className="text-gray-700">{result.ideaSummary.originalIdea}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">提炼后的想法</h3>
            <p className="text-gray-900 font-medium">{result.ideaSummary.refinedIdea}</p>
          </div>
        </div>
      </div>

      {/* User Persona */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">👥 目标用户画像</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">用户标签</h3>
            <div className="flex flex-wrap gap-2">
              {result.userPersona.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">典型一天</h3>
            <p className="text-gray-700">{result.userPersona.typicalDay}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">典型工作流</h3>
            <p className="text-gray-700">{result.userPersona.typicalWorkflow}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">常用工具</h3>
            <div className="flex flex-wrap gap-2">
              {result.userPersona.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">活跃社区</h3>
            <div className="flex flex-wrap gap-2">
              {result.userPersona.communities.map((community, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {community}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* JTBD */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">🎯 Job to be Done (JTBD)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">使用场景</h3>
            <p className="text-gray-700">{result.jtbd.scenario}</p>
          </div>
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-primary-700 mb-1">JTBD 描述</h3>
            <p className="text-primary-900 font-medium">{result.jtbd.jobStatement}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">动机类型</h3>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {getMotivationTypeLabel(result.jtbd.motivationType)}
            </span>
            <p className="text-gray-700 mt-2">{result.jtbd.motivationDescription}</p>
          </div>
        </div>
      </div>

      {/* Problem Strength */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">📊 问题强度评估</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div className={`${getScoreBgColor(result.problemStrength.frequencyScore)} p-4 rounded-lg text-center`}>
            <div className={`text-3xl font-bold ${getScoreColor(result.problemStrength.frequencyScore)}`}>
              {result.problemStrength.frequencyScore}
            </div>
            <div className="text-sm text-gray-600 mt-1">频率</div>
          </div>
          <div className={`${getScoreBgColor(result.problemStrength.painCostScore)} p-4 rounded-lg text-center`}>
            <div className={`text-3xl font-bold ${getScoreColor(result.problemStrength.painCostScore)}`}>
              {result.problemStrength.painCostScore}
            </div>
            <div className="text-sm text-gray-600 mt-1">代价</div>
          </div>
          <div className={`${getScoreBgColor(result.problemStrength.alternativesPainScore)} p-4 rounded-lg text-center`}>
            <div className={`text-3xl font-bold ${getScoreColor(result.problemStrength.alternativesPainScore)}`}>
              {result.problemStrength.alternativesPainScore}
            </div>
            <div className="text-sm text-gray-600 mt-1">替代方案痛点</div>
          </div>
          <div className={`${getScoreBgColor(result.problemStrength.overallScore)} p-4 rounded-lg text-center border-2 border-primary-600`}>
            <div className={`text-3xl font-bold ${getScoreColor(result.problemStrength.overallScore)}`}>
              {result.problemStrength.overallScore}
            </div>
            <div className="text-sm text-gray-600 mt-1">综合评分</div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-1">评分理由</h3>
          <p className="text-gray-600 text-sm">{result.problemStrength.reasoning}</p>
        </div>
      </div>

      {/* Differentiation */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">🔍 差异化与风险分析</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">差异化水平</h3>
            <span className={`inline-block px-4 py-2 rounded-lg font-medium ${getDifferentiationColor(result.differentiation.level)}`}>
              {result.differentiation.level === 'high' ? '高' : result.differentiation.level === 'medium' ? '中' : '低'}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">已知竞品</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.differentiation.competitors.map((competitor, index) => (
                <li key={index}>{competitor}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">关键差异点</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.differentiation.keyDifferences.map((diff, index) => (
                <li key={index}>{diff}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">主要风险</h3>
            <ul className="list-disc list-inside space-y-1 text-red-700">
              {result.differentiation.risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">✅ 下一步验证行动建议</h2>
        <div className="space-y-6">
          {/* Qualitative Interview */}
          <div className="border-l-4 border-primary-600 pl-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">1. 定性访谈</h3>
            <p className="text-gray-600 mb-3">{result.nextSteps.qualitativeInterview.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">要找谁访谈：</p>
              <p className="text-gray-600 text-sm mb-3">{result.nextSteps.qualitativeInterview.whoToTalkTo}</p>
              <p className="text-sm font-medium text-gray-700 mb-2">建议问题：</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                {result.nextSteps.qualitativeInterview.questions.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantitative Signal */}
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">2. 定量信号验证</h3>
            <p className="text-gray-600 mb-3">{result.nextSteps.quantitativeSignal.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">具体行动：</p>
              <p className="text-gray-600 text-sm mb-3">{result.nextSteps.quantitativeSignal.action}</p>
              <p className="text-sm font-medium text-gray-700 mb-2">可用模板：</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{result.nextSteps.quantitativeSignal.template}</p>
              </div>
            </div>
          </div>

          {/* Risk Validation */}
          <div className="border-l-4 border-yellow-600 pl-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">3. 风险假设验证</h3>
            <p className="text-gray-600 mb-3">{result.nextSteps.riskValidation.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">要验证的假设：</p>
              <p className="text-gray-600 text-sm mb-3">{result.nextSteps.riskValidation.hypothesis}</p>
              <p className="text-sm font-medium text-gray-700 mb-2">测试方法：</p>
              <p className="text-gray-600 text-sm">{result.nextSteps.riskValidation.testMethod}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/analyze')}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
          >
            分析新想法
          </button>
          <button
            onClick={() => {
              const text = JSON.stringify(result, null, 2);
              navigator.clipboard.writeText(text);
              alert('结果已复制到剪贴板');
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            复制结果
          </button>
        </div>
      </div>
    </div>
  );
}
