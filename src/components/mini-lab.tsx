"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Check,
  Eye,
  EyeOff,
  File,
  FileCode2,
  FileImage,
  FileText,
  Folder,
  FolderCog,
  ListChecks,
  Monitor,
  MonitorSmartphone,
  Plus,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type DemoId = "responsive" | "tasks" | "password" | "files"

type DemoDefinition = {
  id: DemoId
  label: string
  description: string
  icon: LucideIcon
}

const demos: DemoDefinition[] = [
  {
    id: "responsive",
    label: "Responsive preview",
    description: "One page, different screens.",
    icon: MonitorSmartphone,
  },
  {
    id: "tasks",
    label: "Task tracker",
    description: "Add, filter and finish tasks.",
    icon: ListChecks,
  },
  {
    id: "password",
    label: "Password checker",
    description: "Private, local strength feedback.",
    icon: ShieldCheck,
  },
  {
    id: "files",
    label: "File organizer",
    description: "A safe sorting simulation.",
    icon: FolderCog,
  },
]

export function MiniLabSection() {
  const [activeId, setActiveId] = React.useState<DemoId>("responsive")
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const activeDemo = demos.find((demo) => demo.id === activeId) ?? demos[0]

  const selectByIndex = (index: number) => {
    const nextDemo = demos[index]
    if (!nextDemo) return

    setActiveId(nextDemo.id)
    tabRefs.current[index]?.focus()
  }

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault()
      selectByIndex((index + 1) % demos.length)
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault()
      selectByIndex((index - 1 + demos.length) % demos.length)
    } else if (event.key === "Home") {
      event.preventDefault()
      selectByIndex(0)
    } else if (event.key === "End") {
      event.preventDefault()
      selectByIndex(demos.length - 1)
    }
  }

  return (
    <section id="mini-lab" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#ff7655] uppercase">
              Mini lab
            </p>
            <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.045em] md:text-5xl">
              Small experiments, real interaction.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/52 md:text-lg lg:justify-self-end">
            Four simple examples that show how I approach interfaces, logic and
            everyday computer problems.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111214] shadow-[0_32px_90px_rgb(0_0_0/0.32)]">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 font-mono text-[0.65rem] text-white/30">
            <div className="flex gap-2" aria-hidden="true">
              <span className="size-2 rounded-full bg-[#ff5a36]" />
              <span className="size-2 rounded-full bg-white/18" />
              <span className="size-2 rounded-full bg-white/18" />
            </div>
            <span>mini-lab.local</span>
            <span>04 experiments</span>
          </div>

          <div className="grid md:grid-cols-[14rem_1fr]">
            <div
              role="tablist"
              aria-label="Mini Lab demos"
              className="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/8 bg-[#101113] p-3 md:block md:border-r md:border-b-0 md:p-4"
            >
              <p className="hidden px-3 pt-2 pb-4 font-mono text-[0.62rem] tracking-[0.16em] text-[#ff7655] uppercase md:block">
                Choose a demo
              </p>
              {demos.map((demo, index) => {
                const Icon = demo.icon
                const isActive = demo.id === activeId

                return (
                  <button
                    key={demo.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    id={`mini-lab-tab-${demo.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`mini-lab-panel-${demo.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(demo.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={cn(
                      "group flex min-w-max items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors outline-none md:mb-1 md:w-full md:min-w-0",
                      "focus-visible:ring-2 focus-visible:ring-[#ff7655]/55",
                      isActive
                        ? "bg-[#ff5a36]/12 text-white"
                        : "text-white/38 hover:bg-white/[0.035] hover:text-white/68"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors [&_svg]:size-4",
                        isActive
                          ? "border-[#ff7655]/35 text-[#ff7655]"
                          : "border-white/8 text-white/35 group-hover:text-[#ff7655]"
                      )}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium md:text-sm">
                        {demo.label}
                      </span>
                      <span className="mt-1 hidden text-[0.68rem] text-white/28 md:block">
                        {demo.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              id={`mini-lab-panel-${activeId}`}
              role="tabpanel"
              aria-labelledby={`mini-lab-tab-${activeId}`}
              tabIndex={0}
              className="relative min-h-[32rem] overflow-hidden bg-[#191a1c] p-5 outline-none focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:ring-inset sm:p-7 md:p-9"
            >
              <div className="pointer-events-none absolute -top-32 -right-20 size-80 rounded-full bg-[#ff5a36]/10 blur-3xl" />
              <div className="relative">
                <p className="font-mono text-[0.62rem] tracking-[0.15em] text-[#ff7655] uppercase">
                  Live example
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] md:text-3xl">
                  {activeDemo.label}
                </h3>
                <p className="mt-2 text-sm text-white/38">
                  {activeDemo.description}
                </p>

                <div className="mt-7">
                  <DemoContent key={activeId} activeId={activeId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoContent({ activeId }: { activeId: DemoId }) {
  if (activeId === "tasks") return <TaskTrackerDemo />
  if (activeId === "password") return <PasswordCheckerDemo />
  if (activeId === "files") return <FileOrganizerDemo />
  return <ResponsivePreviewDemo />
}

function ResponsivePreviewDemo() {
  const [device, setDevice] = React.useState<"desktop" | "mobile">("desktop")
  const isMobile = device === "mobile"

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <div className="flex rounded-xl border border-white/8 bg-[#101113] p-1">
          {(["desktop", "mobile"] as const).map((option) => {
            const Icon = option === "desktop" ? Monitor : Smartphone
            const selected = option === device
            return (
              <button
                key={option}
                type="button"
                onClick={() => setDevice(option)}
                aria-pressed={selected}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[0.65rem] capitalize transition-colors focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:outline-none",
                  selected
                    ? "bg-[#ff5a36] text-white"
                    : "text-white/35 hover:text-white/65"
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {option}
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={cn(
          "mx-auto overflow-hidden rounded-2xl border border-black/10 bg-[#f2efe8] text-[#171819] shadow-2xl transition-[max-width] duration-500 motion-reduce:transition-none",
          isMobile ? "max-w-[19rem]" : "max-w-4xl"
        )}
      >
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-3 text-[0.55rem] text-black/42">
          <span className="size-4 rounded-full bg-[#ff5a36]" />
          <span>WORK &nbsp; ABOUT &nbsp; CONTACT</span>
        </div>
        <div
          className={cn(
            "grid items-center gap-5 p-6 transition-all duration-500 motion-reduce:transition-none sm:p-8",
            isMobile ? "grid-cols-1" : "sm:grid-cols-[1fr_10rem]"
          )}
        >
          <div>
            <p
              className={cn(
                "leading-[0.98] font-semibold tracking-[-0.05em]",
                isMobile ? "text-3xl" : "text-3xl sm:text-4xl"
              )}
            >
              A simple page that adapts.
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-black/48">
              The same structure rearranges itself to stay readable on every
              screen.
            </p>
            <span className="mt-5 inline-flex rounded-lg bg-[#ff5a36] px-3 py-2 text-[0.65rem] font-medium text-white">
              Explore
            </span>
          </div>
          <div
            className={cn(
              "rounded-[1.4rem] bg-[linear-gradient(145deg,#171819_0_48%,#ff5a36_49%_76%,#ffd1c5_77%)]",
              isMobile ? "h-28" : "h-36"
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

type Task = { id: number; label: string; done: boolean }
type TaskFilter = "all" | "active" | "done"

const initialTasks: Task[] = [
  { id: 1, label: "Check the mobile layout", done: true },
  { id: 2, label: "Improve one interaction", done: false },
]

function TaskTrackerDemo() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks)
  const [draft, setDraft] = React.useState("")
  const [filter, setFilter] = React.useState<TaskFilter>("all")
  const [error, setError] = React.useState("")
  const nextId = React.useRef(3)

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done
    if (filter === "done") return task.done
    return true
  })

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const label = draft.trim()

    if (!label) {
      setError("Write a task before adding it.")
      return
    }

    setTasks((current) => [
      ...current,
      { id: nextId.current++, label, done: false },
    ])
    setDraft("")
    setError("")
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/8 bg-[#111214] p-5 sm:p-6">
      <form onSubmit={addTask} noValidate>
        <label htmlFor="mini-lab-task" className="sr-only">
          New task
        </label>
        <div className="flex gap-2">
          <input
            id="mini-lab-task"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value)
              if (error) setError("")
            }}
            placeholder="Add a small task..."
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ff7655]/55 focus:ring-2 focus:ring-[#ff7655]/15"
          />
          <button
            type="submit"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#ff5a36] text-white transition-colors hover:bg-[#ff6a49] focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214] focus-visible:outline-none"
            aria-label="Add task"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <p aria-live="polite" className="mt-2 min-h-4 text-xs text-[#ff8d73]">
          {error}
        </p>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {(["all", "active", "done"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={cn(
              "rounded-lg px-3 py-2 font-mono text-[0.62rem] capitalize transition-colors focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:outline-none",
              filter === option
                ? "bg-[#ff5a36]/14 text-[#ff7655]"
                : "bg-white/[0.035] text-white/35 hover:text-white/65"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        {visibleTasks.length ? (
          visibleTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/[0.025] p-3"
            >
              <button
                type="button"
                onClick={() =>
                  setTasks((current) =>
                    current.map((item) =>
                      item.id === task.id ? { ...item, done: !item.done } : item
                    )
                  )
                }
                aria-label={`${task.done ? "Mark active" : "Mark complete"}: ${task.label}`}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg border focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:outline-none",
                  task.done
                    ? "border-[#ff7655]/30 bg-[#ff5a36]/12 text-[#ff7655]"
                    : "border-white/10 text-transparent hover:text-white/25"
                )}
              >
                <Check className="size-3.5" />
              </button>
              <span
                className={cn(
                  "min-w-0 flex-1 text-sm",
                  task.done ? "text-white/28 line-through" : "text-white/68"
                )}
              >
                {task.label}
              </span>
              <button
                type="button"
                onClick={() =>
                  setTasks((current) =>
                    current.filter((item) => item.id !== task.id)
                  )
                }
                aria-label={`Remove task: ${task.label}`}
                className="flex size-8 items-center justify-center rounded-lg text-white/25 transition-colors hover:bg-white/5 hover:text-[#ff7655] focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:outline-none"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/28">
            No tasks in this view.
          </p>
        )}
      </div>
    </div>
  )
}

const passwordRules = [
  { label: "8 or more characters", test: (value: string) => value.length >= 8 },
  {
    label: "An uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  { label: "A lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "A number", test: (value: string) => /\d/.test(value) },
  { label: "A symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

function PasswordCheckerDemo() {
  const [value, setValue] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const passed = passwordRules.map((rule) => rule.test(value))
  const score = passed.filter(Boolean).length
  const strength =
    value.length === 0
      ? "Waiting"
      : score <= 1
        ? "Weak"
        : score <= 3
          ? "Growing"
          : score === 4
            ? "Strong"
            : "Excellent"

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/8 bg-[#111214] p-5 sm:p-6">
      <label htmlFor="mini-lab-password" className="text-sm text-white/58">
        Try a password
      </label>
      <div className="relative mt-3">
        <input
          id="mini-lab-password"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="new-password"
          className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 pr-12 text-sm text-white outline-none focus:border-[#ff7655]/55 focus:ring-2 focus:ring-[#ff7655]/15"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded-lg text-white/30 hover:text-white/65 focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:outline-none"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-[0.65rem] text-white/30">Strength</span>
        <span className="text-sm font-medium text-[#ff7655]" aria-live="polite">
          {strength}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2" aria-hidden="true">
        {passwordRules.map((rule, index) => (
          <span
            key={rule.label}
            className={cn(
              "h-1.5 rounded-full transition-colors",
              index < score ? "bg-[#ff5a36]" : "bg-white/8"
            )}
          />
        ))}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {passwordRules.map((rule, index) => (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-2 text-xs",
              passed[index] ? "text-white/58" : "text-white/28"
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full border",
                passed[index]
                  ? "border-[#ff7655]/35 bg-[#ff5a36]/12 text-[#ff7655]"
                  : "border-white/10"
              )}
            >
              {passed[index] ? <Check className="size-3" /> : null}
            </span>
            {rule.label}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-white/7 pt-4 font-mono text-[0.62rem] leading-relaxed text-white/25">
        Checked only in this browser. Nothing is stored or sent.
      </p>
    </div>
  )
}

type SampleFile = {
  name: string
  group: "Documents" | "Images" | "Code" | "Other"
}

const sampleFiles: SampleFile[] = [
  { name: "resume-final.pdf", group: "Documents" },
  { name: "project-notes.docx", group: "Documents" },
  { name: "hero-photo.png", group: "Images" },
  { name: "logo-export.jpg", group: "Images" },
  { name: "portfolio.tsx", group: "Code" },
  { name: "styles.css", group: "Code" },
  { name: "download.zip", group: "Other" },
]

const fileIcons: Record<SampleFile["group"], LucideIcon> = {
  Documents: FileText,
  Images: FileImage,
  Code: FileCode2,
  Other: File,
}

function FileOrganizerDemo() {
  const [organized, setOrganized] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()
  const groups = ["Documents", "Images", "Code", "Other"] as const

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/8 bg-[#111214] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm text-white/58">
            <FolderCog className="size-4 text-[#ff7655]" />
            File sorting simulation
          </p>
          <p className="mt-1 text-xs text-white/28">
            Uses sample names only—no real files are accessed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOrganized((current) => !current)}
          className="flex items-center gap-2 rounded-xl bg-[#ff5a36] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#ff6a49] focus-visible:ring-2 focus-visible:ring-[#ff7655]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214] focus-visible:outline-none"
        >
          {organized ? (
            <RotateCcw className="size-3.5" />
          ) : (
            <FolderCog className="size-3.5" />
          )}
          {organized ? "Reset" : "Organize files"}
        </button>
      </div>

      <div className="mt-6" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {organized ? (
            <motion.div
              key="organized"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {groups.map((group) => {
                const files = sampleFiles.filter((file) => file.group === group)
                return (
                  <div
                    key={group}
                    className="rounded-xl border border-white/7 bg-white/[0.025] p-4"
                  >
                    <p className="flex items-center gap-2 text-xs font-medium text-white/58">
                      <Folder className="size-4 text-[#ff7655]" /> {group}
                      <span className="ml-auto font-mono text-[0.58rem] text-white/25">
                        {files.length}
                      </span>
                    </p>
                    <div className="mt-3 space-y-2">
                      {files.map((file) => (
                        <FileRow key={file.name} file={file} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="messy"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-2 sm:grid-cols-2"
            >
              {sampleFiles.map((file) => (
                <FileRow key={file.name} file={file} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FileRow({ file }: { file: SampleFile }) {
  const Icon = fileIcons[file.group]

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border border-white/6 bg-white/[0.025] px-3 py-2.5">
      <Icon className="size-3.5 shrink-0 text-white/28" aria-hidden="true" />
      <span className="truncate font-mono text-[0.65rem] text-white/42">
        {file.name}
      </span>
    </div>
  )
}
