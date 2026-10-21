// Type definitions for Dr. Route Healthcare Navigation System

export type ScreenId = 
  | 'login'               // 1st - login page
  | 'dashboard'           // 2nd - Dashboard
  | 'prescription'        // 3rd - prescription
  | 'submit-open-chart'   // 4th - Inside prescription submit and open chart
  | 'old-records'         // 5th - Inside old records
  | 'new-prescription'    // 6th - Inside new prescription
  | 'health-insights'     // 7th - Inside health insights
  | 'disease-epi'         // 8th - disease epidemiology
  | 'drug-trends'         // 9th - drug trends
  | 'personal-profile'    // 10th - personal profile
  | 'qualifications'      // 11th - qualification & experience
  | 'settings';           // 12th - settings

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  abhaId: string;
  phone: string;
  email: string;
  allergies: string[];
  chronicConditions: string[];
  lastVisit: string;
  currentVitals: {
    bloodPressure: string;
    heartRate: number;
    spo2: number;
    temperature: string;
    weight: number;
    glucose: number;
  };
  triagePriority: 'Routine' | 'Urgent' | 'Emergency';
  status: 'Waiting' | 'In Consultation' | 'Lab Pending' | 'Discharged';
  appointmentTime: string;
  chiefComplaint: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;      // e.g. "1-0-1", "1-0-0", "SOS"
  timing: string;         // e.g. "After Meals", "Before Breakfast"
  duration: string;       // e.g. "30 Days"
  route: string;          // e.g. "Oral", "Inhalation"
  instructions: string;
  refillsAllowed: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  abhaId: string;
  age: number;
  gender: string;
  doctorName: string;
  doctorId: string;
  date: string;
  primaryDiagnosis: string;
  icd10Code: string;
  secondaryDiagnosis?: string;
  medications: Medication[];
  notes: string;
  lifestyleAdvice: string[];
  status: 'Active' | 'Needs Renewal' | 'Discontinued' | 'Flagged';
  interactionRisk: 'None' | 'Low' | 'Moderate' | 'Severe';
  adherenceRate: number;
  digitalSignatureHash: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  testName: string;
  category: 'Pathology' | 'Biochemistry' | 'Radiology' | 'Microbiology';
  date: string;
  doctor: string;
  results: {
    parameter: string;
    value: string | number;
    unit: string;
    normalRange: string;
    isAbnormal: boolean;
  }[];
  summary: string;
  fileUrl?: string;
}

export interface MedicalRecordItem {
  id: string;
  patientId: string;
  type: 'Prescription' | 'Lab Report' | 'Imaging' | 'Discharge Summary' | 'Vaccination';
  title: string;
  date: string;
  facility: string;
  doctor: string;
  details: string;
  status: 'Verified' | 'Pending Review';
  tag: string;
}

export interface OutbreakData {
  id: string;
  disease: string;
  pathogenType: 'Viral' | 'Bacterial' | 'Vector-Borne' | 'Parasitic';
  cases: number;
  r0: number;
  positivityRate: number;
  icuOccupancy: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe Alert';
  hotspots: string[];
  primaryAffectedStates: string[];
  seasonalPeak: string;
  weeklyTrend: number; // percentage +/-
}

export interface DrugTrendItem {
  id: string;
  moleculeName: string;
  category: 'Antibiotic' | 'Antihypertensive' | 'Antidiabetic' | 'Analgesic' | 'Statin';
  quarterPrescriptions: number;
  growthPercentage: number;
  genericAdoptionRate: number;
  amrResistanceRate?: number; // for antibiotics
  stockAvailability: 'Abundant' | 'Optimal' | 'Low' | 'Critical Shortage';
  topPrescribedFor: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  regNumber: string;
  council: string;
  specialty: string;
  subSpecialty: string;
  abhaHprId: string;
  hospital: string;
  department: string;
  experienceYears: number;
  email: string;
  phone: string;
  roomNumber: string;
  opdTimings: string;
  bio: string;
  qualifications: {
    degree: string;
    institution: string;
    year: string;
    honor?: string;
  }[];
  fellowships: string[];
  careerMilestones: {
    period: string;
    role: string;
    institution: string;
    description: string;
  }[];
  surgeriesCount: number;
  successRate: number;
  publicationsCount: number;
}
