export interface ExperienceHighlight {
  title: string;
  content: string;
}

export interface ExperienceMetric {
  value: string;
  label: string;
  detail?: string;
  items?: string[];
}

export interface ExperienceModalContent {
  background: string;
  responsibility: string;
  outcome: string;
}

export interface Experience {
  id: string;
  index: string;
  page: string;
  company: string;
  role: string;
  date: string;
  summary: string;
  highlights: ExperienceHighlight[];
  metric: ExperienceMetric;
  tags: string[];
  modal: ExperienceModalContent;
}

export const experiences: Experience[] = [
  {
    id: "intel",
    index: "01",
    page: "01 / 03",
    company: "中科世通亨奇",
    role: "数据情报产品经理",
    date: "2026.05 — 2026.07",
    summary:
      "参与「灵境赛宇」智能情报 Agent 产品建设，围绕数据底座、Agent 使用链路与 AI 能力评测，将复杂情报查询转化为可执行、可验证的产品方案。",
    highlights: [
      {
        title: "DATA FOUNDATION",
        content:
          "从问答、专题与 GIS 场景反推数据需求，定义数据范围、核心字段、对象关系、更新机制和质量验收；使用 n8n 串联数据拉取、脱敏、模型分类与结果回写。",
      },
      {
        title: "AGENT EXPERIENCE",
        content:
          "持续体验问题理解、能力调用、数据查询、GIS 上图和结果展示全链路，维护问题清单，定义目标体验并协同研发完成修复与复测。",
      },
      {
        title: "AOS EXPLORATION & EVALUATION",
        content:
          "围绕位置研判 MVP 设计测评样本与人工判定标准，建立「业务效果 + 空间建设质量」双层评测框架，开展前期验证并输出问题清单与优化建议。",
      },
    ],
    metric: {
      value: "3",
      label: "CORE THREADS",
      items: ["Data Planning", "Agent UX Optimization", "AOS Evaluation"],
      detail: "data · agent · evaluation",
    },
    tags: ["Data Strategy", "Agent UX", "AOS", "Product Thinking"],
    modal: {
      background:
        "围绕智能情报 Agent 的数据准备、能力调用和结果展示链路，协助将复杂情报查询拆解为可执行、可验证的产品流程。",
      responsibility:
        "从问答、专题和 GIS 场景反推数据需求，定义核心字段、对象关系、更新机制和数据验收标准；持续体验 Agent 全链路并维护问题清单；参与位置研判 MVP 的测评样本与人工判定标准设计。",
      outcome:
        "完成数据底座规划、Agent 体验问题梳理和 AOS 前期评测框架设计，并协同研发推进问题修复与复测。",
    },
  },
  {
    id: "shangruitong",
    index: "02",
    page: "02 / 03",
    company: "尚睿通科技",
    role: "AI 产品经理",
    date: "2026.02 — 2026.05",
    summary:
      "面向教师和学校管理者的课堂分析产品，通过多个 AI 工作流分析课堂实录并生成课堂报告。",
    highlights: [
      {
        title: "AI WORKFLOW DESIGN",
        content:
          "将教研规则转化为 Dify 工作流，负责任务拆分、节点编排、Prompt 设计、结构化输出与异常兜底。",
      },
      {
        title: "EVALUATION SYSTEM",
        content:
          "搭建自动评测与人工评分机制，结合全链路回归测试、badcase 归因和复测，形成持续迭代闭环。",
      },
      {
        title: "BADCASE OPTIMIZATION",
        content:
          "定位标签边界与人工标注口径不一致，推动统一判定标准并复测，多个标签准确率由 60%–80% 提升至 90%+。",
      },
    ],
    metric: {
      value: "90%+",
      label: "accuracy after\nrelabeling & optimization",
      detail: "60%–80% → 90%+",
    },
    tags: ["AI Workflow", "Evaluation", "Product Thinking"],
    modal: {
      background:
        "产品面向教师和学校管理者，通过多个 AI 工作流分析课堂实录，并输出课堂行为识别与课堂分析报告。",
      responsibility:
        "参与 8 条 Dify 工作流建设，其中包括从 0 到 1 搭建、结构优化、Prompt 重写、节点拆分、并行链路设计和结构化输出兜底；同时搭建自动评测、人工评分与 badcase 分析机制。",
      outcome:
        "定位问答分类长期效果不佳的根因并非单纯 Prompt 问题，而是标签边界和人工标注标准不一致。推动统一标注口径并重新复测后，多个标签准确率由 60%–80% 提升至 90% 以上。",
    },
  },
  {
    id: "paite",
    index: "03",
    page: "03 / 03",
    company: "派特生物",
    role: "产品经理",
    date: "2025.08 — 2025.09",
    summary:
      "从 0 到 1 规划 HPV 预约服务小程序，梳理预约与到店流程，设计预约挂号、服务咨询和药物信息模块；同时规划高频咨询智能助手的问答范围、交互逻辑与兜底机制。",
    highlights: [
      {
        title: "PRODUCT PLANNING",
        content:
          "从 0 到 1 梳理小程序信息架构与核心用户流程，定义预约挂号、服务咨询和药物信息三大功能模块，输出完整需求文档与交互原型。",
      },
      {
        title: "SERVICE DESIGN",
        content:
          "梳理用户从线上了解、预约到线下到店的完整服务链路，设计各环节的页面流程、状态切换与异常处理，确保体验连贯。",
      },
      {
        title: "AI ASSISTANT DESIGN",
        content:
          "规划高频咨询智能助手的问答范围与交互逻辑，定义知识边界、回答策略和无法回答时的兜底机制，形成可落地的对话设计方案。",
      },
    ],
    metric: {
      value: "0 → 1",
      label: "product planning\nfrom scratch",
      detail: "小程序 · 智能助手",
    },
    tags: ["Product Strategy", "Healthcare", "Mini Program", "AI Assistant"],
    modal: {
      background:
        "围绕 HPV 预约服务和高频健康咨询场景，规划用户从线上了解、预约到线下到店的完整流程。",
      responsibility:
        "从 0 到 1 梳理小程序的信息架构和核心流程，设计预约挂号、服务咨询和药物信息模块；同时规划咨询智能助手的问答范围、交互逻辑和无法回答时的兜底机制。",
      outcome:
        "完成核心用户流程、功能模块与智能咨询方案设计，为后续产品开发提供完整需求基础。",
    },
  },
];
