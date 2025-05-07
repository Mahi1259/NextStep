import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, TreesIcon as Tree, BarChart3, Award, Globe, Lightbulb } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Crowdsourced Guided Paths for
            <br />
            <span className="text-primary">Unconventional Careers</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
            Explore unconventional career paths like a game skill tree. Learn from real-world experts and discover your
            unique journey in tech, creative fields, and social impact roles. Designed specifically for underrepresented
            groups seeking accessible pathways to meaningful work.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/skill-tree">
                Explore Career Paths <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contribute">Contribute Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
            We believe that career guidance should be accessible to everyone, regardless of background, location, or
            resources. Our platform focuses on creating pathways for women returning to work, rural communities,
            neurodivergent individuals, and other underrepresented groups who face unique challenges in traditional
            career development.
          </p>
          <div className="grid gap-8 md:grid-cols-3 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Accessible Credentials</h3>
              <p className="text-muted-foreground">
                We highlight certification opportunities that don't require expensive degrees or privileged backgrounds,
                focusing on skills that can be developed with minimal resources.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Global Perspective</h3>
              <p className="text-muted-foreground">
                Our career paths are designed with awareness of global contexts, including considerations for limited
                internet, different economic realities, and diverse cultural backgrounds.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community Wisdom</h3>
              <p className="text-muted-foreground">
                We value lived experience alongside formal education, creating space for mentors who have navigated
                unconventional paths to share their insights and strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Tree className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Interactive Skill Trees</h3>
            <p className="text-muted-foreground">
              Navigate through career paths visualized as interactive skill trees, with clear progression steps. Each
              node represents a skill or milestone, with detailed guidance on how to achieve it with limited resources.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Expert Mentorship</h3>
            <p className="text-muted-foreground">
              Learn from professionals who've walked the path before you, with real-world advice and stories. Our
              mentors come from diverse backgrounds and share practical strategies for overcoming common barriers.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Track Your Progress</h3>
            <p className="text-muted-foreground">
              Keep track of your journey and get personalized recommendations for your next steps. Our platform helps
              you identify which skills to prioritize based on your specific circumstances and available resources.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Paths Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Featured Career Paths</h2>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground">
            Discover career paths specifically designed for underrepresented groups, with practical steps that
            acknowledge real-world constraints and leverage unique strengths.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Women Returning to Work</h3>
              <p className="mb-4 text-muted-foreground">
                A guided path for women restarting careers after extended maternity, family, or personal leave, with
                strategies for addressing career gaps and leveraging transferable skills.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/skill-tree?path=women-returning">Explore Path</Link>
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Rural Digital Freelancer</h3>
              <p className="mb-4 text-muted-foreground">
                A career path for individuals from remote/rural areas seeking location-independent digital careers, with
                considerations for limited connectivity and alternative learning resources.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/skill-tree?path=rural-digital-freelancer">Explore Path</Link>
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Neurodivergent Learning Strategist</h3>
              <p className="mb-4 text-muted-foreground">
                A path for neurodivergent individuals designing inclusive learning experiences using their cognitive
                strengths, turning lived experience into professional expertise.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/skill-tree?path=neurodivergent-strategist">Explore Path</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Whether you're just starting out, looking to pivot your career, or returning after a break, our skill trees
            will help you navigate your path. Join our community of learners and mentors building unconventional careers
            on their own terms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/skill-tree">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contribute">Share Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

