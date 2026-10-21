import { 
  DoctorProfile, 
  Patient, 
  Prescription, 
  LabReport, 
  MedicalRecordItem, 
  OutbreakData, 
  DrugTrendItem 
} from '../types';

export const mockDoctor: DoctorProfile = {
  name: "Dr. Aarav Mehta",
  title: "Chief of Interventional Cardiology & Clinical Epidemiologist",
  regNumber: "NMC-54921-A",
  council: "National Medical Commission / Delhi Medical Council",
  specialty: "Interventional Cardiology",
  subSpecialty: "Cardio-Metabolic Disease & Preventive Epidemiology",
  abhaHprId: "aarav.mehta@hpr.abdm",
  hospital: "Medanta - The Medicity & Apollo Multispecialty Network",
  department: "Heart Institute & Preventive Health Surveillance",
  experienceYears: 16,
  email: "dr.aarav.mehta@medanta.org",
  phone: "+91 98110 44290",
  roomNumber: "Consultation Suite 402, Tower B",
  opdTimings: "Mon - Fri: 09:00 AM – 04:00 PM | Sat: 09:00 AM – 01:00 PM",
  bio: "Dr. Aarav Mehta is a pioneer in catheter-based coronary revascularization and predictive population epidemiology. With over 3,800 complex coronary angioplasties performed and extensive research in cardio-metabolic disease clusters in South Asia, he leads the digital clinical navigation initiative for Dr. Route.",
  qualifications: [
    {
      degree: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
      institution: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      year: "2008",
      honor: "Institute Gold Medal for Academic Excellence in Clinical Medicine"
    },
    {
      degree: "MD (Internal Medicine)",
      institution: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      year: "2011",
      honor: "Best Post-Graduate Resident Award"
    },
    {
      degree: "DM (Doctor of Medicine - Cardiology)",
      institution: "Post Graduate Institute of Medical Education and Research (PGIMER), Chandigarh",
      year: "2014",
      honor: "First Order of Merit & Torrent Young Scholar Gold Award"
    }
  ],
  fellowships: [
    "Fellow of the American College of Cardiology (FACC), USA",
    "Fellow of the European Society of Cardiology (FESC), France",
    "Fellow of Society for Cardiovascular Angiography and Interventions (FSCAI)",
    "Fellow of the Indian College of Cardiology (FICC)"
  ],
  careerMilestones: [
    {
      period: "2020 — Present",
      role: "Chief of Interventional Cardiology & Clinical Director",
      institution: "Medanta - The Medicity, Gurugram / Delhi NCR",
      description: "Directs complex bifurcation angioplasty, TAVR programs, and digital ABHA-integrated clinical pathways."
    },
    {
      period: "2015 — 2020",
      role: "Senior Consultant Cardiologist",
      institution: "Fortis Escorts Heart Institute, New Delhi",
      description: "Headed the acute coronary care unit and led regional epidemiological registries for acute coronary syndromes."
    },
    {
      period: "2011 — 2015",
      role: "Assistant Professor & Clinical Fellow",
      institution: "AIIMS New Delhi & PGIMER Chandigarh",
      description: "Supervised resident clinical training and published landmark papers on South Asian premature atherosclerosis."
    }
  ],
  surgeriesCount: 3840,
  successRate: 99.2,
  publicationsCount: 24
};

