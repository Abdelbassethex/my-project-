import { useState, useEffect, useRef } from 'react';
// DATA

const SPECIALTIES_LIST = [
  'General Practitioner (GP)', 'Family Physician', 'Internist', 'Cardiologist',
  'Cardiothoracic Surgeon', 'Pulmonologist', 'Neurologist', 'Neurosurgeon',
  'Psychiatrist', 'Psychologist', 'Pediatrician', 'Neonatologist', 'Obstetrician',
  'Gynecologist', 'Orthopedic Surgeon', 'General Surgeon', 'Plastic Surgeon',
  'Urologist', 'Ophthalmologist', 'Optometrist', 'Otolaryngologist (ENT Specialist)',
  'Dermatologist', 'Endocrinologist', 'Gastroenterologist', 'Hematologist',
  'Oncologist', 'Radiologist', 'Anesthesiologist', 'Emergency Medicine Physician',
  'Rheumatologist', 'Nephrologist',
];

const ALL_DOCTORS = [
  { id:'D-01', name:'Dr. Chaouchi Mohamed', arabicName:'د. شاوشي محمد', specialty:'General Practitioner (GP)', status:'active', patients:18, joined:'2021-03-10', phone:'+1(555)010-0101', email:'c.mohamed@bluemed.com' },
  { id:'D-02', name:'Dr. Mechouch Essalem', arabicName:'د. مشوش عيسالم', specialty:'Family Physician', status:'active', patients:22, joined:'2020-07-15', phone:'+1(555)010-0102', email:'m.essalem@bluemed.com' },
  { id:'D-03', name:'Dr. Ahmed Bad', arabicName:'د. أحمد باد', specialty:'Internist', status:'active', patients:15, joined:'2019-11-02', phone:'+1(555)010-0103', email:'a.bad@bluemed.com' },
  { id:'D-04', name:'Dr. Sara Mei', arabicName:'د. سارة مي', specialty:'Cardiologist', status:'active', patients:14, joined:'2022-03-10', phone:'+1(555)010-0104', email:'s.mei@bluemed.com' },
  { id:'D-05', name:'Dr. Amira Nad', arabicName:'د. أميرة ناد', specialty:'Cardiothoracic Surgeon', status:'active', patients:8, joined:'2018-06-20', phone:'+1(555)010-0105', email:'a.nad@bluemed.com' },
  { id:'D-06', name:'Dr. Akram Abd', arabicName:'د. أكرم عبد', specialty:'Pulmonologist', status:'active', patients:11, joined:'2021-09-05', phone:'+1(555)010-0106', email:'ak.abd@bluemed.com' },
  { id:'D-07', name:'Dr. Mohamed Sal', arabicName:'د. محمد صال', specialty:'Neurologist', status:'active', patients:9, joined:'2021-07-22', phone:'+1(555)010-0107', email:'m.sal@bluemed.com' },
  { id:'D-08', name:'Dr. Achraf Ben', arabicName:'د. أشرف بن', specialty:'Neurosurgeon', status:'inactive', patients:0, joined:'2020-01-30', phone:'+1(555)010-0108', email:'ach.ben@bluemed.com' },
  { id:'D-09', name:'Dr. Naima Salmi', arabicName:'د. نعيمة سالمي', specialty:'Psychiatrist', status:'active', patients:19, joined:'2023-05-18', phone:'+1(555)010-0109', email:'n.salmi@bluemed.com' },
  { id:'D-10', name:'Dr. Youssef Karimi', arabicName:'د. يوسف كريمي', specialty:'Psychologist', status:'active', patients:25, joined:'2020-08-14', phone:'+1(555)010-0110', email:'y.karimi@bluemed.com' },
  { id:'D-11', name:'Dr. Fatima Zahra', arabicName:'د. فاطمة الزهراء', specialty:'Pediatrician', status:'active', patients:30, joined:'2019-03-22', phone:'+1(555)010-0111', email:'f.zahra@bluemed.com' },
  { id:'D-12', name:'Dr. Omar Benali', arabicName:'د. عمر بن علي', specialty:'Neonatologist', status:'active', patients:7, joined:'2022-11-01', phone:'+1(555)010-0112', email:'o.benali@bluemed.com' },
  { id:'D-13', name:'Dr. Amina Bouazza', arabicName:'د. أمينة بواز', specialty:'Obstetrician', status:'active', patients:16, joined:'2021-02-17', phone:'+1(555)010-0113', email:'a.bouazza@bluemed.com' },
  { id:'D-14', name:'Dr. Khaled Mansouri', arabicName:'د. خالد المنصوري', specialty:'Gynecologist', status:'inactive', patients:0, joined:'2020-05-09', phone:'+1(555)010-0114', email:'k.mansouri@bluemed.com' },
  { id:'D-15', name:'Dr. Rachid Ouali', arabicName:'د. رشيد والي', specialty:'Orthopedic Surgeon', status:'active', patients:21, joined:'2019-11-04', phone:'+1(555)010-0115', email:'r.ouali@bluemed.com' },
  { id:'D-16', name:'Dr. Nadia Hamidi', arabicName:'د. نادية حميدي', specialty:'General Surgeon', status:'active', patients:13, joined:'2018-08-30', phone:'+1(555)010-0116', email:'n.hamidi@bluemed.com' },
  { id:'D-17', name:'Dr. Samir Belhaj', arabicName:'د. سمير بالحاج', specialty:'Plastic Surgeon', status:'active', patients:10, joined:'2022-04-25', phone:'+1(555)010-0117', email:'s.belhaj@bluemed.com' },
  { id:'D-18', name:'Dr. Leila Meziani', arabicName:'د. ليلى مزياني', specialty:'Urologist', status:'active', patients:7, joined:'2021-09-30', phone:'+1(555)010-0118', email:'l.meziani@bluemed.com' },
  { id:'D-19', name:'Dr. Tariq Bouhali', arabicName:'د. طارق بوهالي', specialty:'Ophthalmologist', status:'active', patients:20, joined:'2020-12-10', phone:'+1(555)010-0119', email:'t.bouhali@bluemed.com' },
  { id:'D-20', name:'Dr. Houda Khelifi', arabicName:'د. هدى خليفي', specialty:'Optometrist', status:'inactive', patients:0, joined:'2023-01-07', phone:'+1(555)010-0120', email:'h.khelifi@bluemed.com' },
  { id:'D-21', name:'Dr. Bilal Cherif', arabicName:'د. بلال شريف', specialty:'Otolaryngologist (ENT Specialist)', status:'active', patients:12, joined:'2021-06-18', phone:'+1(555)010-0121', email:'b.cherif@bluemed.com' },
  { id:'D-22', name:'Dr. Souad Benabdallah', arabicName:'د. سعاد بن عبد الله', specialty:'Dermatologist', status:'active', patients:17, joined:'2020-01-15', phone:'+1(555)010-0122', email:'s.benabdallah@bluemed.com' },
  { id:'D-23', name:'Dr. Mourad Tlemcani', arabicName:'د. مراد تلمساني', specialty:'Endocrinologist', status:'active', patients:7, joined:'2022-07-11', phone:'+1(555)010-0123', email:'m.tlemcani@bluemed.com' },
  { id:'D-24', name:'Dr. Asma Hadj', arabicName:'د. أسماء حاج', specialty:'Gastroenterologist', status:'active', patients:14, joined:'2019-09-03', phone:'+1(555)010-0124', email:'a.hadj@bluemed.com' },
  { id:'D-25', name:'Dr. Karim Zidane', arabicName:'د. كريم زيدان', specialty:'Hematologist', status:'active', patients:9, joined:'2021-03-27', phone:'+1(555)010-0125', email:'k.zidane@bluemed.com' },
  { id:'D-26', name:'Dr. Rima Ferhat', arabicName:'د. ريما فرحات', specialty:'Oncologist', status:'active', patients:23, joined:'2018-11-15', phone:'+1(555)010-0126', email:'r.ferhat@bluemed.com' },
  { id:'D-27', name:'Dr. Adel Bouzid', arabicName:'د. عادل بوزيد', specialty:'Radiologist', status:'active', patients:6, joined:'2020-10-20', phone:'+1(555)010-0127', email:'a.bouzid@bluemed.com' },
  { id:'D-28', name:'Dr. Meriem Guediri', arabicName:'د. مريم قديري', specialty:'Anesthesiologist', status:'active', patients:5, joined:'2021-08-08', phone:'+1(555)010-0128', email:'m.guediri@bluemed.com' },
  { id:'D-29', name:'Dr. Hichem Beloufa', arabicName:'د. هشام بلوفة', specialty:'Emergency Medicine Physician', status:'active', patients:40, joined:'2019-06-01', phone:'+1(555)010-0129', email:'h.beloufa@bluemed.com' },
  { id:'D-30', name:'Dr. Samira Rahmani', arabicName:'د. سميرة رحماني', specialty:'Rheumatologist', status:'inactive', patients:0, joined:'2022-09-14', phone:'+1(555)010-0130', email:'s.rahmani@bluemed.com' },
  { id:'D-31', name:'Dr. Walid Cherifi', arabicName:'د. وليد شريفي', specialty:'Nephrologist', status:'active', patients:11, joined:'2020-04-29', phone:'+1(555)010-0131', email:'w.cherifi@bluemed.com' },
];

const PATIENTS = [
  {
    id:'P-001', name:'Fatima Jelou', arabicName:'فاطمة جيلو', age:34, blood:'A+', dept:'Cardiology', status:'Stable',
    doctor:'Dr. Sara Mei', doctorId:'D-04',
    lastVisit:'2026-02-14', nextAppt:'2026-03-10',
    medications:[{name:'Atorvastatin',dose:'20mg',freq:'Once daily',status:'active'},{name:'Metoprolol',dose:'50mg',freq:'Twice daily',status:'active'},{name:'Aspirin',dose:'100mg',freq:'Once daily',status:'active'}],
    vitals:[{date:'2026-02-14',bp:'145/90',hr:88,temp:'37.1',weight:'68kg'},{date:'2026-02-01',bp:'138/85',hr:82,temp:'36.9',weight:'68kg'},{date:'2026-01-18',bp:'142/88',hr:90,temp:'37.0',weight:'69kg'}],
    symptoms:[{date:'2026-02-14',symptom:'Chest tightness',severity:'Mild',note:'Reported after exercise'},{date:'2026-02-01',symptom:'Shortness of breath',severity:'Moderate',note:'At rest, lasting 10 min'},{date:'2026-01-18',symptom:'Palpitations',severity:'Mild',note:'Irregular heartbeat episodes'}],
    history:[{date:'2026-02-14',event:'Routine ECG — normal sinus rhythm',type:'visit'},{date:'2025-11-08',event:'Cardiology follow-up — EKG clear',type:'visit'},{date:'2025-07-21',event:'Blood panel — cholesterol slightly elevated',type:'lab'},{date:'2025-03-05',event:'Stress test — within normal range',type:'procedure'}],
    labResults:[{name:'Total Cholesterol',value:'210 mg/dL',ref:'<200',status:'high'},{name:'HDL',value:'55 mg/dL',ref:'>40',status:'normal'},{name:'LDL',value:'138 mg/dL',ref:'<100',status:'high'},{name:'Blood Glucose',value:'95 mg/dL',ref:'70-100',status:'normal'},{name:'Hemoglobin',value:'13.2 g/dL',ref:'12-16',status:'normal'}],
    protocol:{id:'PR-01',title:'Cardiac Monitoring Protocol',steps:['Daily BP check','Limit sodium intake','Avoid strenuous exercise','Report any chest pain immediately','Weekly ECG for 4 weeks']},
    alerts:[{id:1,msg:'BP slightly elevated this morning — 145/90',level:'warning',time:'2 hrs ago'}],
    notes:[{date:'2026-02-14',author:'Dr. Sara Mei',text:'Patient reports improvement. Continue current medication regimen. Schedule stress test next month.'},{date:'2026-01-18',author:'Dr. Sara Mei',text:'Palpitations episodes reducing. EKG shows no new abnormalities.'}],
  },
  {
    id:'P-002', name:'Reda From', arabicName:'رضا فروم', age:52, blood:'O+', dept:'Neurology', status:'Critical',
    doctor:'Dr. Mohamed Sal', doctorId:'D-07',
    lastVisit:'2026-02-28', nextAppt:'2026-03-05',
    medications:[{name:'Mannitol',dose:'20%',freq:'IV PRN',status:'active'},{name:'Levetiracetam',dose:'500mg',freq:'Twice daily',status:'active'}],
    vitals:[{date:'2026-02-28',bp:'190/120',hr:102,temp:'38.2',weight:'82kg'}],
    symptoms:[{date:'2026-02-28',symptom:'Severe headache',severity:'Severe',note:'Throbbing, 8/10 pain'},{date:'2026-02-20',symptom:'Dizziness',severity:'Moderate',note:'Sudden onset'},{date:'2026-02-10',symptom:'Blurred vision',severity:'Moderate',note:'Right eye affected'}],
    history:[{date:'2026-02-28',event:'Emergency consultation — neurological exam',type:'visit'},{date:'2025-12-12',event:'MRI Brain — small lesion detected',type:'procedure'},{date:'2025-09-30',event:'Lumbar puncture — normal CSF',type:'procedure'}],
    labResults:[{name:'WBC',value:'11.2 K/uL',ref:'4.5-11',status:'high'},{name:'Sodium',value:'138 mEq/L',ref:'136-145',status:'normal'},{name:'Creatinine',value:'1.1 mg/dL',ref:'0.7-1.3',status:'normal'}],
    protocol:{id:'PR-02',title:'Neuro Critical Care Protocol',steps:['Hourly neurological checks','Keep head of bed at 30°','Monitor ICP continuously','Strict fluid balance','No sedatives without consent']},
    alerts:[{id:2,msg:'BP critically high — 190/120',level:'critical',time:'10 min ago'},{id:3,msg:'Missed morning medication dose',level:'warning',time:'3 hrs ago'}],
    notes:[{date:'2026-02-28',author:'Dr. Mohamed Sal',text:'Critical condition. Immediate neurological monitoring required. Family notified.'}],
  },
  {
    id:'P-003', name:'Issa Massaoudi', arabicName:'عيسى مساعودي', age:29, blood:'B+', dept:'Dermatology', status:'Recovered',
    doctor:'Dr. Souad Benabdallah', doctorId:'D-22',
    lastVisit:'2026-01-22', nextAppt:'2026-03-18',
    medications:[{name:'Hydrocortisone cream',dose:'1%',freq:'Twice daily',status:'active'},{name:'Cetirizine',dose:'10mg',freq:'Once daily',status:'active'}],
    vitals:[{date:'2026-01-22',bp:'118/75',hr:72,temp:'36.8',weight:'74kg'}],
    symptoms:[{date:'2026-01-22',symptom:'Skin rash',severity:'Mild',note:'Localized to forearms, improving'},{date:'2025-12-10',symptom:'Itching',severity:'Moderate',note:'Widespread, worse at night'}],
    history:[{date:'2026-01-22',event:'Follow-up — rash resolving with treatment',type:'visit'},{date:'2025-12-10',event:'Initial dermatology consult',type:'visit'},{date:'2025-12-11',event:'Patch test — allergic to nickel',type:'lab'}],
    labResults:[{name:'IgE (allergy)',value:'220 IU/mL',ref:'<100',status:'high'},{name:'Eosinophils',value:'5%',ref:'1-4%',status:'high'},{name:'CRP',value:'2.1 mg/L',ref:'<5',status:'normal'}],
    protocol:{id:'PR-04',title:'Dermatitis Management Protocol',steps:['Topical corticosteroid 2x daily','Avoid identified allergens','Moisturize 3x daily','No hot water on affected area','Follow-up in 8 weeks']},
    alerts:[],
    notes:[{date:'2026-01-22',author:'Dr. Souad Benabdallah',text:'Patient recovering well. Allergen identified (nickel). Advised to avoid jewelry and metal contact.'}],
  },
  {
    id:'P-004', name:'Nassim Akouch', arabicName:'نسيم عكوش', age:41, blood:'AB-', dept:'Psychiatry', status:'Stable',
    doctor:'Dr. Naima Salmi', doctorId:'D-09',
    lastVisit:'2026-02-20', nextAppt:'2026-03-15',
    medications:[{name:'Sertraline',dose:'50mg',freq:'Once daily',status:'active'},{name:'Melatonin',dose:'5mg',freq:'At bedtime',status:'active'}],
    vitals:[{date:'2026-02-20',bp:'122/78',hr:76,temp:'36.7',weight:'79kg'}],
    symptoms:[{date:'2026-02-20',symptom:'Anxiety',severity:'Moderate',note:'Work-related stress'},{date:'2026-01-10',symptom:'Insomnia',severity:'Mild',note:'Difficulty falling asleep'}],
    history:[{date:'2026-02-20',event:'Psychiatric evaluation — anxiety disorder',type:'visit'},{date:'2025-10-05',event:'Initial consultation',type:'visit'}],
    labResults:[{name:'TSH',value:'2.1 mIU/L',ref:'0.4-4.0',status:'normal'},{name:'Cortisol',value:'22 mcg/dL',ref:'6-23',status:'normal'}],
    protocol:{id:'PR-05',title:'Psychiatric Care Protocol',steps:['Weekly therapy sessions','Medication compliance check','Sleep hygiene routine','Stress management exercises','Monthly follow-up']},
    alerts:[],
    notes:[{date:'2026-02-20',author:'Dr. Naima Salmi',text:'Patient showing positive response to sertraline. Sleep improving. Continue therapy sessions.'}],
  },
  {
    id:'P-005', name:'Houria Zaim', arabicName:'حورية زايم', age:63, blood:'A-', dept:'Oncology', status:'Critical',
    doctor:'Dr. Rima Ferhat', doctorId:'D-26',
    lastVisit:'2026-03-01', nextAppt:'2026-03-08',
    medications:[{name:'Ondansetron',dose:'8mg',freq:'Before chemo',status:'active'},{name:'Dexamethasone',dose:'4mg',freq:'Twice daily',status:'active'},{name:'Filgrastim',dose:'300mcg',freq:'Daily',status:'active'}],
    vitals:[{date:'2026-03-01',bp:'102/65',hr:98,temp:'38.5',weight:'58kg'}],
    symptoms:[{date:'2026-03-01',symptom:'Severe fatigue',severity:'Severe',note:'Post-chemo session 4'},{date:'2026-02-15',symptom:'Nausea',severity:'Moderate',note:'After treatment'}],
    history:[{date:'2026-03-01',event:'Chemotherapy session 4',type:'procedure'},{date:'2026-01-20',event:'Oncology review — stable lesion',type:'visit'},{date:'2025-11-14',event:'Biopsy — confirmed malignancy',type:'lab'}],
    labResults:[{name:'WBC',value:'1.8 K/uL',ref:'4.5-11',status:'critical'},{name:'Hemoglobin',value:'9.2 g/dL',ref:'12-16',status:'low'},{name:'Platelets',value:'88 K/uL',ref:'150-400',status:'low'},{name:'CA-125',value:'420 U/mL',ref:'<35',status:'critical'}],
    protocol:{id:'PR-03',title:'Oncology Chemotherapy Protocol',steps:['Pre-chemo blood panel','Anti-nausea medication 1hr before','Monitor vitals during infusion','Hydration protocol post-chemo','Follow-up within 72 hours']},
    alerts:[{id:4,msg:'WBC count critically low',level:'critical',time:'1 hr ago'}],
    notes:[{date:'2026-03-01',author:'Dr. Rima Ferhat',text:'Post-chemo session 4. WBC dangerously low. Starting G-CSF therapy. Close monitoring required.'}],
  },
];

