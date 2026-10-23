import React, { useState } from 'react';
import { IncidentRecord, CampusSector, PriorityLevel, IncidentStatus, EvidenceItem } from '../../types';

interface IncidentTriageViewProps {
  incidents: IncidentRecord[];
  selectedIncident: IncidentRecord;
  onSelectIncident: (incident: IncidentRecord) => void;
  onUpdateRemarks: (incidentId: string, remarks: string) => void;
  onOpenDossier: (incident: IncidentRecord) => void;
  onOpenEvidence: (evidence: EvidenceItem) => void;
  onEscalate: (incidentId: string) => void;
  onAssignPatrol: (incident: IncidentRecord) => void;
  activeSector: CampusSector;
  setActiveSector: (sector: CampusSector) => void;
}

export const IncidentTriageView: React.FC<IncidentTriageViewProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
  onUpdateRemarks,
  onOpenDossier,
  onOpenEvidence,
  onEscalate,
  onAssignPatrol,
  activeSector,
  setActiveSector,
}) => {
  // Filters
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [remarksDraft, setRemarksDraft] = useState(selectedIncident.officerRemarks);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  // Sync draft when selected incident changes
  React.useEffect(() => {
    setRemarksDraft(selectedIncident.officerRemarks);
  }, [selectedIncident.id, selectedIncident.officerRemarks]);

  // Handle remarks update
  const handleSaveRemarks = () => {
    onUpdateRemarks(selectedIncident.id, remarksDraft);
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  // Filtered incidents
  const filteredIncidents = incidents.filter((item) => {
    if (activeSector !== 'All Sectors' && item.campusSector !== activeSector) return false;
    if (filterType !== 'All' && !item.type.toLowerCase().includes(filterType.toLowerCase())) return false;
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (filterLocation !== 'All' && !item.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    return true;
  });

  const resetFilters = () => {
    setFilterType('All');
    setFilterStatus('All');
    setFilterLocation('All');
    setActiveSector('All Sectors');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Report ID', 'Type', 'Location', 'Sector', 'Timestamp', 'Reporter', 'Priority', 'Status', 'Subject'];
    const rows = filteredIncidents.map((inc) => [
      inc.id,
      `"${inc.type}"`,
      `"${inc.location}"`,
      `"${inc.campusSector}"`,
      `"${inc.timestamp}"`,
      `"${inc.reporterName}"`,
      inc.priority,
      `"${inc.status}"`,
      `"${inc.subject.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FULafia_Incident_Matrix_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Priority color tags
  const renderPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-error-container text-on-error-container border border-error/30">Critical</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-error-container text-on-error-container border border-error/30">High</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">Medium</span>;
      case 'Low':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">Low</span>;
      default:
        return null;
    }
  };

  // Status color tags
  const renderStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'Under Investigation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-fixed text-on-primary-fixed border border-primary/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Under Investigation
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-highest text-on-surface-variant border border-outline-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
            Pending
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed-dim/40 text-tertiary border border-tertiary/30">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            Resolved
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-container text-secondary">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* DASHBOARD HEADING & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-headline-md font-bold text-on-surface tracking-tight">
              Command Dispatch &amp; Triage Matrix
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> SYSTEM ONLINE
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Real-time surveillance, threat response, and student/staff incident docket oversight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-outline-variant p-0.5 bg-surface-container-low text-body-sm">
            {(['All Sectors', 'Permanent Campus', 'Take-off Site'] as const).map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-3 py-1.5 rounded-md text-label-md transition-colors ${
                  activeSector === sector
                    ? 'bg-surface-container-lowest font-semibold text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              // Simulated live pulse
              setIsSavedFeedback(true);
              setTimeout(() => setIsSavedFeedback(false), 800);
            }}
            className="p-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Refresh Live Data"
            aria-label="Refresh Live Data"
          >
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>

      {/* 1. TOP KPI SUMMARY METRICS (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: New Reports (Today) */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/50 shadow-xs flex items-start justify-between">
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">New Reports (Today)</p>
            <h3 className="text-display-lg font-bold text-on-surface mt-2">
              {incidents.filter((i) => i.timestamp.includes('Today')).length || 7}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-label-sm text-primary font-bold">
              <span className="material-symbols-outlined text-sm">crisis_alert</span>
              <span>+2 in last hour</span>
            </div>
          </div>
          <span className="p-2.5 rounded-xl bg-primary-fixed text-on-primary-fixed border border-primary/20">
            <span className="material-symbols-outlined text-2xl">pending_actions</span>
          </span>
        </div>

        {/* Metric 2: Under Investigation */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/50 shadow-xs flex items-start justify-between">
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Under Investigation</p>
            <h3 className="text-display-lg font-bold text-on-surface mt-2">
              {incidents.filter((i) => i.status === 'Under Investigation').length || 14}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">assignment_ind</span>
              <span>8 Lead Investigators Assigned</span>
            </div>
          </div>
          <span className="p-2.5 rounded-xl bg-surface-container text-primary border border-outline-variant/40">
            <span className="material-symbols-outlined text-2xl">policy</span>
          </span>
        </div>

        {/* Metric 3: Resolved Cases */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/50 shadow-xs flex items-start justify-between">
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Resolved Cases</p>
            <h3 className="text-display-lg font-bold text-tertiary mt-2">86</h3>
            <div className="flex items-center gap-1.5 mt-2 text-label-sm text-tertiary font-bold">
              <span className="material-symbols-outlined text-sm">task_alt</span>
              <span>94.2% Closure Rate (This Session)</span>
            </div>
          </div>
          <span className="p-2.5 rounded-xl bg-tertiary-fixed-dim/30 text-tertiary border border-tertiary/20">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </span>
        </div>

        {/* Metric 4: Active Patrol Units */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/50 shadow-xs flex items-start justify-between">
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Active Patrol Units</p>
            <h3 className="text-display-lg font-bold text-on-surface mt-2">5</h3>
            <div className="flex items-center gap-1.5 mt-2 text-label-sm text-on-surface-variant">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
              <span>3 Perm Site • 2 Take-off Site</span>
            </div>
          </div>
          <span className="p-2.5 rounded-xl bg-surface-container text-on-surface-variant border border-outline-variant/40">
            <span className="material-symbols-outlined text-2xl">directions_car</span>
          </span>
        </div>
      </div>

      {/* TWO-COLUMN SECTION: MAIN TRIAGE TABLE (LEFT) + CASE DETAIL DRAWER PREVIEW (RIGHT) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* 2. REAL-TIME INCIDENT TABLE & FILTER CONTROLS (8 COLS) */}
        <section
          aria-label="Incident Triage Table"
          className="xl:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-xs overflow-hidden flex flex-col"
        >
          {/* Filter Bar */}
          <div className="p-4 border-b border-outline-variant/60 flex flex-wrap items-center justify-between gap-3 bg-surface-container-low/40">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-label-md text-on-surface-variant uppercase font-bold mr-1">Filter by:</span>

              {/* Filter Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg py-1.5 px-2.5 text-on-surface focus:border-primary focus:ring-0"
              >
                <option value="All">Incident Type: All</option>
                <option value="Theft">Theft &amp; Burglary</option>
                <option value="Conflict">Assault / Conflict</option>
                <option value="Harassment">Harassment</option>
                <option value="Vandalism">Vandalism</option>
                <option value="Suspicious">Suspicious Activity</option>
              </select>

              {/* Filter Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg py-1.5 px-2.5 text-on-surface focus:border-primary focus:ring-0"
              >
                <option value="All">Status: All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Campus Location */}
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="text-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg py-1.5 px-2.5 text-on-surface focus:border-primary focus:ring-0"
              >
                <option value="All">Location: All Sectors</option>
                <option value="Library">Main Campus Library</option>
                <option value="Hostel">Hostel Complexes</option>
                <option value="Computing">Faculty of Computing Lab</option>
                <option value="Perimeter">Gate &amp; Perimeter</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Student Union">Student Union Building</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetFilters}
                className="text-label-md text-primary hover:underline px-2 py-1 font-semibold"
              >
                Reset
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-variant text-on-surface text-label-md rounded-lg border border-outline-variant/50 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">file_download</span>
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/60 bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Reporter</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 text-body-sm">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-on-surface-variant">
                      No incidents match current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident) => {
                    const isSelected = selectedIncident.id === incident.id;
                    return (
                      <tr
                        key={incident.id}
                        onClick={() => onSelectIncident(incident)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-primary-fixed/20 hover:bg-primary-fixed/30 border-l-4 border-l-primary'
                            : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <td className="py-3 px-4 font-bold text-label-md text-primary flex items-center gap-1.5">
                          <span
                            className={`material-symbols-outlined text-sm ${
                              isSelected ? 'text-primary' : 'text-outline-variant'
                            }`}
                          >
                            {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                          </span>
                          <span>{incident.id}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-on-surface">{incident.type}</td>
                        <td className="py-3 px-4 text-on-surface-variant max-w-[160px] truncate" title={incident.location}>
                          {incident.location}
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant font-mono text-xs">{incident.timestamp}</td>
                        <td className="py-3 px-4 text-on-surface">
                          <div className="font-medium">{incident.reporterName}</div>
                          {incident.reporterId && (
                            <div className="text-[11px] text-on-surface-variant font-mono">{incident.reporterId}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">{renderPriorityBadge(incident.priority)}</td>
                        <td className="py-3 px-4">{renderStatusBadge(incident.status)}</td>
                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onSelectIncident(incident)}
                              className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                              title="Review Case Docket"
                              aria-label="Review Case Docket"
                            >
                              <span className="material-symbols-outlined text-lg">visibility</span>
                            </button>
                            <button
                              onClick={() => onAssignPatrol(incident)}
                              className="p-1.5 text-on-surface-variant hover:bg-surface-variant rounded-md transition-colors"
                              title="Assign Patrol"
                              aria-label="Assign Patrol"
                            >
                              <span className="material-symbols-outlined text-lg">local_police</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="p-3 border-t border-outline-variant/60 flex items-center justify-between text-body-sm text-on-surface-variant bg-surface-container-low/20">
            <span>
              Showing <strong>1-{filteredIncidents.length}</strong> of <strong>107</strong> logged records
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="px-2.5 py-1 rounded border border-outline-variant text-on-surface-variant disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-2.5 py-1 rounded font-bold ${
                  currentPage === 1 ? 'bg-primary text-on-primary' : 'border border-outline-variant'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`px-2.5 py-1 rounded ${
                  currentPage === 2 ? 'bg-primary text-on-primary font-bold' : 'border border-outline-variant hover:bg-surface-container'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`px-2.5 py-1 rounded ${
                  currentPage === 3 ? 'bg-primary text-on-primary font-bold' : 'border border-outline-variant hover:bg-surface-container'
                }`}
              >
                3
              </button>
              <button
                disabled={currentPage === 3}
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                className="px-2.5 py-1 rounded border border-outline-variant hover:bg-surface-container"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        {/* 4. QUICK CASE DETAIL DRAWER PREVIEW (4 COLS) */}
        <aside
          aria-label="Case Detail Docket Preview"
          className="xl:col-span-4 bg-surface-container-lowest rounded-xl border-2 border-primary/40 shadow-md p-5 flex flex-col space-y-4"
        >
          {/* Header with Docket ID & Badges */}
          <div className="flex items-start justify-between border-b border-outline-variant/60 pb-3">
            <div>
              <span className="text-label-sm uppercase font-bold text-primary tracking-wider">Active Docket Review</span>
              <h3 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span>{selectedIncident.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                  selectedIncident.priority === 'Critical' ? 'bg-error-container text-on-error-container' :
                  selectedIncident.priority === 'High' ? 'bg-error-container text-on-error-container' :
                  'bg-secondary-container text-on-secondary-container'
                }`}>
                  {selectedIncident.priority}
                </span>
              </h3>
            </div>
            <button
              onClick={() => onOpenDossier(selectedIncident)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
              title="Open Full Dossier View"
              aria-label="Open Full Dossier View"
            >
              <span className="material-symbols-outlined">open_in_new</span>
            </button>
          </div>

          {/* Case Summary Details */}
          <div className="space-y-3">
            <div>
              <h4 className="text-label-md text-on-surface-variant font-medium">Incident Subject</h4>
              <p className="text-body-md font-bold text-on-surface mt-0.5">{selectedIncident.subject}</p>
            </div>

            {/* Location & Map Coordinate Pin */}
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/50 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">pin_drop</span>
              <div className="text-body-sm">
                <div className="font-bold text-on-surface">{selectedIncident.location}</div>
                <div className="text-on-surface-variant">{selectedIncident.campusSector} • Sector C South Block</div>
                <div className="text-[11px] font-mono text-outline mt-0.5">{selectedIncident.coordinates}</div>
              </div>
            </div>

            {/* Reporter Meta */}
            <div className="grid grid-cols-2 gap-3 text-body-sm py-1 border-y border-outline-variant/40">
              <div>
                <span className="text-on-surface-variant text-label-sm">Reporter:</span>
                <div className="font-semibold text-on-surface">{selectedIncident.reporterName}</div>
                <div className="text-xs text-on-surface-variant font-mono">
                  {selectedIncident.reporterId ? `Matric: ${selectedIncident.reporterId}` : '100% Anonymous'}
                </div>
              </div>
              <div>
                <span className="text-on-surface-variant text-label-sm">Assigned Lead:</span>
                <div className="font-semibold text-on-surface">{selectedIncident.assignedLead}</div>
                <div className="text-xs text-primary font-medium">{selectedIncident.assignedTeam}</div>
              </div>
            </div>

            {/* Uploaded Photo Evidence */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-label-md font-semibold text-on-surface">
                  Uploaded Photo Evidence ({selectedIncident.evidence.length})
                </span>
                <span className="text-label-sm text-outline">Verified Chain of Custody</span>
              </div>

              {selectedIncident.evidence.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {selectedIncident.evidence.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onOpenEvidence(ev)}
                      className="relative rounded-lg overflow-hidden border border-outline-variant group bg-surface-container-high h-24 cursor-pointer hover:border-primary transition-all"
                    >
                      <img
                        src={ev.url}
                        alt={ev.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <span className="absolute bottom-1 left-1 bg-inverse-surface/80 text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded font-mono">
                        {ev.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-surface-container-low rounded-lg border border-dashed border-outline-variant text-center text-xs text-on-surface-variant">
                  No digital media attached to this preliminary report.
                </div>
              )}
            </div>

            {/* Officer Remarks Box */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="officer-remarks">
                  Duty Officer Investigation Remarks
                </label>
                {isSavedFeedback && (
                  <span className="text-xs text-tertiary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check</span> Saved
                  </span>
                )}
              </div>
              <textarea
                id="officer-remarks"
                rows={3}
                value={remarksDraft}
                onChange={(e) => setRemarksDraft(e.target.value)}
                placeholder="Enter findings, serial number checks, or dispatch instructions..."
                className="w-full text-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
              />
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleSaveRemarks}
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-container text-on-primary font-label-lg rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                <span>Update &amp; Notify Reporter</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenDossier(selectedIncident)}
                  className="flex-1 py-1.5 px-3 border border-outline-variant rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Print Dossier</span>
                </button>
                <button
                  onClick={() => onEscalate(selectedIncident.id)}
                  className="flex-1 py-1.5 px-3 border border-error/40 rounded-lg text-error hover:bg-error-container/30 font-label-md transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Escalate Case</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. EMBEDDED ANALYTICS & ACTIVITY FEED (BENTO SPLIT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Incidents by Category & 7-Day Trend (7 Cols) */}
        <section
          aria-label="Incident Analytics"
          className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/50 p-5 shadow-xs space-y-5"
        >
          <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
            <div>
              <h3 className="text-title-md font-bold text-on-surface">Category Breakdown &amp; 7-Day Trend</h3>
              <p className="text-body-sm text-on-surface-variant">
                Cumulative monthly distribution across academic faculties and hostels.
              </p>
            </div>
            <div className="flex items-center gap-1 text-label-sm text-outline">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>October 2025</span>
            </div>
          </div>

          {/* Bento Bar Metrics Visual Representation */}
          <div className="space-y-3.5">
            {/* Item 1: Theft */}
            <div>
              <div className="flex justify-between text-body-sm mb-1">
                <span className="font-medium text-on-surface">Theft &amp; Personal Property (38%)</span>
                <span className="font-bold text-primary">41 Incidents</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
              </div>
            </div>

            {/* Item 2: Harassment / Conflict */}
            <div>
              <div className="flex justify-between text-body-sm mb-1">
                <span className="font-medium text-on-surface">Disputes &amp; Harassment (27%)</span>
                <span className="font-bold text-primary-container">29 Incidents</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: '27%' }}></div>
              </div>
            </div>

            {/* Item 3: Suspicious Activity */}
            <div>
              <div className="flex justify-between text-body-sm mb-1">
                <span className="font-medium text-on-surface">Perimeter Suspicious Activity (21%)</span>
                <span className="font-bold text-outline">23 Incidents</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-outline h-full rounded-full transition-all duration-500" style={{ width: '21%' }}></div>
              </div>
            </div>

            {/* Item 4: Vandalism */}
            <div>
              <div className="flex justify-between text-body-sm mb-1">
                <span className="font-medium text-on-surface">Property Vandalism / Infrastructure (14%)</span>
                <span className="font-bold text-tertiary">14 Incidents</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>

          {/* 7-Day Trend Chart Representation */}
          <div className="pt-3 border-t border-outline-variant/40">
            <div className="flex items-center justify-between text-label-sm text-on-surface-variant mb-2">
              <span className="font-bold uppercase tracking-wider">Weekly Incident Velocity</span>
              <span className="text-tertiary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                12% decrease vs prior week
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 items-end h-28 pt-4 px-2 bg-surface-container-low rounded-lg border border-outline-variant/30 text-center text-[11px]">
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-primary/70 group-hover:bg-primary rounded-t transition-all" style={{ height: '45%' }}></div>
                <span className="text-on-surface-variant">Mon</span>
              </div>
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-primary/70 group-hover:bg-primary rounded-t transition-all" style={{ height: '60%' }}></div>
                <span className="text-on-surface-variant">Tue</span>
              </div>
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-primary/70 group-hover:bg-primary rounded-t transition-all" style={{ height: '80%' }}></div>
                <span className="text-on-surface-variant">Wed</span>
              </div>
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-primary/70 group-hover:bg-primary rounded-t transition-all" style={{ height: '50%' }}></div>
                <span className="text-on-surface-variant">Thu</span>
              </div>
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-primary/70 group-hover:bg-primary rounded-t transition-all" style={{ height: '70%' }}></div>
                <span className="text-on-surface-variant">Fri</span>
              </div>
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-error/70 group-hover:bg-error rounded-t transition-all" style={{ height: '90%' }}></div>
                <span className="text-on-surface-variant font-bold">Sat</span>
              </div>
              <div className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full bg-primary rounded-t transition-all" style={{ height: '35%' }}></div>
                <span className="text-on-surface font-bold text-primary">Sun</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Live Dispatch & Status Updates Timeline (5 Cols) */}
        <section
          aria-label="Dispatch Timeline"
          className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant/50 p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history_toggle_off</span>
                <h3 className="text-title-md font-bold text-on-surface">Live Dispatch Feed</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed">
                AUTO-STREAM
              </span>
            </div>

            {/* Timeline Events */}
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/50">
              {/* Event 1 */}
              <div className="flex items-start gap-3 relative pl-1">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 z-10 shadow-xs">
                  <span className="material-symbols-outlined text-xs">directions_car</span>
                </span>
                <div className="flex-1 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-body-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Patrol Unit 02 En Route</span>
                    <span className="text-[10px] font-mono text-outline">10:22 AM</span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Dispatched to Faculty of Computing Lab. Investigating Officer: S. Yakubu.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-3 relative pl-1">
                <span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 z-10 shadow-xs">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                </span>
                <div className="flex-1 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-body-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Case FUL-2025-0478 Resolved</span>
                    <span className="text-[10px] font-mono text-outline">09:55 AM</span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Auditorium damaged lighting reported fixed and restitution signed by department.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-3 relative pl-1">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 z-10 shadow-xs">
                  <span className="material-symbols-outlined text-xs">upload_file</span>
                </span>
                <div className="flex-1 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-body-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Evidence File Appended</span>
                    <span className="text-[10px] font-mono text-outline">09:12 AM</span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    2 CCTV files uploaded for Gate 2 Perimeter surveillance scan.
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="flex items-start gap-3 relative pl-1">
                <span className="w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 z-10 shadow-xs">
                  <span className="material-symbols-outlined text-xs">notification_important</span>
                </span>
                <div className="flex-1 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-body-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-error">New SOS Panic Beacon</span>
                    <span className="text-[10px] font-mono text-outline">08:44 AM</span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Test ping verified by Student Affairs Warden desk at Perm Site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dispatch Note */}
          <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-label-sm">
            <span className="text-on-surface-variant">
              Active Personnel on Radio: <strong>19 Officers</strong>
            </span>
            <span className="text-primary font-semibold">Radio Net Alpha • Ch 04</span>
          </div>
        </section>
      </div>
    </div>
  );
};