export const mockPatients: Patient[] = [
  {
    id: "PT-10492",
    name: "Rajesh Kumar Sharma",
    age: 54,
    gender: "Male",
    bloodGroup: "O+",
    abhaId: "91-8842-1920-3301",
    phone: "+91 98712 30491",
    email: "rajesh.sharma@gmail.com",
    allergies: ["Penicillin", "Sulfa Drugs", "NSAIDs (Mild)"],
    chronicConditions: ["Essential Hypertension (Stage II)", "Type 2 Diabetes Mellitus", "Dyslipidemia"],
    lastVisit: "12 Oct 2026",
    currentVitals: {
      bloodPressure: "136/84",
      heartRate: 74,
      spo2: 98,
      temperature: "98.4 °F",
      weight: 76.5,
      glucose: 138
    },
    triagePriority: "Urgent",
    status: "In Consultation",
    appointmentTime: "10:30 AM",
    chiefComplaint: "Follow-up for BP control, persistent afternoon fatigue, mild exertional dyspnea."
  },
  {
    id: "PT-10493",
    name: "Priya V. Patel",
    age: 38,
    gender: "Female",
    bloodGroup: "B+",
    abhaId: "91-4920-8812-4029",
    phone: "+91 98220 54109",
    email: "priya.patel@outlook.com",
    allergies: ["Aspirin", "Ibuprofen"],
    chronicConditions: ["Moderate Bronchial Asthma", "Allergic Rhinitis"],
    lastVisit: "28 Sep 2026",
    currentVitals: {
      bloodPressure: "118/76",
      heartRate: 82,
      spo2: 96,
      temperature: "98.6 °F",
      weight: 58.0,
      glucose: 94
    },
    triagePriority: "Routine",
    status: "Waiting",
    appointmentTime: "11:15 AM",
    chiefComplaint: "Seasonal nocturnal cough, wheezing triggered by autumn air quality index spike."
  },
  {
    id: "PT-10494",
    name: "Vikram Malhotra",
    age: 62,
    gender: "Male",
    bloodGroup: "A+",
    abhaId: "91-3109-7721-6540",
    phone: "+91 99104 88312",
    email: "v.malhotra@corp.in",
    allergies: ["No Known Drug Allergies (NKDA)"],
    chronicConditions: ["Coronary Artery Disease (Post-PCI 2024)", "Mild Chronic Kidney Disease (Stage 2)"],
    lastVisit: "05 Oct 2026",
    currentVitals: {
      bloodPressure: "142/88",
      heartRate: 68,
      spo2: 97,
      temperature: "98.1 °F",
      weight: 84.0,
      glucose: 112
    },
    triagePriority: "Urgent",
    status: "Lab Pending",
    appointmentTime: "11:45 AM",
    chiefComplaint: "Routine 6-month post-stent cardiac review, renal profile monitoring."
  },
  {
    id: "PT-10495",
    name: "Sunita Devi",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    abhaId: "91-7710-3329-8104",
    phone: "+91 97112 00938",
    email: "sunita.d97@gmail.com",
    allergies: ["Ciprofloxacin"],
    chronicConditions: ["None Reported"],
    lastVisit: "Today (ER Triage)",
    currentVitals: {
      bloodPressure: "102/66",
      heartRate: 104,
      spo2: 99,
      temperature: "102.8 °F",
      weight: 52.0,
      glucose: 106
    },
    triagePriority: "Emergency",
    status: "Waiting",
    appointmentTime: "Emergency Triage",
    chiefComplaint: "High spiking fever for 4 days, petechial rash, severe retro-orbital headache, suspected Dengue."
  },
  {
    id: "PT-10496",
    name: "Col. Harpreet Singh (Retd.)",
    age: 71,
    gender: "Male",
    bloodGroup: "O-",
    abhaId: "91-1120-9943-7721",
    phone: "+91 98101 22340",
    email: "h.singh.echno@mil.in",
    allergies: ["NKDA"],
    chronicConditions: ["Atrial Fibrillation", "BPH", "Osteoarthritis"],
    lastVisit: "18 Sep 2026",
    currentVitals: {
      bloodPressure: "128/82",
      heartRate: 72,
      spo2: 98,
      temperature: "98.2 °F",
      weight: 79.0,
      glucose: 118
    },
    triagePriority: "Routine",
    status: "Discharged",
    appointmentTime: "09:30 AM",
    chiefComplaint: "Quarterly INR review for anticoagulant dosage titration."
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: "RX-2026-88102",
    patientId: "PT-10492",
    patientName: "Rajesh Kumar Sharma",
    abhaId: "91-8842-1920-3301",
    age: 54,
    gender: "Male",
    doctorName: "Dr. Aarav Mehta",
    doctorId: "DOC-MCI-54921",
    date: "21 Oct 2026",
    primaryDiagnosis: "Essential (Primary) Hypertension with Early Cardiomegaly",
    icd10Code: "I10.9",
    secondaryDiagnosis: "Type 2 Diabetes Mellitus without complications (E11.9)",
    status: "Active",
    interactionRisk: "None",
    adherenceRate: 94,
    digitalSignatureHash: "0x8F3C92B4A117ED2C99014FA399E5C601DE7",
    notes: "Patient shows favorable BP control response. Salt restricted to <5g/day. Continue moderate exercise.",
    lifestyleAdvice: [
      "Strict DASH diet adherence (low sodium, high potassium)",
      "Daily 40-minute brisk walk before breakfast",
      "Limit caffeine intake to 1 cup/day; avoid smoking and alcohol",
      "Log blood pressure twice weekly via PulseBand v2"
    ],
    medications: [
      {
        id: "MED-01",
        name: "Telmisartan (Telma 40)",
        genericName: "Telmisartan 40 mg",
        dosage: "40 mg",
        frequency: "1-0-0",
        timing: "Morning after breakfast",
        duration: "90 Days",
        route: "Oral",
        instructions: "Take consistently at the same time each morning. Monitor standing BP.",
        refillsAllowed: 2
      },
      {
        id: "MED-02",
        name: "Metformin ER (Glycomet SR 500)",
        genericName: "Metformin Hydrochloride Extended-Release 500 mg",
        dosage: "500 mg",
        frequency: "1-0-1",
        timing: "With principal meals (Lunch & Dinner)",
        duration: "90 Days",
        route: "Oral",
        instructions: "Swallow whole, do not crush or chew. Take with meals to minimize GI distress.",
        refillsAllowed: 2
      },
      {
        id: "MED-03",
        name: "Atorvastatin (Atorva 10)",
        genericName: "Atorvastatin Calcium 10 mg",
        dosage: "10 mg",
        frequency: "0-0-1",
        timing: "At bedtime",
        duration: "90 Days",
        route: "Oral",
        instructions: "Lipid stabilizer. Report any unexplained muscle soreness or dark urine immediately.",
        refillsAllowed: 3
      }
    ]
  },
  {
    id: "RX-2026-87941",
    patientId: "PT-10493",
    patientName: "Priya V. Patel",
    abhaId: "91-4920-8812-4029",
    age: 38,
    gender: "Female",
    doctorName: "Dr. Aarav Mehta",
    doctorId: "DOC-MCI-54921",
    date: "15 Oct 2026",
    primaryDiagnosis: "Moderate Persistent Bronchial Asthma with Acute Exacerbation",
    icd10Code: "J45.41",
    status: "Needs Renewal",
    interactionRisk: "Low",
    adherenceRate: 88,
    digitalSignatureHash: "0x1A2B3C4D5E6F7890ABCDEF1234567890FEDCBA",
    notes: "Patient is sensitive to NSAIDs. Avoid beta-blockers. Keep inhaler spacer clean.",
    lifestyleAdvice: [
      "Use N95 mask outdoors during high AQI (>250) hours",
      "Avoid cold water and sudden temperature fluctuations",
      "Rinse mouth thoroughly with warm water after corticosteroid inhaler use"
    ],
    medications: [
      {
        id: "MED-04",
        name: "Budesonide + Formoterol (Budecort-F 200)",
        genericName: "Budesonide 200mcg + Formoterol 6mcg Inhaler",
        dosage: "200/6 mcg",
        frequency: "1-0-1",
        timing: "Morning & Night",
        duration: "30 Days",
        route: "Inhalation via Spacer",
        instructions: "2 puffs twice daily. Rinse mouth after inhalation.",
        refillsAllowed: 1
      },
      {
        id: "MED-05",
        name: "Montelukast + Levocetirizine (Montair LC)",
        genericName: "Montelukast 10mg + Levocetirizine 5mg",
        dosage: "10/5 mg",
        frequency: "0-0-1",
        timing: "At night before bed",
        duration: "15 Days",
        route: "Oral",
        instructions: "Helps control nocturnal allergic spasms and allergic rhinitis.",
        refillsAllowed: 0
      }
    ]
  },
  {
    id: "RX-2026-86510",
    patientId: "PT-10494",
    patientName: "Vikram Malhotra",
    abhaId: "91-3109-7721-6540",
    age: 62,
    gender: "Male",
    doctorName: "Dr. Aarav Mehta",
    doctorId: "DOC-MCI-54921",
    date: "05 Oct 2026",
    primaryDiagnosis: "Atherosclerotic Heart Disease with Prior Coronary Stent (LAD)",
    icd10Code: "I25.10",
    status: "Active",
    interactionRisk: "None",
    adherenceRate: 98,
    digitalSignatureHash: "0xFE3289110BCA99321487EFCCBA89321045BCDE",
    notes: "Post-PCI dual antiplatelet therapy. Renal function remains within compensated limits (eGFR 68).",
    lifestyleAdvice: [
      "Strict cardiac rehab protocol; target heart rate 105-115 bpm during walk",
      "Avoid NSAIDs completely due to renal and bleeding risks",
      "Review lipid panel in 6 weeks"
    ],
    medications: [
      {
        id: "MED-06",
        name: "Ticagrelor (Brilinta 90)",
        genericName: "Ticagrelor 90 mg",
        dosage: "90 mg",
        frequency: "1-0-1",
        timing: "Morning & Evening",
        duration: "180 Days",
        route: "Oral",
        instructions: "Do not miss doses. Crucial for stent patency protection.",
        refillsAllowed: 3
      },
      {
        id: "MED-07",
        name: "Rosuvastatin (Rosuvas 20)",
        genericName: "Rosuvastatin Calcium 20 mg",
        dosage: "20 mg",
        frequency: "0-0-1",
        timing: "Night time",
        duration: "90 Days",
        route: "Oral",
        instructions: "High-intensity statin therapy. Target LDL < 55 mg/dL.",
        refillsAllowed: 2
      }
    ]
  }
];

