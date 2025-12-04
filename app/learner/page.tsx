"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Clock,
  Flame,
  User,
  Sparkles,
  BookOpen,
  TrendingUp,
  Award,
  Menu,
  X,
} from "lucide-react"

const sparks = [
  {
    id: 1,
    creator: "Sarah Chen",
    title: "Master Excel Pivot Tables",
    duration: "45 sec",
    category: "Business",
    likes: 2430,
    liked: false,
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    difficulty: "Intermediate",
    course: "Excel Mastery",
  },
  {
    id: 2,
    creator: "Alex Rodriguez",
    title: "CSS Grid Layout Secrets",
    duration: "60 sec",
    category: "Web Dev",
    likes: 3890,
    liked: false,
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    difficulty: "Beginner",
    course: "Web Design Pro",
  },
  {
    id: 3,
    creator: "Maya Patel",
    title: "Personal Finance 101",
    duration: "52 sec",
    category: "Finance",
    likes: 5230,
    liked: false,
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    difficulty: "Beginner",
    course: "Financial Freedom",
  },
  {
    id: 4,
    creator: "Jordan Lee",
    title: "Python Decorators Explained",
    duration: "58 sec",
    category: "Programming",
    likes: 1850,
    liked: false,
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    difficulty: "Advanced",
    course: "Python Advanced",
  },
]

const courses = [
  {
    id: 1,
    title: "Excel Mastery",
    progress: 65,
    videos: 12,
    completed: 8,
    creator: "Sarah Chen",
    category: "Business",
  },
  {
    id: 2,
    title: "Web Design Pro",
    progress: 40,
    videos: 15,
    completed: 6,
    creator: "Alex Rodriguez",
    category: "Web Dev",
  },
  {
    id: 3,
    title: "Financial Freedom",
    progress: 85,
    videos: 10,
    completed: 9,
    creator: "Maya Patel",
    category: "Finance",
  },
]

function SparkCard({ spark, onLike }: { spark: (typeof sparks)[0]; onLike: (id: number) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="md:flex">
        <div className="md:w-48 h-48 md:h-auto relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
          <div className="absolute inset-0" style={{ background: spark.image }}></div>
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
              <Play className="w-7 h-7 text-white fill-white" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {spark.duration}
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{spark.creator}</p>
                <p className="text-xs text-foreground/60">{spark.category}</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs">
                <Flame className="w-3 h-3 text-primary" />
                <span className="font-medium text-primary">{spark.difficulty}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">{spark.title}</h3>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-6 text-sm text-foreground/60">
              <button
                onClick={() => onLike(spark.id)}
                className={`flex items-center gap-1 transition ${spark.liked ? "text-secondary" : "hover:text-secondary"}`}
              >
                <Heart className={`w-5 h-5 ${spark.liked ? "fill-current" : ""}`} />
                <span className="text-xs font-medium">{(spark.likes / 1000).toFixed(1)}k</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">24</span>
              </button>
              <button className="flex items-center gap-1 hover:text-accent transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Take Spark
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function LearnerDashboard() {
  const [sparksData, setSparks] = useState(sparks)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleLike = (id: number) => {
    setSparks(
      sparksData.map((spark) =>
        spark.id === id
          ? { ...spark, liked: !spark.liked, likes: spark.liked ? spark.likes - 1 : spark.likes + 1 }
          : spark,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SkillSpark
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#feed" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Feed
              </a>
              <a href="#courses" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                My Courses
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Profile
              </Button>
              <Button size="sm" variant="outline">
                Sign Out
              </Button>
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
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">Sparks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <p className="text-xs text-foreground/50 mt-1">+2 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7 Days</div>
              <p className="text-xs text-foreground/50 mt-1">Keep it going!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">Time Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.5h</div>
              <p className="text-xs text-foreground/50 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">Skills Mastered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-foreground/50 mt-1">Certificates earned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="feed" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Spark Feed</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">My Courses</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          {/* Spark Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="space-y-4">
              {sparksData.map((spark) => (
                <SparkCard key={spark.id} spark={spark} onLike={toggleLike} />
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Sparks
              </Button>
            </div>
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      {course.creator}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-foreground/60">Progress</span>
                        <span className="text-sm font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="text-sm text-foreground/60">
                      {course.completed} of {course.videos} videos completed
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Analytics</CardTitle>
                <CardDescription>Track your progress and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Weekly Activity</h4>
                    <div className="space-y-3">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div key={day} className="flex items-center gap-3">
                          <span className="text-sm w-10 text-foreground/60">{day}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: `${30 + Math.random() * 70}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Top Categories</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Business", count: 8 },
                        { name: "Web Dev", count: 6 },
                        { name: "Finance", count: 5 },
                        { name: "Programming", count: 4 },
                      ].map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between">
                          <span className="text-sm">{cat.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                                style={{ width: `${(cat.count / 8) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-foreground/60 w-6 text-right">{cat.count}</span>
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
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "🔥 7-Day Streak - Learn every day for a week",
                    "⭐ Excel Expert - Complete Excel Mastery course",
                    "🚀 Quick Learner - Complete 5 sparks in one day",
                    "💯 Perfect Score - Get 100% on a Spark Quest",
                  ].map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl">{achievement.split(" ")[0]}</span>
                      <span className="text-sm">{achievement.substring(achievement.indexOf(" ") + 1)}</span>
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
