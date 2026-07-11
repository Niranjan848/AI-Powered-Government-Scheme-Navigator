import type { PersonaSnapshot } from '../types';

export const personas: PersonaSnapshot[] = [
  {
    name: 'Farmer',
    profileCompletion: 82,
    readinessScore: 91,
    recentChats: ['Asked about crop loan support', 'Compared PM Kisan and KCC'],
    recommendedSchemes: [
      { id: 'pm-kisan', name: 'PM Kisan', ministry: 'Agriculture', status: 'Recommended', score: 98 },
      { id: 'kcc', name: 'Kisan Credit Card', ministry: 'Finance', status: 'Eligible', score: 94 },
    ],
    savedSchemes: ['PM Kisan', 'Kisan Credit Card'],
    applicationTimeline: [
      { title: 'Profile verified', detail: 'Land and income details stored', timestamp: 'Today' },
      { title: 'Checklist generated', detail: 'Documents required for PM Kisan', timestamp: 'Today' },
    ],
    notifications: [{ title: 'New state subsidy', detail: 'A fresh crop insurance update is available.' }],
  },
  {
    name: 'Student',
    profileCompletion: 76,
    readinessScore: 88,
    recentChats: ['Asked for scholarship matches', 'Saved a national scholarship'],
    recommendedSchemes: [
      { id: 'national-scholarship', name: 'National Scholarship', ministry: 'Education', status: 'Recommended', score: 96 },
      { id: 'skill-india', name: 'Skill India', ministry: 'Skill Development', status: 'Eligible', score: 89 },
    ],
    savedSchemes: ['National Scholarship'],
    applicationTimeline: [
      { title: 'Eligibility parsed', detail: 'Academic category matched', timestamp: 'Today' },
      { title: 'Checklist exported', detail: 'Documents ready to download', timestamp: 'Today' },
    ],
    notifications: [{ title: 'Deadline reminder', detail: 'One scholarship closes in 5 days.' }],
  },
  {
    name: 'Woman Entrepreneur',
    profileCompletion: 68,
    readinessScore: 84,
    recentChats: ['Compared Mudra Loan and Stand-Up India', 'Reviewed repayment terms'],
    recommendedSchemes: [
      { id: 'mudra-loan', name: 'Mudra Loan', ministry: 'Finance', status: 'Recommended', score: 95 },
      { id: 'standup-india', name: 'Stand-Up India', ministry: 'Finance', status: 'Needs Review', score: 92 },
    ],
    savedSchemes: ['Mudra Loan'],
    applicationTimeline: [
      { title: 'Business profile captured', detail: 'Sector and funding needs added', timestamp: 'Today' },
      { title: 'Comparison generated', detail: 'Best-fit scheme explained', timestamp: 'Today' },
    ],
    notifications: [{ title: 'Document missing', detail: 'GST registration can improve eligibility.' }],
  },
  {
    name: 'Senior Citizen',
    profileCompletion: 74,
    readinessScore: 79,
    recentChats: ['Checked health support options', 'Saved pension-related schemes'],
    recommendedSchemes: [
      { id: 'ayushman-bharat', name: 'Ayushman Bharat', ministry: 'Health', status: 'Recommended', score: 97 },
      { id: 'senior-citizen-savings', name: 'Senior Citizen Savings', ministry: 'Finance', status: 'Eligible', score: 91 },
    ],
    savedSchemes: ['Ayushman Bharat'],
    applicationTimeline: [
      { title: 'Health profile captured', detail: 'Insurance and age fields updated', timestamp: 'Yesterday' },
      { title: 'Checklist queued', detail: 'Identity documents listed', timestamp: 'Yesterday' },
    ],
    notifications: [{ title: 'Benefit update', detail: 'A health coverage expansion is available.' }],
  },
  {
    name: 'Business Owner',
    profileCompletion: 89,
    readinessScore: 93,
    recentChats: ['Reviewed startup support', 'Tracked loan eligibility'],
    recommendedSchemes: [
      { id: 'startup-india', name: 'Startup India', ministry: 'Commerce', status: 'Recommended', score: 97 },
      { id: 'pm-vishwakarma', name: 'PM Vishwakarma', ministry: 'MSME', status: 'Eligible', score: 90 },
    ],
    savedSchemes: ['Startup India', 'PM Vishwakarma'],
    applicationTimeline: [
      { title: 'Business profile validated', detail: 'Turnover and sector confirmed', timestamp: 'Today' },
      { title: 'Action plan created', detail: 'Loan and registration steps ranked', timestamp: 'Today' },
    ],
    notifications: [{ title: 'New scheme match', detail: 'State MSME support now available.' }],
  },
];
