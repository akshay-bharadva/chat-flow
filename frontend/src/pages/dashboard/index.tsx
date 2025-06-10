import type { ReactElement } from 'react'
import { useState, useEffect } from "react"
import { useRouter } from "next/router" // <-- Import useRouter
import Link from 'next/link'
import { DashboardLayout } from '@/pages/dashboard/layout'
import type { NextPageWithLayout } from '../_app'

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from '@/components/ui/button'
import { Bot, MessageSquare, Plus, Smile } from 'lucide-react'

// Types
import { Chatbot } from '@/types/chatbot'
interface DashboardStats {
  totalChatbots: number
  totalConversations: number
  satisfactionRate: number
}

const API_BASE_URL = "http://localhost:8000/api";

const DashboardPage: NextPageWithLayout = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // <-- Initialize router for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authentication token found.");

        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch both stats and chatbots in parallel for better performance
        const [statsResponse, chatbotsResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/dashboard/stats`, { headers }),
            fetch(`${API_BASE_URL}/dashboard/chatbots`, { headers })
        ]);

        if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
        if (!chatbotsResponse.ok) throw new Error('Failed to fetch chatbots');

        const statsData = await statsResponse.json();
        const chatbotsData = await chatbotsResponse.json();

        setStats(statsData);
        setChatbots(chatbotsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderStats = () => {
      if (isLoading || !stats) {
          return [...Array(3)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
      }
      return (
          <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Chatbots</CardTitle>
                    <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalChatbots}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                    <Smile className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.satisfactionRate}%</div>
                </CardContent>
            </Card>
          </>
      )
  }

  // ... (renderContent function remains largely the same, but we make the row clickable) ...
  const renderChatbotTable = () => {
    // ... (isLoading, error, and chatbots.length === 0 checks are the same)
    if (isLoading) { /* ... */ }
    if (error) { /* ... */ }
    if (chatbots.length === 0) { /* ... */ }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatbots.map((bot) => (
            <TableRow 
              key={bot.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/dashboard/chatbots/${bot.id}`)}
            >
              <TableCell className="font-medium">{bot.name}</TableCell>
              <TableCell><StatusBadge status={bot.status} /></TableCell>
              <TableCell>{bot.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Manage</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">An overview of your chatbots.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/chatbots/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Chatbot
            </Link>
        </Button>
      </div>
      
      {/* Stats Cards Section */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {renderStats()}
      </div>

      {/* Chatbots Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Chatbots</CardTitle>
          <CardDescription>Click on a chatbot to view details and manage settings.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChatbotTable()}
        </CardContent>
      </Card>
    </div>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardPage;