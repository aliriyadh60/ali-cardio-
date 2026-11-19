const diseases = [
{
id:"cad",category:"Ischemic Heart Diseases",en:"Coronary Artery Disease (CAD)",ar:"مرض الشريان التاجي",
definition:"Narrowing of coronary arteries that reduces blood supply to the myocardium.",
definitionAr:"تضيّق الشرايين التاجية مما يقلل وصول الدم والأوكسجين إلى عضلة القلب.",
path:"Usually caused by atherosclerotic plaque formation.",
pathAr:"غالباً ينتج عن تراكم اللويحات الدهنية داخل الشرايين التاجية.",
risk:"Smoking, hypertension, diabetes, dyslipidemia, family history.",
riskAr:"التدخين وارتفاع الضغط والسكري واضطراب الدهون والتاريخ العائلي.",
symptoms:"May cause chest pressure, exertional discomfort, dyspnea, or may be silent.",
symptomsAr:"قد يسبب ضغطاً أو ألماً صدرياً مع الجهد وضيق التنفس، وقد يكون بلا أعراض.",
ecg:"May be normal or show ST-T changes; findings depend on ischemia and its location.",
ecgAr:"قد يكون طبيعياً أو تظهر تغيرات ST-T حسب موقع ونوع نقص التروية.",
tests:"ECG, cardiac biomarkers when acute coronary syndrome is suspected, echocardiography, coronary imaging.",
testsAr:"تخطيط القلب، مؤشرات أذية عضلة القلب عند الاشتباه بحالة حادة، الإيكو وتصوير الشرايين.",
treatment:"Risk-factor management, prescribed antianginal therapy, lipid-lowering therapy, and revascularization when indicated.",
treatmentAr:"السيطرة على عوامل الخطورة والأدوية الموصوفة وقد يلزم فتح الشرايين حسب الحالة.",
nursing:"Assess symptoms and vital signs, follow chest-pain protocols, monitor ordered tests and prescribed therapy.",
nursingAr:"تقييم الألم والعلامات الحيوية واتباع بروتوكول ألم الصدر ومراقبة الفحوصات والعلاج.",
nclex:"New or worsening chest discomfort requires prompt assessment and escalation."
},
{
id:"mi",category:"Ischemic Heart Diseases",en:"Myocardial Infarction (MI)",ar:"احتشاء عضلة القلب",
definition:"Myocardial injury caused by prolonged inadequate blood flow.",
definitionAr:"تضرر عضلة القلب نتيجة نقص التروية الدموية لفترة كافية.",
path:"Often related to acute coronary plaque disruption and thrombosis.",
pathAr:"غالباً يرتبط بتمزق لويحة تاجية وتكوّن خثرة.",
risk:"Similar to coronary artery disease.",
riskAr:"عوامل الخطورة مشابهة لمرض الشريان التاجي.",
symptoms:"Chest discomfort, sweating, nausea, dyspnea; presentations can vary.",
symptomsAr:"انزعاج أو ألم صدري وتعرق وغثيان وضيق تنفس، وقد تختلف الأعراض.",
ecg:"May show ST elevation, ST depression, T-wave inversion, or pathological Q waves depending on the event.",
ecgAr:"قد تظهر تغيرات ارتفاع أو انخفاض ST أو انقلاب T أو موجات Q مرضية حسب الحالة.",
tests:"Serial ECGs and cardiac troponin; additional imaging as indicated.",
testsAr:"تخطيطات متتابعة وقياس Troponin وتصوير إضافي حسب الحاجة.",
treatment:"Urgent clinician-led assessment; reperfusion and medications according to the clinical pathway.",
treatmentAr:"تقييم عاجل وعلاج لإعادة التروية وأدوية وفق البروتوكول الطبي.",
nursing:"Rapid assessment, continuous monitoring when ordered, reassessment, and timely escalation.",
nursingAr:"التقييم السريع والمراقبة وإعادة التقييم والتصعيد دون تأخير.",
nclex:"Time-sensitive emergency: recognize symptoms and activate the appropriate emergency pathway."
},
{
id:"angina",category:"Ischemic Heart Diseases",en:"Angina Pectoris",ar:"الذبحة الصدرية",
definition:"Chest discomfort caused by temporary myocardial ischemia without established infarction.",
definitionAr:"ألم أو انزعاج صدري بسبب نقص مؤقت في تروية عضلة القلب دون حدوث احتشاء بالضرورة.",
path:"Myocardial oxygen demand temporarily exceeds oxygen supply.",
pathAr:"احتياج عضلة القلب للأوكسجين يتجاوز الإمداد لفترة مؤقتة.",
risk:"Coronary artery disease and cardiovascular risk factors.",
riskAr:"مرض الشرايين التاجية وعوامل الخطورة القلبية.",
symptoms:"Pressure or tightness, often associated with exertion in stable angina.",
symptomsAr:"ضغط أو ضيق بالصدر، وقد يرتبط بالجهد في الذبحة المستقرة.",
ecg:"Can be normal between episodes; transient ST depression or T-wave changes may occur.",
ecgAr:"قد يكون طبيعياً بين النوبات وقد تظهر تغيرات مؤقتة في ST أو T.",
tests:"Clinical assessment, ECG, biomarkers when acute syndrome is suspected, and coronary evaluation.",
testsAr:"التقييم السريري والتخطيط ومؤشرات القلب عند الاشتباه بحالة حادة وتقييم الشرايين.",
treatment:"Individualized antianginal and preventive therapy; urgent evaluation for new or worsening symptoms.",
treatmentAr:"علاج مضاد للذبحة ووقائي حسب الخطة، مع تقييم عاجل عند ظهور أعراض جديدة أو متفاقمة.",
nursing:"Assess onset, duration, triggers, associated symptoms, and response to prescribed treatment.",
nursingAr:"تقييم بداية الألم ومدته ومحفزاته والأعراض المصاحبة والاستجابة للعلاج.",
nclex:"New, prolonged, or rest pain should not be assumed to be stable angina."
},
{
id:"hf",category:"Heart Failure",en:"Heart Failure",ar:"فشل القلب",
definition:"A clinical syndrome in which the heart cannot meet the body's needs without elevated filling pressures.",
definitionAr:"متلازمة لا يستطيع فيها القلب تلبية احتياجات الجسم بصورة كافية دون ارتفاع ضغوط الامتلاء.",
path:"Impaired pumping or filling leads to congestion and/or reduced perfusion.",
pathAr:"ضعف الضخ أو الامتلاء يؤدي إلى الاحتقان أو انخفاض التروية.",
risk:"Hypertension, coronary disease, diabetes, valve disease, cardiomyopathy.",
riskAr:"ارتفاع الضغط ومرض الشرايين والسكري وأمراض الصمامات واعتلال العضلة.",
symptoms:"Dyspnea, fatigue, edema, orthopnea, and exercise intolerance.",
symptomsAr:"ضيق التنفس والتعب والوذمة وصعوبة التنفس عند الاستلقاء وضعف تحمل الجهد.",
ecg:"May show atrial fibrillation, ischemic changes, or ventricular hypertrophy; no single diagnostic ECG pattern.",
ecgAr:"قد يظهر رجفان أذيني أو تغيرات نقص تروية أو تضخم بطيني، ولا يوجد نمط تخطيط واحد يشخّص الفشل.",
tests:"Echocardiogram, natriuretic peptides, ECG, chest imaging, and laboratory tests.",
testsAr:"إيكو القلب ومؤشرات BNP أو NT-proBNP والتخطيط وتصوير الصدر والفحوصات المختبرية.",
treatment:"Guideline-directed medications, management of fluid status, devices or procedures in selected patients.",
treatmentAr:"أدوية وفق الإرشادات وتنظيم السوائل وقد تستخدم أجهزة أو إجراءات لحالات مختارة.",
nursing:"Monitor respiratory status, edema, weight trends, intake/output, and response to prescribed treatment.",
nursingAr:"مراقبة التنفس والوذمة والوزن والسوائل والاستجابة للعلاج.",
nclex:"Recognize worsening congestion and respiratory distress; assess trends rather than one value."
},
{
id:"af",category:"Cardiac Arrhythmias",en:"Atrial Fibrillation (AF)",ar:"الرجفان الأذيني",
definition:"A supraventricular rhythm with disorganized atrial electrical activity.",
definitionAr:"اضطراب نظم فوق بطيني يتميز بنشاط كهربائي أذيني غير منتظم.",
path:"Chaotic atrial activation causes ineffective atrial contraction and irregular ventricular response.",
pathAr:"النشاط الأذيني الفوضوي يسبب ضعف انقباض الأذين واستجابة بطينية غير منتظمة.",
risk:"Age, hypertension, valve disease, heart failure, and other conditions.",
riskAr:"العمر وارتفاع الضغط وأمراض الصمامات وفشل القلب وحالات أخرى.",
symptoms:"Palpitations, fatigue, dyspnea, dizziness, or no symptoms.",
symptomsAr:"خفقان وتعب وضيق تنفس ودوخة، وقد لا توجد أعراض.",
ecg:"Irregularly irregular rhythm with no consistent discrete P waves.",
ecgAr:"نظم غير منتظم تماماً مع غياب موجات P الواضحة المنتظمة.",
tests:"12-lead ECG, rhythm monitoring, echocardiography, and evaluation for underlying causes.",
testsAr:"تخطيط 12 اشتقاقاً ومراقبة النظم والإيكو وتقييم الأسباب.",
treatment:"Rate or rhythm management and stroke-risk-based anticoagulation decisions by the treating team.",
treatmentAr:"السيطرة على السرعة أو النظم وتقييم الحاجة لمضادات التخثر حسب خطر الجلطات.",
nursing:"Monitor rate, symptoms, hemodynamic status, and prescribed anticoagulant safety.",
nursingAr:"مراقبة النبض والأعراض والاستقرار ومأمونية مضادات التخثر الموصوفة.",
nclex:"AF is associated with increased thromboembolic stroke risk."
},
{
id:"svt",category:"Cardiac Arrhythmias",en:"Supraventricular Tachycardia (SVT)",ar:"تسرّع القلب فوق البطيني",
definition:"A group of rapid rhythms originating above the ventricles.",
definitionAr:"مجموعة اضطرابات نظم سريعة ينشأ مصدرها فوق البطينين.",
path:"Usually involves abnormal electrical pathways or re-entry circuits.",
pathAr:"غالباً ينتج عن مسارات كهربائية غير طبيعية أو دوائر إعادة الدخول.",
risk:"May occur with or without structural heart disease.",
riskAr:"قد يحدث بوجود مرض بنيوي بالقلب أو بدونه.",
symptoms:"Sudden palpitations, dizziness, chest discomfort, or dyspnea.",
symptomsAr:"خفقان مفاجئ ودوخة وانزعاج صدري أو ضيق تنفس.",
ecg:"Typically a regular narrow-complex tachycardia; pattern varies by SVT type.",
ecgAr:"غالباً تسرّع منتظم بمركبات QRS ضيقة، ويختلف النمط حسب النوع.",
tests:"12-lead ECG during symptoms and rhythm monitoring.",
testsAr:"تخطيط 12 اشتقاقاً أثناء الأعراض ومراقبة النظم.",
treatment:"Depends on rhythm and stability; clinician-directed maneuvers or medications may be used.",
treatmentAr:"يعتمد على نوع النظم واستقرار الحالة، ويحدد الفريق الطبي التدخل المناسب.",
nursing:"Assess stability, symptoms, vital signs, and obtain rhythm documentation.",
nursingAr:"تقييم الاستقرار والأعراض والعلامات الحيوية وتوثيق النظم.",
nclex:"Always assess hemodynamic stability before considering rhythm-specific interventions."
},
{
id:"vt",category:"Cardiac Arrhythmias",en:"Ventricular Tachycardia (VT)",ar:"تسرّع القلب البطيني",
definition:"A rapid rhythm originating in the ventricles.",
definitionAr:"اضطراب نظم سريع ينشأ من البطينين.",
path:"Abnormal ventricular electrical activity can reduce cardiac output.",
pathAr:"النشاط الكهربائي البطيني غير الطبيعي قد يقلل النتاج القلبي.",
risk:"Prior myocardial infarction, cardiomyopathy, and electrolyte abnormalities.",
riskAr:"احتشاء سابق واعتلال عضلة القلب واضطراب الشوارد.",
symptoms:"Palpitations, dizziness, syncope, hypotension, or cardiac arrest.",
symptomsAr:"خفقان ودوخة وإغماء وانخفاض ضغط، وقد تتدهور الحالة.",
ecg:"Typically a wide-complex tachycardia; clinical context matters.",
ecgAr:"غالباً تسرّع بمركبات QRS عريضة، ويجب تفسيره ضمن السياق السريري.",
tests:"ECG, continuous monitoring, electrolytes, and cardiac evaluation.",
testsAr:"التخطيط والمراقبة المستمرة وفحص الشوارد وتقييم القلب.",
treatment:"Urgent protocol-based management according to pulse and hemodynamic stability.",
treatmentAr:"تدبير عاجل وفق البروتوكول اعتماداً على وجود النبض واستقرار الدورة الدموية.",
nursing:"Escalate immediately, assess responsiveness and circulation, and follow emergency protocols.",
nursingAr:"التصعيد الفوري وتقييم الاستجابة والدورة الدموية واتباع بروتوكولات الطوارئ.",
nclex:"Wide-complex tachycardia with instability is an emergency."
},
{
id:"brady",category:"Cardiac Arrhythmias",en:"Bradycardia",ar:"بطء القلب",
definition:"A heart rate slower than expected for the clinical context.",
definitionAr:"انخفاض معدل ضربات القلب عن المتوقع حسب حالة الشخص.",
path:"May result from sinus-node dysfunction, conduction disease, medications, or other causes.",
pathAr:"قد ينتج عن خلل العقدة الجيبية أو التوصيل أو الأدوية أو أسباب أخرى.",
risk:"Conduction disorders, certain medications, ischemia, and metabolic disturbances.",
riskAr:"اضطرابات التوصيل وبعض الأدوية ونقص التروية واضطرابات الاستقلاب.",
symptoms:"May be asymptomatic or cause fatigue, dizziness, syncope, or hypotension.",
symptomsAr:"قد لا يسبب أعراضاً أو يؤدي إلى تعب ودوخة وإغماء وانخفاض ضغط.",
ecg:"Rate below 60 bpm is commonly termed bradycardia; rhythm and cause must be assessed.",
ecgAr:"يُستخدم غالباً معدل أقل من 60 ضربة بالدقيقة لوصف البطء، مع ضرورة تقييم النظم والسبب.",
tests:"ECG, medication review, electrolytes, and thyroid testing when indicated.",
testsAr:"التخطيط ومراجعة الأدوية والشوارد وفحص الغدة الدرقية عند الحاجة.",
treatment:"Depends on symptoms, cause, and stability; some cases need no intervention.",
treatmentAr:"يعتمد على الأعراض والسبب والاستقرار، وبعض الحالات لا تحتاج تدخلاً.",
nursing:"Assess perfusion, blood pressure, symptoms, and medication history.",
nursingAr:"تقييم التروية والضغط والأعراض وتاريخ الأدوية.",
nclex:"Treat the patient and clinical stability, not the heart-rate number alone."
},
{
id:"cardiomyopathy",category:"Cardiomyopathies",en:"Dilated Cardiomyopathy",ar:"اعتلال عضلة القلب التوسعي",
definition:"Enlargement of one or more chambers with impaired systolic function.",
definitionAr:"توسع حجرة أو أكثر من القلب مع ضعف الوظيفة الانقباضية.",
path:"Ventricular dilation reduces effective contraction and may lead to heart failure.",
pathAr:"توسع البطين يقلل كفاءة الانقباض وقد يؤدي إلى فشل القلب.",
risk:"Genetic factors, myocarditis, toxins, and some systemic diseases.",
riskAr:"عوامل وراثية والتهاب عضلة القلب والسموم وبعض الأمراض العامة.",
symptoms:"Dyspnea, fatigue, edema, and palpitations.",
symptomsAr:"ضيق التنفس والتعب والوذمة والخفقان.",
ecg:"May show conduction abnormalities, arrhythmias, or nonspecific changes.",
ecgAr:"قد تظهر اضطرابات توصيل أو نظم أو تغيرات غير نوعية.",
tests:"Echocardiography, ECG, cardiac MRI, and cause-directed testing.",
testsAr:"الإيكو والتخطيط والرنين المغناطيسي وفحوصات لتحديد السبب.",
treatment:"Cause-directed care and heart-failure therapy; selected cases need devices.",
treatmentAr:"علاج السبب وعلاج فشل القلب وقد تحتاج حالات مختارة إلى أجهزة.",
nursing:"Monitor symptoms, fluid status, activity tolerance, and medication effects.",
nursingAr:"مراقبة الأعراض والسوائل وتحمل النشاط وتأثير الأدوية.",
nclex:"Connect reduced contractility with reduced systolic pumping function."
},
{
id:"hcm",category:"Cardiomyopathies",en:"Hypertrophic Cardiomyopathy (HCM)",ar:"اعتلال عضلة القلب الضخامي",
definition:"Abnormal thickening of the myocardium, often with a genetic basis.",
definitionAr:"زيادة غير طبيعية في سماكة عضلة القلب، وغالباً يكون لها أساس وراثي.",
path:"Thickened myocardium may impair filling and sometimes obstruct outflow.",
pathAr:"قد تعيق السماكة امتلاء القلب وأحياناً تعيق خروج الدم.",
risk:"Often inherited genetic variants.",
riskAr:"غالباً يرتبط بتغيرات جينية موروثة.",
symptoms:"May be asymptomatic or cause dyspnea, chest pain, palpitations, or syncope.",
symptomsAr:"قد يكون بلا أعراض أو يسبب ضيق تنفس وألماً صدرياً وخفقاناً أو إغماء.",
ecg:"May show voltage criteria for hypertrophy, repolarization changes, or Q waves.",
ecgAr:"قد تظهر علامات تضخم البطين وتغيرات إعادة الاستقطاب أو موجات Q.",
tests:"Echocardiography, ECG, cardiac MRI, and family assessment.",
testsAr:"الإيكو والتخطيط والرنين المغناطيسي وتقييم التاريخ العائلي.",
treatment:"Specialist-directed medications, risk assessment, and selected device or procedural therapy.",
treatmentAr:"علاج اختصاصي وتقييم الخطورة وقد تلزم أجهزة أو إجراءات لحالات مختارة.",
nursing:"Assess exertional symptoms, syncope history, and family history.",
nursingAr:"تقييم الأعراض مع الجهد وتاريخ الإغماء والتاريخ العائلي.",
nclex:"Unexplained exertional syncope in a young person warrants medical evaluation."
},
{
id:"as",category:"Valvular Heart Diseases",en:"Aortic Stenosis",ar:"تضيّق الصمام الأبهري",
definition:"Narrowing of the aortic valve opening.",
definitionAr:"تضيّق فتحة الصمام الأبهري مما يعيق خروج الدم من البطين الأيسر.",
path:"Obstruction increases left ventricular pressure and workload.",
pathAr:"الانسداد يرفع الضغط والحمل على البطين الأيسر.",
risk:"Age-related calcification, congenital bicuspid valve, and prior rheumatic disease.",
riskAr:"التكلس مع التقدم بالعمر والصمام ثنائي الشرفات والحمى الروماتيزمية السابقة.",
symptoms:"Exertional dyspnea, chest pain, and syncope in significant disease.",
symptomsAr:"ضيق التنفس مع الجهد وألم الصدر والإغماء في الحالات المهمة.",
ecg:"May show left ventricular hypertrophy; ECG does not grade valve severity.",
ecgAr:"قد تظهر علامات تضخم البطين الأيسر، لكن التخطيط لا يحدد شدة التضيق.",
tests:"Echocardiography is central; ECG and other tests support assessment.",
testsAr:"الإيكو أساسي، ويساعد التخطيط والفحوصات الأخرى في التقييم.",
treatment:"Monitoring or valve intervention depending on severity and symptoms.",
treatmentAr:"المراقبة أو التدخل على الصمام حسب الشدة والأعراض.",
nursing:"Monitor exertional symptoms, perfusion, and signs of heart failure.",
nursingAr:"مراقبة أعراض الجهد والتروية وعلامات فشل القلب.",
nclex:"A new murmur with exertional syncope or chest pain needs prompt evaluation."
},
{
id:"mr",category:"Valvular Heart Diseases",en:"Mitral Regurgitation",ar:"ارتجاع الصمام المترالي",
definition:"Backflow of blood from the left ventricle into the left atrium during systole.",
definitionAr:"رجوع الدم من البطين الأيسر إلى الأذين الأيسر أثناء الانقباض.",
path:"An incompetent mitral valve causes volume overload in the left atrium and ventricle.",
pathAr:"عدم إحكام الصمام يسبب زيادة الحمل الحجمي على الأذين والبطين الأيسر.",
risk:"Mitral valve prolapse, ischemic injury, endocarditis, and degenerative disease.",
riskAr:"تدلي الصمام والأذية الإقفارية والتهاب الشغاف والأمراض التنكسية.",
symptoms:"May be silent or cause fatigue, dyspnea, and palpitations.",
symptomsAr:"قد يكون بلا أعراض أو يسبب التعب وضيق التنفس والخفقان.",
ecg:"May show atrial enlargement or atrial fibrillation; findings are not specific.",
ecgAr:"قد يظهر تضخم الأذين أو الرجفان الأذيني، والعلامات ليست نوعية.",
tests:"Echocardiography assesses valve structure and regurgitation severity.",
testsAr:"الإيكو يقيّم بنية الصمام ودرجة الارتجاع.",
treatment:"Surveillance, medical management of associated conditions, or valve repair/replacement when indicated.",
treatmentAr:"المراقبة وعلاج الحالات المصاحبة أو إصلاح الصمام أو استبداله عند الحاجة.",
nursing:"Monitor breathlessness, edema, activity tolerance, and follow-up testing.",
nursingAr:"مراقبة ضيق التنفس والوذمة وتحمل النشاط والفحوصات الدورية.",
nclex:"Understand that regurgitation means backward flow through a valve."
},
{
id:"endo",category:"Cardiac Infections",en:"Infective Endocarditis",ar:"التهاب شغاف القلب الإنتاني",
definition:"Infection of the endocardial surface, commonly involving heart valves.",
definitionAr:"عدوى تصيب بطانة القلب وقد تشمل صماماته.",
path:"Microorganisms enter the bloodstream and may form infected vegetations.",
pathAr:"تصل الكائنات الدقيقة إلى الدم وقد تتكون زوائد إنتانية على الصمامات.",
risk:"Prosthetic valves, previous endocarditis, selected congenital conditions, and bloodstream infection risks.",
riskAr:"الصمامات الصناعية والتهاب الشغاف السابق وبعض العيوب الخلقية ومخاطر عدوى الدم.",
symptoms:"Fever, fatigue, new or changing murmur, and systemic features.",
symptomsAr:"حمى وتعب ونفخة قلبية جديدة أو متغيرة وأعراض عامة.",
ecg:"No single diagnostic ECG pattern; conduction changes may occur with complications.",
ecgAr:"لا يوجد نمط تخطيط تشخيصي محدد، وقد تحدث تغيرات توصيل عند وجود مضاعفات.",
tests:"Blood cultures and echocardiography are key investigations.",
testsAr:"زراعة الدم والإيكو من الفحوصات الأساسية.",
treatment:"Prolonged targeted antimicrobial therapy; surgery in selected complications.",
treatmentAr:"مضادات ميكروبية موجهة لفترة طويلة وقد تلزم الجراحة لبعض المضاعفات.",
nursing:"Monitor temperature, cultures, prescribed therapy, and signs of embolic or cardiac complications.",
nursingAr:"مراقبة الحرارة والزراعات والعلاج وعلامات المضاعفات القلبية أو الانصمامية.",
nclex:"Obtain ordered blood cultures before antibiotics when clinically appropriate and without delaying emergency care."
},
{
id:"pericarditis",category:"Pericardial Diseases",en:"Acute Pericarditis",ar:"التهاب التامور الحاد",
definition:"Inflammation of the pericardial sac surrounding the heart.",
definitionAr:"التهاب الكيس المحيط بالقلب.",
path:"Inflammation can cause characteristic chest pain and pericardial friction.",
pathAr:"قد يسبب الالتهاب ألماً صدرياً واحتكاكاً بين طبقات التامور.",
risk:"Viral illness, autoimmune disease, kidney disease, and post-cardiac injury.",
riskAr:"عدوى فيروسية وأمراض مناعية وأمراض الكلى وما بعد أذية القلب.",
symptoms:"Sharp chest pain that may change with position or breathing.",
symptomsAr:"ألم صدري حاد قد يتغير مع الوضعية أو التنفس.",
ecg:"Classically widespread ST elevation and PR depression can occur; patterns vary.",
ecgAr:"قد يظهر ارتفاع منتشر في ST وانخفاض PR، مع اختلاف النمط بين الحالات.",
tests:"ECG, inflammatory markers, echocardiography, and evaluation of cause.",
testsAr:"التخطيط ومؤشرات الالتهاب والإيكو وتقييم السبب.",
treatment:"Cause-directed therapy and anti-inflammatory treatment when appropriate.",
treatmentAr:"علاج السبب ومضادات الالتهاب عند ملاءمتها.",
nursing:"Assess pain, vital signs, breathing, and signs suggesting complications.",
nursingAr:"تقييم الألم والعلامات الحيوية والتنفس وعلامات المضاعفات.",
nclex:"Differentiate pericardial pain patterns from other causes; ECG alone is not definitive."
},
{
id:"tamponade",category:"Pericardial Diseases",en:"Cardiac Tamponade",ar:"اندحاس القلب",
definition:"Compression of the heart by fluid or blood in the pericardial space.",
definitionAr:"ضغط على القلب بسبب تجمع سائل أو دم داخل جوف التامور.",
path:"Increased pericardial pressure limits cardiac filling and reduces output.",
pathAr:"ارتفاع ضغط التامور يعيق امتلاء القلب ويقلل النتاج القلبي.",
risk:"Pericardial effusion, trauma, malignancy, or inflammatory disease.",
riskAr:"الانصباب التاموري والرضوض والأورام والأمراض الالتهابية.",
symptoms:"Dyspnea, tachycardia, hypotension, and signs of impaired perfusion.",
symptomsAr:"ضيق تنفس وتسرع القلب وانخفاض الضغط وعلامات ضعف التروية.",
ecg:"May show low voltage or electrical alternans; neither is always present.",
ecgAr:"قد يظهر انخفاض الفولتية أو Electrical alternans، ولا يلزم وجودهما دائماً.",
tests:"Urgent echocardiography and clinical hemodynamic assessment.",
testsAr:"إيكو عاجل وتقييم سريري للدورة الدموية.",
treatment:"Emergency clinician-led drainage when indicated and supportive management.",
treatmentAr:"تدبير إسعافي وقد يلزم تفريغ السائل مع دعم الدورة الدموية.",
nursing:"Recognize deterioration, escalate immediately, and monitor hemodynamic status.",
nursingAr:"التعرف على التدهور والتصعيد الفوري ومراقبة الدورة الدموية.",
nclex:"Tamponade is a time-critical cause of obstructive shock."
},
{
id:"congenital",category:"Congenital Heart Diseases",en:"Atrial Septal Defect (ASD)",ar:"عيب الحاجز الأذيني",
definition:"An opening in the septum between the atria.",
definitionAr:"فتحة في الحاجز الفاصل بين الأذينين.",
path:"Left-to-right shunting may cause right-sided volume overload.",
pathAr:"قد يؤدي انتقال الدم من اليسار إلى اليمين إلى زيادة الحمل الحجمي على الجانب الأيمن.",
risk:"Congenital developmental condition; some cases are associated with genetic factors.",
riskAr:"حالة خلقية وقد ترتبط بعض الحالات بعوامل وراثية.",
symptoms:"May be asymptomatic or cause exercise intolerance and breathlessness.",
symptomsAr:"قد لا يسبب أعراضاً أو يؤدي إلى ضعف تحمل الجهد وضيق التنفس.",
ecg:"May show right axis deviation or incomplete right bundle branch block, depending on defect.",
ecgAr:"قد يظهر انحراف المحور لليمين أو حصار فرع أيمن غير كامل حسب نوع العيب.",
tests:"Echocardiography with Doppler and selected additional imaging.",
testsAr:"الإيكو مع الدوبلر وتصوير إضافي عند الحاجة.",
treatment:"Observation or closure depending on defect size and hemodynamic significance.",
treatmentAr:"المراقبة أو إغلاق الفتحة حسب الحجم والتأثير الدموي.",
nursing:"Monitor growth, exercise tolerance, respiratory symptoms, and follow-up.",
nursingAr:"مراقبة النمو وتحمل الجهد والأعراض التنفسية والمتابعة.",
nclex:"A left-to-right shunt increases pulmonary blood flow."
},
{
id:"vsd",category:"Congenital Heart Diseases",en:"Ventricular Septal Defect (VSD)",ar:"عيب الحاجز البطيني",
definition:"An opening in the septum between the ventricles.",
definitionAr:"فتحة في الحاجز الفاصل بين البطينين.",
path:"A left-to-right shunt may increase pulmonary blood flow.",
pathAr:"قد يؤدي انتقال الدم من اليسار إلى اليمين إلى زيادة تدفق الدم للرئتين.",
risk:"Congenital; may occur alone or with other cardiac defects.",
riskAr:"عيب خلقي وقد يحدث منفرداً أو مع عيوب قلبية أخرى.",
symptoms:"Small defects may be silent; larger defects may cause feeding difficulty and heart failure symptoms in infants.",
symptomsAr:"قد تكون الفتحات الصغيرة بلا أعراض، بينما قد تسبب الكبيرة صعوبة الرضاعة وأعراض فشل القلب عند الرضع.",
ecg:"May show ventricular hypertrophy depending on defect size and hemodynamic effect.",
ecgAr:"قد تظهر علامات تضخم البطين حسب حجم الفتحة وتأثيرها الدموي.",
tests:"Echocardiography with Doppler.",
testsAr:"الإيكو مع الدوبلر.",
treatment:"Observation or closure depending on size, symptoms, and impact.",
treatmentAr:"المراقبة أو الإغلاق حسب الحجم والأعراض والتأثير.",
nursing:"Monitor feeding, growth, respiratory effort, and signs of heart failure.",
nursingAr:"مراقبة الرضاعة والنمو وجهد التنفس وعلامات فشل القلب.",
nclex:"Larger shunts can lead to pulmonary overcirculation and heart failure."
},
{
id:"pulmhtn",category:"Pulmonary Heart Diseases",en:"Pulmonary Hypertension",ar:"ارتفاع ضغط الشريان الرئوي",
definition:"Abnormally elevated pressure in the pulmonary circulation.",
definitionAr:"ارتفاع غير طبيعي في الضغط داخل الدورة الدموية الرئوية.",
path:"Increased pulmonary vascular resistance can strain the right ventricle.",
pathAr:"زيادة مقاومة الأوعية الرئوية تضع حملاً على البطين الأيمن.",
risk:"May be associated with lung disease, left-heart disease, or pulmonary vascular disorders.",
riskAr:"قد يرتبط بأمراض الرئة أو القلب الأيسر أو أمراض الأوعية الرئوية.",
symptoms:"Exertional dyspnea, fatigue, chest discomfort, and syncope in advanced disease.",
symptomsAr:"ضيق التنفس مع الجهد والتعب والانزعاج الصدري والإغماء في الحالات المتقدمة.",
ecg:"May show right axis deviation or right ventricular hypertrophy; ECG cannot confirm diagnosis.",
ecgAr:"قد يظهر انحراف المحور لليمين أو تضخم البطين الأيمن، ولا يؤكد التخطيط التشخيص.",
tests:"Echocardiography for assessment; right-heart catheterization confirms hemodynamics.",
testsAr:"الإيكو للتقييم وقسطرة القلب الأيمن لتأكيد القياسات الدموية.",
treatment:"Cause-specific specialist management.",
treatmentAr:"علاج اختصاصي يعتمد على السبب.",
nursing:"Monitor oxygenation, activity tolerance, edema, and worsening symptoms.",
nursingAr:"مراقبة الأوكسجة وتحمل النشاط والوذمة وتفاقم الأعراض.",
nclex:"Right ventricular strain may develop as pulmonary pressure rises."
},
{
id:"aorta",category:"Aortic & Vascular Diseases",en:"Aortic Aneurysm",ar:"أمّ الدم الأبهرية",
definition:"Abnormal dilation of a segment of the aorta.",
definitionAr:"توسع غير طبيعي في جزء من الشريان الأبهر.",
path:"Weakening of the aortic wall allows progressive dilation.",
pathAr:"ضعف جدار الأبهر يسمح بحدوث توسع تدريجي.",
risk:"Hypertension, smoking, age, and inherited connective-tissue conditions.",
riskAr:"ارتفاع الضغط والتدخين والعمر وبعض اضطرابات النسيج الضام الوراثية.",
symptoms:"Often asymptomatic; symptoms depend on location and complications.",
symptomsAr:"غالباً بلا أعراض، وتختلف الأعراض حسب الموقع والمضاعفات.",
ecg:"ECG is not a test to diagnose an aortic aneurysm.",
ecgAr:"تخطيط القلب ليس فحصاً لتشخيص أمّ الدم الأبهرية.",
tests:"Ultrasound, CT, or MRI depending on location and clinical context.",
testsAr:"السونار أو CT أو MRI حسب الموقع والحالة.",
treatment:"Imaging surveillance or specialist intervention depending on size, growth, and symptoms.",
treatmentAr:"متابعة بالتصوير أو تدخل اختصاصي حسب الحجم والنمو والأعراض.",
nursing:"Monitor symptoms and vital signs; follow the ordered surveillance plan.",
nursingAr:"مراقبة الأعراض والعلامات الحيوية والالتزام بخطة المتابعة.",
nclex:"Aortic disease may present with symptoms not explained by a routine ECG."
},
{
id:"htnheart",category:"Hypertensive Heart Disease",en:"Hypertensive Heart Disease",ar:"مرض القلب الناتج عن ارتفاع الضغط",
definition:"Structural and functional cardiac changes caused by long-standing hypertension.",
definitionAr:"تغيرات بنيوية ووظيفية في القلب بسبب ارتفاع ضغط الدم المزمن.",
path:"Chronic pressure overload can cause left ventricular hypertrophy and stiffness.",
pathAr:"الحمل الضغطي المزمن قد يسبب تضخم البطين الأيسر وزيادة صلابته.",
risk:"Persistent uncontrolled hypertension and associated cardiovascular risks.",
riskAr:"استمرار ارتفاع الضغط دون سيطرة وعوامل الخطورة القلبية المصاحبة.",
symptoms:"May be silent or cause dyspnea, fatigue, and heart-failure symptoms.",
symptomsAr:"قد يكون بلا أعراض أو يسبب ضيق التنفس والتعب وأعراض فشل القلب.",
ecg:"May show voltage or repolarization patterns associated with left ventricular hypertrophy.",
ecgAr:"قد تظهر علامات فولتية أو إعادة استقطاب مرتبطة بتضخم البطين الأيسر.",
tests:"Blood pressure assessment, ECG, echocardiography, and evaluation of organ effects.",
testsAr:"قياس الضغط والتخطيط والإيكو وتقييم تأثير الضغط على الأعضاء.",
treatment:"Long-term blood-pressure control and management of associated conditions.",
treatmentAr:"السيطرة طويلة الأمد على ضغط الدم وعلاج الحالات المصاحبة.",
nursing:"Support accurate BP measurement, adherence education, and monitoring.",
nursingAr:"دعم قياس الضغط بصورة صحيحة والتثقيف حول الالتزام ومراقبة الحالة.",
nclex:"Chronic afterload elevation can contribute to left ventricular hypertrophy."
},
{
id:"rhd",category:"Valvular Heart Diseases",en:"Rheumatic Heart Disease",ar:"مرض القلب الروماتيزمي",
definition:"Chronic valve damage following acute rheumatic fever.",
definitionAr:"تلف مزمن في صمامات القلب بعد الإصابة بالحمى الروماتيزمية.",
path:"An immune response after group A streptococcal infection can injure cardiac tissue.",
pathAr:"استجابة مناعية بعد عدوى المكورات العقدية من المجموعة A قد تؤذي أنسجة القلب.",
risk:"Previous rheumatic fever and inadequate prevention of recurrent episodes.",
riskAr:"الإصابة السابقة بالحمى الروماتيزمية وعدم الوقاية من تكرارها.",
symptoms:"Depend on valve involvement; may include dyspnea, fatigue, and murmurs.",
symptomsAr:"تعتمد على الصمام المصاب وقد تشمل ضيق التنفس والتعب والنفخات.",
ecg:"May show atrial enlargement or arrhythmias; no specific diagnostic ECG pattern.",
ecgAr:"قد يظهر تضخم الأذين أو اضطرابات نظم، ولا يوجد نمط تخطيط تشخيصي محدد.",
tests:"Echocardiography and clinical history; additional tests as indicated.",
testsAr:"الإيكو والتاريخ المرضي وفحوصات أخرى عند الحاجة.",
treatment:"Management of valve disease and prevention strategies guided by clinicians.",
treatmentAr:"علاج مرض الصمامات والوقاية وفق توجيهات الفريق الطبي.",
nursing:"Monitor symptoms, medication adherence, and follow-up appointments.",
nursingAr:"مراقبة الأعراض والالتزام بالعلاج ومواعيد المتابعة.",
nclex:"Rheumatic disease commonly affects the mitral valve."
},
{
id:"longqt",category:"Cardiac Arrhythmias",en:"Long QT Syndrome",ar:"متلازمة QT الطويلة",
definition:"A disorder of delayed ventricular repolarization, inherited or acquired.",
definitionAr:"اضطراب في تأخر إعادة الاستقطاب البطيني وقد يكون وراثياً أو مكتسباً.",
path:"Prolonged repolarization can predispose to dangerous ventricular arrhythmias.",
pathAr:"تأخر إعادة الاستقطاب قد يزيد قابلية حدوث اضطرابات نظم بطينية خطرة.",
risk:"Genetic variants, certain medications, and electrolyte abnormalities.",
riskAr:"تغيرات جينية وبعض الأدوية واضطراب الشوارد.",
symptoms:"May be asymptomatic or cause palpitations, syncope, or seizures from arrhythmia.",
symptomsAr:"قد لا يسبب أعراضاً أو يؤدي إلى خفقان وإغماء أو نوبات بسبب اضطراب النظم.",
ecg:"Prolonged QT or QTc interval; interpretation depends on rate and context.",
ecgAr:"إطالة فترة QT أو QTc، ويعتمد التفسير على معدل القلب والسياق.",
tests:"12-lead ECG, medication review, electrolytes, and family history.",
testsAr:"تخطيط 12 اشتقاقاً ومراجعة الأدوية والشوارد والتاريخ العائلي.",
treatment:"Specialist assessment, trigger avoidance, and individualized therapy.",
treatmentAr:"تقييم اختصاصي وتجنب المحفزات والعلاج حسب الحالة.",
nursing:"Review prescribed medications and monitor for syncope or palpitations.",
nursingAr:"مراجعة الأدوية الموصوفة ومراقبة الإغماء والخفقان.",
nclex:"Medication-related QT prolongation and low potassium or magnesium are important safety considerations."
}
];

