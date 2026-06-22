"use client"

import * as React from "react"
import { BriefcaseBusiness, Code2, Mail, Route, Wrench } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

const destinations = [
  { id: "capabilities", label: "What I can do", icon: BriefcaseBusiness },
  { id: "toolkit", label: "My toolkit", icon: Wrench },
  { id: "project", label: "This build", icon: Code2 },
  { id: "journey", label: "My journey", icon: Route },
  { id: "contact", label: "Contact", icon: Mail },
]

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    const handleOpenRequest = () => setOpen(true)

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("portfolio:open-command-menu", handleOpenRequest)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("portfolio:open-command-menu", handleOpenRequest)
    }
  }, [])

  const visit = (id: string) => {
    setOpen(false)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 80)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Jump to a section"
      description="Navigate through Chun Yang's portfolio"
      className="border border-white/10 bg-[#18191c] text-[#f2efe8] sm:max-w-lg"
    >
      <Command>
        <CommandInput placeholder="Where would you like to go?" />
        <CommandList>
          <CommandEmpty>No section found.</CommandEmpty>
          <CommandGroup heading="Portfolio">
            {destinations.map((destination, index) => {
              const Icon = destination.icon
              return (
                <CommandItem
                  key={destination.id}
                  value={destination.label}
                  onSelect={() => visit(destination.id)}
                >
                  <Icon />
                  <span>{destination.label}</span>
                  <CommandShortcut>0{index + 1}</CommandShortcut>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
