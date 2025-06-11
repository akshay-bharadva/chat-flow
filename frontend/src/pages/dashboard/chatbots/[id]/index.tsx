"use client"

import { ReactElement, useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Bot, ArrowLeft, Settings, FileText, Code, BarChart3, Trash2, Save, Eye, AlertCircle, Loader2, Upload, Globe, Link as LinkIcon, Palette, MessageSquare, Smartphone, Copy, Check } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const API_BASE_URL = "http://localhost:8000/api";

// Documents Tab Component
function DocumentsTab({ chatbotId }: { chatbotId: string }) {
    const { toast } = useToast();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
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

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("file", file);

        const token = localStorage.getItem("access_token");
        try {
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 15, 90));
            }, 200);
            const res = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}/documents/file`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            clearInterval(progressInterval);
            if (!res.ok) { const errorData = await res.json(); throw new Error(errorData.detail || "File upload failed."); }

            clearInterval(progressInterval);
            setUploadProgress(100);
            toast({ title: "Success", description: `${file.name} uploaded and is now processing.` });

            fetchDocuments(); // Refresh list
        } catch (error: any) {
            toast({ variant: "destructive", title: "Upload Error", description: error.message });
            setUploadProgress(0);
        } finally {
            setTimeout(() => setIsUploading(false), 1500);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
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
            form.reset();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    const handleDeleteDocument = async (docId: string) => {
        const token = localStorage.getItem("access_token");
        try {
            const res = await fetch(`${API_BASE_URL}/documents/${docId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            if (res.status !== 204) throw new Error("Failed to delete document.");

            toast({ title: "Success", description: "Document has been deleted." });
            fetchDocuments();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: "Could not delete document." });
        }
    }

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                        <TabsTrigger value="url">Add URL</TabsTrigger>
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
                                    <Button variant="outline" className="cursor-pointer">
                                        <Label htmlFor="file-upload">
                                            Choose Files
                                        </Label>
                                    </Button>
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

            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Uploaded Documents</CardTitle>
                        <CardDescription>Manage your knowledge base and monitor processing status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-40 w-full" /> : (
                            <div className="space-y-4">
                                {documents.length > 0 ? documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                {doc.source_type === 'file' ? <FileText className="h-6 w-6 text-blue-600" /> : <Globe className="h-6 w-6 text-blue-600" />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{doc.source_name}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <StatusBadge status={doc.status as any} />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                                                    </AlertDialogHeader>
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
    const [previewOpen, setPreviewOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    //   const [domain, setDomain] = useState("")


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
                placeholder: data.placeholder,
                size: data.size || "",
                enableTyping: data.enableTyping || undefined,
                responseDelay: data.responseDelay || 0,
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

    const handleSwitchChange = (name: keyof ChatbotUpdate, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSelectChange = (name: keyof ChatbotUpdate, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (name: keyof ChatbotUpdate, value: number[]) => {
        setFormData(prev => ({ ...prev, [name]: value[0] }));
    };

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

    const embedCode = `<!-- ChatBot Builder Widget -->
<script>
  window.ChatBotConfig = {
    botId: "${chatbotId}",
    domain: "your-domain.com",
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
      botId: "${chatbotId}",
      domain: "your-domain.com",
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

    if (isLoading) return <div className="p-6">
        <Skeleton className="h-[600px] w-full" />
    </div>;
    if (error) return <div className="p-6">
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    </div>;
    if (!chatbot) return <div className="p-6">Chatbot not found.</div>;

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
                    <TabsTrigger value="documents">
                        <FileText className="h-4 w-4 mr-2" />Knowledge Base</TabsTrigger>
                    <TabsTrigger value="embed">
                        <Code className="h-4 w-4 mr-2" />Embed</TabsTrigger>
                    <TabsTrigger value="analytics">
                        <BarChart3 className="h-4 w-4 mr-2" />Analytics</TabsTrigger>
                    {/* <TabsTrigger value="danger">
                    <Trash2 className="h-4 w-4 mr-2" />Danger Zone</TabsTrigger> */}
                    <TabsTrigger value="settings">
                        <Settings className="h-4 w-4 mr-2" />Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="settings">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 flex flex-col gap-8">

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Palette className="h-5 w-5 mr-2" />Visual Customization</CardTitle>
                                    <CardDescription>Customize how your chatbot looks and feels</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="name">Bot Name</Label>
                                            <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <Label htmlFor="primaryColor">Primary Color</Label>
                                            <div className="flex space-x-2">
                                                <Input type="color" value={formData.primary_color || '#000000'} onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })} className="w-16 h-10 p-1" />
                                                <Input id="primaryColor" name="primaryColor" value={formData.primary_color || ''} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="greeting">Greeting Message</Label>
                                        <Textarea id="greeting" name="greeting" value={formData.greeting || ''} onChange={handleInputChange} rows={3} />
                                    </div>
                                    <div>
                                        <Label htmlFor="placeholder">Input Placeholder</Label>
                                        <Input id="placeholder" name="placeholder" value={formData.placeholder || ''} onChange={handleInputChange} />
                                    </div>
                                    {/* <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label>Position</Label>
                                            <Select value={formData.position} onValueChange={(v) => handleSelectChange("position", v)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Size</Label>
                                            <Select value={formData.size || ""} onValueChange={(v) => handleSelectChange("size", v)}>
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
                                    </div> */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <p className="font-medium">Show Avatar</p>
                                        <Switch id="showAvatar" name="showAvatar" checked={formData.show_avatar} onCheckedChange={(c) => handleSwitchChange("show_avatar", c)} />

                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <MessageSquare className="h-5 w-5 mr-2" />Chat Behavior</CardTitle>
                                    <CardDescription>Configure how your chatbot interacts</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Typing Indicator</p>
                                        <Switch id="enableTyping" name="enableTyping" checked={formData.enableTyping} onCheckedChange={(c) => handleSwitchChange("enableTyping", c)} />

                                    </div>
                                    <div>
                                        <Label>Response Delay (ms)</Label>
                                        <Slider value={[formData.responseDelay || 500]} onValueChange={(v) => handleSliderChange("responseDelay", v)} max={3000} step={100} />
                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                            <span>0ms</span>
                                            <span>{formData.responseDelay}ms</span>
                                            <span>3000ms</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
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
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle>Live Preview</CardTitle>
                                    <CardDescription>See how your chatbot will appear</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-gray-100 rounded-lg p-4 min-h-[500px] relative overflow-hidden">
                                        <div className="text-center text-gray-500 text-sm mb-4">Your Website Content</div>
                                        <div
                                            className={`absolute ${formData.position === "bottom-right"
                                                ? "bottom-4 right-4"
                                                : formData.position === "bottom-left"
                                                    ? "bottom-4 left-4"
                                                    : formData.position === "top-right"
                                                        ? "top-4 right-4"
                                                        : "top-4 left-4"
                                                }`}
                                        >
                                            {/* Chat Button */}
                                            <div
                                                className={`rounded-full shadow-lg cursor-pointer ${formData.size === "small" ? "w-12 h-12" : formData.size === "medium" ? "w-16 h-16" : "w-20 h-20"
                                                    }`}
                                                style={{ backgroundColor: formData.primary_color }}
                                            >
                                                <Button
                                                    className="rounded-full shadow-lg"
                                                    style={{ backgroundColor: formData.primary_color, width: formData.size === 'small' ? '48px' : formData.size === 'large' ? '80px' : '64px', height: formData.size === 'small' ? '48px' : formData.size === 'large' ? '80px' : '64px' }}
                                                    onClick={() => setPreviewOpen(!previewOpen)}
                                                >
                                                    <MessageSquare
                                                        className="text-white"
                                                        size={formData.size === 'small' ? 20 : formData.size === 'large' ? 40 : 28}
                                                    />
                                                </Button>
                                            </div>
                                            {/* Chat Window (when open) */}
                                            {previewOpen && (
                                                <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border">
                                                    <div className="p-4 rounded-t-lg text-white" style={{ backgroundColor: formData.primary_color }}>
                                                        <h3 className="font-semibold">{formData.name}</h3>
                                                    </div>
                                                    <div className="p-4 flex-1">
                                                        <div className="flex items-start space-x-2 mb-4">
                                                            {formData.show_avatar && (
                                                                <div
                                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                                                                    style={{ backgroundColor: formData.primary_color }}
                                                                >
                                                                    <Bot className="w-4 h-4" />
                                                                </div>
                                                            )}
                                                            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                                                                <p className="text-sm">{formData.greeting}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 border-t">
                                                        <Input placeholder={formData.placeholder} className="w-full" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="documents">
                    <DocumentsTab chatbotId={chatbotId as string} />
                </TabsContent>

                <TabsContent value="embed">
                    <Card>
                        <CardHeader>
                            <CardTitle>Deploy Your Chatbot</CardTitle>
                            <CardDescription>Copy the embed code and add it to your website</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* <CodeBlock code={embedCode} /> */}
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
                                                // value={domain}
                                                // onChange={(e) => setDomain(e.target.value)}
                                                />
                                                <p className="text-xs text-gray-600 mt-1">Optional: Restrict chatbot to specific domain</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Bot Information</Label>
                                                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-600">Bot ID:</span>
                                                        <Badge variant="secondary">{chatbotId}</Badge>
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
                        </CardContent>
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