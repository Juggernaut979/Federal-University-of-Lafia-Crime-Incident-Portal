import React from 'react';
import { IncidentRecord } from '../../types';

interface DossierModalProps {
  incident: IncidentRecord | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ incident, onClose }) => {
  if (!incident) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-surface-container-lowest border-2 border-primary/30 max-w-3xl w-full rounded-2xl shadow-2xl my-8 overflow-hidden print:m-0 print:border-none print:shadow-none print:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">description</span>
            <span className="font-bold text-on-surface text-title-md">
              Official Incident Dossier Slip • {incident.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-md flex items-center gap-1.5 hover:bg-primary-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 bg-surface-container-lowest print:p-6 text-on-surface">
          {/* Official Letterhead */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-primary/40 gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/aistudio/Image_1_fa4d251d.png"
                alt="FULafia Seal"
                className="h-16 w-16 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj6UHLsud92YrLfNClbJuhphZMqUiqW6-eQqq-ASh-zQj28s7A_GbZ822Tai_lNH0JJxnP7jdjSIyzY1Y-Kgg6AKVGeV62pir00_4iJw3BknrOAmPcIbAmrYKv3Zc88fOiFzrjZudhoc0YqOnmGGL6U7bsIxll7bkFjPGkfpCSYaHQ2HE_70_QOXHqCxtyVxn3axEmBbRK_PtXV9k9DvYQM5pXhvWAZI4-XJQ4_j6fyThjb8YS_N5Fts5-KGMBRM65DE';
                }}
              />
              <div>
                <h1 className="font-extrabold text-headline-sm uppercase tracking-wide text-on-surface">
                  Federal University of Lafia
                </h1>
                <h2 className="font-bold text-label-lg text-primary uppercase tracking-wider">
                  Directorate of Security Services • Command Dispatch Division
                </h2>
                <p className="text-body-sm text-outline">
                  Permanent Campus: Lafia-Awe Road, PMB 146, Lafia, Nasarawa State, Nigeria
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="px-3 py-1 bg-surface-container-high rounded border border-outline-variant font-mono text-xs font-bold">
                REF: {incident.id}
              </div>
              <div className="text-label-sm uppercase font-bold text-primary mt-1">
                Security Clearance Level II
              </div>
            </div>
          </div>

          {/* Dossier Meta Summary Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/50 text-body-sm">
            <div>
              <span className="text-outline text-label-sm block uppercase font-bold">Category</span>
              <span className="font-bold text-on-surface text-base">{incident.type}</span>
            </div>
            <div>
              <span className="text-outline text-label-sm block uppercase font-bold">Priority Severity</span>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase mt-0.5 ${
                incident.priority === 'Critical' ? 'bg-error-container text-on-error-container' :
                incident.priority === 'High' ? 'bg-primary-fixed text-on-primary-fixed' :
                'bg-secondary-container text-on-secondary-container'
              }`}>
                {incident.priority}
              </span>
            </div>
            <div>
              <span className="text-outline text-label-sm block uppercase font-bold">Current Status</span>
              <span className="font-semibold text-primary">{incident.status}</span>
            </div>
            <div>
              <span className="text-outline text-label-sm block uppercase font-bold">Verification PIN</span>
              <span className="font-mono font-bold text-on-surface">{incident.verificationPin || '****'}</span>
            </div>
          </div>

          {/* Subject & Location */}
          <div className="space-y-3">
            <div>
              <h3 className="text-label-sm text-outline uppercase font-bold tracking-wider">Incident Subject</h3>
              <p className="text-title-md font-bold text-on-surface mt-1">{incident.subject}</p>
            </div>
            <div>
              <h3 className="text-label-sm text-outline uppercase font-bold tracking-wider">Incident Location</h3>
              <p className="text-body-md text-on-surface">{incident.location} • {incident.campusSector}</p>
              <p className="text-xs font-mono text-outline">{incident.coordinates}</p>
            </div>
          </div>

          {/* Narrative & Details */}
          <div>
            <h3 className="text-label-sm text-outline uppercase font-bold tracking-wider mb-1">
              Complainant Narrative / Description
            </h3>
            <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-body-md text-on-surface leading-relaxed">
              {incident.narrative}
            </div>
          </div>

          {/* Personnel Assigned & Chain of Custody */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-outline-variant/40 text-body-sm">
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
              <span className="text-label-sm uppercase font-bold text-outline block">Reporting Party</span>
              <div className="font-bold text-on-surface">{incident.reporterName}</div>
              <div className="text-xs text-on-surface-variant font-mono">
                {incident.reporterId ? `ID: ${incident.reporterId}` : 'Identity Shielded / Anonymous Whistleblower'}
              </div>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
              <span className="text-label-sm uppercase font-bold text-outline block">Investigating Division</span>
              <div className="font-bold text-on-surface">{incident.assignedLead}</div>
              <div className="text-xs text-primary font-medium">{incident.assignedTeam}</div>
            </div>
          </div>

          {/* Officer Investigation Remarks */}
          <div>
            <h3 className="text-label-sm text-outline uppercase font-bold tracking-wider mb-1">
              Duty Officer Findings & Instructions
            </h3>
            <p className="p-3.5 rounded-lg bg-surface-container-low/70 border border-outline-variant text-body-sm italic text-on-surface">
              "{incident.officerRemarks || 'Preliminary assessment underway. No additional tactical notes logged.'}"
            </p>
          </div>

          {/* Authentication Sign-off */}
          <div className="pt-6 border-t border-outline-variant/60 flex flex-wrap items-end justify-between gap-6 text-label-sm text-outline">
            <div>
              <div className="font-mono text-[11px]">ISSUED AT: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
              <div>SECURITY NODE: FUL-HQ-COMMAND-04</div>
              <div className="text-tertiary font-bold mt-1">CRYPTOGRAPHIC CERTIFICATE: VERIFIED VALID</div>
            </div>
            <div className="text-center sm:text-right">
              <div className="h-10 border-b border-outline-variant w-48 mb-1 inline-block"></div>
              <div className="font-bold text-on-surface">Officer I. Danladi</div>
              <div className="text-xs">Duty Commander • Central Security Directorate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
