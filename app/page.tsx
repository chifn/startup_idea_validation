'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [idea, setIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      if (!response.ok) {
        throw new Error('分析失败，请重试');
      }

      const result = await response.json();
      // 保存结果到localStorage以便结果页面访问
      localStorage.setItem(`result-${result.id}`, JSON.stringify(result));
      router.push(`/result/${result.id}`);
    } catch (error) {
      console.error('分析错误:', error);
      alert(error instanceof Error ? error.message : '分析失败，请重试');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              创业想法快速验证器
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              将模糊的创业想法快速拆解为「目标用户是谁、问题是否真实、是否值得继续投入」
            </p>
            <p className="text-lg text-gray-500">
              AI 决策辅助工具 · 专为技术背景的创业者设计
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">结构化拆解</h3>
              <p className="text-gray-600 text-sm">
                基于 JSK 模型和 JTBD 框架，系统化分析你的想法
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold mb-2">用户画像生成</h3>
              <p className="text-gray-600 text-sm">
                从模糊描述到具体的目标用户画像，明确你的用户是谁
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-lg font-semibold mb-2">验证行动建议</h3>
              <p className="text-gray-600 text-sm">
                提供可执行的下一步验证计划，避免盲目开发
              </p>
            </div>
          </div>

          {/* Target Users */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">适合谁使用？</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>有创业或产品想法但缺乏验证方法的学生</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>初次做产品、容易陷入自我感动式创新的个人创作者</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>希望判断 idea 是否值得进入 MVP 阶段的产品导向学员</span>
              </li>
            </ul>
          </div>

          {/* Idea Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit}>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                输入你的创业想法
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4 resize-none"
                rows={6}
                placeholder="例如：一个帮助开发者快速验证产品想法的AI工具，通过结构化分析判断idea是否值得投入时间开发..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={isAnalyzing}
              />
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">
                  {isAnalyzing ? 'AI正在分析中...' : 'AI将自动拆解：用户画像、JTBD、问题强度、差异化分析'}
                </p>
                <button
                  type="submit"
                  disabled={!idea.trim() || isAnalyzing}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      分析中...
                    </span>
                  ) : (
                    '开始验证 →'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              免费使用 · 无需注册 · AI自动完成所有分析
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
