"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap, Target } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/auth")
      return
    }
    const userData = JSON.parse(currentUser)
    setUser(userData)
    setFormData({
      name: userData.name,
      email: userData.email,
      bio: userData.bio || "Passionate about learning",
    })
    setLoading(false)
  }, [router])

  const handleSave = () => {
    const updatedUser = { ...user, ...formData }
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = users.findIndex((u: any) => u.email === user.email)
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem("users", JSON.stringify(users))
    }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-4xl font-bold text-white flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
              <p className="text-gray-600 mb-4">{formData.bio}</p>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>

          {isEditing && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input value={formData.email} disabled className="w-full bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  className="w-full"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="progress">Daily Progress</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                    <Zap size={20} />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">Today's Activity</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">45 min</p>
                <p className="text-xs text-gray-600 mt-2">Learning time spent</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">Current Streak</p>
                </div>
                <p className="text-3xl font-bold text-green-600">12 days 🔥</p>
                <p className="text-xs text-gray-600 mt-2">Keep it going!</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white">
                    <Target size={20} />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">This Week</p>
                </div>
                <p className="text-3xl font-bold text-purple-600">5/7 days</p>
                <p className="text-xs text-gray-600 mt-2">Goal: Complete 7 days</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">This Week's Activity</h3>
              <div className="space-y-3">
                {[
                  { day: "Monday", time: "45 min", status: "✓" },
                  { day: "Tuesday", time: "60 min", status: "✓" },
                  { day: "Wednesday", time: "30 min", status: "✓" },
                  { day: "Thursday", time: "0 min", status: "✗" },
                  { day: "Friday", time: "45 min", status: "✓" },
                  { day: "Saturday", time: "50 min", status: "✓" },
                  { day: "Sunday", time: "40 min", status: "✓" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white ${
                          item.status === "✓" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="font-semibold text-gray-900">{item.day}</span>
                    </div>
                    <span className="text-gray-600 font-semibold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Learning Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Completed: Master Excel Pivot Tables", date: "2 hours ago", course: "Advanced Excel" },
                  { action: "Liked: React Hooks Explained", date: "1 day ago", course: "React Mastery" },
                  { action: "Completed: Python Basics Module 1", date: "3 days ago", course: "Python Basics" },
                  {
                    action: "Completed: Remote Work Productivity Tips",
                    date: "5 days ago",
                    course: "Remote Work Mastery",
                  },
                  { action: "Joined: Advanced Excel Course", date: "1 week ago", course: "Advanced Excel" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-1">📚 {item.course}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="improvements">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Areas of Improvement</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Consistency",
                      description: "You missed Thursday's learning session. Build a stronger habit!",
                      recommendation: "Set daily reminders at 9 AM",
                      icon: "⏰",
                    },
                    {
                      title: "Course Progress",
                      description: "Python Basics is at 30%. Consider dedicating more time to it.",
                      recommendation: "Add 2 more lessons per week",
                      icon: "🐍",
                    },
                    {
                      title: "Engagement",
                      description: "You're not commenting on reels. Join discussions with other learners!",
                      recommendation: "Comment on 3 reels this week",
                      icon: "💬",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                          <p className="text-xs bg-yellow-100 text-yellow-900 px-2 py-1 rounded inline-block font-semibold">
                            💡 {item.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 md:p-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-3">✨ Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["🏆 First Spark", "🔥 7-Day Streak", "📚 Course Complete", "💪 100 Likes"].map(
                    (achievement, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/50 rounded-lg">
                        <p className="text-2xl mb-1">{achievement.split(" ")[0]}</p>
                        <p className="text-xs font-semibold text-green-900">
                          {achievement.split(" ").slice(1).join(" ")}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
