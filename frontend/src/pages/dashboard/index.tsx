import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, FileText, Settings, Code, Plus, BarChart3, Users, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ChatBot Builder</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Pro Plan</Badge>
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Manage your chatbots and monitor their performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Chatbots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Plus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Create New Chatbot</CardTitle>
              <CardDescription>Start building a new AI chatbot from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/dashboard/documents">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Manage Documents</CardTitle>
              <CardDescription>Upload and organize your knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/documents">Manage</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Configure Chatbot</CardTitle>
              <CardDescription>Customize appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/configure">Configure</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Code className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Get Embed Code</CardTitle>
              <CardDescription>Generate script for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/embed">Get Code</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Chatbots */}
        <Card>
          <CardHeader>
            <CardTitle>Your Chatbots</CardTitle>
            <CardDescription>Manage and monitor your active chatbots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer Support Bot</h3>
                    <p className="text-sm text-gray-600">E-commerce support chatbot</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">Active</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">89% accuracy</p>
                    <p className="text-xs text-gray-600">234 conversations</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Product FAQ Bot</h3>
                    <p className="text-sm text-gray-600">Product information assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">Active</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">92% accuracy</p>
                    <p className="text-xs text-gray-600">156 conversations</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Documentation Helper</h3>
                    <p className="text-sm text-gray-600">Technical documentation bot</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">Draft</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">-</p>
                    <p className="text-xs text-gray-600">In development</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
