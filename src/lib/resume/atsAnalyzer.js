/**
 * ATS Analyzer & Job Description Matcher Service - PrepMate
 */

export const DEFAULT_RESUME = {
  fullName: "Alex Rivera",
  title: "Full Stack Developer",
  email: "alex.rivera@university.edu",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  summary: "Results-driven Software Engineer with hands-on experience building high-performance web applications using React, Node.js, Python, and SQL databases. Strong foundation in DSA, REST APIs, and modern frontend architecture.",
  education: [
    { degree: "B.S. in Computer Science", school: "State University", year: "2021 - 2025", gpa: "3.8/4.0" }
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "TechPulse Solutions",
      duration: "Jun 2024 - Aug 2024",
      bullets: [
        "Built responsive React dashboards consuming RESTful APIs, improving page render performance by 28%.",
        "Refactored legacy backend routes in Node.js/Express, optimizing database queries with SQL indexing.",
        "Collaborated with cross-functional teams in an Agile environment using Git, JIRA, and CI/CD pipelines."
      ]
    }
  ],
  projects: [
    {
      name: "PrepMate — AI Interview Platform",
      tech: "React, Node.js, Web Speech API, Tailwind, MongoDB",
      bullets: [
        "Architected an end-to-end MNC interview preparation SaaS app supporting AI mock sessions & DSA sandbox.",
        "Implemented real-time speech synthesis and ATS score calculation algorithm across 10 competency domains."
      ]
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "Python", "SQL", "PostgreSQL",
    "MongoDB", "REST APIs", "Git", "Data Structures & Algorithms", "HTML5/CSS3"
  ]
};

export const SAMPLE_JOB_DESCRIPTION = `
Software Engineer (Full Stack) — Product MNC

Role Overview:
We are seeking a high-performing Full Stack Engineer to build scalable cloud services and modern user interfaces.

Requirements:
- Strong experience with JavaScript, React, and Node.js backend microservices.
- Proficiency in SQL / NoSQL database design (PostgreSQL, MongoDB, Redis).
- Experience with Docker, Kubernetes, AWS, and CI/CD automation pipelines.
- Solid understanding of Data Structures, Algorithms, and System Design scalability.
- Excellent problem solving, communication, and Agile team collaboration.
`;

export function analyzeAtsResume(resumeText = "", targetJd = SAMPLE_JOB_DESCRIPTION) {
  const resumeLower = (resumeText || JSON.stringify(DEFAULT_RESUME)).toLowerCase();
  const jdLower = targetJd.toLowerCase();

  // Keyword extraction
  const targetKeywords = [
    { name: "React", found: resumeLower.includes("react") },
    { name: "Node.js", found: resumeLower.includes("node") },
    { name: "JavaScript", found: resumeLower.includes("javascript") },
    { name: "TypeScript", found: resumeLower.includes("typescript") },
    { name: "SQL", found: resumeLower.includes("sql") },
    { name: "REST APIs", found: resumeLower.includes("rest") || resumeLower.includes("api") },
    { name: "Docker", found: resumeLower.includes("docker") },
    { name: "AWS", found: resumeLower.includes("aws") },
    { name: "Redis", found: resumeLower.includes("redis") },
    { name: "Data Structures", found: resumeLower.includes("data structure") || resumeLower.includes("dsa") },
    { name: "System Design", found: resumeLower.includes("system design") || resumeLower.includes("architecture") },
    { name: "CI/CD", found: resumeLower.includes("ci/cd") || resumeLower.includes("pipeline") }
  ];

  const matched = targetKeywords.filter(k => k.found).map(k => k.name);
  const missing = targetKeywords.filter(k => !k.found).map(k => k.name);

  const keywordMatchPct = Math.round((matched.length / targetKeywords.length) * 100);
  const atsScore = Math.min(98, Math.max(50, keywordMatchPct + 10));
  const technicalStrength = Math.round((matched.length * 8) + 15);
  const impactScore = 78;

  return {
    atsScore,
    keywordMatchPct,
    technicalStrength,
    impactScore,
    matchedSkills: matched,
    missingSkills: missing,
    recommendations: [
      missing.includes("Docker") ? "Add containerization experience (Docker / Kubernetes) to your skills or project bullets." : null,
      missing.includes("Redis") ? "Include Redis caching in project architecture descriptions." : null,
      missing.includes("AWS") ? "Mention cloud deployment experience (AWS EC2 / S3 / Vercel)." : null,
      "Ensure bullet points start with strong action verbs (Architected, Engineered, Developed)."
    ].filter(Boolean)
  };
}
