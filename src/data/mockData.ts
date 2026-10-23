import { IncidentRecord, DispatchEvent, Officer, PatrolUnit } from '../types';

export const INITIAL_INCIDENTS: IncidentRecord[] = [
  {
    id: 'FUL-2025-0482',
    type: 'Theft',
    location: 'Computing Lab • Perm Site',
    campusSector: 'Permanent Campus',
    timestamp: 'Today, 10:14 AM',
    filedDateFormatted: '24 Oct 2025',
    reporterName: 'Aliyu Musa',
    reporterId: 'SCI/21/043',
    isAnonymous: false,
    priority: 'High',
    status: 'Under Investigation',
    subject: 'Reported Laptop Theft at Faculty of Computing Lab',
    narrative: 'Lenovo ThinkPad P1 Gen 5 laptop missing from Cyber Workstation #14 during 10:00 AM break. Workstation wire lock was sheared with a cutting tool.',
    assignedLead: 'Insp. S. Yakubu',
    assignedTeam: 'Patrol Team 2',
    coordinates: 'GPS: 8.4872° N, 8.5218° E (Lafia)',
    evidence: [
      {
        id: 'ev-1',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKiJ6hK02A_wwB5P6BzHJQmCQnaMGWaPhfclFZJ7o_2fWMYxMQ-t4j9wA2JPgu8KRPb3s23wsSupyPmaZZSwqRmKcqjmY7KxEZGoG6TJfGw5kW9oFGXV6iLcgU2kJRZbGgYqjDA7YU1YlM3_26z6is9hsnWlmoWZqPO1dQm9-M5NlJTnd4UMuCwYAsbVTC77IfAGtoSPri4jvBnoKKSfEKpgaERh737dxKXOPBVWVi4tXq94B-2ggCiw',
        label: 'IMG_0482_A.jpg',
        alt: 'Close up photograph of a student desk in a modern university computer laboratory showing a sheared wire safety lock and an empty workstation space.'
      },
      {
        id: 'ev-2',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNlMOBr-Pibi5s2dDcwzkfCnfJqhIAY6WLDY1IG3TNeB2LmafqacOVyMw8bJMkxplBJ4Cedl2j1fnGUzYbp_s2eX7ZifMTELwmDeQgV-vUx3HfLjIXIc8Yt5FHocyLB5AOkhBpwcFo7n-2J-4VLWHDLMFxk52648o7jY_LfUBZ3Rn40bGpv5WAooZ1IDqMnC_uB87UVPx9NoA4-dqiqnyGzlnzHWVzQbqP__FgMLAf1T0aamGFYwKAzg',
        label: 'CCTV_Cam09.jpg',
        alt: 'Security checkpoint surveillance still of a university building hallway entrance with high-definition daylight illuminating the concrete corridor.'
      }
    ],
    officerRemarks: 'Patrol 2 dispatched to interview Lab Attendant and review 09:30-10:15 corridor video log. Suspect observed heading toward Library Walkway.',
    verificationPin: '7941',
    timeline: [
      {
        step: 1,
        title: '1. Submitted',
        timestamp: '24 Oct, 09:14 AM',
        description: 'Report logged via Online Public Portal. Encrypted reference ID generated and evidence package attached.',
        isDone: true
      },
      {
        step: 2,
        title: '2. Under Review',
        timestamp: '24 Oct, 09:30 AM',
        description: 'Triage team classified priority level as High. Incident forwarded to Permanent Site Security Division.',
        isDone: true
      },
      {
        step: 3,
        title: '3. Under Investigation',
        timestamp: '24 Oct, 11:00 AM',
        description: 'Officer dispatched for field assessment at Faculty of Computing. Surveillance camera logs retrieved for cross-reference.',
        remark: 'Patrol 2 dispatched to interview Lab Attendant and review 09:30-10:15 corridor video log. Suspect observed heading toward Library Walkway.',
        isDone: false,
        isCurrent: true
      },
      {
        step: 4,
        title: '4. Resolved',
        timestamp: 'Pending',
        description: 'Formal incident conclusion, security clearance update, and safety report issued to the complainant.',
        isDone: false
      }
    ]
  },
  {
    id: 'FUL-2025-0481',
    type: 'Suspicious Activity',
    location: 'Gate 2 Perimeter Road',
    campusSector: 'Permanent Campus',
    timestamp: 'Today, 09:30 AM',
    filedDateFormatted: '24 Oct 2025',
    reporterName: 'Anonymous (Student)',
    isAnonymous: true,
    priority: 'Medium',
    status: 'Pending',
    subject: 'Unregistered Vehicle Loitering Near Perimeter Fence',
    narrative: 'Dark grey tinted sedan without official university parking decal idling repeatedly near Gate 2 outer perimeter fence since 08:45 AM.',
    assignedLead: 'Sgt. B. Oche',
    assignedTeam: 'Patrol Team 1',
    coordinates: 'GPS: 8.4891° N, 8.5201° E (Lafia Gate 2)',
    evidence: [],
    officerRemarks: 'Motorcycle patrol dispatched to verify vehicle registration and occupant identity.',
    verificationPin: '3188',
    timeline: [
      {
        step: 1,
        title: '1. Submitted',
        timestamp: '24 Oct, 09:30 AM',
        description: 'Report logged anonymously via Secure Portal.',
        isDone: true
      },
      {
        step: 2,
        title: '2. Under Review',
        timestamp: '24 Oct, 09:40 AM',
        description: 'Assigned to Gate 2 Sector Command for tactical verification.',
        isDone: false,
        isCurrent: true
      },
      {
        step: 3,
        title: '3. Under Investigation',
        timestamp: 'Pending',
        description: 'Patrol unit physical intercept and tag check.',
        isDone: false
      },
      {
        step: 4,
        title: '4. Resolved',
        timestamp: 'Pending',
        description: 'Perimeter verification completed.',
        isDone: false
      }
    ]
  },
  {
    id: 'FUL-2025-0479',
    type: 'Harassment',
    location: 'Female Hostel Block C',
    campusSector: 'Permanent Campus',
    timestamp: 'Yesterday, 11:22 PM',
    filedDateFormatted: '23 Oct 2025',
    reporterName: 'K. Jonathan',
    reporterId: 'ARTS/22/108',
    isAnonymous: false,
    priority: 'Critical',
    status: 'Under Investigation',
    subject: 'Late Night Verbal Threats and Hostel Quadrangle Intimidation',
    narrative: 'Non-resident individual entered Hostel Block C courtyard at 23:15 hours making repeated verbal threats and refusing to vacate until security was alerted.',
    assignedLead: 'Insp. H. Bello',
    assignedTeam: 'Hostel Rapid Response',
    coordinates: 'GPS: 8.4845° N, 8.5230° E (Hostel C)',
    evidence: [],
    officerRemarks: 'Statement taken from hall porter and victim. Suspect identified as former student; campus ban notice dispatched to all gates.',
    verificationPin: '9042',
    timeline: [
      {
        step: 1,
        title: '1. Submitted',
        timestamp: '23 Oct, 11:22 PM',
        description: 'SOS incident reported to hostel security desk.',
        isDone: true
      },
      {
        step: 2,
        title: '2. Under Review',
        timestamp: '23 Oct, 11:30 PM',
        description: 'Classified Critical Priority; Chief Security Officer notified.',
        isDone: true
      },
      {
        step: 3,
        title: '3. Under Investigation',
        timestamp: '24 Oct, 08:00 AM',
        description: 'Anti-cultism and gender protection unit joint debrief.',
        remark: 'Formal hearing convened at Security Directorate Headquarters.',
        isDone: false,
        isCurrent: true
      },
      {
        step: 4,
        title: '4. Resolved',
        timestamp: 'Pending',
        description: 'Disciplinary panel outcome and restraining order.',
        isDone: false
      }
    ]
  },
  {
    id: 'FUL-2025-0478',
    type: 'Vandalism',
    location: 'Auditorium East Gate',
    campusSector: 'Permanent Campus',
    timestamp: 'Yesterday, 06:15 PM',
    filedDateFormatted: '23 Oct 2025',
    reporterName: 'Estate Officer Garba',
    reporterId: 'Staff #419',
    isAnonymous: false,
    priority: 'Low',
    status: 'Resolved',
    subject: 'Damaged Floodlight Fitting and Electrical Box Tampering',
    narrative: 'Perimeter floodlight enclosure broken and copper cabling exposed outside Auditorium East wing entrance.',
    assignedLead: 'Officer T. Usman',
    assignedTeam: 'Works & Maintenance Liaison',
    coordinates: 'GPS: 8.4860° N, 8.5255° E (Auditorium)',
    evidence: [],
    officerRemarks: 'Works department re-secured junction box and replaced LED luminaire. No foul play detected; accidental damage by delivery van.',
    verificationPin: '4410',
    timeline: [
      {
        step: 1,
        title: '1. Submitted',
        timestamp: '23 Oct, 06:15 PM',
        description: 'Staff facility maintenance report received.',
        isDone: true
      },
      {
        step: 2,
        title: '2. Under Review',
        timestamp: '23 Oct, 06:40 PM',
        description: 'Works and Security joint inspection authorized.',
        isDone: true
      },
      {
        step: 3,
        title: '3. Under Investigation',
        timestamp: '24 Oct, 08:30 AM',
        description: 'Driver interviewed and agreed to restitution.',
        isDone: true
      },
      {
        step: 4,
        title: '4. Resolved',
        timestamp: '24 Oct, 09:55 AM',
        description: 'Repairs completed and signed off by Estate Directorate.',
        isDone: true
      }
    ]
  },
  {
    id: 'FUL-2025-0475',
    type: 'Dispute / Conflict',
    location: 'Student Union Building',
    campusSector: 'Take-off Site',
    timestamp: '18 Oct, 03:40 PM',
    filedDateFormatted: '18 Oct 2025',
    reporterName: 'Anonymous (Staff)',
    isAnonymous: true,
    priority: 'Medium',
    status: 'Resolved',
    subject: 'Election Campaign Verbal Altercation between Student Factions',
    narrative: 'Disagreement between rival candidate supporters over banner placement inside the Student Union concourse.',
    assignedLead: 'Dean of Students / Capt. Audu',
    assignedTeam: 'Peace & Mediation Committee',
    coordinates: 'GPS: 8.4912° N, 8.5140° E (Take-off SUB)',
    evidence: [],
    officerRemarks: 'Mediation session held with candidate campaign managers. Code of conduct reaffirmed.',
    verificationPin: '8221',
    timeline: [
      {
        step: 1,
        title: '1. Submitted',
        timestamp: '18 Oct, 03:40 PM',
        description: 'Dispute report logged by SUB facility manager.',
        isDone: true
      },
      {
        step: 2,
        title: '2. Under Review',
        timestamp: '18 Oct, 04:00 PM',
        description: 'Patrol dispatched to restore order in hallway.',
        isDone: true
      },
      {
        step: 3,
        title: '3. Under Investigation',
        timestamp: '19 Oct, 10:00 AM',
        description: 'Mediation summit conducted.',
        isDone: true
      },
      {
        step: 4,
        title: '4. Resolved',
        timestamp: '19 Oct, 02:00 PM',
        description: 'Joint peace accord signed by both student representatives.',
        isDone: true
      }
    ]
  },
  {
    id: 'FUL-2025-0471',
    type: 'Theft',
    location: 'Main Campus Library',
    campusSector: 'Permanent Campus',
    timestamp: '17 Oct, 11:15 AM',
    filedDateFormatted: '17 Oct 2025',
    reporterName: 'Fatima Zubairu',
    reporterId: 'MED/23/019',
    isAnonymous: false,
    priority: 'Medium',
    status: 'Resolved',
    subject: 'Misplaced Backpack with Textbooks and Scientific Calculator',
    narrative: 'Navy blue JanSport backpack left on 2nd floor reading carrel recovered by library staff and turned into Security desk.',
    assignedLead: 'Officer A. John',
    assignedTeam: 'Library Post',
    coordinates: 'GPS: 8.4870° N, 8.5225° E (Library)',
    evidence: [],
    officerRemarks: 'Items verified against student ID and returned intact to owner.',
    verificationPin: '1190',
    timeline: [
      { step: 1, title: '1. Submitted', timestamp: '17 Oct, 11:15 AM', description: 'Lost property logged.', isDone: true },
      { step: 2, title: '2. Under Review', timestamp: '17 Oct, 11:30 AM', description: 'Cross-checked with lost & found inventory.', isDone: true },
      { step: 3, title: '3. Under Investigation', timestamp: '17 Oct, 01:00 PM', description: 'Claimant summoned with matric verification.', isDone: true },
      { step: 4, title: '4. Resolved', timestamp: '17 Oct, 02:15 PM', description: 'Handover complete and property receipt signed.', isDone: true }
    ]
  }
];

