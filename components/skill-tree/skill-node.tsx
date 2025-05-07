"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export interface SkillNodeProps {
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
    isCertification?: boolean
  }[]
  onComplete?: (id: string) => void
  stepNumber: number
  hasCertification?: boolean
}

export function SkillNode({
  id,
  title,
  description,
  status,
  x,
  y,
  mentorTips,
  resources,
  onComplete,
  stepNumber,
  hasCertification = false,
}: SkillNodeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const [selectedMentor, setSelectedMentor] = useState<(typeof mentorTips)[0] | null>(null)

  const handleComplete = () => {
    if (onComplete) {
      onComplete(id)
      setIsOpen(false)
      toast({
        title: "Skill Completed!",
        description: `You've completed "${title}"`,
      })
    }
  }

  const handleMentorClick = (mentor: (typeof mentorTips)[0]) => {
    setSelectedMentor(mentor)
  }

  return (
    <>
      <motion.div
        className={cn(
          "absolute flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-4 transition-colors shadow-md",
          status === "locked" && "border-muted-foreground/30 bg-muted",
          status === "available" &&
            !hasCertification &&
            "border-primary/50 bg-primary/10 hover:border-primary hover:shadow-lg",
          status === "available" &&
            hasCertification &&
            "border-amber-500 bg-amber-500/10 hover:border-amber-400 hover:shadow-lg",
          status === "completed" && !hasCertification && "border-green-500 bg-green-500/10",
          status === "completed" && hasCertification && "border-amber-500 bg-green-500/10",
        )}
        style={{ left: x, top: y }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
      >
        {status === "completed" && <Check className="h-6 w-6 text-green-500" />}
        {status !== "completed" && (
          <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center">
            {hasCertification && <Award className="h-4 w-4 mb-1 text-amber-500" />}
            <span
              className={cn(
                "text-xs font-semibold line-clamp-3",
                status === "locked" && "text-muted-foreground/50",
                status === "available" && !hasCertification && "text-primary",
                status === "available" && hasCertification && "text-amber-600",
              )}
            >
              {title}
            </span>
          </div>
        )}
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              {title}
              {hasCertification && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 ml-2">
                  <Award className="h-3 w-3 mr-1" /> Certification Available
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Mentor Tips</h3>
              <div className="space-y-4">
                {mentorTips.map((tip, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar
                      className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                      onClick={() => handleMentorClick(tip)}
                    >
                      <AvatarImage src={tip.avatar} />
                      <AvatarFallback>{tip.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleMentorClick(tip)}
                      >
                        {tip.name}
                      </div>
                      <p className="text-sm text-muted-foreground">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Resources</h3>
              <div className="space-y-2">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{resource.title}</span>
                      {resource.isCertification && (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                          <Award className="h-3 w-3 mr-1" /> Certification
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              {status !== "completed" && <Button onClick={handleComplete}>Mark as Completed</Button>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {selectedMentor && (
        <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedMentor.avatar} />
                  <AvatarFallback>{selectedMentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedMentor.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  {selectedMentor.linkedin && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      <a
                        href={selectedMentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {selectedMentor.email && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <a href={`mailto:${selectedMentor.email}`} className="text-gray-600 hover:underline">
                        {selectedMentor.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Expertise</h3>
                <p className="mt-1 text-sm text-muted-foreground">{selectedMentor.tip}</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedMentor(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

