import React, { useState } from 'react';

export const FileIncidentModal = ({ isOpen, onClose, onAddIncident }) => {
  const [type, setType] = useState('Theft');
  const [campusSector, setCampusSector] = useState('Permanent Campus');
  const [location, setLocation] = useState('Faculty of Computing Lab');
  const [priority, setPriority] = useState('High');
  const [reporterName, setReporterName] = useState('');
  const [reporterId, setReporterId] = useState('');
  const [subject, setSubject] = useState('');
  const [narrative, setNarrative] = useState('');
  const [assignedLead, setAssignedLead] = useState('Insp. S. Yakubu');
  const [assignedTeam, setAssignedTeam] = useState('Patrol Team 2');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !narrative.trim()) return;

    const newIdNum = Math.floor(483 + Math.random() * 50);
    const newId = `FUL-2025-0${newIdNum}`;
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();

    const newIncident = {
      id: newId,
      type,
      location: `${location} • ${campusSector === 'Permanent Campus' ? 'Perm Site' : 'Take-off Site'}`,
      campusSector,
      timestamp: 'Today, Just now',
      filedDateFormatted: '24 Oct 2025',
      reporterName: reporterName.trim() || 'Anonymous (Desk Report)',
      reporterId: reporterId.trim() || undefined,
      isAnonymous: !reporterName.trim(),
      priority,
      status: 'Under Investigation',
      subject,
      narrative,
      assignedLead,
      assignedTeam,
      coordinates: campusSector === 'Permanent Campus' ? 'GPS: 8.4872° N, 8.5218° E (Lafia)' : 'GPS: 8.4912° N, 8.5140° E (Akunza)',
      evidence: [],
      officerRemarks: `Docket opened by Officer I. Danladi. Field unit ${assignedTeam} tasked for verification.`,
      verificationPin: newPin,
      timeline: [
        {
          step: 1,
          title: '1. Submitted',
          timestamp: 'Today, Just now',
          description: 'Formal police incident registered at Security Directorate Desk.',
          isDone: true
        },
        {
          step: 2,
          title: '2. Under Review',
          timestamp: 'Today, Just now',
          description: `Priority assigned: ${priority}. Assigned Lead: ${assignedLead}.`,
          isDone: true
        },
        {
          step: 3,
          title: '3. Under Investigation',
          timestamp: 'Active Now',
          description: 'Tactical unit dispatched to scene.',
          remark: `Initial docket opened. Lead officer: ${assignedLead}.`,
          isDone: false,
          isCurrent: true
        },
        {
          step: 4,
          title: '4. Resolved',
          timestamp: 'Pending',
          description: 'Investigation outcome and final case sign-off.',
          isDone: false
        }
      ]
    };

    onAddIncident(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-surface-container-lowest border border-outline-variant max-w-2xl w-full rounded-2xl shadow-2xl my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">add_moderator</span>
            <div>
              <h3 className="font-bold text-title-md">File Formal Incident Docket</h3>
              <p className="text-body-sm opacity-90">Directorate Security Command Entry Form</p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-inc-type" className="block text-label-md font-semibold text-on-surface mb-1">Incident Type *</label>
              <select
                id="modal-inc-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              >
                <option value="Theft">Theft & Burglary</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
                <option value="Harassment">Harassment / Extortion</option>
                <option value="Vandalism">Property Vandalism</option>
                <option value="Dispute / Conflict">Dispute / Conflict</option>
                <option value="Trespass">Campus Trespass</option>
                <option value="Medical">Medical Emergency</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-priority" className="block text-label-md font-semibold text-on-surface mb-1">Priority Level *</label>
              <select
                id="modal-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              >
                <option value="Critical">Critical (Immediate Dispatch)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low / Administrative</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-campus-sector" className="block text-label-md font-semibold text-on-surface mb-1">Campus Sector *</label>
              <select
                id="modal-campus-sector"
                value={campusSector}
                onChange={(e) => setCampusSector(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              >
                <option value="Permanent Campus">Permanent Campus (Makurdi Road)</option>
                <option value="Take-off Site">Take-off Site (Akunza)</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-location" className="block text-label-md font-semibold text-on-surface mb-1">Specific Location / Room *</label>
              <input
                id="modal-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Science Complex, Lab 4, Gate 1..."
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-reporter-name" className="block text-label-md font-semibold text-on-surface mb-1">Reporter Name (Optional)</label>
              <input
                id="modal-reporter-name"
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Leave blank for Anonymous"
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="modal-reporter-id" className="block text-label-md font-semibold text-on-surface mb-1">Matric / Staff ID</label>
              <input
                id="modal-reporter-id"
                type="text"
                value={reporterId}
                onChange={(e) => setReporterId(e.target.value)}
                placeholder="e.g. SCI/21/043 or Staff #102"
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="modal-subject" className="block text-label-md font-semibold text-on-surface mb-1">Incident Subject / Brief Headline *</label>
            <input
              id="modal-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Unlawful entry and suspected theft of electronics"
              className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="modal-narrative" className="block text-label-md font-semibold text-on-surface mb-1">Detailed Operational Narrative *</label>
            <textarea
              id="modal-narrative"
              rows={3}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Describe witness accounts, suspect descriptions, missing items, or physical evidence found..."
              className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-assigned-lead" className="block text-label-md font-semibold text-on-surface mb-1">Assign Lead Officer</label>
              <select
                id="modal-assigned-lead"
                value={assignedLead}
                onChange={(e) => setAssignedLead(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              >
                <option value="Insp. S. Yakubu">Insp. S. Yakubu (Investigation)</option>
                <option value="Sgt. B. Oche">Sgt. B. Oche (Perimeter)</option>
                <option value="Insp. H. Bello">Insp. H. Bello (Hostels)</option>
                <option value="Officer T. Usman">Officer T. Usman (Take-off)</option>
                <option value="Officer I. Danladi">Officer I. Danladi (Duty Commander)</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-assigned-team" className="block text-label-md font-semibold text-on-surface mb-1">Assigned Patrol Team</label>
              <select
                id="modal-assigned-team"
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-primary focus:outline-none"
              >
                <option value="Patrol Team 2">Patrol Team 2 (Academic Blocks)</option>
                <option value="Patrol Team 1">Patrol Team 1 (Perimeter & Gates)</option>
                <option value="Hostel Rapid Response">Hostel Rapid Response</option>
                <option value="Take-off Mobile Unit">Take-off Mobile Unit</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface font-label-md hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary hover:bg-primary-container text-on-primary font-label-md font-bold rounded-lg shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Register & Assign Docket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
