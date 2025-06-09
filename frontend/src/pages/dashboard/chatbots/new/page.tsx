"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Bot, FileText, Settings, Code } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NewChatbotPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "support",
    greeting: "Hello! How can I help you today?"
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Validate form
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a name for your chatbot.",
      })
      setIsLoading(false)
      return
    }
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      toast({
        title: "Chatbot created",
        description: "Your new chatbot has been created successfully.",
      })
      setIsLoading(false)
      router.push("/dashboard/documents")
    }, 1000)
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/dashboard/chatbots">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Chatbot</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the details for your new chatbot</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Chatbot Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="e.g., Customer Support Bot" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe what your chatbot will help with..." 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={3} 
                />
              </div>
              
              <div>
                <Label htmlFor="type">Chatbot Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </Select
