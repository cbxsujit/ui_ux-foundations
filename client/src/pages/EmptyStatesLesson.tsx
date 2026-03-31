import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Inbox, SearchX, WifiOff, AlertTriangle, Plus } from 'lucide-react';

type StateType = 'first-use' | 'no-results' | 'error' | 'offline';

export function EmptyStatesLesson() {
  const [activeState, setActiveState] = useState<StateType>('first-use');

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Empty States</strong> occur when there is no data to display in a UI. They are crucial moments to educate, delight, and prompt the user to take action.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Types of Empty States</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>First Use:</strong> A brand new account with no data yet. (Opportunity: Onboarding).</li>
          <li><strong>User Cleared:</strong> The user deleted or completed all items (e.g., Inbox Zero). (Opportunity: Reward/Delight).</li>
          <li><strong>No Results:</strong> A search or filter returned nothing. (Opportunity: Suggest alternatives).</li>
          <li><strong>Errors/Offline:</strong> System failures or no internet. (Opportunity: Reassurance and retry).</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Anatomy of a Good Empty State</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Illustration/Icon:</strong> Visual context (keep it subtle).</li>
          <li><strong>Title:</strong> Clear, concise explanation of the state.</li>
          <li><strong>Body:</strong> Helpful text explaining what to do next.</li>
          <li><strong>Primary Action (CTA):</strong> A button to resolve the empty state.</li>
        </ol>
      </div>
    </div>
  );

  const renderEmptyState = () => {
    switch (activeState) {
      case 'first-use':
        return (
          <div className="flex flex-col items-center text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="w-12 h-12 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your inbox is empty</h3>
            <p className="text-gray-500 mb-8">When you receive messages, proposals, or notifications, they'll show up right here.</p>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              <Plus className="w-5 h-5" /> Compose Message
            </button>
          </div>
        );
      case 'no-results':
        return (
          <div className="flex flex-col items-center text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <SearchX className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 mb-8">We couldn't find anything matching "xyz123". Try adjusting your filters or searching for something else.</p>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
              Clear Filters
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 mb-8">We're having trouble loading this data right now. Our team has been notified.</p>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
              Try Again
            </button>
          </div>
        );
      case 'offline':
        return (
          <div className="flex flex-col items-center text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <WifiOff className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You are offline</h3>
            <p className="text-gray-500 mb-8">It looks like you've lost your internet connection. Check your network and try again.</p>
            <button className="px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors shadow-sm">
              Refresh Page
            </button>
          </div>
        );
    }
  };

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex flex-wrap gap-2 justify-center sm:justify-start">
        <button
          onClick={() => setActiveState('first-use')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeState === 'first-use' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          First Use
        </button>
        <button
          onClick={() => setActiveState('no-results')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeState === 'no-results' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          No Results
        </button>
        <button
          onClick={() => setActiveState('error')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeState === 'error' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          System Error
        </button>
        <button
          onClick={() => setActiveState('offline')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeState === 'offline' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Offline
        </button>
      </div>

      <div className="flex-1 p-6 flex items-center justify-center bg-white m-6 rounded-2xl border border-gray-200 shadow-sm">
        {renderEmptyState()}
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Empty States & Edge Cases"
      description="Design for the moments when things are empty, broken, or just starting."
      theory={theory}
      playground={playground}
    />
  );
}
