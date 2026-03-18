import React from 'react'
import DOMPurify from 'dompurify'
import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/userMessage'
import { Send } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';



interface UIMessage {
    id: string
    role: 'user' | 'assistant'
    text: string
}

export default function ChatPage() {
    const [userMessage, setUserMessage] = useState<UIMessage>({
        id: '',
        role: 'user',
        text: ''
    })
    const [aiMessage, setAiMessage] = userMessage<UIMessage>({
        id: '',
        role: 'assistant',
        text: ''
    })
    const [streaming, setStreaming] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [error, setError] = useState(false)
    const messageContainer: UIMessage [] = []
    // const { messages, sendMessage, status } = useChat({
    //     transport: new DefaultChatTransport({ api: '/api/chat' }),
    // })

    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }

    }, [userMessage, aiMessage])

    // const handleUserMessage = (value: string) =>{
    //     let chatId = uuidv4()
    //     setUserMessage({
    //         id: chatId,
    //         role: "user",
    //         text: value
    //     })
    // }

     // purify user input to prevent XXS attacks
     const formattedInput = ()=>{
         let purifiedBreak = userInput.replace(/\n/g, '<br>')
         purifiedBreak = DOMPurify.sanitize(purifiedBreak, {
             USE_PROFILES: { html: true },
             ALLOWED_TAGS: ['br'],
         })
         return purifiedBreak
     }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // push the user userMessage and ai output into the message container
        setUserMessage({
            id: uuidv4(),
            role: 'user',
            text:  formattedInput()
        })

        setAiMessage({
            id: uuidv4(),
            role: 'assistant',
            text: ''
        })
        messageContainer.push(userMessage)

        // simulate ai response after 500ms
        setTimeout(()=>{
            messageContainer.push(aiMessage)
        }, 500)


        if (userMessage.text.trim().length > 0) {
            setStreaming(true)
            inputRef.current?.focus()

            setUserMessage({
                id: '',
                role: 'user',
                text: ''
            })

        }
        return
    }


    return (
        <div className="flex h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chat Assistant</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Ask me anything and I'll do my best to help
                    </p>
                </div>
            </header>

            {/* Messages Container */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
            >
                <div className="mx-auto max-w-2xl space-y-4">
                    {messageContainer.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                            <div className="rounded-full bg-slate-200 p-4 dark:bg-slate-700">
                                <svg
                                    className="h-8 w-8 text-slate-500 dark:text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Start a conversation
                            </h2>
                            <p className="max-w-sm text-slate-600 dark:text-slate-300">
                                Type your message below to begin chatting with the AI assistant
                            </p>
                        </div>
                    ) : (
                        messageContainer.map((message) => {
                            const messageText = getMessageText(message)
                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-xl rounded-2xl px-4 py-3 ${
                                            message.role === 'user'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-50'
                                        }`}
                                    >
                                        <p className="leading-relaxed">{messageText}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}

                    {streaming && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-slate-800">
                                <div className="flex gap-2">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"></div>
                                    <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"></div>
                                    <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-950 sm:px-6">
                <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
                    <div className="flex gap-3">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Type your message..."
                            value={userMessage}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
                            disabled={streaming}
                            className="flex-1 border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-500 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
                        />
                        <Button
                            type="submit"
                            disabled={streaming || !userMessage.text?.trim()}
                            className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                            <span className="hidden sm:inline">Send</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
