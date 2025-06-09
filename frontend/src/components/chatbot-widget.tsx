"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Bot, MessageSquare, Send, User, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// --- Types ---
export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
}

export interface ChatbotWidgetProps {
  botId: string
  greetingMessage?: string
  placeholder?: string
  botName?: string
  botAvatar?: string
  primaryColor?: string
  position?: "bottom-right" | "bottom-left"
  // This function will be used to connect to your FastAPI backend
  onSendMessage: (message: string) => Promise
}

// --- Component ---
export function ChatbotWidget({
  botId,
  greetingMessage = "Hello! How can I help you today?",
  placeholder = "Type your message...",
  botName = "ChatFlow Assistant",
  botAvatar,
  primaryColor = "hsl(217.2, 91.2%, 59.8%)",
  position = "bottom-right",
  onSendMessage,
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "init", text: greetingMessage, sender: "bot" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInputValue = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // API Call to your FastAPI backend
      const botResponseText = await onSendMessage(currentInputValue)

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const positionClasses = {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  }

  return (
    <div className={cn("fixed z-50", positionClasses[position])}>
      {/* Chat Window /}
<div
className={cn(
"mb-4 w-80 h-[28rem] flex-col shadow-xl transition-transform duration-300 ease-in-out",
isOpen ? "flex scale-100" : "hidden scale-95"
)}
>

{/ Header */}
      <div
        className="flex items-center justify-between rounded-t-lg p-3 text-white"
        style={{ backgroundColor: primaryColor }}
      >



        {botAvatar && }




        {botName}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-white hover:bg-white/20"
        >


          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex items-end gap-2", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-6 w-6">
                    {botAvatar && <AvatarImage src={botAvatar} alt={botName} />}
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.sender === "user"
                      ? "rounded-br-none bg-primary text-primary-foreground"
                      : "rounded-bl-none bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-muted-foreground/20 text-muted-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2">
                <Avatar className="h-6 w-6">
                  {botAvatar && <AvatarImage src={botAvatar} alt={botName} />}
                  <AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/50" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/50 [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/50 [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
              />
              <Button type="submit" size="icon" style={{ backgroundColor: primaryColor }}>
                <Send className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? <X className="h-8 w-8 text-white" /> : <MessageSquare className="h-8 w-8 text-white" />}
      </Button>
    </div>
  )
}