export const DISPATCH_FEED_EVENTS: DispatchEvent[] = [
  {
    id: 'dsp-1',
    title: 'Patrol Unit 02 En Route',
    time: '10:22 AM',
    description: 'Dispatched to Faculty of Computing Lab. Investigating Officer: S. Yakubu.',
    type: 'patrol'
  },
  {
    id: 'dsp-2',
    title: 'Case FUL-2025-0478 Resolved',
    time: '09:55 AM',
    description: 'Auditorium damaged lighting reported fixed and restitution signed by department.',
    type: 'resolved'
  },
  {
    id: 'dsp-3',
    title: 'Evidence File Appended',
    time: '09:12 AM',
    description: '2 CCTV files uploaded for Gate 2 Perimeter surveillance scan.',
    type: 'evidence'
  },
  {
    id: 'dsp-4',
    title: 'New SOS Panic Beacon',
    time: '08:44 AM',
    description: 'Test ping verified by Student Affairs Warden desk at Perm Site.',
    type: 'emergency'
  }
];

export const OFFICERS: Officer[] = [
  {
    id: 'off-1',
    name: 'Officer I. Danladi',
    badge: 'FUL-CSO-004',
    rank: 'Duty Commander',
    shift: 'Shift Alpha (06:00 - 14:00)',
    sector: 'Central Command HQ',
    status: 'On Duty',
    callsign: 'Alpha-Actual',
    phone: '0803-000-0041'
  },
  {
    id: 'off-2',
    name: 'Inspector S. Yakubu',
    badge: 'FUL-SEC-112',
    rank: 'Senior Investigation Officer',
    shift: 'Shift Alpha (06:00 - 14:00)',
    sector: 'Permanent Campus - Sector C',
    status: 'Investigating',
    callsign: 'Patrol-2-Lead',
    phone: '0803-000-0112'
  },
  {
    id: 'off-3',
    name: 'Sgt. B. Oche',
    badge: 'FUL-SEC-208',
    rank: 'Sector Sergeant',
    shift: 'Shift Alpha (06:00 - 14:00)',
    sector: 'Gate 2 Perimeter',
    status: 'On Patrol',
    callsign: 'Patrol-1-Echo',
    phone: '0803-000-0208'
  },
  {
    id: 'off-4',
    name: 'Insp. H. Bello',
    badge: 'FUL-SEC-095',
    rank: 'Hostel Security Inspector',
    shift: 'Shift Bravo (14:00 - 22:00)',
    sector: 'Female Hostel Quadrangle',
    status: 'On Duty',
    callsign: 'Tango-Hostel-Lead',
    phone: '0803-000-0095'
  },
  {
    id: 'off-5',
    name: 'Officer T. Usman',
    badge: 'FUL-SEC-314',
    rank: 'Patrol Officer',
    shift: 'Shift Alpha (06:00 - 14:00)',
    sector: 'Take-off Campus',
    status: 'On Patrol',
    callsign: 'Unit-Bravo-03',
    phone: '0803-000-0314'
  }
];

