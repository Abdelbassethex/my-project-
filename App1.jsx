import { useState, useEffect } from 'react';

const SPECIALTIES_LIST = [
  'General Practitioner (GP)',
  'Family Physician',
  'Internist',
  'Cardiologist',
  'Cardiothoracic Surgeon',
  'Pulmonologist',
  'Neurologist',
  'Neurosurgeon',
  'Psychiatrist',
  'Psychologist',
  'Pediatrician',
  'Neonatologist',
  'Obstetrician',
  'Gynecologist',
  'Orthopedic Surgeon',
  'General Surgeon',
  'Plastic Surgeon',
  'Urologist',
  'Ophthalmologist',
  'Optometrist',
  'Otolaryngologist (ENT Specialist)',
  'Dermatologist',
  'Endocrinologist',
  'Gastroenterologist',
  'Hematologist',
  'Oncologist',
  'Radiologist',
  'Anesthesiologist',
  'Emergency Medicine Physician',
  'Rheumatologist',
  'Nephrologist',
];

const ALL_DOCTORS = [
  { id:'D-01', name:'Dr. Chaouchi Mohamed',  arabicName:'د. شاوشي محمد',     specialty:'General Practitioner (GP)',    status:'active',   patients:18, joined:'2021-03-10', phone:'+1(555)010-0101', email:'c.mohamed@bluemed.com' },
  { id:'D-02', name:'Dr. Mechouch Essalem',  arabicName:'د. مشوش عيسالم',    specialty:'Family Physician',             status:'active',   patients:22, joined:'2020-07-15', phone:'+1(555)010-0102', email:'m.essalem@bluemed.com' },
  { id:'D-03', name:'Dr. Ahmed Bad',         arabicName:'د. أحمد باد',        specialty:'Internist',                    status:'active',   patients:15, joined:'2019-11-02', phone:'+1(555)010-0103', email:'a.bad@bluemed.com' },
  { id:'D-04', name:'Dr. Sara Mei',          arabicName:'د. سارة مي',         specialty:'Cardiologist',                 status:'active',   patients:14, joined:'2022-03-10', phone:'+1(555)010-0104', email:'s.mei@bluemed.com' },
  { id:'D-05', name:'Dr. Amira Nad',         arabicName:'د. أميرة ناد',       specialty:'Cardiothoracic Surgeon',       status:'active',   patients:8,  joined:'2018-06-20', phone:'+1(555)010-0105', email:'a.nad@bluemed.com' },
  { id:'D-06', name:'Dr. Akram Abd',         arabicName:'د. أكرم عبد',        specialty:'Pulmonologist',                status:'active',   patients:11, joined:'2021-09-05', phone:'+1(555)010-0106', email:'ak.abd@bluemed.com' },
  { id:'D-07', name:'Dr. Mohamed Sal',       arabicName:'د. محمد صال',        specialty:'Neurologist',                  status:'active',   patients:9,  joined:'2021-07-22', phone:'+1(555)010-0107', email:'m.sal@bluemed.com' },
  { id:'D-08', name:'Dr. Achraf Ben',        arabicName:'د. أشرف بن',         specialty:'Neurosurgeon',                 status:'inactive', patients:0,  joined:'2020-01-30', phone:'+1(555)010-0108', email:'ach.ben@bluemed.com' },
  { id:'D-09', name:'Dr. Naima Salmi',       arabicName:'د. نعيمة سالمي',     specialty:'Psychiatrist',                 status:'active',   patients:19, joined:'2023-05-18', phone:'+1(555)010-0109', email:'n.salmi@bluemed.com' },
  { id:'D-10', name:'Dr. Youssef Karimi',    arabicName:'د. يوسف كريمي',      specialty:'Psychologist',                 status:'active',   patients:25, joined:'2020-08-14', phone:'+1(555)010-0110', email:'y.karimi@bluemed.com' },
  { id:'D-11', name:'Dr. Fatima Zahra',      arabicName:'د. فاطمة الزهراء',   specialty:'Pediatrician',                 status:'active',   patients:30, joined:'2019-03-22', phone:'+1(555)010-0111', email:'f.zahra@bluemed.com' },
  { id:'D-12', name:'Dr. Omar Benali',       arabicName:'د. عمر بن علي',      specialty:'Neonatologist',                status:'active',   patients:7,  joined:'2022-11-01', phone:'+1(555)010-0112', email:'o.benali@bluemed.com' },
  { id:'D-13', name:'Dr. Amina Bouazza',     arabicName:'د. أمينة بواز',      specialty:'Obstetrician',                 status:'active',   patients:16, joined:'2021-02-17', phone:'+1(555)010-0113', email:'a.bouazza@bluemed.com' },
  { id:'D-14', name:'Dr. Khaled Mansouri',   arabicName:'د. خالد المنصوري',   specialty:'Gynecologist',                 status:'inactive', patients:0,  joined:'2020-05-09', phone:'+1(555)010-0114', email:'k.mansouri@bluemed.com' },
  { id:'D-15', name:'Dr. Rachid Ouali',      arabicName:'د. رشيد والي',       specialty:'Orthopedic Surgeon',           status:'active',   patients:21, joined:'2019-11-04', phone:'+1(555)010-0115', email:'r.ouali@bluemed.com' },
  { id:'D-16', name:'Dr. Nadia Hamidi',      arabicName:'د. نادية حميدي',     specialty:'General Surgeon',              status:'active',   patients:13, joined:'2018-08-30', phone:'+1(555)010-0116', email:'n.hamidi@bluemed.com' },
  { id:'D-17', name:'Dr. Samir Belhaj',      arabicName:'د. سمير بالحاج',     specialty:'Plastic Surgeon',              status:'active',   patients:10, joined:'2022-04-25', phone:'+1(555)010-0117', email:'s.belhaj@bluemed.com' },
  { id:'D-18', name:'Dr. Leila Meziani',     arabicName:'د. ليلى مزياني',     specialty:'Urologist',                    status:'active',   patients:7,  joined:'2021-09-30', phone:'+1(555)010-0118', email:'l.meziani@bluemed.com' },
  { id:'D-19', name:'Dr. Tariq Bouhali',     arabicName:'د. طارق بوهالي',     specialty:'Ophthalmologist',              status:'active',   patients:20, joined:'2020-12-10', phone:'+1(555)010-0119', email:'t.bouhali@bluemed.com' },
  { id:'D-20', name:'Dr. Houda Khelifi',     arabicName:'د. هدى خليفي',       specialty:'Optometrist',                  status:'inactive', patients:0,  joined:'2023-01-07', phone:'+1(555)010-0120', email:'h.khelifi@bluemed.com' },
  { id:'D-21', name:'Dr. Bilal Cherif',      arabicName:'د. بلال شريف',       specialty:'Otolaryngologist (ENT Specialist)', status:'active', patients:12, joined:'2021-06-18', phone:'+1(555)010-0121', email:'b.cherif@bluemed.com' },
  { id:'D-22', name:'Dr. Souad Benabdallah', arabicName:'د. سعاد بن عبد الله',specialty:'Dermatologist',                status:'active',   patients:17, joined:'2020-01-15', phone:'+1(555)010-0122', email:'s.benabdallah@bluemed.com' },
  { id:'D-23', name:'Dr. Mourad Tlemcani',   arabicName:'د. مراد تلمساني',    specialty:'Endocrinologist',              status:'active',   patients:7,  joined:'2022-07-11', phone:'+1(555)010-0123', email:'m.tlemcani@bluemed.com' },
  { id:'D-24', name:'Dr. Asma Hadj',         arabicName:'د. أسماء حاج',       specialty:'Gastroenterologist',           status:'active',   patients:14, joined:'2019-09-03', phone:'+1(555)010-0124', email:'a.hadj@bluemed.com' },
  { id:'D-25', name:'Dr. Karim Zidane',      arabicName:'د. كريم زيدان',      specialty:'Hematologist',                 status:'active',   patients:9,  joined:'2021-03-27', phone:'+1(555)010-0125', email:'k.zidane@bluemed.com' },
  { id:'D-26', name:'Dr. Rima Ferhat',       arabicName:'د. ريما فرحات',      specialty:'Oncologist',                   status:'active',   patients:23, joined:'2018-11-15', phone:'+1(555)010-0126', email:'r.ferhat@bluemed.com' },
  { id:'D-27', name:'Dr. Adel Bouzid',       arabicName:'د. عادل بوزيد',      specialty:'Radiologist',                  status:'active',   patients:6,  joined:'2020-10-20', phone:'+1(555)010-0127', email:'a.bouzid@bluemed.com' },
  { id:'D-28', name:'Dr. Meriem Guediri',    arabicName:'د. مريم قديري',      specialty:'Anesthesiologist',             status:'active',   patients:5,  joined:'2021-08-08', phone:'+1(555)010-0128', email:'m.guediri@bluemed.com' },
  { id:'D-29', name:'Dr. Hichem Beloufa',    arabicName:'د. هشام بلوفة',      specialty:'Emergency Medicine Physician', status:'active',   patients:40, joined:'2019-06-01', phone:'+1(555)010-0129', email:'h.beloufa@bluemed.com' },
  { id:'D-30', name:'Dr. Samira Rahmani',    arabicName:'د. سميرة رحماني',    specialty:'Rheumatologist',               status:'inactive', patients:0,  joined:'2022-09-14', phone:'+1(555)010-0130', email:'s.rahmani@bluemed.com' },
  { id:'D-31', name:'Dr. Walid Cherifi',     arabicName:'د. وليد شريفي',      specialty:'Nephrologist',                 status:'active',   patients:11, joined:'2020-04-29', phone:'+1(555)010-0131', email:'w.cherifi@bluemed.com' },
];

