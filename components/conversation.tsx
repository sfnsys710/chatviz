'use client'

import { Message } from '@/lib/types'
import ConversationIn from '@/components/conversationint'
import ConversationOut from '@/components/conversationout'
import { VizKind } from '@/components/viz_sheet'

type Props = {
    messages: Message[]
    userText: string
    onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onSend: () => void
    setOpenViz: (viz: VizKind | null) => void
}

export default function Conversation({ messages, userText, onTextChange, onSend, setOpenViz }: Props) {
    const isEmpty = messages.length === 0

    return (
        <div className={`flex flex-col h-full ${isEmpty ? 'justify-center' : ''}`}>
            {!isEmpty && (
                <div className="flex-1 overflow-y-auto w-[70%] max-w-3xl mx-auto">
                    <ConversationOut messages={messages} setOpenViz={setOpenViz} />
                </div>
            )}
            <div className="p-4 w-[70%] max-w-3xl mx-auto">
                <ConversationIn text={userText} onTextChange={onTextChange} onSend={onSend} />
            </div>
        </div>
    )
}
