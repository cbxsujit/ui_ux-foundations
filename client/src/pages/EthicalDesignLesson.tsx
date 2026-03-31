import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { ShieldAlert, AlertTriangle, EyeOff, CheckCircle2, Info, X } from 'lucide-react';

export function EthicalDesignLesson() {
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        Ethical design prioritizes the user's well-being and autonomy. It avoids <strong>Dark Patterns</strong>—interfaces carefully crafted to trick users into doing things they might not want to do.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Roach Motel
          </h4>
          <p className="text-sm">A design that makes it very easy to get into a certain situation (like signing up for a subscription) but extremely difficult to get out of.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-amber-500" />
            Confirmshaming
          </h4>
          <p className="text-sm">Guilting the user into opting in. (e.g., "No thanks, I prefer to stay uninformed" instead of a simple "No" button).</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Building Trust</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Transparency:</strong> Be clear about pricing, terms, and what the user is agreeing to.</li>
          <li><strong>Easy Cancellation:</strong> If it takes one click to subscribe, it should take one click to unsubscribe.</li>
          <li><strong>Respect Attention:</strong> Don't use aggressive notifications or fake urgency (e.g., "Only 1 left!" when untrue).</li>
        </ul>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-gray-900">Dark Patterns Lab</h3>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center relative">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Newsletter</h4>
          <p className="text-gray-600 mb-8">Get the latest UX tips delivered to your inbox.</p>
          
          {isSubscribed ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="font-medium text-emerald-700">You're subscribed!</p>
              <button 
                onClick={() => setShowModal(true)}
                className="text-sm text-gray-400 hover:text-gray-600 underline mt-4"
              >
                Unsubscribe
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsSubscribed(true)}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Subscribe Now
            </button>
          )}
        </div>

        {/* Dark Pattern Modal */}
        {showModal && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-gray-900">Are you absolutely sure?</h4>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">If you unsubscribe, you'll miss out on exclusive deals and your UX skills might stagnate. We'd hate to see you fall behind.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-colors"
                >
                  Keep me subscribed!
                </button>
                <button 
                  onClick={() => {
                    setIsSubscribed(false);
                    setShowModal(false);
                  }}
                  className="w-full py-3 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  No thanks, I prefer to stay uninformed and miss out.
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <Info className="w-5 h-5 text-rose-400 shrink-0" />
        <p className="text-xs text-gray-400">
          <strong>UX Insight:</strong> The unsubscribe flow above demonstrates <strong>Confirmshaming</strong> and visual hierarchy manipulation. The "Keep subscribed" button is styled as the primary action, while the actual unsubscribe button uses manipulative language.
        </p>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Ethical Design & Dark Patterns"
      description="Learn to identify manipulative design practices and build user trust."
      theory={theory}
      playground={playground}
    />
  );
}
