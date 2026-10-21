const fs = require('fs');
const path = require('path');

const stitchDir = path.join(__dirname, 'assets', 'stitch');
const files = fs.readdirSync(stitchDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

let code = `// Auto-generated Stitch image asset index
// Contains all authentic 3D icons, high-res photography, and UI graphics from Stitch

export const stitchImages = {
`;

files.forEach(f => {
  const idMatch = f.match(/^([0-9a-f]{32}|[0-9]{20})/);
  if (idMatch) {
    code += `  '${idMatch[1]}': require('../../assets/stitch/${f}'),\n`;
  }
  let safeKey = f
    .replace(/\.(png|jpg|jpeg)$/i, '')
    .replace(/^([0-9a-f]{32}|[0-9]{20})_?/, '')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/__+/g, '_');
  if (!safeKey || /^[0-9]/.test(safeKey)) {
    safeKey = 'img_' + safeKey;
  }
  code += `  '${safeKey}': require('../../assets/stitch/${f}'),\n`;
});

// Also provide convenient semantic aliases
code += `
  // Semantic Aliases
  logo: require('../../assets/stitch/75cda33da8044cf687f2c11e55249e24_Modern_high-tech_3D_brand_logo_icon_for_.png'),
  logoRound: require('../../assets/stitch/32bfef176d854c4aa420f5ca15064572_Dr_Route_Advanced_Brand_Logo.png'),
  logoOfficial: require('../../assets/stitch/dbb3c23338b74e1ab7480d4ea4465de0_Dr_Route_Official_Brand_Logo.png'),
  userAvatar: require('../../assets/stitch/3218ab6e21ea4be7a29a7c869eb28150_Ultra-premium_professional_Indian_health.png'),
  homeBanner: require('../../assets/stitch/f19b92c38baa475db2926444e2ee2508_Ultra-premium__cinematic_commercial_bran.png'),
  homeFriendlyBanner: require('../../assets/stitch/1d8342a086714ee9b9a833e213d6984c_Modern_friendly_healthcare_illustration_.png'),

  // 3D Department & Emergency Icons
  iconAmbulance3D: require('../../assets/stitch/b7d444f2b9e7477abb38e7e55a497a74_Friendly_comforting_modern_3D_medical_am.png'),
  iconHospital3D: require('../../assets/stitch/b95a9073d8b041d6bc83242e268d7170_Modern_3D_healthcare_icon_illustration_o.png'),
  iconTrauma3D: require('../../assets/stitch/8c61ebb9f83c45e691a503d189b898bc_Modern_clean_3D_icon_of_a_high-tech_mult.png'),
  iconDoctor3D: require('../../assets/stitch/af6a2ebc904947ce98f14d4bb860de40_High-fidelity_individual_3D_healthcare_a.png'),
  iconVideoDoctor3D: require('../../assets/stitch/788278286cfa44cf80cc6ebb9a76b58a_Clean_3D_icon_of_a_smiling_emergency_doc.png'),
  iconBlood3D: require('../../assets/stitch/9b355feaeb8340468e16fe9bc9837691_Modern_clean_3D_icon_of_emergency_blood_.png'),
  iconPolice3D: require('../../assets/stitch/24ac60685cb444028df827411f82b71b_Friendly_professional_modern_3D_healthca.png'),
  iconSeniorCare3D: require('../../assets/stitch/604b9719cc7242e6b63319e9b3bdbef1_Warm_compassionate_modern_3D_senior_citi.png'),
  iconWomenShield3D: require('../../assets/stitch/1beb5be0139c46cc95df122c578865db_Reassuring_caring_modern_3D_women_safety.png'),
  iconRapidBike3D: require('../../assets/stitch/0d328922596d441ca7b423473b0a938b_Cute_modern_3D_healthcare_rapid_response.png'),
  iconMedicalCab3D: require('../../assets/stitch/b7c7f5ab13e4454996b9867a79cbfb9f_Cute_modern_3D_healthcare_medical_taxi_c.png'),
  iconAutoRickshaw3D: require('../../assets/stitch/df2001ce4145473896a94cef91f37628_Cute_modern_3D_Indian_auto_rickshaw_with.png'),
  iconHealthScore3D: require('../../assets/stitch/34c194bd5f954753ac5aac413c501f59_Modern_3D_healthcare_icon_illustration_o.png'),
  iconScale3D: require('../../assets/stitch/46449374708e46b5b3c55b1fb8a143b9_Modern_3D_healthcare_icon_illustration_o.png'),
  iconHabit3D: require('../../assets/stitch/8a81d4642e0d4d0d94d4071caeab4de6_Modern_3D_healthcare_icon_illustration_o.png'),
  iconSmartTech3D: require('../../assets/stitch/8d9296f681ae407caeca431ede8f1590_Modern_3D_healthcare_smart_tech_devices_.png'),
  iconSecurity3D: require('../../assets/stitch/6ac74e2f4d4243b28ca71622a2ceec3f_Friendly_modern_healthcare_security_veri.png'),

  // Real Hospital & Fleet Photography
  photoAmbulanceVan: require('../../assets/stitch/35bfba8f7aa54ea6b3bd1702c5a81620_Realistic_professional_photography_of_a_.png'),
  photoParamedicBike: require('../../assets/stitch/a01763fefbc3465b996706db6e41bd38_Realistic_professional_photograph_of_an_.png'),
  photoMedicalCabCar: require('../../assets/stitch/b1347e29eb394635a9b8366f0f171924_Realistic__ultra-clean_commercial_photog.png'),
  photoGreenAuto: require('../../assets/stitch/f21d9687811c488688496d614de0301b_Realistic_professional_commercial_photog.png'),
  photoHospitalModern: require('../../assets/stitch/1116b2033915419e975881b0589f1f3c_Ultra-premium_modern_architectural_hospi.png'),
  photoHospitalTrauma: require('../../assets/stitch/69e6dbdca8484ed5b634c3d6c3aa88a4_Ultra-premium_modern_hospital_emergency_.png'),
  photoDiagnosticMRI: require('../../assets/stitch/701b246a875d48ea96456b2e430f13f3_Ultra-premium_realistic_commercial_healt.png'),
  photoEmergencyDoctor: require('../../assets/stitch/bb3eee5b3ad14aa281cac8b57c834fc0_Ultra-premium_professional_healthcare_ph.png'),
  photoBloodDonation: require('../../assets/stitch/0322e8c9444e40bcb5670379f0ec370e_Ultra-premium_realistic_medical_photogra.png'),

  // Pharmacy & Reminders
  photoPharmacyBanner: require('../../assets/stitch/f1f41604ea604f65aca5c074f91ad21f_Ultra-premium_modern_online_pharmacy_ban.png'),
  photoPillOrganizer: require('../../assets/stitch/1a372875076a40c28df11dbce16cb609_Smart_medication_reminders_concept__styl.png'),
  photoMedicineLibrary: require('../../assets/stitch/9f07757c9b6740b1a07bd1ca497cbb9e_Comprehensive_medicine_library_and_pharm.png'),

  // Self-Care & Wellness
  photoWomenWellness: require('../../assets/stitch/290723b0cbc54ba4a247da5a8dcc1803_Ultra-premium_commercial_healthcare_phot.png'),
  photoMenFitness: require('../../assets/stitch/2632de4eda7d4bcc97e8a34f91a33047_Ultra-premium_commercial_healthcare_phot.png'),
  photoPhysiotherapy: require('../../assets/stitch/adb0825160c342e39c8e6d4eb579e4c0_Ultra-premium_commercial_healthcare_phot.png'),
  photoElderRehab: require('../../assets/stitch/2ecbc716d4df45efb50d392f76e65ebd_Ultra-premium_commercial_healthcare_phot.png'),
  photoClinicalDiet: require('../../assets/stitch/889bba7702604b37944078d1aaaea325_Clean_aesthetic_medical_photography_of_h.png'),
  photoRespiratoryCare: require('../../assets/stitch/47259d3c9d4e466dbc8914b325a0ac27_Medical_rehabilitation_and_respiratory_e.png'),

  // Nursing & Home Care
  photoHomeNursing: require('../../assets/stitch/3346e45634e9497e8ce6fdc156e95f87_Ultra-premium_realistic_commercial_photo.png'),
  photoDoctorHomeVisit: require('../../assets/stitch/e5482f7e2a8849089fe72a28b92e872f_Ultra-premium_professional_healthcare_ph.png'),
};

export default stitchImages;
`;

const targetDir = path.join(__dirname, 'src', 'assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
const targetFile = path.join(targetDir, 'stitchImages.js');
fs.writeFileSync(targetFile, code, 'utf8');
console.log('Generated ' + targetFile + ' successfully.');