const PATIENTS = [
  {
    id:'P-001', name:'Fatima Jelou', arabicName:'فاطمة جيلو', age:34, blood:'A+', dept:'Cardiology', status:'Stable',
    doctor:'Dr. Sara Mei', doctorId:'D-04',
    lastVisit:'2026-02-14', nextAppt:'2026-03-10',
    medications:[
      {name:'Atorvastatin', dose:'20mg', freq:'Once daily', status:'active'},
      {name:'Metoprolol',   dose:'50mg', freq:'Twice daily', status:'active'},
      {name:'Aspirin',      dose:'100mg',freq:'Once daily',  status:'active'},
    ],
    vitals:[
      {date:'2026-02-14', bp:'145/90', hr:88, temp:'37.1', weight:'68kg'},
      {date:'2026-02-01', bp:'138/85', hr:82, temp:'36.9', weight:'68kg'},
      {date:'2026-01-18', bp:'142/88', hr:90, temp:'37.0', weight:'69kg'},
    ],
    symptoms:[
      {date:'2026-02-14', symptom:'Chest tightness', severity:'Mild',    note:'Reported after exercise'},
      {date:'2026-02-01', symptom:'Shortness of breath', severity:'Moderate', note:'At rest, lasting 10 min'},
      {date:'2026-01-18', symptom:'Palpitations', severity:'Mild',    note:'Irregular heartbeat episodes'},
    ],
    history:[
      {date:'2026-02-14', event:'Routine ECG — normal sinus rhythm', type:'visit'},
      {date:'2025-11-08', event:'Cardiology follow-up — EKG clear',  type:'visit'},
      {date:'2025-07-21', event:'Blood panel — cholesterol slightly elevated', type:'lab'},
      {date:'2025-03-05', event:'Stress test — within normal range', type:'procedure'},
    ],
    labResults:[
      {name:'Total Cholesterol', value:'210 mg/dL', ref:'<200', status:'high'},
      {name:'HDL',               value:'55 mg/dL',  ref:'>40',  status:'normal'},
      {name:'LDL',               value:'138 mg/dL', ref:'<100', status:'high'},
      {name:'Blood Glucose',     value:'95 mg/dL',  ref:'70-100',status:'normal'},
      {name:'Hemoglobin',        value:'13.2 g/dL', ref:'12-16', status:'normal'},
    ],
    protocol:{id:'PR-01', title:'Cardiac Monitoring Protocol', steps:['Daily BP check','Limit sodium intake','Avoid strenuous exercise','Report any chest pain immediately','Weekly ECG for 4 weeks']},
    alerts:[{id:1,msg:'BP slightly elevated this morning — 145/90',level:'warning',time:'2 hrs ago'}],
    notes:[
      {date:'2026-02-14', author:'Dr. Sara Mei', text:'Patient reports improvement. Continue current medication regimen. Schedule stress test next month.'},
      {date:'2026-01-18', author:'Dr. Sara Mei', text:'Palpitations episodes reducing. EKG shows no new abnormalities.'},
    ],
  },
  {
    id:'P-002', name:'Reda From', arabicName:'رضا فروم', age:52, blood:'O+', dept:'Neurology', status:'Critical',
    doctor:'Dr. Mohamed Sal', doctorId:'D-07',
    lastVisit:'2026-02-28', nextAppt:'2026-03-05',
    medications:[
      {name:'Mannitol',    dose:'20%',  freq:'IV PRN',    status:'active'},
      {name:'Levetiracetam',dose:'500mg',freq:'Twice daily',status:'active'},
    ],
    vitals:[
      {date:'2026-02-28', bp:'190/120', hr:102, temp:'38.2', weight:'82kg'},
    ],
    symptoms:[
      {date:'2026-02-28', symptom:'Severe headache', severity:'Severe',   note:'Throbbing, 8/10 pain'},
      {date:'2026-02-20', symptom:'Dizziness',       severity:'Moderate', note:'Sudden onset'},
      {date:'2026-02-10', symptom:'Blurred vision',  severity:'Moderate', note:'Right eye affected'},
    ],
    history:[
      {date:'2026-02-28', event:'Emergency consultation — neurological exam', type:'visit'},
      {date:'2025-12-12', event:'MRI Brain — small lesion detected', type:'procedure'},
      {date:'2025-09-30', event:'Lumbar puncture — normal CSF', type:'procedure'},
    ],
    labResults:[
      {name:'WBC',         value:'11.2 K/uL', ref:'4.5-11', status:'high'},
      {name:'Sodium',      value:'138 mEq/L', ref:'136-145',status:'normal'},
      {name:'Creatinine',  value:'1.1 mg/dL', ref:'0.7-1.3',status:'normal'},
    ],
    protocol:{id:'PR-02', title:'Neuro Critical Care Protocol', steps:['Hourly neurological checks','Keep head of bed at 30°','Monitor ICP continuously','Strict fluid balance','No sedatives without consent']},
    alerts:[{id:2,msg:'BP critically high — 190/120',level:'critical',time:'10 min ago'},{id:3,msg:'Missed morning medication dose',level:'warning',time:'3 hrs ago'}],
    notes:[
      {date:'2026-02-28', author:'Dr. Mohamed Sal', text:'Critical condition. Immediate neurological monitoring required. Family notified.'},
    ],
  },
  {
    id:'P-003', name:'Issa Massaoudi', arabicName:'عيسى مساعودي', age:29, blood:'B+', dept:'Dermatology', status:'Recovered',
    doctor:'Dr. Souad Benabdallah', doctorId:'D-22',
    lastVisit:'2026-01-22', nextAppt:'2026-03-18',
    medications:[
      {name:'Hydrocortisone cream', dose:'1%', freq:'Twice daily', status:'active'},
      {name:'Cetirizine',           dose:'10mg',freq:'Once daily',  status:'active'},
    ],
    vitals:[
      {date:'2026-01-22', bp:'118/75', hr:72, temp:'36.8', weight:'74kg'},
    ],
    symptoms:[
      {date:'2026-01-22', symptom:'Skin rash', severity:'Mild', note:'Localized to forearms, improving'},
      {date:'2025-12-10', symptom:'Itching',   severity:'Moderate', note:'Widespread, worse at night'},
    ],
    history:[
      {date:'2026-01-22', event:'Follow-up — rash resolving with treatment', type:'visit'},
      {date:'2025-12-10', event:'Initial dermatology consult', type:'visit'},
      {date:'2025-12-11', event:'Patch test — allergic to nickel', type:'lab'},
    ],
    labResults:[
      {name:'IgE (allergy)',  value:'220 IU/mL', ref:'<100', status:'high'},
      {name:'Eosinophils',    value:'5%',         ref:'1-4%', status:'high'},
      {name:'CRP',            value:'2.1 mg/L',   ref:'<5',   status:'normal'},
    ],
    protocol:{id:'PR-04', title:'Dermatitis Management Protocol', steps:['Topical corticosteroid 2x daily','Avoid identified allergens','Moisturize 3x daily','No hot water on affected area','Follow-up in 8 weeks']},
    alerts:[],
    notes:[
      {date:'2026-01-22', author:'Dr. Souad Benabdallah', text:'Patient recovering well. Allergen identified (nickel). Advised to avoid jewelry and metal contact.'},
    ],
  },
  {
    id:'P-004', name:'Nassim Akouch', arabicName:'نسيم عكوش', age:41, blood:'AB-', dept:'Psychiatry', status:'Stable',
    doctor:'Dr. Naima Salmi', doctorId:'D-09',
    lastVisit:'2026-02-20', nextAppt:'2026-03-15',
    medications:[
      {name:'Sertraline', dose:'50mg', freq:'Once daily', status:'active'},
      {name:'Melatonin',  dose:'5mg',  freq:'At bedtime', status:'active'},
    ],
    vitals:[
      {date:'2026-02-20', bp:'122/78', hr:76, temp:'36.7', weight:'79kg'},
    ],
    symptoms:[
      {date:'2026-02-20', symptom:'Anxiety', severity:'Moderate', note:'Work-related stress'},
      {date:'2026-01-10', symptom:'Insomnia', severity:'Mild', note:'Difficulty falling asleep'},
    ],
    history:[
      {date:'2026-02-20', event:'Psychiatric evaluation — anxiety disorder', type:'visit'},
      {date:'2025-10-05', event:'Initial consultation', type:'visit'},
    ],
    labResults:[
      {name:'TSH',        value:'2.1 mIU/L', ref:'0.4-4.0', status:'normal'},
      {name:'Cortisol',   value:'22 mcg/dL', ref:'6-23',    status:'normal'},
    ],
    protocol:{id:'PR-05', title:'Psychiatric Care Protocol', steps:['Weekly therapy sessions','Medication compliance check','Sleep hygiene routine','Stress management exercises','Monthly follow-up']},
    alerts:[],
    notes:[
      {date:'2026-02-20', author:'Dr. Naima Salmi', text:'Patient showing positive response to sertraline. Sleep improving. Continue therapy sessions.'},
    ],
  },
  {
    id:'P-005', name:'Houria Zaim', arabicName:'حورية زايم', age:63, blood:'A-', dept:'Oncology', status:'Critical',
    doctor:'Dr. Rima Ferhat', doctorId:'D-26',
    lastVisit:'2026-03-01', nextAppt:'2026-03-08',
    medications:[
      {name:'Ondansetron', dose:'8mg',  freq:'Before chemo', status:'active'},
      {name:'Dexamethasone',dose:'4mg', freq:'Twice daily',  status:'active'},
      {name:'Filgrastim',  dose:'300mcg',freq:'Daily',       status:'active'},
    ],
    vitals:[
      {date:'2026-03-01', bp:'102/65', hr:98, temp:'38.5', weight:'58kg'},
    ],
    symptoms:[
      {date:'2026-03-01', symptom:'Severe fatigue', severity:'Severe', note:'Post-chemo session 4'},
      {date:'2026-02-15', symptom:'Nausea', severity:'Moderate', note:'After treatment'},
    ],
    history:[
      {date:'2026-03-01', event:'Chemotherapy session 4', type:'procedure'},
      {date:'2026-01-20', event:'Oncology review — stable lesion', type:'visit'},
      {date:'2025-11-14', event:'Biopsy — confirmed malignancy', type:'lab'},
    ],
    labResults:[
      {name:'WBC',        value:'1.8 K/uL',  ref:'4.5-11',  status:'critical'},
      {name:'Hemoglobin', value:'9.2 g/dL',  ref:'12-16',   status:'low'},
      {name:'Platelets',  value:'88 K/uL',   ref:'150-400', status:'low'},
      {name:'CA-125',     value:'420 U/mL',  ref:'<35',     status:'critical'},
    ],
    protocol:{id:'PR-03', title:'Oncology Chemotherapy Protocol', steps:['Pre-chemo blood panel','Anti-nausea medication 1hr before','Monitor vitals during infusion','Hydration protocol post-chemo','Follow-up within 72 hours']},
    alerts:[{id:4,msg:'WBC count critically low',level:'critical',time:'1 hr ago'}],
    notes:[
      {date:'2026-03-01', author:'Dr. Rima Ferhat', text:'Post-chemo session 4. WBC dangerously low. Starting G-CSF therapy. Close monitoring required.'},
    ],
  },
];

const DEPARTMENTS = [
  {name:'Cardiology',       staff:7,  patients:22, head:'Dr. Sara Mei'},
  {name:'Neurology',        staff:9,  patients:15, head:'Dr. Mohamed Sal'},
  {name:'Dermatology',      staff:5,  patients:41, head:'Dr. Souad Benabdallah'},
  {name:'Oncology',         staff:8,  patients:18, head:'Dr. Rima Ferhat'},
  {name:'Psychiatry',       staff:11, patients:33, head:'Dr. Naima Salmi'},
  {name:'Endocrinology',    staff:6,  patients:27, head:'Dr. Mourad Tlemcani'},
  {name:'Orthopedics',      staff:6,  patients:19, head:'Dr. Rachid Ouali'},
  {name:'Emergency',        staff:20, patients:60, head:'Dr. Hichem Beloufa'},
  {name:'Pediatrics',       staff:9,  patients:38, head:'Dr. Fatima Zahra'},
  {name:'General Surgery',  staff:10, patients:24, head:'Dr. Nadia Hamidi'},
  {name:'Chronic Disease Emergency', staff:15, patients:32, head:'Dr. Rima Ferhat'},
];

const PROTOCOLS = [
  {id:'PR-01', title:'Cardiac Emergency Response',    dept:'Cardiology',    updated:'2026-01-10', severity:'high'},
  {id:'PR-02', title:'Post-Op Neurological Care',     dept:'Neurology',     updated:'2025-12-05', severity:'medium'},
  {id:'PR-03', title:'Oncology Chemotherapy Guide',   dept:'Oncology',      updated:'2026-02-18', severity:'high'},
  {id:'PR-04', title:'Dermatology Infection Control', dept:'Dermatology',   updated:'2025-11-22', severity:'low'},
  {id:'PR-05', title:'Psychiatric Crisis Protocol',   dept:'Psychiatry',    updated:'2026-01-30', severity:'high'},
  {id:'PR-06', title:'Endocrine Shock Management',    dept:'Endocrinology', updated:'2025-10-14', severity:'medium'},
];

const LOGS = [
  {time:'2026-03-03 09:14', user:'admin',              action:'Deactivated Doctor D-08', type:'warn'},
  {time:'2026-03-03 08:55', user:'Dr. Sara Mei',       action:'Updated patient P-001 status', type:'info'},
  {time:'2026-03-02 17:32', user:'admin',              action:'Added Protocol PR-06', type:'info'},
  {time:'2026-03-02 14:10', user:'Dr. Mohamed Sal',    action:'Marked P-002 as Critical', type:'error'},
  {time:'2026-03-02 11:05', user:'P-003 Issa Massaoudi',action:'Booked appointment 2026-03-18', type:'info'},
  {time:'2026-03-01 16:44', user:'admin',              action:'System backup completed', type:'info'},
];

const DOCTOR_ALERTS = [
  {id:1, patient:'Reda From',    msg:'BP critically high — 190/120',  time:'10 min ago', level:'critical'},
  {id:2, patient:'Fatima Jelou', msg:'BP slightly elevated — 145/90', time:'2 hrs ago',  level:'warning'},
  {id:3, patient:'Houria Zaim',  msg:'WBC count critically low',      time:'1 hr ago',   level:'critical'},
];

const SCHEDULE = [
  {time:'09:00', patient:'Fatima Jelou',   type:'Follow-up',    room:'A-12'},
  {time:'10:30', patient:'Nassim Akouch',  type:'Consultation', room:'A-14'},
  {time:'12:00', patient:'Issa Massaoudi', type:'Review',       room:'A-12'},
  {time:'14:00', patient:'Houria Zaim',    type:'New Patient',  room:'B-07'},
  {time:'15:30', patient:'Reda From',      type:'Follow-up',    room:'A-12'},
];

const CREDENTIALS = {
  admin:   {email:'admin@gmail.com',   password:'admin123',   role:'admin'},
  doctor:  {email:'doctor@gmail.com',  password:'doctor123',  role:'doctor'},
  patient: {email:'patient@gmail.com', password:'patient123', role:'patient'},
};

