# 创业想法快速验证器

一个将模糊的创业想法快速拆解为「目标用户是谁、问题是否真实、是否值得继续投入」的 AI 决策辅助工具。

## 功能特性

- 🎯 **结构化拆解**：基于 JSK 模型和 JTBD 框架，系统化分析你的想法
- 👥 **用户画像生成**：从模糊描述到具体的目标用户画像
- 📊 **问题强度评估**：客观评估问题的频率、代价和替代方案痛点
- 🔍 **差异化分析**：识别竞品、关键差异点和潜在风险
- ✅ **验证行动建议**：提供可执行的下一步验证计划

## 技术栈

- **前端框架**：Next.js 14 (App Router)
- **UI 框架**：React + Tailwind CSS
- **AI 模型**：OpenAI GPT-4o-mini
- **语言**：TypeScript

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，并填入你的 OpenAI API Key：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
├── app/
│   ├── api/
│   │   └── analyze/          # 分析API端点
│   ├── analyze/              # 分析表单页面
│   ├── result/[id]/          # 结果展示页面
│   ├── globals.css           # 全局样式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页
├── components/
│   ├── AnalysisWizard.tsx    # 多步表单组件
│   └── ResultDisplay.tsx     # 结果展示组件
├── lib/
│   ├── llm.ts                # LLM调用逻辑
│   └── prompts.ts            # Prompt模板
├── types/
│   └── index.ts              # TypeScript类型定义
└── package.json
```

## 使用流程

1. **输入想法**：在首页输入你的创业想法（一句话或一段描述）
2. **AI自动分析**：AI自动完成所有维度的拆解和分析
3. **查看结果**：获得结构化的分析报告，包括：
   - 想法摘要（提炼后的描述）
   - 目标用户画像（自动推断）
   - JTBD分析（场景和要完成的工作）
   - 问题强度评估（频率、代价、替代方案痛点）
   - 差异化与风险分析（竞品、差异点、风险）
   - 下一步验证行动建议（访谈、定量验证、风险验证）

## 核心功能模块

### 想法输入与结构化拆解
- 多步表单收集用户输入
- LLM 将自然语言转换为结构化数据

### JTBD 拆解与真实动机识别
- 标准 JTBD 句式："当 [场景]，我想要 [目标]，这样我可以 [结果]"
- 识别动机类型：个人痛点/技术好奇/市场趋势/其他

### 初步目标用户画像生成
- 用户标签、典型一天、典型工作流
- 常用工具和活跃社区

### 问题强度与差异化评估
- 频率、代价、替代方案痛点评分（1-5分）
- 差异化水平评估（低/中/高）
- 竞品分析和风险识别

### 下一步验证行动建议
- 定性访谈计划（找谁、问什么）
- 定量信号验证（Landing Page、需求收集等）
- 风险假设验证（具体测试方法）

## 开发说明

### 添加新的分析维度

1. 在 `types/index.ts` 中扩展 `AnalysisResult` 类型
2. 在 `lib/prompts.ts` 中更新 Prompt 模板，让AI自动分析新维度
3. 在 `components/ResultDisplay.tsx` 中添加结果展示

### 自定义 Prompt

编辑 `lib/prompts.ts` 中的 `generateAnalysisPrompt` 函数，调整分析逻辑和输出格式。

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量 `OPENAI_API_KEY`
4. 部署完成

### 其他平台

确保：
- Node.js 18+ 环境
- 环境变量正确配置
- 运行 `npm run build` 构建生产版本

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
