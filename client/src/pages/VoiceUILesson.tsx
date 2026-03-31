import React, { useState, useEffect } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Mic, Volume2, Activity, Info, Play, Square, CheckCircle2, AlertCircle } from 'lucide-react';

export function VoiceUILesson() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening) {
      setTranscript('Listening...');
      setFeedback(null);
      timeout = setTimeout(() => {
        setTranscript('Turn off the living room lights.');
        setIsListening(false);
        setTimeout(() => {
          setFeedback({ type: 'success', message: 'Living room lights turned off.' });
        }, 800);
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Voice User Interfaces (VUI) rely on spoken commands and auditory feedback. Designing for voice requires handling ambiguity and providing clear system status without visual cues.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" />
            System Status
          </h4>
          <p className="text-sm">Users must know when the system is listening, processing, or speaking. Use visual indicators (like pulsing lights) or auditory cues (earcons).</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-500" />
            Conversational Repair
          </h4>
          <p className="text-sm">When the system misunderstands, provide a graceful way to recover. Avoid generic "I didn't understand" errors; instead, ask clarifying questions.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">VUI Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Keep it brief:</strong> Spoken information is harder to remember than written text. Keep responses concise.</li>
          <li><strong>Offer choices:</strong> Limit options to 3 or fewer (e.g., "Would you like to hear the news, weather, or traffic?").</li>
          <li><strong>Confirm actions:</strong> For destructive or important actions, always ask for confirmation (e.g., "Are you sure you want to cancel the alarm?").</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Mic className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-gray-900">Voice UI Lab</h3>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
        
        {/* Visualizer / Listening State */}
        <div className="relative mb-12">
          <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-2xl transition-all duration-1000 ${isListening ? 'opacity-40 scale-150 animate-pulse' : 'opacity-0 scale-100'}`} />
          
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isListening ? 'bg-indigo-600 scale-110' : 'bg-white hover:bg-gray-50'}`}
          >
            {isListening ? (
              <Square className="w-8 h-8 text-white fill-current" />
            ) : (
              <Mic className="w-10 h-10 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Transcript & Feedback */}
        <div className="w-full max-w-md text-center space-y-6">
          <div className={`h-16 flex items-center justify-center transition-all duration-500 ${transcript ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className={`text-xl font-medium ${isListening ? 'text-gray-400 italic' : 'text-gray-800'}`}>
              "{transcript}"
            </p>
          </div>

          <div className={`h-16 flex items-center justify-center transition-all duration-500 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {feedback && (
              <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-sm border ${feedback.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-medium">{feedback.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Commands */}
        <div className="absolute bottom-8 w-full px-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Try saying</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['"Turn off the lights"', '"What\'s the weather?"', '"Set a timer for 5 mins"'].map((cmd, i) => (
              <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 shadow-sm">
                {cmd}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Notice the visual feedback when the microphone is active (pulsing glow). In VUI, users need immediate confirmation that the system is listening, processing, and acting on their command.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Voice User Interfaces"
      description="Designing for spoken commands, auditory feedback, and conversational repair."
      theory={theory}
      playground={playground}
    />
  );
}
