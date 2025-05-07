"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Lightbulb } from "lucide-react"

export function CareerSuggestionForm() {
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    careerTitle: "",
    careerDescription: "",
    targetAudience: "",
    targetGroups: [] as string[],
    relevantSkills: "",
    suggestedResources: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    toast({
      title: "Career Suggestion Submitted!",
      description: "Thank you for your suggestion. Our AI will analyze it and add appropriate steps.",
    })
    // Reset form
    setFormState({
      careerTitle: "",
      careerDescription: "",
      targetAudience: "",
      targetGroups: [],
      relevantSkills: "",
      suggestedResources: "",
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string },
  ) => {
    const { name, value } = "target" in e ? e.target : e
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleTargetGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.trim() === "") return

    setFormState((prev) => {
      // Check if already exists
      if (prev.targetGroups.includes(value)) return prev

      return {
        ...prev,
        targetGroups: [...prev.targetGroups, value],
      }
    })

    // Clear the input
    e.target.value = ""
  }

  const removeTargetGroup = (group: string) => {
    setFormState((prev) => ({
      ...prev,
      targetGroups: prev.targetGroups.filter((g) => g !== group),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggest a New Career Path</CardTitle>
        <CardDescription>
          Propose a new unconventional career path for the platform. Our AI will analyze your suggestion and create
          detailed steps based on related fields.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="careerTitle">Career Path Title</Label>
            <Input
              id="careerTitle"
              name="careerTitle"
              placeholder="e.g., 'Sustainable Fashion Designer'"
              value={formState.careerTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="careerDescription">Career Path Description</Label>
            <Textarea
              id="careerDescription"
              name="careerDescription"
              placeholder="Describe this career path and who it's for..."
              value={formState.careerDescription}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Primary Target Audience</Label>
            <Select
              value={formState.targetAudience}
              onValueChange={(value) => handleChange({ name: "targetAudience", value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="rural">Rural Communities</SelectItem>
                <SelectItem value="neurodivergent">Neurodivergent Individuals</SelectItem>
                <SelectItem value="refugees">Refugees & Displaced People</SelectItem>
                <SelectItem value="lowincome">Low-Income Communities</SelectItem>
                <SelectItem value="other">Other (Specify in Description)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetGroups">Additional Target Groups</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formState.targetGroups.map((group) => (
                <Badge key={group} variant="secondary" className="gap-1">
                  {group}
                  <button
                    type="button"
                    className="ml-1 rounded-full hover:bg-muted-foreground/20"
                    onClick={() => removeTargetGroup(group)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="targetGroups"
              placeholder="e.g., 'Youth', 'Career changers' (press Enter to add)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleTargetGroupChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              }}
              onBlur={(e) => handleTargetGroupChange(e)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relevantSkills">Relevant Skills & Knowledge</Label>
            <Textarea
              id="relevantSkills"
              name="relevantSkills"
              placeholder="What skills or knowledge are important for this career path?"
              value={formState.relevantSkills}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggestedResources">Suggested Resources (Optional)</Label>
            <Textarea
              id="suggestedResources"
              name="suggestedResources"
              placeholder="Any courses, websites, communities, or tools that would be helpful..."
              value={formState.suggestedResources}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div className="bg-muted p-3 rounded-md flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Our AI will analyze your suggestion and create a detailed career path with steps, resources, and
              mentorship examples by drawing from related fields and existing career paths.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Submit Career Suggestion
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

