'use client'

import { useState } from 'react'
import { Message } from '@/lib/types'
import ConversationIn from '@/components/conversationint'
import ConversationOut from '@/components/conversationout'


export default function Chatbot() {
    const [userText, setUserText] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])

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

    const isEmpty = messages.length === 0

    return (
        <div className={`h-screen flex flex-col ${isEmpty ? 'justify-center' : ''}`}>
            {!isEmpty && (
                <div className="flex-1 overflow-y-auto w-[70%] max-w-3xl mx-auto">
                    <ConversationOut messages={messages} />
                </div>
            )}
            <div className="p-4 w-[70%] max-w-3xl mx-auto">
                <ConversationIn text={userText} onTextChange={handleUserTextChange} onSend={handleSend} />
            </div>
        </div>
    )
}