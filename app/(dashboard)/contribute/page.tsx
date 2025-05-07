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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, FileText, Lightbulb } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CareerSuggestionForm } from "@/components/career-suggestion-form"

// Career path templates for marginalized groups
const careerTemplates = [
  {
    id: "digital-fabrication",
    title: "Digital Fabrication Artisan",
    description:
      "Craft meets tech—perfect for rural, displaced, or creative learners. Create physical products using digital tools without requiring expensive education.",
    targetGroups: ["Rural communities", "Displaced people", "Creative learners"],
    steps: [
      {
        title: "Explore Laser Cutting & 3D Printing",
        description:
          "Learn the basics of digital fabrication tools through online tutorials, local makerspaces, or community centers.",
      },
      {
        title: "Join a Local or Online Maker Community",
        description: "Connect with other makers to share knowledge, get feedback, and collaborate on projects.",
      },
      {
        title: "Sell Designs or Crafts Online",
        description:
          "Set up an online shop on platforms like Etsy, Shopify, or local marketplaces to sell your creations.",
      },
      {
        title: "Document Work on Social Media / Portfolio",
        description:
          "Create a portfolio website or social media presence to showcase your work and attract potential customers or collaborators.",
      },
      {
        title: "Collaborate or Teach in a FabLab or NGO",
        description:
          "Share your skills by teaching workshops or collaborating with organizations that need fabrication expertise.",
      },
    ],
  },
  {
    id: "tech-educator",
    title: "Tech Educator / Community Trainer",
    description:
      "Especially powerful for women and refugees in underserved areas. Help bridge the digital divide by teaching tech skills to your community.",
    targetGroups: ["Women", "Refugees", "Underserved communities"],
    steps: [
      {
        title: "Learn Digital Literacy & Facilitation Basics",
        description: "Master fundamental digital skills and learn how to effectively teach others in accessible ways.",
      },
      {
        title: "Volunteer to Teach Local Workshops",
        description:
          "Gain experience by volunteering to teach basic tech skills at community centers, libraries, or schools.",
      },
      {
        title: "Build a Learner Resource Bank",
        description:
          "Create and collect learning materials that are culturally relevant and accessible for your community.",
      },
      {
        title: "Train in Inclusive & Trauma-Informed Education",
        description:
          "Learn techniques for teaching diverse groups, including those who may have experienced trauma or displacement.",
      },
      {
        title: "Partner with NGOs or EdTech Orgs",
        description:
          "Connect with organizations that need tech educators to expand your reach and potentially secure paid opportunities.",
      },
    ],
  },
  {
    id: "no-code-developer",
    title: "Remote No-Code Developer / Automation Assistant",
    description:
      "Great for people without coding backgrounds or with limited internet access. Build useful tools without traditional programming.",
    targetGroups: ["Non-technical people", "Limited internet access", "Career changers"],
    steps: [
      {
        title: "Learn No-Code Tools (e.g., Airtable, Glide, Zapier)",
        description: "Master platforms that allow you to create apps and automate processes without writing code.",
      },
      {
        title: "Build Simple Business Tools or Forms",
        description:
          "Create practical solutions like inventory systems, booking forms, or data collection tools for real use cases.",
      },
      {
        title: "Freelance for NGOs or Small Businesses",
        description:
          "Offer your services to organizations that need affordable digital solutions but lack technical expertise.",
      },
      {
        title: "Join No-Code Communities",
        description:
          "Connect with other no-code builders to learn advanced techniques, find clients, and stay updated on new tools.",
      },
      {
        title: "Offer Paid Templates or Services",
        description:
          "Create reusable templates or specialized services that solve common problems for specific industries or needs.",
      },
    ],
  },
  {
    id: "digital-storyteller",
    title: "Digital Storyteller / Grassroots Journalist",
    description:
      "Ideal for underrepresented voices, activists, or creatives with a smartphone. Share important stories from your community.",
    targetGroups: ["Underrepresented voices", "Activists", "Smartphone owners"],
    steps: [
      {
        title: "Learn Basics of Visual Storytelling",
        description:
          "Master fundamental techniques for capturing compelling photos, videos, and narratives using accessible tools.",
      },
      {
        title: "Publish Local Stories on Medium/Substack/YouTube",
        description:
          "Start sharing stories from your community or perspective on free publishing platforms to build an audience.",
      },
      {
        title: "Learn Simple Editing Tools (e.g., Canva, CapCut)",
        description:
          "Use accessible apps and software to enhance your stories with professional-looking graphics and edits.",
      },
      {
        title: "Join Advocacy or Community Media Projects",
        description:
          "Collaborate with organizations or collectives that amplify stories from your community or on issues you care about.",
      },
      {
        title: "Apply for Journalism Fellowships / Collaborations",
        description:
          "Seek opportunities with media organizations or foundations that support grassroots storytellers and diverse voices.",
      },
    ],
  },
]

