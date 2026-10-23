import React from 'react';
import { DispatchEvent } from '../../types';

interface CommandFeedViewProps {
  events: DispatchEvent[];
  onTriggerSOS: () => void;
}

export const CommandFeedView: React.FC<CommandFeedViewProps> = ({ events, onTriggerSOS }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-headline-md font-bold text-on-surface">Live Command &amp; Tactical Feed</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-error text-on-error animate-pulse">
              3 LIVE SIGNALS
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Encrypted sensor feeds, SOS panic beacons, gate pass scans, and real-time radio transcriptions.
          </p>
        </div>

        <button
          onClick={onTriggerSOS}
          className="px-4 py-2 bg-error hover:bg-error/90 text-on-error font-bold text-label-md rounded-lg flex items-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-sm">e911_emergency</span>
          <span>Simulate Emergency SOS Ping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs">
            <h3 className="text-title-md font-bold text-on-surface mb-4 flex items-center justify-between">
              <span>Operational Stream Log</span>
              <span className="text-xs font-mono text-outline">PORT: 8080 • SECURE TLS 1.3</span>
            </h3>

            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3.5 rounded-lg border border-outline-variant/50 bg-surface-container-low flex items-start gap-3 hover:bg-surface-container transition-colors"
                >
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      event.type === 'emergency'
                        ? 'bg-error text-on-error'
                        : event.type === 'resolved'
                        ? 'bg-tertiary text-on-tertiary'
                        : event.type === 'patrol'
                        ? 'bg-primary text-on-primary'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {event.type === 'emergency'
                        ? 'notification_important'
                        : event.type === 'resolved'
                        ? 'check_circle'
                        : event.type === 'patrol'
                        ? 'directions_car'
                        : 'attachment'}
                    </span>
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-on-surface text-body-md">{event.title}</h4>
                      <span className="font-mono text-xs text-outline">{event.time}</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Perimeter Guard Status & Panic Beacon Monitor */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs space-y-4">
            <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">security</span>
              <span>Guard Post Telemetry</span>
            </h3>

            <div className="space-y-2.5 text-body-sm">
              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <div className="font-bold text-on-surface">Gate 1 Main Barrier</div>
                  <div className="text-xs text-outline">Permanent Campus</div>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                  NORMAL PASS
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <div className="font-bold text-on-surface">Gate 2 Perimeter Road</div>
                  <div className="text-xs text-outline">Inspection Zone</div>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary-fixed text-on-primary-fixed">
                  TIER 1 CHECK
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <div className="font-bold text-on-surface">Akunza Take-off Post</div>
                  <div className="text-xs text-outline">Take-off Campus</div>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                  NORMAL PASS
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex justify-between items-center">
                <div>
                  <div className="font-bold text-on-surface">Female Hostels Turnstile</div>
                  <div className="text-xs text-outline">Block C &amp; D Gates</div>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-error-container text-on-error-container">
                  ELEVATED ALERT
                </span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40 text-xs text-on-surface-variant">
              Automated fence infrared beams active from 19:00 to 06:00 across all 4.8km boundary line.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
