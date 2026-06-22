"use client"

import * as React from "react"
import { Braces, Code2, Headphones, Monitor, Wrench } from "lucide-react"

import {
  ScrollStack,
  ScrollStackItem,
} from "@/components/ui/scroll-stack"
import { type Capability, capabilities } from "@/content/portfolio"

const capabilityIcons = {
  frontend: Monitor,
  software: Braces,
  support: Headphones,
} satisfies Record<Capability["visual"], typeof Monitor>

export function CapabilitiesWorkstation() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <div className="capabilities-workstation">
      <div className="capabilities-workstation-stage" aria-hidden="true">
        <img
          src="/build-lab-workstation.png"
          alt=""
          width={1672}
          height={941}
          className="capabilities-workstation-image"
          draggable={false}
        />
        <ol className="capabilities-progress">
          {capabilities.map((capability, index) => (
            <li
              key={capability.number}
              className="capabilities-progress-item"
              data-active={activeIndex === index || undefined}
              aria-current={activeIndex === index ? "step" : undefined}
            >
              <span className="capabilities-progress-dot" />
              <span>{capability.number}</span>
            </li>
          ))}
        </ol>
      </div>

      <ScrollStack
        className="capabilities-scroll-stack"
        itemDistance={64}
        itemScale={0.02}
        itemStackDistance={22}
        stackPosition="16%"
        scaleEndPosition="8%"
        baseScale={0.92}
        disableBelow={1024}
        onActiveIndexChange={setActiveIndex}
      >
        {capabilities.map((capability) => (
          <ScrollStackItem
            key={capability.number}
            className="capability-workstation-card"
          >
            <CapabilityCard capability={capability} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  )
}

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = capabilityIcons[capability.visual]

  return (
    <article className="capability-workstation-panel">
      <div className="capability-workstation-copy">
        <div className="capability-workstation-meta">
          <span>{capability.number}</span>
          <span className="capability-workstation-icon">
            <Icon aria-hidden="true" />
          </span>
        </div>
        <h3>{capability.title}</h3>
        <p>{capability.description}</p>
        <ul aria-label={`${capability.title} tools`}>
          {capability.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <CapabilityVisual type={capability.visual} />
    </article>
  )
}

function CapabilityVisual({ type }: { type: Capability["visual"] }) {
  if (type === "frontend") {
    return (
      <div className="capability-mini-ui" aria-hidden="true">
        <div className="capability-mini-toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="capability-mini-layout">
          <span className="capability-mini-image" />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  if (type === "software") {
    return (
      <div className="capability-mini-code" aria-hidden="true">
        <Code2 />
        <span className="capability-code-line capability-code-line-long" />
        <span className="capability-code-line" />
        <span className="capability-code-line capability-code-line-short" />
        <span className="capability-code-line capability-code-line-long" />
      </div>
    )
  }

  return (
    <div className="capability-mini-support" aria-hidden="true">
      <div className="capability-support-headset">
        <Headphones />
      </div>
      <div className="capability-support-lines">
        {[0, 1, 2].map((item) => (
          <span key={item}>
            <Wrench />
            <i />
          </span>
        ))}
      </div>
    </div>
  )
}
