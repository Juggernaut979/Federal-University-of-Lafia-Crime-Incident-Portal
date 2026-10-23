import React, { useState } from 'react';

export const OfficerDirectoryView = ({ officers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterShift, setFilterShift] = useState('All');

  const filtered = officers.filter((off) => {
    const matchSearch =
      off.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      off.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      off.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      off.callsign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchShift = filterShift === 'All' || off.shift.includes(filterShift);
    return matchSearch && matchShift;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant gap-4">
        <div>
          <h2 className="text-headline-md font-bold text-on-surface">Officer &amp; Personnel Directory</h2>
          <p className="text-body-sm text-on-surface-variant">
            Active duty security personnel, patrol callsigns, radio frequencies, and duty shifts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search officer name, badge, callsign..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-body-sm border border-outline-variant rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:border-primary w-64"
          />
          <select
            value={filterShift}
            onChange={(e) => setFilterShift(e.target.value)}
            className="p-2 text-body-sm border border-outline-variant rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="All">All Shifts</option>
            <option value="Alpha">Shift Alpha (Day)</option>
            <option value="Bravo">Shift Bravo (Evening)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((officer) => (
          <div
            key={officer.id}
            className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs space-y-3 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary-container text-on-primary-container font-bold text-lg flex items-center justify-center border-2 border-primary">
                  {officer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-title-md">{officer.name}</h3>
                  <div className="text-xs font-mono text-primary font-bold">{officer.badge}</div>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                officer.status === 'On Duty' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                officer.status === 'Investigating' ? 'bg-primary-fixed text-on-primary-fixed' :
                'bg-secondary-container text-on-secondary-container'
              }`}>
                {officer.status}
              </span>
            </div>

            <div className="space-y-1.5 text-body-sm pt-2 border-t border-outline-variant/40">
              <div className="flex justify-between">
                <span className="text-outline">Rank:</span>
                <span className="font-medium text-on-surface">{officer.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Assigned Sector:</span>
                <span className="font-medium text-on-surface">{officer.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Radio Callsign:</span>
                <span className="font-mono text-primary font-semibold">{officer.callsign}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Shift:</span>
                <span className="text-on-surface-variant text-xs">{officer.shift}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <a
                href={`tel:${officer.phone}`}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">phone_in_talk</span>
                {officer.phone}
              </a>
              <button
                onClick={() => alert(`Radio dispatch ping sent to ${officer.callsign}`)}
                className="px-2.5 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary rounded text-xs font-semibold text-on-surface transition-colors"
              >
                Radio Ping
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
