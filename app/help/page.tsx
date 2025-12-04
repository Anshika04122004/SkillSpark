"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function HelpPage() {
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm SkillSpark AI Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(currentUser))
  }, [router])

  // Simple AI responses based on keywords
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("course") || lowerMessage.includes("spark")) {
      return "Sparks are 30-90 second educational videos on SkillSpark. You can browse them in your feed, like them, and track your progress. Each spark covers a specific concept or skill!"
    }
    if (lowerMessage.includes("profile") || lowerMessage.includes("edit")) {
      return "You can edit your profile by clicking on the Profile button in the sidebar. Update your name, email, and bio to personalize your learning experience."
    }
    if (lowerMessage.includes("feedback") || lowerMessage.includes("suggest")) {
      return "We love hearing from you! Visit the Feedback page to share your thoughts, rate your experience, and help us improve SkillSpark."
    }
    if (lowerMessage.includes("progress") || lowerMessage.includes("track")) {
      return "Your progress is automatically tracked. Visit your Profile page to see completed sparks, skills learned, and your learning streak!"
    }
    if (lowerMessage.includes("creator") || lowerMessage.includes("upload")) {
      return "Currently, SkillSpark is optimized for learners. Creator features are coming soon! Stay tuned for the ability to upload your own educational sparks."
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("support")) {
      return "You can reach our support team through the Contact page. We typically respond within 24 hours!"
    }
    if (lowerMessage.includes("sign out") || lowerMessage.includes("logout")) {
      return "You can sign out by clicking the Sign Out button in the sidebar. Your progress will be saved!"
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Welcome to SkillSpark. How can I assist you today? Feel free to ask about courses, your profile, or any features!"
    }

    return "Great question! I can help with information about Sparks, your profile, progress tracking, feedback, and more. What would you like to know?"
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setLoading(false)
    }, 500)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 h-[calc(100vh-80px)] flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">SkillSpark AI Assistant</h1>
            <p className="text-sm text-gray-600">Ask me anything about SkillSpark</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Send size={20} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
