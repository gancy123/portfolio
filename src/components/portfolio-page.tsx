import {
  ArrowDownRight,
  ArrowUpRight,
  Home,
  Mail,
  MonitorSmartphone,
  MousePointerClick,
  Route,
  Wrench,
} from "lucide-react"

import { BuildPreview } from "@/components/build-preview"
import { CommandMenu } from "@/components/command-menu"
import { MiniLabSection } from "@/components/mini-lab"
import { ProjectShowcase } from "@/components/project-showcase"
import { Button } from "@/components/ui/button"
import { CardSwap } from "@/components/ui/card-swap"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline"
import { ToolMarquee } from "@/components/ui/tool-marquee"
import {
  TubelightNavbar,
  type TubelightNavItem,
} from "@/components/ui/tubelight-navbar"
import { capabilities, journey } from "@/content/portfolio"

const capabilityIcons = [
  <MonitorSmartphone key="responsive" />,
  <MousePointerClick key="interactive" />,
  <Wrench key="problem-solving" />,
]

const navigationItems: TubelightNavItem[] = [
  { name: "Home", url: "#top", icon: Home },
  { name: "What I can do", url: "#capabilities", icon: MonitorSmartphone },
  { name: "Toolkit", url: "#toolkit", icon: Wrench },
  { name: "Journey", url: "#journey", icon: Route },
  { name: "Contact", url: "#contact", icon: Mail },
]

export function PortfolioPage() {
  return (
    <div className="relative overflow-clip bg-[#141516] text-[#f2efe8]">
      <TubelightNavbar items={navigationItems} />
      <main>
        <HeroBuildLab />
        <CapabilitiesSection />
        <ToolkitSection />
        <MiniLabSection />
        <ProjectShowcase />
        <JourneySection />
        <ContactSection />
      </main>
      <CommandMenu />
    </div>
  )
}

function HeroBuildLab() {
  return (
    <div id="top" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_50%_10%,rgba(255,90,54,0.11),transparent_55%)]" />
      <ContainerScroll
        titleComponent={
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-6xl md:text-8xl">
              I build useful things for the web.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-balance text-white/55 md:text-xl">
              Hi, I&apos;m Chun Yang. I&apos;m an emerging developer learning
              through practical projects and thoughtful problem-solving.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#ff5a36] text-white hover:bg-[#ff6a49]"
              >
                <a href="#capabilities">
                  Explore the build
                  <ArrowDownRight data-icon="inline-end" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/12 bg-white/3 text-white hover:bg-white/8 hover:text-white"
              >
                <a href="mailto:chunyang1021@gmail.com">Say hello</a>
              </Button>
            </div>
          </div>
        }
      >
        <BuildPreview />
      </ContainerScroll>
    </div>
  )
}

function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-y border-white/8 bg-[#18191b] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 md:grid-cols-[.85fr_1.15fr] md:px-8">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-[#ff7655] uppercase">
            What I can do
          </p>
          <h2 className="mt-5 max-w-xl text-4xl leading-[1.02] font-semibold tracking-[-0.045em] md:text-5xl">
            A practical toolkit, still growing.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/52 md:text-lg">
            I focus on clear websites, useful interaction and solving the
            technical problems that appear along the way.
          </p>
        </div>
        <div className="relative flex min-h-[22rem] min-w-0 items-center justify-center overflow-visible pr-8 md:min-h-[26rem] md:pr-16">
          <CardSwap
            width="min(76vw, 430px)"
            height={270}
            cardDistance={26}
            verticalDistance={22}
            delay={2800}
            pauseOnHover
          >
            {capabilities.map((capability, index) => (
              <article
                key={capability.title}
                className="flex h-full flex-col p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-[#ff7655]/20 bg-[#ff7655]/8 text-[#ff7655] [&_svg]:size-5">
                    {capabilityIcons[index]}
                  </span>
                  <span className="font-mono text-xs text-white/28">
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">
                    {capability.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/48 md:text-base">
                    {capability.description}
                  </p>
                  <p className="mt-5 font-mono text-xs text-[#ff7655]">
                    {capability.detail}
                  </p>
                </div>
              </article>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  )
}

function ToolkitSection() {
  return (
    <section id="toolkit" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#ff7655] uppercase">
              My toolkit
            </p>
            <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.045em] md:text-5xl">
              Different tools, one purpose.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/52 md:text-lg lg:justify-self-end">
            I use each technology for the part of the problem it handles best.
          </p>
        </div>
        <div className="mt-14">
          <ToolMarquee />
        </div>
      </div>
    </section>
  )
}

function JourneySection() {
  return (
    <section id="journey" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#ff7655] uppercase">
              My journey
            </p>
            <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.045em] md:text-5xl">
              Learning, supporting, building.
            </h2>
          </div>
          <RadialOrbitalTimeline items={journey} />
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/8 bg-[#0f1011] px-5 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="max-w-4xl text-4xl leading-[1.02] font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">
          Have a useful idea? I&apos;d like to hear it.
        </p>
        <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
          <div>
            <p className="max-w-xl text-base leading-relaxed text-white/45">
              I&apos;m looking for opportunities to learn, contribute and create
              thoughtful web experiences.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-[#ff5a36] text-white hover:bg-[#ff6a49]"
            >
              <a href="mailto:chunyang1021@gmail.com">
                <Mail data-icon="inline-start" />
                Email me
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-12 border-t border-white/8 pt-6">
          <p className="text-center font-mono text-xs text-white/28">
            Copyright © 2026 Chun Yang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
