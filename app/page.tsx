'use client'

import { useState } from 'react'
import { Message } from '@/lib/types'
import VizSheet, { VizKind } from '@/components/viz_sheet'
import AppSidebar from '@/components/appsidebar'
import Conversation from '@/components/conversation'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'


export default function Chatbot() {
    const [userText, setUserText] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])
    const [openViz, setOpenViz] = useState<VizKind | null>(null)

    function handleUserTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setUserText(event.target.value)
    }

    function handleSend() {
        if (userText.trim() === '') return
        const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: userText }
        setMessages(prev => [...prev, userMessage])
        setUserText('')

        setTimeout(() => {
            setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'fake reply' }])
        }, 500)
    }

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
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
