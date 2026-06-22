"use client"

import * as React from "react"
import { Check, Code2, LayoutTemplate, MousePointer2 } from "lucide-react"

import { cn } from "@/lib/utils"

const modes = [
  { id: "layout", label: "Layout", icon: LayoutTemplate },
  { id: "code", label: "Code", icon: Code2 },
  { id: "preview", label: "Preview", icon: MousePointer2 },
] as const

type Mode = (typeof modes)[number]["id"]

export function BuildPreview() {
  const [activeMode, setActiveMode] = React.useState<Mode>("preview")

  return (
    <div className="flex size-full min-h-0 flex-col bg-[#101113] text-[#f2efe8]">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/8 px-4 md:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#ff5a36]" />
          <span className="size-2 rounded-full bg-[#d4a72c]" />
          <span className="size-2 rounded-full bg-[#5e9d70]" />
        </div>
        <p className="font-mono text-[0.65rem] text-white/45 md:text-xs">
          useful-web-project.local
        </p>
        <div className="w-10" />
      </div>

      <div className="grid min-h-0 flex-1 md:grid-cols-[13rem_1fr]">
        <aside className="hidden border-r border-white/8 bg-[#151619] p-4 md:flex md:flex-col md:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] text-white/35 uppercase">
              Build stages
            </p>
            <nav className="mt-5 flex flex-col gap-2" aria-label="Preview modes">
              {modes.map((mode) => {
                const Icon = mode.icon
                const isActive = activeMode === mode.id

                return (
                  <button
                    key={mode.id}
                    type="button"
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      isActive
                        ? "bg-[#ff5a36] text-white"
                        : "text-white/55 hover:bg-white/6 hover:text-white",
                    )}
                    onClick={() => setActiveMode(mode.id)}
                    aria-pressed={isActive}
                  >
                    <Icon className="size-4" />
                    {mode.label}
                  </button>
                )
              })}
            </nav>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/3 p-3">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Check className="size-3.5 text-[#ff7655]" />
              Responsive
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/35">
              Built to adapt from mobile to desktop.
            </p>
          </div>
        </aside>

        <div className="relative min-h-0 overflow-hidden bg-[#e9e6de] p-3 text-[#171819] md:p-7">
          <div className="mb-3 flex gap-2 md:hidden" aria-label="Preview modes">
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  activeMode === mode.id
                    ? "bg-[#ff5a36] text-white"
                    : "bg-black/7 text-black/60",
                )}
                aria-pressed={activeMode === mode.id}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {activeMode === "code" ? <CodePanel /> : <WebsitePanel mode={activeMode} />}
        </div>
      </div>
    </div>
  )
}
function CodePanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#17191d] p-5 font-mono text-xs leading-7 text-white/65 md:p-8 md:text-sm">
      <p><span className="text-[#ff7655]">const</span> idea = <span className="text-[#e8c36a]">&quot;useful website&quot;</span></p>
      <p><span className="text-[#ff7655]">const</span> build = &#123;</p>
      <p className="pl-5">structure: <span className="text-[#e8c36a]">&quot;HTML&quot;</span>,</p>
      <p className="pl-5">style: <span className="text-[#e8c36a]">&quot;CSS&quot;</span>,</p>
      <p className="pl-5">interaction: <span className="text-[#e8c36a]">&quot;JavaScript&quot;</span>,</p>
      <p>&#125;</p>
      <p className="mt-5 text-white/30">// build, test, improve</p>
      <span className="mt-auto h-px w-full bg-gradient-to-r from-[#ff5a36] to-transparent" />
    </div>
  )
}

function WebsitePanel({ mode }: { mode: "layout" | "preview" }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#f8f5ed] shadow-xl">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-black/8 px-4">
        <span className="size-5 rounded-lg bg-[#ff5a36]" />
        <div className="flex gap-4 text-[0.55rem] font-medium text-black/45 md:text-[0.65rem]">
          <span>Work</span><span>About</span><span>Contact</span>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 gap-4 p-5 md:grid-cols-[1.05fr_.95fr] md:gap-8 md:p-10">
        <div className="flex flex-col justify-center">
          <p className="max-w-md text-3xl leading-[1.02] font-semibold tracking-[-0.05em] md:text-5xl">
            Simple ideas can become useful experiences.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-black/55 md:text-sm">
            Thoughtful structure, clear styling and interaction that has a reason to exist.
          </p>
          <span className="mt-6 w-fit rounded-lg bg-[#ff5a36] px-4 py-2 text-xs font-semibold text-white">
            Explore the build
          </span>
        </div>
        <div className="relative hidden items-center justify-center md:flex">
          <div className="absolute inset-[12%] rounded-full bg-[#ff5a36]/16 blur-3xl" />
          <div className="relative grid aspect-square w-[78%] grid-cols-2 gap-3 rotate-3 rounded-[2rem] border border-black/10 bg-white/70 p-4 shadow-xl">
            <span className="rounded-2xl bg-[#171819]" />
            <span className="rounded-2xl bg-[#ff5a36]" />
            <span className="col-span-2 rounded-2xl border border-black/10 bg-[#ebe7de]" />
          </div>
        </div>
      </div>
      {mode === "layout" && (
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-[#ff5a36]/70 md:inset-6">
          <span className="absolute top-3 left-3 bg-[#f8f5ed] px-2 font-mono text-[0.6rem] text-[#ff5a36]">
            responsive layout
          </span>
        </div>
      )}
    </div>
  )
}
