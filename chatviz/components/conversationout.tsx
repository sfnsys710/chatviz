'use client'

import { useEffect, useRef } from "react"
import { Message } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

type ConversationOutProps = {
    messages: Message[];
}

function MessageBubble({role, content}: Message) {
    const alignment = role === 'user' ? 'self-end bg-lime-600' : 'self-start bg-gray-600'
    return (
        <Card className={`max-w-[80%] text-white ${alignment}`}>
            <CardContent>{content}</CardContent>
        </Card>
    )
}

export default function ConversationOut({messages}: ConversationOutProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex flex-col gap-2 p-4">
            {messages.map((message) => (
                <MessageBubble key={message.id} {...message} />
            ))}
            <div ref={bottomRef} />
        </div>
    )
}