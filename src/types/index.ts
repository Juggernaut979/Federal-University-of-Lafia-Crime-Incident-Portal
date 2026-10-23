export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'Pending' | 'Under Investigation' | 'Resolved' | 'Closed';
export type CampusSector = 'All Sectors' | 'Permanent Campus' | 'Take-off Site';

export interface EvidenceItem {
  id: string;
  url: string;
  label: string;
  alt: string;
}

export interface TimelineMilestone {
  step: number;
  title: string;
  timestamp: string;
  description: string;
  remark?: string;
  isDone: boolean;
  isCurrent?: boolean;
}

export interface IncidentRecord {
  id: string;
  type: string;
  location: string;
  campusSector: 'Permanent Campus' | 'Take-off Site';
  timestamp: string;
  reporterName: string;
  reporterId?: string;
  isAnonymous: boolean;
  priority: PriorityLevel;
  status: IncidentStatus;
  subject: string;
  narrative: string;
  assignedLead: string;
  assignedTeam: string;
  coordinates: string;
  evidence: EvidenceItem[];
  officerRemarks: string;
  verificationPin?: string;
  timeline: TimelineMilestone[];
  filedDateFormatted: string;
}

export interface DispatchEvent {
  id: string;
  title: string;
  time: string;
  description: string;
  type: 'patrol' | 'resolved' | 'evidence' | 'emergency';
}

export interface Officer {
  id: string;
  name: string;
  badge: string;
  rank: string;
  shift: string;
  sector: string;
  status: 'On Duty' | 'On Patrol' | 'Investigating' | 'Standby';
  callsign: string;
  phone: string;
}

export interface PatrolUnit {
  id: string;
  callsign: string;
  sector: string;
  leadOfficer: string;
  status: 'Patrolling' | 'En Route' | 'At Scene' | 'Standby';
  lastPing: string;
}
