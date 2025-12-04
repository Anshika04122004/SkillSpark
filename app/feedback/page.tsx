"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"

export default function FeedbackPage() {
  const [user, setUser] = useState<any>(null)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(currentUser))
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store feedback
    const feedbackData = {
      user: user?.email,
      feedback,
      rating,
      timestamp: new Date().toISOString(),
    }

    const allFeedback = JSON.parse(localStorage.getItem("feedback") || "[]")
    allFeedback.push(feedbackData)
    localStorage.setItem("feedback", JSON.stringify(allFeedback))

    setSubmitted(true)
    setFeedback("")
    setRating(5)

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
          <p className="text-gray-600 mb-8">Help us improve SkillSpark with your thoughts and suggestions</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your experience?
              </label>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg"
            >
              Submit Feedback
            </Button>

            {submitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Thank you! Your feedback has been submitted successfully.
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
