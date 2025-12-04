import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Users, TrendingUp, BookOpen, Award, Share2 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Spark Feed",
    description: "AI-curated feed of bite-sized learning videos. Personalized to your goals.",
    color: "from-primary to-primary/60",
  },
  {
    icon: BookOpen,
    title: "Micro-Courses",
    description: "Structured learning paths built from multiple sparks. Master concepts fast.",
    color: "from-secondary to-secondary/60",
  },
  {
    icon: Users,
    title: "Creator Marketplace",
    description: "Expert creators monetize their knowledge. Build your audience instantly.",
    color: "from-accent to-accent/60",
  },
  {
    icon: Award,
    title: "Spark Quests",
    description: "AI-generated quizzes and practice problems. Learn by doing.",
    color: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your learning journey. Level up with each completed module.",
    color: "from-secondary to-accent",
  },
  {
    icon: Share2,
    title: "Social Learning",
    description: "Share progress, build playlists, and learn together with your community.",
    color: "from-accent to-primary",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Learn Faster</h2>
          <p className="text-lg text-foreground/60">The features that make SkillSpark addictive and effective.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/60">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
