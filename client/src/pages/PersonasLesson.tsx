import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Users, Map, Smile, Frown, Meh, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PersonasLesson() {
  const [activeTab, setActiveTab] = useState<'persona' | 'journey'>('persona');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Personas</strong> and <strong>User Journeys</strong> are foundational tools in UX design used to build empathy and understand the user's experience from their perspective.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">User Personas</h3>
        <p className="mb-2">
          A persona is a fictional character created to represent a user type that might use a site, brand, or product in a similar way.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Demographics:</strong> Age, occupation, location.</li>
          <li><strong>Goals:</strong> What are they trying to achieve?</li>
          <li><strong>Frustrations:</strong> What pain points do they currently face?</li>
          <li><strong>Motivations:</strong> Why do they want to achieve their goals?</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">User Journey Maps</h3>
        <p className="mb-2">
          A visual representation of the process a person goes through to accomplish a goal. It maps out the exact steps, touchpoints, and emotions.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Stages:</strong> e.g., Discovery, Research, Purchase, Post-Purchase.</li>
          <li><strong>Touchpoints:</strong> Interactions with the product/service.</li>
          <li><strong>Emotions:</strong> The user's emotional state at each stage (happy, frustrated, confused).</li>
        </ul>
      </div>
    </div>
  );

  const journeyStages = [
    { name: 'Discovery', action: 'Sees an ad for a new fitness app', emotion: 'neutral', icon: Meh, color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' },
    { name: 'Research', action: 'Reads reviews and compares features', emotion: 'frustrated', icon: Frown, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' },
    { name: 'Decision', action: 'Downloads the app and signs up', emotion: 'happy', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { name: 'Onboarding', action: 'Sets up profile and first workout', emotion: 'happy', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { name: 'Retention', action: 'Completes a 7-day streak', emotion: 'happy', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  const playground = (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Tabs */}
      <div className="p-4 border-b border-gray-100 flex gap-2 bg-white">
        {['persona', 'journey'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'persona' | 'journey')}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-indigo-50 rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab === 'persona' ? <Users className="w-4 h-4" /> : <Map className="w-4 h-4" />}
              {tab === 'persona' ? 'User Persona' : 'Journey Map'}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'persona' ? (
            <motion.div
              key="persona"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-indigo-900/5 border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Column - Profile */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-8 md:w-2/5 flex flex-col items-center text-center relative overflow-hidden">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-white/10 rounded-full blur-3xl mix-blend-overlay" />
                  <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black/10 rounded-full blur-3xl mix-blend-overlay" />
                  
                  <div className="relative w-28 h-28 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/20">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-1 tracking-tight">Sarah Jenkins</h2>
                  <p className="text-indigo-200 font-medium mb-8">Busy Professional</p>
                  
                  <div className="w-full grid grid-cols-1 gap-4 text-sm text-left bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 shadow-sm">
                    <div>
                      <div className="text-indigo-200 text-xs uppercase tracking-wider font-semibold mb-0.5">Age</div>
                      <div className="font-medium text-white text-base">32</div>
                    </div>
                    <div>
                      <div className="text-indigo-200 text-xs uppercase tracking-wider font-semibold mb-0.5">Occupation</div>
                      <div className="font-medium text-white text-base leading-tight">Marketing Manager</div>
                    </div>
                    <div>
                      <div className="text-indigo-200 text-xs uppercase tracking-wider font-semibold mb-0.5">Location</div>
                      <div className="font-medium text-white text-base">Chicago, IL</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="p-8 md:p-10 md:w-3/5 space-y-8 bg-white">
                  <div>
                    <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-6 h-[1px] bg-indigo-200"></span> Bio
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      Sarah is a busy marketing manager who struggles to find time for fitness. She wants a quick, efficient way to work out at home without needing expensive equipment or long commutes to a gym.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-emerald-200"></span> Goals
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span className="leading-tight">Stay fit with limited free time</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span className="leading-tight">Track progress easily</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-rose-200"></span> Frustrations
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-gray-700">
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          <span className="leading-tight">Workouts that require too much setup</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-700">
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          <span className="leading-tight">Overly complex fitness apps</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sarah's Journey</h3>
                <p className="text-gray-500">Finding and adopting a new fitness app</p>
              </div>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block rounded-full" />
                
                <div className="flex flex-col md:flex-row gap-4 justify-between relative z-10">
                  {journeyStages.map((stage, index) => {
                    const Icon = stage.icon;
                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-1 flex flex-col items-center text-center group"
                      >
                        <div className={`bg-white p-5 rounded-2xl shadow-sm border ${stage.border} w-full mb-6 relative hover:shadow-md transition-all hover:-translate-y-1`}>
                          <h4 className="font-bold text-gray-900 text-sm mb-2">{stage.name}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{stage.action}</p>
                          
                          {/* Mobile connector */}
                          {index < journeyStages.length - 1 && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:hidden">
                              <ArrowRight className="w-5 h-5 text-gray-300 rotate-90" />
                            </div>
                          )}
                        </div>
                        
                        <div className={`w-12 h-12 rounded-full ${stage.bg} border-2 ${stage.border} flex items-center justify-center shadow-sm ${stage.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Personas & User Journeys"
      description="Map out who your users are and the paths they take."
      theory={theory}
      playground={playground}
    />
  );
}
