import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Trophy, Star, Target, Flame, Info, CheckCircle2, Zap } from 'lucide-react';

export function GamificationLesson() {
  const [streak, setStreak] = useState(3);
  const [points, setPoints] = useState(450);
  const [showReward, setShowReward] = useState(false);

  const handleAction = () => {
    setPoints(p => p + 50);
    setStreak(s => s + 1);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Gamification uses game design elements in non-game contexts to drive user engagement, retention, and motivation.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Streaks & Consistency
          </h4>
          <p className="text-sm">Encourage daily habits by visually tracking consecutive days of activity. Loss aversion makes users want to maintain their streak.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            Clear Goals & Progress
          </h4>
          <p className="text-sm">Break large tasks into smaller, achievable milestones. Progress bars and badges provide a sense of accomplishment.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Meaningful Rewards:</strong> Points and badges should unlock tangible value (e.g., features, discounts, or status).</li>
          <li><strong>Variable Rewards:</strong> Unpredictable rewards (like a surprise bonus) create stronger dopamine responses.</li>
          <li><strong>Avoid Overuse:</strong> Don't gamify everything. If the core task is tedious, gamification is just a band-aid.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Trophy className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-gray-900">Gamification Lab</h3>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* User Stats Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                JD
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Jane Doe</h4>
                <p className="text-sm text-gray-500">Level 4 Explorer</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-orange-500 font-bold text-xl">
                <Flame className="w-5 h-5 fill-current" />
                {streak}
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Day Streak</p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Progress to Level 5</span>
              <span className="text-indigo-600">{points} / 500 XP</span>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((points / 500) * 100, 100)}%` }}
              />
            </div>
          </div>

          <button 
            onClick={handleAction}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete Daily Task
          </button>
        </div>

        {/* Reward Animation Overlay */}
        {showReward && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
            <div className="animate-in zoom-in slide-in-from-bottom-10 duration-500 fade-in flex flex-col items-center">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/50 mb-4 animate-bounce">
                <Star className="w-12 h-12 text-white fill-current" />
              </div>
              <div className="bg-white px-6 py-2 rounded-full shadow-lg border border-gray-100 text-indigo-600 font-bold text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current text-yellow-500" />
                +50 XP Earned!
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Notice the immediate visual feedback when completing a task. The progress bar updates smoothly, the streak increments, and a delightful animation reinforces the positive behavior.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Gamification & Rewards"
      description="Applying game mechanics to motivate users and build habits."
      theory={theory}
      playground={playground}
    />
  );
}