const DEPARTMENTS = [
  {name:'Cardiology',staff:7,patients:22,head:'Dr. Sara Mei'},
  {name:'Neurology',staff:9,patients:15,head:'Dr. Mohamed Sal'},
  {name:'Dermatology',staff:5,patients:41,head:'Dr. Souad Benabdallah'},
  {name:'Oncology',staff:8,patients:18,head:'Dr. Rima Ferhat'},
  {name:'Psychiatry',staff:11,patients:33,head:'Dr. Naima Salmi'},
  {name:'Endocrinology',staff:6,patients:27,head:'Dr. Mourad Tlemcani'},
  {name:'Orthopedics',staff:6,patients:19,head:'Dr. Rachid Ouali'},
  {name:'Emergency',staff:20,patients:60,head:'Dr. Hichem Beloufa'},
  {name:'Pediatrics',staff:9,patients:38,head:'Dr. Fatima Zahra'},
  {name:'General Surgery',staff:10,patients:24,head:'Dr. Nadia Hamidi'},
  {name:'Chronic Disease Emergency',staff:15,patients:32,head:'Dr. Rima Ferhat'},
];

const PROTOCOLS = [
  {id:'PR-01',title:'Cardiac Emergency Response',dept:'Cardiology',updated:'2026-01-10',severity:'high'},
  {id:'PR-02',title:'Post-Op Neurological Care',dept:'Neurology',updated:'2025-12-05',severity:'medium'},
  {id:'PR-03',title:'Oncology Chemotherapy Guide',dept:'Oncology',updated:'2026-02-18',severity:'high'},
  {id:'PR-04',title:'Dermatology Infection Control',dept:'Dermatology',updated:'2025-11-22',severity:'low'},
  {id:'PR-05',title:'Psychiatric Crisis Protocol',dept:'Psychiatry',updated:'2026-01-30',severity:'high'},
  {id:'PR-06',title:'Endocrine Shock Management',dept:'Endocrinology',updated:'2025-10-14',severity:'medium'},
];

const LOGS = [
  {time:'2026-03-03 09:14',user:'admin',action:'Deactivated Doctor D-08',type:'warn'},
  {time:'2026-03-03 08:55',user:'Dr. Sara Mei',action:'Updated patient P-001 status',type:'info'},
  {time:'2026-03-02 17:32',user:'admin',action:'Added Protocol PR-06',type:'info'},
  {time:'2026-03-02 14:10',user:'Dr. Mohamed Sal',action:'Marked P-002 as Critical',type:'error'},
  {time:'2026-03-02 11:05',user:'P-003 Issa Massaoudi',action:'Booked appointment 2026-03-18',type:'info'},
  {time:'2026-03-01 16:44',user:'admin',action:'System backup completed',type:'info'},
];

const DOCTOR_ALERTS = [
  {id:1,patient:'Reda From',msg:'BP critically high — 190/120',time:'10 min ago',level:'critical'},
  {id:2,patient:'Fatima Jelou',msg:'BP slightly elevated — 145/90',time:'2 hrs ago',level:'warning'},
  {id:3,patient:'Houria Zaim',msg:'WBC count critically low',time:'1 hr ago',level:'critical'},
];

const SCHEDULE = [
  {time:'09:00',patient:'Fatima Jelou',type:'Follow-up',room:'A-12'},
  {time:'10:30',patient:'Nassim Akouch',type:'Consultation',room:'A-14'},
  {time:'12:00',patient:'Issa Massaoudi',type:'Review',room:'A-12'},
  {time:'14:00',patient:'Houria Zaim',type:'New Patient',room:'B-07'},
  {time:'15:30',patient:'Reda From',type:'Follow-up',room:'A-12'},
];

const HEALTH_TIPS = {
  Cardiology:['Take a 30-min walk daily to support heart health','Monitor your blood pressure every morning','Reduce sodium intake — aim for less than 2,300mg/day','Stay hydrated with at least 8 glasses of water'],
  Neurology:['Prioritize 7-9 hours of sleep each night','Practice stress reduction techniques like deep breathing','Avoid screen time 1 hour before bed','Stay mentally active with reading or puzzles'],
  Dermatology:['Apply moisturizer immediately after bathing','Avoid known allergens and irritants','Use fragrance-free laundry detergent','Wear protective clothing when outdoors'],
  Oncology:['Maintain a balanced diet rich in fruits and vegetables','Rest when needed — fatigue is normal after treatment','Stay connected with family and support groups','Report any new symptoms to your doctor immediately'],
  Psychiatry:['Establish a consistent daily routine','Practice mindfulness or meditation for 10 minutes daily','Limit caffeine and alcohol intake','Reach out to trusted friends or family when you feel low'],
};

const DEMO_CREDENTIALS = {
  admin:  {email:'admin@gmail.com',  password:'admin123',  role:'admin'},
  doctor: {email:'doctor@gmail.com', password:'doctor123', role:'doctor'},
  patient:{email:'patient@gmail.com',password:'patient123',role:'patient'},
};

// MRT Initial data
const MR_INITIAL = {
  'P-001': {
    notes:[{id:1,date:'2026-02-14',author:'Dr. Sara Mei',content:'Patient reports improvement in chest tightness. BP still slightly elevated. Continuing current regimen. Stress test scheduled for next month.',tags:['follow-up','cardiology']}],
    diagnoses:[{id:1,date:'2026-01-18',code:'I10',label:'Essential Hypertension',severity:'Moderate',status:'Active',note:'Primary hypertension confirmed. Under pharmacological control.'},{id:2,date:'2025-03-05',code:'E78.5',label:'Hyperlipidemia',severity:'Mild',status:'Active',note:'Elevated LDL. Statin therapy initiated.'}],
    vitals:[{id:1,date:'2026-02-14',bp:'145/90',hr:88,temp:'37.1',spo2:'98',weight:'68',rr:16},{id:2,date:'2026-02-01',bp:'138/85',hr:82,temp:'36.9',spo2:'99',weight:'68',rr:15}],
  },
  'P-002': {
    notes:[{id:1,date:'2026-02-28',author:'Dr. Mohamed Sal',content:'Critical condition. ICP monitoring in place. Family notified. Neurology team on standby.',tags:['critical','neurology']}],
    diagnoses:[{id:1,date:'2025-12-12',code:'G35',label:'Intracranial Hypertension',severity:'Severe',status:'Active',note:'Small lesion detected on MRI. Conservative management ongoing.'}],
    vitals:[{id:1,date:'2026-02-28',bp:'190/120',hr:102,temp:'38.2',spo2:'95',weight:'82',rr:22}],
  },
};

const SEVERITY_COLORS = {Mild:'var(--green)',Moderate:'var(--amb)',Severe:'var(--red)',Critical:'var(--red)'};
const STATUS_COLORS = {
  Active:{bg:'var(--rbg)',border:'var(--rbr)',color:'var(--red)'},
  Resolved:{bg:'var(--gbg)',border:'var(--gbr)',color:'var(--green)'},
  Monitoring:{bg:'var(--abg)',border:'var(--abr)',color:'var(--amb)'},
};
// CSS
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#f4f6fb;--surface:#ffffff;--sidebar:#0f1f3d;--sidebar-h:#172d55;--sidebar-a:#1e3a6e;
  --cb:#e2e8f4;--acc:#2563eb;--acc-d:#1d4ed8;--acc-l:#eff6ff;--acc-m:#bfdbfe;
  --green:#16a34a;--gbg:#f0fdf4;--gbr:#bbf7d0;
  --red:#dc2626;--rbg:#fef2f2;--rbr:#fecaca;
  --amb:#d97706;--abg:#fffbeb;--abr:#fde68a;
  --pur:#7c3aed;--pbg:#fdf4ff;--pbr:#e9d5ff;
  --txt:#0f172a;--tm:#475569;--tl:#94a3b8;
  --font:'DM Sans',sans-serif;--serif:'DM Serif Display',serif;--mono:'JetBrains Mono',monospace;
  --r:10px;--r2:14px;--r3:20px;
  --sh:0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04);
  --sh2:0 4px 16px rgba(0,0,0,.09);--sh3:0 12px 32px rgba(0,0,0,.12);
}
[data-theme="dark"]{
  --bg:#0b0f1a;--surface:#111827;--sidebar:#070d1a;--sidebar-h:#0f1e38;--sidebar-a:#172d55;
  --cb:#1e2940;--acc:#3b82f6;--acc-d:#2563eb;--acc-l:#0d1f3c;--acc-m:#1d3a6e;
  --green:#22c55e;--gbg:#052e16;--gbr:#14532d;
  --red:#f87171;--rbg:#2d0a0a;--rbr:#7f1d1d;
  --amb:#fbbf24;--abg:#2d1a00;--abr:#78350f;
  --pur:#a78bfa;--pbg:#1e1040;--pbr:#4c1d95;
  --txt:#e2e8f4;--tm:#8b949e;--tl:#3d4f6d;
  --sh:0 1px 3px rgba(0,0,0,.3);--sh2:0 4px 16px rgba(0,0,0,.4);--sh3:0 12px 32px rgba(0,0,0,.5);
}
body{background:var(--bg);color:var(--txt);font-family:var(--font);overflow-x:hidden;transition:background .3s,color .3s;-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#93c5fd55;border-radius:99px;}
::-webkit-scrollbar-thumb:hover{background:#93c5fd;}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.5;}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-16px);}to{opacity:1;transform:translateX(0);}}

/* ── AUTH PAGES (Login + Signup) ── */
.auth-shell{min-height:100vh;display:flex;align-items:stretch;position:relative;overflow:hidden;}

/* Left panel */
.auth-left{width:42%;background:linear-gradient(160deg,#060e24 0%,#0f2255 45%,#163480 100%);
  position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:52px 52px;}
.auth-left-glow{position:absolute;width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,99,235,.22) 0%,transparent 65%);
  top:-200px;right:-300px;pointer-events:none;}
.auth-left-glow2{position:absolute;width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 65%);
  bottom:-100px;left:-100px;pointer-events:none;}
.auth-dots{position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(255,255,255,.06) 1.5px,transparent 1.5px);
  background-size:28px 28px;pointer-events:none;}
.auth-brand{position:relative;z-index:2;display:flex;align-items:center;gap:14px;}
.auth-brand-mark{width:44px;height:44px;border-radius:12px;
  background:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.06));
  border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;
  font-size:.68rem;font-weight:800;color:#fff;letter-spacing:.8px;}
