"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
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

export default function LessonPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course | null>(null)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const router = useRouter()
  const params = useParams()
  const courseId = Number.parseInt(params.id as string)
  const lessonId = Number.parseInt(params.lessonId as string)

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
          <p className="text-xl text-gray-600">Course not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const handleCompleteLesson = () => {
    setLessonCompleted(true)
    alert("Lesson completed successfully!")
  }

  const handleNextLesson = () => {
    if (lessonId < course.dailyLessons) {
      router.push(`/course/${courseId}/lesson/${lessonId + 1}`)
    } else {
      router.push(`/course/${courseId}`)
    }
  }

  const handlePreviousLesson = () => {
    if (lessonId > 1) {
      router.push(`/course/${courseId}/lesson/${lessonId - 1}`)
    } else {
      router.push(`/course/${courseId}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-8 flex items-center gap-4">
          <Link href={`/course/${courseId}`}>
            <Button variant="outline">← Back to {course.name}</Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Video Placeholder */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-4">🎥</p>
              <p className="text-white text-xl font-semibold">Lesson {lessonId} Video</p>
              <p className="text-white/80 text-sm mt-2">{course.name} - 5-8 minutes</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Lesson {lessonId}: {course.name} Fundamentals
            </h1>
            <p className="text-gray-600 mb-6">Master the core concepts of {course.name}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-900">
                <strong>About this lesson:</strong> In this lesson, you'll learn the fundamental concepts and best
                practices for {course.name}. This lesson typically takes 5-8 minutes to complete.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold text-gray-900">Lesson Topics</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Introduction to core concepts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Practical examples and use cases</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Key takeaways and best practices</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Quick quiz to test your knowledge</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCompleteLesson}
                disabled={lessonCompleted}
                className={`flex-1 py-3 text-lg font-semibold ${
                  lessonCompleted
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                }`}
              >
                {lessonCompleted ? "✓ Lesson Completed" : "Complete Lesson"}
              </Button>
              <Button
                onClick={handlePreviousLesson}
                variant="outline"
                className="flex-1 py-3 text-lg font-semibold bg-transparent"
              >
                ← Previous Lesson
              </Button>
              <Button
                onClick={handleNextLesson}
                variant="outline"
                className="flex-1 py-3 text-lg font-semibold bg-transparent"
              >
                {lessonId < course.dailyLessons ? "Next Lesson →" : "Back to Course"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
