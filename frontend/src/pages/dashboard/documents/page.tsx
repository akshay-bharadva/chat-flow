"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, LinkIcon, FileText, Globe, Trash2, Eye, Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DocumentsPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [documents, setDocuments] = useState([
    { id: 1, name: "Product Manual.pdf", type: "PDF", size: "2.4 MB", status: "Processed", accuracy: "94%" },
    { id: 2, name: "FAQ Document.docx", type: "Word", size: "1.2 MB", status: "Processed", accuracy: "89%" },
    { id: 3, name: "Company Website", type: "URL", size: "15 pages", status: "Processing", accuracy: "-" },
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            // Add new document to list
            const newDoc = {
              id: documents.length + 1,
              name: files[0].name,
              type: files[0].type.includes("pdf") ? "PDF" : "Document",
              size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
              status: "Processing",
              accuracy: "-",
            }
            setDocuments((prev) => [...prev, newDoc])
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const handleUrlSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const url = formData.get("url") as string

    if (url) {
      const newDoc = {
        id: documents.length + 1,
        name: new URL(url).hostname,
        type: "URL",
        size: "Analyzing...",
        status: "Processing",
        accuracy: "-",
      }
      setDocuments((prev) => [...prev, newDoc])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Document Manager</span>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard/configure">Next: Configure Bot</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
          <p className="text-gray-600">Upload documents or add website URLs to train your chatbot</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload Files</TabsTrigger>
                <TabsTrigger value="url">Add URLs</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Documents
                    </CardTitle>
                    <CardDescription>Support for PDF, Word, Text files up to 10MB each</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Choose Files
                        </Button>
                      </Label>
                    </div>

                    {isUploading && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LinkIcon className="h-5 w-5 mr-2" />
                      Add Website URLs
                    </CardTitle>
                    <CardDescription>We'll crawl and extract content from your websites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUrlSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="url">Website URL</Label>
                        <Input id="url" name="url" type="url" placeholder="https://example.com" required />
                      </div>
                      <div>
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Brief description of the content..."
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Globe className="h-4 w-4 mr-2" />
                        Add Website
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>Manage your knowledge base and monitor processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          {doc.type === "URL" ? (
                            <Globe className="h-6 w-6 text-blue-600" />
                          ) : (
                            <FileText className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-gray-600">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant={doc.status === "Processed" ? "default" : "secondary"}>{doc.status}</Badge>
                          {doc.accuracy !== "-" && (
                            <p className="text-xs text-gray-600 mt-1">{doc.accuracy} accuracy</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {documents.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
                    <p className="text-gray-600">Upload your first document to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