.auth-brand-name{font-size:1.05rem;font-weight:700;letter-spacing:2px;color:#fff;}
.auth-brand-sub{font-size:.58rem;color:rgba(255,255,255,.38);letter-spacing:1px;margin-top:1px;}
.auth-hero{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;justify-content:center;padding:32px 0;}
.auth-tagline{font-family:var(--serif);font-size:3rem;line-height:1.1;color:#fff;margin-bottom:20px;letter-spacing:-.5px;}
.auth-tagline em{font-style:italic;color:#93c5fd;}
.auth-desc{font-size:.92rem;color:rgba(255,255,255,.55);line-height:1.85;max-width:300px;margin-bottom:40px;}
.auth-features{display:flex;flex-direction:column;gap:14px;}
.auth-feat{display:flex;align-items:center;gap:12px;}
.auth-feat-icon{width:22px;height:22px;border-radius:6px;
  background:rgba(147,197,253,.12);border:1px solid rgba(147,197,253,.25);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.auth-feat-dot{width:7px;height:7px;border-radius:2px;background:#93c5fd;}
.auth-feat-text{font-size:.82rem;color:rgba(255,255,255,.65);}
.auth-stats{position:relative;z-index:2;display:flex;gap:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,.1);}
.auth-stat-val{font-size:1.6rem;font-weight:800;color:#fff;line-height:1;font-family:var(--mono);}
.auth-stat-lbl{font-size:.65rem;color:rgba(255,255,255,.38);margin-top:3px;text-transform:uppercase;letter-spacing:.1em;}

/* Right panel */
.auth-right{flex:1;background:var(--surface);display:flex;align-items:center;justify-content:center;padding:40px 32px;position:relative;}
.auth-theme-btn{position:absolute;top:22px;right:22px;width:40px;height:40px;border-radius:50%;
  background:var(--bg);border:1.5px solid var(--cb);display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:1rem;transition:all .2s;color:var(--txt);}
.auth-theme-btn:hover{box-shadow:var(--sh2);transform:scale(1.08);}
.auth-form-wrap{width:100%;max-width:380px;animation:fadeUp .5s ease forwards;}

/* Form heading */
.auth-heading{font-size:1.8rem;font-weight:800;color:var(--txt);letter-spacing:-.4px;margin-bottom:5px;}
.auth-subheading{font-size:.88rem;color:var(--tm);margin-bottom:28px;}
.auth-switch-link{color:var(--acc);font-weight:600;cursor:pointer;border:none;background:none;font-family:var(--font);font-size:.88rem;padding:0;text-decoration:none;}
.auth-switch-link:hover{text-decoration:underline;}

/* Role tabs */
.role-tabs{display:flex;gap:8px;margin-bottom:24px;background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:5px;}
.rtab{flex:1;padding:10px 6px;border-radius:var(--r);border:none;cursor:pointer;
  font-family:var(--font);font-size:.77rem;font-weight:600;color:var(--tm);background:transparent;transition:all .2s;text-align:center;}
.rtab.active{background:var(--surface);color:var(--acc);box-shadow:var(--sh);border:1.5px solid var(--cb);}
.rtab-icon{display:block;font-size:1.1rem;margin-bottom:3px;}
.rtab-sub{display:block;font-size:.6rem;font-weight:400;opacity:.7;margin-top:1px;}

/* Input fields */
.form-field{margin-bottom:16px;}
.form-field label{display:block;font-size:.72rem;font-weight:700;color:var(--tm);letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px;}
.form-input{width:100%;background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);
  padding:12px 16px;font-family:var(--font);font-size:.9rem;outline:none;transition:border-color .2s,box-shadow .2s;}
.form-input:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.1);}
.form-input::placeholder{color:var(--tl);}
.form-input.err{border-color:var(--red);}
.input-wrap{position:relative;}
.input-wrap .form-input{padding-right:50px;}
.input-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;
  cursor:pointer;color:var(--tl);font-size:.78rem;font-weight:600;font-family:var(--font);padding:4px;}
.form-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* Error / success */
.auth-err{background:var(--rbg);border:1.5px solid var(--rbr);color:var(--red);border-radius:var(--r);
  padding:10px 14px;font-size:.83rem;margin-bottom:14px;font-weight:500;animation:fadeIn .2s;}
.auth-success{background:var(--gbg);border:1.5px solid var(--gbr);color:var(--green);border-radius:var(--r);
  padding:10px 14px;font-size:.83rem;margin-bottom:14px;font-weight:500;}

/* Buttons */
.btn-primary{width:100%;padding:13px;border-radius:var(--r);border:none;cursor:pointer;font-family:var(--font);
  font-size:.95rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--acc-d),var(--acc));
  box-shadow:0 4px 14px rgba(37,99,235,.28);transition:all .22s;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-primary:hover{box-shadow:0 6px 20px rgba(37,99,235,.4);transform:translateY(-1px);}
.btn-primary:disabled{opacity:.55;cursor:not-allowed;transform:none;box-shadow:none;}
.btn-secondary{background:transparent;color:var(--tm);border:1.5px solid var(--cb);border-radius:var(--r);
  padding:11px 18px;font-family:var(--font);font-weight:600;cursor:pointer;transition:all .2s;font-size:.9rem;}
.btn-secondary:hover{border-color:var(--acc);color:var(--acc);}
.btn-sm{padding:6px 14px;border-radius:99px;border:1.5px solid var(--cb);cursor:pointer;font-family:var(--font);
  font-size:.77rem;font-weight:600;background:transparent;color:var(--tm);transition:all .18s;}
.btn-sm:hover{border-color:var(--acc);color:var(--acc);background:var(--acc-l);}

/* Divider */
.auth-divider{display:flex;align-items:center;gap:12px;margin:18px 0;color:var(--tl);font-size:.72rem;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:var(--cb);}

/* Demo accounts */
.demo-list{display:flex;flex-direction:column;gap:7px;}
.demo-btn{width:100%;padding:11px 14px;border-radius:var(--r);border:1.5px solid var(--cb);cursor:pointer;
  font-family:var(--font);font-size:.83rem;font-weight:600;background:var(--surface);color:var(--tm);
  display:flex;align-items:center;gap:10px;transition:all .2s;text-align:left;}
.demo-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acc-l);}
.demo-pill{margin-left:auto;font-size:.65rem;font-weight:700;background:var(--acc-l);color:var(--acc);
  padding:2px 9px;border-radius:99px;border:1px solid var(--acc-m);}

/* Forgot */
.forgot-link{text-align:right;margin-top:-10px;margin-bottom:16px;}
.forgot-link a{font-size:.76rem;color:var(--acc);text-decoration:none;font-weight:500;}
.forgot-link a:hover{text-decoration:underline;}

/* Terms */
.auth-terms{font-size:.74rem;color:var(--tl);text-align:center;margin-top:14px;}
.auth-terms a{color:var(--acc);text-decoration:none;font-weight:500;}

/* Signup steps */
.signup-steps{display:flex;gap:0;margin-bottom:28px;}
.signup-step{display:flex;align-items:center;flex:1;}
.ss-circle{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:.72rem;font-weight:800;flex-shrink:0;transition:all .3s;border:2px solid var(--cb);
  background:var(--bg);color:var(--tl);}
.ss-circle.active{background:var(--acc);border-color:var(--acc);color:#fff;}
.ss-circle.done{background:var(--green);border-color:var(--green);color:#fff;}
.ss-label{font-size:.7rem;font-weight:600;color:var(--tl);margin-left:6px;white-space:nowrap;}
.ss-label.active{color:var(--acc);}
.ss-line{flex:1;height:2px;background:var(--cb);margin:0 8px;}
.ss-line.done{background:var(--acc);}

/* Signup success */
.signup-success{text-align:center;padding:12px 0;animation:fadeUp .4s ease forwards;}
.ss-check{width:72px;height:72px;border-radius:50%;background:var(--gbg);border:3px solid var(--gbr);
  display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:1.8rem;}

/* ── SHELL (Dashboard Layout) ── */
.shell{display:flex;min-height:100vh;}
.sidebar{width:248px;flex-shrink:0;background:var(--sidebar);display:flex;flex-direction:column;
  position:sticky;top:0;height:100vh;overflow-y:auto;transition:width .3s;}
.sb-header{padding:24px 20px 20px;border-bottom:1px solid rgba(255,255,255,.07);}
.sb-brand{display:flex;align-items:center;gap:10px;}
.sb-mark{width:36px;height:36px;border-radius:9px;
  background:linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,.05));
  border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;
  font-size:.65rem;font-weight:800;color:#fff;letter-spacing:.5px;flex-shrink:0;}
.sb-name{font-size:1rem;font-weight:800;letter-spacing:1.5px;color:#fff;}
.sb-name span{color:#93c5fd;}
.sb-role-pill{display:inline-flex;align-items:center;gap:5px;margin-top:10px;
  font-size:.63rem;font-weight:700;background:rgba(147,197,253,.12);color:#93c5fd;
  border:1px solid rgba(147,197,253,.2);border-radius:99px;padding:3px 10px;}
.sb-role-dot{width:5px;height:5px;border-radius:50%;background:#93c5fd;}
.nav-section-label{padding:18px 20px 5px;font-size:.6rem;font-weight:700;
  color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.14em;}
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 14px;margin:1px 8px;
  border-radius:var(--r);cursor:pointer;font-size:.87rem;font-weight:500;
  color:rgba(255,255,255,.52);border:none;background:transparent;
  width:calc(100% - 16px);text-align:left;transition:all .18s;}
.nav-item:hover{background:var(--sidebar-h);color:#fff;}
.nav-item.active{background:var(--sidebar-a);color:#fff;font-weight:600;
  box-shadow:inset 3px 0 0 #93c5fd;}
.nav-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.22);flex-shrink:0;}
.nav-item.active .nav-dot,.nav-item:hover .nav-dot{background:#93c5fd;}
.sb-footer{margin-top:auto;padding:14px;border-top:1px solid rgba(255,255,255,.07);}
.sb-theme-btn{width:100%;padding:9px;margin-bottom:8px;border-radius:var(--r);
  border:1px solid rgba(255,255,255,.1);background:transparent;
  color:rgba(255,255,255,.45);font-family:var(--font);font-size:.83rem;font-weight:600;
  cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px;}
.sb-theme-btn:hover{background:rgba(255,255,255,.05);color:rgba(255,255,255,.8);}
.btn-signout{width:100%;padding:9px;border-radius:var(--r);border:1px solid rgba(255,255,255,.1);
  background:transparent;color:rgba(255,255,255,.45);font-family:var(--font);font-size:.85rem;
  font-weight:600;cursor:pointer;transition:all .2s;}
.btn-signout:hover{background:rgba(220,38,38,.12);border-color:rgba(220,38,38,.25);color:#fca5a5;}

/* Main content */
.main{flex:1;overflow-y:auto;background:var(--bg);}
.page-header{background:var(--surface);border-bottom:1px solid var(--cb);
  padding:24px 38px;box-shadow:var(--sh);}
.page-title{font-size:1.65rem;font-weight:800;color:var(--txt);letter-spacing:-.4px;}
.page-sub{font-size:.86rem;color:var(--tm);margin-top:3px;}
.page-body{padding:30px 38px;}

/* ── GENERIC COMPONENTS ── */
.card{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);padding:24px;box-shadow:var(--sh);}

.badge{display:inline-flex;align-items:center;border-radius:99px;padding:3px 11px;font-size:.72rem;font-weight:600;}
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
.tbl th{text-align:left;padding:11px 16px;font-size:.69rem;font-weight:700;color:var(--tm);
  text-transform:uppercase;letter-spacing:.09em;border-bottom:1.5px solid var(--cb);background:var(--bg);}
.tbl td{padding:13px 16px;border-bottom:1px solid var(--cb);font-size:.86rem;vertical-align:middle;}
.tbl tr:last-child td{border:none;}
.tbl tr:hover td{background:var(--acc-l);}
.tbl-wrap{overflow-x:auto;}
.initials{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,var(--acc-d),var(--acc));
  display:inline-flex;align-items:center;justify-content:center;font-size:.67rem;font-weight:800;color:#fff;flex-shrink:0;}

/* Modal */
.modal-overlay{position:fixed;inset:0;z-index:300;background:rgba(10,20,45,.55);
  backdrop-filter:blur(7px);display:flex;align-items:center;justify-content:center;
  padding:20px;animation:fadeIn .2s ease;}
.modal-box{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r3);
  padding:36px;width:100%;max-width:520px;box-shadow:var(--sh3);
  animation:fadeUp .25s ease forwards;max-height:90vh;overflow-y:auto;}
.modal-title{font-size:1.2rem;font-weight:800;color:var(--txt);margin-bottom:22px;}
.mf{margin-bottom:14px;}
.mf label{display:block;font-size:.72rem;font-weight:700;color:var(--tm);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
.mf input,.mf select,.mf textarea{width:100%;background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);
  border-radius:var(--r);padding:11px 14px;font-family:var(--font);font-size:.87rem;outline:none;transition:border-color .2s;}
.mf input:focus,.mf select:focus,.mf textarea:focus{border-color:var(--acc);}
.mf textarea{resize:vertical;min-height:80px;}
.modal-actions{display:flex;gap:10px;margin-top:10px;}
.btn-modal-primary{background:linear-gradient(135deg,var(--acc-d),var(--acc));color:#fff;border:none;
  border-radius:var(--r);padding:12px 24px;font-family:var(--font);font-weight:700;cursor:pointer;transition:all .2s;flex:1;font-size:.9rem;}
.btn-modal-primary:hover{opacity:.88;transform:translateY(-1px);}

/* Search bar */
.search-bar{position:relative;margin-bottom:18px;}
.search-bar input{width:100%;max-width:440px;background:var(--surface);border:1.5px solid var(--cb);
  color:var(--txt);border-radius:var(--r);padding:11px 16px 11px 42px;
  font-family:var(--font);font-size:.87rem;outline:none;transition:border-color .2s,box-shadow .2s;}
.search-bar input:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.1);}
.search-bar input::placeholder{color:var(--tl);}
.search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--tl);font-size:.78rem;}

/* Toggle buttons */
.tog-btn{padding:6px 14px;border-radius:99px;border:1.5px solid;cursor:pointer;font-family:var(--font);font-size:.77rem;font-weight:600;transition:all .18s;}
.tog-on{background:var(--gbg);color:var(--green);border-color:var(--gbr);}
.tog-off{background:var(--rbg);color:var(--red);border-color:var(--rbr);}

/* Filter pills */
.filter-pill{padding:7px 15px;border-radius:99px;border:1.5px solid var(--cb);cursor:pointer;
  font-family:var(--font);font-size:.77rem;font-weight:600;color:var(--tm);background:var(--surface);transition:all .18s;}
.filter-pill.active{border-color:var(--acc);background:var(--acc-l);color:var(--acc);}
.filter-pill:hover:not(.active){border-color:var(--acc-m);color:var(--acc);}

/* ── DIRECTORY ── */
.dir-hero{background:linear-gradient(140deg,#0c1f3f,#1a4480,#1e5bb5);border-radius:var(--r3);
  padding:40px 46px;margin-bottom:26px;position:relative;overflow:hidden;box-shadow:var(--sh3);}
.dh-orb{position:absolute;border-radius:50%;pointer-events:none;}
.dh-orb1{width:320px;height:320px;background:radial-gradient(circle,rgba(255,255,255,.05) 0%,transparent 70%);right:-80px;top:-80px;}
.dh-orb2{width:200px;height:200px;background:radial-gradient(circle,rgba(147,197,253,.06) 0%,transparent 70%);bottom:-60px;left:60px;}
.dh-inner{position:relative;z-index:2;}
.dh-label{font-size:.67rem;font-weight:700;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.18em;margin-bottom:10px;}
.dh-title{font-size:2.4rem;font-weight:800;color:#fff;letter-spacing:-.6px;margin-bottom:8px;}
.dh-sub{font-size:.92rem;color:rgba(255,255,255,.62);margin-bottom:30px;max-width:480px;line-height:1.65;}
.dh-stats{display:flex;gap:18px;flex-wrap:wrap;}
.dh-stat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:var(--r);padding:12px 20px;}
.dh-sv{font-size:1.6rem;font-weight:800;color:#fff;font-family:var(--mono);}
.dh-sl{font-size:.68rem;color:rgba(255,255,255,.48);margin-top:2px;}

.dir-filters{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);
  padding:18px 22px;margin-bottom:22px;display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;box-shadow:var(--sh);}
.df{display:flex;flex-direction:column;gap:5px;flex:1;min-width:160px;}
.df label{font-size:.68rem;font-weight:700;color:var(--tm);text-transform:uppercase;letter-spacing:.07em;}
.di{background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);
  padding:10px 13px;font-family:var(--font);font-size:.87rem;outline:none;transition:border-color .2s;}
.di:focus{border-color:var(--acc);}
.di::placeholder{color:var(--tl);}

/* Doctor card */
.doc-card{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);
  cursor:pointer;transition:all .22s;box-shadow:var(--sh);overflow:hidden;margin-bottom:10px;}
