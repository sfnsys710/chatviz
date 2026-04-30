'use client'

type ConversationInProps = {
    text: string;
    onTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSend: () => void;
}

export default function ConversationIn({text, onTextChange, onSend}: ConversationInProps) {
    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            onSend()
        }
    }

    return (
        <div className="flex gap-2 w-full">
            <textarea
                placeholder="How can I help you today?"
                className="rounded-2xl flex-1 px-4 py-2 border"
                onChange={onTextChange}
                onKeyDown={handleKeyDown}
                value={text}
            />
            <button
                className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => onSend()}
            >
                Send
            </button>
        </div>
    )
}