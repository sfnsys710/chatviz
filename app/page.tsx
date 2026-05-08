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

    const messages = chats.find(c => c.id === activeChatId)?.messages ?? []

    function handleUserTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setUserText(event.target.value)
    }

    function handleSend() {
        if (userText.trim() === '') return
        const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: userText }

        const isNewChat = activeChatId === null
        const chatId = activeChatId ?? crypto.randomUUID()

        if (isNewChat) {
            setActiveChatId(chatId)
            setChats(prev => [...prev, { id: chatId, title: userText.slice(0, 40), messages: [userMessage] }])
        } else {
            setChats(prev => prev.map(chat => {
                if (chat.id !== chatId) return chat
                return { ...chat, messages: [...chat.messages, userMessage] }
            }))
        }
        setUserText('')

        setTimeout(() => {
            const reply: Message = { id: crypto.randomUUID(), role: 'assistant', content: 'fake reply' }
            setChats(prev => prev.map(chat => {
                if (chat.id !== chatId) return chat
                return { ...chat, messages: [...chat.messages, reply] }
            }))
        }, 500)
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
                />
                <VizSheet openViz={openViz} onOpenVizClose={() => setOpenViz(null)} />
            </SidebarInset>
        </SidebarProvider>
    )
}