.doc-card:hover{border-color:var(--acc-m);box-shadow:var(--sh2);transform:translateY(-1px);}
.doc-card.open{border-color:var(--acc);box-shadow:0 0 0 3px rgba(37,99,235,.07);}
.dc-row{display:flex;align-items:center;gap:18px;padding:18px 22px;}
.dc-av{width:50px;height:50px;border-radius:13px;background:linear-gradient(135deg,var(--acc-d),var(--acc));
  display:flex;align-items:center;justify-content:center;font-size:.82rem;font-weight:800;color:#fff;flex-shrink:0;}
.dc-main{flex:1;min-width:0;}
.dc-name{font-size:.98rem;font-weight:700;color:var(--txt);}
.dc-name-ar{font-size:.75rem;color:var(--tl);direction:rtl;margin-top:1px;}
.dc-spec{font-size:.82rem;color:var(--acc);font-weight:600;margin-top:2px;}
.dc-meta{display:flex;gap:12px;margin-top:5px;flex-wrap:wrap;}
.dc-mi{font-size:.74rem;color:var(--tm);}
.dc-expand{width:28px;height:28px;border-radius:8px;border:1.5px solid var(--cb);background:transparent;
  color:var(--tm);cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-size:.7rem;font-weight:800;transition:all .18s;font-family:var(--mono);flex-shrink:0;}
.doc-card.open .dc-expand,.dc-expand:hover{border-color:var(--acc);color:var(--acc);background:var(--acc-l);}
.dc-detail{padding:0 22px 20px;border-top:1px solid var(--cb);}
.dc-di{padding-top:18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.dc-dg{display:flex;flex-direction:column;gap:3px;}
.dc-dl{font-size:.66rem;font-weight:700;color:var(--tl);text-transform:uppercase;letter-spacing:.08em;}
.dc-dv{font-size:.85rem;color:var(--txt);font-weight:500;}
.dc-dv.mono{font-family:var(--mono);font-size:.79rem;}
.dc-dv.blue{color:var(--acc);}

/* Specialty dropdown */
.spec-dropdown-wrap{position:relative;}
.spec-input{width:100%;background:var(--bg);border:1.5px solid var(--cb);color:var(--txt);border-radius:var(--r);
  padding:10px 13px;font-family:var(--font);font-size:.87rem;outline:none;cursor:pointer;transition:border-color .2s;}
.spec-input:focus{border-color:var(--acc);}
.spec-list{position:absolute;top:calc(100% + 4px);left:0;right:0;background:var(--surface);
  border:1.5px solid var(--acc-m);border-radius:var(--r2);box-shadow:var(--sh3);z-index:300;
  max-height:280px;overflow-y:auto;animation:fadeUp .15s ease;}
.spec-item{padding:10px 14px;font-size:.86rem;cursor:pointer;border-bottom:1px solid var(--cb);
  color:var(--txt);transition:background .15s;display:flex;align-items:center;gap:10px;}
.spec-item:last-child{border:none;}
.spec-item:hover,.spec-item.active{background:var(--acc-l);color:var(--acc);}
.spec-num{font-family:var(--mono);font-size:.66rem;color:var(--tl);width:22px;flex-shrink:0;}

/* ── ALERT / SCHEDULE / LOG ── */
.al-card{background:var(--surface);border-radius:var(--r2);padding:16px 20px;display:flex;
  gap:14px;align-items:flex-start;border-left:4px solid transparent;margin-bottom:10px;box-shadow:var(--sh);}
.al-critical{border-color:var(--red);}
.al-warning{border-color:var(--amb);}
.al-info{border-color:var(--acc);}
.al-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.al-dot-critical{background:var(--red);}
.al-dot-warning{background:var(--amb);}
.al-dot-info{background:var(--acc);}
.sc-item{display:flex;align-items:center;gap:16px;background:var(--surface);border:1.5px solid var(--cb);
  border-radius:var(--r2);padding:15px 20px;margin-bottom:10px;box-shadow:var(--sh);transition:border-color .2s;}
.sc-item:hover{border-color:var(--acc-m);}
.sc-time{font-family:var(--mono);font-size:.9rem;color:var(--acc);font-weight:700;width:52px;flex-shrink:0;}
.sc-room{margin-left:auto;font-family:var(--mono);font-size:.76rem;background:var(--acc-l);
  color:var(--acc);padding:5px 11px;border-radius:var(--r);border:1px solid var(--acc-m);}
.log-row{display:flex;gap:14px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--cb);}
.log-row:last-child{border:none;}
.lt{font-family:var(--mono);font-size:.71rem;color:var(--tl);flex-shrink:0;width:134px;}
.lu{font-size:.77rem;color:var(--acc);font-weight:600;flex-shrink:0;width:148px;}
.la{font-size:.82rem;color:var(--tm);}

/* ── DEPARTMENTS ── */
.dept-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;}
.dept-card{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r2);
  padding:20px 22px;box-shadow:var(--sh);transition:all .22s;}
.dept-card:hover{border-color:var(--acc-m);box-shadow:var(--sh2);transform:translateY(-2px);}
.dept-name{font-size:.98rem;font-weight:700;color:var(--txt);margin-bottom:5px;}
.dept-head{font-size:.77rem;color:var(--acc);margin-bottom:10px;font-weight:500;}
.dept-row{display:flex;justify-content:space-between;}
.dept-stat{font-size:.77rem;color:var(--tm);}
.dept-bar{height:4px;background:var(--cb);border-radius:99px;margin-top:10px;overflow:hidden;}
.dept-fill{height:100%;background:linear-gradient(90deg,var(--acc-d),var(--acc));border-radius:99px;}

/* ── PATIENT PORTAL ── */
.pt-hero{background:linear-gradient(140deg,#0c1f3f,#1a4480,#1e5bb5);border-radius:var(--r3);
  padding:32px 36px;margin-bottom:22px;position:relative;overflow:hidden;box-shadow:var(--sh3);}
.pt-orb{position:absolute;right:-40px;top:-40px;width:220px;height:220px;border-radius:50%;
  background:rgba(255,255,255,.04);pointer-events:none;}
.pt-inner{position:relative;z-index:2;display:flex;align-items:center;gap:22px;flex-wrap:wrap;}
.pt-av{width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,.16);
  border:3px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;
  font-size:1.5rem;font-weight:800;color:#fff;flex-shrink:0;}
.pt-name{font-size:1.45rem;font-weight:800;color:#fff;letter-spacing:-.3px;}
.pt-name-ar{font-size:.88rem;color:rgba(255,255,255,.6);direction:rtl;margin-top:1px;}
.pt-info{font-size:.81rem;color:rgba(255,255,255,.58);margin-top:3px;}
.pt-badges{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.pt-stat-row{display:flex;gap:12px;margin-top:18px;flex-wrap:wrap;}
.pt-stat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:var(--r);padding:10px 16px;}
.pt-sv{font-size:1.2rem;font-weight:800;color:#fff;font-family:var(--mono);}
.pt-sl{font-size:.66rem;color:rgba(255,255,255,.5);margin-top:2px;}

.pt-tabs{display:flex;gap:5px;margin-bottom:20px;background:var(--surface);
  border:1.5px solid var(--cb);border-radius:var(--r2);padding:5px;flex-wrap:wrap;}
.pt-tab{padding:8px 15px;border-radius:var(--r);border:none;background:transparent;cursor:pointer;
  font-family:var(--font);font-weight:600;font-size:.81rem;color:var(--tm);transition:all .2s;}
.pt-tab.active{background:var(--acc);color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.3);}
.pt-tab:hover:not(.active){background:var(--acc-l);color:var(--acc);}

.sec-title{font-size:.97rem;font-weight:700;color:var(--txt);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.sec-dot{width:9px;height:9px;border-radius:3px;background:var(--acc);}

.vital-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px;}
.vital-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:14px 16px;text-align:center;}
.vital-val{font-size:1.25rem;font-weight:800;font-family:var(--mono);color:var(--txt);}
.vital-lbl{font-size:.66rem;color:var(--tl);margin-top:3px;text-transform:uppercase;letter-spacing:.06em;}

.med-row{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--cb);}
.med-row:last-child{border:none;}
.med-icon{width:36px;height:36px;border-radius:10px;background:var(--pbg);border:1.5px solid var(--pbr);
  display:flex;align-items:center;justify-content:center;font-size:.75rem;flex-shrink:0;color:var(--pur);font-weight:800;}
.med-name{font-weight:700;color:var(--txt);font-size:.9rem;}
.med-info{font-size:.77rem;color:var(--tm);margin-top:2px;}

.lab-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--cb);}
.lab-row:last-child{border:none;}
.lab-name{flex:1;font-weight:600;color:var(--txt);font-size:.86rem;}
.lab-val{font-family:var(--mono);font-size:.84rem;font-weight:700;color:var(--txt);}
.lab-ref{font-size:.73rem;color:var(--tl);margin-left:8px;}

.note-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:16px 18px;margin-bottom:10px;}
.note-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.note-auth{font-weight:700;color:var(--acc);font-size:.82rem;}
.note-date{font-family:var(--mono);font-size:.71rem;color:var(--tl);}
.note-txt{font-size:.85rem;color:var(--tm);line-height:1.65;}

.sym-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--cb);}
.sym-row:last-child{border:none;}
.sym-date{font-family:var(--mono);font-size:.72rem;color:var(--tl);flex-shrink:0;width:90px;}
.sym-name{font-size:.86rem;font-weight:600;color:var(--txt);flex:1;}
.sym-note{font-size:.77rem;color:var(--tm);}
.hist-item{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--cb);align-items:flex-start;}
.hist-item:last-child{border:none;}
.hist-date{font-family:var(--mono);font-size:.71rem;color:var(--tl);flex-shrink:0;width:90px;padding-top:2px;}
.hist-txt{font-size:.85rem;color:var(--txt);}

.proto-steps{display:flex;flex-direction:column;gap:10px;}
.ps{display:flex;align-items:flex-start;gap:12px;}
.ps-num{width:26px;height:26px;border-radius:7px;background:var(--acc-l);color:var(--acc);
  font-size:.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;border:1px solid var(--acc-m);}
.ps-txt{font-size:.85rem;color:var(--txt);padding-top:4px;}

.appt-card{background:var(--acc-l);border:1.5px solid var(--acc-m);border-radius:var(--r2);padding:18px 20px;}
.appt-date{font-family:var(--mono);font-size:1.15rem;font-weight:700;color:var(--acc);margin-bottom:4px;}
.appt-dr{font-size:.82rem;color:var(--tm);}

.contact-widget{background:linear-gradient(135deg,var(--acc-l),#f0f9ff);border:1.5px solid var(--acc-m);
  border-radius:var(--r2);padding:18px 20px;display:flex;gap:16px;align-items:center;}
.cw-av{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--acc-d),var(--acc));
  display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:.8rem;flex-shrink:0;}
.cw-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.cw-btn{padding:7px 14px;border-radius:99px;border:1.5px solid var(--acc-m);background:var(--surface);
  color:var(--acc);font-family:var(--font);font-size:.76rem;font-weight:600;cursor:pointer;transition:all .18s;}
