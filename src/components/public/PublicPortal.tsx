import React, { useState } from 'react';
import { IncidentRecord } from '../../types';
import { DossierModal } from '../modals/DossierModal';

interface PublicPortalProps {
  incidents: IncidentRecord[];
  onAddIncident: (incident: IncidentRecord) => void;
  onSwitchToCommand: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({
  incidents,
  onAddIncident,
  onSwitchToCommand,
}) => {
  // Tracker State
  const [trackIdInput, setTrackIdInput] = useState('FUL-2025-0482');
  const [trackPinInput, setTrackPinInput] = useState('7941');
  const [activeTrackedIncident, setActiveTrackedIncident] = useState<IncidentRecord | null>(
    incidents.find((i) => i.id === 'FUL-2025-0482') || incidents[0] || null
  );
  const [trackError, setTrackError] = useState('');
  const [dossierModalIncident, setDossierModalIncident] = useState<IncidentRecord | null>(null);

  // Form State
  const [category, setCategory] = useState('Theft / Burglary / Lost Property');
  const [campusLocation, setCampusLocation] = useState('Permanent Site (Main Campus - Makurdi Road)');
  const [dateTime, setDateTime] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('');
  const [reporterId, setReporterId] = useState('');
  const [narrative, setNarrative] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [submissionReceipt, setSubmissionReceipt] = useState<{ id: string; pin: string } | null>(null);

  // Handle Track Lookup
  const handleVerifyStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError('');
    const cleanId = trackIdInput.trim().toUpperCase();
    const found = incidents.find((i) => i.id.toUpperCase() === cleanId);

    if (found) {
      setActiveTrackedIncident(found);
    } else {
      setTrackError(`Report ID "${cleanId}" was not found. Please verify the ID or check with the Directorate.`);
    }
  };

