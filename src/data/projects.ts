export interface ProjectMeta {
  role: string;
  time: string;
  type: string;
  team: string;
}

export interface Project {
  id: string;
  title: string;
  englishTitle: string;
  backImage: string;
  frontImage: string;
  modalBackground: string;
  showcase: string;
  summary: string;
  meta: ProjectMeta;
  tags: string[];
  background?: string;
  features?: string[];
  userFlow?: string[];
  contributions: string[];
  demoUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "竞品调研 Agent",
    englishTitle: "Competitor Research Agent",
    backImage: "/project_01_back.png",
    frontImage: "/project_01_front_no_button.png",
    modalBackground: "/project_01_modal_bg.png",
    showcase: "/project_01_showcase.png",
    summary:
      "面向产品经理与策略团队的智能调研工具。将调研拆解为找资料、统一维度、对比分析、标注来源和识别缺口五个任务，通过结构化输入、双层质量检查与受控补救，让结果可追溯、可解释。",
    meta: {
      role: "Product Designer & AI Workflow Developer",
      time: "2026.05 — 至今",
      type: "AI Agent / Research Tool",
      team: "独立开发",
    },
    tags: ["Agent", "Research", "Workflow", "Quality Check", "Evidence Tracing"],
    background:
      "产品经理在做竞品调研时，资料分散在官网、新闻、帮助中心和测评文章里，不同竞品经常不是按同一口径比较，结论也不一定有来源支撑。这个项目的出发点不是做一个「自动写报告」的工具，而是把真实调研流程拆开，让系统完成找资料、统一维度、对比分析、标注来源和识别证据缺口五件事，使调研结果可追溯、可解释。",
    features: [
      "结构化输入 — 指定竞品、研究维度、地区与时间范围，系统自动拆解为可执行的搜索任务",
      "多源资料检索 — 自动搜索并抓取网页、新闻、帮助中心等多渠道信息，整理为结构化证据",
      "对比矩阵生成 — 按竞品 × 维度生成横向对比矩阵，快速识别差异化信号",
      "双层质量检查 — 生成前材料门控（资料够不够）+ 生成后语义检查（结论是否有证据支撑）",
      "风险透明提示 — 来源不足、证据缺失的结论明确标注「需人工确认」，诚实暴露证据边界",
    ],
    userFlow: [
      "① 输入研究主题、竞品列表、研究维度、地区和时间范围",
      "② 系统拆解需求为多个精准搜索问题，自动检索与抓取资料",
      "③ 整理可用证据，触发生成前材料门控检查",
      "④ 生成竞品分析报告与横向对比矩阵",
      "⑤ 生成后语义检查 → 受控补救或标注风险 → 输出最终结果",
    ],
    contributions: [
      "主导产品策略与交互设计，拆解竞品调研为五步闭环：任务规划→资料检索→证据整理→质量检查→缺口补救",
      "设计生成前材料门控与生成后语义检查双层质量机制，核心结论可追溯至原文证据",
      "基于结构化输入与受控补救策略构建多阶段 Agent 工作流，避免自由调用带来的不可控风险",
    ],
    demoUrl: "http://82.156.132.43:18000/",
    githubUrl: "https://github.com/sunsun-cy/competitor-research-agent",
  },
  {
    id: "02",
    title: "合同审查系统",
    englishTitle: "Contract Review System",
    backImage: "/project_02_back.png",
    frontImage: "/project_02_front_no_button.png",
    modalBackground: "/project_02_modal_bg.png",
    showcase: "/project_02_showcase.png",
    summary:
      "面向中小微企业的 AI 合同审查平台。围绕单合同审查、版本比对、规则逆向三条工作流，帮助法务人员降低信息处理成本，实现风险初筛、版本差异定位和审核经验沉淀。",
    meta: {
      role: "Product Designer & Frontend Lead",
      time: "2026.03 — 2026.07",
      type: "LegalTech SaaS",
      team: "5人团队",
    },
    tags: ["LegalTech", "Contract Review", "Version Diff", "Rule Mining", "Human-AI"],
    background:
      "中小微企业法务人力有限，合同审核依赖个人经验、多轮协商时关键条款变化容易被大量文字淹没、历史审核经验难以沉淀复用。这个项目从之前基于 Coze 搭建的合同审查工作流出发，进一步落地为可运行的前后端产品，围绕单合同审查、版本比对和规则逆向三条工作流，帮助法务人员降低信息处理成本。",
    features: [
      "单合同审查 — 上传合同自动识别类型，基于 75 条规则库逐条审核，风险关联原文证据与修改建议",
      "版本比对 — 句级文本 Diff + 大模型语义分析，识别条款修改带来的权利义务变化与新增风险",
      "规则逆向 — 从历史修改前后案例中提取候选审核规则，人工确认后写入正式规则库并回用于后续审查",
      "人机协同 — AI 风险初筛，人工逐条确认、编辑或驳回，最终判断权和修改决定权在人",
    ],
    userFlow: [
      "① 上传合同 → 自动识别合同类型，召回对应规则",
      "② 分法务、财务、履约三个模块并行审查，输出风险清单",
      "③ 每条风险关联原文定位、命中规则与修改建议",
      "④ 人工逐条确认、编辑建议或忽略，导出新版合同",
      "⑤ 版本比对追踪修改影响，规则逆向持续沉淀审核经验",
    ],
    contributions: [
      "负责产品设计、前端开发与单合同审查、版本比对、规则逆向三条 AI 工作流搭建",
      "设计人机协同审核机制：风险结果关联原文证据与命中规则，支持人工确认、编辑或驳回",
      "引入规则逆向工作流，从历史修改案例中提取候选审核规则，实现经验沉淀与复用",
    ],
    demoUrl: "http://82.156.132.43/",
    githubUrl: "https://github.com/sunsun-cy/contract-review-system",
  },
  {
    id: "03",
    title: "prototype-html-plus",
    englishTitle: "prototype-html-plus",
    backImage: "/project_03_back.png",
    frontImage: "/project_03_front_no_button.png",
    modalBackground: "/project_03_modal_bg.png",
    showcase: "/project_03_showcase.png",
    summary:
      "帮助产品经理快速将想法转化为线稿与高保真原型的工具。输入自然语言描述即可生成可交互的 HTML 原型，让 PM 在写 PRD 之前就能把思路「做出来」看看效果。",
    meta: {
      role: "Creator & Full-stack Developer",
      time: "2026.06 — 至今",
      type: "DevTool / Open Source",
      team: "独立开发",
    },
    tags: ["DevTool", "Prototyping", "Design-to-Code", "Productivity"],
    background:
      "产品经理在写 PRD 之前，经常需要快速把想法「做出来」看看效果，但画线框图或用设计工具做高保真原型都需要额外的时间和技能。这个工具让 PM 用自然语言描述想要的页面，直接生成可交互的 HTML 原型，把从想法到可感知方案的路径缩到最短。",
    features: [
      "自然语言输入 — 用中文描述想要的页面，无需写代码或画线框图",
      "线稿 / 高保真双模式 — 快速产出线稿验证结构，或生成高保真原型用于演示",
      "实时预览 — 生成可交互 HTML 原型，即刻在浏览器中查看效果",
      "迭代修改 — 通过追加描述调整布局、组件和样式，快速迭代方案",
    ],
    userFlow: [
      "① 输入页面描述，如「一个 SaaS 数据看板，四个指标卡片加一张折线图」",
      "② 系统解析需求，自动生成布局与组件",
      "③ 输出可交互 HTML 原型，浏览器实时预览",
      "④ 追加修改指令持续迭代，如「把卡片改成两行两列」",
      "⑤ 导出 HTML 文件或分享链接",
    ],
    contributions: [
      "独立完成从概念到发布的全流程开发，包含核心转换引擎、VS Code 扩展与 Web 端工具",
      "设计自然语言→布局推断→HTML/CSS 的转换管线，降低 PM 输出原型的门槛",
      "开源社区维护，持续迭代响应产品经理与开发者反馈",
    ],
    demoUrl: "",
    githubUrl: "https://github.com/sunsun-cy/prototype-html-plus",
  },
];
