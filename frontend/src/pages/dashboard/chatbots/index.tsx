"use client"

import { ReactElement, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Bot, Plus, Search, Filter, MoreHorizontal, Trash2, Edit, Eye, AlertCircle } from 'lucide-react'
import { useRouter } from "next/router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { DashboardLayout } from '@/pages/dashboard/layout'
import { StatusBadge } from "@/components/ui/status-badge"
import { Chatbot } from '@/types/chatbot'
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const API_BASE_URL = "http://localhost:8000/api";

function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const router = useRouter()

  const fetchChatbots = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Authentication token not found. Please sign in.");
      
      const response = await fetch(`${API_BASE_URL}/chatbots`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch chatbots.");
      }

      const data: Chatbot[] = await response.json();
      setChatbots(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChatbots();
  }, [fetchChatbots]);

  const filteredChatbots = chatbots.filter((bot) => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (bot.description && bot.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || bot.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      )
    }

    if (error) {
       return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading chatbots</AlertTitle>
            <AlertDescription>
                {error}
                <Button variant="link" onClick={fetchChatbots} className="p-0 h-auto ml-2">
                  Try again
                </Button>
            </AlertDescription>
        </Alert>
      );
    }
    
    if (chatbots.length === 0) {
        return (
          <Card className="p-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No chatbots created yet</h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first chatbot to manage your customer interactions.
            </p>
            <Button asChild>
              <Link href="/dashboard/chatbots/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Chatbot
              </Link>
            </Button>
          </Card>
        )
    }

    if (filteredChatbots.length === 0) {
      return (
          <Card className="p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Bot className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No chatbots found</h3>
          <p className="text-gray-500 mb-6">
            No chatbots match your search criteria. Try a different search or filter.
          </p>
        </Card>
      )
    }

    return (
      <div className="grid gap-6">
        {filteredChatbots.map((bot) => (
          <Card key={bot.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center p-6 md:border-r md:w-64">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg hover:text-blue-600">
                    <Link href={`/dashboard/chatbots/${bot.id}`}>{bot.name}</Link>
                  </h3>
                  <StatusBadge status={bot.status as any} className="mt-1" />
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <p className="text-gray-600 mb-2">{bot.description}</p>
                    <p className="text-sm text-gray-500">Conversations: {bot.conversations}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                    <div className="text-left md:text-right mb-2">
                      <p className="text-sm font-medium">{bot.accuracy}% accuracy</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated: {new Date(bot.lastUpdated).toLocaleDateString()}
                      </p>
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
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                           <DropdownMenuItem onSelect={() => router.push(`/dashboard/chatbots/${bot.id}`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                           </DropdownMenuItem>
                          <DropdownMenuItem>
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
    )
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
                <SelectTrigger className="w-full md:w-[180px]">
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
      
      {renderContent()}
    </div>
  )
}

ChatbotsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ChatbotsPage;