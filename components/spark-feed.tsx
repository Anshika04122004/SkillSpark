"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface Spark {
  id: number
  creator: string
  title: string
  duration: string
  topic: string
  course: string
  thumbnail: string
  likes: number
  comments: { author: string; text: string }[]
  liked: boolean
}

const mockSparks: Spark[] = [
  {
    id: 1,
    creator: "Sarah Chen",
    title: "Master Excel Pivot Tables in 60 Seconds",
    duration: "0:58",
    topic: "Business",
    course: "Advanced Excel",
    thumbnail: "bg-gradient-to-br from-blue-400 to-blue-600",
    likes: 234,
    comments: [
      { author: "John Doe", text: "Amazing explanation!" },
      { author: "Jane Smith", text: "This helped me so much" },
    ],
    liked: false,
  },
  {
    id: 2,
    creator: "Mike Johnson",
    title: "React Hooks Explained Simply",
    duration: "1:23",
    topic: "Programming",
    course: "React Mastery",
    thumbnail: "bg-gradient-to-br from-green-400 to-emerald-600",
    likes: 892,
    comments: [{ author: "Alex Kumar", text: "Best explanation ever!" }],
    liked: false,
  },
  {
    id: 3,
    creator: "Emma Davis",
    title: "Productivity Tips for Remote Workers",
    duration: "0:45",
    topic: "Lifestyle",
    course: "Remote Work Mastery",
    thumbnail: "bg-gradient-to-br from-orange-400 to-red-600",
    likes: 567,
    comments: [],
    liked: false,
  },
]

export default function SparkFeed() {
  const [sparks, setSparks] = useState<Spark[]>(mockSparks)
  const [selectedSpark, setSelectedSpark] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")

  const toggleLike = (id: number) => {
    setSparks(
      sparks.map((spark) =>
        spark.id === id
          ? { ...spark, liked: !spark.liked, likes: spark.liked ? spark.likes - 1 : spark.likes + 1 }
          : spark,
      ),
    )
  }

  const addComment = (id: number) => {
    if (!newComment.trim()) return
    setSparks(
      sparks.map((spark) =>
        spark.id === id
          ? {
              ...spark,
              comments: [...spark.comments, { author: "You", text: newComment }],
            }
          : spark,
      ),
    )
    setNewComment("")
  }

  const currentSpark = sparks.find((s) => s.id === selectedSpark)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {/* Main Feed - Full width on mobile */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Learning Feed</h2>

          {sparks.map((spark) => (
            <div
              key={spark.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Video Reel Container - Instagram style */}
              <div className={`${spark.thumbnail} h-96 w-full relative flex flex-col justify-between p-4`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/30 rounded-full p-4 hover:bg-black/50 transition cursor-pointer">
                    <span className="text-white text-4xl">▶</span>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {spark.topic}
                  </div>
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {spark.duration}
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-1">{spark.title}</h3>
                  <p className="text-white/90 text-sm">by {spark.creator}</p>
                </div>
              </div>

              {/* Engagement Section */}
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6 text-gray-600">
                    <span className="text-sm font-semibold">{spark.likes} likes</span>
                    <span className="text-sm font-semibold">{spark.comments.length} comments</span>
                  </div>
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                    {spark.course}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => toggleLike(spark.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex-1 border border-gray-200"
                  >
                    <Heart size={20} className={spark.liked ? "fill-red-500 text-red-500" : "text-gray-600"} />
                    <span className={spark.liked ? "text-red-500 font-semibold" : "text-gray-600"}>Like</span>
                  </button>
                  <Dialog
                    open={selectedSpark === spark.id}
                    onOpenChange={(open) => setSelectedSpark(open ? spark.id : null)}
                  >
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex-1 border border-gray-200">
                        <MessageCircle size={20} className="text-gray-600" />
                        <span className="text-gray-600">Comments</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{spark.title}</DialogTitle>
                        <DialogDescription>Comments by learners</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {spark.comments.map((comment, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-semibold text-sm text-gray-900">{comment.author}</p>
                            <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Input
                          placeholder="Add a comment..."
                          value={selectedSpark === spark.id ? newComment : ""}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") addComment(spark.id)
                          }}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => addComment(spark.id)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        >
                          Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex-1 border border-gray-200">
                    <Share2 size={20} className="text-gray-600" />
                    <span className="text-gray-600">Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="font-bold text-gray-900 mb-4">Today's Progress</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sparks Watched</p>
                <p className="text-2xl font-bold text-purple-600">3/5</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Learning Time</p>
                <p className="text-2xl font-bold text-pink-600">24 min</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                <p className="text-2xl font-bold text-blue-600">12 days 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
