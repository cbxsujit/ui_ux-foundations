import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Bot, Sparkles, MessageSquare, ThumbsUp, ThumbsDown, RefreshCw, Info, Send, Plus, Mic } from 'lucide-react';

export function AIUXLesson() {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Can you summarize the principles of AI UX?' },
    { role: 'ai', content: 'AI UX focuses on transparency, feedback, and managing expectations. It involves clear loading states, easy ways to correct the AI, and providing context for AI-generated content.' }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsGenerating(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'This is a simulated AI response to demonstrate the streaming and feedback UI patterns in modern conversational interfaces.' }]);
      setIsGenerating(false);
    }, 1500);
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Designing for AI and Large Language Models (LLMs) requires a shift from traditional graphical user interfaces to <strong>conversational and intent-based</strong> interactions.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Managing Expectations
          </h4>
          <p className="text-sm">AI can hallucinate or make mistakes. UI must clearly indicate when content is AI-generated and provide disclaimers.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            Feedback & Correction
          </h4>
          <p className="text-sm">Users need easy ways to regenerate responses, edit their prompts, or provide feedback (thumbs up/down) to improve the model.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Patterns</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Streaming Text:</strong> Show text as it generates to reduce perceived latency.</li>
          <li><strong>Prompt Suggestions:</strong> Help users overcome the "blank canvas" problem by offering starter prompts.</li>
          <li><strong>Graceful Degradation:</strong> Provide clear error states when the AI fails to understand or generate a response.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Bot className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-gray-900">Conversational UI Lab</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {msg.role === 'user' ? <MessageSquare className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              
              {msg.role === 'ai' && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors ml-auto flex items-center gap-1.5 text-xs font-medium">
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button 
            className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors shrink-0 border border-transparent hover:border-indigo-100"
            title="Upload document"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message AI Assistant..."
              className="w-full pl-4 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              disabled={isGenerating}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button 
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                disabled={isGenerating}
                title="Voice typing"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="p-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:bg-gray-400 hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> AI can make mistakes. Consider verifying important information.
          </span>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Notice the feedback buttons (thumbs up/down) and the disclaimer at the bottom. These are crucial for building trust and improving the AI model over time.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="AI & Conversational UX"
      description="Designing interfaces for Large Language Models and AI assistants."
      theory={theory}
      playground={playground}
    />
  );
}
