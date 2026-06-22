import {
  Check,
  Code2,
  ExternalLink,
  GitBranch,
  LayoutTemplate,
  MonitorSmartphone,
  MoveRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const projects = [
  {
    number: "01",
    title: "This portfolio",
    description:
      "A personal website designed to introduce what I can do without feeling like a formal résumé.",
    problem:
      "Make technical skills easy to understand while keeping the experience personal, responsive and memorable.",
    learned:
      "How reusable sections, accessible navigation and restrained motion can work together as one system.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "https://chun-yang-portfolio.vercel.app/",
    cta: "View live site",
    external: true,
    sourceHref: "https://github.com/gancy123/portfolio",
    preview: "portfolio",
  },
  {
    number: "02",
    title: "Mini Lab",
    description:
      "Four small working experiments for responsive layout, task logic, password feedback and file sorting.",
    problem:
      "Show practical front-end thinking through interaction instead of relying on a list of skill claims.",
    learned:
      "How to manage local state, validation, keyboard controls and reduced-motion behaviour in focused demos.",
    tools: ["React state", "Forms", "Accessibility", "Responsive UI"],
    href: "#mini-lab",
    cta: "Try the demos",
    external: false,
    sourceHref:
      "https://github.com/gancy123/portfolio/blob/master/src/components/mini-lab.tsx",
    preview: "lab",
  },
  {
    number: "03",
    title: "Toolkit conveyor",
    description:
      "A continuously moving brand-icon strip that stays readable and becomes static when motion is reduced.",
    problem:
      "Present a growing toolkit with more energy than a normal logo grid without turning it into decoration.",
    learned:
      "How duplicated tracks, edge masks and interaction states create a seamless, accessible animation.",
    tools: ["CSS animation", "Brand icons", "Motion preferences"],
    href: "#toolkit",
    cta: "See it moving",
    external: false,
    sourceHref:
      "https://github.com/gancy123/portfolio/blob/master/src/components/ui/tool-marquee.tsx",
    preview: "toolkit",
  },
] as const

export function ProjectShowcase() {
  return (
    <section id="project" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#ff7655] uppercase">
              Selected projects
            </p>
            <h2 className="mt-5 max-w-xl text-4xl leading-[1.02] font-semibold tracking-[-0.045em] md:text-6xl">
              Small builds, clear thinking.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/52 md:text-lg lg:justify-self-end">
            These are working parts of this website. Each one started with a
            simple problem and became a chance to practise design, code and
            careful interaction.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
          <ProjectCard project={projects[0]} featured />
          <div className="grid gap-6">
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
          </div>
        </div>
      </div>
    </section>
  )
}

type Project = (typeof projects)[number]

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  return (
    <article
      className={
        featured
          ? "group flex min-h-[36rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#e9e6de] text-[#191a1c]"
          : "group grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#1a1b1d] sm:grid-cols-[0.92fr_1.08fr]"
      }
    >
      <ProjectPreview type={project.preview} />
      <div
        className={
          featured
            ? "flex flex-1 flex-col p-7 sm:p-9"
            : "flex flex-col p-6 sm:p-7"
        }
      >
        <div className="flex items-center justify-between gap-4">
          <span
            className={
              featured
                ? "font-mono text-xs text-[#d83f20]"
                : "font-mono text-xs text-[#ff7655]"
            }
          >
            PROJECT {project.number}
          </span>
          <MoveRight
            className={
              featured
                ? "size-5 text-black/25 transition-transform duration-300 group-hover:translate-x-1"
                : "size-5 text-white/25 transition-transform duration-300 group-hover:translate-x-1"
            }
          />
        </div>

        <h3
          className={
            featured
              ? "mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
              : "mt-4 text-2xl font-semibold tracking-[-0.035em]"
          }
        >
          {project.title}
        </h3>
        <p
          className={
            featured
              ? "mt-4 text-sm leading-relaxed text-black/58 sm:text-base"
              : "mt-3 text-sm leading-relaxed text-white/48"
          }
        >
          {project.description}
        </p>

        <div
          className={
            featured
              ? "mt-7 grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-2"
              : "mt-5 border-t border-white/8 pt-5"
          }
        >
          <ProjectNote
            label="Problem solved"
            copy={project.problem}
            dark={!featured}
          />
          {featured ? (
            <ProjectNote
              label="What I learned"
              copy={project.learned}
              dark={false}
            />
          ) : null}
        </div>

        <ul
          className={
            featured ? "mt-7 flex flex-wrap gap-2" : "mt-5 flex flex-wrap gap-2"
          }
        >
          {project.tools.map((tool) => (
            <li
              key={tool}
              className={
                featured
                  ? "rounded-full border border-black/10 px-3 py-1 font-mono text-[0.65rem] text-black/55"
                  : "rounded-full border border-white/10 px-3 py-1 font-mono text-[0.65rem] text-white/45"
              }
            >
              {tool}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className={
              featured
                ? "w-fit bg-[#191a1c] text-white hover:bg-[#303236]"
                : "w-fit bg-[#ff5a36] text-white hover:bg-[#ff6a49]"
            }
          >
            <a
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noreferrer" : undefined}
            >
              <ExternalLink data-icon="inline-start" />
              {project.cta}
            </a>
          </Button>

          <a
            href={project.sourceHref}
            target="_blank"
            rel="noreferrer"
            className={
              featured
                ? "inline-flex h-9 items-center gap-2 rounded-md border border-black/12 px-3 text-xs text-black/55 transition-colors hover:border-black/25 hover:text-black"
                : "inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs text-white/48 transition-colors hover:border-white/25 hover:text-white"
            }
          >
            <GitBranch className="size-3.5" />
            View source
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </article>
  )
}

function ProjectNote({
  label,
  copy,
  dark,
}: {
  label: string
  copy: string
  dark: boolean
}) {
  return (
    <div>
      <p
        className={
          dark
            ? "font-mono text-[0.65rem] text-[#ff7655] uppercase"
            : "font-mono text-[0.65rem] text-[#d83f20] uppercase"
        }
      >
        {label}
      </p>
      <p
        className={
          dark
            ? "mt-2 text-sm leading-relaxed text-white/45"
            : "mt-2 text-sm leading-relaxed text-black/52"
        }
      >
        {copy}
      </p>
    </div>
  )
}

function ProjectPreview({ type }: { type: Project["preview"] }) {
  if (type === "portfolio") {
    return (
      <div className="relative min-h-64 overflow-hidden bg-[#191a1c] p-6 sm:p-8">
        <div className="absolute -top-16 -right-10 size-60 rounded-full bg-[#ff5a36]/20 blur-3xl" />
        <div className="relative rounded-2xl border border-white/10 bg-[#111214] p-4 shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/8 pb-3">
            <span className="size-2 rounded-full bg-[#ff5a36]" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
          </div>
          <div className="grid min-h-40 place-items-center py-7 text-center">
            <div>
              <LayoutTemplate className="mx-auto size-5 text-[#ff7655]" />
              <p className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.04em] text-white">
                Useful things
                <br />
                for the web.
              </p>
              <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#ff5a36]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === "lab") {
    return (
      <div className="relative flex min-h-48 items-center justify-center overflow-hidden border-b border-white/8 bg-[#111214] p-6 sm:min-h-full sm:border-r sm:border-b-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,90,54,0.16),transparent_52%)]" />
        <div className="relative w-full max-w-56 rounded-xl border border-white/10 bg-[#18191b] p-4">
          <div className="flex items-center justify-between">
            <Code2 className="size-4 text-[#ff7655]" />
            <span className="font-mono text-[0.55rem] text-white/25">
              mini-lab
            </span>
          </div>
          <div className="mt-5 space-y-2">
            {[true, true, false].map((done, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-white/4 p-2"
              >
                <span
                  className={
                    done
                      ? "grid size-4 place-items-center rounded-full bg-[#ff5a36]"
                      : "size-4 rounded-full border border-white/20"
                  }
                >
                  {done ? <Check className="size-2.5 text-white" /> : null}
                </span>
                <span className="h-1.5 flex-1 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-48 items-center justify-center overflow-hidden border-b border-white/8 bg-[#111214] p-6 sm:min-h-full sm:border-r sm:border-b-0">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,90,54,0.08),transparent)]" />
      <div className="relative flex w-[130%] -rotate-3 items-center gap-3">
        {[MonitorSmartphone, Code2, LayoutTemplate].map((Icon, index) => (
          <div
            key={index}
            className="grid aspect-square min-w-20 place-items-center rounded-xl border border-white/10 bg-[#1b1c1f] shadow-lg"
          >
            <Icon
              className={
                index === 1 ? "size-7 text-[#ff7655]" : "size-7 text-white/38"
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
