"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })
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

    const contactData = {
      user: user?.email,
      name: user?.name,
      ...formData,
      timestamp: new Date().toISOString(),
    }

    const allMessages = JSON.parse(localStorage.getItem("contact") || "[]")
    allMessages.push(contactData)
    localStorage.setItem("contact", JSON.stringify(allMessages))

    setSubmitted(true)
    setFormData({ subject: "", message: "" })

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h1>
          <p className="text-gray-600 mb-8">Have a question or need assistance? We're here to help!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What is this about?"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message here..."
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg"
            >
              Send Message
            </Button>

            {submitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Your message has been sent successfully. We'll get back to you soon!
              </div>
            )}
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">support@skillspark.com</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Twitter</p>
                <p className="font-semibold text-gray-900">@SkillSpark</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Response Time</p>
                <p className="font-semibold text-gray-900">24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
