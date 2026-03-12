export const educationDataKo = [
  {
    date: "2026 - 현재",
    school: "UNSW Sydney",
    major: "Advanced Computer Science (Security Engineering)",
    description: "제로 트러스트 모델 및 복잡한 인프라 보안 설계를 위한 심화 보안 엔지니어링 과정 이수 중."
  },
  {
    date: "2021 - 2025",
    school: "Stony Brook University",
    major: "Technology System Management (기술경영학과)",
    description: "IT 시스템 관리 및 기술 전략 수립을 위한 기초 역량 습득."
  }
];

export const certDataKo = [
  {
    logo: "AWS",
    name: "AWS Security Specialty",
    issuer: "Amazon Web Services",
    date: "목표 2024",
    description: "고급 클라우드 보안 아키텍처 설계 및 사고 대응 체계 구축."
  },
  {
    logo: "CompTIA",
    name: "Security+",
    issuer: "CompTIA",
    date: "2023",
    description: "사이버 보안 원칙 및 실무 프로세스에 대한 핵심 기반 지식."
  },
  {
    logo: "OffSec",
    name: "OSCP",
    issuer: "Offensive Security",
    date: "취득 준비 중",
    description: "Offensive Security Certified Professional - 실무 모의해킹 역량 증명."
  },
  {
    logo: "Cisco",
    name: "CCNA",
    issuer: "Cisco",
    date: "2022",
    description: "네트워크 기초, IP 연결성 및 기본 네트워크 보안 프로토콜."
  },
  {
    logo: "ISC2",
    name: "SSCP",
    issuer: "ISC2",
    date: "목표 2025",
    description: "시스템 보안 실무자를 위한 (Systems Security Certified Practitioner) 자격."
  },
  {
    logo: "Google",
    name: "비반 Cyber Security",
    issuer: "Google",
    date: "2022",
    description: "플레이북 셋업, SIEM 로그 분석 및 보안 자동화를 위한 Python 스크립팅."
  }
];

export const projectDataKo = [
  {
    title: "Zero Trust Network Access (ZTNA)",
    thumbnail: "[ZTNA_DIAGRAM]",
    achievements: [
      "컨텍스트 인식형 리버스 프록시(Reverse Proxy) 설계 및 구축.",
      "mTLS를 통한 상호 양방향 인증 체계 구현.",
      "SSO 연동을 위한 Identity Provider (IdP) 통합 구축."
    ],
    techStack: ["Golang", "Envoy", "OIDC", "Redis"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    title: "Cloud Security Posture Management",
    thumbnail: "[CSPM_DASHBOARD]",
    achievements: [
      "멀티 클라우드(AWS/GCP) 환경 통합 보안 컴플라이언스 진단 자동화.",
      "취약점 탐지 및 분석 시간 40% 단축 달성.",
      "수동 개입을 최소화한 커스텀 자동 복구(Remediation) 파이프라인 구축."
    ],
    techStack: ["Python", "AWS Lambda", "Terraform", "React"],
    githubUrl: "#",
    demoUrl: "#"
  }
];
