export const profile = {
  common: {
    avatarAlt: "Maxuejiao portrait",
    email: "mxjinb612@gmail.com",
    phone: "+86 134-7896-4303",
    homepage: "https://daisyinb612.github.io/",
    scholar: "https://scholar.google.com/citations?user=NiV3ahQAAAAJ&hl=en",
    github: "https://github.com/daisyinb612",
  },
  locales: {
    zh: {
      languageLabel: "中文",
      switchLabel: "English",
      siteTitle: "马雪娇",
      name: "马雪娇",
      englishName: "Maxuejiao",
      role: "Incoming Ph.D. Student",
      affiliation: "华东师范大学",
      lab: "计算机科学与技术",
      location: "上海，中国",
      nav: [
        { id: "about", label: "关于我" },
        { id: "education", label: "教育经历" },
        { id: "publications", label: "论文" },
        { id: "innovation", label: "科创经历" },
        { id: "publicService", label: "公益实践" },
      ],
      headings: {
        about: "关于我",
        education: "教育经历",
        publications: "论文",
        innovation: "科创经历",
        experience: "实习经历",
        publicService: "公益实践",
      },
      bio:
        "我即将于 2026 年 9 月继续在华东师范大学上海人工智能教育研究院攻读人机交互博士，关注非正式学习场景。此前，我曾在字节跳动和虾皮担任 AI 产品经理实习生，支持AI模型训练和产品的工作。我希望持续探索和实践 AI-native 产品，在生活与学习场景，让人能够与智能体共同协作和成长。",
      interests: [
        "Human-Agent Interaction",
        "Agent Support for Informal Learning",
        "Agent Support for Everyday Life",
      ],
      education: [
        {
          period: "2026.9 - 2029.6",
          degree: "博士研究生(计算机科学与技术)",
          school: "华东师范大学",
        },
        {
          period: "2024.9 - 2026.6",
          degree: "硕士研究生(教育技术学&计算机科学与技术)",
          school: "华东师范大学",
          // detail: "教育技术学；关注智能体交互、AI 支持学习、教育智能系统与用户研究。",
        },
        {
          period: "2020.9 - 2024.6",
          degree: "本科(环境设计)",
          school: "华东师范大学",
          // detail: "环境设计专业；专业排名 1/16，曾任班长。",
        },
      ],
      publications: [
        {
          tag: "CCF-A / UbiComp/ISWC 2026 Workshop (Accepted)",
          title:
            "BrickBuddy: A Step-Situated Wearable Agent for Knowledge Exploration During Brick Assembly",
          authors: "Xuejiao Ma, Ruijia Li, Bo Jiang",
          venue:
            "WearAgent 2026: The 1st International Workshop on Interactive AI for Personal Wearable Agents",
          status: "Accepted at the UbiComp/ISWC 2026 WearAgent Workshop",
          image: "../assets/images/Ubicomp.jpg",
          imageAlt: "BrickBuddy UbiComp Workshop preview",
          links: [
            {
              label: "项目介绍",
              url: "https://daisyinb612.github.io/BrickBuddy/",
            },
            {
              label: "Demo",
              url: "https://www.youtube.com/watch?v=3-L7GyE6FCs",
            },
          ],
          bullets: [
            // "探索面向积木拼装学习的 step-situated wearable agent，支持学习者在真实操作过程中进行知识探索。",
            // "结合智能眼镜第一视角、步骤监测与语音交互，让智能体基于当前拼装步骤提供情境化回应。",
          ],
        },
        {
          tag: "CCF-A / CHI EA 2026",
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
            // "设计并实现面向初中教师的 AI 协作剧本创作系统，支持社会情感学习场景中的叙事脚本生成与编辑。",
            // "探索 prompt engineering、多步骤 AI workflow 与教师可控的人机协作界面设计。",
            // "围绕脚本质量、创作效率、可用性与教师感知价值开展系统评估。",
          ],
        },
        {
          tag: "CCF-A / TOG 2026",
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
            // "参与论文可视化、实验材料整理与结果呈现，支持复杂 3D 三角网格壳体制造方法的学术表达。",
            // "协助分析打印约束、mesh 处理流程和实验结果，为论文图表与叙述提供支持。",
          ],
        },
      ],
      innovation: [
        {
          period: "2026",
          title: "抖音创变者计划2026上海松江赛区交流赛金奖&游园会之星",
          subtitle: "[这次一定]运用搭搭agent的轻量化社交出行产品",
          images: [
            {
              src: "../assets/images/douyin1.jpg?v=20260705-jpeg",
              alt: "抖音创变者计划2026 上海松江赛区交流赛金奖现场图 1",
            },
            {
              src: "../assets/images/douyin2.jpg?v=20260705-jpeg",
              alt: "抖音创变者计划2026 上海松江赛区交流赛金奖现场图 2",
            },
          ],
        },
        {
          period: "2025",
          title: "腾讯 2025 Light 公益创造营年度优秀项目",
          subtitle: "CO-OPERA:人与人工智能协作式的青少年心理戏剧模拟平台",
          images: [
            {
              src: "../assets/images/tencent1.png",
              alt: "腾讯 2025 Light 公益创造营年度优秀项目图片 1",
            },
            {
              src: "../assets/images/tencent2.png",
              alt: "腾讯 2025 Light 公益创造营年度优秀项目图片 2",
            },
          ],
        },
      ],
      experience: [
        {
          period: "2025.11 - 2026.2",
          title: "虾皮 Shopee",
          org: "AI 产品经理实习生（搜推-AIGC-video）",
          logo: "../assets/logo/shopee.png",
        },
        {
          period: "2025.5 - 2025.10",
          title: "字节跳动",
          org: "AI 产品经理实习生（Data-speech，豆包端到端语音通话模型）",
          logo: "../assets/logo/baytedance.png",
        },
        {
          period: "2023.10 - 2024.4",
          title: "Momenta 自动驾驶科技公司",
          org: "AI 产品经理实习生",
          logo: "../assets/logo/momenta.png",
        },
      ],
      publicService: [
        {
          period: "2020.11",
          title: "西岸美术馆艺术教育导览志愿者",
        },
        {
          period: "2021.7",
          title: "“小树慢慢长大”福建龙岩支教活动",
        },
      ],
    },
    en: {
      languageLabel: "English",
      switchLabel: "中文",
      siteTitle: "Xuejiao Ma",
      name: "Xuejiao Ma",
      englishName: "Maxuejiao",
      role: "Incoming Ph.D. Student",
      affiliation: "East China Normal University",
      lab: "Computer Science and Technology",
      location: "Shanghai, China",
      nav: [
        { id: "about", label: "About" },
        { id: "education", label: "Education" },
        { id: "publications", label: "Publications" },
        { id: "innovation", label: "Innovation" },
        { id: "publicService", label: "Public Service" },
      ],
      headings: {
        about: "About",
        education: "Education",
        publications: "Publications",
        innovation: "Innovation",
        experience: "Internship Experience",
        publicService: "Public Service",
      },
      bio:
        "Starting in September 2026, I will continue as a Ph.D. student in Human-Computer Interaction at the Shanghai Institute of AI for Education, East China Normal University, focusing on informal learning contexts. Previously, I interned as an AI Product Manager at ByteDance and Shopee, supporting AI model training and product work. I hope to continue exploring and practicing AI-native products so that, in everyday life and learning scenarios, people can collaborate and grow with agents more naturally and with greater control.",
      interests: [
        "Human-Agent Interaction",
        "Agent Support for Informal Learning",
        "Agent Support for Everyday Life",
      ],
      education: [
        {
          period: "2026.9 - 2029.6",
          degree: "Ph.D. Student (Computer Science and Technology)",
          school: "East China Normal University",
        },
        {
          period: "2024.9 - 2026.6",
          degree: "M.S. Student (Educational Technology & Computer Science and Technology)",
          school: "East China Normal University",
        },
        {
          period: "2020.9 - 2024.6",
          degree: "B.A. (Environmental Design)",
          school: "East China Normal University",
        },
      ],
      publications: [
        {
          tag: "CCF-A / UbiComp/ISWC 2026 Workshop (Accepted)",
          title:
            "BrickBuddy: A Step-Situated Wearable Agent for Knowledge Exploration During Brick Assembly",
          authors: "Xuejiao Ma, Ruijia Li, Bo Jiang",
          venue:
            "WearAgent 2026: The 1st International Workshop on Interactive AI for Personal Wearable Agents",
          status: "Accepted at the UbiComp/ISWC 2026 WearAgent Workshop",
          image: "../assets/images/Ubicomp.jpg",
          imageAlt: "BrickBuddy UbiComp Workshop preview",
          links: [
            {
              label: "Project Page",
              url: "https://daisyinb612.github.io/BrickBuddy/",
            },
            {
              label: "Demo",
              url: "https://www.youtube.com/watch?v=3-L7GyE6FCs",
            },
          ],
          bullets: [],
        },
        {
          tag: "CCF-A / CHI EA 2026",
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
          bullets: [],
        },
        {
          tag: "CCF-A / TOG 2026",
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
          bullets: [],
        },
      ],
      innovation: [
        {
          period: "2026",
          title:
            "Douyin Change-maker Program 2026 Shanghai Songjiang Regional Exchange Gold Award & Fair Star",
          subtitle:
            "[This Time for Sure] A lightweight social travel product powered by Dada Agent",
          images: [
            {
              src: "../assets/images/douyin1.jpg?v=20260705-jpeg",
              alt: "Douyin Change-maker Program 2026 Shanghai Songjiang Gold Award image 1",
            },
            {
              src: "../assets/images/douyin2.jpg?v=20260705-jpeg",
              alt: "Douyin Change-maker Program 2026 Shanghai Songjiang Gold Award image 2",
            },
          ],
        },
        {
          period: "2025",
          title: "Tencent 2025 Light Public-Welfare Creator Camp Annual Outstanding Project",
          subtitle:
            "CO-OPERA: A Human-AI Collaborative Psychodrama Simulation Platform for Adolescents",
          images: [
            {
              src: "../assets/images/tencent1.png",
              alt: "Tencent 2025 Light Public-Welfare Creator Camp Outstanding Project image 1",
            },
            {
              src: "../assets/images/tencent2.png",
              alt: "Tencent 2025 Light Public-Welfare Creator Camp Outstanding Project image 2",
            },
          ],
        },
      ],
      experience: [
        {
          period: "2025.11 - 2026.2",
          title: "Shopee",
          org: "AI Product Manager Intern, Search and Recommendation AIGC Video",
          logo: "../assets/logo/shopee.png",
        },
        {
          period: "2025.5 - 2025.10",
          title: "ByteDance",
          org: "AI Product Manager Intern, Data-speech, Doubao end-to-end voice call model",
          logo: "../assets/logo/baytedance.png",
        },
        {
          period: "2023.10 - 2024.4",
          title: "Momenta Autonomous Driving Technology",
          org: "AI Product Manager Intern",
          logo: "../assets/logo/momenta.png",
        },
      ],
      publicService: [
        {
          period: "2020.11",
          title: "West Bund Museum Art Education Guide Volunteer",
        },
        {
          period: "2021.7",
          title: "\"Little Trees Slowly Grow Up\" Teaching Activity in Longyan, Fujian",
        },
      ],
    },
  },
};
