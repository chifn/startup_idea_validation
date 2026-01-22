'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnalysisResult } from '@/types';
import ResultDisplay from '@/components/ResultDisplay';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 注意：在实际应用中，这里应该从API获取结果
  // 由于我们是在客户端，我们需要将结果存储在localStorage或通过API获取
  // 这里简化处理，假设结果已经通过路由state传递（实际应该用API）
  
  useEffect(() => {
    // 尝试从localStorage获取结果
    const storedResult = localStorage.getItem(`result-${params.id}`);
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
        setLoading(false);
      } catch (e) {
        setError('无法加载结果');
        setLoading(false);
      }
    } else {
      setError('结果未找到');
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || '结果未找到'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            重新开始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ResultDisplay result={result} />
        </div>
      </div>
    </div>
  );
}