// Css
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#f0f4f9;--surface:#fff;--sidebar:#1a3a5c;--sidebar-h:#1e4a73;--sidebar-a:#1d55a0;
  --cb:#dce6f0;--acc:#2563eb;--acc-d:#1d4ed8;--acc-l:#eff6ff;--acc-m:#bfdbfe;
  --green:#16a34a;--gbg:#f0fdf4;--gbr:#bbf7d0;
  --red:#dc2626;--rbg:#fef2f2;--rbr:#fecaca;
  --amb:#d97706;--abg:#fffbeb;--abr:#fde68a;
  --pur:#7c3aed;--pbg:#fdf4ff;--pbr:#e9d5ff;
  --txt:#1e293b;--tm:#475569;--tl:#94a3b8;
  --font:'Inter',sans-serif;--mono:'JetBrains Mono',monospace;
  --r:10px;--r2:14px;--r3:18px;
  --sh:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);
  --sh2:0 4px 12px rgba(0,0,0,.1);--sh3:0 8px 24px rgba(0,0,0,.12);
  --mode-toggle-bg:#e2e8f0;--mode-toggle-txt:#475569;
}
[data-theme="dark"]{
  --bg:#0d1117;--surface:#161b22;--sidebar:#0a0f1a;--sidebar-h:#1c2333;--sidebar-a:#1d3a6e;
  --cb:#21262d;--acc:#3b82f6;--acc-d:#2563eb;--acc-l:#0d1f3c;--acc-m:#1d3a6e;
  --green:#22c55e;--gbg:#052e16;--gbr:#14532d;
  --red:#f87171;--rbg:#2d0a0a;--rbr:#7f1d1d;
  --amb:#fbbf24;--abg:#2d1a00;--abr:#78350f;
  --pur:#a78bfa;--pbg:#1e1040;--pbr:#4c1d95;
  --txt:#e6edf3;--tm:#8b949e;--tl:#484f58;
  --sh:0 1px 3px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.2);
  --sh2:0 4px 12px rgba(0,0,0,.4);--sh3:0 8px 24px rgba(0,0,0,.5);
  --mode-toggle-bg:#21262d;--mode-toggle-txt:#8b949e;
}
body{background:var(--bg);color:var(--txt);font-family:var(--font);overflow-x:hidden;transition:background .3s,color .3s;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:var(--cb);}
::-webkit-scrollbar-thumb{background:#93c5fd;border-radius:99px;}

/* THEME TOGGLE */
.theme-toggle{position:fixed;top:18px;right:22px;z-index:999;width:44px;height:44px;border-radius:50%;
  background:var(--surface);border:1.5px solid var(--cb);cursor:pointer;display:flex;align-items:center;
  justify-content:center;font-size:1.1rem;box-shadow:var(--sh2);transition:all .25s;color:var(--txt);}
.theme-toggle:hover{transform:scale(1.08);box-shadow:var(--sh3);}

/* LOGIN — centered card design */
.lp{min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:var(--bg);position:relative;overflow:hidden;padding:20px;}
.lp::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 900px 700px at 50% 0%,rgba(37,99,235,.1) 0%,transparent 70%);
  pointer-events:none;}
.lp-grid-bg{position:absolute;inset:0;
  background-image:linear-gradient(var(--cb) 1px,transparent 1px),linear-gradient(90deg,var(--cb) 1px,transparent 1px);
  background-size:48px 48px;opacity:.35;pointer-events:none;}
.lp-blob1{position:absolute;width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,99,235,.12) 0%,transparent 70%);
  top:-200px;left:-200px;pointer-events:none;}
.lp-blob2{position:absolute;width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 70%);
  bottom:-150px;right:-150px;pointer-events:none;}

.lp-card{width:100%;max-width:920px;display:grid;grid-template-columns:1fr 1fr;
  border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.15),0 0 0 1px var(--cb);
  position:relative;z-index:2;animation:fu .5s ease forwards;}
@keyframes fu{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}

/* left panel */
.lp-left{background:linear-gradient(155deg,#0c1f3f 0%,#1a3a6e 50%,#1e4faa 100%);
  padding:52px 44px;display:flex;flex-direction:column;justify-content:space-between;
  position:relative;overflow:hidden;}
.lp-dots{position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(255,255,255,.08) 1px,transparent 1px);
  background-size:22px 22px;pointer-events:none;}
.lp-ring1{position:absolute;width:320px;height:320px;border-radius:50%;
  border:1px solid rgba(255,255,255,.07);top:-80px;right:-80px;}
.lp-ring2{position:absolute;width:200px;height:200px;border-radius:50%;
  border:1px solid rgba(255,255,255,.05);bottom:-40px;left:-40px;}
.lp-inner{position:relative;z-index:2;}
.lp-brand{display:flex;align-items:center;gap:12px;margin-bottom:48px;}
.lp-brand-icon{width:42px;height:42px;border-radius:11px;
  background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.08));
  border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;
  font-size:.72rem;font-weight:800;color:#fff;letter-spacing:.5px;}
.lp-bname{font-size:1rem;font-weight:800;letter-spacing:2.5px;color:#fff;}
.lp-bsub{font-size:.6rem;color:rgba(255,255,255,.4);letter-spacing:.8px;}
.lp-h{font-size:2.4rem;font-weight:800;line-height:1.15;letter-spacing:-.8px;color:#fff;margin-bottom:14px;}
.lp-h em{font-style:normal;color:#93c5fd;}
.lp-s{font-size:.88rem;color:rgba(255,255,255,.58);line-height:1.8;max-width:300px;}
.lp-feats{margin-top:36px;display:flex;flex-direction:column;gap:12px;}
.lp-feat{display:flex;align-items:center;gap:10px;}
.lp-fcheck{width:18px;height:18px;border-radius:5px;
  background:rgba(147,197,253,.15);border:1px solid rgba(147,197,253,.3);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.lp-fcheck-i{width:6px;height:6px;border-radius:2px;background:#93c5fd;}
.lp-ft{font-size:.82rem;color:rgba(255,255,255,.68);}
.lp-stats{display:flex;gap:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);}
.lp-sv{font-size:1.7rem;font-weight:800;color:#fff;line-height:1;}
.lp-sl{font-size:.68rem;color:rgba(255,255,255,.4);margin-top:2px;}

/* right panel = login form */
.lp-right{background:var(--surface);padding:52px 44px;display:flex;align-items:center;justify-content:center;}
.lb{width:100%;max-width:340px;}
.lb-title{font-size:1.75rem;font-weight:800;color:var(--txt);letter-spacing:-.5px;margin-bottom:4px;}
.lb-sub{font-size:.86rem;color:var(--tm);margin-bottom:26px;}
.role-tabs{display:flex;gap:8px;margin-bottom:26px;}
.rtab{flex:1;padding:12px 8px;border-radius:var(--r);border:2px solid var(--cb);cursor:pointer;
  font-family:var(--font);font-size:.78rem;font-weight:700;color:var(--tm);background:var(--surface);transition:all .2s;text-align:center;}
.rtab.active{border-color:var(--acc);background:var(--acc-l);color:var(--acc);}
.rtab-sub{display:block;font-size:.65rem;font-weight:400;margin-top:2px;opacity:.75;}
.lf{margin-bottom:16px;}
.lf label{display:block;font-size:.73rem;font-weight:700;color:var(--tm);letter-spacing:.04em;margin-bottom:6px;}
.li{width:100%;background:var(--surface);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);
  padding:12px 16px;font-family:var(--font);font-size:.9rem;outline:none;transition:border-color .2s,box-shadow .2s;}
.li:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.1);}
.li::placeholder{color:var(--tl);}
.lp-forg{text-align:right;margin-top:-10px;margin-bottom:18px;}
.lp-forg a{font-size:.76rem;color:var(--acc);text-decoration:none;font-weight:500;}
.btn-lo{width:100%;padding:13px;border-radius:var(--r);border:none;cursor:pointer;font-family:var(--font);
  font-size:.95rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--acc-d),var(--acc));
  box-shadow:0 4px 14px rgba(37,99,235,.3);transition:all .2s;}
.btn-lo:hover{box-shadow:0 6px 20px rgba(37,99,235,.42);transform:translateY(-1px);}
.btn-lo:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.lp-div{display:flex;align-items:center;gap:12px;margin:20px 0;color:var(--tl);font-size:.73rem;}
.lp-div::before,.lp-div::after{content:'';flex:1;height:1px;background:var(--cb);}
.demo-list{display:flex;flex-direction:column;gap:7px;}
.demo-btn{width:100%;padding:11px 16px;border-radius:var(--r);border:1.5px solid var(--cb);cursor:pointer;
  font-family:var(--font);font-size:.83rem;font-weight:600;background:var(--surface);color:var(--tm);
  display:flex;align-items:center;gap:10px;transition:all .2s;}
.demo-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acc-l);}
.demo-pill{margin-left:auto;font-size:.67rem;font-weight:700;background:var(--acc-l);color:var(--acc);padding:2px 9px;border-radius:99px;border:1px solid var(--acc-m);}
.err-msg{background:var(--rbg);border:1.5px solid var(--rbr);color:var(--red);border-radius:var(--r);padding:10px 14px;font-size:.83rem;margin-bottom:14px;font-weight:500;}

