"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [messengerOpen, setMessengerOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "Sarah Chen", text: "Hi! I loved your feedback on my React course 😊" },
    { sender: "Mike Johnson", text: "Do you have any questions about Excel?" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [uploadReelOpen, setUploadReelOpen] = useState(false)
  const [reelData, setReelData] = useState({ title: "", course: "", file: "" })
  const [isCreator, setIsCreator] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      setUser(userData)
      setIsCreator(userData.role === "creator")
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    router.push("/auth")
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }])
      setNewMessage("")
    }
  }

  const handleUploadReel = () => {
    console.log("Uploading reel:", reelData)
    setUploadReelOpen(false)
    setReelData({ title: "", course: "", file: "" })
    alert("Reel uploaded successfully!")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 bg-gradient-to-b from-purple-600 to-pink-600 flex-col relative">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">SkillSpark</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink href="/dashboard" icon="🏠" label="Feed" />
          <NavLink href="/profile" icon="👤" label="Profile" />
          <NavLink href="/feedback" icon="💬" label="Feedback" />
          <NavLink href="/contact" icon="✉️" label="Contact" />
          <NavLink href="/help" icon="🤖" label="AI Help" />
          {isCreator && <NavLink href="/creator" icon="🎬" label="Creator Studio" />}
        </nav>

        <div className="p-4 space-y-2 border-t border-white/20">
          <Dialog open={messengerOpen} onOpenChange={setMessengerOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold gap-2 justify-start">
                <MessageSquare size={18} />
                Messenger
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Messages</DialogTitle>
                <DialogDescription>Chat with experts and mentors</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${msg.sender === "You" ? "bg-purple-100 ml-8" : "bg-gray-100 mr-8"}`}
                  >
                    <p className="font-semibold text-xs text-gray-600">{msg.sender}</p>
                    <p className="text-sm text-gray-900">{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Button onClick={handleSendMessage} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  Send
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {isCreator && (
            <Dialog open={uploadReelOpen} onOpenChange={setUploadReelOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold gap-2 justify-start">
                  <Upload size={18} />
                  Upload Reel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Educational Reel</DialogTitle>
                  <DialogDescription>Share bite-sized educational content</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Reel Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Master Excel Pivot Tables"
                      value={reelData.title}
                      onChange={(e) => setReelData({ ...reelData, title: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Course/Topic</label>
                    <input
                      type="text"
                      placeholder="e.g., Advanced Excel"
                      value={reelData.course}
                      onChange={(e) => setReelData({ ...reelData, course: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setReelData({ ...reelData, file: e.target.value })}
                      className="w-full mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleUploadReel}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  >
                    Upload Reel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Button onClick={handleSignOut} className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between z-40">
        <h1 className="text-xl font-bold">SkillSpark</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-4 space-y-2 z-30">
          <MobileNavLink href="/dashboard" label="Feed" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="/profile" label="Profile" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="/feedback" label="Feedback" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="/contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="/help" label="AI Help" onClick={() => setMobileMenuOpen(false)} />
          {isCreator && (
            <MobileNavLink href="/creator" label="Creator Studio" onClick={() => setMobileMenuOpen(false)} />
          )}

          <Dialog open={messengerOpen} onOpenChange={setMessengerOpen}>
            <DialogTrigger asChild>
              <button className="w-full px-4 py-2 rounded text-white hover:bg-white/10 transition text-left">
                💬 Messenger
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Messages</DialogTitle>
                <DialogDescription>Chat with experts and mentors</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${msg.sender === "You" ? "bg-purple-100 ml-8" : "bg-gray-100 mr-8"}`}
                  >
                    <p className="font-semibold text-xs text-gray-600">{msg.sender}</p>
                    <p className="text-sm text-gray-900">{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Button onClick={handleSendMessage} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  Send
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {isCreator && (
            <Dialog open={uploadReelOpen} onOpenChange={setUploadReelOpen}>
              <DialogTrigger asChild>
                <button className="w-full px-4 py-2 rounded text-white hover:bg-white/10 transition text-left">
                  📹 Upload Reel
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Educational Reel</DialogTitle>
                  <DialogDescription>Share bite-sized educational content</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Reel Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Master Excel Pivot Tables"
                      value={reelData.title}
                      onChange={(e) => setReelData({ ...reelData, title: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Course/Topic</label>
                    <input
                      type="text"
                      placeholder="e.g., Advanced Excel"
                      value={reelData.course}
                      onChange={(e) => setReelData({ ...reelData, course: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setReelData({ ...reelData, file: e.target.value })}
                      className="w-full mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleUploadReel}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  >
                    Upload Reel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Button onClick={handleSignOut} className="w-full mt-2 bg-white/20 hover:bg-white/30 text-white">
            Sign Out
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-16 md:pt-0">{children}</div>
    </div>
  )
}

function NavLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition cursor-pointer">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick}>
      <div className="px-4 py-2 rounded text-white hover:bg-white/10 transition">{label}</div>
    </Link>
  )
}
