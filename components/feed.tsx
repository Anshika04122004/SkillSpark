"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Play, Clock, Flame, User } from "lucide-react"
import { useState } from "react"

const sparks = [
  {
    id: 1,
    creator: "Sarah Chen",
    title: "Master Excel Pivot Tables",
    duration: "45 sec",
    category: "Business",
    likes: 2430,
    liked: false,
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    creator: "Alex Rodriguez",
    title: "CSS Grid Layout Secrets",
    duration: "60 sec",
    category: "Web Dev",
    likes: 3890,
    liked: false,
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    difficulty: "Beginner",
  },
  {
    id: 3,
    creator: "Maya Patel",
    title: "Personal Finance 101",
    duration: "52 sec",
    category: "Finance",
    likes: 5230,
    liked: false,
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    difficulty: "Beginner",
  },
]

export default function Feed() {
  const [sparksData, setSparks] = useState(sparks)

  const toggleLike = (id: number) => {
    setSparks(
      sparksData.map((spark) =>
        spark.id === id
          ? { ...spark, liked: !spark.liked, likes: spark.liked ? spark.likes - 1 : spark.likes + 1 }
          : spark,
      ),
    )
  }

  return (
    <section id="feed" className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore the Spark Feed</h2>
          <p className="text-lg text-foreground/60">
            Discover bite-sized skills from expert creators. Just scroll and learn.
          </p>
        </div>

        <div className="space-y-6">
          {sparksData.map((spark) => (
            <Card key={spark.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="md:flex">
                <div className="md:w-48 h-48 md:h-full relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="absolute inset-0" style={{ background: spark.image }}></div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
                      <Play className="w-7 h-7 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {spark.duration}
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{spark.creator}</p>
                        <p className="text-xs text-foreground/60">{spark.category}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs">
                        <Flame className="w-3 h-3 text-primary" />
                        <span className="font-medium text-primary">{spark.difficulty}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{spark.title}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-6 text-sm text-foreground/60">
                      <button
                        onClick={() => toggleLike(spark.id)}
                        className={`flex items-center gap-1 transition ${
                          spark.liked ? "text-secondary" : "hover:text-secondary"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${spark.liked ? "fill-current" : ""}`} />
                        <span className="text-xs font-medium">{(spark.likes / 1000).toFixed(1)}k</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs font-medium">24</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-accent transition">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Take Spark
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="gap-2 bg-transparent">
            Load More Sparks
          </Button>
        </div>
      </div>
    </section>
  )
}
