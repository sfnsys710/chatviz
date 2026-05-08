'use client'

import { useEffect, useRef } from "react"
import { Message } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type VizKind = 'bar' | 'scatter'

type ConversationOutProps = {
    messages: Message[];
    setOpenViz: (viz: VizKind) => void;
}

type MessageBubbleProps = Message & {
    setOpenViz: (viz: VizKind) => void;
}

function MessageBubble({role, content, setOpenViz}: MessageBubbleProps) {
    const alignment = role === 'user' ? 'self-end bg-lime-600' : 'self-start bg-gray-600'
    return (
        <Card className={`max-w-[80%] text-white ${alignment}`}>
            <CardContent>{content}</CardContent>
            {role === 'assistant' && (
                <CardFooter className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setOpenViz('bar')}>Bar</Button>
                    <Button variant="secondary" size="sm" onClick={() => setOpenViz('scatter')}>Scatter</Button>
                </CardFooter>
            )}
        </Card>
    )
}

export default function ConversationOut({messages, setOpenViz}: ConversationOutProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex flex-col gap-2 p-4">
            {messages.map((message) => (
                <MessageBubble key={message.id} {...message} setOpenViz={setOpenViz} />
            ))}
            <div ref={bottomRef} />
        </div>
    )
}