"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white">SkillSpark</h1>
        <Button
          onClick={() => router.push("/auth")}
          className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
        >
          Get Started
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
          Learn a Skill in a Scroll
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          Bite-sized educational content designed for modern learners. Watch 60-second sparks of pure knowledge.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/auth")}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-lg"
          >
            Start Learning Now
          </Button>
          <Button
            onClick={() => router.push("/auth")}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-6 text-lg rounded-lg border border-white"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast",
              description: "Learn concepts in 60 seconds. No fluff, just pure knowledge.",
              icon: "⚡",
            },
            {
              title: "AI-Personalized",
              description: "Your feed adapts to your interests and learning pace.",
              icon: "🤖",
            },
            {
              title: "Progress Tracking",
              description: "See your growth with streaks, achievements, and analytics.",
              icon: "📈",
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to level up?</h2>
          <p className="text-lg text-white/90 mb-8">Join thousands of learners transforming their skills today.</p>
          <Button
            onClick={() => router.push("/auth")}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg rounded-lg"
          >
            Create Your Account
          </Button>
        </div>
      </section>
    </main>
  )
}
