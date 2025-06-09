"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Code, Globe, Smartphone, ArrowLeft, Bot, ExternalLink, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function EmbedPage() {
  const [copied, setCopied] = useState(false)
  const [domain, setDomain] = useState("")

  const botId = "cb_12345"
  const embedCode = `<!-- ChatBot Builder Widget -->
<script>
  window.ChatBotConfig = {
    botId: "${botId}",
    domain: "${domain || "your-domain.com"}",
    position: "bottom-right",
    primaryColor: "#3B82F6",
    greeting: "Hello! How can I help you today?"
  };
</script>
<script src="https://cdn.chatbotbuilder.com/widget.js" async></script>
<!-- End ChatBot Builder Widget -->`

  const reactCode = `import { useEffect } from 'react';

export default function MyComponent() {
  useEffect(() => {
    // Load ChatBot Builder widget
    window.ChatBotConfig = {
      botId: "${botId}",
      domain: "${domain || "your-domain.com"}",
      position: "bottom-right",
      primaryColor: "#3B82F6",
      greeting: "Hello! How can I help you today?"
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.chatbotbuilder.com/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/configure">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Configure
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Embed Code</span>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard">
              <ExternalLink className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deploy Your Chatbot</h1>
          <p className="text-gray-600">Copy the embed code and add it to your website</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Settings</CardTitle>
                <CardDescription>Configure your chatbot deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="domain">Your Domain</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <p className="text-xs text-gray-600 mt-1">Optional: Restrict chatbot to specific domain</p>
                </div>

                <div className="space-y-2">
                  <Label>Bot Information</Label>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bot ID:</span>
                      <Badge variant="secondary">{botId}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Documents:</span>
                      <span className="text-sm">3 processed</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Quick Test</h3>
                  <p className="text-sm text-gray-600 mb-3">Test your chatbot before deploying</p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Test Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Embed Code */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="wordpress">WordPress</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      HTML Embed Code
                    </CardTitle>
                    <CardDescription>Add this code to your HTML before the closing {"</body>"} tag</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Textarea value={embedCode} readOnly className="font-mono text-sm min-h-[200px] resize-none" />
                      <Button size="sm" className="absolute top-2 right-2" onClick={() => copyToClipboard(embedCode)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="react" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      React Component
                    </CardTitle>
                    <CardDescription>Use this code in your React application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Textarea value={reactCode} readOnly className="font-mono text-sm min-h-[300px] resize-none" />
                      <Button size="sm" className="absolute top-2 right-2" onClick={() => copyToClipboard(reactCode)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wordpress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      WordPress Installation
                    </CardTitle>
                    <CardDescription>Steps to add the chatbot to your WordPress site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold">Method 1: Theme Editor</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mt-2">
                          <li>Go to Appearance → Theme Editor</li>
                          <li>Select footer.php</li>
                          <li>Paste the embed code before {"</body>"}</li>
                          <li>Click Update File</li>
                        </ol>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-semibold">Method 2: Plugin</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mt-2">
                          <li>Install "Insert Headers and Footers" plugin</li>
                          <li>Go to Settings → Insert Headers and Footers</li>
                          <li>Paste code in "Scripts in Footer" section</li>
                          <li>Save changes</li>
                        </ol>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <Textarea value={embedCode} readOnly className="font-mono text-sm min-h-[150px] resize-none" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Installation Guide */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Installation Guide</CardTitle>
                <CardDescription>Step-by-step instructions for different platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Website Platforms</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>HTML/CSS websites</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>WordPress</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Shopify</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Squarespace</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold">Frameworks</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>React</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Vue.js</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Angular</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Next.js</span>
                      </li>
                    </ul>
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
