"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Bot, ArrowLeft, Settings, FileText, Code, BarChart3, MessageSquare, Trash2, Save, Eye, ExternalLink } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock data for a single chatbot
const mockChatbot = {
  id: "bot-1",
  name: "Customer Support Bot",
  description: "E-commerce support chatbot that helps customers with order tracking, returns, and product questions.",
  status: "active",
  type: "Support",
  conversations: 234,
  accuracy: 89,
  lastUpdated: "2023-05-15",
  greeting: "Hello! I'm your customer support assistant. How can I help you today?",
  primaryColor: "#3B82F6",
  position: "bottom-right",
  showAvatar: true,
  enableTyping: true,
  documents: [
    { id: "doc-1", name: "Product Manual.pdf", type: "PDF", size: "2.4 MB", status: "Processed" },
    { id: "doc-2", name: "FAQ Document.docx", type: "Word", size: "1.2 MB", status: "Processed" },
    { id: "doc-3", name: "Company Website", type: "URL", size: "15 pages", status: "Processed" }
  ],
  analytics: {
    totalConversations: 234,
    averageRating: 4.2,
    responseRate: 98,
    topQuestions: [
      { question: "How do I track my order?", count: 45 },
      { question: "How can I return a product?", count: 32 },
      { question: "What is your refund policy?", count: 28 },
      { question: "Do you ship internationally?", count: 21 },
      { question: "How long does shipping take?", count: 18 }
    ],
    conversationsByDay: [
      { date: "2023-05-09", count: 12 },
      { date: "2023-05-10", count: 18 },
      { date: "2023-05-11", count: 15 },
      { date: "2023-05-12", count: 22 },
      { date: "2023-05-13", count: 28 },
      { date: "2023-05-14", count: 20 },
      { date: "2023-05-15", count: 25 }
    ]
  }
}

export default function ChatbotDetailsPage() {
  const params = useParams()
  const { id } = params
  const { toast } = useToast()
  
  // In a real app, you would fetch the chatbot data based on the ID
  const chatbot = mockChatbot
  
  const [formData, setFormData] = useState({
    name: chatbot.name,
    description: chatbot.description,
    greeting: chatbot.greeting,
    primaryColor: chatbot.primaryColor,
    position: chatbot.position,
    showAvatar: chatbot.showAvatar,
    enableTyping: chatbot.enableTyping
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  const handleSave = () => {
    // In a real app, you would save the data to your backend
    toast({
      title: "Changes saved",
      description: "Your chatbot settings have been updated.",
    })
  }

  const embedCode = `<!-- ChatBot Builder Widget -->
<script>
  window.ChatBotConfig = {
    botId: "${id}",
    position: "${formData.position}",
    primaryColor: "${formData.primaryColor}",
    greeting: "${formData.greeting}"
  };
</script>
<script src="https://cdn.chatbotbuilder.com/widget.js" async></script>
<!-- End ChatBot Builder Widget -->`

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link href="/dashboard/chatbots">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <Badge variant={chatbot.status === "active" ? "default" : "secondary"}>
              {chatbot.status.charAt(0).toUpperCase() + chatbot.status.slice(1)}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{chatbot.name}</h1>
          <p className="text-gray-600">{chatbot.type} chatbot • Last updated: {chatbot.lastUpdated}</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/chatbots/${id}/preview`}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="mb-6">
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="embed">
            <Code className="h-4 w-4 mr-2" />
            Embed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>General settings for your chatbot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Chatbot Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows={3} 
                  />
                </div>
                <div>
                  <Label htmlFor="greeting">Greeting Message</Label>
                  <Textarea 
                    id="greeting" 
                    name="greeting" 
                    value={formData.greeting} 
                    onChange={handleInputChange} 
                    rows={3} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how your chatbot looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="primaryColor-picker" 
                      type="color" 
                      value={formData.primaryColor} 
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))} 
                      className="w-16 h-10" 
                    />
                    <Input 
                      id="primaryColor" 
                      name="primaryColor" 
                      value={formData.primaryColor} 
                      onChange={handleInputChange} 
                      className="flex-1" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <select 
                    id="position" 
                    name="position" 
                    value={formData.position} 
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showAvatar">Show Avatar</Label>
                    <p className="text-sm text-gray-600">Display bot avatar in chat</p>
                  </div>
                  <Switch 
                    id="showAvatar" 
                    checked={formData.showAvatar} 
                    onCheckedChange={(checked) => handleSwitchChange("showAvatar", checked)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableTyping">Typing Indicator</Label>
                    <p className="text-sm text-gray-600">Show typing animation before responses</p>
                  </div>
                  <Switch 
                    id="enableTyping" 
                    checked={formData.enableTyping} 
                    onCheckedChange={(checked) => handleSwitchChange("enableTyping", checked)} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                  <div>
                    <h4 className="font-semibold text-red-800">Delete this chatbot</h4>
                    <p className="text-sm text-red-600">
                      Once deleted, this chatbot and all its data will be permanently removed.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Chatbot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Documents and URLs used to train your chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button asChild>
                  <Link href="/dashboard/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Documents
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {chatbot.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{doc.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{chatbot.analytics.totalConversations}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{chatbot.analytics.averageRating}/5</div>
                <p className="text-xs text-muted-foreground">Based on user feedback</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{chatbot.analytics.responseRate}%</div>
                <p className="text-xs text-muted-foreground">Questions successfully answered</p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Conversations Over Time</CardTitle>
                <CardDescription>Daily conversation volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end space-x-2">
                  {chatbot.analytics.conversationsByDay.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t-md" 
                        style={{ height: `${(day.count / 30) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-2">{day.date.split('-')[2]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Questions</CardTitle>
                <CardDescription>Most frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {chatbot.analytics.topQuestions.map((q, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <span className="text-sm">{q.question}</span>
                      <Badge variant="secondary">{q.count}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="embed">
          <Card>
            <CardHeader>
              <CardTitle>Embed Your Chatbot</CardTitle>
              <CardDescription>Add this code to your website to display your chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea 
                  value={embedCode} 
                  readOnly 
                  className="font-mono text-sm min-h-[150px] resize-none" 
                />
                <Button 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(embedCode)
                    toast({
                      title: "Copied to clipboard",
                      description: "The embed code has been copied to your clipboard.",
                    })
                  }}
                >
                  Copy
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Installation Instructions</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add the code above to your HTML before the closing {"</body>"} tag.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">HTML Website</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mt-2">
                      <li>Open your website's HTML file</li>
                      <li>Paste the embed code before the {"</body>"} tag</li>
                      <li>Save the file and upload it to your server</li>
                    </ol>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">WordPress</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mt-2">
                      <li>Install "Insert Headers and Footers" plugin</li>
                      <li>Go to Settings → Insert Headers and Footers</li>
                      <li>Paste code in "Scripts in Footer" section</li>
                      <li>Save changes</li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/dashboard/chatbots/test">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Test Your Chatbot
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
