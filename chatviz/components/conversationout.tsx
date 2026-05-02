'use client'

import { useEffect, useRef } from "react"
import { Message } from "@/lib/types"

type ConversationOutProps = {
    messages: Message[];
}

function MessageBubble({role, content}: Message) {
    const userClasses = "bg-lime-600 text-white self-end"
    const assistantClasses = "bg-gray-600 text-white self-start"
    const allClasses = `px-4 py-2 rounded-2xl max-w-[80%] ${role === 'user' ? userClasses : assistantClasses}`
    return <p className={allClasses}>{content}</p>
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