  // Handle File Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Handle Report Form Submit
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!narrative.trim()) {
      alert('Please provide an incident narrative description before submitting.');
      return;
    }

    const newIdNum = Math.floor(483 + Math.random() * 50);
    const newId = `FUL-2025-0${newIdNum}`;
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    const isPerm = campusLocation.includes('Permanent');

    const newIncident: IncidentRecord = {
      id: newId,
      type: category.split('/')[0].trim(),
      location: `${campusLocation.split('(')[0].trim()}`,
      campusSector: isPerm ? 'Permanent Campus' : 'Take-off Site',
      timestamp: 'Today, Just now',
      filedDateFormatted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      reporterName: isAnonymous ? 'Anonymous Whistleblower' : reporterName.trim() || 'Student / Staff',
      reporterId: isAnonymous ? undefined : reporterId.trim() || undefined,
      isAnonymous,
      priority: category.includes('Theft') || category.includes('Harassment') ? 'High' : 'Medium',
      status: 'Pending',
      subject: `${category.split('/')[0].trim()} Incident Report at ${campusLocation.split('(')[0].trim()}`,
      narrative: narrative.trim(),
      assignedLead: 'Central Triage Desk',
      assignedTeam: isPerm ? 'Perm Site Security Division' : 'Take-off Security Division',
      coordinates: isPerm ? 'GPS: 8.4872° N, 8.5218° E' : 'GPS: 8.4912° N, 8.5140° E',
      evidence: uploadedFiles.map((f, idx) => ({
        id: `ev-up-${idx}`,
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNlMOBr-Pibi5s2dDcwzkfCnfJqhIAY6WLDY1IG3TNeB2LmafqacOVyMw8bJMkxplBJ4Cedl2j1fnGUzYbp_s2eX7ZifMTELwmDeQgV-vUx3HfLjIXIc8Yt5FHocyLB5AOkhBpwcFo7n-2J-4VLWHDLMFxk52648o7jY_LfUBZ3Rn40bGpv5WAooZ1IDqMnC_uB87UVPx9NoA4-dqiqnyGzlnzHWVzQbqP__FgMLAf1T0aamGFYwKAzg',
        label: f.name,
        alt: `Evidence upload: ${f.name}`,
      })),
      officerRemarks: 'Docket registered via Public Portal. Awaiting preliminary assessment by Shift Duty Commander.',
      verificationPin: newPin,
      timeline: [
        {
          step: 1,
          title: '1. Submitted',
          timestamp: 'Just now',
          description: 'Report logged via Online Public Portal. Encrypted reference ID generated and evidence package attached.',
          isDone: true,
        },
        {
          step: 2,
          title: '2. Under Review',
          timestamp: 'Pending',
          description: 'Triage team reviewing priority level and dispatch allocation.',
          isDone: false,
          isCurrent: true,
        },
        {
          step: 3,
          title: '3. Under Investigation',
          timestamp: 'Pending',
          description: 'Investigating officer dispatched for field interview & assessment.',
          isDone: false,
        },
        {
          step: 4,
          title: '4. Resolved',
          timestamp: 'Pending',
          description: 'Formal incident conclusion and safety report.',
          isDone: false,
        },
      ],
    };

    onAddIncident(newIncident);
    setSubmissionReceipt({ id: newId, pin: newPin });
    setTrackIdInput(newId);
    setTrackPinInput(newPin);
    setActiveTrackedIncident(newIncident);

    // Scroll smoothly to receipt/tracker
    const trackElem = document.getElementById('track-case');
    if (trackElem) {
      trackElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setCategory('Theft / Burglary / Lost Property');
    setCampusLocation('Permanent Site (Main Campus - Makurdi Road)');
    setDateTime('');
    setIsAnonymous(true);
    setReporterName('');
    setReporterId('');
    setNarrative('');
    setUploadedFiles([]);
  };

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col font-body-md text-body-md">
      {/* Level 4 Critical Emergency Banner */}
      <aside aria-label="Emergency Hotline Banner" className="w-full bg-[#8B1A1A] text-on-primary py-2.5 px-gutter shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-bold tracking-wide uppercase text-white text-label-lg">
              FULafia Security Unit 24/7 Hotline:
            </span>
            <a className="font-bold text-primary-fixed hover:underline text-label-lg" href="tel:+2348031234567">
              +234 803 123 4567
            </a>
          </div>
          <div className="flex items-center gap-2 text-label-md text-surface-bright">
            <span className="opacity-80">Quick SMS / WhatsApp SOS:</span>
            <a
              className="font-bold underline text-surface-container-lowest hover:text-primary-fixed"
              href="https://wa.me/2348129876543"
              target="_blank"
              rel="noreferrer"
            >
              +234 812 987 6543
            </a>
          </div>
        </div>
      </aside>

      {/* Top Navigation Bar */}
      <header className="w-full sticky top-0 z-40 px-gutter flex justify-between items-center h-16 bg-surface-container-lowest border-b border-outline-variant shadow-xs">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Crest & Brand Title */}
          <a className="flex items-center gap-3 group" href="#public-portal">
            <img
              alt="Federal University of Lafia Security Crest"
              className="h-11 w-11 object-contain transition-transform group-hover:scale-105 duration-150"
              src="/assets/aistudio/Image_1_fa4d251d.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj6UHLsud92YrLfNClbJuhphZMqUiqW6-eQqq-ASh-zQj28s7A_GbZ822Tai_lNH0JJxnP7jdjSIyzY1Y-Kgg6AKVGeV62pir00_4iJw3BknrOAmPcIbAmrYKv3Zc88fOiFzrjZudhoc0YqOnmGGL6U7bsIxll7bkFjPGkfpCSYaHQ2HE_70_QOXHqCxtyVxn3axEmBbRK_PtXV9k9DvYQM5pXhvWAZI4-XJQ4_j6fyThjb8YS_N5Fts5-KGMBRM65DE';
              }}
            />
            <div className="flex flex-col">
              <span className="text-title-md font-bold text-on-surface tracking-tight leading-snug">
                Federal University of Lafia Crime Incident Portal
              </span>
              <span className="text-label-sm text-outline tracking-wider">
                Integrity, Innovation, Excellence
              </span>
            </div>
          </a>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6 h-16">
            <a
              className="h-full flex items-center px-1 border-b-2 border-primary text-primary font-semibold text-label-lg transition-colors"
              href="#public-portal"
            >
              Public Portal
            </a>
            <a
              className="h-full flex items-center px-1 text-on-surface-variant hover:text-on-surface text-label-lg transition-colors hover:border-b-2 hover:border-outline-variant"
              href="#emergency-sos"
            >
              Emergency SOS
            </a>
            <a
              className="h-full flex items-center px-1 text-on-surface-variant hover:text-on-surface text-label-lg transition-colors hover:border-b-2 hover:border-outline-variant"
              href="#track-case"
            >
              Track Case
            </a>
            <button
              onClick={onSwitchToCommand}
              className="h-full flex items-center px-1 text-on-surface-variant hover:text-primary text-label-lg font-semibold transition-colors hover:border-b-2 hover:border-primary"
            >
              Officer Login
            </button>
          </nav>

          {/* Action Cluster */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Officer Command Center"
              onClick={onSwitchToCommand}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-surface-container-low text-primary hover:bg-surface-container text-label-md font-semibold transition-colors"
              title="Open Officer & Admin Command Dashboard"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Officer Console</span>
            </button>

            <a
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8B1A1A] text-white text-label-md font-bold tracking-wide shadow-sm hover:bg-[#721515] transition-all duration-150 active:scale-95"
              href="tel:+2348031234567"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              Emergency Hotline
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-surface py-16 lg:py-20 border-b border-outline-variant/60 overflow-hidden" id="public-portal">
          <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed border border-primary-container/30">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="text-label-sm uppercase tracking-wider font-bold">
                  Official Directorate of Security Services
                </span>
              </div>
              <h1 className="text-display-lg text-on-surface tracking-tight">Report. Track. Stay Safe.</h1>
              <p className="text-body-lg text-on-surface-variant max-w-2xl">
                Official digital incident management system for students, faculty, and campus visitors. Report crimes securely, attach photo evidence, or submit 100% anonymously.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container text-label-lg font-bold shadow-sm hover:bg-primary transition-all duration-150 active:scale-95"
                  href="#quick-report-form"
                >
                  <span className="material-symbols-outlined text-[20px]">report_problem</span>
                  Report an Incident Now
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest text-on-surface border border-primary/30 text-label-lg font-semibold hover:bg-surface-container hover:border-primary transition-all duration-150 active:scale-95"
                  href="#track-case"
                >
                  <span className="material-symbols-outlined text-[20px]">timeline</span>
                  Track Report Status
                </a>
                <div className="w-full sm:w-auto pt-1 sm:pt-0 sm:pl-2">
                  <button
                    onClick={onSwitchToCommand}
                    className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary text-label-md font-semibold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Officer &amp; Admin Login
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-outline-variant/40 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">enhanced_encryption</span>
                  <span className="text-label-sm text-on-surface-variant font-medium">256-Bit SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">visibility_off</span>
                  <span className="text-label-sm text-on-surface-variant font-medium">Anonymous Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                  <span className="text-label-sm text-on-surface-variant font-medium">&lt; 7 Min Response</span>
                </div>
              </div>
            </div>

            {/* Hero Visual / Live Dispatch Counter Panel */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-space-lg shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="text-title-md font-bold text-on-surface">Campus Command Status</span>
                  </div>
                  <span className="text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/20 font-bold">
                    Patrols Active
                  </span>
                </div>

                {/* Operational Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40">
                    <div className="text-label-sm text-on-surface-variant">Active Mobile Units</div>
                    <div className="text-headline-md font-bold text-on-surface mt-1">08 Units</div>
                    <span className="text-body-sm text-tertiary font-medium">Main &amp; Take-off Campus</span>
                  </div>
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40">
                    <div className="text-label-sm text-on-surface-variant">Avg Emergency Triage</div>
                    <div className="text-headline-md font-bold text-primary mt-1">4.2 min</div>
                    <span className="text-body-sm text-on-surface-variant">Priority 1 Dispatches</span>
                  </div>
                </div>

                {/* Incident Feed Mini-Ticker */}
                <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/40 p-3 space-y-2">
                  <div className="flex items-center justify-between text-label-sm text-outline">
                    <span>RECENT DISPATCH LOG</span>
                    <span className="text-tertiary font-semibold">SECURE TRANSMISSION</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-body-sm p-2 rounded bg-surface-container-low">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                        <span className="text-on-surface font-medium">Take-off Campus Gate</span>
                      </div>
                      <span className="text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                        Patrol Clear
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm p-2 rounded bg-surface-container-low">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-[18px]">lock_reset</span>
                        <span className="text-on-surface font-medium">Science Complex Access</span>
                      </div>
                      <span className="text-label-sm px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/25 font-semibold">
                        Secured
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-body-sm text-on-surface-variant italic">
                    “Discipline, Vigilance, and Swift Response to Protect the FULafia Community.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three-Step Workflow Cards */}
        <section className="py-16 max-w-7xl mx-auto px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-headline-lg text-on-surface tracking-tight">How Public Reporting Works</h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              A confidential, three-tier workflow connecting you directly to campus dispatchers and the Chief Security Officer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary mb-5 border border-primary/20">
                  <span className="material-symbols-outlined text-[26px]">edit_document</span>
                </div>
                <div className="text-label-sm text-primary uppercase font-bold tracking-wider mb-1">Phase 01</div>
                <h3 className="text-headline-sm text-on-surface font-bold mb-3">Step 1: Rapid Incident Report</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Choose incident category (Theft, Threat, Harassment, Medical SOS), capture incident time, specific campus location, and toggle 100% anonymous identity shielding.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between text-label-md text-on-surface-variant">
                <span>Identity Protected</span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary mb-5 border border-primary/20">
                  <span className="material-symbols-outlined text-[26px]">attachment</span>
                </div>
                <div className="text-label-sm text-primary uppercase font-bold tracking-wider mb-1">Phase 02</div>
                <h3 className="text-headline-sm text-on-surface font-bold mb-3">Step 2: Upload Evidence</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Securely upload photographs, audio logs, CCTV snapshots, or document screenshots. All submissions receive instant cryptographic timestamps for chain-of-custody integrity.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between text-label-md text-on-surface-variant">
                <span>Encrypted Storage</span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">lock</span>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary mb-5 border border-primary/20">
                  <span className="material-symbols-outlined text-[26px]">monitoring</span>
                </div>
                <div className="text-label-sm text-primary uppercase font-bold tracking-wider mb-1">Phase 03</div>
                <h3 className="text-headline-sm text-on-surface font-bold mb-3">Step 3: Track &amp; Receive Updates</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Receive a unique Case Reference ID. Follow real-time triage updates, officer assignments, discreet two-way messaging, and case resolution notes without exposing your identity.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between text-label-md text-on-surface-variant">
                <span>Real-time Alerts</span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">update</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Track Status Quick Lookup & Live Preview Section */}
        <section className="py-16 bg-surface-container-low border-y border-outline-variant/50" id="track-case">
          <div className="max-w-7xl mx-auto px-gutter">
            {submissionReceipt && (
              <div className="mb-8 p-4 rounded-xl bg-tertiary-fixed-dim/20 border-2 border-tertiary/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-3xl">check_circle</span>
                  <div>
                    <h4 className="font-bold text-on-surface text-title-md">
                      Official Incident Registered Successfully!
                    </h4>
                    <p className="text-body-sm text-on-surface-variant">
                      Reference ID: <strong className="font-mono text-primary text-base">{submissionReceipt.id}</strong> • Access PIN: <strong className="font-mono text-on-surface">{submissionReceipt.pin}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activeTrackedIncident) setDossierModalIncident(activeTrackedIncident);
                    }}
                    className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary-container transition-colors shadow-xs"
                  >
                    Download Official Slip
                  </button>
                  <button
                    onClick={() => setSubmissionReceipt(null)}
                    className="p-1 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Quick Lookup Form Widget */}
              <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/60 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">search_check</span>
                  <h3 className="text-headline-sm text-on-surface font-bold">Track Status Quick Lookup</h3>
                </div>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Check active investigation milestones, assigned officer details, or download formal incident verification slips.
                </p>

                <form className="space-y-4" onSubmit={handleVerifyStatus}>
                  <div>
                    <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="report-id">
                      Report Tracking ID
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[20px]">
                        badge
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                        id="report-id"
                        placeholder="e.g. FUL-2025-0482"
                        type="text"
                        value={trackIdInput}
                        onChange={(e) => setTrackIdInput(e.target.value)}
                      />
                    </div>
                    <span className="text-body-sm text-outline mt-1 block">
                      Enter your 8 or 10-character reference generated during submission.
                    </span>
                  </div>

                  <div>
                    <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="security-pin">
                      Verification Access PIN (Optional for anonymous reports)
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                      id="security-pin"
                      placeholder="••••"
                      type="password"
                      value={trackPinInput}
                      onChange={(e) => setTrackPinInput(e.target.value)}
                    />
                  </div>

                  {trackError && (
                    <div className="p-2.5 rounded bg-error-container text-on-error-container text-xs font-semibold">
                      {trackError}
                    </div>
                  )}

                  <button
                    className="w-full py-3 rounded-lg bg-primary-container text-on-primary-container text-label-lg font-bold shadow-sm hover:bg-primary transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Verify Status
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-surface-container-high bg-surface-container-low p-3.5 rounded-lg text-body-sm text-on-surface-variant">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">info</span>
                    <span>
                      Lost your Report ID? Visit the Directorate Security Headquarters in person with valid university identification (Staff/Student ID).
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Sample Tracker Card Previewing 4-Step Vertical Timeline */}
              {activeTrackedIncident ? (
                <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/60 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-container-high gap-2">
                    <div>
                      <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
                        Live Report Tracker Preview
                      </span>
                      <h4 className="text-headline-sm text-on-surface font-bold">Case #{activeTrackedIncident.id}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-md font-bold bg-[#B08A35]/15 text-[#765700] border border-[#B08A35]/30">
                        <span className="w-2 h-2 rounded-full bg-[#765700]"></span>
                        {activeTrackedIncident.status}
                      </span>
                      <button
                        onClick={() => setDossierModalIncident(activeTrackedIncident)}
                        className="p-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                        title="Print Official Slip"
                      >
                        <span className="material-symbols-outlined text-base">print</span>
                      </button>
                    </div>
                  </div>

                  {/* Incident Snapshot Meta */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                    <div>
                      <div className="text-label-sm text-outline">Category</div>
                      <div className="text-label-md text-on-surface font-semibold truncate">{activeTrackedIncident.type}</div>
                    </div>
                    <div>
                      <div className="text-label-sm text-outline">Filed Date</div>
                      <div className="text-label-md text-on-surface font-semibold">{activeTrackedIncident.filedDateFormatted}</div>
                    </div>
                    <div>
                      <div className="text-label-sm text-outline">Location</div>
                      <div className="text-label-md text-on-surface font-semibold truncate" title={activeTrackedIncident.location}>
                        {activeTrackedIncident.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-label-sm text-outline">Investigator</div>
                      <div className="text-label-md text-on-surface font-semibold truncate">{activeTrackedIncident.assignedLead}</div>
                    </div>
                  </div>

                  {/* 4-step vertical timeline */}
                  <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant">
                    {activeTrackedIncident.timeline.map((step, idx) => (
                      <div key={idx} className={`relative ${!step.isDone && !step.isCurrent ? 'opacity-60' : ''}`}>
                        <div
                          className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-surface-container-lowest ${
                            step.isDone
                              ? 'bg-tertiary text-white'
                              : step.isCurrent
                              ? 'bg-primary-container text-white ring-primary-fixed/40'
                              : 'bg-surface-dim text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px] font-bold">
                            {step.isDone ? 'check' : step.isCurrent ? 'sync' : 'radio_button_unchecked'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h5
                              className={`text-title-md font-bold ${
                                step.isCurrent ? 'text-primary' : 'text-on-surface'
                              }`}
                            >
                              {step.title}
                            </h5>
                            {step.isCurrent && (
                              <span className="text-label-sm px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">
                                Current
                              </span>
                            )}
                          </div>
                          <span className="text-body-sm text-outline">{step.timestamp}</span>
                        </div>

                        <p className="text-body-md text-on-surface-variant mt-1">{step.description}</p>

                        {step.remark && (
                          <div className="mt-2.5 p-2.5 bg-surface-container-low rounded border border-outline-variant/30 text-body-sm text-on-surface-variant">
                            <strong className="text-on-surface">Officer Remark:</strong> "{step.remark}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Rapid Incident Report Interactive Form Component */}
        <section className="py-16 max-w-7xl mx-auto px-gutter" id="quick-report-form">
          <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-sm p-space-lg lg:p-space-xl">
            <div className="border-b border-surface-container-high pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-headline-md text-on-surface font-bold">Submit a Secure Incident Report</h2>
                <p className="text-body-md text-on-surface-variant">
                  All submissions are monitored around the clock by the Lafia Command Center.
                </p>
              </div>
              <span className="text-label-sm px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                Whistleblower Protection Active
              </span>
            </div>

            <form className="space-y-6" onSubmit={handleReportSubmit}>
              {/* Category and Anonymous Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="incident-category">
                    Incident Classification *
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    id="incident-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Theft / Burglary / Lost Property">Theft / Burglary / Lost Property</option>
                    <option value="Threat / Harassment / Extortion">Threat / Harassment / Extortion</option>
                    <option value="Unauthorized Campus Trespass">Unauthorized Campus Trespass</option>
                    <option value="Physical Altercation / Assault">Physical Altercation / Assault</option>
                    <option value="Anti-Cultism Suspicious Activity">Anti-Cultism Suspicious Activity</option>
                    <option value="Medical / Health Crisis">Medical / Health Crisis</option>
                    <option value="Other Security Breach">Other Security Breach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="campus-site">
                    Campus Location *
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    id="campus-site"
                    value={campusLocation}
                    onChange={(e) => setCampusLocation(e.target.value)}
                  >
                    <option value="Permanent Site (Main Campus - Makurdi Road)">Permanent Site (Main Campus - Makurdi Road)</option>
                    <option value="Take-Off Site (Akunza Campus)">Take-Off Site (Akunza Campus)</option>
                    <option value="Male Hostels Quadrangle">Male Hostels Quadrangle</option>
                    <option value="Female Hostels Quadrangle">Female Hostels Quadrangle</option>
                    <option value="University Library & ICT Complex">University Library &amp; ICT Complex</option>
                    <option value="Faculty of Science Building">Faculty of Science Building</option>
                    <option value="Convocation Arena & Sports Center">Convocation Arena &amp; Sports Center</option>
                    <option value="Off-Campus Student Vicinity">Off-Campus Student Vicinity</option>
                  </select>
                </div>
              </div>

              {/* Time and Anonymous Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="incident-datetime">
                    Approximate Date &amp; Time of Incident
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    id="incident-datetime"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-2.5 rounded-lg border border-outline-variant bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                      type="checkbox"
                    />
                    <div>
                      <span className="block text-label-md text-on-surface font-bold">Submit 100% Anonymously</span>
                      <span className="block text-body-sm text-on-surface-variant">
                        Mask all personal IP data and contact fields.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Complainant info if not anonymous */}
              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-lg bg-surface-container-low border border-outline-variant/60">
                  <div>
                    <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="reporter-name">
                      Full Name
                    </label>
                    <input
                      id="reporter-name"
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="e.g. Aliyu Musa"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="reporter-matric">
                      Matriculation / Staff ID Number
                    </label>
                    <input
                      id="reporter-matric"
                      type="text"
                      value={reporterId}
                      onChange={(e) => setReporterId(e.target.value)}
                      placeholder="e.g. SCI/21/043"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Detailed Narrative */}
              <div>
                <label className="block text-label-md text-on-surface font-semibold mb-1.5" htmlFor="incident-details">
                  Incident Narrative &amp; Description *
                </label>
                <textarea
                  className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  id="incident-details"
                  placeholder="State clearly what happened, names or physical descriptions of persons involved, vehicles, or specific landmark identifiers..."
                  rows={4}
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  required
                />
              </div>

              {/* Evidence Upload Area */}
              <div>
                <label className="block text-label-md text-on-surface font-semibold mb-1.5">
                  Attach Supporting Evidence (Images, Audio, PDF)
                </label>
                <label className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:bg-surface-container-low transition-colors cursor-pointer block">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <span className="material-symbols-outlined text-[36px] text-outline mb-2">cloud_upload</span>
                  <p className="text-label-lg text-on-surface font-bold">Click to upload files or drag and drop</p>
                  <p className="text-body-sm text-on-surface-variant mt-1">
                    PNG, JPG, MP4, MP3 or PDF up to 25MB. Files are stripped of EXIF metadata for privacy.
                  </p>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-surface-container-low text-xs border border-outline-variant/50">
                        <span className="font-mono text-on-surface">{file.name} ({file.size})</span>
                        <span className="text-tertiary font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check</span> Ready
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-surface-container-high">
                <span className="text-body-sm text-outline flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Protected under the FULafia Whistleblower Protection Charter
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    className="w-1/2 sm:w-auto px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface text-label-md font-semibold hover:bg-surface-container"
                    type="button"
                    onClick={handleResetForm}
                  >
                    Clear
                  </button>
                  <button
                    className="w-1/2 sm:w-auto px-6 py-2.5 rounded-lg bg-primary-container text-on-primary-container text-label-lg font-bold shadow-sm hover:bg-primary transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Submit Official Report
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Safety Bulletins & Campus Hotlines */}
        <section className="py-16 bg-surface-container-low border-t border-outline-variant/60" id="emergency-sos">
          <div className="max-w-7xl mx-auto px-gutter">
            <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-label-sm font-bold text-primary uppercase tracking-wider">
                  Direct Security Intercept
                </span>
                <h2 className="text-headline-lg text-on-surface tracking-tight">
                  Safety Bulletins &amp; Campus Hotlines
                </h2>
              </div>
              <span className="text-body-sm text-on-surface-variant">Stationed at Command Dispatch Rooms, 24/7/365</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Hotline 1 */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[24px]">local_police</span>
                    </div>
                    <span className="text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-bold">
                      Always On
                    </span>
                  </div>
                  <h3 className="text-title-md font-bold text-on-surface">Main Campus Security Post</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1 mb-4">
                    Direct tactical response for Permanent Site, academic faculties, and student halls of residence.
                  </p>
                </div>
                <div>
                  <div className="text-label-sm text-outline mb-1">Direct Lines:</div>
                  <a className="block text-headline-sm font-bold text-primary hover:underline" href="tel:+2348031234567">
                    +234 803 123 4567
                  </a>
                  <a className="block text-body-md text-on-surface-variant hover:text-on-surface" href="tel:+2348029988776">
                    Alt: +234 802 998 8776
                  </a>
                </div>
              </div>

              {/* Hotline 2 */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-error-container flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-[24px]">medical_services</span>
                    </div>
                    <span className="text-label-sm px-2.5 py-0.5 rounded-full bg-error-container text-error font-bold">
                      Ambulance
                    </span>
                  </div>
                  <h3 className="text-title-md font-bold text-on-surface">Medical Centre Emergency</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1 mb-4">
                    Campus health triage, rapid ambulance dispatch, and crisis mental health stabilization.
                  </p>
                </div>
                <div>
                  <div className="text-label-sm text-outline mb-1">Emergency Line:</div>
                  <a className="block text-headline-sm font-bold text-error hover:underline" href="tel:+2348035550199">
                    +234 803 555 0199
                  </a>
                  <span className="block text-body-sm text-on-surface-variant">Stationed at University Health Centre</span>
                </div>
              </div>

              {/* Hotline 3 */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[24px]">security</span>
                    </div>
                    <span className="text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-fixed/40 text-tertiary font-bold">
                      Confidential
                    </span>
                  </div>
                  <h3 className="text-title-md font-bold text-on-surface">Anti-Cultism &amp; Harassment</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1 mb-4">
                    Specialized confidential investigatory unit reporting directly to the Vice-Chancellor &amp; CSO.
                  </p>
                </div>
                <div>
                  <div className="text-label-sm text-outline mb-1">Confidential Hotline:</div>
                  <a className="block text-headline-sm font-bold text-tertiary hover:underline" href="tel:+2348129876543">
                    +234 812 987 6543
                  </a>
                  <span className="block text-body-sm text-on-surface-variant">Dedicated WhatsApp &amp; SMS Desk</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container border-t border-outline-variant">
        <div className="max-w-7xl mx-auto py-10 px-gutter flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand & Motto */}
          <div className="flex items-center gap-3">
            <img
              alt="Federal University of Lafia Security Crest"
              className="h-10 w-10 object-contain"
              src="/assets/aistudio/Image_1_fa4d251d.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj6UHLsud92YrLfNClbJuhphZMqUiqW6-eQqq-ASh-zQj28s7A_GbZ822Tai_lNH0JJxnP7jdjSIyzY1Y-Kgg6AKVGeV62pir00_4iJw3BknrOAmPcIbAmrYKv3Zc88fOiFzrjZudhoc0YqOnmGGL6U7bsIxll7bkFjPGkfpCSYaHQ2HE_70_QOXHqCxtyVxn3axEmBbRK_PtXV9k9DvYQM5pXhvWAZI4-XJQ4_j6fyThjb8YS_N5Fts5-KGMBRM65DE';
              }}
            />
            <div>
              <span className="text-title-md font-bold text-on-surface tracking-tight block">
                Federal University of Lafia Security Directorate
              </span>
              <span className="text-body-sm text-on-surface-variant block">
                Motto: Integrity, Innovation, Excellence
              </span>
            </div>
          </div>

          {/* Footer Policy Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-body-sm text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#emergency-sos">
              Emergency Dispatch
            </a>
            <a className="hover:text-primary transition-colors" href="#quick-report-form">
              Reporting Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#track-case">
              Chain of Custody Protocol
            </a>
            <a className="hover:text-primary transition-colors" href="#quick-report-form">
              Whistleblower Protection
            </a>
            <button onClick={onSwitchToCommand} className="hover:text-primary transition-colors font-semibold">
              Staff &amp; Student Portal
            </button>
          </nav>

          {/* Copyright Notice */}
          <div className="text-body-sm text-outline text-center lg:text-right">
            © 2025 Federal University of Lafia Security Directorate. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Dossier Modal */}
      <DossierModal
        incident={dossierModalIncident}
        onClose={() => setDossierModalIncident(null)}
      />
    </div>
  );
};
