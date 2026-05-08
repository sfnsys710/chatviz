'use client'

import { useState } from 'react'
import { Chat, Message } from '@/lib/types'
import VizSheet, { VizKind } from '@/components/viz_sheet'
import AppSidebar from '@/components/appsidebar'
import Conversation from '@/components/conversation'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'


export default function Chatbot() {
    const [chats, setChats] = useState<Chat[]>([])
    const [activeChatId, setActiveChatId] = useState<string | null>(null)
    const [userText, setUserText] = useState<string>('')
    const [openViz, setOpenViz] = useState<VizKind | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)

    const messages = chats.find(c => c.id === activeChatId)?.messages ?? []

    function handleUserTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setUserText(event.target.value)
    }

    function handleSend() {
        if (userText.trim() === '') return
        const message = userText.trim()
        const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: message }

        const isNewChat = activeChatId === null
        const chatId = activeChatId ?? crypto.randomUUID()

        if (isNewChat) {
            setActiveChatId(chatId)
            setChats(prev => [...prev, { id: chatId, title: message.slice(0, 40), messages: [userMessage] }])
        } else {
            setChats(prev => prev.map(chat => {
                if (chat.id !== chatId) return chat
                return { ...chat, messages: [...chat.messages, userMessage] }
            }))
        }
        setUserText('')
        streamReply(chatId, message)
    }

    async function streamReply(chatId: string, message: string) {
        const replyId = crypto.randomUUID()
        setIsStreaming(true)

        setChats(prev => prev.map(chat => {
            if (chat.id !== chatId) return chat
            return { ...chat, messages: [...chat.messages, { id: replyId, role: 'assistant' as const, content: '' }] }
        }))

        const response = await fetch('/api/stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId, message }),
        })

        const reader = response.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const parts = buffer.split('\n\n')
            buffer = parts.pop()!

            for (const part of parts) {
                const line = part.trim()
                if (!line.startsWith('data: ')) continue
                const data = line.slice(6)

                if (data === '[DONE]') {
                    setIsStreaming(false)
                    return
                }

                setChats(prev => prev.map(chat => {
                    if (chat.id !== chatId) return chat
                    return {
                        ...chat,
                        messages: chat.messages.map(m =>
                            m.id === replyId ? { ...m, content: m.content + data + ' ' } : m
                        )
                    }
                }))
            }
        }

        setIsStreaming(false)
    }

    function handleSelectChat(id: string) {
        setActiveChatId(id)
        setUserText('')
    }

    function handleNewChat() {
        setActiveChatId(null)
        setUserText('')
    }

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
            />
            <SidebarInset>
                <SidebarTrigger className="m-2" />
                <Conversation
                    messages={messages}
                    userText={userText}
                    onTextChange={handleUserTextChange}
                    onSend={handleSend}
                    setOpenViz={setOpenViz}
                    disabled={isStreaming}
                />
                <VizSheet openViz={openViz} onOpenVizClose={() => setOpenViz(null)} />
            </SidebarInset>
        </SidebarProvider>
    )
}
