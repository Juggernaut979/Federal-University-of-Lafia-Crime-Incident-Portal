import React, { useState } from 'react';
import { IncidentRecord } from '../../types';

interface CaseFilesViewProps {
  incidents: IncidentRecord[];
  onSelectIncident: (incident: IncidentRecord) => void;
  onOpenDossier: (incident: IncidentRecord) => void;
}

export const CaseFilesView: React.FC<CaseFilesViewProps> = ({ incidents, onSelectIncident, onOpenDossier }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filtered = incidents.filter((inc) => {
    const matchesSearch =
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || inc.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant gap-4">
        <div>
          <h2 className="text-headline-md font-bold text-on-surface">Case Files Archive &amp; Evidence Repository</h2>
          <p className="text-body-sm text-on-surface-variant">
            Official searchable repository of active, pending, and resolved university criminal and civil cases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by Case ID, subject, victim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-body-sm border border-outline-variant rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:border-primary w-64"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 text-body-sm border border-outline-variant rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="All">All Statuses</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inc) => (
          <div
            key={inc.id}
            onClick={() => onSelectIncident(inc)}
            className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs space-y-3 cursor-pointer hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-primary">{inc.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  inc.status === 'Resolved' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                  inc.status === 'Under Investigation' ? 'bg-primary-fixed text-on-primary-fixed' :
                  'bg-surface-container text-on-surface-variant'
                }`}>
                  {inc.status}
                </span>
              </div>
              <h3 className="font-bold text-on-surface text-title-md line-clamp-2">{inc.subject}</h3>
              <p className="text-body-sm text-on-surface-variant mt-2 line-clamp-2">{inc.narrative}</p>
            </div>

            <div className="pt-3 border-t border-outline-variant/40 space-y-2 text-xs">
              <div className="flex justify-between text-outline">
                <span>Location:</span>
                <span className="font-medium text-on-surface truncate max-w-[150px]">{inc.location}</span>
              </div>
              <div className="flex justify-between text-outline">
                <span>Reporter:</span>
                <span className="font-medium text-on-surface">{inc.reporterName}</span>
              </div>
              <div className="flex justify-between text-outline">
                <span>Lead:</span>
                <span className="font-medium text-primary">{inc.assignedLead}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-outline font-mono">{inc.timestamp}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDossier(inc);
                  }}
                  className="px-2.5 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary rounded font-semibold text-on-surface transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">print</span>
                  <span>Dossier</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
