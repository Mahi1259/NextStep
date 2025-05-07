"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CareerPathRatingProps {
  pathId: string
  initialRating?: number
  totalVotes?: number
  className?: string
}

export function CareerPathRating({ pathId, initialRating = 85, totalVotes = 0, className }: CareerPathRatingProps) {
  const { toast } = useToast()
  const [rating, setRating] = useState(initialRating)
  const [votes, setVotes] = useState(totalVotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)

  const handleVote = (vote: "up" | "down") => {
    // If user already voted the same way, remove their vote
    if (userVote === vote) {
      setUserVote(null)

      // Recalculate rating
      if (vote === "up") {
        const newRating = votes > 1 ? Math.round((rating * votes - 100) / (votes - 1)) : 50
        setRating(newRating)
      } else {
        const newRating = votes > 1 ? Math.round((rating * votes + 0) / (votes - 1)) : 50
        setRating(newRating)
      }

      setVotes((prev) => Math.max(0, prev - 1))

      toast({
        title: "Vote removed",
        description: "Your rating has been removed.",
      })
      return
    }

    // If user is changing their vote
    if (userVote !== null) {
      // Recalculate rating for vote change
      if (vote === "up") {
        // Changing from down to up (double impact)
        setRating(Math.min(100, Math.round((rating * votes + 200) / votes)))
      } else {
        // Changing from up to down (double impact)
        setRating(Math.max(0, Math.round((rating * votes - 200) / votes)))
      }
    } else {
      // New vote
      setVotes((prev) => prev + 1)

      if (vote === "up") {
        const newRating = Math.round((rating * votes + 100) / (votes + 1))
        setRating(Math.min(100, newRating))
      } else {
        const newRating = Math.round((rating * votes + 0) / (votes + 1))
        setRating(Math.max(0, newRating))
      }
    }

    setUserVote(vote)

    toast({
      title: vote === "up" ? "Upvoted!" : "Downvoted",
      description: `You've rated this career path ${vote === "up" ? "positively" : "negatively"}.`,
    })
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            userVote === "up" && "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700",
          )}
          onClick={() => handleVote("up")}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="sr-only">Upvote</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            userVote === "down" && "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700",
          )}
          onClick={() => handleVote("down")}
        >
          <ThumbsDown className="h-4 w-4" />
          <span className="sr-only">Downvote</span>
        </Button>
      </div>

      <div className="text-sm font-medium">{rating}%</div>
    </div>
  )
}