export const mockLabReports: LabReport[] = [
  {
    id: "LAB-2026-901",
    patientId: "PT-10492",
    testName: "Comprehensive Metabolic & Lipid Panel",
    category: "Biochemistry",
    date: "14 Oct 2026",
    doctor: "Dr. S. K. Aggarwal (Pathologist)",
    summary: "Lipid control shows marked improvement on statin therapy. Glycated hemoglobin (HbA1c) indicates moderate glycemic control.",
    results: [
      { parameter: "HbA1c (Glycated Hemoglobin)", value: "6.8", unit: "%", normalRange: "4.0 - 5.6", isAbnormal: true },
      { parameter: "Fasting Blood Glucose", value: "114", unit: "mg/dL", normalRange: "70 - 100", isAbnormal: true },
      { parameter: "Total Cholesterol", value: "162", unit: "mg/dL", normalRange: "< 200", isAbnormal: false },
      { parameter: "LDL Direct Cholesterol", value: "78", unit: "mg/dL", normalRange: "< 100", isAbnormal: false },
      { parameter: "HDL Cholesterol", value: "48", unit: "mg/dL", normalRange: "> 40", isAbnormal: false },
      { parameter: "Serum Triglycerides", value: "158", unit: "mg/dL", normalRange: "< 150", isAbnormal: true },
      { parameter: "Serum Creatinine", value: "0.98", unit: "mg/dL", normalRange: "0.70 - 1.20", isAbnormal: false },
      { parameter: "Estimated GFR (CKD-EPI)", value: "88", unit: "mL/min/1.73m²", normalRange: "> 60", isAbnormal: false }
    ]
  },
  {
    id: "LAB-2026-902",
    patientId: "PT-10492",
    testName: "2D Echocardiogram & Color Doppler",
    category: "Radiology",
    date: "10 Oct 2026",
    doctor: "Dr. Aarav Mehta",
    summary: "Concentric left ventricular remodeling. Preserved global ejection fraction of 62%. Normal diastolic relaxation pattern. No regional wall motion abnormalities.",
    results: [
      { parameter: "Left Ventricular Ejection Fraction (LVEF)", value: "62", unit: "%", normalRange: "55 - 70", isAbnormal: false },
      { parameter: "Left Ventricular Internal Diameter (LVIDd)", value: "4.6", unit: "cm", normalRange: "3.9 - 5.3", isAbnormal: false },
      { parameter: "Interventricular Septal Thickness (IVSd)", value: "1.12", unit: "cm", normalRange: "0.6 - 1.0", isAbnormal: true },
      { parameter: "Aortic Root Dimension", value: "3.2", unit: "cm", normalRange: "2.0 - 3.7", isAbnormal: false }
    ]
  }
];

