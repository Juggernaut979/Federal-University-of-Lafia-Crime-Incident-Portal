import React, { useState } from 'react';
import { IncidentRecord, CampusSector, EvidenceItem } from '../../types';
import { IncidentTriageView } from './IncidentTriageView';
import { CommandFeedView } from './CommandFeedView';
import { CaseFilesView } from './CaseFilesView';
import { OfficerDirectoryView } from './OfficerDirectoryView';
import { DispatchLogView } from './DispatchLogView';
import { SystemAnalyticsView } from './SystemAnalyticsView';
import { BroadcastAlertModal } from '../modals/BroadcastAlertModal';
import { FileIncidentModal } from '../modals/FileIncidentModal';
import { DossierModal } from '../modals/DossierModal';
import { EvidenceLightboxModal } from '../modals/EvidenceLightboxModal';
import { DISPATCH_FEED_EVENTS, OFFICERS } from '../../data/mockData';

interface CommandDashboardProps {
  incidents: IncidentRecord[];
  onAddIncident: (incident: IncidentRecord) => void;
  onUpdateRemarks: (incidentId: string, remarks: string) => void;
  directiveText: string;
  onBroadcast: (newDirective: string) => void;
  onSwitchToPublic: () => void;
}

type TabType = 'triage' | 'feed' | 'cases' | 'directory' | 'dispatch' | 'analytics';

