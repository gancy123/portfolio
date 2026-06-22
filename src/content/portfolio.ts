export type Capability = {
  number: string
  title: string
  description: string
  tools: string[]
  visual: "frontend" | "software" | "support"
}

export type JourneyItem = {
  label: string
  period: string
  title: string
  place: string
  description?: string
}

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Front-end development",
    description:
      "Responsive interfaces and useful interactions built with React, TypeScript and Tailwind CSS.",
    tools: ["React", "TypeScript", "Tailwind CSS"],
    visual: "frontend",
  },
  {
    number: "02",
    title: "Software foundations",
    description:
      "Small programs and problem-solving exercises using Java and Python, with attention to clear logic and maintainable structure.",
    tools: ["Java", "Python", "Programming fundamentals"],
    visual: "software",
  },
  {
    number: "03",
    title: "Technical support",
    description:
      "Diagnosing everyday computer, network and user issues with a methodical, practical approach.",
    tools: ["Troubleshooting", "Testing", "User support"],
    visual: "support",
  },
]

export const journey: JourneyItem[] = [
  {
    label: "QUT",
    period: "2024 to present",
    title: "Bachelor of Information Technology",
    place: "Queensland University of Technology",
    description: "Computer Science major based in Brisbane.",
  },
  {
    label: "Internship",
    period: "2023",
    title: "Technical Support Internship",
    place: "SP Digital Plus",
    description:
      "Supported users, updated databases, tested networks and helped with backup and recovery.",
  },
  {
    label: "APU",
    period: "2021 to 2023",
    title: "Diploma of Information and Communication Technology",
    place: "Asia Pacific University",
    description: "Software Engineering specialisation.",
  },
]
