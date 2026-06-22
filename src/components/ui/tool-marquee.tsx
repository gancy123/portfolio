import type { IconType } from "react-icons"
import {
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si"

const tools: { name: string; icon: IconType; color: string }[] = [
  { name: "HTML", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS", icon: SiCss, color: "#1572b6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Java", icon: SiOpenjdk, color: "#437291" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
]

function ToolGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="tool-marquee-group flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4"
      aria-hidden={duplicate || undefined}
      role={duplicate ? undefined : "list"}
    >
      {tools.map(({ name, icon: Icon, color }) => (
        <div
          key={name}
          role={duplicate ? undefined : "listitem"}
          tabIndex={duplicate ? -1 : 0}
          className="group/tool flex min-w-max items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-4 text-white/42 transition-[border-color,background-color,color,transform] duration-300 outline-none hover:-translate-y-0.5 hover:border-[#ff7655]/35 hover:bg-[#ff7655]/6 hover:text-[#ff7655] focus-visible:border-[#ff7655]/55 focus-visible:text-[#ff7655] focus-visible:ring-2 focus-visible:ring-[#ff7655]/25 md:gap-4 md:px-6 md:py-5"
        >
          <Icon
            className="size-6 shrink-0 opacity-85 transition-[transform,opacity,filter] duration-300 group-hover/tool:scale-105 group-hover/tool:opacity-100 group-hover/tool:drop-shadow-[0_0_10px_currentColor] group-focus-visible/tool:scale-105 group-focus-visible/tool:opacity-100 md:size-8"
            style={{ color }}
            aria-hidden="true"
          />
          <span className="text-sm font-medium tracking-[-0.02em] text-white/65 transition-colors group-hover/tool:text-white group-focus-visible/tool:text-white md:text-base">
            {name}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ToolMarquee() {
  return (
    <div
      className="tool-marquee"
      aria-label="Tools I use and continue to learn"
    >
      <div className="tool-marquee-track flex w-max">
        <ToolGroup />
        <ToolGroup duplicate />
      </div>
    </div>
  )
}