const $ = id => document.getElementById(id);
const navItems = document.querySelectorAll('.nav-item[data-page]');
const overview = $('overviewPage');
const library = $('cardiacLibraryPage');

function showPage(page) {
  if (!overview || !library) return;
  overview.hidden = page !== 'overview';
  library.hidden = page !== 'library';
  navItems.forEach(item => item.classList.toggle('active', item.dataset.page === page));
  if (page === 'library') renderDiseases();
}
navItems.forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));

const categorySelect = $('diseaseCategory');
const searchInput = $('diseaseSearch');
const list = $('diseaseList');
const details = $('diseaseDetails');
const count = $('diseaseCount');
let selectedId = diseases[0].id;

const categoryChips = $('diseaseCategoryChips');
const categories = [...new Set(diseases.map(d => d.category))].sort();

function renderCategoryChips() {
  categoryChips.innerHTML = '';
  ['all', ...categories].forEach(category => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'category-chip' + (categorySelect.value === category ? ' active' : '');
    chip.textContent = category === 'all' ? 'All diseases · جميع الأمراض' : category;
    chip.addEventListener('click', () => {
      categorySelect.value = category;
      renderDiseases();
    });
    categoryChips.appendChild(chip);
  });
}

categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});

function section(title, en, ar) {
  return `<section class="detail-section"><h3>${title}</h3><p>${en}</p><p class="arabic-copy" dir="rtl">${ar}</p></section>`;
}

