import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '创业想法快速验证器',
  description: '将模糊的创业想法快速拆解为「目标用户是谁、问题是否真实、是否值得继续投入」的 AI 决策辅助工具',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
