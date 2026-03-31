import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Repeat, Zap, Gift, Target, Info, CheckCircle2, BellRing } from 'lucide-react';

export function HabitLoopsLesson() {
  const [step, setStep] = useState(0);

  const loopSteps = [
    { title: 'Trigger', icon: BellRing, color: 'text-rose-500', bg: 'bg-rose-100', desc: 'A notification prompts the user.' },
    { title: 'Action', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100', desc: 'The user opens the app and scrolls.' },
    { title: 'Variable Reward', icon: Gift, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'The user finds an interesting post.' },
    { title: 'Investment', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-100', desc: 'The user likes the post, improving future recommendations.' },
  ];

  const handleNext = () => {
    setStep((s) => (s + 1) % 4);
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        The Hook Model (by Nir Eyal) describes how products build habits. It consists of four phases: Trigger, Action, Variable Reward, and Investment.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-500" />
            Variable Rewards
          </h4>
          <p className="text-sm">Unpredictability increases dopamine. If a user doesn't know exactly what they'll find (like a slot machine or a social feed), they are more likely to keep checking.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            Investment
          </h4>
          <p className="text-sm">When users put effort into a product (adding friends, saving preferences, building a profile), they are less likely to abandon it.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethical Considerations</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Respect User Time:</strong> Habit loops can become addictive. Ensure the habit benefits the user, not just the company's metrics.</li>
          <li><strong>Provide Value:</strong> The reward must be genuinely valuable to the user.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Repeat className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-gray-900">The Hook Model Lab</h3>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        <div className="relative w-64 h-64">
          {/* Circular Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#e5e7eb" strokeWidth="2" />
            <circle 
              cx="50" cy="50" r="48" fill="none" stroke="#6366f1" strokeWidth="4" 
              strokeDasharray="301.59" 
              strokeDashoffset={301.59 - (301.59 * ((step + 1) / 4))}
              className="transition-all duration-1000 ease-in-out"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Nodes */}
          {loopSteps.map((s, i) => {
            const angle = (i * 90 - 90) * (Math.PI / 180);
            const x = 50 + 48 * Math.cos(angle);
            const y = 50 + 48 * Math.sin(angle);
            const isActive = i === step;
            const Icon = s.icon;

            return (
              <div 
                key={i}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? s.bg + ' scale-125 shadow-lg' : 'bg-white border-2 border-gray-200'}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <Icon className={`w-5 h-5 ${isActive ? s.color : 'text-gray-400'}`} />
              </div>
            );
          })}

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h4 className="font-bold text-gray-900 text-lg mb-1">{loopSteps[step].title}</h4>
            <p className="text-xs text-gray-500">{loopSteps[step].desc}</p>
          </div>
        </div>

        <button 
          onClick={handleNext}
          className="mt-12 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-transform active:scale-95"
        >
          Simulate Next Phase
        </button>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> The Hook Model explains why we endlessly scroll feeds. A trigger brings us in, the action is effortless (scrolling), the reward is variable (maybe a funny video), and we invest by liking or commenting.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Habit Loops & Hooks"
      description="Understanding the psychology of habit-forming products."
      theory={theory}
      playground={playground}
    />
  );
}