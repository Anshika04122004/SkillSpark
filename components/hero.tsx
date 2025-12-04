import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-20 pb-32">
      {/* Gradient orbs for visual interest */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">The future of learning is here</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-balance">
            Learn a Skill
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              in a Scroll
            </span>
          </h1>

          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Bite-sized learning modules, addictive engagement, and real progress. Master new skills in 60 seconds, not
            60 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/learner">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group">
                Start Learning Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              Watch Demo
            </Button>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                ⚡
              </div>
              <span>60-second modules</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
                📱
              </div>
              <span>Mobile-first design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                🎯
              </div>
              <span>AI-personalized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
