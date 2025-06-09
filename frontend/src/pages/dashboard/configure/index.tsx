"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Bot, ArrowLeft, Eye, Palette, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"

export default function ConfigurePage() {
  const [config, setConfig] = useState({
    name: "Customer Support Bot",
    greeting: "Hello! How can I help you today?",
    placeholder: "Type your message...",
    primaryColor: "#3B82F6",
    position: "bottom-right",
    size: "medium",
    showAvatar: true,
    enableTyping: true,
    responseDelay: [1000],
    maxTokens: [150],
    temperature: [0.7],
  })

  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/documents">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Documents
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Configure Chatbot</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setPreviewOpen(!previewOpen)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button asChild>
              <Link href="/dashboard/embed">Next: Get Embed Code</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customize Your Chatbot</h1>
          <p className="text-gray-600">Configure appearance, behavior, and responses</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Visual Customization
                    </CardTitle>
                    <CardDescription>Customize how your chatbot looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="bot-name">Bot Name</Label>
                        <Input
                          id="bot-name"
                          value={config.name}
                          onChange={(e) => setConfig({ ...config, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="primary-color"
                            type="color"
                            value={config.primaryColor}
                            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                            className="w-16 h-10"
                          />
                          <Input
                            value={config.primaryColor}
                            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="greeting">Greeting Message</Label>
                      <Textarea
                        id="greeting"
                        value={config.greeting}
                        onChange={(e) => setConfig({ ...config, greeting: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="placeholder">Input Placeholder</Label>
                      <Input
                        id="placeholder"
                        value={config.placeholder}
                        onChange={(e) => setConfig({ ...config, placeholder: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Position</Label>
                        <Select
                          value={config.position}
                          onValueChange={(value) => setConfig({ ...config, position: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="top-left">Top Left</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Size</Label>
                        <Select value={config.size} onValueChange={(value) => setConfig({ ...config, size: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-avatar">Show Avatar</Label>
                        <p className="text-sm text-gray-600">Display bot avatar in chat</p>
                      </div>
                      <Switch
                        id="show-avatar"
                        checked={config.showAvatar}
                        onCheckedChange={(checked) => setConfig({ ...config, showAvatar: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="behavior" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Chat Behavior
                    </CardTitle>
                    <CardDescription>Configure how your chatbot interacts with users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-typing">Typing Indicator</Label>
                        <p className="text-sm text-gray-600">Show typing animation before responses</p>
                      </div>
                      <Switch
                        id="enable-typing"
                        checked={config.enableTyping}
                        onCheckedChange={(checked) => setConfig({ ...config, enableTyping: checked })}
                      />
                    </div>

                    <div>
                      <Label>Response Delay (ms)</Label>
                      <div className="mt-2">
                        <Slider
                          value={config.responseDelay}
                          onValueChange={(value) => setConfig({ ...config, responseDelay: value })}
                          max={3000}
                          min={0}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>0ms</span>
                          <span>{config.responseDelay[0]}ms</span>
                          <span>3000ms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      AI Configuration
                    </CardTitle>
                    <CardDescription>Fine-tune AI response parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Max Response Length</Label>
                      <div className="mt-2">
                        <Slider
                          value={config.maxTokens}
                          onValueChange={(value) => setConfig({ ...config, maxTokens: value })}
                          max={500}
                          min={50}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>50 tokens</span>
                          <span>{config.maxTokens[0]} tokens</span>
                          <span>500 tokens</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Response Creativity</Label>
                      <div className="mt-2">
                        <Slider
                          value={config.temperature}
                          onValueChange={(value) => setConfig({ ...config, temperature: value })}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Conservative</span>
                          <span>{config.temperature[0]}</span>
                          <span>Creative</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your chatbot will appear to users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4 min-h-[400px] relative">
                  {/* Mock website background */}
                  <div className="text-center text-gray-500 text-sm mb-4">Your Website Content</div>

                  {/* Chatbot Widget */}
                  <div
                    className={`absolute ${
                      config.position === "bottom-right"
                        ? "bottom-4 right-4"
                        : config.position === "bottom-left"
                          ? "bottom-4 left-4"
                          : config.position === "top-right"
                            ? "top-4 right-4"
                            : "top-4 left-4"
                    }`}
                  >
                    {/* Chat Button */}
                    <div
                      className={`rounded-full shadow-lg cursor-pointer ${
                        config.size === "small" ? "w-12 h-12" : config.size === "medium" ? "w-16 h-16" : "w-20 h-20"
                      }`}
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <div className="flex items-center justify-center h-full">
                        <MessageSquare className="text-white w-6 h-6" />
                      </div>
                    </div>

                    {/* Chat Window (when open) */}
                    {previewOpen && (
                      <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border">
                        <div className="p-4 rounded-t-lg text-white" style={{ backgroundColor: config.primaryColor }}>
                          <h3 className="font-semibold">{config.name}</h3>
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex items-start space-x-2 mb-4">
                            {config.showAvatar && (
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                                style={{ backgroundColor: config.primaryColor }}
                              >
                                <Bot className="w-4 h-4" />
                              </div>
                            )}
                            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                              <p className="text-sm">{config.greeting}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t">
                          <Input placeholder={config.placeholder} className="w-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