export default function ContributePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("contribute")

  // Existing form state
  const [formState, setFormState] = useState({
    careerPath: "",
    step: "",
    advice: "",
    resource: "",
    resourceUrl: "",
  })

  // New career creation form state
  const [careerFormState, setCareerFormState] = useState({
    title: "",
    description: "",
    targetGroups: [] as string[],
    steps: [{ title: "", description: "" }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    toast({
      title: "Contribution Submitted!",
      description: "Thank you for sharing your experience with the community.",
    })
    // Reset form
    setFormState({
      careerPath: "",
      step: "",
      advice: "",
      resource: "",
      resourceUrl: "",
    })
  }

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    toast({
      title: "Career Path Created!",
      description: "Your new career path has been added to the platform.",
    })
    // Reset form
    setCareerFormState({
      title: "",
      description: "",
      targetGroups: [],
      steps: [{ title: "", description: "" }],
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string },
  ) => {
    const { name, value } = "target" in e ? e.target : e
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCareerFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleStepChange = (index: number, field: string, value: string) => {
    setCareerFormState((prev) => {
      const updatedSteps = [...prev.steps]
      updatedSteps[index] = { ...updatedSteps[index], [field]: value }
      return { ...prev, steps: updatedSteps }
    })
  }

  const addStep = () => {
    setCareerFormState((prev) => ({
      ...prev,
      steps: [...prev.steps, { title: "", description: "" }],
    }))
  }

  const removeStep = (index: number) => {
    if (careerFormState.steps.length <= 1) return

    setCareerFormState((prev) => {
      const updatedSteps = prev.steps.filter((_, i) => i !== index)
      return { ...prev, steps: updatedSteps }
    })
  }

  const loadTemplate = (templateId: string) => {
    const template = careerTemplates.find((t) => t.id === templateId)
    if (template) {
      setCareerFormState({
        title: template.title,
        description: template.description,
        targetGroups: template.targetGroups,
        steps: [...template.steps],
      })

      toast({
        title: "Template Loaded",
        description: `The "${template.title}" template has been loaded. You can customize it or submit as is.`,
      })
    }
  }

  const handleTargetGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.trim() === "") return

    setCareerFormState((prev) => {
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
    setCareerFormState((prev) => ({
      ...prev,
      targetGroups: prev.targetGroups.filter((g) => g !== group),
    }))
  }

  const careerPaths = [
    { id: "women-returning", name: "Women Returning to Work" },
    { id: "rural-digital-freelancer", name: "Rural Digital Freelancer" },
    { id: "social-healthcare", name: "Social Healthcare Worker" },
    { id: "indie-game-developer", name: "Indie Game Developer" },
    { id: "neurodivergent-strategist", name: "Neurodivergent Learning Strategist" },
  ]

  const steps = {
    "women-returning": [
      { id: "reflect-goals", name: "Reflect on Goals & Direction" },
      { id: "same-field", name: "Same Field Upgrade" },
      { id: "new-career", name: "New Career Path" },
      { id: "digital-presence", name: "Update Digital Presence" },
      { id: "rebuild-network", name: "Rebuild Network" },
      { id: "apply-upskill", name: "Apply & Upskill Simultaneously" },
    ],
    "rural-digital-freelancer": [
      { id: "assess-connectivity", name: "Assess Connectivity & Devices" },
      { id: "skill-acquisition", name: "Skill Acquisition" },
      { id: "online-presence", name: "Build Online Presence" },
      { id: "freelance-platforms", name: "Freelance Platforms" },
      { id: "remote-jobs", name: "Remote Jobs" },
      { id: "financial-management", name: "Financial & Time Management" },
    ],
    "social-healthcare": [
      { id: "understand-social", name: "Understand Social Determinants" },
      { id: "skill-upgrade", name: "Skill Upgrade" },
      { id: "global-orgs", name: "NGOs / Global Orgs" },
      { id: "policy-research", name: "Policy & Research" },
      { id: "fieldwork", name: "Fieldwork / Fellowship" },
      { id: "community-advocacy", name: "Community Advocacy & Capacity Building" },
    ],
    "indie-game-developer": [
      { id: "learn-fundamentals", name: "Learn the Fundamentals" },
      { id: "build-prototypes", name: "Build & Test Prototypes" },
      { id: "developer-role", name: "Developer/Programmer" },
      { id: "artist-role", name: "Artist/Designer" },
      { id: "writer-role", name: "Writer/Narrative Designer" },
      { id: "publish-indie", name: "Publish on Indie Platforms" },
      { id: "grow-community", name: "Grow Community & Crowdfund" },
    ],
    "neurodivergent-strategist": [
      { id: "understand-differences", name: "Understand Learning Differences" },
      { id: "study-inclusive", name: "Study Inclusive Education Tools" },
      { id: "create-models", name: "Create Your Own Learning Models" },
      { id: "certify-skills", name: "Certify Your Skills" },
      { id: "join-organizations", name: "Join Schools, NGOs or Freelance" },
    ],
  }

  const getStepsForPath = (pathId: string) => {
    return steps[pathId as keyof typeof steps] || []
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contribute Your Experience</h1>
        <p className="text-muted-foreground">Share your knowledge and help others navigate their career paths</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contribute">Add to Existing Path</TabsTrigger>
          <TabsTrigger value="create">Create New Career Path</TabsTrigger>
          <TabsTrigger value="suggest">Suggest Career Path</TabsTrigger>
        </TabsList>

        <TabsContent value="contribute">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Mentor Contribution Form</CardTitle>
                  <CardDescription>
                    Share your advice, tips, or resources for specific career path steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="careerPath">Select a Career Path</Label>
                      <Select
                        value={formState.careerPath}
                        onValueChange={(value) => handleChange({ name: "careerPath", value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a career path" />
                        </SelectTrigger>
                        <SelectContent>
                          {careerPaths.map((path) => (
                            <SelectItem key={path.id} value={path.id}>
                              {path.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="step">Select a Step</Label>
                      <Select
                        value={formState.step}
                        onValueChange={(value) => handleChange({ name: "step", value })}
                        disabled={!formState.careerPath}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a step" />
                        </SelectTrigger>
                        <SelectContent>
                          {getStepsForPath(formState.careerPath).map((step) => (
                            <SelectItem key={step.id} value={step.id}>
                              {step.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="advice">Your Advice or Experience</Label>
                      <Textarea
                        id="advice"
                        name="advice"
                        placeholder="Share your tips, stories, or advice for this step..."
                        value={formState.advice}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resource">Resource Name (Optional)</Label>
                      <Input
                        id="resource"
                        name="resource"
                        placeholder="e.g., 'Beginner's Guide to Unity'"
                        value={formState.resource}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resourceUrl">Resource URL (Optional)</Label>
                      <Input
                        id="resourceUrl"
                        name="resourceUrl"
                        placeholder="https://example.com/resource"
                        value={formState.resourceUrl}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Contribution
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Contribute?</CardTitle>
                  <CardDescription>Your experience can help others navigate their career journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    <li>Help others avoid common pitfalls you encountered</li>
                    <li>Share resources that were valuable in your journey</li>
                    <li>Build your reputation as a mentor in the community</li>
                    <li>Connect with others in your field</li>
                    <li>Pay forward the help you received in your career</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Accessible Career Paths</CardTitle>
                    <CardDescription>Paths that don't require elite credentials</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The most valuable career paths for marginalized communities often:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    <li>Require minimal startup costs or equipment</li>
                    <li>Can be learned through free or low-cost resources</li>
                    <li>Allow for flexible working hours and locations</li>
                    <li>Build on existing community knowledge and strengths</li>
                    <li>Create opportunities for both income and community impact</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Career Path</CardTitle>
                  <CardDescription>Define a new career path with custom steps for others to follow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Label className="mb-2 block">Start with a Template (Optional)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {careerTemplates.map((template) => (
                        <Button
                          key={template.id}
                          variant="outline"
                          className="h-auto py-2 px-3 justify-start text-left"
                          onClick={() => loadTemplate(template.id)}
                        >
                          <div className="flex flex-col items-start w-full overflow-hidden">
                            <span className="font-medium text-sm w-full truncate">{template.title}</span>
                            <span className="text-xs text-muted-foreground w-full truncate">
                              For: {template.targetGroups.slice(0, 2).join(", ")}
                              {template.targetGroups.length > 2 ? "..." : ""}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="templates-info">
                          <AccordionTrigger className="text-sm text-muted-foreground py-2">
                            <div className="flex items-center gap-1">
                              <Lightbulb className="h-4 w-4" />
                              <span>About these templates</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-muted-foreground mb-2">
                              These templates are designed for unconventional, accessible career paths that are
                              especially valuable for marginalized groups. They don't require elite degrees, expensive
                              gear, or industry connections.
                            </p>
                            <p className="text-sm text-muted-foreground">
                              You can use them as-is or customize them to better fit your experience or community needs.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>

                  <form onSubmit={handleCareerSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Career Path Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., 'Sustainable Fashion Design'"
                        value={careerFormState.title}
                        onChange={handleCareerChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Career Path Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe this career path and who it's for..."
                        value={careerFormState.description}
                        onChange={handleCareerChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetGroups">Target Groups</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {careerFormState.targetGroups.map((group) => (
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
                        placeholder="e.g., 'Women', 'Rural communities' (press Enter to add)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleTargetGroupChange(e as React.ChangeEvent<HTMLInputElement>)
                          }
                        }}
                        onBlur={(e) => handleTargetGroupChange(e)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Who would benefit most from this career path? Add groups and press Enter.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Career Path Steps</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addStep}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" /> Add Step
                        </Button>
                      </div>

                      {careerFormState.steps.map((step, index) => (
                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                          <div className="absolute right-2 top-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStep(index)}
                              disabled={careerFormState.steps.length <= 1}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`step-title-${index}`}>Step {index + 1} Title</Label>
                            <Input
                              id={`step-title-${index}`}
                              placeholder="e.g., 'Learn Basic Sewing Techniques'"
                              value={step.title}
                              onChange={(e) => handleStepChange(index, "title", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`step-description-${index}`}>Step Description</Label>
                            <Textarea
                              id={`step-description-${index}`}
                              placeholder="Describe what this step involves..."
                              value={step.description}
                              onChange={(e) => handleStepChange(index, "description", e.target.value)}
                              rows={2}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button type="submit" className="w-full">
                      Create Career Path
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Contribute?</CardTitle>
                  <CardDescription>Your experience can help others navigate their career journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    <li>Help others avoid common pitfalls you encountered</li>
                    <li>Share resources that were valuable in your journey</li>
                    <li>Build your reputation as a mentor in the community</li>
                    <li>Connect with others in your field</li>
                    <li>Pay forward the help you received in your career</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Accessible Career Paths</CardTitle>
                    <CardDescription>Paths that don't require elite credentials</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The most valuable career paths for marginalized communities often:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    <li>Require minimal startup costs or equipment</li>
                    <li>Can be learned through free or low-cost resources</li>
                    <li>Allow for flexible working hours and locations</li>
                    <li>Build on existing community knowledge and strengths</li>
                    <li>Create opportunities for both income and community impact</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suggest">
          <CareerSuggestionForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

