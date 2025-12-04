"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import SparkFeed from "@/components/spark-feed"

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

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(currentUser))
    setSelectedCourse(courses[0])
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    router.push(`/course/${course.id}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600">Keep learning and building your skills</p>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="courses">Courses & Learning Path</TabsTrigger>
            <TabsTrigger value="feed">Personalized Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    selectedCourse?.id === course.id
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-white border-2 border-gray-200 hover:border-purple-400"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-4xl mb-2">{course.icon}</p>
                      <h3
                        className={`text-xl font-bold ${selectedCourse?.id === course.id ? "text-white" : "text-gray-900"}`}
                      >
                        {course.name}
                      </h3>
                    </div>
                    <span
                      className={`text-2xl font-bold ${
                        selectedCourse?.id === course.id ? "text-white" : "text-purple-600"
                      }`}
                    >
                      {course.progress}%
                    </span>
                  </div>

                  <div className="mb-4">
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className={selectedCourse?.id === course.id ? "text-white/90" : "text-gray-600"}>
                      Daily Lessons: {course.completedToday}/{course.dailyLessons} ✓
                    </p>
                    <p className={selectedCourse?.id === course.id ? "text-white/90" : "text-gray-600"}>
                      Available Reels: {course.reels}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedCourse && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Learning Path: {selectedCourse.name}</h2>

                <div className="space-y-4">
                  {Array.from({ length: selectedCourse.dailyLessons }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 flex items-center justify-between ${
                        idx < selectedCourse.completedToday
                          ? "bg-green-50 border-green-300"
                          : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            idx < selectedCourse.completedToday ? "bg-green-500" : "bg-gray-400"
                          }`}
                        >
                          {idx < selectedCourse.completedToday ? "✓" : idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            Lesson {idx + 1}: {selectedCourse.name} Fundamentals
                          </p>
                          <p className="text-sm text-gray-600">5-8 minutes</p>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/course/${selectedCourse.id}/lesson/${idx + 1}`)
                        }}
                        className={
                          idx < selectedCourse.completedToday
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        }
                      >
                        {idx < selectedCourse.completedToday ? "Completed" : "Start"}
                      </Button>
                    </div>
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
          </TabsContent>

          <TabsContent value="feed">
            <SparkFeed />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
