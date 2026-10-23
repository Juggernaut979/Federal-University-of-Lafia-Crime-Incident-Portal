import React, { useState } from 'react';
import { INITIAL_INCIDENTS } from './data/mockData.js';
import { PublicPortal } from './components/public/PublicPortal.jsx';
import { CommandDashboard } from './components/admin/CommandDashboard.jsx';

export default function App() {
  const [viewMode, setViewMode] = useState('command');
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [directiveText, setDirectiveText] = useState(
    'Routine perimeter sweep in progress across Permanent Campus & Take-off Site. All gates on Tier 1 inspection protocols.'
  );

  // Add new incident (from either public report or officer file)
  const handleAddIncident = (newIncident) => {
    setIncidents((prev) => [newIncident, ...prev]);
  };

  // Update investigation remarks
  const handleUpdateRemarks = (incidentId, remarks) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const updatedTimeline = [...inc.timeline];
          // Update remarks in active step
          const activeStep = updatedTimeline.find((s) => s.isCurrent);
          if (activeStep) {
            activeStep.remark = remarks;
          }
          return {
            ...inc,
            officerRemarks: remarks,
            timeline: updatedTimeline,
          };
        }
        return inc;
      })
    );
  };

  // Handle broadcast alert
  const handleBroadcast = (newDirective) => {
    setDirectiveText(newDirective);
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating System Mode Switcher */}
      <aside aria-label="Portal Mode Switcher" className="fixed bottom-4 right-4 z-50 print:hidden">
        <div className="bg-inverse-surface text-inverse-on-surface px-3 py-2 rounded-xl shadow-2xl border border-outline/50 flex items-center gap-2 text-xs backdrop-blur-md">
          <span className="text-surface-variant font-mono text-[11px] uppercase tracking-wider hidden sm:inline">
            Active Screen:
          </span>
          <div className="inline-flex rounded-lg p-0.5 bg-surface-container-highest/20 border border-outline/30">
            <button
              onClick={() => setViewMode('command')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'command'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span>Command Dispatch</span>
            </button>
            <button
              onClick={() => setViewMode('public')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'public'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">public</span>
              <span>Public Portal</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Render */}
      {viewMode === 'command' ? (
        <CommandDashboard
          incidents={incidents}
          onAddIncident={handleAddIncident}
          onUpdateRemarks={handleUpdateRemarks}
          directiveText={directiveText}
          onBroadcast={handleBroadcast}
          onSwitchToPublic={() => setViewMode('public')}
        />
      ) : (
        <PublicPortal
          incidents={incidents}
          onAddIncident={handleAddIncident}
          onSwitchToCommand={() => setViewMode('command')}
        />
      )}
    </div>
  );
}
