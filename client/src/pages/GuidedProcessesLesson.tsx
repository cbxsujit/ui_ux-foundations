import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { ListChecks, CheckCircle2, Circle, ChevronRight, ChevronLeft, Info, Rocket, CreditCard, Package, Truck } from 'lucide-react';

export function GuidedProcessesLesson() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: 'Account', icon: <CreditCard className="w-4 h-4" /> },
    { id: 2, title: 'Shipping', icon: <Package className="w-4 h-4" /> },
    { id: 3, title: 'Payment', icon: <Truck className="w-4 h-4" /> },
    { id: 4, title: 'Review', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Guided processes break down complex, multi-step tasks into <strong>manageable chunks</strong>. This reduces cognitive load and prevents user abandonment.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-indigo-500" />
            Steppers & Wizards
          </h4>
          <p className="text-sm">Use visual indicators to show progress and set expectations about the length of the task.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-pink-500" />
            Progressive Disclosure
          </h4>
          <p className="text-sm">Only show the information and inputs required for the current step to avoid overwhelming the user.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">UX Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Save Progress:</strong> Allow users to leave and return to the same spot.</li>
          <li><strong>Clear Navigation:</strong> Provide "Back" and "Next" buttons, but ensure "Back" doesn't lose data.</li>
          <li><strong>Validation:</strong> Validate each step before allowing the user to proceed.</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Ready to experiment?</h4>
        <p className="text-sm text-indigo-700 mb-4">Try navigating through the checkout wizard in the lab. Notice how the stepper updates and content changes.</p>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all lg:hidden">
          Open Interactive Lab
        </button>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900">Process Wizard Lab</h3>
        </div>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Stepper Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 p-10 min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
              {steps[currentStep - 1].icon}
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">{steps[currentStep - 1].title} Details</h4>
            <p className="text-gray-500 max-w-xs mx-auto mb-8">
              This is where the user would enter their {steps[currentStep - 1].title.toLowerCase()} information.
            </p>
            
            <div className="w-full space-y-3">
              <div className="h-10 bg-gray-50 rounded-xl border border-gray-100 animate-pulse"></div>
              <div className="h-10 bg-gray-50 rounded-xl border border-gray-100 animate-pulse w-3/4 mx-auto"></div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button 
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-2.5 font-bold text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-600 transition-all"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button 
              onClick={() => setCurrentStep(s => Math.min(steps.length, s + 1))}
              className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
            >
              {currentStep === steps.length ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> Wizards are best for infrequent tasks that are complex or have a strict sequence. For frequent tasks, consider a single-page form to allow power users to work faster.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Guided Processes"
      description="Simplify complex tasks with steppers, wizards, and progressive disclosure."
      theory={theory}
      playground={playground}
    />
  );
}