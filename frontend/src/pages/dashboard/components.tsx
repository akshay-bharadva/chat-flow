import type { ReactElement } from "react"
import { useState } from "react"
import { DashboardLayout } from "@/pages/dashboard/layout"
import { toast as sonnerToast } from "sonner"
import {
    Activity,
    AlertCircle,
    Archive,
    ArrowRight,
    ArrowUpRight,
    Bookmark,
    Bot,
    Calendar as CalendarIcon,
    ChevronDown,
    ChevronRight,
    ChevronsUpDown,
    Circle,
    Clipboard,
    Code,
    CreditCard,
    Download,
    Edit,
    File,
    Filter,
    Globe,
    HelpCircle,
    Home,
    Image as ImageIcon,
    Inbox,
    Info,
    Laptop,
    LifeBuoy,
    Link,
    Loader2,
    LogIn,
    LogOut,
    Mail,
    Menu,
    MessageSquare,
    Moon,
    MoreHorizontal,
    Plus,
    PlusCircle,
    Rocket,
    Search,
    Send,
    Settings,
    Share2,
    Shield,
    Star,
    Sun,
    Terminal,
    Trash,
    User,
    Users,
    X,
    Zap,
} from "lucide-react"

// All UI Component Imports
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import { CodeBlock } from "@/components/ui/code-block"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { StatusBadge } from "@/components/ui/status-badge"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
    Toast,
    ToastAction,
    ToastDescription,
    ToastTitle,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import {
    Toggle,
} from "@/components/ui/toggle"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


// Helper component to structure the documentation page
const ComponentSection = ({ title, description, children, id }: { title: string, description: string, children: React.ReactNode, id: string }) => (
    <section id={id} className="space-y-8 py-8 scroll-m-20">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </section>
)

const navLinks = [
    { id: "accordion", name: "Accordion" },
    { id: "alert", name: "Alert" },
    { id: "alert-dialog", name: "Alert Dialog" },
    { id: "aspect-ratio", name: "Aspect Ratio" },
    { id: "avatar", name: "Avatar" },
    { id: "badge", name: "Badge" },
    { id: "breadcrumb", name: "Breadcrumb" },
    { id: "button", name: "Button" },
    { id: "calendar", name: "Calendar" },
    { id: "card", name: "Card" },
    { id: "carousel", name: "Carousel" },
    { id: "chart", name: "Chart" },
    { id: "checkbox", name: "Checkbox" },
    { id: "collapsible", name: "Collapsible" },
    { id: "command", name: "Command" },
    { id: "context-menu", name: "Context Menu" },
    { id: "dialog", name: "Dialog" },
    { id: "drawer", name: "Drawer" },
    { id: "dropdown-menu", name: "Dropdown Menu" },
    { id: "form", name: "Form" },
    { id: "hover-card", name: "Hover Card" },
    { id: "input", name: "Input" },
    { id: "input-otp", name: "Input OTP" },
    { id: "label", name: "Label" },
    { id: "menubar", name: "Menubar" },
    { id: "navigation-menu", name: "Navigation Menu" },
    { id: "pagination", name: "Pagination" },
    { id: "popover", name: "Popover" },
    { id: "progress", name: "Progress" },
    { id: "radio-group", name: "Radio Group" },
    { id: "resizable", name: "Resizable" },
    { id: "scroll-area", name: "Scroll Area" },
    { id: "select", name: "Select" },
    { id: "separator", name: "Separator" },
    { id: "sheet", name: "Sheet" },
    { id: "skeleton", name: "Skeleton" },
    { id: "slider", name: "Slider" },
    { id: "sonner", name: "Sonner (Toast)" },
    { id: "status-badge", name: "Status Badge" },
    { id: "switch", name: "Switch" },
    { id: "table", name: "Table" },
    { id: "tabs", name: "Tabs" },
    { id: "textarea", name: "Textarea" },
    { id: "toast", name: "Toast (Legacy)" },
    { id: "toggle", name: "Toggle" },
    { id: "toggle-group", name: "Toggle Group" },
    { id: "tooltip", name: "Tooltip" },
]

function ComponentsDocumentationPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [progress, setProgress] = useState(13)
    const { toast } = useToast()

    const FormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { username: "" },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        sonnerToast.success(`Form submitted!`, {
            description: `Username: ${data.username}`,
        })
    }

    // Sample data for Table
    const invoices = [
        { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
        { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
        { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
    ]

    // Sample data for Chart
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]
    const chartConfig = {
        desktop: { label: "Desktop", color: "hsl(var(--primary))" },
        mobile: { label: "Mobile", color: "hsl(var(--secondary))" },
    }

    return (
        <div className="grid md:grid-cols-[220px_1fr] gap-10">
            <aside className="hidden md:block sticky top-20 h-[calc(100vh-5rem)]">
                <ScrollArea className="h-full pr-6">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </ScrollArea>
            </aside>
            <main>

                <ComponentSection id="accordion" title="Accordion" description="A vertically stacked set of interactive headings that each reveal a section of content.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                                    <AccordionContent>Yes. It comes with default styles that matches the other components' aesthetic.</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                                    <AccordionContent>Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <CodeBlock code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  {/* ... more items */}
</Accordion>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="alert" title="Alert" description="Displays a callout for user attention.">
                    <Card>
                        <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <Alert>
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle>Heads up!</AlertTitle>
                                    <AlertDescription>You can add components to your app using the cli.</AlertDescription>
                                </Alert>
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
                                </Alert>
                            </div>
                            <CodeBlock code={`<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
</Alert>
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="alert-dialog" title="Alert Dialog" description="A modal dialog that interrupts the user with important content and expects a response.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">Show Dialog</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <CodeBlock code={`<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="outline">Show Dialog</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="aspect-ratio" title="Aspect Ratio" description="Displays content within a desired ratio.">
                    <Card>
                        <CardHeader><CardTitle>16 / 9</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="w-[450px]">
                                <AspectRatio ratio={16 / 9} className="bg-muted">
                                    <img src="https://images.unsplash.com/photo-1576075796033-848c2a5f3696?q=80&w=2070&auto=format&fit=crop" alt="Mechanical keyboard" className="rounded-md object-cover w-full h-full" />
                                </AspectRatio>
                            </div>
                            <CodeBlock code={`<AspectRatio ratio={16 / 9} className="bg-muted">
  <img src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="avatar" title="Avatar" description="An image element with a fallback for representing a user.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage src="/invalid-path.png" alt="Fallback" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>
                            <CodeBlock code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="badge" title="Badge" description="Displays a badge or a tag.">
                    <Card>
                        <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <Badge>Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                            </div>
                            <CodeBlock code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="breadcrumb" title="Breadcrumb" description="Displays the path to the current resource.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem><BreadcrumbLink href="/dashboard/components">Components</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <CodeBlock code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="button" title="Button" description="Displays a button or a link that triggers an action.">
                    <Card>
                        <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </div>
                            <CodeBlock code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Sizes & States</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                                <Button size="icon"><Zap className="h-4 w-4" /></Button>
                                <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button>
                            </div>
                            <CodeBlock code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon/></Button>
<Button disabled><Loader2 className="animate-spin" /> Loading</Button>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="calendar" title="Calendar" description="A date field or date-picker.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4 flex justify-center">
                            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                            <CodeBlock code={`const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="card" title="Card" description="Displays a card with header, content, and footer.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Card className="w-[350px]">
                                <CardHeader>
                                    <CardTitle>Create project</CardTitle>
                                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Deploy</Button>
                                </CardFooter>
                            </Card>
                            <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="carousel" title="Carousel" description="A carousel with motion and swipe gestures.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4 flex justify-center">
                            <Carousel className="w-full max-w-xs">
                                <CarouselContent>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            <CodeBlock code={`<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="chart" title="Chart" description="Responsive charts built with Recharts.">
                    <Card>
                        <CardHeader><CardTitle>Bar Chart</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                            <CodeBlock code={`<ChartContainer config={chartConfig}>
  <BarChart data={chartData}>
    {/* ... */}
  </BarChart>
</ChartContainer>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="checkbox" title="Checkbox" description="A control that allows the user to toggle between checked and not checked.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label htmlFor="terms" className="text-sm font-medium">Accept terms and conditions</label>
                            </div>
                            <CodeBlock code={`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="collapsible" title="Collapsible" description="An interactive component which expands/collapses a content area.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Collapsible className="w-[350px] space-y-2">
                                <div className="flex items-center justify-between space-x-4 px-4">
                                    <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                                    <CollapsibleTrigger asChild><Button variant="ghost" size="sm" className="w-9 p-0"><ChevronsUpDown className="h-4 w-4" /><span className="sr-only">Toggle</span></Button></CollapsibleTrigger>
                                </div>
                                <div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
                                <CollapsibleContent className="space-y-2">
                                    <div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
                                    <div className="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
                                </CollapsibleContent>
                            </Collapsible>
                            <CodeBlock code={`<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>Yes. Free to use for personal and commercial projects. No attribution required.</CollapsibleContent>
</Collapsible>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="command" title="Command" description="Fast, composable command menu.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Command className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem><CalendarIcon className="mr-2 h-4 w-4" /><span>Calendar</span></CommandItem>
                                        <CommandItem><Search className="mr-2 h-4 w-4" /><span>Search Emoji</span></CommandItem>
                                        <CommandItem><Rocket className="mr-2 h-4 w-4" /><span>Launch</span></CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            <CodeBlock code={`<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>...</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="context-menu" title="Context Menu" description="Displays a menu to the user — such as a set of actions or functions — when they right-click.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <ContextMenu>
                                <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                                    Right-click here
                                </ContextMenuTrigger>
                                <ContextMenuContent className="w-64">
                                    <ContextMenuItem inset>Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
                                    <ContextMenuItem inset disabled>Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem inset>Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>
                                </ContextMenuContent>
                            </ContextMenu>
                            <CodeBlock code={`<ContextMenu>
  <ContextMenuTrigger>Right-click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="dialog" title="Dialog" description="A window overlaid on either the primary window or another dialog window.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Dialog>
                                <DialogTrigger asChild><Button variant="outline">Edit Profile</Button></DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription></DialogHeader>
                                    <div className="grid gap-4 py-4"><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Name</Label><Input id="name" value="Pedro Duarte" className="col-span-3" /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="username" className="text-right">Username</Label><Input id="username" value="@peduarte" className="col-span-3" /></div></div>
                                    <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <CodeBlock code={`<Dialog>
  <DialogTrigger><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle><DialogDescription>Description</DialogDescription></DialogHeader>
    {/* Content */}
    <DialogFooter><Button>Save</Button></DialogFooter>
  </DialogContent>
</Dialog>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="drawer" title="Drawer" description="A panel that slides from the edge of the screen.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Drawer>
                                <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
                                <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm">
                                        <DrawerHeader><DrawerTitle>Move Goal</DrawerTitle><DrawerDescription>Set your daily activity goal.</DrawerDescription></DrawerHeader>
                                        <div className="p-4 pb-0">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full"><Plus className="h-4 w-4" /></Button>
                                                <div className="flex-1 text-center"><div className="text-7xl font-bold tracking-tighter">400</div><div className="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div></div>
                                                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full"><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                        <DrawerFooter><Button>Submit</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                            <CodeBlock code={`<Drawer>
  <DrawerTrigger><Button>Open</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Title</DrawerTitle><DrawerDescription>Description</DrawerDescription></DrawerHeader>
    {/* Content */}
    <DrawerFooter><Button>Submit</Button><DrawerClose><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter>
  </DrawerContent>
</Drawer>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="dropdown-menu" title="Dropdown Menu" description="Displays a menu to the user — such as a set of actions or functions — triggered by a button.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="outline">Open</Button></DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span><DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
                                        <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span><DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
                                        <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span><DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span><DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <CodeBlock code={`<DropdownMenu>
  <DropdownMenuTrigger><Button>Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="form" title="Form" description="Form component built with React Hook Form and Zod.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                    <FormField control={form.control} name="username" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl><Input placeholder="shadcn" {...field} /></FormControl>
                                            <FormDescription>This is your public display name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                            <CodeBlock code={`// See https://ui.shadcn.com/docs/components/form for full setup
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField control={form.control} name="username" render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormDescription>Your public name.</FormDescription>
          <FormMessage />
        </FormItem>
    )} />
    <Button type="submit">Submit</Button>
  </form>
</Form>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="hover-card" title="Hover Card" description="For sighted users to preview content available behind a link.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <HoverCard>
                                <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="flex justify-between space-x-4">
                                        <Avatar><AvatarImage src="https://github.com/vercel.png" /><AvatarFallback>VC</AvatarFallback></Avatar>
                                        <div className="space-y-1"><h4 className="text-sm font-semibold">@nextjs</h4><p className="text-sm">The React Framework – created and maintained by @vercel.</p><div className="flex items-center pt-2"><CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}<span className="text-xs text-muted-foreground">Joined December 2021</span></div></div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                            <CodeBlock code={`<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework for the Web.
  </HoverCardContent>
</HoverCard>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="input" title="Input" description="Displays a form input field or a component that looks like an input field.">
                    <Card>
                        <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid w-full max-w-sm items-center gap-4">
                                <Input type="email" placeholder="Email" />
                                <Input type="password" placeholder="Password" />
                                <Input type="file" />
                                <Input placeholder="Disabled" disabled />
                            </div>
                            <CodeBlock code={`<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="file" />
<Input placeholder="Disabled" disabled />`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="input-otp" title="Input OTP" description="A set of input fields for one-time passwords.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <CodeBlock code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    {/*...*/}
  </InputOTPGroup>
</InputOTP>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="label" title="Label" description="Renders an accessible label associated with a control.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="email">Your email address</Label>
                                <Input type="email" id="email" placeholder="Email" />
                            </div>
                            <CodeBlock code={`<Label htmlFor="email">Your email address</Label>
<Input type="email" id="email" />`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="menubar" title="Menubar" description="A visually persistent menu bar.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Menubar>
                                <MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu>
                                <MenubarMenu><MenubarTrigger>Edit</MenubarTrigger><MenubarContent><MenubarItem>Undo<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu>
                                <MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarItem>Reload<MenubarShortcut>⌘R</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu>
                            </Menubar>
                            <CodeBlock code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="navigation-menu" title="Navigation Menu" description="A collection of links for navigating a website.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4 flex justify-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem><NavigationMenuTrigger>Getting started</NavigationMenuTrigger><NavigationMenuContent><ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"><li className="row-span-3"><NavigationMenuLink asChild><a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/"><div className="mb-2 mt-4 text-lg font-medium">ChatFlow</div><p className="text-sm leading-tight text-muted-foreground">Beautifully designed components that you can copy and paste into your apps.</p></a></NavigationMenuLink></li></ul></NavigationMenuContent></NavigationMenuItem>
                                    <NavigationMenuItem><Link href="/docs" ><NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink></Link></NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <CodeBlock code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="pagination" title="Pagination" description="Pagination with page navigation, next and previous links.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <CodeBlock code={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="popover" title="Popover" description="Displays rich content in a portal, triggered by a button.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Popover>
                                <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="grid gap-4"><div className="space-y-2"><h4 className="font-medium leading-none">Dimensions</h4><p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p></div><div className="grid gap-2"><div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="width">Width</Label><Input id="width" defaultValue="100%" className="col-span-2 h-8" /></div></div></div>
                                </PopoverContent>
                            </Popover>
                            <CodeBlock code={`<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="progress" title="Progress" description="Displays an indicator showing the completion progress of a task.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={progress} className="w-[60%]" />
                            <CodeBlock code={`const [progress, setProgress] = React.useState(13)

<Progress value={progress} />`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="radio-group" title="Radio Group" description="A set of checkable buttons—known as radio buttons.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
                            </RadioGroup>
                            <CodeBlock code={`<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
  <div className="flex items-center space-x-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
  <div className="flex items-center space-x-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
</RadioGroup>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="resizable" title="Resizable" description="A component that can be resized.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
                                <ResizablePanel defaultSize={50}><div className="flex h-[200px] items-center justify-center p-6"><span className="font-semibold">One</span></div></ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel defaultSize={50}><div className="flex h-[200px] items-center justify-center p-6"><span className="font-semibold">Two</span></div></ResizablePanel>
                            </ResizablePanelGroup>
                            <CodeBlock code={`<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Two</ResizablePanel>
</ResizablePanelGroup>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="scroll-area" title="Scroll Area" description="Augments native scroll functionality for custom, cross-browser styling.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <ScrollArea className="h-72 w-48 rounded-md border">
                                <div className="p-4"><h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>{Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`).map((tag) => <div key={tag} className="text-sm">{tag}</div>)}</div>
                            </ScrollArea>
                            <CodeBlock code={`<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place.
</ScrollArea>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="select" title="Select" description="Displays a list of options for the user to pick from.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Select>
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
                                <SelectContent><SelectGroup><SelectLabel>Fruits</SelectLabel><SelectItem value="apple">Apple</SelectItem><SelectItem value="banana">Banana</SelectItem></SelectGroup></SelectContent>
                            </Select>
                            <CodeBlock code={`<Select>
  <SelectTrigger><SelectValue placeholder="Theme" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="separator" title="Separator" description="Visually or semantically separates content.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div><div className="space-y-1"><h4 className="text-sm font-medium leading-none">ChatFlow</h4><p className="text-sm text-muted-foreground">An open-source UI component library.</p></div><Separator className="my-4" /><div className="flex h-5 items-center space-x-4 text-sm"><div>Blog</div><Separator orientation="vertical" /><div>Docs</div><Separator orientation="vertical" /><div>Source</div></div></div>
                            <CodeBlock code={`<div>
  <h4>Title</h4>
  <p>Description</p>
  <Separator className="my-4" />
  <div className="flex">...</div>
</div>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="sheet" title="Sheet" description="Extends the Dialog component to display content that complements the main content of the screen.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Sheet>
                                <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
                                <SheetContent><SheetHeader><SheetTitle>Edit profile</SheetTitle><SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription></SheetHeader></SheetContent>
                            </Sheet>
                            <CodeBlock code={`<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader><SheetTitle>Title</SheetTitle></SheetHeader>
  </SheetContent>
</Sheet>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="skeleton" title="Skeleton" description="Use to show a placeholder while content is loading.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2"><Skeleton className="h-4 w-[250px]" /><Skeleton className="h-4 w-[200px]" /></div>
                            </div>
                            <CodeBlock code={`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="slider" title="Slider" description="An input where the user selects a value from within a range.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Slider defaultValue={[50]} max={100} step={1} />
                            <CodeBlock code={`<Slider defaultValue={[50]} max={100} step={1} />`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="sonner" title="Sonner (Toast)" description="An opinionated toast component for React.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" onClick={() => sonnerToast("Event has been created", { description: "Sunday, December 03, 2023 at 9:00 AM", action: { label: "Undo", onClick: () => console.log("Undo") } })}>Show Toast</Button>
                            <CodeBlock code={`import { toast } from "sonner"

<Button onClick={() => toast("My first toast")}>
  Give me a toast
</Button>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="status-badge" title="Status Badge" description="A badge for displaying status.">
                    <Card>
                        <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <StatusBadge status="active" />
                                <StatusBadge status="processing" />
                                <StatusBadge status="draft" />
                                <StatusBadge status="inactive" />
                                <StatusBadge status="archived" />
                                <StatusBadge status="failed" />
                            </div>
                            <CodeBlock code={`<StatusBadge status="active" />
<StatusBadge status="processing" />
<StatusBadge status="draft" />
<StatusBadge status="failed" />`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="switch" title="Switch" description="A control that allows the user to toggle between checked and not checked.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2"><Switch id="airplane-mode" /><Label htmlFor="airplane-mode">Airplane Mode</Label></div>
                            <CodeBlock code={`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="table" title="Table" description="A responsive table component.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow><TableHead className="w-[100px]">Invoice</TableHead><TableHead>Status</TableHead><TableHead>Method</TableHead><TableHead className="text-right">Amount</TableHead></TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoices.map((invoice) => <TableRow key={invoice.invoice}><TableCell className="font-medium">{invoice.invoice}</TableCell><TableCell>{invoice.paymentStatus}</TableCell><TableCell>{invoice.paymentMethod}</TableCell><TableCell className="text-right">{invoice.totalAmount}</TableCell></TableRow>)}
                                </TableBody>
                            </Table>
                            <CodeBlock code={`<Table>
  <TableHeader>
    <TableRow><TableHead>Header 1</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Cell 1</TableCell></TableRow>
  </TableBody>
</Table>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="tabs" title="Tabs" description="A set of layered sections of content, known as tab panels.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="password">Password</TabsTrigger></TabsList>
                                <TabsContent value="account"><Card><CardHeader><CardTitle>Account</CardTitle><CardDescription>Make changes to your account here.</CardDescription></CardHeader><CardContent className="space-y-2"><div className="space-y-1"><Label htmlFor="name">Name</Label><Input id="name" defaultValue="Pedro Duarte" /></div></CardContent></Card></TabsContent>
                                <TabsContent value="password"><Card><CardHeader><CardTitle>Password</CardTitle><CardDescription>Change your password here.</CardDescription></CardHeader><CardContent className="space-y-2"><div className="space-y-1"><Label htmlFor="current">Current password</Label><Input id="current" type="password" /></div></CardContent></Card></TabsContent>
                            </Tabs>
                            <CodeBlock code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content.</TabsContent>
  <TabsContent value="password">Password content.</TabsContent>
</Tabs>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="textarea" title="Textarea" description="Displays a multi-line text input field.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea placeholder="Type your message here." />
                            <CodeBlock code={`<Textarea placeholder="Type your message here." />`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="toast" title="Toast (Legacy)" description="A succinct message that is displayed temporarily.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" onClick={() => { toast({ title: "Scheduled: Catch up", description: "Friday, February 10, 2023 at 5:57 PM", action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction> }) }}>Add to calendar</Button>
                            <CodeBlock code={`import { useToast } from "@/hooks/use-toast"

const { toast } = useToast()

<Button
  onClick={() => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    })
  }}
>
  Show Toast
</Button>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="toggle" title="Toggle" description="A two-state button that can be either on or off.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Toggle aria-label="Toggle bold"><Zap className="h-4 w-4" /></Toggle>
                            <Toggle aria-label="Toggle italic" variant="outline"><Rocket className="h-4 w-4" /> With Text</Toggle>
                            <Toggle aria-label="Toggle underline" size="sm">Small</Toggle>
                            <Toggle aria-label="Toggle underline" size="lg">Large</Toggle>
                            <CodeBlock code={`<Toggle><Icon/></Toggle>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="toggle-group" title="Toggle Group" description="A set of two-state buttons that can be toggled on or off.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <ToggleGroup type="multiple">
                                <ToggleGroupItem value="bold" aria-label="Toggle bold"><Zap className="h-4 w-4" /></ToggleGroupItem>
                                <ToggleGroupItem value="italic" aria-label="Toggle italic"><Rocket className="h-4 w-4" /></ToggleGroupItem>
                                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough"><ImageIcon className="h-4 w-4" /></ToggleGroupItem>
                            </ToggleGroup>
                            <CodeBlock code={`<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold"><Icon/></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Icon/></ToggleGroupItem>
</ToggleGroup>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

                <ComponentSection id="tooltip" title="Tooltip" description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.">
                    <Card>
                        <CardHeader><CardTitle>Example</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
                                    <TooltipContent><p>Add to library</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <CodeBlock code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`} />
                        </CardContent>
                    </Card>
                </ComponentSection>

            </main>
        </div>
    )
}

ComponentsDocumentationPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ComponentsDocumentationPage;