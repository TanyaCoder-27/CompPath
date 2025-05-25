import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const sendMessage = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      if (!GROQ_API_KEY) {
        throw new Error('API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.');
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage.content
            }
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }
  
      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };
  
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling GROQ API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}. Please check your API key and try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0C0C0C] text-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6">
              <div className="w-16 h-16 rounded-full bg-[#20B2AA] flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-light text-white mb-4">How can I help you today?</h2>
              <p className="text-[#888888] text-center max-w-lg leading-relaxed">
                I'm an AI assistant powered by Llama 3. Ask me anything - from answering questions to helping with creative tasks.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full px-6 py-8">
              {messages.map((message, index) => (
                <div key={message.id} className={`mb-8 ${index === messages.length - 1 ? 'mb-4' : ''}`}>
                  {message.role === 'user' ? (
                    // User Message
                    <div className="flex justify-end">
                      <div className="max-w-[80%] bg-[#20B2AA] rounded-2xl px-4 py-3 text-white">
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    // Assistant Message
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#20B2AA] flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-[#111111] rounded-2xl px-4 py-3 border border-[#262626]">
                          <p className="text-[#E5E5E5] leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                        <div className="text-xs text-[#888888] mt-2 px-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#20B2AA] flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-[#111111] rounded-2xl px-4 py-3 border border-[#262626]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#20B2AA] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#20B2AA] rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-[#20B2AA] rounded-full animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#0C0C0C] p-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full resize-none rounded-xl bg-[#111111] px-4 py-3 pr-12 text-white placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all duration-200 min-h-[52px] max-h-[120px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#20B2AA] hover:bg-[#1A9B96] disabled:bg-[#333333] disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-[#888888] mt-3 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;