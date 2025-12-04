"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Heart, MessageCircle, Plus, Sparkles, BarChart3, Users, Menu, X, ArrowLeft } from "lucide-react"

const creatorStats = {
  totalViews: 124500,
  totalLikes: 8950,
  totalComments: 1230,
  followers: 5420,
}

const defaultSparks = [
  {
    id: 1,
    title: "Master Excel Pivot Tables",
    duration: "45 sec",
    views: 12430,
    likes: 2430,
    comments: 145,
    published: "2 days ago",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    videoUrl: null,
  },
  {
    id: 2,
    title: "Advanced Excel Formulas",
    duration: "52 sec",
    views: 8920,
    likes: 1850,
    comments: 92,
    published: "5 days ago",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    videoUrl: null,
  },
  {
    id: 3,
    title: "Excel Shortcuts Guide",
    duration: "38 sec",
    views: 15230,
    likes: 3120,
    comments: 287,
    published: "1 week ago",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    videoUrl: null,
  },
]

export default function CreatorDashboard() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSparkId, setEditingSparkId] = useState<number | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [sparks, setSparks] = useState(defaultSparks)
  const [likedSparks, setLikedSparks] = useState<number[]>([])
  const [newSpark, setNewSpark] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
  })
  const [videoUpload, setVideoUpload] = useState({
    videoUrl: "",
  })
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({})
  const [sparkComments, setSparkComments] = useState<{ [key: number]: string[] }>({})
  const [commentText, setCommentText] = useState("")

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const handleCreateSpark = () => {
    if (newSpark.title.trim()) {
      const spark = {
        id: sparks.length + 1,
        title: newSpark.title,
        duration: "60 sec",
        views: 0,
        likes: 0,
        comments: 0,
        published: "just now",
        thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        videoUrl: null,
      }
      setSparks([spark, ...sparks])
      setNewSpark({ title: "", description: "", category: "", difficulty: "" })
      setIsDialogOpen(false)
    }
  }

  const handleEditSpark = (sparkId: number) => {
    setEditingSparkId(sparkId)
    setEditDialogOpen(true)
    setVideoUpload({ videoUrl: "" })
  }

  const handleUploadVideo = () => {
    if (editingSparkId !== null && videoUpload.videoUrl) {
      setSparks(
        sparks.map((spark) =>
          spark.id === editingSparkId ? { ...spark, videoUrl: videoUpload.videoUrl, views: spark.views + 100 } : spark,
        ),
      )
      setEditDialogOpen(false)
      setVideoUpload({ videoUrl: "" })
      alert("Video uploaded successfully for: " + sparks.find((s) => s.id === editingSparkId)?.title)
    }
  }

  const handleLikeSpark = (sparkId: number) => {
    setSparks(
      sparks.map((spark) =>
        spark.id === sparkId
          ? { ...spark, likes: likedSparks.includes(sparkId) ? spark.likes - 1 : spark.likes + 1 }
          : spark,
      ),
    )
    if (likedSparks.includes(sparkId)) {
      setLikedSparks(likedSparks.filter((id) => id !== sparkId))
    } else {
      setLikedSparks([...likedSparks, sparkId])
    }
  }

  const handleAddComment = (sparkId: number) => {
    if (commentText.trim()) {
      setSparkComments({
        ...sparkComments,
        [sparkId]: [...(sparkComments[sparkId] || []), commentText],
      })
      setSparks(sparks.map((spark) => (spark.id === sparkId ? { ...spark, comments: spark.comments + 1 } : spark)))
      setCommentText("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBackToDashboard} className="hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SkillSpark
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#sparks" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                My Sparks
              </a>
              <a href="#analytics" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Analytics
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Spark
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Spark</DialogTitle>
                    <DialogDescription>Upload a bite-sized educational video to inspire learners</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Spark Title</label>
                      <Input
                        placeholder="e.g., Master Excel Pivot Tables"
                        value={newSpark.title}
                        onChange={(e) => setNewSpark({ ...newSpark, title: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="What will learners discover in this spark?"
                        value={newSpark.description}
                        onChange={(e) => setNewSpark({ ...newSpark, description: e.target.value })}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={newSpark.category}
                          onValueChange={(value) => setNewSpark({ ...newSpark, category: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Difficulty</label>
                        <Select
                          value={newSpark.difficulty}
                          onValueChange={(value) => setNewSpark({ ...newSpark, difficulty: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      onClick={handleCreateSpark}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Create Spark
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Creator Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(creatorStats.totalViews / 1000).toFixed(0)}k</div>
              <p className="text-xs text-foreground/50 mt-1">+12% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Likes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(creatorStats.totalLikes / 1000).toFixed(1)}k</div>
              <p className="text-xs text-foreground/50 mt-1">+8% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(creatorStats.totalComments / 1000).toFixed(1)}k</div>
              <p className="text-xs text-foreground/50 mt-1">+15% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Followers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(creatorStats.followers / 1000).toFixed(1)}k</div>
              <p className="text-xs text-foreground/50 mt-1">+24 this week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sparks" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="sparks">My Sparks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* My Sparks Tab */}
          <TabsContent value="sparks" className="space-y-6">
            <div className="space-y-4">
              {sparks.map((spark) => (
                <Card key={spark.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="md:flex">
                    <div
                      className="md:w-40 h-40 md:h-auto relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform"
                      style={{ background: spark.thumbnail }}
                    />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{spark.title}</h3>
                        <p className="text-sm text-foreground/60 mb-4">Published {spark.published}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-foreground/60 cursor-pointer hover:text-foreground">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{spark.views} views</span>
                        </div>
                        <button
                          onClick={() => handleLikeSpark(spark.id)}
                          className="flex items-center gap-2 text-foreground/60 hover:text-red-500 transition"
                        >
                          <Heart className="w-4 h-4" fill={likedSparks.includes(spark.id) ? "currentColor" : "none"} />
                          <span className="text-sm">{spark.likes} likes</span>
                        </button>
                        <button
                          onClick={() => setShowComments({ ...showComments, [spark.id]: !showComments[spark.id] })}
                          className="flex items-center gap-2 text-foreground/60 hover:text-blue-500 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{spark.comments} comments</span>
                        </button>
                        <div className="ml-auto">
                          <Dialog open={editDialogOpen && editingSparkId === spark.id} onOpenChange={setEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => handleEditSpark(spark.id)}>
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Upload Video for {spark.title}</DialogTitle>
                                <DialogDescription>Add a video to this spark</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Video URL or File</label>
                                  <Input
                                    placeholder="Paste video URL or select file"
                                    value={videoUpload.videoUrl}
                                    onChange={(e) => setVideoUpload({ videoUrl: e.target.value })}
                                    className="mt-1"
                                  />
                                </div>
                                <Button
                                  onClick={handleUploadVideo}
                                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                >
                                  Upload Video
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      {showComments[spark.id] && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="space-y-3 mb-3 max-h-40 overflow-y-auto">
                            {sparkComments[spark.id]?.map((comment, idx) => (
                              <div key={idx} className="text-sm p-2 bg-muted rounded">
                                {comment}
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddComment(spark.id)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Views Over Time</h4>
                    <div className="space-y-3">
                      {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
                        <div key={week} className="flex items-center gap-3">
                          <span className="text-sm w-16 text-foreground/60">{week}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: `${30 + (i + 1) * 15}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Engagement Rate</h4>
                    <div className="space-y-3">
                      {[
                        { metric: "Like Rate", value: 7.2 },
                        { metric: "Comment Rate", value: 1.2 },
                        { metric: "Share Rate", value: 0.8 },
                        { metric: "Completion Rate", value: 85 },
                      ].map((item) => (
                        <div key={item.metric} className="flex items-center justify-between">
                          <span className="text-sm">{item.metric}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                                style={{ width: `${Math.min(item.value * 10, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-foreground/60 w-12 text-right">
                              {item.value}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Sparks</CardTitle>
                <CardDescription>Your sparks with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Excel Shortcuts Guide", engagement: 95 },
                    { title: "Master Excel Pivot Tables", engagement: 87 },
                    { title: "Advanced Excel Formulas", engagement: 76 },
                  ].map((spark, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{spark.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${spark.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-8 text-right">{spark.engagement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
