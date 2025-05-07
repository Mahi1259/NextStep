"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SkillNode } from "./skill-node"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { TopContributors } from "./top-contributors"

interface SkillPathProps {
  id: string
  title: string
  description: string
  skills: {
    id: string
    title: string
    description: string
    status: "locked" | "available" | "completed"
    x: number
    y: number
    mentorTips: {
      name: string
      avatar: string
      tip: string
      linkedin?: string
      email?: string
    }[]
    resources: {
      title: string
      url: string
    }[]
    hasCertification?: boolean
  }[]
  connections: {
    from: string
    to: string
  }[]
  contributors?: {
    name: string
    avatar: string
    role: string
    completedSkills: number
    totalSkills: number
    path: string[]
  }[]
}

export function SkillPath({ id, title, description, skills, connections, contributors }: SkillPathProps) {
  // Initialize all skills as available (except those already completed)
  const [skillsState, setSkillsState] = useState(
    skills.map((skill) => ({
      ...skill,
      status: skill.status === "completed" ? "completed" : "available",
    })),
  )

  // State for zoom and pan
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate the bounds of all nodes to determine container size
  const calculateBounds = () => {
    let minX = Number.POSITIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY

    skillsState.forEach((skill) => {
      minX = Math.min(minX, skill.x)
      minY = Math.min(minY, skill.y)
      maxX = Math.max(maxX, skill.x + 64) // Node width
      maxY = Math.max(maxY, skill.y + 64) // Node height
    })

    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY }
  }

  const bounds = calculateBounds()

  // Auto-fit the skill tree on initial render
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight

      // Calculate scale to fit the entire tree
      const scaleX = containerWidth / (bounds.width + 100) // Add padding
      const scaleY = containerHeight / (bounds.height + 100) // Add padding
      const newScale = Math.min(scaleX, scaleY, 1) // Don't zoom in more than 1

      // Center the tree
      const centerX = containerWidth / 2 - ((bounds.minX + bounds.maxX) / 2) * newScale
      const centerY = containerHeight / 2 - ((bounds.minY + bounds.maxY) / 2) * newScale

      setScale(newScale)
      setPosition({ x: centerX, y: centerY })
    }
  }, [skillsState])

  const handleCompleteSkill = (skillId: string) => {
    // Mark the current skill as completed
    const updatedSkills = skillsState.map((skill) =>
      skill.id === skillId ? { ...skill, status: "completed" as const } : skill,
    )

    setSkillsState(updatedSkills)
  }

  // Sort skills by vertical position to determine step numbers
  const sortedSkills = [...skillsState].sort((a, b) => a.y - b.y)

  // Create a map of skill IDs to their step numbers
  const skillStepMap = new Map(sortedSkills.map((skill, index) => [skill.id, index + 1]))

  // Zoom controls
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Pan controls
  const startDrag = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const onDrag = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const endDrag = () => {
    setIsDragging(false)
  }

  // Force a re-render after component mount to ensure all connections are drawn
  useEffect(() => {
    // Force a re-render after a short delay
    const forceRender = setTimeout(() => {
      setSkillsState((prev) => [...prev])
    }, 100)

    return () => clearTimeout(forceRender)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="relative h-[550px] w-full lg:w-2/3 overflow-hidden rounded-lg border bg-background p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Zoom and pan controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Button variant="outline" size="icon" onClick={() => window.location.reload()} title="Reset View">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={zoomIn} title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={zoomOut} title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Skill tree container with pan and zoom */}
        <div
          ref={containerRef}
          className="relative h-[450px] w-full overflow-hidden cursor-grab"
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          <div
            className="absolute transition-transform duration-100"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "0 0",
            }}
          >
            {/* Connections */}
            <svg className="absolute" style={{ width: bounds.width + 200, height: bounds.height + 200 }}>
              {connections.map((connection, index) => {
                const fromSkill = skillsState.find((s) => s.id === connection.from)
                const toSkill = skillsState.find((s) => s.id === connection.to)

                if (!fromSkill || !toSkill) return null

                // Calculate center points
                const x1 = fromSkill.x + 32 // half of node width (64px)
                const y1 = fromSkill.y + 32
                const x2 = toSkill.x + 32
                const y2 = toSkill.y + 32

                // Calculate control points for the curve
                // For a simple curve, we'll use a point between the nodes but offset vertically
                const midX = (x1 + x2) / 2
                const midY = (y1 + y2) / 2
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
                const controlPointOffset = distance * 0.2 // Adjust this value to control curve intensity

                // Create a slight curve by offsetting the control point
                const controlX = midX
                const controlY = midY - controlPointOffset

                // Create path for the curve
                const path = `M ${x1} ${y1} Q ${controlX} ${controlY}, ${x2} ${y2}`

                return (
                  <path
                    key={index}
                    d={path}
                    fill="none"
                    stroke="#0ea5e9" // Always blue for all connections
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray="none" // No dashed lines
                    opacity={1} // Full opacity for all lines
                  />
                )
              })}
            </svg>

            {/* Skill Nodes */}
            {skillsState.map((skill) => (
              <SkillNode
                key={skill.id}
                {...skill}
                onComplete={handleCompleteSkill}
                stepNumber={skillStepMap.get(skill.id) || 0}
                hasCertification={skill.hasCertification}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Top Contributors Section */}
      <div className="w-full lg:w-1/3">
        <TopContributors contributors={contributors} pathTitle={title} />
      </div>
    </div>
  )
}

