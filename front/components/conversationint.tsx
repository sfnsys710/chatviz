'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type ConversationInProps = {
    text: string;
    onTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSend: () => void;
    disabled?: boolean;
}

export default function ConversationIn({text, onTextChange, onSend, disabled}: ConversationInProps) {
    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            onSend()
        }
    }

    return (
        <div className="rounded-2xl border p-2 flex flex-col gap-2">
            <Textarea
                placeholder="How can I help you today?"
                className="border-0 shadow-none focus-visible:ring-0 resize-none"
                value={text}
                onChange={onTextChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {/* future settings */}
                </div>
                <Button onClick={() => onSend()} disabled={disabled}>Send</Button>
            </div>
        </div>
    )
}