export const mockOldRecords: MedicalRecordItem[] = [
  {
    id: "REC-2026-01",
    patientId: "PT-10492",
    type: "Prescription",
    title: "Quarterly Hypertension Titration (Telmisartan + Metformin)",
    date: "21 Oct 2026",
    facility: "Medanta Heart Institute",
    doctor: "Dr. Aarav Mehta",
    details: "Adjusted Telmisartan from 20mg to 40mg. Glycomet ER continued. Adherence score 94%.",
    status: "Verified",
    tag: "Active Rx"
  },
  {
    id: "REC-2026-02",
    patientId: "PT-10492",
    type: "Lab Report",
    title: "Comprehensive Lipid & Renal Function Panel",
    date: "14 Oct 2026",
    facility: "Max Healthcare Central Diagnostics",
    doctor: "Dr. S. K. Aggarwal",
    details: "HbA1c 6.8%, LDL 78 mg/dL, Creatinine 0.98 mg/dL, eGFR 88 mL/min.",
    status: "Verified",
    tag: "Biochemistry"
  },
  {
    id: "REC-2026-03",
    patientId: "PT-10492",
    type: "Imaging",
    title: "2D Transthoracic Echocardiogram with Doppler",
    date: "10 Oct 2026",
    facility: "Apollo Hospital Echo Lab",
    doctor: "Dr. Aarav Mehta",
    details: "LVEF 62%, mild septal hypertrophy (1.12 cm). No valvular regurgitation.",
    status: "Verified",
    tag: "Cardiac Echo"
  },
  {
    id: "REC-2025-04",
    patientId: "PT-10492",
    type: "Prescription",
    title: "Initial Cardio-Metabolic Protocol",
    date: "12 May 2025",
    facility: "Apollo Health City",
    doctor: "Dr. Rajeshwar Rao",
    details: "Amlodipine 5mg + Metformin 500mg. Switched later due to mild ankle edema.",
    status: "Verified",
    tag: "Archived Rx"
  },
  {
    id: "REC-2024-05",
    patientId: "PT-10492",
    type: "Discharge Summary",
    title: "Observation & Triage for Exertional Chest Heaviness",
    date: "18 Nov 2024",
    facility: "Medanta Emergency Medicine Department",
    doctor: "Dr. Vikram Sethi",
    details: "Troponin T negative x 2. Stress ECG negative for inducible ischemia. Diagnosed with hypertensive urgency.",
    status: "Verified",
    tag: "Inpatient Care"
  },
  {
    id: "REC-2023-06",
    patientId: "PT-10492",
    type: "Vaccination",
    title: "Annual Influenza & Pneumococcal Polysaccharide (PPSV23)",
    date: "04 Oct 2023",
    facility: "AIIMS OPD Immunization Clinic",
    doctor: "Dr. Neha Verma",
    details: "Administered quadrivalent influenza and PPSV23 vaccine. Batch #IN-88941.",
    status: "Verified",
    tag: "Vaccine"
  }
];

