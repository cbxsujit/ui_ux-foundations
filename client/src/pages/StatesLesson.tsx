import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { MousePointerClick, Loader2 } from 'lucide-react';
import { DevicePreview } from '../components/DevicePreview';

export function StatesLesson() {
  const [forcedState, setForcedState] = useState<'default' | 'hover' | 'active' | 'disabled' | 'loading'>('default');
  const [isToggled, setIsToggled] = useState(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  const effectiveState = (forcedState === 'default' && isSimulatingLoad) ? 'loading' : forcedState;

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Interactive elements must communicate their current state to the user. Without visual feedback, users feel uncertain if their action was registered.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">The 5 Core States</h3>
      <ul className="space-y-4">
        <li>
          <strong className="block text-gray-900">1. Default</strong>
          <span className="text-sm">How it looks normally. Should clearly look clickable.</span>
        </li>
        <li>
          <strong className="block text-gray-900">2. Hover</strong>
          <span className="text-sm">When the mouse is over it. Usually slightly darker or lighter to show it's interactive.</span>
        </li>
        <li>
          <strong className="block text-gray-900">3. Active (Pressed)</strong>
          <span className="text-sm">The exact moment it's clicked. Often scales down slightly or gets darker to feel like a physical button press.</span>
        </li>
        <li>
          <strong className="block text-gray-900">4. Disabled</strong>
          <span className="text-sm">Cannot be interacted with. Usually grayed out with reduced opacity.</span>
        </li>
        <li>
          <strong className="block text-gray-900">5. Loading</strong>
          <span className="text-sm">Action is processing. Shows a spinner and prevents double-clicking.</span>
        </li>
        <li>
          <strong className="block text-gray-900">6. On / Off (Toggled)</strong>
          <span className="text-sm">Used for switches and checkboxes. The 'On' state usually uses a strong accent color, while 'Off' is muted. They also share hover and active states!</span>
        </li>
      </ul>
    </div>
  );

  const getButtonClasses = () => {
    const base = "relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200";
    
    switch (effectiveState) {
      case 'hover':
        return `${base} bg-indigo-700 text-white shadow-md -translate-y-0.5`;
      case 'active':
        return `${base} bg-indigo-800 text-white shadow-inner scale-95 translate-y-0`;
      case 'disabled':
        return `${base} bg-gray-200 text-gray-400 cursor-not-allowed`;
      case 'loading':
        return `${base} bg-indigo-600 text-white opacity-90 cursor-wait`;
      default:
        // Actual interactive default
        return `${base} bg-indigo-600 text-white shadow hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 active:bg-indigo-800 active:shadow-inner active:scale-95 active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none`;
    }
  };

  const getToggleContainerClasses = () => {
    const base = "relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none";
    
    const colorClass = isToggled ? 'bg-indigo-600' : 'bg-gray-300';
    const hoverColorClass = isToggled ? 'bg-indigo-700' : 'bg-gray-400';
    const activeColorClass = isToggled ? 'bg-indigo-800' : 'bg-gray-500';
    const disabledColorClass = isToggled ? 'bg-indigo-300' : 'bg-gray-200';

    switch (effectiveState) {
      case 'hover':
        return `${base} ${hoverColorClass} shadow-inner`;
      case 'active':
        return `${base} ${activeColorClass} scale-95`;
      case 'disabled':
      case 'loading':
        return `${base} ${disabledColorClass} cursor-not-allowed opacity-60`;
      default:
        return `${base} ${colorClass} hover:${hoverColorClass} active:${activeColorClass} active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed`;
    }
  };

  const getToggleKnobClasses = () => {
    const base = "inline-block h-6 w-6 transform rounded-full bg-white shadow transition-all duration-200 ease-in-out";
    const translateClass = isToggled ? 'translate-x-7' : 'translate-x-1';
    
    switch (effectiveState) {
      case 'active':
        return `${base} ${translateClass} scale-90`;
      default:
        return `${base} ${translateClass} active:scale-90`;
    }
  };

  const handleButtonClick = () => {
    if (forcedState === 'default' && !isSimulatingLoad) {
      setIsSimulatingLoad(true);
      setTimeout(() => setIsSimulatingLoad(false), 2000);
    }
  };

  const playground = (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-700">Force State</label>
        <div className="flex flex-wrap gap-2">
          {['default', 'hover', 'active', 'disabled', 'loading'].map((state) => (
            <button
              key={state}
              onClick={() => setForcedState(state as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize border ${forcedState === state ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
            >
              {state}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Select "Default" to interact with the button normally, or force a state to inspect it.
        </p>
      </div>

      <DevicePreview>
        {(isMobile) => (
          <div className={`flex-1 flex items-center justify-center ${isMobile ? 'p-4 bg-white' : 'p-10 bg-gray-50'}`}>
            <div className={`bg-white flex flex-col items-center gap-8 w-full max-w-sm ${isMobile ? 'p-4' : 'p-12 rounded-3xl shadow-xl border border-gray-100'}`}>
              <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Application</h3>
            <p className="text-gray-500 text-sm">Click the button to see its loading transition.</p>
          </div>
          
          <button 
            onClick={handleButtonClick}
            className={getButtonClasses()}
            disabled={effectiveState === 'disabled' || effectiveState === 'loading'}
          >
            {effectiveState === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <MousePointerClick className="w-5 h-5" />
                Confirm Action
              </>
            )}
          </button>

          <div className="w-full h-px bg-gray-100 my-2"></div>
          
          <div className="flex items-center justify-between w-full px-2">
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">Enable Notifications</h4>
              <p className="text-xs text-gray-500">Receive updates via email.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isToggled}
              onClick={() => setIsToggled(!isToggled)}
              disabled={effectiveState === 'disabled' || effectiveState === 'loading'}
              className={getToggleContainerClasses()}
            >
              <span className={getToggleKnobClasses()} />
            </button>
          </div>
            </div>
          </div>
        )}
      </DevicePreview>
    </div>
  );

  return <LessonLayout title="Interactive States" description="Provide clear visual feedback for user actions." theory={theory} playground={playground} />;
}
