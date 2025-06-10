import type { ReactElement } from 'react'
import { useState, useEffect, useCallback } from "react" // <-- Import useCallback
import { useRouter } from "next/router"
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
import { Bot, MessageSquare, Plus, Smile, AlertCircle } from 'lucide-react' // <-- Import AlertCircle

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
  const router = useRouter();

  // useCallback memoizes the fetchData function, preventing unnecessary re-creations
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No authentication token found. Please sign in again.");

      const headers = { 'Authorization': `Bearer ${token}` };

      const [statsResponse, chatbotsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/dashboard/stats`, { headers }),
        fetch(`${API_BASE_URL}/chatbots`, { headers })
      ]);

      if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
      if (!chatbotsResponse.ok) throw new Error('Failed to fetch chatbots');

      const statsData = await statsResponse.json();
      // Assuming chatbots API returns { chatbots: [...] }
      const chatbotsData = await chatbotsResponse.json(); 

      setStats(statsData);
      setChatbots(chatbotsData || []); // Ensure it's an array
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function is created only once

  useEffect(() => {
    fetchData();
  }, [fetchData]); // useEffect will now run once when the component mounts

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

  const renderChatbotTable = () => {
    // 1. Loading State
    if (isLoading) {
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
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-[80px] ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    // 2. Error State
    if (error) {
      return (
        <Alert variant="destructive" className="my-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Failed to load data</AlertTitle>
            <AlertDescription>
                {error}
                <Button variant="link" onClick={fetchData} className="p-0 h-auto ml-2">Try again</Button>
            </AlertDescription>
        </Alert>
      );
    }

    // 3. Empty State (No Chatbots)
    if (chatbots.length === 0) {
      return (
        <div className="text-center py-16">
          <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Chatbots Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by creating your first AI chatbot.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/chatbots/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Chatbot
            </Link>
          </Button>
        </div>
      );
    }

    // 4. Success State (Data is available)
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
              <TableCell>{new Date(bot.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when clicking button
                    router.push(`/dashboard/chatbots/${bot.id}`);
                  }}
                  variant="outline" size="sm">Manage</Button>
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