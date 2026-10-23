import React, { useState } from 'react';

export const BroadcastAlertModal = ({ isOpen, onClose, onBroadcast }) => {
  const [directiveText, setDirectiveText] = useState(
    'Routine perimeter sweep in progress across Permanent Campus & Take-off Site. All gates on Tier 1 inspection protocols.'
  );
  const [priority, setPriority] = useState('CRITICAL');
  const [channelSMS, setChannelSMS] = useState(true);
  const [channelTicker, setChannelTicker] = useState(true);
  const [channelRadio, setChannelRadio] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!directiveText.trim()) return;

    onBroadcast(directiveText);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-sm">
      <div 
        className="relative bg-surface-container-lowest border-2 border-error/50 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-error text-on-error flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">campaign</span>
            <div>
              <h3 className="font-bold text-title-md">Broadcast Emergency Security Directive</h3>
              <p className="text-body-sm opacity-90">All-Campus High-Priority Intercept Channel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h4 className="text-headline-sm font-bold text-on-surface">Directive Broadcast Dispatched</h4>
            <p className="text-body-md text-on-surface-variant">
              Campus ticker updated, push SMS dispatched to 14,200 recipients, and patrol radios synced.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1.5">
                Directive Severity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['CRITICAL', 'WARNING', 'ADVISORY'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPriority(level)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      priority === level
                        ? level === 'CRITICAL'
                          ? 'bg-error text-on-error border-error shadow-sm'
                          : level === 'WARNING'
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
                          : 'bg-secondary text-on-secondary border-secondary shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:bg-surface-container'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="directive-input" className="block text-label-md font-semibold text-on-surface mb-1.5">
                Official Security Directive Text *
              </label>
              <textarea
                id="directive-input"
                rows={3}
                value={directiveText}
                onChange={(e) => setDirectiveText(e.target.value)}
                className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container-low text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Enter alert directive text displayed across all portal tickers..."
                required
              />
            </div>

            <div>
              <span className="block text-label-md font-semibold text-on-surface mb-2">
                Active Broadcast Delivery Channels
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-body-sm text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelTicker}
                    onChange={(e) => setChannelTicker(e.target.checked)}
                    className="w-4 h-4 text-error rounded border-outline-variant focus:ring-error"
                  />
                  <span>Top Alert Ticker Bar across Public & Officer Portals</span>
                </label>
                <label className="flex items-center gap-2.5 text-body-sm text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelSMS}
                    onChange={(e) => setChannelSMS(e.target.checked)}
                    className="w-4 h-4 text-error rounded border-outline-variant focus:ring-error"
                  />
                  <span>Campus-wide Emergency SMS Gateway (Staff & Students)</span>
                </label>
                <label className="flex items-center gap-2.5 text-body-sm text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelRadio}
                    onChange={(e) => setChannelRadio(e.target.checked)}
                    className="w-4 h-4 text-error rounded border-outline-variant focus:ring-error"
                  />
                  <span>Mobile Patrol VHF Transceivers & Guard Post Intercom</span>
                </label>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60 flex items-start gap-2 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">verified_user</span>
              <span>
                Authorized under emergency power protocols by Officer I. Danladi (Duty Commander #Shift Alpha).
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface font-label-md hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-error hover:bg-error/90 text-on-error font-label-md font-bold rounded-lg shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">campaign</span>
                <span>Send Emergency Broadcast</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
