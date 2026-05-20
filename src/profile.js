export const profile = {
  common: {
    avatarAlt: "Maxuejiao portrait",
    email: "mxjinb612@163.com",
    phone: "+86 134-7896-4303",
    homepage: "https://daisyinb612.github.io/",
    scholar: "https://scholar.google.com/citations?user=NiV3ahQAAAAJ&hl=en",
    github: "https://github.com/daisyinb612",
  },
  locales: {
    zh: {
      languageLabel: "中文",
      switchLabel: "English",
      siteTitle: "马雪娇 - 学术主页",
      name: "马雪娇",
      englishName: "Maxuejiao",
      role: "Incoming Ph.D. Student / Human-Agent Interaction Researcher",
      affiliation: "上海人工智能研究院 · 华东师范大学",
      lab: "计算机科学与技术 / 教育智能与人机交互",
      location: "上海，中国",
      nav: [
        { id: "about", label: "关于我" },
        { id: "education", label: "教育经历" },
        { id: "research", label: "研究方向" },
        { id: "publications", label: "论文" },
        { id: "experience", label: "经历" },
        { id: "skills", label: "技能" },
      ],
      headings: {
        about: "关于我",
        education: "教育经历",
        research: "研究方向",
        publications: "论文与项目",
        experience: "实习与项目经历",
        skills: "技能与荣誉",
      },
      bio:
        "我即将于 2026 年 9 月开始博士阶段学习，专业为计算机科学与技术，隶属于上海人工智能研究院。我的研究关注 Human-Agent Interaction、AI 支持的学习与创作，以及面向教育场景的智能交互系统。我希望通过原型设计、系统实现和用户研究，探索 agent 时代更可控、透明且有帮助的人机协作方式。",
      researchSummary:
        "我的当前兴趣集中在智能体时代的交互新范式：人如何理解、控制和信任 AI agents；教师与学习者如何在生成式 AI 系统中保持主体性；以及如何通过可解释的工作流设计提升教育场景中的创作、反馈和决策质量。",
      interests: [
        "Human-Agent Interaction",
        "LLM Agents for Learning",
        "AI-supported Scriptwriting",
        "Educational HCI",
        "User Study and Mixed Methods",
      ],
      education: [
        {
          period: "2026.9 - 预计",
          degree: "博士研究生，即将入学",
          school: "上海人工智能研究院 / 华东师范大学",
          detail: "计算机科学与技术专业；研究方向为 Human-Agent Interaction 与教育智能系统。",
        },
        {
          period: "2024.9 - 2026.6",
          degree: "硕士研究生，硕转博",
          school: "华东师范大学",
          detail: "教育技术学；关注智能体交互、AI 支持学习、教育智能系统与用户研究。",
        },
        {
          period: "2020.9 - 2024.6",
          degree: "本科",
          school: "华东师范大学",
          detail: "环境设计专业；专业排名 1/16，曾任班长。",
        },
      ],
      publications: [
        {
          tag: "CHI EA 2026",
          title:
            "CO-OPERA: Designing an AI System for Middle School Teachers to Co-Create Social Awareness Drama Scripts",
          authors: "Xuejiao Ma, Min Fan, Bo Jiang, Jiatong Wang, Yuyang He",
          venue:
            "Proceedings of the Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems",
          status: "ACM CHI 2026 Extended Abstracts / Poster",
          image: "../assets/images/coopera-preview.jpg",
          imageAlt: "CO-OPERA system workflow preview",
          links: [
            {
              label: "ACM DL",
              url: "https://dl.acm.org/doi/full/10.1145/3772363.3798316",
            },
            {
              label: "PDF",
              url: "https://dl.acm.org/doi/pdf/10.1145/3772363.3798316",
            },
            {
              label: "DOI",
              url: "https://doi.org/10.1145/3772363.3798316",
            },
            {
              label: "Citation",
              url: "https://dl.acm.org/action/showCitFormats?doi=10.1145%2F3772363.3798316",
            },
          ],
          bullets: [
            "设计并实现面向初中教师的 AI 协作剧本创作系统，支持社会情感学习场景中的叙事脚本生成与编辑。",
            "探索 prompt engineering、多步骤 AI workflow 与教师可控的人机协作界面设计。",
            "围绕脚本质量、创作效率、可用性与教师感知价值开展系统评估。",
          ],
        },
        {
          tag: "TOG 2026",
          title:
            "FreeShell: A Context-Free 4D Printing Technique for Fabricating Complex 3D Triangle Mesh Shells",
          authors: "Chao Yuan, Shengqi Dang, Xuejiao Ma, Nan Cao",
          venue: "ACM Transactions on Graphics",
          status: "ACM TOG / CCF-A",
          links: [
            {
              label: "ACM DL",
              url: "https://dl.acm.org/doi/10.1145/3778349",
            },
            {
              label: "PDF",
              url: "https://dl.acm.org/doi/pdf/10.1145/3778349",
            },
            {
              label: "DOI",
              url: "https://doi.org/10.1145/3778349",
            },
            {
              label: "Citation",
              url: "https://dl.acm.org/action/showCitFormats?doi=10.1145%2F3778349",
            },
          ],
          bullets: [
            "参与论文可视化、实验材料整理与结果呈现，支持复杂 3D 三角网格壳体制造方法的学术表达。",
            "协助分析打印约束、mesh 处理流程和实验结果，为论文图表与叙述提供支持。",
          ],
        },
      ],
      projects: [
        {
          title: "Neurobo: 可对话可交互的智能轮椅",
          subtitle: "团队项目",
          bullets: [
            "构建面向智能轮椅场景的对话式交互原型，整合前端界面、后端 API 与 LLM 对话流程。",
            "探索多模态辅助、RAG 和对话评分等功能在辅助出行与人机协作中的应用。",
          ],
        },
      ],
      experience: [
        {
          period: "2025.5 - 2025.9",
          title: "产品经理实习生",
          org: "字节跳动 Data-speech",
          bullets: [
            "参与 prompt 撰写、数据标注、RLHF 相关流程设计与质量评估。",
            "负责需求分析、原型迭代与跨职能沟通，将模型能力转化为可执行的标注与评测流程。",
          ],
        },
      ],
      skills: [
        {
          title: "AI 与 Agent",
          items: ["ChatGPT", "Gemini", "DeepSeek", "LLM workflow", "prompt engineering", "RAG"],
        },
        {
          title: "开发能力",
          items: ["React Native Web", "JavaScript", "Python", "SQL", "front-end prototyping"],
        },
        {
          title: "HCI 研究",
          items: ["用户访谈", "问卷设计", "可用性测试", "主题分析", "混合方法研究"],
        },
        {
          title: "设计能力",
          items: ["Figma", "交互设计", "视觉表达", "学术海报与论文图表"],
        },
      ],
      honorsTitle: "荣誉",
      honors: [
        "华东师范大学优秀毕业生",
        "华东师范大学特等奖学金",
        "国家级创新创业训练计划项目负责人",
        "全国大学生电子商务创新、创意及创业挑战赛校级赛三等奖",
      ],
    },
    en: {
      languageLabel: "English",
      switchLabel: "中文",
      siteTitle: "Maxuejiao - Academic Homepage",
      name: "Xuejiao Ma",
      englishName: "Maxuejiao",
      role: "Incoming Ph.D. Student / Human-Agent Interaction Researcher",
      affiliation: "Shanghai Artificial Intelligence Laboratory · East China Normal University",
      lab: "Computer Science and Technology / AI for Education and HCI",
      location: "Shanghai, China",
      nav: [
        { id: "about", label: "About" },
        { id: "education", label: "Education" },
        { id: "research", label: "Research" },
        { id: "publications", label: "Publications" },
        { id: "experience", label: "Experience" },
        { id: "skills", label: "Skills" },
      ],
      headings: {
        about: "About",
        education: "Education",
        research: "Research Interests",
        publications: "Publications and Projects",
        experience: "Experience",
        skills: "Skills and Honors",
      },
      bio:
        "I am an incoming Ph.D. student starting in September 2026, majoring in Computer Science and Technology and affiliated with Shanghai Artificial Intelligence Laboratory. My research focuses on Human-Agent Interaction, AI-supported learning and creativity, and intelligent interactive systems for education. I build and evaluate LLM-based systems through prototyping, system implementation, and user studies.",
      researchSummary:
        "My current work studies new interaction paradigms in the age of AI agents: how people understand, control, and trust agents; how teachers and learners retain agency in generative AI systems; and how transparent workflows can improve creation, feedback, and decision-making in educational contexts.",
      interests: [
        "Human-Agent Interaction",
        "LLM Agents for Learning",
        "AI-supported Scriptwriting",
        "Educational HCI",
        "User Study and Mixed Methods",
      ],
      education: [
        {
          period: "2026.9 - expected",
          degree: "Incoming Ph.D. Student",
          school: "Shanghai Artificial Intelligence Laboratory / East China Normal University",
          detail:
            "Computer Science and Technology; focusing on Human-Agent Interaction and intelligent educational systems.",
        },
        {
          period: "2024.9 - 2026.6",
          degree: "M.S. Student, master-to-Ph.D. track",
          school: "East China Normal University",
          detail:
            "Educational Technology; focusing on agent interaction, AI-supported learning, intelligent educational systems, and user research.",
        },
        {
          period: "2020.9 - 2024.6",
          degree: "B.A.",
          school: "East China Normal University",
          detail: "Environmental Design; ranked 1/16 in the program and served as class monitor.",
        },
      ],
      publications: [
        {
          tag: "CHI EA 2026",
          title:
            "CO-OPERA: Designing an AI System for Middle School Teachers to Co-Create Social Awareness Drama Scripts",
          authors: "Xuejiao Ma, Min Fan, Bo Jiang, Jiatong Wang, Yuyang He",
          venue:
            "Proceedings of the Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems",
          status: "ACM CHI 2026 Extended Abstracts / Poster",
          image: "../assets/images/coopera-preview.jpg",
          imageAlt: "CO-OPERA system workflow preview",
          links: [
            {
              label: "ACM DL",
              url: "https://dl.acm.org/doi/full/10.1145/3772363.3798316",
            },
            {
              label: "PDF",
              url: "https://dl.acm.org/doi/pdf/10.1145/3772363.3798316",
            },
            {
              label: "DOI",
              url: "https://doi.org/10.1145/3772363.3798316",
            },
            {
              label: "Citation",
              url: "https://dl.acm.org/action/showCitFormats?doi=10.1145%2F3772363.3798316",
            },
          ],
          bullets: [
            "Designed and implemented an AI co-creation system that helps middle school teachers create social awareness drama scripts.",
            "Explored prompt engineering, multi-step AI workflows, and teacher-centered controls for human-AI collaboration.",
            "Evaluated the system around script quality, writing efficiency, usability, and perceived usefulness.",
          ],
        },
        {
          tag: "TOG 2026",
          title:
            "FreeShell: A Context-Free 4D Printing Technique for Fabricating Complex 3D Triangle Mesh Shells",
          authors: "Chao Yuan, Shengqi Dang, Xuejiao Ma, Nan Cao",
          venue: "ACM Transactions on Graphics",
          status: "ACM TOG / CCF-A",
          links: [
            {
              label: "ACM DL",
              url: "https://dl.acm.org/doi/10.1145/3778349",
            },
            {
              label: "PDF",
              url: "https://dl.acm.org/doi/pdf/10.1145/3778349",
            },
            {
              label: "DOI",
              url: "https://doi.org/10.1145/3778349",
            },
            {
              label: "Citation",
              url: "https://dl.acm.org/action/showCitFormats?doi=10.1145%2F3778349",
            },
          ],
          bullets: [
            "Contributed to visualization, experimental material organization, and result presentation for complex 3D mesh shell fabrication.",
            "Supported analysis of printing constraints, mesh processing workflows, and experimental outcomes.",
          ],
        },
      ],
      projects: [
        {
          title: "Neurobo: Conversational and Interactive Intelligent Wheelchair",
          subtitle: "Team project",
          bullets: [
            "Built a conversational assistant prototype for intelligent wheelchair interaction scenarios, integrating front-end UI, back-end APIs, and LLM dialogue flow.",
            "Explored multimodal assistance, RAG, and dialogue scoring for assistive mobility and human-agent collaboration.",
          ],
        },
      ],
      experience: [
        {
          period: "2025.5 - 2025.9",
          title: "Product Manager Intern",
          org: "ByteDance Data-speech",
          bullets: [
            "Worked on prompt writing, data annotation workflows, RLHF-related process design, and quality evaluation.",
            "Conducted requirement analysis, prototype iteration, and cross-functional communication to translate model capabilities into executable annotation and evaluation workflows.",
          ],
        },
      ],
      skills: [
        {
          title: "AI and Agents",
          items: ["ChatGPT", "Gemini", "DeepSeek", "LLM workflow", "prompt engineering", "RAG"],
        },
        {
          title: "Coding",
          items: ["React Native Web", "JavaScript", "Python", "SQL", "front-end prototyping"],
        },
        {
          title: "HCI Research",
          items: ["interviews", "surveys", "usability testing", "thematic analysis", "mixed methods"],
        },
        {
          title: "Design",
          items: ["Figma", "interaction design", "visual communication", "academic posters and figures"],
        },
      ],
      honorsTitle: "Honors",
      honors: [
        "Outstanding Graduate of East China Normal University",
        "Special-class Scholarship of East China Normal University",
        "Principal Investigator of a National Innovation and Entrepreneurship Training Program",
        "Third Prize in the university-level e-commerce innovation and entrepreneurship competition",
      ],
    },
  },
};
