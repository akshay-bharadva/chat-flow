"use client"

import { ReactElement, useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Bot, ArrowLeft, Settings, FileText, Code, BarChart3, Trash2, Save, Eye, AlertCircle, Loader2, Upload, Globe, Link as LinkIcon } from 'lucide-react'

import { DashboardLayout } from '@/pages/dashboard/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CodeBlock } from "@/components/ui/code-block"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Chatbot, ChatbotUpdate } from '@/types/chatbot'
import { Document } from '@/types/document'
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/ui/status-badge"

const API_BASE_URL = "http://localhost:8000/api";

// Documents Tab Component
function DocumentsTab({ chatbotId }: { chatbotId: string }) {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}/documents`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch documents.");
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not fetch documents." });
    } finally {
      setIsLoading(false);
    }
  }, [chatbotId, toast]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}/documents/file`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      // Simulate progress for demo
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => (prev !== null ? Math.min(prev + 20, 90) : 0));
      }, 100);

      if (!res.ok) throw new Error("File upload failed.");

      clearInterval(progressInterval);
      setUploadProgress(100);
      toast({ title: "Success", description: "File uploaded and is now processing." });
      fetchDocuments(); // Refresh list
    } catch (error: any) {
      toast({ variant: "destructive", title: "Upload Error", description: error.message });
    } finally {
      setTimeout(() => setUploadProgress(null), 1000);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}/documents/url`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add URL.");
      toast({ title: "Success", description: "URL added and is now being scraped." });
      fetchDocuments();
      e.currentTarget.reset();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    const token = localStorage.getItem("access_token");
    try {
      await fetch(`${API_BASE_URL}/documents/${docId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      toast({ title: "Success", description: "Document has been deleted." });
      fetchDocuments();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: "Could not delete document." });
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Upload className="h-5 w-5 mr-2" />Upload File</CardTitle></CardHeader>
          <CardContent>
            <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="mb-2" />
            {uploadProgress !== null && <Progress value={uploadProgress} className="h-2" />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center"><LinkIcon className="h-5 w-5 mr-2" />Add URL</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleUrlSubmit} className="space-y-2">
              <Input name="url" placeholder="https://example.com/about" required />
              <Button type="submit" className="w-full">Scrape URL</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardHeader><CardTitle>Knowledge Base Sources</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-40 w-full" /> : (
              <div className="space-y-4">
                {documents.length > 0 ? documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {doc.source_type === 'file' ? <FileText className="h-5 w-5 text-muted-foreground" /> : <Globe className="h-5 w-5 text-muted-foreground" />}
                      <p className="font-medium truncate" title={doc.source_name}>{doc.source_name}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status={doc.status as any} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Delete Document?</AlertDialogTitle></AlertDialogHeader>
                          <AlertDialogDescription>This will remove "{doc.source_name}" from your chatbot's knowledge base. This action cannot be undone.</AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteDocument(doc.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )) : <p className="text-center text-muted-foreground py-8">No documents added yet.</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


// Main Page Component
function ChatbotDetailsPage() {
  const router = useRouter()
  const { id: chatbotId } = router.query
  const { toast } = useToast()

  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [formData, setFormData] = useState<Partial<ChatbotUpdate>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchChatbot = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("access_token")
      if (!token) throw new Error("Authentication token not found.")

      const response = await fetch(`${API_BASE_URL}/chatbots/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch chatbot details.")
      }

      const data: Chatbot = await response.json()
      setChatbot(data)
      setFormData({
        name: data.name,
        description: data.description || "",
        greeting: data.greeting || "",
        primary_color: data.primaryColor || "",
        position: data.position || "",
        show_avatar: data.showAvatar || undefined,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (typeof chatbotId === 'string') {
      fetchChatbot(chatbotId)
    }
  }, [chatbotId, fetchChatbot])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    // For Pydantic model, field name should be showAvatar
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem("access_token")
      if (!token || !chatbotId) throw new Error("Missing credentials or chatbot ID.")

      const response = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to save changes.");
      }

      const updatedChatbot = await response.json();
      setChatbot(updatedChatbot);

      toast({
        title: "Changes saved",
        description: "Your chatbot settings have been updated.",
      })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Save failed", description: error.message })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token || !chatbotId) throw new Error("Missing credentials or chatbot ID.")

      const response = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status !== 204) throw new Error("Failed to delete chatbot.");

      toast({ title: "Chatbot deleted", description: "The chatbot has been permanently removed." });
      router.push("/dashboard/chatbots");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Delete failed", description: error.message });
    }
  }

  const embedCode = `<!-- Chatbot Widget -->
<script>
   window.ChatBotConfig = {
    botId: "${chatbotId}",
  };
</script>
<script src="https://your-cdn.com/widget.js" async></script>
<!-- End Chatbot Widget -->`;

  if (isLoading) return <Skeleton className="h-[600px] w-full" />;
  if (error) return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
  if (!chatbot) return <div>Chatbot not found.</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{chatbot.name}</h1>
          <p className="text-gray-600">Last updated: {new Date(chatbot.lastUpdated).toLocaleString()}</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" asChild>
            <Link href={`/demo?botId=${chatbot.id}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="documents">
        <TabsList className="mb-6 grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="documents"><FileText className="h-4 w-4 mr-2" />Knowledge Base</TabsTrigger>
          <TabsTrigger value="embed"><Code className="h-4 w-4 mr-2" />Embed</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart3 className="h-4 w-4 mr-2" />Analytics</TabsTrigger>
          {/* <TabsTrigger value="danger"><Trash2 className="h-4 w-4 mr-2" />Danger Zone</TabsTrigger> */}
          <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-2" />Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Chatbot Name</Label>
                  <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="greeting">Greeting Message</Label>
                  <Textarea id="greeting" name="greeting" value={formData.greeting || ''} onChange={handleInputChange} rows={3} />
                </div>
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input id="primaryColor" name="primaryColor" value={formData.primary_color || ''} onChange={handleInputChange} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showAvatar">Show Avatar in chat</Label>
                  <Switch id="showAvatar" name="showAvatar" checked={formData.show_avatar} onCheckedChange={(checked) => handleSwitchChange("showAvatar", checked)} />
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
                    <p className="text-sm text-red-600">Once deleted, this chatbot and all its data will be permanently removed.</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Chatbot
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your chatbot and remove all associated data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                          Yes, delete chatbot
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab chatbotId={chatbotId as string} />
        </TabsContent>

        <TabsContent value="embed">
          <Card>
            <CardHeader><CardTitle>Embed Your Chatbot</CardTitle></CardHeader>
            <CardContent><CodeBlock code={embedCode} /></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Insights into your chatbot's performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Analytics are being gathered</h3>
                <p className="mt-1 text-sm text-gray-500">Check back later for performance data.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

ChatbotDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ChatbotDetailsPage;