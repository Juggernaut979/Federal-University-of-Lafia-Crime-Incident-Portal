import React from 'react';
import { PATROL_UNITS } from '../../data/mockData.js';

export const DispatchLogView = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant gap-4">
        <div>
          <h2 className="text-headline-md font-bold text-on-surface">Patrol Unit Dispatch &amp; Vehicle Log</h2>
          <p className="text-body-sm text-on-surface-variant">
            Real-time tactical fleet positioning, mobile unit statuses, and response timestamps.
          </p>
        </div>
        <div className="flex items-center gap-2 text-label-sm text-tertiary font-bold bg-tertiary-fixed-dim/20 px-3 py-1 rounded-full border border-tertiary/20">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span>5 Patrol Units Synced via GPS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PATROL_UNITS.map((unit) => (
          <div
            key={unit.id}
            className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-surface-container text-primary">
                  <span className="material-symbols-outlined text-xl">directions_car</span>
                </span>
                <div>
                  <h3 className="font-bold text-title-md text-on-surface">{unit.callsign}</h3>
                  <div className="text-xs text-outline">{unit.sector}</div>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  unit.status === 'Patrolling'
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                    : unit.status === 'En Route'
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                {unit.status}
              </span>
            </div>

            <div className="space-y-1.5 text-body-sm pt-2 border-t border-outline-variant/40">
              <div className="flex justify-between">
                <span className="text-outline">Lead Officer:</span>
                <span className="font-semibold text-on-surface">{unit.leadOfficer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Last Radio Ping:</span>
                <span className="font-mono text-xs text-primary">{unit.lastPing}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => alert(`Direct dispatch dispatched to ${unit.callsign}`)}
                className="w-full py-1.5 px-3 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-label-md rounded transition-colors text-center font-semibold"
              >
                Reassign Sector
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Movement Log */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs p-5">
        <h3 className="text-title-md font-bold text-on-surface mb-3">Chronological Movement Log (Past 12 Hours)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant text-label-sm uppercase">
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Unit</th>
                <th className="py-2.5 px-3">From</th>
                <th className="py-2.5 px-3">To Sector</th>
                <th className="py-2.5 px-3">Driver / Operator</th>
                <th className="py-2.5 px-3">Mileage / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs">10:22 AM</td>
                <td className="py-2.5 px-3 font-bold text-primary">Mobile Patrol 02</td>
                <td className="py-2.5 px-3 text-on-surface-variant">Gate 1 Central</td>
                <td className="py-2.5 px-3 font-medium text-on-surface">Faculty of Computing</td>
                <td className="py-2.5 px-3">Insp. S. Yakubu</td>
                <td className="py-2.5 px-3 text-tertiary font-semibold">Code 2 Response</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs">09:40 AM</td>
                <td className="py-2.5 px-3 font-bold text-primary">Mobile Patrol 01</td>
                <td className="py-2.5 px-3 text-on-surface-variant">Library Car Park</td>
                <td className="py-2.5 px-3 font-medium text-on-surface">Gate 2 Outer Road</td>
                <td className="py-2.5 px-3">Sgt. B. Oche</td>
                <td className="py-2.5 px-3 text-on-surface-variant">Routine Sweep</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs">08:15 AM</td>
                <td className="py-2.5 px-3 font-bold text-primary">Take-off Unit Alpha</td>
                <td className="py-2.5 px-3 text-on-surface-variant">Akunza Security Post</td>
                <td className="py-2.5 px-3 font-medium text-on-surface">Medical Annex</td>
                <td className="py-2.5 px-3">Officer T. Usman</td>
                <td className="py-2.5 px-3 text-on-surface-variant">Escort Transit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