export const mockOutbreaks: OutbreakData[] = [
  {
    id: "OUT-01",
    disease: "Dengue Virus (DENV-2 Strain Surge)",
    pathogenType: "Vector-Borne",
    cases: 14820,
    r0: 1.84,
    positivityRate: 14.2,
    icuOccupancy: 42,
    riskLevel: "Severe Alert",
    hotspots: ["Delhi NCR", "Bengaluru Urban", "Kolkata Metropolitan", "Hyderabad"],
    primaryAffectedStates: ["Delhi", "Karnataka", "West Bengal", "Telangana"],
    seasonalPeak: "Post-Monsoon (Sept - Nov)",
    weeklyTrend: 18.4
  },
  {
    id: "OUT-02",
    disease: "Seasonal Influenza (H3N2 / H1N1)",
    pathogenType: "Viral",
    cases: 8430,
    r0: 1.28,
    positivityRate: 9.8,
    icuOccupancy: 22,
    riskLevel: "Moderate",
    hotspots: ["Pune", "Ahmedabad", "Chandigarh", "Jaipur"],
    primaryAffectedStates: ["Maharashtra", "Gujarat", "Punjab", "Rajasthan"],
    seasonalPeak: "Autumn & Early Winter (Oct - Jan)",
    weeklyTrend: -4.2
  },
  {
    id: "OUT-03",
    disease: "Extensively Drug-Resistant Typhoid (XDR Salmonella Typhi)",
    pathogenType: "Bacterial",
    cases: 3190,
    r0: 1.15,
    positivityRate: 6.4,
    icuOccupancy: 14,
    riskLevel: "High",
    hotspots: ["Varanasi", "Patna", "Surat", "Indore"],
    primaryAffectedStates: ["Uttar Pradesh", "Bihar", "Gujarat", "Madhya Pradesh"],
    seasonalPeak: "Late Summer / Flooding (July - Oct)",
    weeklyTrend: 8.9
  },
  {
    id: "OUT-04",
    disease: "Chikungunya Arthritic Outbreak",
    pathogenType: "Vector-Borne",
    cases: 5120,
    r0: 1.42,
    positivityRate: 11.1,
    icuOccupancy: 8,
    riskLevel: "Moderate",
    hotspots: ["Chennai", "Coimbatore", "Thiruvananthapuram", "Kozhikode"],
    primaryAffectedStates: ["Tamil Nadu", "Kerala"],
    seasonalPeak: "Post-Monsoon (Oct - Dec)",
    weeklyTrend: 12.1
  },
  {
    id: "OUT-05",
    disease: "Scrub Typhus (Orientia tsutsugamushi)",
    pathogenType: "Bacterial",
    cases: 1240,
    r0: 1.05,
    positivityRate: 4.8,
    icuOccupancy: 18,
    riskLevel: "Low",
    hotspots: ["Shimla Foothills", "Dehradun", "Ranchi"],
    primaryAffectedStates: ["Himachal Pradesh", "Uttarakhand", "Jharkhand"],
    seasonalPeak: "Monsoon End (Aug - Oct)",
    weeklyTrend: -11.5
  }
];