function renderDetails(d) {
  if (!d) {
    details.innerHTML = '<div class="library-empty"><h2>No matching disease</h2><p>لا توجد نتيجة مطابقة للبحث.</p></div>';
    return;
  }
  details.innerHTML = `
    <div class="detail-heading">
      <div class="eyebrow">${d.category}</div>
      <h2>${d.en}</h2>
      <h3 class="arabic-title" dir="rtl">${d.ar}</h3>
    </div>
    ${section("Definition / التعريف", d.definition, d.definitionAr)}
    ${section("Pathophysiology / الفيزيولوجيا المرضية", d.path, d.pathAr)}
    ${section("Causes & Risk Factors / الأسباب وعوامل الخطورة", d.risk, d.riskAr)}
    ${section("Signs & Symptoms / العلامات والأعراض", d.symptoms, d.symptomsAr)}
    <section class="detail-section ecg-section">
      <h3>ECG Findings / نتائج تخطيط القلب</h3>
      <p>${d.ecg}</p><p class="arabic-copy" dir="rtl">${d.ecgAr}</p>
      <small>ECG findings are educational associations, not standalone diagnostic criteria.</small>
    </section>
    ${section("Diagnostic Tests / الفحوصات التشخيصية", d.tests, d.testsAr)}
    ${section("Treatment Overview / نظرة عامة على العلاج", d.treatment, d.treatmentAr)}
    ${section("Nursing Management / التدبير التمريضي", d.nursing, d.nursingAr)}
    <section class="detail-section nclex-section">
      <h3>NCLEX Key Point</h3><p>${d.nclex}</p>
    </section>
    <p class="medical-disclaimer">Educational content only · المحتوى للتعليم فقط وليس بديلاً عن التقييم الطبي أو البروتوكولات المعتمدة.</p>
  `;
}

