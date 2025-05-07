import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TopContributorsProps {
  contributors?: {
    name: string
    avatar: string
    role: string
    completedSkills: number
    totalSkills: number
    path: string[]
  }[]
  pathTitle: string
}

export function TopContributors({ contributors, pathTitle }: TopContributorsProps) {
  if (!contributors || contributors.length === 0) {
    // Default contributors if none provided
    contributors = [
      {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior Game Designer",
        completedSkills: 7,
        totalSkills: 8,
        path: [
          "Build Portfolio",
          "Participate Game",
          "Take Unity",
          "Specialize Game",
          "Apply Internships",
          "Start Indie",
          "Find Mentor",
        ],
      },
      {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Game Art Director",
        completedSkills: 6,
        totalSkills: 8,
        path: [
          "Build Portfolio",
          "Participate Game",
          "Specialize Art",
          "Start Indie",
          "Apply Internships",
          "Find Mentor",
        ],
      },
      {
        name: "Jessica Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Indie Game Developer",
        completedSkills: 5,
        totalSkills: 8,
        path: ["Build Portfolio", "Participate Game", "Take Unity", "Start Indie", "Find Mentor"],
      },
    ]
  }

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader>
        <CardTitle className="text-lg">Top Contributors</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Tabs defaultValue={contributors[0].name.replace(/\s+/g, "-").toLowerCase()} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            {contributors.map((contributor) => (
              <TabsTrigger
                key={contributor.name}
                value={contributor.name.replace(/\s+/g, "-").toLowerCase()}
                className="text-xs px-2 py-1"
              >
                {contributor.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {contributors.map((contributor) => (
            <TabsContent
              key={contributor.name}
              value={contributor.name.replace(/\s+/g, "-").toLowerCase()}
              className="mt-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contributor.avatar} />
                  <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{contributor.name}</div>
                  <div className="text-xs text-muted-foreground">{contributor.role}</div>
                </div>
              </div>

              <div className="text-sm">
                <div className="font-medium mb-2">Career Path:</div>
                <div className="relative pl-6">
                  {contributor.path.map((skill, skillIndex) => {
                    const isLast = skillIndex === contributor.path.length - 1
                    return (
                      <div key={skillIndex} className="mb-3 last:mb-0 relative">
                        {/* Vertical line connecting steps */}
                        {!isLast && (
                          <div
                            className="absolute left-0 top-6 w-[2px] h-[calc(100%+4px)] bg-green-500/70"
                            style={{ transform: "translateX(-50%)" }}
                          ></div>
                        )}

                        {/* Step circle */}
                        <div
                          className="absolute left-0 top-1 z-10 flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                          style={{ transform: "translateX(-50%)" }}
                        >
                          {skillIndex + 1}
                        </div>

                        {/* Step text */}
                        <div className="ml-4">{skill}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

