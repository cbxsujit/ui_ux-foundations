import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { LineChart, Activity, Users, Target, Clock, AlertCircle } from 'lucide-react';

export function MetricsLesson() {
  const [susScore, setSusScore] = useState(65);
  const [npsScore, setNpsScore] = useState(10);
  const [taskSuccess, setTaskSuccess] = useState(70);

  // Calculate overall UX Health Score (simplified formula for demo)
  const npsNormalized = (npsScore + 100) / 2; // Convert -100 to 100 scale to 0 to 100
  const overallHealth = Math.round((susScore + npsNormalized + taskSuccess) / 3);

  let healthColor = 'text-red-500';
  let healthBg = 'bg-red-50';
  let healthBorder = 'border-red-200';
  if (overallHealth >= 80) {
    healthColor = 'text-green-500';
    healthBg = 'bg-green-50';
    healthBorder = 'border-green-200';
  } else if (overallHealth >= 60) {
    healthColor = 'text-yellow-500';
    healthBg = 'bg-yellow-50';
    healthBorder = 'border-yellow-200';
  }

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>UX Metrics</strong> are quantitative data points used to measure, compare, and track the user experience of a product over time.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Attitudinal Metrics (What users say)</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>SUS (System Usability Scale):</strong> A 10-item questionnaire yielding a score from 0-100. Average is 68.</li>
          <li><strong>NPS (Net Promoter Score):</strong> Measures loyalty. "How likely are you to recommend us?" Score ranges from -100 to 100.</li>
          <li><strong>CSAT (Customer Satisfaction):</strong> Measures satisfaction with a specific interaction or feature.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Behavioral Metrics (What users do)</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Task Success Rate:</strong> The percentage of correctly completed tasks.</li>
          <li><strong>Time on Task:</strong> How long it takes to complete a specific goal.</li>
          <li><strong>Error Rate:</strong> The number of mistakes made during a task.</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <LineChart className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">UX Metrics Dashboard</h3>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        
        {/* Overall Health Score */}
        <div className={`mb-8 p-6 rounded-2xl border ${healthBg} ${healthBorder} flex flex-col items-center justify-center text-center transition-colors duration-500`}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Overall UX Health Score</h2>
          <div className={`text-6xl font-black ${healthColor} transition-colors duration-500`}>
            {overallHealth}
          </div>
          <p className="text-gray-600 mt-2 max-w-md">
            {overallHealth >= 80 ? 'Excellent! Your product is highly usable and users love it.' : 
             overallHealth >= 60 ? 'Average. There is room for improvement in usability and satisfaction.' : 
             'Poor. Immediate action is required to fix critical usability issues.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* SUS Slider */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <Activity className="w-5 h-5 text-blue-500" /> SUS Score
              </div>
              <span className="text-xl font-bold font-mono">{susScore}</span>
            </div>
            <input 
              type="range" min="0" max="100" value={susScore} 
              onChange={(e) => setSusScore(Number(e.target.value))}
              className="w-full accent-blue-500 mb-2"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 (Poor)</span>
              <span>68 (Avg)</span>
              <span>100 (Excellent)</span>
            </div>
          </div>

          {/* NPS Slider */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <Users className="w-5 h-5 text-purple-500" /> NPS Score
              </div>
              <span className="text-xl font-bold font-mono">{npsScore}</span>
            </div>
            <input 
              type="range" min="-100" max="100" value={npsScore} 
              onChange={(e) => setNpsScore(Number(e.target.value))}
              className="w-full accent-purple-500 mb-2"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>-100 (Detractors)</span>
              <span>0</span>
              <span>100 (Promoters)</span>
            </div>
          </div>

          {/* Task Success Slider */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <Target className="w-5 h-5 text-orange-500" /> Task Success
              </div>
              <span className="text-xl font-bold font-mono">{taskSuccess}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={taskSuccess} 
              onChange={(e) => setTaskSuccess(Number(e.target.value))}
              className="w-full accent-orange-500 mb-2"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0% (Fail)</span>
              <span>100% (Success)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );

  return (
    <LessonLayout
      title="UX Metrics"
      description="Measure and track the success of your designs with data."
      theory={theory}
      playground={playground}
    />
  );
}
