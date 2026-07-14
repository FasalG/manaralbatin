import { SiteContent } from '../models/content.model';

/**
 * Built-in default content for Manar Al Batin International School.
 * Everything here is editable from the admin dashboard once Firebase is on.
 * Image paths point to `public/assets/images/` — see README for the file list.
 */
export const SEED_CONTENT: SiteContent = {
  school: {
    name: { en: 'Manar Al Batin International School', ar: 'مدارس منار الباطن العالمية' },
    shortName: { en: 'Manar Al Batin', ar: 'منار الباطن' },
    tagline: {
      en: 'Confident. Curious. Capable.',
      ar: 'واثقون. فضوليون. قادرون.',
    },
    logoUrl: '',
    established: '1985',
    curriculum: { en: 'Cambridge Pathway', ar: 'مسار كامبريدج' },
    phone: '+966 54 109 60 28',
    whatsapp: '966541096028',
    email: 'info@manaralbatinschool.org',
    address: {
      en: 'Al Tilal, Hafar Al Batin, Eastern Province, Saudi Arabia',
      ar: 'حي التلال، حفر الباطن، المنطقة الشرقية، المملكة العربية السعودية',
    },
    mapUrl: 'https://maps.google.com/?q=Hafar+Al+Batin+Saudi+Arabia',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#',
    },
  },

  hero: {
    badge: { en: 'Admissions open · 2026–2027', ar: 'القبول مفتوح · 2026–2027' },
    title: { en: 'Where young minds', ar: 'حيث تنمو العقول' },
    highlight: { en: 'grow bright', ar: 'الصغيرة بإشراق' },
    subtitle: {
      en: 'A Cambridge-pathway school in Hafar Al Batin nurturing children from KG1 to Grade 9 — building strong futures through curiosity, character and care.',
      ar: 'مدرسة بمسار كامبريدج في حفر الباطن ترعى الأطفال من الروضة الأولى حتى الصف التاسع، وتبني مستقبلاً قوياً عبر الفضول وبناء الشخصية والاهتمام.',
    },
    primaryCta: { label: { en: 'Start Registration', ar: 'ابدأ التسجيل' }, path: '/admissions/register' },
    secondaryCta: { label: { en: 'Explore the school', ar: 'استكشف المدرسة' }, path: '/about' },
    image: 'assets/images/students-group.jpg',
  },

  stats: [
    { value: 40, suffix: '+', label: { en: 'Years shaping learners', ar: 'عاماً في صناعة المتعلمين' } },
    { value: 1200, suffix: '+', label: { en: 'Happy students', ar: 'طالب وطالبة' } },
    { value: 85, suffix: '+', label: { en: 'Expert educators', ar: 'معلماً متخصصاً' } },
    { value: 98, suffix: '%', label: { en: 'Parent satisfaction', ar: 'رضا أولياء الأمور' } },
  ],

  features: [
    {
      icon: 'cambridge',
      title: { en: 'Cambridge curriculum', ar: 'منهج كامبريدج' },
      text: {
        en: 'An internationally recognised pathway that stretches thinking and prepares learners for a global future.',
        ar: 'مسار معترف به دولياً يوسّع آفاق التفكير ويجهّز الطلاب لمستقبل عالمي.',
      },
    },
    {
      icon: 'globe',
      title: { en: 'Bilingual learning', ar: 'تعليم ثنائي اللغة' },
      text: {
        en: 'Strong English alongside Arabic and Islamic values — children grow rooted and ready for the world.',
        ar: 'إتقان الإنجليزية إلى جانب العربية والقيم الإسلامية، لينمو الأبناء أقوياء الجذور ومستعدين للعالم.',
      },
    },
    {
      icon: 'heart',
      title: { en: 'Care for every child', ar: 'رعاية لكل طفل' },
      text: {
        en: 'Small, attentive classes where teachers know each learner and every child is seen and supported.',
        ar: 'فصول صغيرة يعرف فيها المعلمون كل طالب، حيث يُرى كل طفل ويحظى بالدعم.',
      },
    },
    {
      icon: 'flask',
      title: { en: 'Hands-on discovery', ar: 'تعلّم بالاكتشاف' },
      text: {
        en: 'Labs, technology and project work that turn curiosity into real understanding and skills.',
        ar: 'مختبرات وتقنية ومشاريع عملية تحوّل الفضول إلى فهم ومهارات حقيقية.',
      },
    },
    {
      icon: 'trophy',
      title: { en: 'Beyond the classroom', ar: 'ما وراء الفصل' },
      text: {
        en: 'Sports, arts, clubs and competitions that build confidence, teamwork and leadership.',
        ar: 'رياضة وفنون وأندية ومسابقات تبني الثقة والعمل الجماعي والقيادة.',
      },
    },
    {
      icon: 'shield',
      title: { en: 'A safe campus', ar: 'حرم آمن' },
      text: {
        en: 'A secure, welcoming environment with a school clinic, safe transport and caring supervision.',
        ar: 'بيئة آمنة ومرحّبة مع عيادة مدرسية ونقل آمن وإشراف تربوي.',
      },
    },
  ],

  facilities: [
    {
      slug: 'science-labs',
      icon: 'flask',
      title: { en: 'Science laboratories', ar: 'مختبرات العلوم' },
      summary: { en: 'Physics, chemistry and biology, hands-on.', ar: 'فيزياء وكيمياء وأحياء بأسلوب عملي.' },
      body: {
        en: 'Purpose-built laboratories let students experiment safely and learn science by doing. From simple observations in the early years to guided investigations in the upper grades, our labs make ideas real.',
        ar: 'مختبرات مجهزة تتيح للطلاب التجربة بأمان وتعلّم العلوم بالممارسة. من الملاحظات البسيطة في المراحل المبكرة إلى الاستقصاءات الموجّهة في الصفوف العليا، تجعل مختبراتنا الأفكار ملموسة.',
      },
      image: 'assets/images/facility-lab.jpg',
    },
    {
      slug: 'ict-lab',
      icon: 'laptop',
      title: { en: 'Computer & ICT lab', ar: 'مختبر الحاسب والتقنية' },
      summary: { en: 'Digital skills for a modern world.', ar: 'مهارات رقمية لعالم حديث.' },
      body: {
        en: 'Modern computers and a structured ICT programme build coding, research and digital-citizenship skills from an early age, preparing learners for a technology-driven future.',
        ar: 'أجهزة حديثة وبرنامج تقني منظّم يبني مهارات البرمجة والبحث والمواطنة الرقمية منذ سنّ مبكرة، تجهيزاً للطلاب لمستقبل تقودُه التقنية.',
      },
      image: 'assets/images/facility-ict.jpg',
    },
    {
      slug: 'library',
      icon: 'library',
      title: { en: 'Library & reading corner', ar: 'المكتبة وركن القراءة' },
      summary: { en: 'A world of stories in two languages.', ar: 'عالم من القصص بلغتين.' },
      body: {
        en: 'A bright, well-stocked library in English and Arabic grows a lifelong love of reading, with cosy corners for quiet study and shared story time.',
        ar: 'مكتبة مضيئة غنية بالكتب بالإنجليزية والعربية تنمّي حب القراءة مدى الحياة، مع أركان هادئة للدراسة ووقت للقصة المشتركة.',
      },
      image: 'assets/images/facility-library.jpg',
    },
    {
      slug: 'sports',
      icon: 'ball',
      title: { en: 'Sports & play areas', ar: 'الملاعب وساحات اللعب' },
      summary: { en: 'Healthy bodies, strong teams.', ar: 'أجساد سليمة وفرق قوية.' },
      body: {
        en: 'Open courts and safe play areas keep children active every day. Physical education, team sports and friendly competitions build fitness, discipline and sportsmanship.',
        ar: 'ملاعب مفتوحة وساحات لعب آمنة تبقي الأطفال نشطين كل يوم. التربية البدنية والرياضات الجماعية والمنافسات الودية تبني اللياقة والانضباط والروح الرياضية.',
      },
      image: 'assets/images/facility-sports.jpg',
    },
    {
      slug: 'arts',
      icon: 'palette',
      title: { en: 'Art & creativity studio', ar: 'استوديو الفن والإبداع' },
      summary: { en: 'Where imagination takes shape.', ar: 'حيث يتشكّل الخيال.' },
      body: {
        en: 'A dedicated studio for painting, craft and design gives every child a voice through art, celebrating creativity and self-expression across all ages.',
        ar: 'استوديو مخصص للرسم والحرف والتصميم يمنح كل طفل صوتاً عبر الفن، احتفاءً بالإبداع والتعبير عن الذات لكل الأعمار.',
      },
      image: 'assets/images/facility-arts.jpg',
    },
    {
      slug: 'clinic',
      icon: 'clinic',
      title: { en: 'School clinic & safety', ar: 'العيادة والسلامة' },
      summary: { en: 'Health and wellbeing, on hand.', ar: 'الصحة والرعاية في المتناول.' },
      body: {
        en: 'A supervised school clinic, trained staff and clear safety procedures give parents peace of mind that their children are cared for throughout the school day.',
        ar: 'عيادة مدرسية مشرَف عليها وكادر مدرّب وإجراءات سلامة واضحة تمنح أولياء الأمور طمأنينة بأن أبناءهم في رعاية طوال اليوم الدراسي.',
      },
      image: 'assets/images/facility-clinic.jpg',
    },
  ],

  accreditations: [
    { name: { en: 'Cambridge Assessment International Education', ar: 'كامبريدج للتقييم الدولي' }, note: { en: 'Cambridge Pathway school', ar: 'مدرسة بمسار كامبريدج' }, logo: 'assets/images/accred-cambridge.svg' },
    { name: { en: 'Ministry of Education, KSA', ar: 'وزارة التعليم السعودية' }, note: { en: 'Licensed & accredited', ar: 'مرخّصة ومعتمدة' }, logo: 'assets/images/accred-moe.svg' },
    { name: { en: 'International Standards', ar: 'معايير دولية' }, note: { en: 'Quality-assured teaching', ar: 'جودة تعليمية مضمونة' }, logo: 'assets/images/accred-intl.svg' },
  ],

  directorMessage: {
    name: { en: 'Director Name', ar: 'اسم المدير العام' },
    role: { en: 'Director & Chairman', ar: 'المدير العام ورئيس مجلس الإدارة' },
    photo: 'assets/images/director.jpg',
    quote: {
      en: 'We do not just build a school — we build a future for our community.',
      ar: 'نحن لا نبني مدرسة فحسب، بل نبني مستقبلاً لمجتمعنا.',
    },
    body: {
      en: 'Since our founding, our goal has never changed: to give the children of Hafar Al Batin an education that opens doors anywhere in the world while keeping them proud of who they are. We invest in outstanding teachers, safe modern facilities and a genuine partnership with every family. When you choose Manar Al Batin, you join a community that believes in your child as much as you do.',
      ar: 'منذ تأسيسنا لم يتغيّر هدفنا: أن نمنح أبناء حفر الباطن تعليماً يفتح لهم الأبواب في كل مكان في العالم، مع اعتزازهم بهويتهم. نستثمر في معلمين متميزين ومرافق حديثة وآمنة وشراكة حقيقية مع كل أسرة. وحين تختار منار الباطن فأنت تنضم إلى مجتمع يؤمن بطفلك كما تؤمن به أنت.',
    },
  },

  principalMessage: {
    name: { en: 'Mr. Saud Al Otaibi', ar: 'الأستاذ سعود العتيبي' },
    role: { en: 'School Principal', ar: 'مدير المدرسة' },
    photo: 'assets/images/principal.jpg',
    quote: {
      en: 'Every child who walks through our gates carries a future worth believing in.',
      ar: 'كل طفل يدخل من أبوابنا يحمل مستقبلاً يستحق أن نؤمن به.',
    },
    body: {
      en: 'For four decades, Manar Al Batin has been a home for learning in Hafar Al Batin. We combine the academic strength of the Cambridge Pathway with the values, language and identity of our community. Our promise to every family is simple: we will know your child, challenge your child, and help your child grow into a confident, principled young person ready for whatever comes next.',
      ar: 'على مدى أربعة عقود، كانت منار الباطن بيتاً للتعلّم في حفر الباطن. نجمع بين القوة الأكاديمية لمسار كامبريدج وبين قيم مجتمعنا ولغته وهويته. ووعدُنا لكل أسرة بسيط: سنعرف طفلك، ونتحدّى قدراته، ونساعده لينمو شخصاً واثقاً ذا مبادئ، مستعداً لكل ما هو قادم.',
    },
  },

  faculty: [
    { name: { en: 'Faculty Member', ar: 'عضو هيئة تدريس' }, role: { en: 'Head of Primary', ar: 'رئيس المرحلة الابتدائية' }, subject: { en: 'English & Literacy', ar: 'الإنجليزية والقراءة' }, photo: 'assets/images/faculty-1.svg' },
    { name: { en: 'Faculty Member', ar: 'عضو هيئة تدريس' }, role: { en: 'Science Coordinator', ar: 'منسّق العلوم' }, subject: { en: 'Science', ar: 'العلوم' }, photo: 'assets/images/faculty-2.svg' },
    { name: { en: 'Faculty Member', ar: 'عضو هيئة تدريس' }, role: { en: 'Mathematics Lead', ar: 'رئيس قسم الرياضيات' }, subject: { en: 'Mathematics', ar: 'الرياضيات' }, photo: 'assets/images/faculty-3.svg' },
    { name: { en: 'Faculty Member', ar: 'عضو هيئة تدريس' }, role: { en: 'KG Coordinator', ar: 'منسّقة رياض الأطفال' }, subject: { en: 'Early Years', ar: 'الطفولة المبكرة' }, photo: 'assets/images/faculty-4.svg' },
    { name: { en: 'Faculty Member', ar: 'عضو هيئة تدريس' }, role: { en: 'Islamic Studies', ar: 'التربية الإسلامية' }, subject: { en: 'Islamic & Arabic', ar: 'الإسلامية والعربية' }, photo: 'assets/images/faculty-5.svg' },
    { name: { en: 'Faculty Member', ar: 'عضو هيئة تدريس' }, role: { en: 'Arts & Music', ar: 'الفنون والموسيقى' }, subject: { en: 'Creative Arts', ar: 'الفنون' }, photo: 'assets/images/faculty-6.svg' },
  ],

  gallery: [
    { src: 'assets/images/gallery-1.jpg', caption: { en: 'Learning together', ar: 'نتعلّم معاً' }, category: 'classroom' },
    { src: 'assets/images/gallery-2.jpg', caption: { en: 'Creative studio', ar: 'استوديو الإبداع' }, category: 'activities' },
    { src: 'assets/images/gallery-3.jpg', caption: { en: 'Bright classrooms', ar: 'فصول مضيئة' }, category: 'classroom' },
    { src: 'assets/images/gallery-4.jpg', caption: { en: 'Friends for life', ar: 'أصدقاء العمر' }, category: 'campus' },
    { src: 'assets/images/gallery-5.jpg', caption: { en: 'Discovering science', ar: 'نكتشف العلوم' }, category: 'activities' },
    { src: 'assets/images/gallery-6.jpg', caption: { en: 'Celebrating success', ar: 'نحتفل بالنجاح' }, category: 'events' },
  ],

  grades: [
    { code: 'KG1', name: { en: 'Kindergarten 1', ar: 'روضة أولى' }, ageRange: '3–4', focus: { en: 'Play-based early learning, language and social skills.', ar: 'تعلّم مبكر باللعب، ولغة ومهارات اجتماعية.' } },
    { code: 'KG2', name: { en: 'Kindergarten 2', ar: 'روضة ثانية' }, ageRange: '4–5', focus: { en: 'Early literacy, numeracy and school readiness.', ar: 'قراءة وحساب مبكر وجاهزية للمدرسة.' } },
    { code: 'G1', name: { en: 'Grade 1', ar: 'الصف الأول' }, ageRange: '6', focus: { en: 'Foundations of reading, writing and mathematics.', ar: 'أساسيات القراءة والكتابة والرياضيات.' } },
    { code: 'G2', name: { en: 'Grade 2', ar: 'الصف الثاني' }, ageRange: '7', focus: { en: 'Growing fluency and curiosity across subjects.', ar: 'نموّ الطلاقة والفضول عبر المواد.' } },
    { code: 'G3', name: { en: 'Grade 3', ar: 'الصف الثالث' }, ageRange: '8', focus: { en: 'Independent reading and problem solving.', ar: 'قراءة مستقلة وحلّ المشكلات.' } },
    { code: 'G4', name: { en: 'Grade 4', ar: 'الصف الرابع' }, ageRange: '9', focus: { en: 'Deeper thinking and research skills.', ar: 'تفكير أعمق ومهارات بحث.' } },
    { code: 'G5', name: { en: 'Grade 5', ar: 'الصف الخامس' }, ageRange: '10', focus: { en: 'Consolidating primary foundations.', ar: 'ترسيخ أسس المرحلة الابتدائية.' } },
    { code: 'G6', name: { en: 'Grade 6', ar: 'الصف السادس' }, ageRange: '11', focus: { en: 'Transition into lower secondary.', ar: 'انتقال إلى المرحلة المتوسطة.' } },
    { code: 'G7', name: { en: 'Grade 7', ar: 'الصف السابع' }, ageRange: '12', focus: { en: 'Cambridge Lower Secondary begins.', ar: 'بداية كامبريدج للمرحلة المتوسطة.' } },
    { code: 'G8', name: { en: 'Grade 8', ar: 'الصف الثامن' }, ageRange: '13', focus: { en: 'Specialised subjects and skills.', ar: 'مواد ومهارات متخصصة.' } },
    { code: 'G9', name: { en: 'Grade 9', ar: 'الصف التاسع' }, ageRange: '14', focus: { en: 'Preparing for internationally recognised assessment.', ar: 'الاستعداد لتقييم معترف به دولياً.' } },
  ],

  calendar: [
    { date: { en: 'Aug 2026', ar: 'أغسطس 2026' }, title: { en: 'Academic year begins', ar: 'بداية العام الدراسي' }, type: 'term' },
    { date: { en: 'Sep 2026', ar: 'سبتمبر 2026' }, title: { en: 'Saudi National Day', ar: 'اليوم الوطني السعودي' }, type: 'holiday' },
    { date: { en: 'Nov 2026', ar: 'نوفمبر 2026' }, title: { en: 'First-term assessments', ar: 'اختبارات الفصل الأول' }, type: 'exam' },
    { date: { en: 'Dec 2026', ar: 'ديسمبر 2026' }, title: { en: 'Mid-year break', ar: 'إجازة منتصف العام' }, type: 'holiday' },
    { date: { en: 'Mar 2027', ar: 'مارس 2027' }, title: { en: 'Science & arts week', ar: 'أسبوع العلوم والفنون' }, type: 'event' },
    { date: { en: 'Jun 2027', ar: 'يونيو 2027' }, title: { en: 'Final assessments & graduation', ar: 'الاختبارات النهائية والتخرج' }, type: 'exam' },
  ],

  fees: [
    { grade: { en: 'KG1 – KG2', ar: 'الروضة الأولى – الثانية' }, tuition: '—', registration: '—', note: { en: 'Contact admissions for the current fee sheet.', ar: 'تواصل مع القبول للحصول على قائمة الرسوم.' } },
    { grade: { en: 'Grade 1 – 3', ar: 'الصف الأول – الثالث' }, tuition: '—', registration: '—', note: { en: 'Sibling discounts available.', ar: 'خصومات للإخوة متاحة.' } },
    { grade: { en: 'Grade 4 – 6', ar: 'الصف الرابع – السادس' }, tuition: '—', registration: '—', note: { en: 'Flexible instalment plans.', ar: 'خطط تقسيط مرنة.' } },
    { grade: { en: 'Grade 7 – 9', ar: 'الصف السابع – التاسع' }, tuition: '—', registration: '—', note: { en: 'Includes Cambridge programme.', ar: 'يشمل برنامج كامبريدج.' } },
  ],

  requirements: [
    { text: { en: "Completed registration form (submit the enquiry below).", ar: 'تعبئة نموذج التسجيل (أرسل الطلب أدناه).' } },
    { text: { en: "Copy of the student's national ID or Iqama.", ar: 'صورة الهوية الوطنية أو الإقامة للطالب.' } },
    { text: { en: "Copy of the family record or passport.", ar: 'صورة سجل الأسرة أو جواز السفر.' } },
    { text: { en: 'Two recent passport-size photographs.', ar: 'صورتان شخصيتان حديثتان.' } },
    { text: { en: 'Previous school report / transfer certificate (Grade 1+).', ar: 'شهادة الصف السابق / إخلاء طرف (للصف الأول فأعلى).' } },
    { text: { en: 'Up-to-date vaccination record.', ar: 'سجل التطعيمات محدّث.' } },
  ],

  resources: [
    {
      icon: 'book',
      title: { en: 'School brochure 2026–2027', ar: 'مطوية المدرسة 2026–2027' },
      description: { en: 'Everything about our programme, campus and Cambridge pathway in one place.', ar: 'كل ما يخص برنامجنا والحرم ومسار كامبريدج في مكان واحد.' },
      fileUrl: 'assets/files/brochure.pdf',
      fileLabel: 'PDF',
    },
    {
      icon: 'calendar',
      title: { en: 'Academic calendar 2026–2027', ar: 'التقويم الدراسي 2026–2027' },
      description: { en: 'Term dates, holidays, assessment periods and key school events.', ar: 'مواعيد الفصول والإجازات وفترات الاختبارات والفعاليات المهمة.' },
      fileUrl: 'assets/files/academic-calendar.pdf',
      fileLabel: 'PDF',
    },
    {
      icon: 'check',
      title: { en: 'Registration checklist', ar: 'قائمة متطلبات التسجيل' },
      description: { en: 'The documents you need to enrol your child, ready to print.', ar: 'المستندات اللازمة لتسجيل طفلك، جاهزة للطباعة.' },
      fileUrl: '',
      fileLabel: 'PDF',
    },
  ],

  aim: {
    mission: {
      en: 'To provide an outstanding bilingual, Cambridge-based education that develops confident, curious and capable learners grounded in strong values.',
      ar: 'تقديم تعليم متميّز ثنائي اللغة قائم على كامبريدج يطوّر متعلمين واثقين وفضوليين وقادرين، راسخين في قيم قوية.',
    },
    vision: {
      en: 'To be the school of choice in Hafar Al Batin — a community where every child achieves their best and grows into a responsible global citizen.',
      ar: 'أن نكون المدرسة الأولى في حفر الباطن، مجتمعاً يحقّق فيه كل طفل أفضل ما لديه وينمو مواطناً عالمياً مسؤولاً.',
    },
    values: [
      { title: { en: 'Excellence', ar: 'التميّز' }, text: { en: 'We aim high and celebrate real progress for every learner.', ar: 'نطمح عالياً ونحتفي بالتقدّم الحقيقي لكل متعلم.' } },
      { title: { en: 'Respect', ar: 'الاحترام' }, text: { en: 'Kindness, courtesy and care shape everything we do.', ar: 'اللطف والاحترام والرعاية تصوغ كل ما نفعله.' } },
      { title: { en: 'Integrity', ar: 'النزاهة' }, text: { en: 'We do the right thing, even when no one is watching.', ar: 'نفعل الصواب حتى حين لا يرانا أحد.' } },
      { title: { en: 'Curiosity', ar: 'الفضول' }, text: { en: 'We ask, explore and never stop wondering.', ar: 'نسأل ونستكشف ولا نتوقف عن التساؤل.' } },
    ],
  },

  about: {
    story: {
      en: 'Founded in 1985, Manar Al Batin International School has grown into one of Hafar Al Batin\'s most trusted schools. Generations of families have entrusted us with their children, and we honour that trust with a modern Cambridge education delivered by caring, qualified teachers in a safe and welcoming campus.',
      ar: 'تأسست مدارس منار الباطن العالمية عام 1985 لتصبح من أكثر المدارس ثقةً في حفر الباطن. ائتمنتنا أجيال من العائلات على أبنائها، ونصون هذه الثقة بتعليم كامبريدج حديث يقدّمه معلمون مؤهلون في حرم آمن ومرحّب.',
    },
    pillars: [
      { title: { en: 'Academic strength', ar: 'قوة أكاديمية' }, text: { en: 'A rigorous, internationally benchmarked curriculum.', ar: 'منهج صارم بمعايير دولية.' } },
      { title: { en: 'Character & values', ar: 'الشخصية والقيم' }, text: { en: 'Islamic values and good character at our core.', ar: 'القيم الإسلامية والأخلاق الحسنة في صميم عملنا.' } },
      { title: { en: 'Whole-child growth', ar: 'نموّ متكامل' }, text: { en: 'Academics, arts, sport and wellbeing together.', ar: 'الأكاديميات والفنون والرياضة والعافية معاً.' } },
    ],
  },
};