.cw-btn:hover{background:var(--acc);color:#fff;}

.tip-card{background:linear-gradient(135deg,var(--gbg),#f0fdf4);border:1.5px solid var(--gbr);
  border-radius:var(--r2);padding:14px 18px;margin-bottom:10px;display:flex;gap:12px;align-items:flex-start;}
.tip-icon{width:32px;height:32px;border-radius:9px;background:var(--green);display:flex;
  align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0;color:#fff;font-weight:800;}
.tip-txt{font-size:.83rem;color:var(--txt);line-height:1.6;}
.tip-lbl{font-size:.66rem;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.09em;margin-bottom:3px;}

/* pt-grid */
.pt-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}

/* ── MEDICAL RECORD TRACKER ── */
.mrt-wrap{background:var(--surface);border:1.5px solid var(--cb);border-radius:var(--r3);overflow:hidden;box-shadow:var(--sh2);margin-bottom:20px;}
.mrt-hdr{background:linear-gradient(135deg,#0c1f3f 0%,#163872 60%,#1e4faa 100%);padding:22px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.mrt-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(147,197,253,.14);
  border:1px solid rgba(147,197,253,.28);border-radius:99px;padding:3px 12px;
  font-size:.65rem;font-weight:700;color:#93c5fd;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;width:fit-content;}
.mrt-hdr-name{font-family:var(--serif);font-size:1.35rem;color:#fff;letter-spacing:-.1px;}
.mrt-hdr-id{font-family:var(--mono);font-size:.71rem;color:rgba(255,255,255,.42);}
.mrt-ai-badge{background:linear-gradient(135deg,rgba(99,102,241,.28),rgba(168,85,247,.28));
  border:1px solid rgba(168,85,247,.38);border-radius:99px;padding:6px 16px;
  font-size:.71rem;font-weight:700;color:#c4b5fd;letter-spacing:.08em;}
.mrt-tabs{display:flex;border-bottom:1.5px solid var(--cb);background:var(--bg);padding:0 16px;gap:4px;}
.mrt-tab{display:flex;align-items:center;gap:7px;padding:14px 18px;border:none;
  border-bottom:2.5px solid transparent;background:transparent;font-family:var(--font);
  font-size:.83rem;font-weight:600;color:var(--tl);cursor:pointer;transition:all .2s;margin-bottom:-1.5px;}
.mrt-tab:hover{color:var(--txt);}
.mrt-tab.active{color:var(--acc);border-bottom-color:var(--acc);}
.mrt-tab-count{background:var(--cb);color:var(--tm);border-radius:99px;padding:1px 8px;
  font-size:.66rem;font-weight:700;font-family:var(--mono);}
.mrt-tab.active .mrt-tab-count{background:var(--acc-l);color:var(--acc);}
.mrt-panel{padding:22px 24px;}
.mrt-action-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:20px;}
.mrt-add-btn{padding:9px 18px;border-radius:var(--r);border:1.5px solid var(--acc-m);
  background:var(--acc-l);color:var(--acc);font-family:var(--font);font-size:.82rem;font-weight:700;
  cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0;}
.mrt-add-btn:hover{background:var(--acc);color:#fff;border-color:var(--acc);}
.mrt-form{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:20px 22px;margin-bottom:18px;animation:fadeUp .2s ease forwards;}
.mrt-form-title{font-size:.87rem;font-weight:800;color:var(--txt);margin-bottom:14px;}
.mrt-ai-row{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
.mrt-ai-btn{padding:8px 16px;border-radius:var(--r);border:1.5px solid rgba(139,92,246,.35);
  background:linear-gradient(135deg,rgba(109,40,217,.07),rgba(139,92,246,.05));
  color:#7c3aed;font-family:var(--font);font-size:.8rem;font-weight:700;cursor:pointer;
  transition:all .2s;display:flex;align-items:center;gap:6px;}
.mrt-ai-btn:hover:not(:disabled){background:linear-gradient(135deg,rgba(109,40,217,.14),rgba(139,92,246,.1));border-color:#8b5cf6;}
.mrt-ai-btn:disabled{opacity:.5;cursor:not-allowed;}
.mrt-ai-result{background:linear-gradient(135deg,rgba(109,40,217,.05),rgba(139,92,246,.03));
  border:1.5px solid rgba(139,92,246,.22);border-radius:var(--r);padding:14px 16px;margin-bottom:12px;animation:fadeIn .2s ease;}
.mrt-ai-result-lbl{font-size:.65rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;}
.mrt-list{display:flex;flex-direction:column;gap:10px;}
.mrt-empty{padding:32px;text-align:center;color:var(--tl);font-size:.85rem;}
.mrt-note-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:16px 18px;transition:border-color .2s;}
.mrt-note-card:hover{border-color:var(--acc-m);}
.mrt-note-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.mrt-note-author{font-weight:700;color:var(--acc);font-size:.82rem;}
.mrt-note-date{font-family:var(--mono);font-size:.71rem;color:var(--tl);}
.mrt-note-body{font-size:.86rem;color:var(--txt);line-height:1.7;margin-bottom:10px;}
.mrt-note-tags{display:flex;gap:6px;flex-wrap:wrap;}
.mrt-tag{background:var(--acc-l);color:var(--acc);border:1px solid var(--acc-m);border-radius:99px;padding:2px 10px;font-size:.67rem;font-weight:600;}
.mrt-dx-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:16px 18px;transition:border-color .2s;}
.mrt-dx-card:hover{border-color:var(--acc-m);}
.mrt-dx-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:8px;}
.mrt-dx-code{background:var(--pbg);color:var(--pur);border:1px solid var(--pbr);border-radius:6px;padding:3px 10px;font-family:var(--mono);font-size:.73rem;font-weight:700;flex-shrink:0;}
.mrt-dx-label{font-weight:700;color:var(--txt);font-size:.9rem;}
.mrt-sev-pill{border-radius:99px;padding:3px 11px;font-size:.71rem;font-weight:700;}
.mrt-dx-note{font-size:.83rem;color:var(--tm);line-height:1.65;margin-bottom:6px;}
.mrt-dx-date{font-family:var(--mono);font-size:.69rem;color:var(--tl);}
.mrt-vitals-card{background:var(--bg);border:1.5px solid var(--cb);border-radius:var(--r2);padding:16px 18px;}
.mrt-vitals-date{font-family:var(--mono);font-size:.71rem;color:var(--tl);margin-bottom:12px;}
.mrt-vitals-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;}
.mrt-vcard{border-radius:var(--r);padding:10px 12px;text-align:center;background:var(--surface);border:1.5px solid var(--cb);}
.mrt-vcard-high{background:var(--rbg);border-color:var(--rbr);}
.mrt-vcard-low{background:var(--abg);border-color:var(--abr);}
.mrt-vcard-ok{background:var(--gbg);border-color:var(--gbr);}
.mrt-vval{font-family:var(--mono);font-size:1rem;font-weight:700;color:var(--txt);}
.mrt-vunit{font-size:.61rem;font-weight:400;color:var(--tl);margin-left:2px;}
.mrt-vlbl{font-size:.64rem;color:var(--tl);margin-top:3px;text-transform:uppercase;letter-spacing:.05em;}
.mrt-vflag{font-size:.71rem;font-weight:800;color:var(--red);margin-top:2px;}
.mrt-vcard-high .mrt-vval{color:var(--red);}
.mrt-vcard-low .mrt-vval{color:var(--amb);}
.mrt-vcard-ok .mrt-vval{color:var(--green);}

/* Responsive */
@media(max-width:900px){
  .auth-left{width:38%;}
  .auth-tagline{font-size:2.2rem;}
  .dc-di{grid-template-columns:1fr 1fr;}
  .vital-grid{grid-template-columns:1fr 1fr;}
  .pt-grid2{grid-template-columns:1fr;}
  .mrt-vitals-grid{grid-template-columns:repeat(3,1fr);}
}
@media(max-width:700px){
  .auth-left{display:none;}
  .auth-right{padding:32px 24px;}
  .sidebar{width:56px;}
  .sb-name,.sb-role-pill,.nav-section-label,.nav-item span:not(.nav-dot){display:none;}
  .nav-item{justify-content:center;}
  .page-body{padding:20px 16px;}
  .page-header{padding:18px 20px;}
  .pt-tabs{gap:4px;}
  .pt-tab{padding:7px 11px;font-size:.76rem;}
}
`;
// UTILITIES

function Bdg({type, label}) {
  return <span className={`badge b-${type}`}>{label}</span>;
}

function getInit(name) {
  return name.replace('Dr.','').trim().split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase();
}

function Modal({title, onClose, children}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

function SpecialtyDropdown({value, onChange}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const filtered = SPECIALTIES_LIST.filter(s=>s.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="spec-dropdown-wrap">
      <input className="spec-input" readOnly value={value||''} placeholder="Select a specialty…"
        onClick={()=>setOpen(o=>!o)} style={{cursor:'pointer',caretColor:'transparent'}}/>
      {open && (
        <div className="spec-list">
          <div style={{padding:'8px 10px',borderBottom:'1px solid var(--cb)'}}>
            <input autoFocus placeholder="Search specialty…" value={q} onChange={e=>setQ(e.target.value)}
              onClick={e=>e.stopPropagation()}
              style={{width:'100%',border:'1.5px solid var(--cb)',borderRadius:'var(--r)',padding:'8px 12px',fontFamily:'var(--font)',fontSize:'.83rem',outline:'none',background:'var(--bg)',color:'var(--txt)'}}/>
          </div>
          {filtered.map(s=>(
            <div key={s} className={`spec-item ${value===s?'active':''}`}
              onClick={()=>{onChange(s);setOpen(false);setQ('');}}>
              <span className="spec-num">{(SPECIALTIES_LIST.indexOf(s)+1).toString().padStart(2,'0')}</span>
              {s}
            </div>
          ))}
          {filtered.length===0 && <div style={{padding:'14px',color:'var(--tl)',fontSize:'.83rem',textAlign:'center'}}>No match</div>}
        </div>
      )}
    </div>
  );
}

function Spinner({msg='Signing in…'}) {
  return (
    <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
      <span style={{width:14,height:14,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin .7s linear infinite'}}/>
      {msg}
    </span>
  );
}

function AISpinner() {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'14px 0',color:'var(--acc)',fontSize:'.83rem',fontWeight:500}}>
      <div style={{width:16,height:16,border:'2.5px solid var(--acc-m)',borderTopColor:'var(--acc)',borderRadius:'50%',animation:'spin .7s linear infinite',flexShrink:0}}/>
      AI is generating…
    </div>
  );
}

async function callClaude(messages, systemPrompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:systemPrompt,messages}),
  });
  const data = await res.json();
  return data.content?.[0]?.text || '';
}
// AUTH

function AuthLeftPanel() {
  return (
    <div className="auth-left">
      <div className="auth-left-glow"/><div className="auth-left-glow2"/><div className="auth-dots"/>
      <div className="auth-brand">
        <div className="auth-brand-mark">HMS</div>
        <div>
          <div className="auth-brand-name">BLUE MED</div>
          <div className="auth-brand-sub">HEALTH MANAGEMENT SYSTEM</div>
        </div>
      </div>
      <div className="auth-hero">
        <div className="auth-tagline">Modern care,<br/><em>secured</em> by design.</div>
        <p className="auth-desc">A unified healthcare platform built for hospitals, clinics, and care teams worldwide.</p>
        <div className="auth-features">
          {['HIPAA-compliant data encryption','Real-time patient alerts & monitoring','Multi-role access: Admin, Doctor, Patient','Full audit trail & system logs'].map((f,i)=>(
            <div className="auth-feat" key={i}>
              <div className="auth-feat-icon"><div className="auth-feat-dot"/></div>
              <span className="auth-feat-text">{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="auth-stats">
        {[['31','Specialties'],['5+','Departments'],['99.9%','Uptime']].map(([v,l])=>(
          <div key={l}><div className="auth-stat-val">{v}</div><div className="auth-stat-lbl">{l}</div></div>
        ))}
      </div>
    </div>
  );
}
// LOGIN PAGE

function LoginPage({onLogin, onGoSignup, dark, toggleDark}) {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const ROLE_META = {
    admin:  {icon:'⚙',label:'Admin',sub:'Full access'},
    doctor: {icon:'🩺',label:'Doctor',sub:'Clinical'},
    patient:{icon:'👤',label:'Patient',sub:'Personal'},
  };

  const doLogin = () => {
    const c = DEMO_CREDENTIALS[role];
    if (email === c.email && pwd === c.password) {
      setErr(''); setLoading(true);
      setTimeout(()=>onLogin(role), 900);
    } else {
      setErr('Invalid credentials. Try a demo account below.');
    }
  };

  const fillDemo = r => {
    setRole(r);
    setEmail(DEMO_CREDENTIALS[r].email);
    setPwd(DEMO_CREDENTIALS[r].password);
    setErr('');
  };

  return (
    <div className="auth-shell">
      <AuthLeftPanel/>
      <div className="auth-right">
        <button className="auth-theme-btn" onClick={toggleDark}>{dark?'☀️':'🌙'}</button>
        <div className="auth-form-wrap">
          <div className="auth-heading">Welcome back</div>
          <div className="auth-subheading">
            Sign in to continue.{' '}
            <button className="auth-switch-link" onClick={onGoSignup}>Create an account →</button>
          </div>

          <div className="role-tabs">
            {Object.entries(ROLE_META).map(([id,{icon,label,sub}])=>(
              <button key={id} className={`rtab ${role===id?'active':''}`}
                onClick={()=>{setRole(id);setErr('');setEmail('');setPwd('');}}>
                <span className="rtab-icon">{icon}</span>
                {label}<span className="rtab-sub">{sub}</span>
              </button>
            ))}
          </div>

          {err && <div className="auth-err">{err}</div>}

          <div className="form-field">
            <label>Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" value={email}
              onChange={e=>{setEmail(e.target.value);setErr('');}}/>
          </div>
          <div className="form-field">
            <label>Password</label>
            <div className="input-wrap">
              <input className="form-input" type={showPwd?'text':'password'} placeholder="••••••••" value={pwd}
                onChange={e=>{setPwd(e.target.value);setErr('');}} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
              <button className="input-eye" onClick={()=>setShowPwd(p=>!p)}>{showPwd?'Hide':'Show'}</button>
            </div>
          </div>
          <div className="forgot-link"><a href="#">Forgot password?</a></div>

          <button className="btn-primary" onClick={doLogin} disabled={loading}>
            {loading ? <Spinner/> : `Sign in as ${ROLE_META[role].label} →`}
          </button>

          <div className="auth-divider">or use a demo account</div>

          <div className="demo-list">
            {Object.entries(ROLE_META).map(([id,{icon,label}])=>(
              <button key={id} className="demo-btn" onClick={()=>fillDemo(id)}>
                <span style={{fontSize:'.9rem'}}>{icon}</span>
                <span style={{flex:1,textAlign:'left'}}>
                  <strong style={{color:'var(--txt)',display:'block'}}>{label}</strong>
                  <span style={{fontSize:'.74rem',color:'var(--tl)'}}>{DEMO_CREDENTIALS[id].email}</span>
                </span>
                <span className="demo-pill">Demo</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// SIGNUP PAGE

function SignupPage({onGoLogin, dark, toggleDark}) {
  const [step, setStep] = useState(1); // 1=Role select, 2=Details, 3=Success
  const [role, setRole] = useState('');
  const [form, setForm] = useState({
    firstName:'', lastName:'', email:'', phone:'',
    password:'', confirmPassword:'',
    specialty:'',    // for doctors
    dateOfBirth:'',  // for patients
    bloodType:'',    // for patients
    department:'',   // for patients
  });
  const [err, setErr] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f=>({...f,[key]:val}));

  const ROLES = [
    {id:'admin',icon:'⚙',label:'Administrator',desc:'Manage the full system — doctors, patients, protocols, and logs.'},
    {id:'doctor',icon:'🩺',label:'Doctor',desc:'Access your patients, records, schedules, and clinical tools.'},
    {id:'patient',icon:'👤',label:'Patient',desc:'View your health data, appointments, and communicate with your doctor.'},
  ];

  const validateStep2 = () => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!form.email.includes('@')) return 'Enter a valid email address.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    if (role==='doctor' && !form.specialty) return 'Please select your specialty.';
    if (role==='patient' && !form.dateOfBirth) return 'Please enter your date of birth.';
    return '';
  };

  const handleSubmit = () => {
    const e = validateStep2();
    if (e) { setErr(e); return; }
    setErr(''); setLoading(true);
    setTimeout(()=>{ setLoading(false); setStep(3); }, 1200);
  };

  const steps = ['Select Role','Your Details','Done'];

  return (
    <div className="auth-shell">
      <AuthLeftPanel/>
      <div className="auth-right">
        <button className="auth-theme-btn" onClick={toggleDark}>{dark?'☀️':'🌙'}</button>
        <div className="auth-form-wrap" style={{maxWidth: step===1?420:400}}>

          {/* Steps indicator */}
          {step < 3 && (
            <div className="signup-steps" style={{marginBottom:24}}>
              {steps.map((s,i)=>{
                const n = i+1;
                const isDone = n < step;
                const isActive = n === step;
                return (
                  <div className="signup-step" key={s}>
                    <div className={`ss-circle ${isDone?'done':isActive?'active':''}`}>
                      {isDone ? '✓' : n}
                    </div>
                    <span className={`ss-label ${isActive?'active':''}`}>{s}</span>
                    {i < steps.length-1 && <div className={`ss-line ${isDone?'done':''}`}/>}
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 1 — Role Selection */}
          {step===1 && <>
            <div className="auth-heading">Create account</div>
            <div className="auth-subheading">
              Choose your role to get started.{' '}
              <button className="auth-switch-link" onClick={onGoLogin}>Sign in instead</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:24}}>
              {ROLES.map(r=>(
                <div key={r.id}
                  onClick={()=>{setRole(r.id);setErr('');}}
                  style={{
                    background: role===r.id ? 'var(--acc-l)' : 'var(--bg)',
                    border: `2px solid ${role===r.id?'var(--acc)':'var(--cb)'}`,
                    borderRadius:'var(--r2)', padding:'18px 20px',
                    cursor:'pointer', transition:'all .22s',
                    display:'flex', alignItems:'center', gap:16,
                  }}>
                  <div style={{
                    width:46,height:46,borderRadius:12,flexShrink:0,
                    background: role===r.id?'var(--acc)':'var(--surface)',
                    border:`1.5px solid ${role===r.id?'var(--acc)':'var(--cb)'}`,
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',
                    transition:'all .22s',
                  }}>{r.icon}</div>
                  <div>
                    <div style={{fontWeight:700,color:'var(--txt)',fontSize:'.95rem'}}>{r.label}</div>
                    <div style={{fontSize:'.78rem',color:'var(--tm)',marginTop:2,lineHeight:1.5}}>{r.desc}</div>
                  </div>
                  {role===r.id && (
                    <div style={{marginLeft:'auto',width:20,height:20,borderRadius:'50%',
                      background:'var(--acc)',display:'flex',alignItems:'center',justifyContent:'center',
                      color:'#fff',fontSize:'.72rem',fontWeight:800,flexShrink:0}}>✓</div>
                  )}
                </div>
              ))}
            </div>
            {err && <div className="auth-err" style={{marginTop:14}}>{err}</div>}
            <button className="btn-primary" style={{marginTop:22}}
              onClick={()=>{if(!role){setErr('Please select a role to continue.');return;}setErr('');setStep(2);}}>
              Continue →
            </button>
          </>}

          {/* STEP 2 — Details */}
          {step===2 && <>
            <div className="auth-heading">Your details</div>
            <div className="auth-subheading" style={{marginBottom:20}}>
              Registering as <strong style={{color:'var(--acc)'}}>{ROLES.find(r=>r.id===role)?.label}</strong>.{' '}
              <button className="auth-switch-link" onClick={()=>setStep(1)}>Change role</button>
            </div>
            {err && <div className="auth-err">{err}</div>}

            <div className="form-row2">
              <div className="form-field" style={{marginBottom:14}}>
                <label>First Name</label>
                <input className="form-input" placeholder="First name" value={form.firstName} onChange={e=>set('firstName',e.target.value)}/>
              </div>
              <div className="form-field" style={{marginBottom:14}}>
                <label>Last Name</label>
                <input className="form-input" placeholder="Last name" value={form.lastName} onChange={e=>set('lastName',e.target.value)}/>
              </div>
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>set('email',e.target.value)}/>
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input className="form-input" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e=>set('phone',e.target.value)}/>
            </div>

            {/* Doctor-specific */}
            {role==='doctor' && (
              <div className="form-field">
                <label>Medical Specialty</label>
                <SpecialtyDropdown value={form.specialty} onChange={v=>set('specialty',v)}/>
              </div>
            )}

            {/* Patient-specific */}
            {role==='patient' && <>
              <div className="form-row2">
                <div className="form-field" style={{marginBottom:14}}>
                  <label>Date of Birth</label>
                  <input className="form-input" type="date" value={form.dateOfBirth} onChange={e=>set('dateOfBirth',e.target.value)}/>
                </div>
                <div className="form-field" style={{marginBottom:14}}>
                  <label>Blood Type</label>
                  <select className="form-input" value={form.bloodType} onChange={e=>set('bloodType',e.target.value)}>
                    <option value="">Select…</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </>}

            {/* Admin-specific */}
            {role==='admin' && (
              <div className="form-field">
                <label>Admin Code</label>
                <input className="form-input" type="text" placeholder="Enter hospital admin code" value={form.department} onChange={e=>set('department',e.target.value)}/>
              </div>
            )}

            <div className="form-field">
              <label>Password</label>
              <div className="input-wrap">
                <input className="form-input" type={showPwd?'text':'password'} placeholder="Min. 6 characters" value={form.password} onChange={e=>set('password',e.target.value)}/>
                <button className="input-eye" onClick={()=>setShowPwd(p=>!p)}>{showPwd?'Hide':'Show'}</button>
              </div>
            </div>
            <div className="form-field">
              <label>Confirm Password</label>
              <input className="form-input" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)}/>
            </div>

            <div style={{display:'flex',gap:10,marginTop:6}}>
              <button className="btn-secondary" onClick={()=>{setErr('');setStep(1);}}>← Back</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <Spinner msg="Creating account…"/> : 'Create Account'}
              </button>
            </div>
            <p className="auth-terms" style={{marginTop:16}}>
              By registering, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </>}

          {/* STEP 3 — Success */}
          {step===3 && (
            <div className="signup-success">
              <div className="ss-check">✓</div>
              <div style={{fontSize:'1.55rem',fontWeight:800,color:'var(--txt)',marginBottom:8}}>Account created!</div>
              <div style={{fontSize:'.9rem',color:'var(--tm)',lineHeight:1.7,marginBottom:28,maxWidth:300,margin:'0 auto 28px'}}>
                Welcome, <strong>{form.firstName}</strong>! Your {ROLES.find(r=>r.id===role)?.label} account is ready. Use a demo account below to explore the system right away.
              </div>
              <button className="btn-primary" onClick={onGoLogin}>Sign in now →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// DASHBOARD SHELL

const NAV_CONFIG = {
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
  schedule:{title:'Schedule',sub:'Today — Tuesday, April 28 2026'},
  overview:{title:'My Health',sub:'Your personal health dashboard — Fatima Jelou'},
};

function Dashboard({role, onLogout, dark, toggleDark}) {
  const nav = role==='patient' ? [] : NAV_CONFIG[role];
  const [page, setPage] = useState(role==='patient'?'overview':'directory');
  const patientData = PATIENTS[0];
  const meta = role==='patient' ? PAGE_META['overview'] : (PAGE_META[page]||{});
  const roleLabel = role==='admin'?'Administrator':role==='doctor'?'Dr. Sara Mei':'Fatima Jelou';

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sb-header">
          <div className="sb-brand">
            <div className="sb-mark">HMS</div>
            <div className="sb-name">BLUE<span>MED</span></div>
          </div>
          <div className="sb-role-pill"><div className="sb-role-dot"/>{roleLabel}</div>
        </div>

        {role!=='patient' && <>
          <div className="nav-section-label">Navigation</div>
          {nav.map(n=>(
            <button key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>setPage(n.id)}>
              <span className="nav-dot"/><span>{n.label}</span>
            </button>
          ))}
        </>}

        <div className="sb-footer">
          <button className="sb-theme-btn" onClick={toggleDark}>
            <span>{dark?'☀️':'🌙'}</span><span>{dark?'Light Mode':'Dark Mode'}</span>
          </button>
          <button className="btn-signout" onClick={onLogout}>Sign Out</button>
        </div>
      </aside>

      <main className="main">
        <div className="page-header">
          <div className="page-title">{meta.title}</div>
          <div className="page-sub">{meta.sub}</div>
        </div>
        <div className="page-body">
          {role==='patient' ? <PatientPortal patient={patientData}/> :
           page==='directory' ? <Directory/> :
           role==='admin'&&page==='departments' ? <ADepts/> :
           role==='admin'&&page==='doctors'     ? <ADoctors/> :
           role==='admin'&&page==='patients'    ? <APatients/> :
           role==='admin'&&page==='protocols'   ? <AProtocols/> :
           role==='admin'&&page==='logs'        ? <ALogs/> :
           role==='doctor'&&page==='patients'   ? <DPatients/> :
           role==='doctor'&&page==='alerts'     ? <DAlerts/> :
           role==='doctor'&&page==='protocol'   ? <DProtocol/> :
           role==='doctor'&&page==='schedule'   ? <DSchedule/> : null}
        </div>
      </main>
    </div>
  );
}
// admin page

function Directory() {
  const [q, setQ] = useState('');
  const [spec, setSpec] = useState('');
  const [st, setSt] = useState('all');
  const [exp, setExp] = useState(null);
  const active = ALL_DOCTORS.filter(d=>d.status==='active').length;
  const list = ALL_DOCTORS.filter(d=>{
    const m = q.toLowerCase();
    return (d.name.toLowerCase().includes(m)||d.specialty.toLowerCase().includes(m)||d.id.toLowerCase().includes(m)||d.arabicName.includes(q))
      && (!spec||d.specialty===spec)
      && (st==='all'||d.status===st);
  });
  return (
    <>
      <div className="dir-hero">
        <div className="dh-orb dh-orb1"/><div className="dh-orb dh-orb2"/>
        <div className="dh-inner">
          <div className="dh-label">BlueMed Health Network</div>
          <div className="dh-title">Doctors Directory</div>
          <div className="dh-sub">Search and connect with our physicians. Filter by name, specialty, or availability.</div>
          <div className="dh-stats">
            {[[ALL_DOCTORS.length,'Total Physicians'],[active,'Currently Active'],['31','Specialties']].map(([v,l])=>(
              <div className="dh-stat" key={l}><div className="dh-sv">{v}</div><div className="dh-sl">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="dir-filters">
        <div className="df"><label>Search Doctor</label>
          <input className="di" placeholder="Name, specialty, or ID…" value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
        <div className="df"><label>Specialty</label>
          <SpecialtyDropdown value={spec} onChange={setSpec}/>
          {spec && <button onClick={()=>setSpec('')} style={{marginTop:5,fontSize:'.71rem',color:'var(--red)',background:'none',border:'none',cursor:'pointer',padding:0}}>✕ Clear</button>}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:5}}>
          <label style={{fontSize:'.68rem',fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:'.07em'}}>Status</label>
          <div style={{display:'flex',gap:7}}>
            {['all','active','inactive'].map(s=>(
              <button key={s} className={`filter-pill ${st===s?'active':''}`} onClick={()=>setSt(s)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{color:'var(--tm)',fontSize:'.81rem',fontWeight:500,alignSelf:'flex-end',paddingBottom:2}}>
          {list.length} result{list.length!==1?'s':''}
        </div>
      </div>

      {list.length===0 && <div className="card" style={{textAlign:'center',padding:'48px'}}>
        <div style={{fontSize:'1.15rem',fontWeight:700,marginBottom:8,color:'var(--tm)'}}>No doctors found</div>
        <div style={{fontSize:'.86rem',color:'var(--tl)'}}>Adjust your search or filters.</div>
      </div>}

      {list.map(d=>{
        const isO = exp===d.id;
        return (
          <div key={d.id} className={`doc-card ${isO?'open':''}`} onClick={()=>setExp(isO?null:d.id)}>
            <div className="dc-row">
              <div className="dc-av">{getInit(d.name)}</div>
              <div className="dc-main">
                <div className="dc-name">{d.name}</div>
                <div className="dc-name-ar">{d.arabicName}</div>
                <div className="dc-spec">{d.specialty}</div>
                <div className="dc-meta">
                  <span className="dc-mi">ID: <strong style={{fontFamily:'var(--mono)',fontSize:'.72rem'}}>{d.id}</strong></span>
                  <span className="dc-mi">·</span><span className="dc-mi">{d.patients} patients</span>
                  <span className="dc-mi">·</span><span className="dc-mi">Since {d.joined}</span>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
                <Bdg type={d.status} label={d.status==='active'?'Active':'Inactive'}/>
                <button className="dc-expand" onClick={e=>{e.stopPropagation();setExp(isO?null:d.id);}}>{isO?'−':'+'}</button>
              </div>
            </div>
            {isO && (
              <div className="dc-detail">
                <div className="dc-di">
                  {[['Phone',d.phone,'mono blue'],['Email',d.email,'mono blue'],['Specialty',d.specialty,''],
                    ['Patients',String(d.patients),'mono'],['Joined',d.joined,'mono'],['Arabic Name',d.arabicName,'']].map(([l,v,cls])=>(
                    <div className="dc-dg" key={l}>
                      <span className="dc-dl">{l}</span>
                      <span className={`dc-dv ${cls}`} style={l==='Arabic Name'?{direction:'rtl'}:{}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function ADepts() {
  return (
    <div className="dept-grid">
      {DEPARTMENTS.map(d=>(
        <div className="dept-card" key={d.name}>
          <div className="dept-name">{d.name}</div>
          <div className="dept-head">{d.head}</div>
          <div className="dept-row"><span className="dept-stat">{d.staff} staff</span><span className="dept-stat">{d.patients} patients</span></div>
          <div className="dept-bar"><div className="dept-fill" style={{width:`${Math.min(100,d.patients*1.5)}%`}}/></div>
        </div>
      ))}
    </div>
  );
}

function ADoctors() {
  const [docs, setDocs] = useState(ALL_DOCTORS);
  const [q, setQ] = useState('');
  const toggle = id => setDocs(p=>p.map(d=>d.id===id?{...d,status:d.status==='active'?'inactive':'active'}:d));
  const list = docs.filter(d=>d.name.toLowerCase().includes(q.toLowerCase())||d.specialty.toLowerCase().includes(q.toLowerCase()));
  const active = docs.filter(d=>d.status==='active').length;
  return (
    <>
      <div style={{display:'flex',gap:12,marginBottom:16}}>
        <div style={{background:'var(--gbg)',border:'1.5px solid var(--gbr)',borderRadius:'var(--r)',padding:'12px 20px'}}>
          <div style={{fontSize:'1.4rem',fontWeight:800,color:'var(--green)',fontFamily:'var(--mono)'}}>{active}</div>
          <div style={{fontSize:'.74rem',color:'var(--green)'}}>Active</div>
        </div>
        <div style={{background:'var(--rbg)',border:'1.5px solid var(--rbr)',borderRadius:'var(--r)',padding:'12px 20px'}}>
          <div style={{fontSize:'1.4rem',fontWeight:800,color:'var(--red)',fontFamily:'var(--mono)'}}>{docs.length-active}</div>
          <div style={{fontSize:'.74rem',color:'var(--red)'}}>Inactive</div>
        </div>
      </div>
      <div className="search-bar"><span className="search-icon">⌕</span>
        <input placeholder="Search by name or specialty…" value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className="card"><div className="tbl-wrap">
        <table className="tbl">
          <thead><tr>{['ID','Name','Arabic','Specialty','Patients','Status','Action'].map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>{list.map(d=>(
            <tr key={d.id}>
              <td style={{fontFamily:'var(--mono)',fontSize:'.74rem',color:'var(--tl)'}}>{d.id}</td>
              <td><div style={{display:'flex',alignItems:'center',gap:9}}><span className="initials">{getInit(d.name)}</span><span style={{fontWeight:600}}>{d.name}</span></div></td>
              <td style={{direction:'rtl',color:'var(--tm)',fontSize:'.82rem'}}>{d.arabicName}</td>
              <td style={{color:'var(--tm)',fontSize:'.82rem'}}>{d.specialty}</td>
              <td style={{fontFamily:'var(--mono)',color:'var(--tm)'}}>{d.patients}</td>
              <td><Bdg type={d.status} label={d.status==='active'?'Active':'Inactive'}/></td>
              <td><button className={`tog-btn ${d.status==='active'?'tog-off':'tog-on'}`} onClick={()=>toggle(d.id)}>{d.status==='active'?'Deactivate':'Activate'}</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div></div>
    </>
  );
}

function APatients() {
  const [q, setQ] = useState('');
  const [openRecord, setOpenRecord] = useState(null);
  const list = PATIENTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.dept.toLowerCase().includes(q.toLowerCase())||p.status.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="search-bar"><span className="search-icon">⌕</span>
        <input placeholder="Search by name, department, or status…" value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className="card"><div className="tbl-wrap">
        <table className="tbl">
          <thead><tr>{['ID','Name','Arabic','Age','Dept','Doctor','Status','Last Visit','Record'].map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>{list.map(p=>(
            <tr key={p.id}>
              <td style={{fontFamily:'var(--mono)',fontSize:'.74rem',color:'var(--tl)'}}>{p.id}</td>
              <td style={{fontWeight:600}}>{p.name}</td>
              <td style={{direction:'rtl',color:'var(--tm)',fontSize:'.82rem'}}>{p.arabicName}</td>
              <td style={{fontFamily:'var(--mono)',color:'var(--tm)'}}>{p.age}</td>
              <td style={{color:'var(--tm)'}}>{p.dept}</td>
              <td style={{color:'var(--tm)',fontSize:'.81rem'}}>{p.doctor}</td>
              <td><Bdg type={p.status.toLowerCase()} label={p.status}/></td>
              <td style={{color:'var(--tl)',fontSize:'.78rem'}}>{p.lastVisit}</td>
              <td>
                <button className="mrt-add-btn" style={{padding:'5px 12px',fontSize:'.73rem'}} onClick={()=>setOpenRecord(openRecord===p.id?null:p.id)}>
                  {openRecord===p.id?'✕ Close':'📋 Open'}
                </button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div></div>
      {openRecord && (()=>{const p=PATIENTS.find(pt=>pt.id===openRecord);return p?<MedicalRecordTracker patient={p} doctorMode={false}/>:null;})()}
    </>
  );
}

function AProtocols() {
  return (
    <div className="card"><div className="tbl-wrap">
      <table className="tbl">
        <thead><tr>{['ID','Protocol','Department','Updated','Severity'].map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>{PROTOCOLS.map(p=>(
          <tr key={p.id}>
            <td style={{fontFamily:'var(--mono)',fontSize:'.74rem',color:'var(--tl)'}}>{p.id}</td>
            <td style={{fontWeight:600}}>{p.title}</td>
            <td style={{color:'var(--tm)'}}>{p.dept}</td>
            <td style={{color:'var(--tl)',fontSize:'.78rem'}}>{p.updated}</td>
            <td><Bdg type={p.severity} label={p.severity.charAt(0).toUpperCase()+p.severity.slice(1)}/></td>
          </tr>
        ))}</tbody>
      </table>
    </div></div>
  );
}

function ALogs() {
  return (
    <div className="card">
      {LOGS.map((l,i)=>(
        <div className="log-row" key={i}>
          <span className="lt">{l.time}</span>
          <span className="lu">{l.user}</span>
          <span className="la">{l.action}</span>
          <span style={{marginLeft:'auto'}}><Bdg type={l.type} label={l.type}/></span>
        </div>
      ))}
    </div>
  );
}
// admin page 

function DPatients() {
  const mine = PATIENTS.filter(p=>p.doctor==='Dr. Sara Mei');
  const [q, setQ] = useState('');
  const [openRecord, setOpenRecord] = useState(null);
  const list = mine.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="search-bar"><span className="search-icon">⌕</span>
        <input placeholder="Search patients…" value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className="card"><div className="tbl-wrap">
        <table className="tbl">
          <thead><tr>{['ID','Name','Arabic','Age','Dept','Status','Last Visit','Next Appt','Record'].map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>{list.map(p=>(
            <tr key={p.id}>
              <td style={{fontFamily:'var(--mono)',fontSize:'.74rem',color:'var(--tl)'}}>{p.id}</td>
              <td style={{fontWeight:600}}>{p.name}</td>
              <td style={{direction:'rtl',color:'var(--tm)',fontSize:'.82rem'}}>{p.arabicName}</td>
              <td style={{fontFamily:'var(--mono)',color:'var(--tm)'}}>{p.age}</td>
              <td style={{color:'var(--tm)'}}>{p.dept}</td>
              <td><Bdg type={p.status.toLowerCase()} label={p.status}/></td>
              <td style={{color:'var(--tl)',fontSize:'.78rem'}}>{p.lastVisit}</td>
              <td style={{fontFamily:'var(--mono)',fontSize:'.78rem',color:'var(--acc)'}}>{p.nextAppt}</td>
              <td>
                <button className="mrt-add-btn" style={{padding:'5px 12px',fontSize:'.73rem'}} onClick={()=>setOpenRecord(openRecord===p.id?null:p.id)}>
                  {openRecord===p.id?'✕ Close':'📋 Open'}
                </button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div></div>
      {openRecord && (()=>{const p=PATIENTS.find(pt=>pt.id===openRecord);return p?<MedicalRecordTracker patient={p} doctorMode={true}/>:null;})()}
    </>
  );
}

function DAlerts() {
  const [als, setAls] = useState(DOCTOR_ALERTS);
  const dismiss = id => setAls(p=>p.filter(a=>a.id!==id));
  return (
    <>
      {als.length===0 && <div className="card" style={{textAlign:'center',padding:'48px'}}>
        <div style={{fontSize:'1.2rem',fontWeight:700,color:'var(--green)',marginBottom:8}}>All Clear</div>
        <div style={{color:'var(--tm)',fontSize:'.87rem'}}>No active alerts.</div>
      </div>}
      {als.map(a=>(
        <div className={`al-card al-${a.level}`} key={a.id}>
          <div className={`al-dot al-dot-${a.level}`}/>
          <div style={{flex:1}}>
            <div style={{fontSize:'.77rem',color:'var(--tm)',marginBottom:2,fontWeight:700}}>{a.patient}</div>
            <div style={{fontSize:'.88rem',color:'var(--txt)',fontWeight:500}}>{a.msg}</div>
            <div style={{fontSize:'.73rem',color:'var(--tl)',marginTop:3}}>{a.time}</div>
          </div>
          <button className="btn-sm" onClick={()=>dismiss(a.id)}>Dismiss</button>
        </div>
      ))}
    </>
  );
}

function DProtocol() {
  const [open, setOpen] = useState(null);
  return (
    <>
      {PROTOCOLS.map(p=>(
        <div key={p.id} onClick={()=>setOpen(open===p.id?null:p.id)}
          style={{background:'var(--surface)',border:`1.5px solid ${open===p.id?'var(--acc)':'var(--cb)'}`,borderRadius:'var(--r2)',padding:'18px 22px',cursor:'pointer',transition:'all .2s',boxShadow:'var(--sh)',marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
            <div>
              <div style={{fontWeight:700,color:'var(--txt)',marginBottom:3,fontSize:'.94rem'}}>{p.title}</div>
              <div style={{fontSize:'.76rem',color:'var(--tm)'}}>{p.dept} · Updated {p.updated}</div>
            </div>
            <div style={{display:'flex',gap:9,alignItems:'center',flexShrink:0}}>
              <Bdg type={p.severity} label={p.severity}/>
              <span style={{color:'var(--tl)',fontFamily:'var(--mono)',fontSize:'.77rem'}}>{open===p.id?'[-]':'[+]'}</span>
            </div>
          </div>
          {open===p.id && <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--cb)',color:'var(--tm)',fontSize:'.84rem',lineHeight:1.75}}>
            Protocol for <strong style={{color:'var(--txt)'}}>{p.title}</strong> covers {p.dept} department procedures. Last reviewed {p.updated}.
          </div>}
        </div>
      ))}
    </>
  );
}

function DSchedule() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const save = ()=>{setSaved(true);setTimeout(()=>{setSaved(false);setOpen(false);},1400);};
  return (
    <>
      {open && <Modal title="Add Appointment" onClose={()=>setOpen(false)}>
        {saved ? <div style={{textAlign:'center',padding:'24px 0'}}>
          <div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--green)'}}>Scheduled ✓</div>
          <div style={{color:'var(--tm)',marginTop:8,fontSize:'.88rem'}}>Appointment saved successfully.</div>
        </div> : <>
          <div className="mf"><label>Patient Name</label><input placeholder="Full name"/></div>
          <div className="mf"><label>Time</label><input type="time"/></div>
          <div className="mf"><label>Type</label><select><option>Follow-up</option><option>Consultation</option><option>Review</option><option>New Patient</option></select></div>
          <div className="mf"><label>Room</label><input placeholder="e.g. A-12"/></div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={()=>setOpen(false)}>Cancel</button>
            <button className="btn-modal-primary" onClick={save}>Save</button>
          </div>
        </>}
      </Modal>}
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:18}}>
        <button className="btn-modal-primary" style={{flex:'unset',padding:'10px 20px',fontSize:'.9rem',borderRadius:'var(--r)'}} onClick={()=>setOpen(true)}>+ Add Appointment</button>
      </div>
      {SCHEDULE.map((s,i)=>(
        <div className="sc-item" key={i}>
          <span className="sc-time">{s.time}</span>
          <div>
            <div style={{fontWeight:600,color:'var(--txt)',fontSize:'.9rem'}}>{s.patient}</div>
            <div style={{fontSize:'.76rem',color:'var(--tm)',marginTop:2}}>{s.type}</div>
          </div>
          <span className="sc-room">{s.room}</span>
        </div>
      ))}
    </>
  );
}
// patient portal

function PatientPortal({patient}) {
  const [tab, setTab] = useState('overview');
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const sendMsg = () => {setMsgSent(true);setTimeout(()=>{setMsgSent(false);setMsgOpen(false);},1600);};
  const doc = ALL_DOCTORS.find(d=>d.name===patient.doctor);
  const tips = HEALTH_TIPS[patient.dept]||HEALTH_TIPS['Cardiology'];
  const latestVitals = patient.vitals[0];
  const tabs = [
    {id:'overview',label:'Overview'},{id:'vitals',label:'Vitals'},{id:'medications',label:'Medications'},
    {id:'labs',label:'Lab Results'},{id:'symptoms',label:'Symptoms'},{id:'history',label:'History'},
    {id:'protocol',label:'Protocol'},{id:'notes',label:'Doctor Notes'},
    {id:'medical-record',label:'📋 Medical Record'},{id:'tips',label:'Health Tips'},
  ];

  return (
    <>
      {msgOpen && <Modal title="Message Your Doctor" onClose={()=>setMsgOpen(false)}>
        {msgSent ? <div style={{textAlign:'center',padding:'24px 0'}}>
          <div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--green)'}}>Message Sent!</div>
          <div style={{color:'var(--tm)',marginTop:8,fontSize:'.88rem'}}>Your doctor will reply within 24 hours.</div>
        </div> : <>
          <div style={{background:'var(--acc-l)',border:'1.5px solid var(--acc-m)',borderRadius:'var(--r)',padding:'11px 15px',marginBottom:14,fontSize:'.83rem',color:'var(--acc)',fontWeight:500}}>
            To: {patient.doctor} · {doc?.specialty}
          </div>
          <div className="mf"><label>Subject</label><input placeholder="e.g. Question about my medication"/></div>
          <div className="mf"><label>Message</label><textarea placeholder="Write your message here…" rows={5}/></div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={()=>setMsgOpen(false)}>Cancel</button>
            <button className="btn-modal-primary" onClick={sendMsg}>Send Message</button>
          </div>
        </>}
      </Modal>}

      {/* Hero */}
      <div className="pt-hero">
        <div className="pt-orb"/>
        <div className="pt-inner">
          <div className="pt-av">{patient.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
          <div style={{flex:1}}>
            <div className="pt-name">{patient.name}</div>
            <div className="pt-name-ar">{patient.arabicName}</div>
            <div className="pt-info">ID: {patient.id} · Age {patient.age} · Blood: {patient.blood} · {patient.dept}</div>
            <div className="pt-badges">
              <Bdg type={patient.status.toLowerCase()} label={patient.status}/>
              <span style={{background:'rgba(255,255,255,.14)',color:'#fff',border:'1px solid rgba(255,255,255,.22)',borderRadius:'99px',padding:'3px 11px',fontSize:'.72rem',fontWeight:600}}>{patient.doctor}</span>
            </div>
          </div>
        </div>
        <div className="pt-stat-row">
          {[[patient.medications.length,'Medications','Active'],[patient.symptoms.length,'Symptoms','Reported'],[patient.alerts.length>0?'!':'✓','Alerts',patient.alerts.length>0?'Active':'None'],[patient.nextAppt,'Next Appt','Scheduled']].map(([v,l,s])=>(
            <div className="pt-stat" key={l}><div className="pt-sv" style={{fontSize:l==='Next Appt'?'.78rem':'1.2rem'}}>{v}</div><div className="pt-sl">{s}</div></div>
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
      {tab==='overview' && <>
        <div className="pt-grid2">
          <div className="card">
            <div className="sec-title"><div className="sec-dot"/>Assigned Doctor</div>
            <div className="contact-widget">
              <div className="cw-av">{getInit(patient.doctor)}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:'var(--txt)',fontSize:'1rem'}}>{patient.doctor}</div>
                <div style={{fontSize:'.75rem',color:'var(--tl)',direction:'rtl',marginTop:1}}>{doc?.arabicName}</div>
                <div style={{fontSize:'.79rem',color:'var(--acc)',marginTop:2}}>{doc?.specialty}</div>
                <div className="cw-actions">
                  <button className="cw-btn" onClick={()=>setMsgOpen(true)}>✉ Message</button>
                  <button className="cw-btn">📞 Call</button>
                  <button className="cw-btn">📅 Book</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="sec-title"><div className="sec-dot" style={{background:'var(--green)'}}/>Current Status</div>
            <div style={{marginBottom:12}}><Bdg type={patient.status.toLowerCase()} label={patient.status}/></div>
            <div style={{fontSize:'.82rem',color:'var(--tm)',lineHeight:1.85}}>
              Last visit: <strong style={{color:'var(--txt)'}}>{patient.lastVisit}</strong><br/>
              Department: <strong style={{color:'var(--txt)'}}>{patient.dept}</strong><br/>
              Blood type: <strong style={{color:'var(--txt)'}}>{patient.blood}</strong>
            </div>
          </div>
        </div>
        <div className="card" style={{marginBottom:16}}>
          <div className="sec-title"><div className="sec-dot" style={{background:'var(--pur)'}}/>Latest Vitals <span style={{fontSize:'.72rem',color:'var(--tl)',fontWeight:400,marginLeft:4}}>{latestVitals.date}</span></div>
          <div className="vital-grid">
            {[['BP',latestVitals.bp],['Heart Rate',latestVitals.hr+' bpm'],['Temp',latestVitals.temp+'°C'],['Weight',latestVitals.weight]].map(([l,v])=>(
              <div className="vital-card" key={l}><div className="vital-val">{v}</div><div className="vital-lbl">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="pt-grid2">
          <div className="card">
            <div className="sec-title"><div className="sec-dot" style={{background:'var(--amb)'}}/>Active Alerts</div>
            {patient.alerts.length===0
              ? <div style={{color:'var(--green)',fontWeight:600,fontSize:'.87rem'}}>No active alerts</div>
              : patient.alerts.map(a=>(
                <div className={`al-card al-${a.level}`} key={a.id} style={{marginBottom:8}}>
                  <div className={`al-dot al-dot-${a.level}`}/>
                  <div style={{fontSize:'.83rem',color:'var(--txt)'}}>{a.msg}<div style={{fontSize:'.71rem',color:'var(--tl)',marginTop:2}}>{a.time}</div></div>
                </div>
              ))}
          </div>
          <div className="card">
            <div className="sec-title"><div className="sec-dot" style={{background:'var(--acc)'}}/>Next Appointment</div>
            <div className="appt-card">
              <div className="appt-date">{patient.nextAppt}</div>
              <div className="appt-dr">{patient.doctor}</div>
              <div style={{fontSize:'.75rem',color:'var(--tm)',marginTop:2}}>{patient.dept}</div>
            </div>
            <button className="btn-modal-primary" style={{marginTop:12,width:'100%',padding:'10px',borderRadius:'var(--r)'}} onClick={()=>setMsgOpen(true)}>Request Reschedule</button>
          </div>
        </div>
      </>}

      {tab==='vitals' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--pur)'}}/>Vital Signs History</div>
        {patient.vitals.map((v,i)=>(
          <div key={i} style={{marginBottom:i<patient.vitals.length-1?20:0,paddingBottom:i<patient.vitals.length-1?20:0,borderBottom:i<patient.vitals.length-1?'1px solid var(--cb)':'none'}}>
            <div style={{fontSize:'.74rem',fontFamily:'var(--mono)',color:'var(--tl)',marginBottom:10}}>Recorded: {v.date}</div>
            <div className="vital-grid">
              {[['Blood Pressure',v.bp],['Heart Rate',v.hr+' bpm'],['Temperature',v.temp+'°C'],['Weight',v.weight]].map(([l,val])=>(
                <div className="vital-card" key={l}><div className="vital-val">{val}</div><div className="vital-lbl">{l}</div></div>
              ))}
            </div>
          </div>
        ))}
      </div>}

      {tab==='medications' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--pur)'}}/>Current Medications</div>
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
        <div style={{background:'var(--abg)',border:'1.5px solid var(--abr)',borderRadius:'var(--r)',padding:'11px 15px',marginTop:16,fontSize:'.81rem',color:'var(--amb)',fontWeight:500}}>
          ⚠ Never stop or change your medication without consulting your doctor.
        </div>
      </div>}

      {tab==='labs' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--pur)'}}/>Lab Results</div>
        {patient.labResults.map((l,i)=>(
          <div className="lab-row" key={i}>
            <div className="lab-name">{l.name}</div>
            <div><span className="lab-val">{l.value}</span><span className="lab-ref">Ref: {l.ref}</span></div>
            <Bdg type={l.status==='critical'?'critical':l.status==='high'||l.status==='low'?'high':'normal'} label={l.status.charAt(0).toUpperCase()+l.status.slice(1)}/>
          </div>
        ))}
      </div>}

      {tab==='symptoms' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--red)'}}/>Reported Symptoms</div>
        {patient.symptoms.map((s,i)=>(
          <div className="sym-row" key={i}>
            <span className="sym-date">{s.date}</span>
            <span className="sym-name">{s.symptom}</span>
            <Bdg type={s.severity.toLowerCase()} label={s.severity}/>
            <span className="sym-note" style={{marginLeft:12,flex:1}}>{s.note}</span>
          </div>
        ))}
      </div>}

      {tab==='history' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--acc)'}}/>Medical History</div>
        {patient.history.map((h,i)=>(
          <div className="hist-item" key={i}>
            <span className="hist-date">{h.date}</span>
            <div style={{flex:1}}><div className="hist-txt">{h.event}</div></div>
            <Bdg type={h.type} label={h.type.charAt(0).toUpperCase()+h.type.slice(1)}/>
          </div>
        ))}
      </div>}

      {tab==='protocol' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--amb)'}}/>Assigned Protocol</div>
        <div style={{background:'var(--acc-l)',border:'1.5px solid var(--acc-m)',borderRadius:'var(--r)',padding:'14px 18px',marginBottom:20}}>
          <div style={{fontWeight:700,color:'var(--acc)',fontSize:'.94rem'}}>{patient.protocol.title}</div>
          <div style={{fontSize:'.75rem',color:'var(--tm)',marginTop:3}}>ID: {patient.protocol.id} · Assigned by {patient.doctor}</div>
        </div>
        <div className="proto-steps">
          {patient.protocol.steps.map((s,i)=>(
            <div className="ps" key={i}><div className="ps-num">{i+1}</div><div className="ps-txt">{s}</div></div>
          ))}
        </div>
      </div>}

      {tab==='notes' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--acc)'}}/>Doctor Notes</div>
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

      {tab==='medical-record' && <MedicalRecordTracker patient={patient} doctorMode={false}/>}

      {tab==='tips' && <div className="card">
        <div className="sec-title"><div className="sec-dot" style={{background:'var(--green)'}}/>Health Tips for {patient.dept}</div>
        {tips.map((t,i)=>(
          <div className="tip-card" key={i}>
            <div className="tip-icon">{i+1}</div>
            <div><div className="tip-lbl">Tip #{i+1}</div><div className="tip-txt">{t}</div></div>
          </div>
        ))}
        <div style={{background:'var(--acc-l)',border:'1.5px solid var(--acc-m)',borderRadius:'var(--r)',padding:'11px 15px',marginTop:8,fontSize:'.81rem',color:'var(--acc)',fontWeight:500}}>
          These tips are general recommendations. Always follow your doctor's personalized advice.
        </div>
      </div>}
    </>
  );
}
// MEDICAL recored

function MedicalRecordTracker({patient, doctorMode=false}) {
  const pid = patient.id;
  const [mrTab, setMrTab] = useState('notes');
  const [records, setRecords] = useState(()=>MR_INITIAL[pid]||{notes:[],diagnoses:[],vitals:[]});
  const [noteText, setNoteText] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteAI, setNoteAI] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [dxCode, setDxCode] = useState('');
  const [dxLabel, setDxLabel] = useState('');
  const [dxSeverity, setDxSeverity] = useState('Mild');
  const [dxStatus, setDxStatus] = useState('Active');
  const [dxNote, setDxNote] = useState('');
  const [dxLoading, setDxLoading] = useState(false);
  const [dxAI, setDxAI] = useState('');
  const [showDxForm, setShowDxForm] = useState(false);
  const [vBP,setVBP]=useState('');const [vHR,setVHR]=useState('');const [vTemp,setVTemp]=useState('');
  const [vSPO2,setVSPO2]=useState('');const [vWeight,setVWeight]=useState('');const [vRR,setVRR]=useState('');
  const [vLoading,setVLoading]=useState(false);const [vAI,setVAI]=useState('');const [showVForm,setShowVForm]=useState(false);
  const today = new Date().toISOString().slice(0,10);

  const generateNote = async () => {
    setNoteLoading(true);setNoteAI('');
    const sys='You are a clinical documentation assistant. Generate a concise, professional doctor note (2-3 sentences) for the following patient context. Output only the note text, no preamble.';
    const ctx=`Patient: ${patient.name}, ${patient.age}yo, ${patient.dept}. Medications: ${patient.medications.map(m=>m.name).join(', ')}. Latest vitals: ${JSON.stringify(patient.vitals[0])}. Symptoms: ${patient.symptoms.map(s=>s.symptom).join(', ')}.`;
    const text=await callClaude([{role:'user',content:ctx}],sys);
    setNoteAI(text);setNoteText(text);setNoteLoading(false);
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    const n={id:Date.now(),date:today,author:patient.doctor,content:noteText,tags:noteTags.split(',').map(t=>t.trim()).filter(Boolean)};
    setRecords(r=>({...r,notes:[n,...r.notes]}));
    setNoteText('');setNoteTags('');setNoteAI('');setShowNoteForm(false);
  };

  const suggestDiagnosis = async () => {
    setDxLoading(true);setDxAI('');
    const sys='You are a clinical decision support AI. Based on the patient\'s symptoms and vitals, suggest 1 most likely diagnosis. Reply ONLY as JSON: {"code":"ICD-10 code","label":"Diagnosis name","severity":"Mild|Moderate|Severe","note":"1 sentence clinical note"}';
    const ctx=`Patient: ${patient.name}, ${patient.age}yo, ${patient.dept}. Symptoms: ${patient.symptoms.map(s=>`${s.symptom} (${s.severity}): ${s.note}`).join('; ')}. Latest vitals: BP ${patient.vitals[0]?.bp}, HR ${patient.vitals[0]?.hr}, Temp ${patient.vitals[0]?.temp}.`;
    const raw=await callClaude([{role:'user',content:ctx}],sys);
    try{const j=JSON.parse(raw.replace(/```json|```/g,'').trim());setDxCode(j.code||'');setDxLabel(j.label||'');setDxSeverity(j.severity||'Mild');setDxNote(j.note||'');setDxAI(`AI suggests: ${j.label} (${j.code})`);}
    catch{setDxAI('Could not parse AI suggestion. Please enter manually.');}
    setDxLoading(false);
  };

  const addDiagnosis = () => {
    if (!dxLabel.trim()) return;
    const d={id:Date.now(),date:today,code:dxCode,label:dxLabel,severity:dxSeverity,status:dxStatus,note:dxNote};
    setRecords(r=>({...r,diagnoses:[d,...r.diagnoses]}));
    setDxCode('');setDxLabel('');setDxNote('');setDxAI('');setShowDxForm(false);
  };

  const interpretVitals = async () => {
    if (!vBP&&!vHR){setVAI('Enter at least BP and HR for AI interpretation.');return;}
    setVLoading(true);setVAI('');
    const sys='You are a clinical vital-signs interpreter. Given the vital signs, provide a brief (1-2 sentence) clinical interpretation noting any abnormalities or areas of concern. Output only the interpretation text.';
    const ctx=`Patient: ${patient.name}, ${patient.age}yo, Dept: ${patient.dept}. Vitals — BP: ${vBP||'N/A'}, HR: ${vHR||'N/A'} bpm, Temp: ${vTemp||'N/A'}°C, SpO2: ${vSPO2||'N/A'}%, Weight: ${vWeight||'N/A'} kg, RR: ${vRR||'N/A'} /min.`;
    const text=await callClaude([{role:'user',content:ctx}],sys);
    setVAI(text);setVLoading(false);
  };

  const addVitals = () => {
    if (!vBP&&!vHR) return;
    const v={id:Date.now(),date:today,bp:vBP,hr:Number(vHR),temp:vTemp,spo2:vSPO2,weight:vWeight,rr:Number(vRR)};
    setRecords(r=>({...r,vitals:[v,...r.vitals]}));
    setVBP('');setVHR('');setVTemp('');setVSPO2('');setVWeight('');setVRR('');setVAI('');setShowVForm(false);
  };

  const mrTabs = [{id:'notes',label:'Doctor Notes',icon:'📝'},{id:'diagnosis',label:'Diagnosis',icon:'🩺'},{id:'vitals',label:'Vital Signs',icon:'💓'}];

  return (
    <div className="mrt-wrap">
      <div className="mrt-hdr">
        <div>
          <div className="mrt-pill">Medical Record Tracker</div>
          <div className="mrt-hdr-name">{patient.name}</div>
          <div className="mrt-hdr-id">{patient.id} · {patient.dept}</div>
        </div>
        <div className="mrt-ai-badge">✦ AI-Powered</div>
      </div>

      <div className="mrt-tabs">
        {mrTabs.map(t=>(
          <button key={t.id} className={`mrt-tab ${mrTab===t.id?'active':''}`} onClick={()=>setMrTab(t.id)}>
            <span>{t.icon}</span> {t.label}
            <span className="mrt-tab-count">{t.id==='notes'?records.notes.length:t.id==='diagnosis'?records.diagnoses.length:records.vitals.length}</span>
          </button>
        ))}
      </div>

      {mrTab==='notes' && (
        <div className="mrt-panel">
          <div className="mrt-action-row">
            <div>
              <div style={{fontWeight:700,color:'var(--txt)',fontSize:'.94rem'}}>Clinical Notes</div>
              <div style={{fontSize:'.77rem',color:'var(--tl)',marginTop:2}}>AI-assisted documentation for patient visits</div>
            </div>
            {doctorMode && <button className="mrt-add-btn" onClick={()=>setShowNoteForm(f=>!f)}>{showNoteForm?'✕ Cancel':'+ New Note'}</button>}
          </div>
          {showNoteForm&&doctorMode&&(
            <div className="mrt-form">
              <div className="mrt-form-title">New Clinical Note</div>
              <div className="mrt-ai-row">
                <button className="mrt-ai-btn" onClick={generateNote} disabled={noteLoading}>{noteLoading?'...':'✦ Generate with AI'}</button>
                <span style={{fontSize:'.74rem',color:'var(--tl)'}}>AI will draft a note based on patient data</span>
              </div>
              {noteLoading&&<AISpinner/>}
              {noteAI&&!noteLoading&&<div className="mrt-ai-result"><div className="mrt-ai-result-lbl">AI Draft — review before saving</div><div style={{fontSize:'.83rem',color:'var(--txt)',lineHeight:1.65}}>{noteAI}</div></div>}
              <div className="mf" style={{marginTop:12}}><label>Note Content</label><textarea value={noteText} onChange={e=>setNoteText(e.target.value)} rows={4} placeholder="Clinical observations, treatment decisions, follow-up plans…"/></div>
              <div className="mf"><label>Tags (comma-separated)</label><input value={noteTags} onChange={e=>setNoteTags(e.target.value)} placeholder="e.g. follow-up, cardiology, urgent"/></div>
              <div className="modal-actions"><button className="btn-secondary" onClick={()=>setShowNoteForm(false)}>Cancel</button><button className="btn-modal-primary" onClick={addNote}>Save Note</button></div>
            </div>
          )}
          <div className="mrt-list">
            {records.notes.length===0&&<div className="mrt-empty">No clinical notes recorded yet.</div>}
            {records.notes.map(n=>(
              <div key={n.id} className="mrt-note-card">
                <div className="mrt-note-top"><div className="mrt-note-author">{n.author}</div><div className="mrt-note-date">{n.date}</div></div>
                <div className="mrt-note-body">{n.content}</div>
                {n.tags?.length>0&&<div className="mrt-note-tags">{n.tags.map(t=><span key={t} className="mrt-tag">{t}</span>)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {mrTab==='diagnosis' && (
        <div className="mrt-panel">
          <div className="mrt-action-row">
            <div>
              <div style={{fontWeight:700,color:'var(--txt)',fontSize:'.94rem'}}>Diagnostic Records</div>
              <div style={{fontSize:'.77rem',color:'var(--tl)',marginTop:2}}>ICD-10 coded diagnoses with AI clinical decision support</div>
            </div>
            {doctorMode&&<button className="mrt-add-btn" onClick={()=>setShowDxForm(f=>!f)}>{showDxForm?'✕ Cancel':'+ Add Diagnosis'}</button>}
          </div>
          {showDxForm&&doctorMode&&(
            <div className="mrt-form">
              <div className="mrt-form-title">New Diagnosis Entry</div>
              <div className="mrt-ai-row">
                <button className="mrt-ai-btn" onClick={suggestDiagnosis} disabled={dxLoading}>{dxLoading?'...':'✦ AI Suggest Diagnosis'}</button>
                <span style={{fontSize:'.74rem',color:'var(--tl)'}}>AI analyzes symptoms and vitals to suggest a diagnosis</span>
              </div>
              {dxLoading&&<AISpinner/>}
              {dxAI&&!dxLoading&&<div className="mrt-ai-result"><div className="mrt-ai-result-lbl">AI Suggestion</div><div style={{fontSize:'.83rem',color:'var(--txt)'}}>{dxAI}</div></div>}
              <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:12,marginTop:12}}>
                <div className="mf"><label>ICD-10 Code</label><input value={dxCode} onChange={e=>setDxCode(e.target.value)} placeholder="e.g. I10"/></div>
                <div className="mf"><label>Diagnosis Name</label><input value={dxLabel} onChange={e=>setDxLabel(e.target.value)} placeholder="e.g. Essential Hypertension"/></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="mf"><label>Severity</label><select value={dxSeverity} onChange={e=>setDxSeverity(e.target.value)}>{['Mild','Moderate','Severe','Critical'].map(s=><option key={s}>{s}</option>)}</select></div>
                <div className="mf"><label>Status</label><select value={dxStatus} onChange={e=>setDxStatus(e.target.value)}>{['Active','Resolved','Monitoring'].map(s=><option key={s}>{s}</option>)}</select></div>
              </div>
              <div className="mf"><label>Clinical Note</label><textarea value={dxNote} onChange={e=>setDxNote(e.target.value)} rows={3} placeholder="Brief clinical context or treatment note…"/></div>
              <div className="modal-actions"><button className="btn-secondary" onClick={()=>setShowDxForm(false)}>Cancel</button><button className="btn-modal-primary" onClick={addDiagnosis}>Save Diagnosis</button></div>
            </div>
          )}
          <div className="mrt-list">
            {records.diagnoses.length===0&&<div className="mrt-empty">No diagnoses recorded yet.</div>}
            {records.diagnoses.map(d=>(
              <div key={d.id} className="mrt-dx-card">
                <div className="mrt-dx-top">
                  <div style={{display:'flex',alignItems:'center',gap:10}}><div className="mrt-dx-code">{d.code}</div><div className="mrt-dx-label">{d.label}</div></div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <span className="mrt-sev-pill" style={{background:STATUS_COLORS[d.status]?.bg,color:STATUS_COLORS[d.status]?.color,border:`1px solid ${STATUS_COLORS[d.status]?.border}`}}>{d.status}</span>
                    <span style={{fontSize:'.73rem',color:SEVERITY_COLORS[d.severity]||'var(--tl)',fontWeight:700}}>{d.severity}</span>
                  </div>
                </div>
                <div className="mrt-dx-note">{d.note}</div>
                <div className="mrt-dx-date">{d.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mrTab==='vitals' && (
        <div className="mrt-panel">
          <div className="mrt-action-row">
            <div>
              <div style={{fontWeight:700,color:'var(--txt)',fontSize:'.94rem'}}>Vital Signs Log</div>
              <div style={{fontSize:'.77rem',color:'var(--tl)',marginTop:2}}>Record and AI-interpret patient vital signs over time</div>
            </div>
            {doctorMode&&<button className="mrt-add-btn" onClick={()=>setShowVForm(f=>!f)}>{showVForm?'✕ Cancel':'+ Record Vitals'}</button>}
          </div>
          {showVForm&&doctorMode&&(
            <div className="mrt-form">
              <div className="mrt-form-title">New Vital Signs Entry</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
                {[['Blood Pressure',vBP,setVBP,'120/80'],['Heart Rate (bpm)',vHR,setVHR,'72'],['Temperature (°C)',vTemp,setVTemp,'36.8'],['SpO₂ (%)',vSPO2,setVSPO2,'98'],['Weight (kg)',vWeight,setVWeight,'70'],['Resp. Rate (/min)',vRR,setVRR,'16']].map(([lbl,val,setter,ph])=>(
                  <div className="mf" key={lbl}><label>{lbl}</label><input value={val} onChange={e=>setter(e.target.value)} placeholder={ph}/></div>
                ))}
              </div>
              <div className="mrt-ai-row" style={{marginTop:4}}>
                <button className="mrt-ai-btn" onClick={interpretVitals} disabled={vLoading}>{vLoading?'...':'✦ AI Interpret'}</button>
                <span style={{fontSize:'.74rem',color:'var(--tl)'}}>AI will flag abnormalities and clinical concerns</span>
              </div>
              {vLoading&&<AISpinner/>}
              {vAI&&!vLoading&&<div className="mrt-ai-result"><div className="mrt-ai-result-lbl">AI Clinical Interpretation</div><div style={{fontSize:'.83rem',color:'var(--txt)',lineHeight:1.65}}>{vAI}</div></div>}
              <div className="modal-actions" style={{marginTop:8}}><button className="btn-secondary" onClick={()=>setShowVForm(false)}>Cancel</button><button className="btn-modal-primary" onClick={addVitals}>Save Vitals</button></div>
            </div>
          )}
          <div className="mrt-list">
            {records.vitals.length===0&&<div className="mrt-empty">No vital signs recorded yet.</div>}
            {records.vitals.map((v,i)=>(
              <div key={v.id||i} className="mrt-vitals-card">
                <div className="mrt-vitals-date">{v.date}</div>
                <div className="mrt-vitals-grid">
                  {[['BP',v.bp,'mmHg',v.bp&&parseInt(v.bp)>140?'high':'ok'],['HR',v.hr,'bpm',v.hr&&v.hr>100?'high':v.hr<60?'low':'ok'],['Temp',v.temp,'°C',v.temp&&parseFloat(v.temp)>37.5?'high':'ok'],['SpO₂',v.spo2,'%',v.spo2&&parseInt(v.spo2)<95?'low':'ok'],['Weight',v.weight,'kg','ok'],['RR',v.rr,'/min',v.rr&&v.rr>20?'high':'ok']].map(([lbl,val,unit,flag])=>val?(
                    <div key={lbl} className={`mrt-vcard mrt-vcard-${flag}`}>
                      <div className="mrt-vval">{val}<span className="mrt-vunit">{unit}</span></div>
                      <div className="mrt-vlbl">{lbl}</div>
                      {flag!=='ok'&&<div className="mrt-vflag">{flag==='high'?'▲':'▼'}</div>}
                    </div>
                  ):null)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// APP ROOT

export default function App() {
  // 'auth' = login, 'signup' = signup page, 'dashboard' = inside app
  const [view, setView] = useState('auth');
  const [role, setRole] = useState(null);
  const [dark, setDark] = useState(false);

  const toggleDark = () => setDark(d=>!d);

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', dark?'dark':'light');
  }, [dark]);

  const handleLogin = r => {
    setRole(r);
    setView('dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    setView('auth');
  };

  return (
    <>
      <style>{css}</style>
      {view==='auth' && (
        <LoginPage
          onLogin={handleLogin}
          onGoSignup={()=>setView('signup')}
          dark={dark}
          toggleDark={toggleDark}
        />
      )}
      {view==='signup' && (
        <SignupPage
          onGoLogin={()=>setView('auth')}
          dark={dark}
          toggleDark={toggleDark}
        />
      )}
      {view==='dashboard' && (
        <Dashboard
          role={role}
          onLogout={handleLogout}
          dark={dark}
          toggleDark={toggleDark}
        />
      )}
    </>
  );
}