/* SHELL */
.shell{display:flex;min-height:100vh;}
.sidebar{width:242px;flex-shrink:0;background:var(--sidebar);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
.sb-hdr{padding:24px 20px 18px;border-bottom:1px solid rgba(255,255,255,.08);}
.sb-brand{font-size:1.1rem;font-weight:800;color:#fff;letter-spacing:1.5px;}
.sb-brand span{color:#93c5fd;}
.sb-pill{display:inline-block;margin-top:8px;font-size:.67rem;font-weight:700;background:rgba(147,197,253,.15);color:#93c5fd;border:1px solid rgba(147,197,253,.25);border-radius:99px;padding:3px 10px;}
.nav-sec{padding:18px 20px 5px;font-size:.63rem;font-weight:700;color:rgba(255,255,255,.32);text-transform:uppercase;letter-spacing:.12em;}
.ni{display:flex;align-items:center;gap:10px;padding:10px 14px;margin:1px 8px;border-radius:var(--r);cursor:pointer;font-size:.88rem;font-weight:500;color:rgba(255,255,255,.58);border:none;background:transparent;width:calc(100% - 16px);text-align:left;transition:all .18s;}
.ni:hover{background:var(--sidebar-h);color:#fff;}
.ni.active{background:var(--sidebar-a);color:#fff;font-weight:600;box-shadow:inset 3px 0 0 #93c5fd;}
.ni-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.25);flex-shrink:0;transition:background .18s;}
.ni.active .ni-dot{background:#93c5fd;}
.sb-bot{margin-top:auto;padding:16px;border-top:1px solid rgba(255,255,255,.08);}
.btn-out{width:100%;padding:10px;border-radius:var(--r);border:1px solid rgba(255,255,255,.12);background:transparent;color:rgba(255,255,255,.55);font-family:var(--font);font-size:.85rem;font-weight:600;cursor:pointer;transition:all .2s;}
.btn-out:hover{background:rgba(220,38,38,.14);border-color:rgba(220,38,38,.28);color:#fca5a5;}
.main{flex:1;overflow-y:auto;background:var(--bg);}
.mhdr{background:var(--surface);border-bottom:1px solid var(--cb);padding:22px 36px;box-shadow:var(--sh);}
.mtitle{font-size:1.75rem;font-weight:800;color:var(--txt);letter-spacing:-.4px;}
.msub{font-size:.87rem;color:var(--tm);margin-top:4px;}
.mbody{padding:28px 36px;}

/* GENERICS */
.card{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);padding:24px;box-shadow:var(--sh);}
.badge{display:inline-flex;align-items:center;border-radius:99px;padding:4px 12px;font-size:.73rem;font-weight:600;}
.b-stable{background:var(--gbg);color:var(--green);border:1.5px solid var(--gbr);}
.b-critical{background:var(--rbg);color:var(--red);border:1.5px solid var(--rbr);}
.b-recovered{background:var(--acc-l);color:var(--acc);border:1.5px solid var(--acc-m);}
.b-active{background:var(--gbg);color:var(--green);border:1.5px solid var(--gbr);}
.b-inactive{background:#f8fafc;color:var(--tl);border:1.5px solid #e2e8f0;}
.b-high{background:var(--rbg);color:var(--red);border:1.5px solid var(--rbr);}
.b-low{background:var(--rbg);color:var(--red);border:1.5px solid var(--rbr);}
.b-medium{background:var(--abg);color:var(--amb);border:1.5px solid var(--abr);}
.b-normal{background:var(--gbg);color:var(--green);border:1.5px solid var(--gbr);}
.b-severe{background:var(--rbg);color:var(--red);border:1.5px solid var(--rbr);}
.b-moderate{background:var(--abg);color:var(--amb);border:1.5px solid var(--abr);}
.b-mild{background:var(--gbg);color:var(--green);border:1.5px solid var(--gbr);}
.b-info{background:var(--acc-l);color:var(--acc);border:1.5px solid var(--acc-m);}
.b-warn{background:var(--abg);color:var(--amb);border:1.5px solid var(--abr);}
.b-error{background:var(--rbg);color:var(--red);border:1.5px solid var(--rbr);}
.b-visit{background:var(--acc-l);color:var(--acc);border:1.5px solid var(--acc-m);}
.b-lab{background:var(--pbg);color:var(--pur);border:1.5px solid var(--pbr);}
.b-procedure{background:var(--abg);color:var(--amb);border:1.5px solid var(--abr);}

.tbl{width:100%;border-collapse:collapse;}
.tbl th{text-align:left;padding:11px 16px;font-size:.71rem;font-weight:700;color:var(--tm);text-transform:uppercase;letter-spacing:.08em;border-bottom:1.5px solid var(--cb);background:#f8fafc;}
.tbl td{padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:.87rem;vertical-align:middle;}
.tbl tr:last-child td{border:none;}
.tbl tr:hover td{background:#fafcff;}
.tbl-wrap{overflow-x:auto;}
.sb-bar{position:relative;margin-bottom:18px;}
.sb-bar input{width:100%;max-width:420px;background:var(--surface);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);padding:11px 16px 11px 40px;font-family:var(--font);font-size:.87rem;outline:none;transition:border-color .2s,box-shadow .2s;}
.sb-bar input:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.1);}
.sb-bar input::placeholder{color:var(--tl);}
.sb-ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--tl);font-size:.75rem;}
.tog-btn{padding:6px 14px;border-radius:99px;border:1.5px solid;cursor:pointer;font-family:var(--font);font-size:.77rem;font-weight:600;transition:all .18s;}
.tog-on{background:var(--gbg);color:var(--green);border-color:var(--gbr);}
.tog-off{background:var(--rbg);color:var(--red);border-color:var(--rbr);}
.modal-ov{position:fixed;inset:0;z-index:200;background:rgba(15,23,42,.5);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fi .2s ease;}
@keyframes fi{from{opacity:0;}to{opacity:1;}}
.modal-box{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r3);padding:36px;width:100%;max-width:520px;box-shadow:var(--sh3);animation:fu .25s ease forwards;max-height:90vh;overflow-y:auto;}
.mt{font-size:1.25rem;font-weight:800;color:var(--txt);margin-bottom:22px;}
.mf{margin-bottom:14px;}
.mf label{display:block;font-size:.73rem;font-weight:700;color:var(--tm);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
.mf input,.mf select,.mf textarea{width:100%;background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);padding:11px 14px;font-family:var(--font);font-size:.87rem;outline:none;transition:border-color .2s;}
.mf input:focus,.mf select:focus,.mf textarea:focus{border-color:var(--acc);}
.mf textarea{resize:vertical;min-height:80px;}
.ma{display:flex;gap:10px;margin-top:8px;}
.btn-p{background:linear-gradient(135deg,var(--acc-d),var(--acc));color:#fff;border:none;border-radius:var(--r);padding:12px 24px;font-family:var(--font);font-weight:700;cursor:pointer;transition:all .2s;flex:1;font-size:.9rem;}
.btn-p:hover{opacity:.88;transform:translateY(-1px);}
.btn-s{background:transparent;color:var(--tm);border:1.5px solid var(--cb);border-radius:var(--r);padding:12px 18px;font-family:var(--font);font-weight:600;cursor:pointer;transition:all .2s;font-size:.9rem;}
.btn-s:hover{border-color:var(--acc);color:var(--acc);}
.btn-sm{padding:6px 14px;border-radius:99px;border:1.5px solid var(--cb);cursor:pointer;font-family:var(--font);font-size:.77rem;font-weight:600;background:transparent;color:var(--tm);transition:all .18s;}
.btn-sm:hover{border-color:var(--acc);color:var(--acc);background:var(--acc-l);}
.initials{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,var(--acc-d),var(--acc));display:inline-flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:800;color:#fff;flex-shrink:0;}

/* SPECIALTY DROPDOWN */
.spec-dropdown-wrap{position:relative;}
.spec-input{width:100%;background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);padding:11px 14px;font-family:var(--font);font-size:.87rem;outline:none;cursor:pointer;transition:border-color .2s;}
.spec-input:focus{border-color:var(--acc);}
.spec-list{position:absolute;top:calc(100% + 4px);left:0;right:0;background:var(--surface);border:1.5px solid var(--acc-m);border-radius:var(--r2);box-shadow:var(--sh3);z-index:300;max-height:280px;overflow-y:auto;animation:fu .15s ease;}
.spec-item{padding:10px 14px;font-size:.87rem;cursor:pointer;border-bottom:1px solid #f1f5f9;color:var(--txt);transition:background .15s;display:flex;align-items:center;gap:10px;}
.spec-item:last-child{border:none;}
.spec-item:hover,.spec-item.active{background:var(--acc-l);color:var(--acc);}
.spec-num{font-family:var(--mono);font-size:.67rem;color:var(--tl);width:22px;flex-shrink:0;}

/* CREDIT BANNER */
.credit-banner{background:linear-gradient(135deg,#0f2d52,#1a4480);border-radius:var(--r2);padding:14px 22px;margin-bottom:20px;display:flex;align-items:center;gap:14px;box-shadow:var(--sh);}
.cb-dot{width:8px;height:8px;border-radius:50%;background:#93c5fd;flex-shrink:0;}
.cb-lbl{font-size:.68rem;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.12em;}
.cb-name{font-size:.9rem;font-weight:700;color:#fff;}
.cb-ar{font-size:.82rem;color:#93c5fd;direction:rtl;}

/* DIRECTORY */
.dir-hero{background:linear-gradient(135deg,#1a4480,#2563eb);border-radius:var(--r3);padding:38px 44px;margin-bottom:26px;position:relative;overflow:hidden;box-shadow:var(--sh3);}
.dh-bg1{position:absolute;right:-60px;top:-60px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.05);}
.dh-bg2{position:absolute;right:60px;bottom:-80px;width:190px;height:190px;border-radius:50%;background:rgba(255,255,255,.04);}
.dh-inner{position:relative;z-index:2;}
.dh-lbl{font-size:.7rem;font-weight:700;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.15em;margin-bottom:9px;}
.dh-title{font-size:2.2rem;font-weight:800;color:#fff;letter-spacing:-.5px;margin-bottom:7px;}
.dh-sub{font-size:.93rem;color:rgba(255,255,255,.68);margin-bottom:28px;max-width:520px;line-height:1.6;}
.dh-stats{display:flex;gap:20px;flex-wrap:wrap;}
.dh-stat{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:var(--r);padding:12px 20px;}
.dh-sv{font-size:1.5rem;font-weight:800;color:#fff;font-family:var(--mono);}
.dh-sl{font-size:.7rem;color:rgba(255,255,255,.55);margin-top:2px;}
.dsb{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);padding:18px 22px;margin-bottom:22px;display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;box-shadow:var(--sh);}
.df{display:flex;flex-direction:column;gap:5px;flex:1;min-width:160px;}
.df label{font-size:.7rem;font-weight:700;color:var(--tm);text-transform:uppercase;letter-spacing:.06em;}
.di{background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);padding:10px 13px;font-family:var(--font);font-size:.87rem;outline:none;transition:border-color .2s,box-shadow .2s;}
.di:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.1);}
.di::placeholder{color:var(--tl);}
.fpill{padding:7px 15px;border-radius:99px;border:1.5px solid var(--cb);cursor:pointer;font-family:var(--font);font-size:.77rem;font-weight:600;color:var(--tm);background:var(--surface);transition:all .18s;}
.fpill.active{border-color:var(--acc);background:var(--acc-l);color:var(--acc);}
.fpill:hover:not(.active){border-color:var(--acc-m);color:var(--acc);}
.doc-card{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);cursor:pointer;transition:all .2s;box-shadow:var(--sh);overflow:hidden;margin-bottom:10px;}
.doc-card:hover{border-color:var(--acc-m);box-shadow:var(--sh2);}
.doc-card.open{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.08);}
.dc-row{display:flex;align-items:center;gap:18px;padding:18px 22px;}
.dc-av{width:50px;height:50px;border-radius:13px;background:linear-gradient(135deg,var(--acc-d),var(--acc));display:flex;align-items:center;justify-content:center;font-size:.82rem;font-weight:800;color:#fff;flex-shrink:0;}
.dc-main{flex:1;min-width:0;}
.dc-name{font-size:1rem;font-weight:700;color:var(--txt);margin-bottom:1px;}
.dc-name-ar{font-size:.76rem;color:var(--tl);direction:rtl;margin-bottom:3px;}
.dc-spec{font-size:.83rem;color:var(--acc);font-weight:600;}
.dc-meta{display:flex;gap:14px;margin-top:5px;flex-wrap:wrap;}
.dc-mi{font-size:.76rem;color:var(--tm);}
.dc-exp{width:28px;height:28px;border-radius:8px;border:1.5px solid var(--cb);background:transparent;color:var(--tm);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800;transition:all .18s;font-family:var(--mono);flex-shrink:0;}
.doc-card.open .dc-exp,.dc-exp:hover{border-color:var(--acc);color:var(--acc);background:var(--acc-l);}
.dc-detail{padding:0 22px 20px;border-top:1px solid var(--cb);}
.dc-di{padding-top:18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.dc-dg{display:flex;flex-direction:column;gap:3px;}
.dc-dl{font-size:.67rem;font-weight:700;color:var(--tl);text-transform:uppercase;letter-spacing:.08em;}
.dc-dv{font-size:.86rem;color:var(--txt);font-weight:500;}
.dc-dv.mono{font-family:var(--mono);font-size:.8rem;}
.dc-dv.blue{color:var(--acc);}

/* ALERTS / SCHEDULE */
.al-card{background:var(--surface);border-radius:var(--r2);padding:16px 20px;display:flex;gap:14px;align-items:flex-start;border-left:4px solid transparent;margin-bottom:10px;box-shadow:var(--sh);}
.al-critical{border-color:var(--red);}
.al-warning{border-color:var(--amb);}
.al-info{border-color:var(--acc);}
.al-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.al-dot-critical{background:var(--red);}
.al-dot-warning{background:var(--amb);}
.al-dot-info{background:var(--acc);}
.sc-item{display:flex;align-items:center;gap:16px;background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);padding:15px 20px;margin-bottom:10px;box-shadow:var(--sh);transition:border-color .2s;}
.sc-item:hover{border-color:var(--acc-m);}
.sc-time{font-family:var(--mono);font-size:.9rem;color:var(--acc);font-weight:700;width:52px;flex-shrink:0;}
.sc-room{margin-left:auto;font-family:var(--mono);font-size:.77rem;background:var(--acc-l);color:var(--acc);padding:5px 11px;border-radius:var(--r);border:1px solid var(--acc-m);}
.log-row{display:flex;gap:14px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f1f5f9;}
.log-row:last-child{border:none;}
.lt{font-family:var(--mono);font-size:.72rem;color:var(--tl);flex-shrink:0;width:136px;}
.lu{font-size:.78rem;color:var(--acc);font-weight:600;flex-shrink:0;width:152px;}
.la{font-size:.83rem;color:var(--tm);}
.dept-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;}
.dept-card{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);padding:20px 22px;box-shadow:var(--sh);transition:all .2s;}
.dept-card:hover{border-color:var(--acc-m);box-shadow:var(--sh2);transform:translateY(-2px);}
.dept-name{font-size:1rem;font-weight:700;color:var(--txt);margin-bottom:6px;}
.dept-head{font-size:.78rem;color:var(--acc);margin-bottom:10px;font-weight:500;}
.dept-row{display:flex;justify-content:space-between;}
.dept-stat{font-size:.78rem;color:var(--tm);}
.dept-bar{height:4px;background:#f1f5f9;border-radius:99px;margin-top:10px;overflow:hidden;}
.dept-bar-fill{height:100%;background:linear-gradient(90deg,var(--acc-d),var(--acc));border-radius:99px;}

/* ── PATIENT PORTAL ── */
.pt-hero{background:linear-gradient(135deg,#1a4480,#2563eb);border-radius:var(--r3);padding:32px 36px;margin-bottom:22px;position:relative;overflow:hidden;box-shadow:var(--sh3);}
.pt-hero-bg{position:absolute;right:-40px;top:-40px;width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,.05);}
.pt-inner{position:relative;z-index:2;display:flex;align-items:center;gap:22px;flex-wrap:wrap;}
.pt-av{width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,.18);border:3px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:#fff;flex-shrink:0;}
.pt-name{font-size:1.5rem;font-weight:800;color:#fff;letter-spacing:-.4px;margin-bottom:2px;}
.pt-name-ar{font-size:.9rem;color:rgba(255,255,255,.65);direction:rtl;margin-bottom:3px;}
.pt-info{font-size:.83rem;color:rgba(255,255,255,.65);}
.pt-badges{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.pt-stat-row{display:flex;gap:14px;margin-top:18px;flex-wrap:wrap;}
.pt-stat{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:var(--r);padding:10px 16px;}
.pt-sv{font-size:1.2rem;font-weight:800;color:#fff;font-family:var(--mono);}
.pt-sl{font-size:.68rem;color:rgba(255,255,255,.55);margin-top:2px;}

.pt-tabs{display:flex;gap:6px;margin-bottom:20px;background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);padding:6px;box-shadow:var(--sh);flex-wrap:wrap;}
.pt-tab{padding:9px 16px;border-radius:var(--r);border:none;background:transparent;cursor:pointer;font-family:var(--font);font-weight:600;font-size:.83rem;color:var(--tm);transition:all .2s;}
.pt-tab.active{background:var(--acc);color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.3);}
.pt-tab:hover:not(.active){background:var(--acc-l);color:var(--acc);}

.pt-sec-title{font-size:1rem;font-weight:700;color:var(--txt);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.pt-sec-dot{width:10px;height:10px;border-radius:3px;background:var(--acc);}

.pt-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
.pt-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px;}

/* vitals */
.vital-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px;}
.vital-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:14px 16px;text-align:center;}
.vital-val{font-size:1.3rem;font-weight:800;font-family:var(--mono);color:var(--txt);}
.vital-lbl{font-size:.68rem;color:var(--tl);margin-top:3px;text-transform:uppercase;letter-spacing:.06em;}
.vital-date{font-size:.67rem;color:var(--tl);margin-top:2px;}

/* medications */
.med-row{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #f1f5f9;}
.med-row:last-child{border:none;}
.med-icon{width:36px;height:36px;border-radius:10px;background:var(--pbg);border:1.5px solid var(--pbr);display:flex;align-items:center;justify-content:center;font-size:.75rem;flex-shrink:0;color:var(--pur);font-weight:800;}
.med-name{font-weight:700;color:var(--txt);font-size:.9rem;}
.med-info{font-size:.78rem;color:var(--tm);margin-top:2px;}

/* lab results */
.lab-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #f1f5f9;}
.lab-row:last-child{border:none;}
.lab-name{flex:1;font-weight:600;color:var(--txt);font-size:.87rem;}
.lab-val{font-family:var(--mono);font-size:.85rem;font-weight:700;color:var(--txt);}
.lab-ref{font-size:.74rem;color:var(--tl);margin-left:8px;}

/* doctor notes */
.note-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:16px 18px;margin-bottom:10px;}
.note-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.note-auth{font-weight:700;color:var(--acc);font-size:.83rem;}
.note-date{font-family:var(--mono);font-size:.72rem;color:var(--tl);}
.note-txt{font-size:.86rem;color:var(--tm);line-height:1.65;}

/* symptoms / history */
.sym-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #f1f5f9;}
.sym-row:last-child{border:none;}
.sym-date{font-family:var(--mono);font-size:.73rem;color:var(--tl);flex-shrink:0;width:90px;}
.sym-name{font-size:.87rem;font-weight:600;color:var(--txt);flex:1;}
.sym-note{font-size:.78rem;color:var(--tm);}
.hist-item{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid #f1f5f9;align-items:flex-start;}
.hist-item:last-child{border:none;}
.hist-date{font-family:var(--mono);font-size:.72rem;color:var(--tl);flex-shrink:0;width:90px;padding-top:2px;}
.hist-txt{font-size:.86rem;color:var(--txt);}

/* protocol steps */
.proto-steps{display:flex;flex-direction:column;gap:10px;}
.ps{display:flex;align-items:flex-start;gap:12px;}
.ps-num{width:26px;height:26px;border-radius:7px;background:var(--acc-l);color:var(--acc);font-size:.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid var(--acc-m);}
.ps-txt{font-size:.86rem;color:var(--txt);padding-top:4px;}

/* appt */
.appt-card{background:var(--acc-l);border:1.5px solid var(--acc-m);border-radius:var(--r2);padding:18px 20px;}
.appt-date{font-family:var(--mono);font-size:1.2rem;font-weight:700;color:var(--acc);margin-bottom:4px;}
.appt-dr{font-size:.83rem;color:var(--tm);}

/* contact doctor widget */
.contact-widget{background:linear-gradient(135deg,var(--acc-l),#f0f9ff);border:1.5px solid var(--acc-m);border-radius:var(--r2);padding:18px 20px;display:flex;gap:16px;align-items:center;}
.cw-av{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--acc-d),var(--acc));display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:.8rem;flex-shrink:0;}
.cw-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.cw-btn{padding:7px 14px;border-radius:99px;border:1.5px solid var(--acc-m);background:var(--surface);color:var(--acc);font-family:var(--font);font-size:.77rem;font-weight:600;cursor:pointer;transition:all .18s;}
.cw-btn:hover{background:var(--acc);color:#fff;}

/* health tips */
.tip-card{background:linear-gradient(135deg,var(--gbg),#f0fdf4);border:1.5px solid var(--gbr);border-radius:var(--r2);padding:14px 18px;margin-bottom:10px;display:flex;gap:12px;align-items:flex-start;}
.tip-icon{width:32px;height:32px;border-radius:9px;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0;color:#fff;font-weight:800;}
.tip-txt{font-size:.84rem;color:var(--txt);line-height:1.6;}
.tip-lbl{font-size:.68rem;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;}

.tbl th{background:var(--bg);}
.tbl tr:hover td{background:var(--acc-l);}
.tbl td,.lab-row,.med-row,.sym-row,.hist-item,.log-row{border-color:var(--cb);}
.spec-item{border-color:var(--cb);}

@media(max-width:900px){.lp-left{padding:40px 32px;}.lp-h{font-size:1.9rem;}}
@media(max-width:700px){
  .lp-card{grid-template-columns:1fr;}.lp-left{display:none;}.lp-right{padding:40px 28px;}
  .sidebar{width:54px;}.sb-hdr,.ni .nav-label,.nav-sec,.sb-pill{display:none;}.ni{justify-content:center;}
  .mbody{padding:18px 14px;}.mhdr{padding:16px 18px;}
  .pt-grid2,.pt-grid3,.vital-grid{grid-template-columns:1fr 1fr;}
  .dc-di{grid-template-columns:1fr 1fr;}
  .theme-toggle{top:12px;right:12px;}
}
`;

// helps
const Bdg = ({type,label}) => <span className={`badge b-${type}`}>{label}</span>;
function getInit(name){return name.replace('Dr.','').trim().split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase();}

function Modal({title,onClose,children}){
  return(
    <div className="modal-ov" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div className="mt">{title}</div>{children}
      </div>
    </div>
  );
}

function CreditBanner(){ return null; }

// specialty Dropdown
function SpecialtyDropdown({value, onChange}){
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState('');
  const filtered = SPECIALTIES_LIST.filter(s=>s.toLowerCase().includes(q.toLowerCase()));
  const display = value||'Select a specialty…';
  return(
    <div className="spec-dropdown-wrap">
      <input
        className="spec-input"
        readOnly
        value={value?value:''}
        placeholder="Select a specialty…"
        onClick={()=>setOpen(o=>!o)}
        style={{cursor:'pointer',caretColor:'transparent'}}
      />
      {open&&<div className="spec-list">
        <div style={{padding:'8px 10px',borderBottom:'1px solid var(--cb)'}}>
          <input
            autoFocus
            placeholder="Search specialty…"
            value={q}
            onChange={e=>setQ(e.target.value)}
            onClick={e=>e.stopPropagation()}
            style={{width:'100%',border:'1.5px solid var(--cb)',borderRadius:'var(--r)',padding:'8px 12px',fontFamily:'var(--font)',fontSize:'.84rem',outline:'none',background:'var(--bg)',color:'var(--txt)'}}
          />
        </div>
        {filtered.map((s,i)=>(
          <div key={s} className={`spec-item ${value===s?'active':''}`}
            onClick={()=>{onChange(s);setOpen(false);setQ('');}}>
            <span className="spec-num">{(SPECIALTIES_LIST.indexOf(s)+1).toString().padStart(2,'0')}</span>
            {s}
          </div>
        ))}
        {filtered.length===0&&<div style={{padding:'14px',color:'var(--tl)',fontSize:'.84rem',textAlign:'center'}}>No match</div>}
      </div>}
    </div>
  );
}

// directory
function Directory(){
  const [q,setQ]=useState('');
  const [spec,setSpec]=useState('');
  const [st,setSt]=useState('all');
  const [exp,setExp]=useState(null);
  const active=ALL_DOCTORS.filter(d=>d.status==='active').length;
  const list=ALL_DOCTORS.filter(d=>{
    const m=q.toLowerCase();
    return(d.name.toLowerCase().includes(m)||d.specialty.toLowerCase().includes(m)||d.id.toLowerCase().includes(m)||d.arabicName.includes(q))
      &&(!spec||d.specialty===spec)
      &&(st==='all'||d.status===st);
  });
  return(<>
    <CreditBanner/>
    <div className="dir-hero"><div className="dh-bg1"/><div className="dh-bg2"/>
      <div className="dh-inner">
        <div className="dh-lbl">BlueMed Health Network</div>
        <div className="dh-title">Doctors Directory</div>
        <div className="dh-sub">Search and connect with our physicians. Filter by name, specialty, or availability.</div>
        <div className="dh-stats">
          {[[ALL_DOCTORS.length,'Total Physicians'],[active,'Currently Active'],['31','Specialties']].map(([v,l])=>(
            <div className="dh-stat" key={l}><div className="dh-sv">{v}</div><div className="dh-sl">{l}</div></div>
          ))}
        </div>
      </div>
    </div>
    <div className="dsb">
      <div className="df"><label>Search Doctor</label>
        <input className="di" placeholder="Name, specialty, or ID…" value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className="df"><label>Specialty</label>
        <SpecialtyDropdown value={spec} onChange={setSpec}/>
        {spec&&<button onClick={()=>setSpec('')} style={{marginTop:5,fontSize:'.72rem',color:'var(--red)',background:'none',border:'none',cursor:'pointer',padding:0}}>✕ Clear filter</button>}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:5}}>
        <label style={{fontSize:'.7rem',fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:'.06em'}}>Status</label>
        <div style={{display:'flex',gap:7}}>
          {['all','active','inactive'].map(s=>(
            <button key={s} className={`fpill ${st===s?'active':''}`} onClick={()=>setSt(s)}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div style={{color:'var(--tm)',fontSize:'.82rem',fontWeight:500,alignSelf:'flex-end',paddingBottom:2}}>{list.length} result{list.length!==1?'s':''}</div>
    </div>
    {list.length===0&&<div className="card" style={{textAlign:'center',padding:'48px',color:'var(--tl)'}}>
      <div style={{fontSize:'1.2rem',fontWeight:700,marginBottom:8,color:'var(--tm)'}}>No doctors found</div>
      <div style={{fontSize:'.87rem'}}>Adjust your search or filters.</div>
    </div>}
    {list.map(d=>{
      const isO=exp===d.id;
      return(
        <div key={d.id} className={`doc-card ${isO?'open':''}`} onClick={()=>setExp(isO?null:d.id)}>
          <div className="dc-row">
            <div className="dc-av">{getInit(d.name)}</div>
            <div className="dc-main">
              <div className="dc-name">{d.name}</div>
              <div className="dc-name-ar">{d.arabicName}</div>
              <div className="dc-spec">{d.specialty}</div>
              <div className="dc-meta">
                <span className="dc-mi">ID: <strong style={{fontFamily:'var(--mono)',fontSize:'.74rem'}}>{d.id}</strong></span>
                <span className="dc-mi">·</span><span className="dc-mi">{d.patients} patients</span>
                <span className="dc-mi">·</span><span className="dc-mi">Since {d.joined}</span>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
              <Bdg type={d.status} label={d.status==='active'?'Active':'Inactive'}/>
              <button className="dc-exp" onClick={e=>{e.stopPropagation();setExp(isO?null:d.id);}}>{isO?'−':'+'}</button>
            </div>
          </div>
          {isO&&<div className="dc-detail"><div className="dc-di">
            {[['Phone',d.phone,'mono blue'],['Email',d.email,'mono blue'],['Specialty',d.specialty,''],
              ['Patients',String(d.patients),'mono'],['Joined',d.joined,'mono'],['Arabic Name',d.arabicName,'']].map(([l,v,cls])=>(
              <div className="dc-dg" key={l}>
                <span className="dc-dl">{l}</span>
                {l==='Status'?<Bdg type={d.status==='active'?'active':'inactive'} label={v}/>
                :<span className={`dc-dv ${cls}`} style={l==='Arabic Name'?{direction:'rtl'}:{}}>{v}</span>}
              </div>
            ))}
          </div></div>}
        </div>
      );
    })}
  </>);
}

// Admin pages
function ADepts(){
  return(<><CreditBanner/>
    <div className="dept-grid">
      {DEPARTMENTS.map(d=>(
        <div className="dept-card" key={d.name}>
          <div className="dept-name">{d.name}</div>
          <div className="dept-head">{d.head}</div>
          <div className="dept-row"><span className="dept-stat">{d.staff} staff</span><span className="dept-stat">{d.patients} patients</span></div>
          <div className="dept-bar"><div className="dept-bar-fill" style={{width:`${Math.min(100,d.patients*1.5)}%`}}/></div>
        </div>
      ))}
    </div>
  </>);
}

function ADoctors(){
  const [docs,setDocs]=useState(ALL_DOCTORS);
  const [q,setQ]=useState('');
  const toggle=id=>setDocs(p=>p.map(d=>d.id===id?{...d,status:d.status==='active'?'inactive':'active'}:d));
  const list=docs.filter(d=>d.name.toLowerCase().includes(q.toLowerCase())||d.specialty.toLowerCase().includes(q.toLowerCase()));
  const active=docs.filter(d=>d.status==='active').length;
  return(<><CreditBanner/>
    <div style={{display:'flex',gap:12,marginBottom:16}}>
      <div style={{background:'var(--gbg)',border:'1.5px solid var(--gbr)',borderRadius:'var(--r)',padding:'12px 20px'}}>
        <div style={{fontSize:'1.4rem',fontWeight:800,color:'var(--green)',fontFamily:'var(--mono)'}}>{active}</div>
        <div style={{fontSize:'.75rem',color:'var(--green)'}}>Active</div>
      </div>
      <div style={{background:'var(--rbg)',border:'1.5px solid var(--rbr)',borderRadius:'var(--r)',padding:'12px 20px'}}>
        <div style={{fontSize:'1.4rem',fontWeight:800,color:'var(--red)',fontFamily:'var(--mono)'}}>{docs.length-active}</div>
        <div style={{fontSize:'.75rem',color:'var(--red)'}}>Inactive</div>
      </div>
    </div>
    <div className="sb-bar"><span className="sb-ico">S</span>
      <input placeholder="Search by name or specialty…" value={q} onChange={e=>setQ(e.target.value)}/>
    </div>
    <div className="card"><div className="tbl-wrap">
      <table className="tbl">
        <thead><tr>{['ID','Name','Arabic','Specialty','Patients','Status','Action'].map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>{list.map(d=>(
          <tr key={d.id}>
            <td style={{fontFamily:'var(--mono)',fontSize:'.76rem',color:'var(--tl)'}}>{d.id}</td>
            <td><div style={{display:'flex',alignItems:'center',gap:9}}><span className="initials">{getInit(d.name)}</span><span style={{fontWeight:600}}>{d.name}</span></div></td>
            <td style={{direction:'rtl',color:'var(--tm)',fontSize:'.83rem'}}>{d.arabicName}</td>
            <td style={{color:'var(--tm)',fontSize:'.83rem'}}>{d.specialty}</td>
            <td style={{fontFamily:'var(--mono)',color:'var(--tm)'}}>{d.patients}</td>
            <td><Bdg type={d.status} label={d.status==='active'?'Active':'Inactive'}/></td>
            <td><button className={`tog-btn ${d.status==='active'?'tog-off':'tog-on'}`} onClick={()=>toggle(d.id)}>{d.status==='active'?'Deactivate':'Activate'}</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div></div>
  </>);
}

function APatients(){
  const [q,setQ]=useState('');
  const list=PATIENTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.dept.toLowerCase().includes(q.toLowerCase())||p.status.toLowerCase().includes(q.toLowerCase()));
  return(<><CreditBanner/>
    <div className="sb-bar"><span className="sb-ico">S</span>
      <input placeholder="Search by name, department, or status…" value={q} onChange={e=>setQ(e.target.value)}/>
    </div>
    <div className="card"><div className="tbl-wrap">
      <table className="tbl">
        <thead><tr>{['ID','Name','Arabic','Age','Dept','Doctor','Status','Last Visit'].map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>{list.map(p=>(
          <tr key={p.id}>
            <td style={{fontFamily:'var(--mono)',fontSize:'.76rem',color:'var(--tl)'}}>{p.id}</td>
            <td style={{fontWeight:600}}>{p.name}</td>
            <td style={{direction:'rtl',color:'var(--tm)',fontSize:'.83rem'}}>{p.arabicName}</td>
            <td style={{fontFamily:'var(--mono)',color:'var(--tm)'}}>{p.age}</td>
            <td style={{color:'var(--tm)'}}>{p.dept}</td>
            <td style={{color:'var(--tm)',fontSize:'.82rem'}}>{p.doctor}</td>
            <td><Bdg type={p.status.toLowerCase()} label={p.status}/></td>
            <td style={{color:'var(--tl)',fontSize:'.79rem'}}>{p.lastVisit}</td>
          </tr>
        ))}</tbody>
      </table>
    </div></div>
  </>);
}

function AProtocols(){
  return(<><CreditBanner/>
    <div className="card"><div className="tbl-wrap">
      <table className="tbl">
        <thead><tr>{['ID','Protocol','Department','Updated','Severity'].map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>{PROTOCOLS.map(p=>(
          <tr key={p.id}>
            <td style={{fontFamily:'var(--mono)',fontSize:'.76rem',color:'var(--tl)'}}>{p.id}</td>
            <td style={{fontWeight:600}}>{p.title}</td>
            <td style={{color:'var(--tm)'}}>{p.dept}</td>
            <td style={{color:'var(--tl)',fontSize:'.79rem'}}>{p.updated}</td>
            <td><Bdg type={p.severity} label={p.severity.charAt(0).toUpperCase()+p.severity.slice(1)}/></td>
          </tr>
        ))}</tbody>
      </table>
    </div></div>
  </>);
}

function ALogs(){
  return(<><CreditBanner/>
    <div className="card">{LOGS.map((l,i)=>(
      <div className="log-row" key={i}>
        <span className="lt">{l.time}</span>
        <span className="lu">{l.user}</span>
        <span className="la">{l.action}</span>
        <span style={{marginLeft:'auto'}}><Bdg type={l.type} label={l.type}/></span>
      </div>
    ))}</div>
  </>);
}

// Doctor pages
function DPatients(){
  const mine=PATIENTS.filter(p=>p.doctor==='Dr. Sara Mei');
  const [q,setQ]=useState('');
  const list=mine.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));
  return(<><CreditBanner/>
    <div className="sb-bar"><span className="sb-ico">S</span>
      <input placeholder="Search patients…" value={q} onChange={e=>setQ(e.target.value)}/>
    </div>
    <div className="card"><div className="tbl-wrap">
      <table className="tbl">
        <thead><tr>{['ID','Name','Arabic','Age','Dept','Status','Last Visit','Next Appt'].map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>{list.map(p=>(
          <tr key={p.id}>
            <td style={{fontFamily:'var(--mono)',fontSize:'.76rem',color:'var(--tl)'}}>{p.id}</td>
            <td style={{fontWeight:600}}>{p.name}</td>
            <td style={{direction:'rtl',color:'var(--tm)',fontSize:'.83rem'}}>{p.arabicName}</td>
            <td style={{fontFamily:'var(--mono)',color:'var(--tm)'}}>{p.age}</td>
            <td style={{color:'var(--tm)'}}>{p.dept}</td>
            <td><Bdg type={p.status.toLowerCase()} label={p.status}/></td>
            <td style={{color:'var(--tl)',fontSize:'.79rem'}}>{p.lastVisit}</td>
            <td style={{fontFamily:'var(--mono)',fontSize:'.79rem',color:'var(--acc)'}}>{p.nextAppt}</td>
          </tr>
        ))}</tbody>
      </table>
    </div></div>
  </>);
}

function DAlerts(){
  const [als,setAls]=useState(DOCTOR_ALERTS);
  const dismiss=id=>setAls(p=>p.filter(a=>a.id!==id));
  return(<><CreditBanner/>
    {als.length===0&&<div className="card" style={{textAlign:'center',padding:'48px'}}>
      <div style={{fontSize:'1.3rem',fontWeight:700,color:'var(--green)',marginBottom:8}}>All Clear</div>
      <div style={{color:'var(--tm)',fontSize:'.88rem'}}>No active alerts.</div>
    </div>}
    {als.map(a=>(
      <div className={`al-card al-${a.level}`} key={a.id}>
        <div className={`al-dot al-dot-${a.level}`}/>
        <div style={{flex:1}}>
          <div style={{fontSize:'.78rem',color:'var(--tm)',marginBottom:2,fontWeight:700}}>{a.patient}</div>
          <div style={{fontSize:'.88rem',color:'var(--txt)',fontWeight:500}}>{a.msg}</div>
          <div style={{fontSize:'.74rem',color:'var(--tl)',marginTop:3}}>{a.time}</div>
        </div>
        <button className="btn-sm" onClick={()=>dismiss(a.id)}>Dismiss</button>
      </div>
    ))}
  </>);
}

function DProtocol(){
  const [open,setOpen]=useState(null);
  return(<><CreditBanner/>
    {PROTOCOLS.map(p=>(
      <div key={p.id} onClick={()=>setOpen(open===p.id?null:p.id)}
        style={{background:'var(--surface)',border:`1.5px solid ${open===p.id?'var(--acc)':'var(--cb)'}`,borderRadius:'var(--r2)',padding:'18px 22px',cursor:'pointer',transition:'all .2s',boxShadow:'var(--sh)',marginBottom:10}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <div>
            <div style={{fontWeight:700,color:'var(--txt)',marginBottom:3,fontSize:'.95rem'}}>{p.title}</div>
            <div style={{fontSize:'.77rem',color:'var(--tm)'}}>{p.dept} · Updated {p.updated}</div>
          </div>
          <div style={{display:'flex',gap:9,alignItems:'center',flexShrink:0}}>
            <Bdg type={p.severity} label={p.severity}/>
            <span style={{color:'var(--tl)',fontFamily:'var(--mono)',fontSize:'.78rem'}}>{open===p.id?'[-]':'[+]'}</span>
          </div>
        </div>
        {open===p.id&&<div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--cb)',color:'var(--tm)',fontSize:'.85rem',lineHeight:1.75}}>
          Protocol for <strong style={{color:'var(--txt)'}}>{p.title}</strong> covers {p.dept} department procedures. Last reviewed {p.updated}.
        </div>}
      </div>
    ))}
  </>);
}

function DSchedule(){
  const [open,setOpen]=useState(false);
  const [saved,setSaved]=useState(false);
  const save=()=>{setSaved(true);setTimeout(()=>{setSaved(false);setOpen(false);},1400);};
  return(<><CreditBanner/>
    {open&&<Modal title="Add Appointment" onClose={()=>setOpen(false)}>
      {saved?<div style={{textAlign:'center',padding:'24px 0'}}>
        <div style={{fontSize:'1.3rem',fontWeight:800,color:'var(--green)'}}>Scheduled</div>
        <div style={{color:'var(--tm)',marginTop:8,fontSize:'.9rem'}}>Appointment saved successfully.</div>
      </div>:<>
        <div className="mf"><label>Patient Name</label><input placeholder="Full name"/></div>
        <div className="mf"><label>Time</label><input type="time"/></div>
        <div className="mf"><label>Type</label><select><option>Follow-up</option><option>Consultation</option><option>Review</option><option>New Patient</option></select></div>
        <div className="mf"><label>Room</label><input placeholder="e.g. A-12"/></div>
        <div className="ma"><button className="btn-s" onClick={()=>setOpen(false)}>Cancel</button><button className="btn-p" onClick={save}>Save</button></div>
      </>}
    </Modal>}
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:18}}>
      <button className="btn-p" style={{padding:'10px 20px',fontSize:'.9rem'}} onClick={()=>setOpen(true)}>+ Add Appointment</button>
    </div>
    {SCHEDULE.map((s,i)=>(
      <div className="sc-item" key={i}>
        <span className="sc-time">{s.time}</span>
        <div><div style={{fontWeight:600,color:'var(--txt)',fontSize:'.9rem'}}>{s.patient}</div>
          <div style={{fontSize:'.77rem',color:'var(--tm)',marginTop:2}}>{s.type}</div>
        </div>
        <span className="sc-room">{s.room}</span>
      </div>
    ))}
  </>);
}

// patient portal
const HEALTH_TIPS = {
  Cardiology:['Take a 30-min walk daily to support heart health','Monitor your blood pressure every morning','Reduce sodium intake — aim for less than 2,300mg/day','Stay hydrated with at least 8 glasses of water'],
  Neurology:['Prioritize 7-9 hours of sleep each night','Practice stress reduction techniques like deep breathing','Avoid screen time 1 hour before bed','Stay mentally active with reading or puzzles'],
  Dermatology:['Apply moisturizer immediately after bathing','Avoid known allergens and irritants','Use fragrance-free laundry detergent','Wear protective clothing when outdoors'],
  Oncology:['Maintain a balanced diet rich in fruits and vegetables','Rest when needed — fatigue is normal after treatment','Stay connected with family and support groups','Report any new symptoms to your doctor immediately'],
  Psychiatry:['Establish a consistent daily routine','Practice mindfulness or meditation for 10 minutes daily','Limit caffeine and alcohol intake','Reach out to trusted friends or family when you feel low'],
};

function PatientPortal({patient}){
  const [tab,setTab]=useState('overview');
  const [msgOpen,setMsgOpen]=useState(false);
  const [msgSent,setMsgSent]=useState(false);
  const sendMsg=()=>{setMsgSent(true);setTimeout(()=>{setMsgSent(false);setMsgOpen(false);},1600);};
  const doc = ALL_DOCTORS.find(d=>d.name===patient.doctor);
  const tips = HEALTH_TIPS[patient.dept]||HEALTH_TIPS['Cardiology'];
  const latestVitals = patient.vitals[0];
  const tabs=[
    {id:'overview',label:'Overview'},
    {id:'vitals',label:'Vitals'},
    {id:'medications',label:'Medications'},
    {id:'labs',label:'Lab Results'},
    {id:'symptoms',label:'Symptoms'},
    {id:'history',label:'History'},
    {id:'protocol',label:'Protocol'},
    {id:'notes',label:'Doctor Notes'},
    {id:'tips',label:'Health Tips'},
  ];
  return(<>
    <CreditBanner/>
    {msgOpen&&<Modal title="Message Your Doctor" onClose={()=>setMsgOpen(false)}>
      {msgSent?<div style={{textAlign:'center',padding:'24px 0'}}>
        <div style={{fontSize:'1.3rem',fontWeight:800,color:'var(--green)'}}>Message Sent!</div>
        <div style={{color:'var(--tm)',marginTop:8,fontSize:'.9rem'}}>Your doctor will reply within 24 hours.</div>
      </div>:<>
        <div style={{background:'var(--acc-l)',border:'1.5px solid var(--acc-m)',borderRadius:'var(--r)',padding:'12px 16px',marginBottom:16,fontSize:'.84rem',color:'var(--acc)',fontWeight:500}}>
          To: {patient.doctor} · {doc?.specialty}
        </div>
        <div className="mf"><label>Subject</label><input placeholder="e.g. Question about my medication"/></div>
        <div className="mf"><label>Message</label><textarea placeholder="Write your message here…" rows={5}/></div>
        <div className="ma"><button className="btn-s" onClick={()=>setMsgOpen(false)}>Cancel</button><button className="btn-p" onClick={sendMsg}>Send Message</button></div>
      </>}
    </Modal>}

    {/* Hero */}
    <div className="pt-hero">
      <div className="pt-hero-bg"/>
      <div className="pt-inner">
        <div className="pt-av">{patient.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <div style={{flex:1}}>
          <div className="pt-name">{patient.name}</div>
          <div className="pt-name-ar">{patient.arabicName}</div>
          <div className="pt-info">ID: {patient.id} · Age {patient.age} · Blood: {patient.blood} · {patient.dept}</div>
          <div className="pt-badges">
            <Bdg type={patient.status.toLowerCase()} label={patient.status}/>
            <span style={{background:'rgba(255,255,255,.15)',color:'#fff',border:'1px solid rgba(255,255,255,.25)',borderRadius:'99px',padding:'4px 12px',fontSize:'.73rem',fontWeight:600}}>{patient.doctor}</span>
          </div>
        </div>
      </div>
      <div className="pt-stat-row">
        {[
          [patient.medications.length,'Medications','Active'],
          [patient.symptoms.length,'Symptoms','Reported'],
          [patient.alerts.length>0?'!':'✓','Alerts',patient.alerts.length>0?'Active':'None'],
          [patient.nextAppt,'Next Appt','Scheduled'],
        ].map(([v,l,s])=>(
          <div className="pt-stat" key={l}><div className="pt-sv" style={{fontSize:l==='Next Appt'?'.8rem':'1.2rem'}}>{v}</div><div className="pt-sl">{s}</div></div>
        ))}
      </div>
    </div>

    {/* Tabs */}
    <div className="pt-tabs">
      {tabs.map(t=>(
        <button key={t.id} className={`pt-tab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>
      ))}
    </div>

    {/* OVERVIEW */}
    {tab==='overview'&&<>
      <div className="pt-grid2">
        <div className="card">
          <div className="pt-sec-title"><div className="pt-sec-dot"/>Assigned Doctor</div>
          <div className="contact-widget">
            <div className="cw-av">{getInit(patient.doctor)}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,color:'var(--txt)',fontSize:'1rem'}}>{patient.doctor}</div>
              <div style={{fontSize:'.76rem',color:'var(--tl)',direction:'rtl',marginTop:1}}>{doc?.arabicName}</div>
              <div style={{fontSize:'.8rem',color:'var(--acc)',marginTop:2}}>{doc?.specialty}</div>
              <div className="cw-actions">
                <button className="cw-btn" onClick={()=>setMsgOpen(true)}>✉ Message</button>
                <button className="cw-btn">📞 Call</button>
                <button className="cw-btn">📅 Book Appt</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--green)'}}/>Current Status</div>
          <div style={{marginBottom:12}}><Bdg type={patient.status.toLowerCase()} label={patient.status}/></div>
          <div style={{fontSize:'.83rem',color:'var(--tm)',lineHeight:1.8}}>
            Last visit: <strong style={{color:'var(--txt)'}}>{patient.lastVisit}</strong><br/>
            Department: <strong style={{color:'var(--txt)'}}>{patient.dept}</strong><br/>
            Blood type: <strong style={{color:'var(--txt)'}}>{patient.blood}</strong>
          </div>
        </div>
      </div>
      {/* Latest vitals summary */}
      <div className="card" style={{marginBottom:16}}>
        <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--pur)'}}/>Latest Vitals <span style={{fontSize:'.73rem',color:'var(--tl)',fontWeight:400,marginLeft:4}}>{latestVitals.date}</span></div>
        <div className="vital-grid">
          {[['BP',latestVitals.bp,'mmHg'],['Heart Rate',latestVitals.hr+' bpm',''],['Temp',latestVitals.temp+'°C',''],['Weight',latestVitals.weight,'']].map(([l,v])=>(
            <div className="vital-card" key={l}><div className="vital-val">{v}</div><div className="vital-lbl">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="pt-grid2">
        <div className="card">
          <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--amb)'}}/>Active Alerts</div>
          {patient.alerts.length===0
            ?<div style={{color:'var(--green)',fontWeight:600,fontSize:'.88rem'}}>No active alerts</div>
            :patient.alerts.map(a=>(
              <div className={`al-card al-${a.level}`} key={a.id} style={{marginBottom:8}}>
                <div className={`al-dot al-dot-${a.level}`}/>
                <div style={{fontSize:'.84rem',color:'var(--txt)'}}>{a.msg}<div style={{fontSize:'.72rem',color:'var(--tl)',marginTop:2}}>{a.time}</div></div>
              </div>
            ))
          }
        </div>
        <div className="card">
          <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--acc)'}}/>Next Appointment</div>
          <div className="appt-card">
            <div className="appt-date">{patient.nextAppt}</div>
            <div className="appt-dr">{patient.doctor}</div>
            <div style={{fontSize:'.76rem',color:'var(--tm)',marginTop:2}}>{patient.dept}</div>
          </div>
          <button className="btn-p" style={{marginTop:12,width:'100%',padding:'10px'}} onClick={()=>setMsgOpen(true)}>Request Reschedule</button>
        </div>
      </div>
    </>}

    {/* VITALS */}
    {tab==='vitals'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--pur)'}}/>Vital Signs History</div>
      {patient.vitals.map((v,i)=>(
        <div key={i} style={{marginBottom:i<patient.vitals.length-1?20:0,paddingBottom:i<patient.vitals.length-1?20:0,borderBottom:i<patient.vitals.length-1?'1px solid #f1f5f9':'none'}}>
          <div style={{fontSize:'.75rem',fontFamily:'var(--mono)',color:'var(--tl)',marginBottom:10}}>Recorded: {v.date}</div>
          <div className="vital-grid">
            {[['Blood Pressure',v.bp,'mmHg'],['Heart Rate',v.hr+' bpm',''],['Temperature',v.temp+'°C',''],['Weight',v.weight,'']].map(([l,val])=>(
              <div className="vital-card" key={l}><div className="vital-val">{val}</div><div className="vital-lbl">{l}</div></div>
            ))}
          </div>
        </div>
      ))}
    </div>}

    {/* MEDICATIONS */}
    {tab==='medications'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--pur)'}}/>Current Medications</div>
      {patient.medications.map((m,i)=>(
        <div className="med-row" key={i}>
          <div className="med-icon">Rx</div>
          <div style={{flex:1}}>
            <div className="med-name">{m.name}</div>
            <div className="med-info">{m.dose} · {m.freq}</div>
          </div>
          <Bdg type={m.status==='active'?'active':'inactive'} label={m.status==='active'?'Active':'Stopped'}/>
        </div>
      ))}
      <div style={{background:'var(--abg)',border:'1.5px solid var(--abr)',borderRadius:'var(--r)',padding:'12px 16px',marginTop:16,fontSize:'.82rem',color:'var(--amb)',fontWeight:500}}>
        ⚠ Never stop or change your medication without consulting your doctor.
      </div>
    </div>}

    {/* LAB RESULTS */}
    {tab==='labs'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--pur)'}}/>Lab Results</div>
      {patient.labResults.map((l,i)=>(
        <div className="lab-row" key={i}>
          <div className="lab-name">{l.name}</div>
          <div><span className="lab-val">{l.value}</span><span className="lab-ref">Ref: {l.ref}</span></div>
          <Bdg type={l.status==='critical'?'critical':l.status==='high'||l.status==='low'?'high':'normal'} label={l.status.charAt(0).toUpperCase()+l.status.slice(1)}/>
        </div>
      ))}
    </div>}

    {/* SYMPTOMS */}
    {tab==='symptoms'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--red)'}}/>Reported Symptoms</div>
      {patient.symptoms.map((s,i)=>(
        <div className="sym-row" key={i}>
          <span className="sym-date">{s.date}</span>
          <span className="sym-name">{s.symptom}</span>
          <Bdg type={s.severity.toLowerCase()} label={s.severity}/>
          <span className="sym-note" style={{marginLeft:12,flex:1}}>{s.note}</span>
        </div>
      ))}
    </div>}

    {/* HISTORY */}
    {tab==='history'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--acc)'}}/>Medical History</div>
      {patient.history.map((h,i)=>(
        <div className="hist-item" key={i}>
          <span className="hist-date">{h.date}</span>
          <div style={{flex:1}}><div className="hist-txt">{h.event}</div></div>
          <Bdg type={h.type} label={h.type.charAt(0).toUpperCase()+h.type.slice(1)}/>
        </div>
      ))}
    </div>}

    {/* PROTOCOL */}
    {tab==='protocol'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--amb)'}}/>Assigned Protocol</div>
      <div style={{background:'var(--acc-l)',border:'1.5px solid var(--acc-m)',borderRadius:'var(--r)',padding:'14px 18px',marginBottom:20}}>
        <div style={{fontWeight:700,color:'var(--acc)',fontSize:'.95rem'}}>{patient.protocol.title}</div>
        <div style={{fontSize:'.76rem',color:'var(--tm)',marginTop:3}}>ID: {patient.protocol.id} · Assigned by {patient.doctor}</div>
      </div>
      <div className="proto-steps">
        {patient.protocol.steps.map((s,i)=>(
          <div className="ps" key={i}><div className="ps-num">{i+1}</div><div className="ps-txt">{s}</div></div>
        ))}
      </div>
    </div>}

    {/* DOCTOR NOTES */}
    {tab==='notes'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--acc)'}}/>Doctor Notes</div>
      {patient.notes.map((n,i)=>(
        <div className="note-card" key={i}>
          <div className="note-hdr">
            <span className="note-auth">{n.author}</span>
            <span className="note-date">{n.date}</span>
          </div>
          <div className="note-txt">{n.text}</div>
        </div>
      ))}
    </div>}

    {/* HEALTH TIPS */}
    {tab==='tips'&&<div className="card">
      <div className="pt-sec-title"><div className="pt-sec-dot" style={{background:'var(--green)'}}/>Health Tips for {patient.dept}</div>
      {tips.map((t,i)=>(
        <div className="tip-card" key={i}>
          <div className="tip-icon">{i+1}</div>
          <div><div className="tip-lbl">Tip #{i+1}</div><div className="tip-txt">{t}</div></div>
        </div>
      ))}
      <div style={{background:'var(--acc-l)',border:'1.5px solid var(--acc-m)',borderRadius:'var(--r)',padding:'12px 16px',marginTop:8,fontSize:'.82rem',color:'var(--acc)',fontWeight:500}}>
        These tips are general recommendations. Always follow your doctor's personalized advice.
      </div>
    </div>}
  </>);
}

