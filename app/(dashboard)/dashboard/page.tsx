"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Award, Calendar, Clock, Star, Trophy } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("progress")

  // Sample data for the dashboard
  const inProgressPaths = [
    {
      id: "game-design-women",
      title: "Game Design for Women",
      progress: 40,
      completedSteps: 2,
      totalSteps: 5,
      lastActivity: "2 days ago",
    },
    {
      id: "hardware-prototyping",
      title: "Hardware Prototyping & Maker Path",
      progress: 20,
      completedSteps: 1,
      totalSteps: 5,
      lastActivity: "1 week ago",
    },
  ]

  const recommendedPaths = [
    {
      id: "ux-research",
      title: "UX Research",
      description: "Learn user research methods and apply them to design projects",
      matchScore: 92,
    },
    {
      id: "creative-coding",
      title: "Creative Coding",
      description: "Combine programming and art to create interactive experiences",
      matchScore: 85,
    },
    {
      id: "technical-writing",
      title: "Technical Writing",
      description: "Develop skills to communicate complex technical concepts clearly",
      matchScore: 78,
    },
  ]

  const recentMentorTips = [
    {
      id: 1,
      mentorName: "Sarah Johnson",
      careerPath: "Game Design for Women",
      step: "Build a Portfolio",
      tip: "Include a case study that shows your design process from concept to implementation. Employers want to see how you think, not just what you made.",
      date: "3 days ago",
    },
    {
      id: 2,
      mentorName: "David Chen",
      careerPath: "Hardware Prototyping",
      step: "Learn Electronics Basics",
      tip: "Don't just follow tutorials - try to understand why each component is used. This will help you troubleshoot when things inevitably go wrong.",
      date: "1 week ago",
    },
    {
      id: 3,
      mentorName: "Emily Wong",
      careerPath: "UX Research",
      step: "Conduct User Studies",
      tip: "Record your user interviews (with permission) so you can focus on the conversation instead of taking notes. You'll catch things you missed in real-time.",
      date: "2 weeks ago",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first skill in a career path",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      date: "2 weeks ago",
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Viewed 10 mentor tips across different career paths",
      icon: <Star className="h-8 w-8 text-purple-500" />,
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Community Contributor",
      description: "Shared your first mentor tip with the community",
      icon: <Award className="h-8 w-8 text-blue-500" />,
      date: "3 days ago",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Learner Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and discover new paths</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>In-Progress Career Paths</CardTitle>
                <CardDescription>Career paths you're currently exploring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {inProgressPaths.map((path) => (
                    <div key={path.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{path.title}</h3>
                        <Badge variant="outline">
                          {path.completedSteps}/{path.totalSteps} Steps
                        </Badge>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Last activity: {path.lastActivity}
                        </span>
                        <Button variant="link" size="sm" asChild className="h-auto p-0">
                          <Link href={`/skill-tree?path=${path.id}`}>
                            Continue <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Mentor Tips</CardTitle>
                <CardDescription>Latest advice from industry professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentMentorTips.map((tip) => (
                    <div key={tip.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{tip.mentorName}</h3>
                        <Badge variant="outline">{tip.careerPath}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{tip.tip}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Step: {tip.step}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {tip.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid gap-6 md:grid-cols-3">
            {recommendedPaths.map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{path.title}</CardTitle>
                    <Badge className="bg-primary">{path.matchScore}% Match</Badge>
                  </div>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/skill-tree?path=${path.id}`}>Explore Path</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="rounded-full bg-muted p-2">{achievement.icon}</div>
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Earned {achievement.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

