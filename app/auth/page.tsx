"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [role, setRole] = useState<"learner" | "creator" | null>(null)
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const router = useRouter()

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        setError("Invalid email or password")
        return
      }

      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      if (users.some((u: any) => u.email === email)) {
        setError("Email already exists")
        return
      }

      const newUser = { email, name, password, role: null }
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))
    }

    setShowRoleSelection(true)
  }

  const handleRoleSelection = (selectedRole: "learner" | "creator") => {
    setRole(selectedRole)
    // Store role with user data
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    currentUser.role = selectedRole
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    setShowRoleSelection(false)
    router.push("/dashboard")
  }

  // Show role selection after successful auth
  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">What's your role?</h2>
          <p className="text-center text-gray-600 mb-8">Choose how you want to use SkillSpark</p>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelection("learner")}
              className="w-full p-4 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition text-center font-semibold text-purple-600"
            >
              📚 Learner
              <p className="text-sm text-gray-600 font-normal mt-1">Discover and learn bite-sized skills</p>
            </button>
            <button
              onClick={() => handleRoleSelection("creator")}
              className="w-full p-4 border-2 border-pink-600 rounded-lg hover:bg-pink-50 transition text-center font-semibold text-pink-600"
            >
              🎬 Creator
              <p className="text-sm text-gray-600 font-normal mt-1">Create and share educational content</p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          SkillSpark
        </h1>
        <p className="text-center text-gray-600 mb-8">Learn a skill in a scroll</p>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
            }}
            className="text-purple-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  )
}
