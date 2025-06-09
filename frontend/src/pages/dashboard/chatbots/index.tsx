"use client"

import { useState } from "react"
import Link from "next/link"
import { Bot, Plus, Search, Filter, MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Chatbot {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "archived"
  type: string
  conversations: number
  accuracy: number
  lastUpdated: string
}

const mockChatbots: Chatbot[] = [
  {
    id: "bot-1",
    name: "Customer Support Bot",
    description: "E-commerce support chatbot",
    status: "active",
    type: "Support",
    conversations: 234,
    accuracy: 89,
    lastUpdated: "2023-05-15",
  },
  {
    id: "bot-2",
    name: "Product FAQ Bot",
    description: "Product information assistant",
    status: "active",
    type: "FAQ",
    conversations: 156,
    accuracy: 92,
    lastUpdated: "2023-05-10",
  },
  {
    id: "bot-3",
    name: "Documentation Helper",
    description: "Technical documentation bot",
    status: "draft",
    type: "Documentation",
    conversations: 0,
    accuracy: 0,
    lastUpdated: "2023-05-05",
  },
  {
    id: "bot-4",
    name: "Sales Assistant",
    description: "Helps with product recommendations",
    status: "active",
    type: "Sales",
    conversations: 87,
    accuracy: 85,
    lastUpdated: "2023-04-28",
  },
  {
    id: "bot-5",
    name: "HR Onboarding Bot",
    description: "Helps new employees with onboarding",
    status: "archived",
    type: "HR",
    conversations: 45,
    accuracy: 78,
    lastUpdated: "2023-03-15",
  },
]

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>(mockChatbots)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredChatbots = chatbots.filter((bot) => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         bot.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || bot.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "draft":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Chatbots</h1>
          <p className="text-gray-600">Manage and monitor your chatbots</p>
        </div>
        <Button className="mt-4 sm:mt-0" asChild>
          <Link href="/dashboard/chatbots/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Chatbot
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search chatbots..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredChatbots.length > 0 ? (
        <div className="grid gap-6">
          {filteredChatbots.map((bot) => (
            <Card key={bot.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center p-6 md:border-r md:w-64">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Bot className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{bot.name}</h3>
                    <Badge variant={getStatusBadgeVariant(bot.status)} className="mt-1">
                      {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <p className="text-gray-600 mb-2">{bot.description}</p>
                      <p className="text-sm text-gray-500">Type: {bot.type}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <div className="text-right mb-2">
                        {bot.status === "active" && (
                          <>
                            <p className="text-sm font-medium">{bot.accuracy}% accuracy</p>
                            <p className="text-xs text-gray-600">{bot.conversations} conversations</p>
                          </>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Last updated: {bot.lastUpdated}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/chatbots/${bot.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Bot className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No chatbots found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || statusFilter !== "all"
              ? "No chatbots match your search criteria"
              : "You haven't created any chatbots yet"}
          </p>
          <Button asChild>
            <Link href="/dashboard/chatbots/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Chatbot
            </Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