export const CommandDashboard: React.FC<CommandDashboardProps> = ({
  incidents,
  onAddIncident,
  onUpdateRemarks,
  directiveText,
  onBroadcast,
  onSwitchToPublic,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('triage');
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord>(incidents[0] || {} as IncidentRecord);
  const [activeSector, setActiveSector] = useState<CampusSector>('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [dossierIncident, setDossierIncident] = useState<IncidentRecord | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurityProtocols, setShowSecurityProtocols] = useState(false);

  // When a new incident is added, select it
  const handleAddNewIncident = (newInc: IncidentRecord) => {
    onAddIncident(newInc);
    setSelectedIncident(newInc);
    setActiveTab('triage');
  };

  const handleEscalateCase = (id: string) => {
    alert(`Case ${id} escalated to Chief Security Officer (CSO) & Vice-Chancellor Executive Security Panel.`);
  };

  const handleAssignPatrol = (inc: IncidentRecord) => {
    alert(`Patrol Unit dispatched to ${inc.location}. Radio call dispatched to duty officer.`);
  };

  // Filtered incidents if search query is typed in top app bar
  const displayedIncidents = searchQuery.trim()
    ? incidents.filter(
        (i) =>
          i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (i.reporterId && i.reporterId.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : incidents;

  return (
    <div className="min-h-screen text-on-surface bg-background flex flex-col antialiased selection:bg-primary selection:text-on-primary">
      {/* EMERGENCY ALERT TICKER BAR */}
      <aside
        aria-label="Campus Alert Ticker"
        className="w-full bg-error text-on-error px-gutter py-2 flex flex-wrap items-center justify-between text-body-sm shadow-sm z-50 shrink-0"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center p-1 bg-on-error/20 rounded-full animate-pulse">
            <span className="material-symbols-outlined text-base">emergency</span>
          </span>
          <span className="font-bold tracking-wide uppercase text-on-error">OFFICIAL SECURITY DIRECTIVE:</span>
          <span className="hidden md:inline">{directiveText}</span>
        </div>
        <div className="flex items-center gap-6 text-label-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">phone_in_talk</span>
            <span>
              Hotline: <strong className="underline decoration-on-error/40">0803-000-FULAFIA</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>
              Alt Dispatch: <strong>0705-111-CAMPUS</strong>
            </span>
          </div>
        </div>
      </aside>

      {/* APPLICATION SHELL WRAPPER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* DESKTOP PERSISTENT COMMAND SIDEBAR */}
        <nav
          aria-label="Command Directorate Sidebar"
          className="hidden lg:flex w-72 flex-col justify-between py-6 px-4 z-40 bg-inverse-surface border-r border-outline shadow-md shrink-0"
        >
          <div className="flex flex-col gap-6">
            {/* Brand Header & Official Crest */}
            <div className="flex items-center gap-3.5 px-2 pb-4 border-b border-outline/30">
              <div className="h-12 w-12 rounded-lg bg-surface-container-lowest p-1 shadow-sm flex items-center justify-center overflow-hidden border border-primary/30 shrink-0">
                <img
                  alt="FULafia Security Seal Official Crest"
                  className="w-full h-full object-contain"
                  src="/assets/aistudio/Image_1_fa4d251d.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj6UHLsud92YrLfNClbJuhphZMqUiqW6-eQqq-ASh-zQj28s7A_GbZ822Tai_lNH0JJxnP7jdjSIyzY1Y-Kgg6AKVGeV62pir00_4iJw3BknrOAmPcIbAmrYKv3Zc88fOiFzrjZudhoc0YqOnmGGL6U7bsIxll7bkFjPGkfpCSYaHQ2HE_70_QOXHqCxtyVxn3axEmBbRK_PtXV9k9DvYQM5pXhvWAZI4-XJQ4_j6fyThjb8YS_N5Fts5-KGMBRM65DE';
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-title-md font-bold text-inverse-on-surface truncate">FULafia Command</h1>
                <p className="text-label-sm text-surface-variant/80 uppercase tracking-wider">Security Directorate</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-col space-y-1.5">
              {/* Incident Triage */}
              <button
                onClick={() => setActiveTab('triage')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'triage'
                    ? 'bg-surface-container-highest/20 text-primary-fixed border-l-4 border-primary-fixed font-semibold rounded-l-none'
                    : 'text-surface-container-highest hover:bg-surface-container-highest/10 hover:text-surface-lowest'
                }`}
              >
                <span className="material-symbols-outlined text-primary-fixed">dashboard</span>
                <span className="text-label-md">Incident Triage</span>
              </button>

              {/* Command Feed */}
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'feed'
                    ? 'bg-surface-container-highest/20 text-primary-fixed border-l-4 border-primary-fixed font-semibold rounded-l-none'
                    : 'text-surface-container-highest hover:bg-surface-container-highest/10 hover:text-surface-lowest'
                }`}
              >
                <span className="material-symbols-outlined">emergency</span>
                <span className="text-label-md">Command Feed</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-error text-on-error">
                  3 LIVE
                </span>
              </button>

              {/* Case Files */}
              <button
                onClick={() => setActiveTab('cases')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'cases'
                    ? 'bg-surface-container-highest/20 text-primary-fixed border-l-4 border-primary-fixed font-semibold rounded-l-none'
                    : 'text-surface-container-highest hover:bg-surface-container-highest/10 hover:text-surface-lowest'
                }`}
              >
                <span className="material-symbols-outlined">folder_shared</span>
                <span className="text-label-md">Case Files</span>
              </button>

              {/* Officer Directory */}
              <button
                onClick={() => setActiveTab('directory')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'directory'
                    ? 'bg-surface-container-highest/20 text-primary-fixed border-l-4 border-primary-fixed font-semibold rounded-l-none'
                    : 'text-surface-container-highest hover:bg-surface-container-highest/10 hover:text-surface-lowest'
                }`}
              >
                <span className="material-symbols-outlined">badge</span>
                <span className="text-label-md">Officer Directory</span>
              </button>

              {/* Dispatch Log */}
              <button
                onClick={() => setActiveTab('dispatch')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'dispatch'
                    ? 'bg-surface-container-highest/20 text-primary-fixed border-l-4 border-primary-fixed font-semibold rounded-l-none'
                    : 'text-surface-container-highest hover:bg-surface-container-highest/10 hover:text-surface-lowest'
                }`}
              >
                <span className="material-symbols-outlined">local_police</span>
                <span className="text-label-md">Dispatch Log</span>
              </button>

              {/* System Analytics */}
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'analytics'
                    ? 'bg-surface-container-highest/20 text-primary-fixed border-l-4 border-primary-fixed font-semibold rounded-l-none'
                    : 'text-surface-container-highest hover:bg-surface-container-highest/10 hover:text-surface-lowest'
                }`}
              >
                <span className="material-symbols-outlined">analytics</span>
                <span className="text-label-md">System Analytics</span>
              </button>
            </div>
          </div>

          {/* Action Button & Footer Settings in Sidebar */}
          <div className="flex flex-col gap-4 pt-4 border-t border-outline/30">
            {/* Broadcast Alert CTA Button */}
            <button
              onClick={() => setIsBroadcastOpen(true)}
              className="w-full py-2.5 px-3 bg-error hover:bg-error/90 text-on-error font-bold text-label-lg rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">campaign</span>
              <span>Broadcast Alert</span>
            </button>

            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setShowSecurityProtocols(true)}
                className="flex items-center gap-3 px-4 py-2 text-surface-variant hover:text-surface-lowest hover:bg-surface-container-highest/10 rounded-lg transition-colors text-left"
              >
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span className="text-label-md">Security Protocols</span>
              </button>
              <button
                onClick={onSwitchToPublic}
                className="flex items-center gap-3 px-4 py-2 text-surface-variant hover:text-primary-fixed hover:bg-surface-container-highest/10 rounded-lg transition-colors text-left font-semibold"
              >
                <span className="material-symbols-outlined text-lg">public</span>
                <span className="text-label-md">Open Public Portal</span>
              </button>
            </div>

            <div className="px-2 pt-2 text-[10px] text-surface-variant/60 leading-relaxed border-t border-outline/20">
              Federal University of Lafia • Command Node #04
            </div>
          </div>
        </nav>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scroll">
          {/* TOP COMMAND APP BAR */}
          <header className="w-full sticky top-0 z-30 px-gutter flex justify-between items-center h-16 bg-surface-container-lowest border-b border-outline-variant shadow-xs shrink-0">
            {/* Left: Search & Subtitle */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search report ID, student ID, patrol vehicle, officer badge..."
                  className="w-full pl-10 pr-4 py-2 text-body-md bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Right: Actions & Officer Profile */}
            <div className="flex items-center gap-4">
              {/* Incident Feed Notification */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="Notifications"
                  className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors relative"
                >
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center">
                    7
                  </span>
                </button>

                {/* Notifications Popover */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl p-4 z-50 space-y-3">
                    <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                      <span className="font-bold text-title-md text-on-surface">Live Shift Alerts</span>
                      <span className="text-xs text-primary font-bold">Mark all read</span>
                    </div>
                    <div className="space-y-2 text-body-sm max-h-60 overflow-y-auto custom-scroll">
                      <div className="p-2 rounded bg-surface-container-low">
                        <div className="font-bold text-on-surface">New report filed: FUL-2025-0482</div>
                        <p className="text-xs text-on-surface-variant">Laptop theft at Computing Lab. High Priority.</p>
                      </div>
                      <div className="p-2 rounded bg-surface-container-low">
                        <div className="font-bold text-on-surface">Patrol Unit 02 acknowledged dispatch</div>
                        <p className="text-xs text-on-surface-variant">En route to Faculty of Computing Room 204.</p>
                      </div>
                      <div className="p-2 rounded bg-surface-container-low">
                        <div className="font-bold text-on-surface">Gate 2 vehicle inspection</div>
                        <p className="text-xs text-on-surface-variant">Unregistered vehicle inspected and cleared.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-6 w-px bg-outline-variant"></div>

              {/* Officer Profile Header Card */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center border-2 border-primary">
                  ID
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-label-lg text-on-surface font-semibold leading-tight">Officer I. Danladi</span>
                  <span className="text-label-sm text-primary font-medium">Duty Commander • Shift Alpha</span>
                </div>
              </div>

              {/* Fast Action CTA: File Formal Incident */}
              <button
                onClick={() => setIsFileModalOpen(true)}
                className="hidden md:inline-flex items-center gap-2 py-2 px-3.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-label-md rounded-lg shadow-sm transition-all duration-150 active:scale-95"
              >
                <span className="material-symbols-outlined text-base">add_moderator</span>
                <span>File Formal Incident</span>
              </button>

              {/* Switch to Public View Button */}
              <button
                onClick={onSwitchToPublic}
                className="inline-flex items-center gap-1.5 py-2 px-3 bg-surface-container-high hover:bg-surface-variant text-on-surface border border-outline-variant text-label-md rounded-lg transition-colors font-semibold"
                title="Switch to Public Student/Staff Incident Reporting Portal"
              >
                <span className="material-symbols-outlined text-base">visibility</span>
                <span className="hidden xl:inline">Public View</span>
              </button>
            </div>
          </header>

          {/* MAIN CONTENT VIEW */}
          <main className="flex-1 p-gutter space-y-6">
            {activeTab === 'triage' && (
              <IncidentTriageView
                incidents={displayedIncidents}
                selectedIncident={selectedIncident}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
                onUpdateRemarks={onUpdateRemarks}
                onOpenDossier={(inc) => setDossierIncident(inc)}
                onOpenEvidence={(ev) => setSelectedEvidence(ev)}
                onEscalate={handleEscalateCase}
                onAssignPatrol={handleAssignPatrol}
                activeSector={activeSector}
                setActiveSector={setActiveSector}
              />
            )}

            {activeTab === 'feed' && (
              <CommandFeedView
                events={DISPATCH_FEED_EVENTS}
                onTriggerSOS={() => {
                  alert('SIMULATED SOS: Panic Beacon Ping dispatched to Duty Commander Console!');
                }}
              />
            )}

            {activeTab === 'cases' && (
              <CaseFilesView
                incidents={incidents}
                onSelectIncident={(inc) => {
                  setSelectedIncident(inc);
                  setActiveTab('triage');
                }}
                onOpenDossier={(inc) => setDossierIncident(inc)}
              />
            )}

            {activeTab === 'directory' && <OfficerDirectoryView officers={OFFICERS} />}

            {activeTab === 'dispatch' && <DispatchLogView />}

            {activeTab === 'analytics' && <SystemAnalyticsView />}
          </main>

          {/* INSTITUTIONAL FOOTER */}
          <footer
            aria-label="Official Footer"
            className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center gap-4 border-t border-outline-variant bg-surface-container mt-auto"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="h-8 w-8 rounded bg-surface-container-lowest p-1 shadow-xs border border-primary/20 shrink-0">
                <img
                  alt="FULafia Security Crest"
                  className="w-full h-full object-contain"
                  src="/assets/aistudio/Image_1_fa4d251d.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj6UHLsud92YrLfNClbJuhphZMqUiqW6-eQqq-ASh-zQj28s7A_GbZ822Tai_lNH0JJxnP7jdjSIyzY1Y-Kgg6AKVGeV62pir00_4iJw3BknrOAmPcIbAmrYKv3Zc88fOiFzrjZudhoc0YqOnmGGL6U7bsIxll7bkFjPGkfpCSYaHQ2HE_70_QOXHqCxtyVxn3axEmBbRK_PtXV9k9DvYQM5pXhvWAZI4-XJQ4_j6fyThjb8YS_N5Fts5-KGMBRM65DE';
                  }}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-body-sm text-on-surface">
                  © 2025 Federal University of Lafia Security Directorate. All rights reserved. Motto: Integrity, Innovation, Excellence
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  Permanent Campus: Lafia-Awe Road, PMB 146, Lafia, Nasarawa State, Nigeria.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-body-sm text-on-surface-variant">
              <button onClick={() => setIsBroadcastOpen(true)} className="hover:text-on-surface transition-colors">
                Emergency Dispatch
              </button>
              <span className="text-outline-variant">•</span>
              <button onClick={() => setShowSecurityProtocols(true)} className="hover:text-on-surface transition-colors">
                Reporting Policy
              </button>
              <span className="text-outline-variant">•</span>
              <button onClick={() => setShowSecurityProtocols(true)} className="hover:text-on-surface transition-colors">
                Chain of Custody Protocol
              </button>
              <span className="text-outline-variant">•</span>
              <button onClick={onSwitchToPublic} className="hover:text-on-surface transition-colors">
                Staff &amp; Student Portal
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter-mobile md:hidden bg-surface-container-lowest border-t border-outline-variant shadow-lg"
      >
        <button
          onClick={() => setActiveTab('triage')}
          className={`flex flex-col items-center justify-center px-3 py-1.5 transition-all ${
            activeTab === 'triage' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-label-sm">Home</span>
        </button>

        <button
          onClick={() => setIsFileModalOpen(true)}
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1.5 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">report_problem</span>
          <span className="text-label-sm">Report</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center px-3 py-1.5 transition-all ${
            activeTab === 'feed' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">timeline</span>
          <span className="text-label-sm">Track</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`flex flex-col items-center justify-center px-3 py-1.5 transition-all ${
            activeTab === 'directory' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">emergency</span>
          <span className="text-label-sm">Contacts</span>
        </button>
      </nav>

      {/* MODALS */}
      <BroadcastAlertModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onBroadcast={onBroadcast}
      />

      <FileIncidentModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        onAddIncident={handleAddNewIncident}
      />

      <DossierModal
        incident={dossierIncident}
        onClose={() => setDossierIncident(null)}
      />

      <EvidenceLightboxModal
        evidence={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />

      {/* Security Protocols Modal */}
      {showSecurityProtocols && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 border border-outline-variant shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <h3 className="font-bold text-title-md text-on-surface">FULafia Security Directives &amp; Protocols</h3>
              <button
                onClick={() => setShowSecurityProtocols(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="text-body-sm text-on-surface-variant space-y-2">
              <p>
                <strong>Tier 1 Inspection Protocol:</strong> Mandatory search of vehicle trunks and bags at all gates after 21:00 hours.
              </p>
              <p>
                <strong>Whistleblower Charter:</strong> Zero telemetry or identifying metadata is archived for reports tagged 100% anonymous.
              </p>
              <p>
                <strong>Chain of Custody:</strong> All digital photo and CCTV extractions must be cryptographically verified prior to disciplinary hearings.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSecurityProtocols(false)}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
