export type Capability = {
  title: string
  description: string
  detail: string
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
    title: "Responsive websites",
    description: "Pages that feel natural on phones, tablets and desktops.",
    detail: "HTML + CSS",
  },
  {
    title: "Interactive web features",
    description:
      "Navigation, forms and interface behaviour built with JavaScript.",
    detail: "JavaScript",
  },
  {
    title: "Practical problem solving",
    description: "Clear thinking across code, computers and technical support.",
    detail: "Java + Python",
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
