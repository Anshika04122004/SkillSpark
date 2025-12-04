"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import SparkFeed from "@/components/spark-feed"
import Link from "next/link"

interface Course {
  id: number
  name: string
  progress: number
  dailyLessons: number
  completedToday: number
  reels: number
  icon: string
}

const courses: Course[] = [
  {
    id: 1,
    name: "Advanced Excel",
    progress: 65,
    dailyLessons: 3,
    completedToday: 2,
    reels: 12,
    icon: "📊",
  },
  {
    id: 2,
    name: "React Mastery",
    progress: 45,
    dailyLessons: 2,
    completedToday: 1,
    reels: 18,
    icon: "⚛️",
  },
  {
    id: 3,
    name: "Remote Work Mastery",
    progress: 82,
    dailyLessons: 1,
    completedToday: 1,
    reels: 8,
    icon: "💼",
  },
  {
    id: 4,
    name: "Python Basics",
    progress: 30,
    dailyLessons: 3,
    completedToday: 0,
    reels: 25,
    icon: "🐍",
  },
]

export default function CoursePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState<"lessons" | "reels">("lessons")
  const router = useRouter()
  const params = useParams()
  const courseId = Number.parseInt(params.id as string)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(currentUser))
    const foundCourse = courses.find((c) => c.id === courseId)
    setCourse(foundCourse || null)
    setLoading(false)
  }, [courseId, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Course not found</p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span>{course.icon}</span> {course.name}
            </h1>
            <p className="text-gray-600 mt-2">{course.progress}% Complete</p>
          </div>
        </div>

        <div className="mb-6">
          <Progress value={course.progress} className="h-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-6">
            <p className="text-sm opacity-90">Daily Lessons</p>
            <p className="text-3xl font-bold">
              {course.completedToday}/{course.dailyLessons}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6">
            <p className="text-sm opacity-90">Available Reels</p>
            <p className="text-3xl font-bold">{course.reels}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-xl p-6">
            <p className="text-sm opacity-90">Total Progress</p>
            <p className="text-3xl font-bold">{course.progress}%</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab("lessons")}
            className={`px-6 py-2 ${
              activeTab === "lessons"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Daily Lessons
          </Button>
          <Button
            onClick={() => setActiveTab("reels")}
            className={`px-6 py-2 ${
              activeTab === "reels"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Course Reels
          </Button>
        </div>

        {activeTab === "lessons" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Learning Path</h2>

            <div className="space-y-4">
              {Array.from({ length: course.dailyLessons }).map((_, idx) => (
                <Link key={idx} href={`/course/${course.id}/lesson/${idx + 1}`}>
                  <div
                    className={`p-4 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all hover:shadow-lg ${
                      idx < course.completedToday
                        ? "bg-green-50 border-green-300"
                        : "bg-gray-50 border-gray-300 hover:border-purple-400"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          idx < course.completedToday ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        {idx < course.completedToday ? "✓" : idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          Lesson {idx + 1}: {course.name} Fundamentals
                        </p>
                        <p className="text-sm text-gray-600">5-8 minutes</p>
                      </div>
                    </div>
                    <Button
                      className={
                        idx < course.completedToday
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      }
                    >
                      {idx < course.completedToday ? "Completed" : "Start"}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> Complete all daily lessons to maintain your learning streak and unlock
                achievement badges!
              </p>
            </div>
          </div>
        )}

        {activeTab === "reels" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Reels for {course.name}</h2>
            <SparkFeed />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