export const mockDrugTrends: DrugTrendItem[] = [
  {
    id: "DT-01",
    moleculeName: "Telmisartan",
    category: "Antihypertensive",
    quarterPrescriptions: 248900,
    growthPercentage: 14.6,
    genericAdoptionRate: 78.4,
    stockAvailability: "Abundant",
    topPrescribedFor: "Stage 1 & 2 Essential Hypertension with microalbuminuria protection"
  },
  {
    id: "DT-02",
    moleculeName: "Metformin ER",
    category: "Antidiabetic",
    quarterPrescriptions: 312400,
    growthPercentage: 9.2,
    genericAdoptionRate: 84.1,
    stockAvailability: "Abundant",
    topPrescribedFor: "First-line Type 2 Diabetes Mellitus glycemic control"
  },
  {
    id: "DT-03",
    moleculeName: "Azithromycin 500mg",
    category: "Antibiotic",
    quarterPrescriptions: 184500,
    growthPercentage: -8.4,
    genericAdoptionRate: 69.2,
    amrResistanceRate: 38.6,
    stockAvailability: "Optimal",
    topPrescribedFor: "Community-acquired respiratory tract infections (High AMR resistance flag)"
  },
  {
    id: "DT-04",
    moleculeName: "Rosuvastatin",
    category: "Statin",
    quarterPrescriptions: 198000,
    growthPercentage: 18.2,
    genericAdoptionRate: 72.8,
    stockAvailability: "Abundant",
    topPrescribedFor: "Primary and secondary atherosclerotic cardiovascular prevention"
  },
  {
    id: "DT-05",
    moleculeName: "Amoxicillin + Clavulanic Acid (Augmentin 625)",
    category: "Antibiotic",
    quarterPrescriptions: 221000,
    growthPercentage: 4.5,
    genericAdoptionRate: 64.0,
    amrResistanceRate: 27.4,
    stockAvailability: "Optimal",
    topPrescribedFor: "Complicated ENT, lower respiratory, and skin infections"
  },
  {
    id: "DT-06",
    moleculeName: "Meropenem IV",
    category: "Antibiotic",
    quarterPrescriptions: 34100,
    growthPercentage: 11.2,
    genericAdoptionRate: 52.0,
    amrResistanceRate: 46.8,
    stockAvailability: "Low",
    topPrescribedFor: "ICU Nosocomial Sepsis & Carbapenem-resistant Klebsiella infections"
  },
  {
    id: "DT-07",
    moleculeName: "Dapagliflozin (SGLT2i)",
    category: "Antidiabetic",
    quarterPrescriptions: 142000,
    growthPercentage: 32.5,
    genericAdoptionRate: 61.2,
    stockAvailability: "Optimal",
    topPrescribedFor: "Heart Failure with preserved/reduced ejection fraction & Diabetic Nephropathy"
  }
];
