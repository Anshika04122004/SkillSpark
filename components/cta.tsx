import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Spark Your Learning?</h2>
        <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
          Join thousands of learners mastering new skills in minutes a day. Sign up free and start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/learner">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/creator">
            <Button size="lg" variant="outline">
              For Creators
            </Button>
          </Link>
        </div>
        <p className="text-sm text-foreground/50 mt-6">No credit card required. Free forever for learners.</p>
      </div>
    </section>
  )
}