function renderDiseases() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const filtered = diseases.filter(d => {
    const matchesCategory = category === 'all' || d.category === category;
    const searchable = [d.en, d.ar, d.category].join(' ').toLowerCase();
    return matchesCategory && searchable.includes(term);
  });
  count.textContent = `${filtered.length} diseases shown · ${diseases.length} total`;
  renderCategoryChips();
  list.innerHTML = '';
  filtered.forEach(d => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'disease-item' + (d.id === selectedId ? ' selected' : '');
    button.innerHTML = `<span class="disease-card-icon">♡</span><small class="disease-card-category">${d.category}</small><strong>${d.en}</strong><span class="disease-card-ar" dir="rtl">${d.ar}</span><span class="disease-card-action">View details →</span>`;
    button.addEventListener('click', () => {
      selectedId = d.id;
      renderDiseases();
      renderDetails(d);
    });
    list.appendChild(button);
  });
  if (filtered.some(d => d.id === selectedId)) {
    renderDetails(filtered.find(d => d.id === selectedId));
  } else if (filtered.length) {
    selectedId = filtered[0].id;
    renderDetails(filtered[0]);
  } else {
    renderDetails(null);
  }
}
searchInput.addEventListener('input', renderDiseases);
categorySelect.addEventListener('change', renderDiseases);
renderDiseases();
