# 快速启动指南

## 1. 安装依赖

```bash
npm install
```

## 2. 配置环境变量

创建 `.env` 文件（复制 `env.example`）：

```bash
cp env.example .env
```

编辑 `.env` 文件，填入你的 OpenAI API Key：

```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
```

## 3. 启动开发服务器

```bash
npm run dev
```

## 4. 访问应用

打开浏览器访问：http://localhost:3000

## 功能说明

### 首页 (/)
- 产品介绍和功能说明
- 直接输入你的创业想法
- 点击"开始验证"后，AI自动完成所有分析

### 结果页面 (/result/[id])
展示完整的分析结果，包括：
- 想法摘要
- 目标用户画像
- JTBD分析
- 问题强度评估
- 差异化与风险分析
- 下一步验证行动建议

## 注意事项

- 确保 OpenAI API Key 有效且有足够的额度
- 首次使用可能需要等待几秒钟进行AI分析
- 结果会保存在浏览器的 localStorage 中，刷新页面不会丢失

## 故障排除

### 如果遇到 "分析失败" 错误：
1. 检查 `.env` 文件中的 `OPENAI_API_KEY` 是否正确
2. 确认 API Key 有足够的额度
3. 检查网络连接是否正常

### 如果页面样式异常：
1. 确保已运行 `npm install` 安装所有依赖
2. 检查 Tailwind CSS 是否正确配置
3. 尝试清除 `.next` 目录后重新运行 `npm run dev`