export const PATROL_UNITS: PatrolUnit[] = [
  {
    id: 'unit-1',
    callsign: 'Mobile Patrol 01',
    sector: 'Perm Site - Gates & Perimeter',
    leadOfficer: 'Sgt. B. Oche',
    status: 'Patrolling',
    lastPing: '2 mins ago'
  },
  {
    id: 'unit-2',
    callsign: 'Mobile Patrol 02',
    sector: 'Perm Site - Computing & Science Blocks',
    leadOfficer: 'Insp. S. Yakubu',
    status: 'En Route',
    lastPing: 'Just now'
  },
  {
    id: 'unit-3',
    callsign: 'Hostel Response Unit',
    sector: 'Perm Site - Hostels Quadrangle',
    leadOfficer: 'Insp. H. Bello',
    status: 'Standby',
    lastPing: '5 mins ago'
  },
  {
    id: 'unit-4',
    callsign: 'Take-off Unit Alpha',
    sector: 'Take-off Site - Main Gate',
    leadOfficer: 'Officer T. Usman',
    status: 'Patrolling',
    lastPing: '1 min ago'
  },
  {
    id: 'unit-5',
    callsign: 'Take-off Unit Bravo',
    sector: 'Take-off Site - Clinic & Admin',
    leadOfficer: 'Officer C. Nnamdi',
    status: 'Standby',
    lastPing: '8 mins ago'
  }
];