// log in
function LoginPage({onLogin,dark,toggleDark}){
  const [role,setRole]=useState('admin');
  const [email,setEmail]=useState('');
  const [pwd,setPwd]=useState('');
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const [showPwd,setShowPwd]=useState(false);
  const doLogin=()=>{
    const c=CREDENTIALS[role];
    if(email===c.email&&pwd===c.password){setErr('');setLoading(true);setTimeout(()=>onLogin(role),900);}
    else setErr('Invalid credentials. Try a demo account below.');
  };
  const fillDemo=r=>{setRole(r);setEmail(CREDENTIALS[r].email);setPwd(CREDENTIALS[r].password);setErr('');};
  const roles=[{id:'admin',label:'Admin',sub:'Full access'},{id:'doctor',label:'Doctor',sub:'Clinical'},{id:'patient',label:'Patient',sub:'Personal'}];
  const roleIcons={admin:'⚙',doctor:'🩺',patient:'👤'};
  return(
    <div className="lp">
      <div className="lp-grid-bg"/>
      <div className="lp-blob1"/><div className="lp-blob2"/>
      <button className="theme-toggle" onClick={toggleDark} title={dark?'Switch to Light':'Switch to Dark'}>
        {dark?'☀️':'🌙'}
      </button>
      <div className="lp-card">
        {/* Left panel */}
        <div className="lp-left">
          <div className="lp-dots"/><div className="lp-ring1"/><div className="lp-ring2"/>
          <div className="lp-inner">
            <div className="lp-brand">
              <div className="lp-brand-icon">HMS</div>
              <div><div className="lp-bname">BLUE MED</div><div className="lp-bsub">HEALTH MANAGEMENT SYSTEM</div></div>
            </div>
            <div className="lp-h">Modern care,<br/><em>secured</em> by design.</div>
            <p className="lp-s">A unified healthcare platform built for hospitals, clinics, and care teams worldwide.</p>
            <div className="lp-feats">
              {['HIPAA-compliant data encryption','Real-time patient alerts & monitoring','Multi-role access: Admin, Doctor, Patient','Full audit trail & system logs'].map((f,i)=>(
                <div className="lp-feat" key={i}><div className="lp-fcheck"><div className="lp-fcheck-i"/></div><span className="lp-ft">{f}</span></div>
              ))}
            </div>
          </div>
          <div className="lp-stats">
            {[['3','Roles'],['31','Specialties'],['99.9%','Uptime']].map(([v,l])=>(
              <div key={l}><div className="lp-sv">{v}</div><div className="lp-sl">{l}</div></div>
            ))}
          </div>
        </div>
        {/* Right panel */}
        <div className="lp-right">
          <div className="lb">
            <div className="lb-title">Welcome back</div>
            <div className="lb-sub">Select your role and sign in</div>
            <div className="role-tabs">
              {roles.map(r=>(
                <button key={r.id} className={`rtab ${role===r.id?'active':''}`} onClick={()=>{setRole(r.id);setErr('');setEmail('');setPwd('');}}>
                  <span style={{fontSize:'1rem',display:'block',marginBottom:2}}>{roleIcons[r.id]}</span>
                  {r.label}<span className="rtab-sub">{r.sub}</span>
                </button>
              ))}
            </div>
            {err&&<div className="err-msg">{err}</div>}
            <div className="lf"><label>Email Address</label>
              <input className="li" type="email" placeholder="your@email.com" value={email} onChange={e=>{setEmail(e.target.value);setErr('');}}/>
            </div>
            <div className="lf" style={{position:'relative'}}><label>Password</label>
              <input className="li" type={showPwd?'text':'password'} placeholder="••••••••" value={pwd}
                onChange={e=>{setPwd(e.target.value);setErr('');}} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
              <button onClick={()=>setShowPwd(p=>!p)} style={{position:'absolute',right:12,top:32,background:'none',border:'none',cursor:'pointer',color:'var(--tl)',fontSize:'.8rem',padding:4}}>
                {showPwd?'Hide':'Show'}
              </button>
            </div>
            <div className="lp-forg"><a href="#">Forgot password?</a></div>
            <button className="btn-lo" onClick={doLogin} disabled={loading}>
              {loading?<span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                <span style={{width:14,height:14,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin .7s linear infinite'}}/>
                Signing in…
              </span>:`Sign in as ${roles.find(r=>r.id===role)?.label} →`}
            </button>
            <div className="lp-div">or use a demo account</div>
            <div className="demo-list">
              {[{id:'admin',l:'admin@gmail.com',sub:'Administrator'},{id:'doctor',l:'doctor@gmail.com',sub:'Doctor'},{id:'patient',l:'patient@gmail.com',sub:'Patient'}].map(r=>(
                <button key={r.id} className="demo-btn" onClick={()=>fillDemo(r.id)}>
                  <span style={{fontSize:'.88rem'}}>{roleIcons[r.id]}</span>
                  <span style={{flex:1,textAlign:'left'}}><strong style={{color:'var(--txt)'}}>{r.sub}</strong><br/><span style={{fontSize:'.76rem',color:'var(--tl)'}}>{r.l}</span></span>
                  <span className="demo-pill">Demo</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

// ─── 
const NAV = {
  admin:[{id:'directory',label:'Directory'},{id:'departments',label:'Departments'},{id:'doctors',label:'Doctors'},{id:'patients',label:'Patients'},{id:'protocols',label:'Protocols'},{id:'logs',label:'System Logs'}],
  doctor:[{id:'directory',label:'Directory'},{id:'patients',label:'My Patients'},{id:'alerts',label:'Alerts'},{id:'protocol',label:'Protocol'},{id:'schedule',label:'Schedule'}],
};
const PAGE_META = {
  directory:{title:'Doctors Directory',sub:'Search and browse all physicians across specialties'},
  departments:{title:'Departments',sub:'All hospital departments at a glance'},
  doctors:{title:'Manage Doctors',sub:'Activate or deactivate physician accounts'},
  patients:{title:'Patients',sub:'View and manage patient records'},
  protocols:{title:'Protocols',sub:'Medical and operational protocols'},
  logs:{title:'System Logs',sub:'Full audit trail of all system events'},
  alerts:{title:'Alerts',sub:'Active patient alerts requiring attention'},
  protocol:{title:'Protocol',sub:'Department medical protocols for reference'},
  schedule:{title:'Schedule',sub:'Today — Tuesday, March 3 2026'},
  overview:{title:'My Health',sub:'Your personal health dashboard — Fatima Jelou'},
};

function Dashboard({role,onLogout,dark,toggleDark}){
  const nav=role==='patient'?[]:NAV[role];
  const [page,setPage]=useState(role==='patient'?'overview':'directory');
  const patientData=PATIENTS[0];
  const meta=role==='patient'?PAGE_META['overview']:(PAGE_META[page]||{});
  const roleLabel=role==='admin'?'Administrator':role==='doctor'?'Dr. Sara Mei':'Fatima Jelou';
  return(
    <div className="shell">
      <aside className="sidebar">
        <div className="sb-hdr">
          <div className="sb-brand">BLUE<span>MED</span></div>
          <div className="sb-pill">{roleLabel}</div>
        </div>
        {role!=='patient'&&<><div className="nav-sec">Navigation</div>
          {nav.map(n=>(
            <button key={n.id} className={`ni ${page===n.id?'active':''}`} onClick={()=>setPage(n.id)}>
              <span className="ni-dot"/><span className="nav-label">{n.label}</span>
            </button>
          ))}
        </>}
        <div className="sb-bot">
          <button onClick={toggleDark} style={{width:'100%',padding:'9px',marginBottom:8,borderRadius:'var(--r)',border:'1px solid rgba(255,255,255,.12)',background:'transparent',color:'rgba(255,255,255,.55)',fontFamily:'var(--font)',fontSize:'.85rem',fontWeight:600,cursor:'pointer',transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}
            title={dark?'Light mode':'Dark mode'}>
            <span>{dark?'☀️':'🌙'}</span><span className="nav-label">{dark?'Light Mode':'Dark Mode'}</span>
          </button>
          <button className="btn-out" onClick={onLogout}>Sign Out</button>
        </div>
      </aside>
      <main className="main">
        <div className="mhdr"><div className="mtitle">{meta.title}</div><div className="msub">{meta.sub}</div></div>
        <div className="mbody">
          {role==='patient'?<PatientPortal patient={patientData}/>:
           page==='directory'?<Directory/>:
           role==='admin'&&page==='departments'?<ADepts/>:
           role==='admin'&&page==='doctors'?<ADoctors/>:
           role==='admin'&&page==='patients'?<APatients/>:
           role==='admin'&&page==='protocols'?<AProtocols/>:
           role==='admin'&&page==='logs'?<ALogs/>:
           role==='doctor'&&page==='patients'?<DPatients/>:
           role==='doctor'&&page==='alerts'?<DAlerts/>:
           role==='doctor'&&page==='protocol'?<DProtocol/>:
           role==='doctor'&&page==='schedule'?<DSchedule/>:null}
        </div>
      </main>
    </div>
  );
}

export default function App(){
  const [role,setRole]=useState(null);
  const [dark,setDark]=useState(false);
  const toggleDark=()=>setDark(d=>!d);
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
  },[dark]);
  return(
    <>
      <style>{css}</style>
      {!role
        ?<LoginPage onLogin={r=>setRole(r)} dark={dark} toggleDark={toggleDark}/>
        :<Dashboard role={role} onLogout={()=>setRole(null)} dark={dark} toggleDark={toggleDark}/>
      }
    </>
  );
}
