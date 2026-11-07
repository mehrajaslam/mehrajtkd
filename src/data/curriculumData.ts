import {
  GupLesson,
  DanLevelInfo,
  PoomsaeDetail,
  KyorugiScenario,
  RefereeSignal,
  RefereeRulePoint,
  ExamQuestion,
  TerminologyItem
} from '../types';

export const GUP_LESSONS: GupLesson[] = [
  {
    gupNumber: 10,
    beltName: 'White Belt',
    beltColorHex: '#F8FAFC',
    title: '10th Gup: Foundation & Origin - White Belt',
    objectives: [
      'Understand the martial spirit, courtesy (Ye-Ui), and dojang etiquette.',
      'Master the basic stances: Naranhi Seogi (Parallel), Juchum Seogi (Horse Stance), and Ap Seogi (Walking Stance).',
      'Execute Arae Makgi (Low Block) with proper reaction-hand chambering.',
      'Perform Momtong Jireugi (Middle Punch) with 180° wrist rotation on impact.',
      'Execute foundational Ap Chagi (Front Snap Kick) striking with the ball of the foot (Apchook).'
    ],
    explanation:
      'White signifies innocence and purity: like a blank canvas or fresh snow with no prior knowledge of Taekwondo. The student begins their lifelong martial journey by laying unshakeable physical and mental foundations. At 10th Gup, precision of basic movement (Gibon Dongjak), discipline of the eyes (Shiseon), upright spine alignment, and the martial shout (Kihap) take precedence over speed.',
    stepByStepTechniques: [
      {
        name: 'Arae Makgi (Low Downward Block)',
        koreanHangul: '아래막기',
        romanized: 'Arae Makgi',
        category: 'Block',
        cues: 'Chamber blocking fist at opposite shoulder; sweep downward to 2 fist-widths above knee.',
        steps: [
          'Chambering: Place blocking fist on opposite shoulder with palm facing inward.',
          'Reaction Hand: Place pulling fist in front of solar plexus, knuckles upward.',
          'Execution: Sweep blocking arm down diagonally across the centerline.',
          'Completion: Stop fist 2 fist-widths above thigh, elbow slightly unlocked; pull reaction hand firmly to hip.'
        ]
      },
      {
        name: 'Momtong Jireugi (Middle Punch)',
        koreanHangul: '몸통지르기',
        romanized: 'Momtong Jireugi',
        category: 'Strike',
        cues: 'Aim for solar plexus (Momtong); rotate fist 180° at final inch with sharp exhale.',
        steps: [
          'Chambering: Clench fist tightly at hip, palm facing upward with wrist straight.',
          'Trajectory: Drive fist straight forward along body centerline without flaring elbow.',
          'Impact: Corkscrew fist 180° so knuckles are horizontal at moment of impact.',
          'Reaction: Pull opposite hand back to hip in synchrony.'
        ]
      },
      {
        name: 'Ap Chagi (Front Snap Kick)',
        koreanHangul: '앞차기',
        romanized: 'Ap Chagi',
        category: 'Kick',
        cues: 'Knee chamber high; snap lower leg with Apchook (ball of foot); recoil before setting down.',
        steps: [
          'Chamber: Lift kicking knee sharply towards chest, folding heel close to buttock.',
          'Snap: Extend lower leg forward rapidly, pulling toes back tightly to expose ball of foot (Apchook).',
          'Recoil: Instantly retract heel back toward glute along identical trajectory.',
          'Controlled Landing: Place foot down softly with balance intact.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Juchum Seogi (Horse Stance) Punching Endurance',
        description: 'Assume deep horse stance (twice shoulder width, knees pressed outward). Deliver single punches alternating left and right with loud Kihap.',
        repetitions: '4 sets of 25 punches (100 total)'
      },
      {
        title: 'Wall-Supported Front Snap Kick Chambering',
        description: 'Rest one hand against a wall for balance. Lift kicking knee, snap out Ap Chagi, hold 2 seconds, recoil, and repeat without touching floor.',
        repetitions: '15 repetitions per leg x 3 sets'
      },
      {
        title: 'Low Block & Walking Stance Stepping',
        description: 'Step forward in Ap Seogi executing alternating Arae Makgi across the dojang floor.',
        repetitions: '10 steps forward, turn 180°, 10 steps back x 4 sets'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Striking with the toes instead of the ball of the foot (Apchook) during Ap Chagi.',
        correction: 'Pull toes back forcefully toward shin so only the cushioned ball of the foot makes contact.'
      },
      {
        mistake: 'Letting the blocking arm swing past the leg or touch the knee during Arae Makgi.',
        correction: 'Halt the block firmly 2 fist-widths above the knee to maintain defensive tension.'
      },
      {
        mistake: 'Flaring the elbow outward like a chicken wing during Momtong Jireugi.',
        correction: 'Keep forearm brushing against your ribs until the final rotation at contact.'
      }
    ],
    stances: ['Moa Seogi (Attention Stance)', 'Naranhi Seogi (Parallel Stance)', 'Juchum Seogi (Horse Riding Stance)', 'Ap Seogi (Walking Stance)'],
    blocks: ['Arae Makgi (Low Block)'],
    strikes: ['Momtong Bandae Jireugi (Middle Punch)', 'Momtong Baro Jireugi (Reverse Middle Punch)'],
    kicks: ['Ap Chagi (Front Snap Kick with Apchook)'],
    poomsaeRequired: 'Gibon Dongjak (Basic 8 Movements / Saju Jireugi)',
    keyPoints: [
      'Low block finishes exactly 2 fist-widths above the front knee.',
      'Punch targets the solar plexus with crisp 180° rotation on impact.',
      'Always recoil the kick before setting the foot down.'
    ],
    terminology: [
      { koreanHangul: '차렷', romanized: 'Charyeot', englishMeaning: 'Attention', category: 'Command', technicalCues: 'Heels together, feet at 45°, fists clenched lightly by thighs.', urdu: 'توجہ / ہوشیار', arabic: 'انتباه' },
      { koreanHangul: '경례', romanized: 'Kyeong-rye', englishMeaning: 'Bow (Courtesy)', category: 'Command', technicalCues: 'Bend 45° at waist, eyes lowered respectfully.', urdu: 'احترام کا جھکاؤ / سلام', arabic: 'تحية باحترام' },
      { koreanHangul: '준비', romanized: 'Joon-bi', englishMeaning: 'Ready Stance', category: 'Command', technicalCues: 'Fists rise slowly in front of solar plexus, press down to belt level.', urdu: 'تیار', arabic: 'استعداد' },
      { koreanHangul: '아래막기', romanized: 'Arae Makgi', englishMeaning: 'Low Block', category: 'Block', technicalCues: 'Reaction hand chambers at opposite ear, downward sweep.', urdu: 'نیچے کا دفاعی بلاک', arabic: 'صد سفلي' }
    ],
    quiz: [
      {
        question: 'Which part of the foot is the correct striking surface for Ap Chagi (Front Snap Kick)?',
        options: ['Heel (Dwikoomchi)', 'Ball of the foot (Apchook)', 'Instep (Baldeung)', 'Toes (Balkkeut)'],
        correctIndex: 1,
        explanation: 'In traditional Kukkiwon Taekwondo, Ap Chagi strikes with the ball of the foot (Apchook) while toes are curled back.'
      },
      {
        question: 'What is the correct distance between the blocking fist and the thigh at the completion of Arae Makgi?',
        options: ['Touching the knee directly', 'Two fist-widths above the knee', 'At waist height', 'One hand-length below the knee'],
        correctIndex: 1,
        explanation: 'Arae Makgi stops approximately two fist-widths above the front thigh with elbow slightly unlocked.'
      },
      {
        question: 'What degree of rotation should the fist undergo during a standard middle punch (Momtong Jireugi)?',
        options: ['90 degrees', '180 degrees', '360 degrees', 'No rotation'],
        correctIndex: 1,
        explanation: 'The fist travels palm-up from the hip and corkscrews 180 degrees into palm-down at the moment of contact.'
      },
      {
        question: 'What is the Korean command for "Bow" in Taekwondo etiquette?',
        options: ['Charyeot', 'Kyeong-rye', 'Joon-bi', 'Shi-jak'],
        correctIndex: 1,
        explanation: 'Kyeong-rye is the official command to bow respectfully to masters, instructors, and training partners.'
      },
      {
        question: 'What does the White Belt symbolize in Taekwondo philosophy?',
        options: ['Danger and caution', 'The earth from which roots grow', 'Innocence and the beginning of martial learning', 'The sky and high heavens'],
        correctIndex: 2,
        explanation: 'White belt represents innocence: a beginner with no prior knowledge of the art, receptive to instruction.'
      }
    ]
  },
  {
    gupNumber: 9,
    beltName: 'White Belt with Yellow Stripe',
    beltColorHex: '#F8FAFC',
    stripeColorHex: '#F59E0B',
    title: '9th Gup: First Step to Awakening - Yellow Stripe',
    objectives: [
      'Master Ap Koobi (Forward Long Stance) with correct 70/30 weight distribution.',
      'Execute Momtong An Makgi (Middle Inward Block) guarding the torso centerline.',
      'Coordinate Momtong Du-beon Jireugi (Double Middle Punch) with crisp hip recoil.',
      'Learn the chambering and standing foot pivot for Dollyo Chagi (Roundhouse Kick).',
      'Perform the first 8 movements of Taegeuk 1 Jang with balanced transitions.'
    ],
    explanation:
      'The yellow stripe on white represents the first beam of sunlight touching the seed buried in the earth. The student transitions from basic static movements to deep driving stances (Ap Koobi) and inward body blocks, awakening physical power through hip rotation and synchronized breathing.',
    stepByStepTechniques: [
      {
        name: 'Ap Koobi (Forward Long Stance)',
        koreanHangul: '앞굽이',
        romanized: 'Ap Koobi',
        category: 'Stance',
        cues: '3 to 3.5 foot lengths; front knee over heel; rear leg completely locked straight; 70% weight on front leg.',
        steps: [
          'Step forward 3 to 3.5 foot lengths from parallel stance.',
          'Bend front knee until kneecap aligns vertically over front ankle.',
          'Lock rear leg straight with rear foot angled outward no more than 30 degrees.',
          'Distribute 65-70% weight on front foot, 30-35% on rear foot.'
        ]
      },
      {
        name: 'Momtong An Makgi (Middle Inward Block)',
        koreanHangul: '몸통안막기',
        romanized: 'Momtong An Makgi',
        category: 'Block',
        cues: 'Chamber behind shoulder; sweep inward to solar plexus center; fist at shoulder height.',
        steps: [
          'Chamber blocking arm backward with fist at shoulder level, elbow at 90 degrees.',
          'Rotate torso inward while sweeping fist in a circular trajectory toward centerline.',
          'Halt fist aligned with opposite shoulder collarbone; elbow bent at 90-100 degrees.'
        ]
      },
      {
        name: 'Dollyo Chagi Intro (Roundhouse Kick Pivot)',
        koreanHangul: '돌려차기',
        romanized: 'Dollyo Chagi',
        category: 'Kick',
        cues: 'Pivot standing foot 135°-180°; turn hips horizontal; strike with instep (Baldeung).',
        steps: [
          'Lift rear knee straight forward, then rotate standing foot 135 degrees away from target.',
          'Turn kicking hip completely horizontal over supporting hip.',
          'Snap lower leg across target horizontally, striking with the instep (Baldeung).',
          'Recoil lower leg along horizontal plane before stepping down.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Ap Koobi Stance Walking Drill',
        description: 'Advance forward down the mat in deep Ap Koobi, shifting weight smoothly without bobbing head height.',
        repetitions: '20 continuous steps forward and backward x 3 sets'
      },
      {
        title: 'Double Punch with Hip Snap',
        description: 'From Ap Koobi, throw Momtong Du-beon Jireugi (Left-Right or Right-Left), exhaling with sharp double breath.',
        repetitions: '30 double punches on focus mitts x 3 sets'
      },
      {
        title: 'Standing Foot Pivot Repetitions',
        description: 'Hold partner’s shoulder or barre; practice pivoting supporting foot 135° while opening hip for Dollyo Chagi.',
        repetitions: '15 pivots per side x 3 sets'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Bending the back knee in Ap Koobi, causing unstable stance and loss of rear drive.',
        correction: 'Drive the rear heel firmly into the floor and lock the back knee completely straight.'
      },
      {
        mistake: 'Swinging Momtong An Makgi past the body centerline.',
        correction: 'Stop the block exactly at the centerline so your shoulder protects your chest.'
      },
      {
        mistake: 'Failing to pivot the supporting foot on Dollyo Chagi, leading to groin strain and weak kicks.',
        correction: 'Rotate the base foot heel forward towards the target before extending the kicking leg.'
      }
    ],
    stances: ['Ap Koobi (Forward Long Stance)', 'Ap Seogi', 'Naranhi Seogi'],
    blocks: ['Momtong An Makgi (Middle Inward Block)'],
    strikes: ['Momtong Du-beon Jireugi (Double Middle Punch)'],
    kicks: ['Ap Chagi with high knee chamber', 'Introductory Dollyo Chagi mechanics'],
    poomsaeRequired: 'Taegeuk 1 Jang (First 8 steps)',
    keyPoints: [
      'In Ap Koobi, 70% of body weight rests on the front bent knee.',
      'Double punch requires two distinct sharp exhalations and hip recoils.',
      'Keep eyes focused forward on target at eye level.'
    ],
    terminology: [
      { koreanHangul: '앞굽이', romanized: 'Ap Koobi', englishMeaning: 'Forward Long Stance', category: 'Stance', technicalCues: 'Front knee directly above heel, rear foot angled at 30° outward.', urdu: 'لمبا آگے کا قدم', arabic: 'وقفة أمامية طويلة' },
      { koreanHangul: '몸통안막기', romanized: 'Momtong An Makgi', englishMeaning: 'Middle Inward Block', category: 'Block', technicalCues: 'Hand travels from outside rear to shoulder center line.', urdu: 'درمیانی اندرونی بلاک', arabic: 'صد داخلي للوسط' }
    ],
    quiz: [
      {
        question: 'How is body weight distributed in Ap Koobi (Forward Long Stance)?',
        options: ['50% front / 50% back', '70% front / 30% back', '30% front / 70% back', '100% on rear leg'],
        correctIndex: 1,
        explanation: 'Ap Koobi places approximately 65-70% of weight onto the front leg, maintaining stable forward drive.'
      },
      {
        question: 'What is the correct angle of the rear foot in Ap Koobi?',
        options: ['Turned completely backward at 180 degrees', 'Angled outward no more than 30 degrees', 'Perpendicular at 90 degrees', 'Directly forward at 0 degrees'],
        correctIndex: 1,
        explanation: 'The back foot should point forward-outward at approximately 30 degrees with the heel firmly on the mat.'
      },
      {
        question: 'What is the primary striking surface of a basic Dollyo Chagi (Roundhouse Kick)?',
        options: ['Ball of foot (Apchook)', 'Instep (Baldeung)', 'Knee (Mureup)', 'Heel (Dwikoomchi)'],
        correctIndex: 1,
        explanation: 'In basic Gup training and competition sparring, Dollyo Chagi primarily strikes with the instep (Baldeung).'
      },
      {
        question: 'What is the Korean term for Double Punch to the middle section?',
        options: ['Momtong Du-beon Jireugi', 'Olgool Jireugi', 'Arae Jireugi', 'Baro Jireugi'],
        correctIndex: 0,
        explanation: 'Momtong Du-beon Jireugi translates to Double Middle Section Punch.'
      },
      {
        question: 'How many steps of Taegeuk 1 Jang are typically required for 9th Gup testing?',
        options: ['The first 4 steps', 'The first 8 steps', 'All 18 steps', 'No poomsae required'],
        correctIndex: 1,
        explanation: 'Most dojang curricula test the initial 8 steps of Taegeuk 1 Jang at 9th Gup before testing the full form at 8th Gup.'
      }
    ]
  },
  {
    gupNumber: 8,
    beltName: 'Yellow Belt',
    beltColorHex: '#EAB308',
    title: '8th Gup: Earth & Germination - Yellow Belt',
    objectives: [
      'Understand the philosophical meaning of Yellow Belt (the fertile earth).',
      'Master Olgool Makgi (High Face Block) with proper deflection angle.',
      'Execute full Taegeuk 1 Jang (18 movements - Keon Trigram / Heaven).',
      'Perform clean Dollyo Chagi (Roundhouse Kick) with balance and high hip engagement.',
      'Deliver Hansonnal Mok Chigi (Single Knife-Hand Neck Strike).'
    ],
    explanation:
      'Yellow symbolizes the fertile earth from which the plant takes firm root as Taekwondo foundation is established. The student learns Taegeuk 1 Jang, representing "Keon" (Heaven, light, and the source of all life). High blocks and knife-hand strikes broaden defensive capability against aerial strikes.',
    stepByStepTechniques: [
      {
        name: 'Olgool Makgi (High Face Block)',
        koreanHangul: '얼굴막기',
        romanized: 'Olgool Makgi',
        category: 'Block',
        cues: 'One fist distance from forehead; forearm angled at 45° to deflect downward blows.',
        steps: [
          'Chamber blocking fist at opposite hip with palm facing inward.',
          'Raise fist upward in front of face along centerline.',
          'Rotate fist outward so knuckles face forehead at 45 degree upward slope.',
          'Position fist one fist-width away from center of forehead.'
        ]
      },
      {
        name: 'Hansonnal Mok Chigi (Knife-Hand Neck Strike)',
        koreanHangul: '한손날목치기',
        romanized: 'Hansonnal Mok Chigi',
        category: 'Strike',
        cues: 'Strike with outer blade of open hand; thumb tucked firmly; target is carotid artery.',
        steps: [
          'Open hand with fingers firmly pressed together and thumb bent tightly against base of index finger.',
          'Chamber open hand backward at ear level, palm facing outward.',
          'Drive hand horizontally inward aiming for the opponent’s neck with the knife-hand edge (Sonnal).'
        ]
      },
      {
        name: 'Taegeuk 1 Jang (Complete 18 Steps)',
        koreanHangul: '태극 1장',
        romanized: 'Taegeuk 1 Jang',
        category: 'Poomsae',
        cues: 'Keon Trigram (☰); start and finish at identical spot; loud Kihap on final punch.',
        steps: [
          'Step left into Ap Seogi Arae Makgi, then step into Ap Seogi Momtong Baro Jireugi.',
          'Turn right 180° into Ap Seogi Arae Makgi, then step into Ap Seogi Momtong Baro Jireugi.',
          'Advance up centerline into Ap Koobi Arae Makgi and reverse punch.',
          'Complete all 18 steps with calm rhythm and return to Joon-bi.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Taegeuk 1 Jang Flow & Precision',
        description: 'Perform Taegeuk 1 Jang 5 times without pauses, focusing on correct stance lengths and crisp blocks.',
        repetitions: '5 complete executions'
      },
      {
        title: 'High Block Deflection against Paddle',
        description: 'Partner lightly swings a soft kicking paddle downward; execute Olgool Makgi with firm 45° angle deflection.',
        repetitions: '20 deflections per arm x 3 sets'
      },
      {
        title: 'Roundhouse Kick Target Striking',
        description: 'Practice Dollyo Chagi targeting body-level kick pads with focus on foot pivot and hip commitment.',
        repetitions: '20 kicks each leg x 3 sets'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Holding Olgool Makgi flat like a roof over the head instead of sloped at 45 degrees.',
        correction: 'Angle the forearm at 45 degrees so downward blows deflect harmlessly off to the side.'
      },
      {
        mistake: 'Letting the thumb stick out during Hansonnal Mok Chigi, risking severe thumb dislocation.',
        correction: 'Tuck the thumb firmly against the palm side of the hand.'
      },
      {
        mistake: 'Rushing through Taegeuk 1 Jang without holding each stance for 1 full breath.',
        correction: 'Pace each movement cleanly: block, breathe, step, strike.'
      }
    ],
    stances: ['Ap Koobi', 'Ap Seogi', 'Naranhi Seogi'],
    blocks: ['Olgool Makgi (High Face Block)', 'Arae Makgi', 'Momtong An Makgi'],
    strikes: ['Momtong Baro Jireugi', 'Hansonnal Mok Chigi (Knife-Hand Neck Strike)'],
    kicks: ['Dollyo Chagi (Roundhouse Kick with instep)'],
    poomsaeRequired: 'Taegeuk 1 Jang (Complete 18 movements - Keon Trigram)',
    keyPoints: [
      'High block fist sits one fist above forehead at a 45° angle.',
      'Dollyo Chagi requires minimum 135° pivot on the supporting heel.',
      'Return to exact starting coordinate upon completion of Taegeuk 1.'
    ],
    terminology: [
      { koreanHangul: '얼굴막기', romanized: 'Olgool Makgi', englishMeaning: 'High Face Block', category: 'Block', technicalCues: 'One fist distance from forehead, forearm sloped at 45° angle.', urdu: 'چہرے کا اونچا بلاک', arabic: 'صد الوجه العلوي' },
      { koreanHangul: '돌려차기', romanized: 'Dollyo Chagi', englishMeaning: 'Roundhouse Kick', category: 'Kick', technicalCues: 'Pivot standing heel forward, snap hip and strike with instep (Baldeung).', urdu: 'گھومنے والی گول کک', arabic: 'ركلة دائرية' }
    ],
    quiz: [
      {
        question: 'What trigram element corresponds to Taegeuk 1 Jang?',
        options: ['Water (Gam)', 'Heaven & Sky (Keon)', 'Fire (Ri)', 'Earth (Gon)'],
        correctIndex: 1,
        explanation: 'Taegeuk 1 Jang represents Keon (Heaven/Sky), symbolizing the origin of all creation.'
      },
      {
        question: 'What angle should the forearm form during a proper high face block (Olgool Makgi)?',
        options: ['Completely flat at 0 degrees', 'Sloped at approximately 45 degrees', 'Vertical at 90 degrees', 'Pointed straight down'],
        correctIndex: 1,
        explanation: 'A 45-degree angle deflects descending strikes safely away rather than absorbing the full force directly.'
      },
      {
        question: 'How many total movements are in Taegeuk 1 Jang?',
        options: ['14 movements', '18 movements', '20 movements', '24 movements'],
        correctIndex: 1,
        explanation: 'Taegeuk 1 Jang consists of 18 distinct counted movements.'
      },
      {
        question: 'What is the correct hand formation for a knife-hand strike (Sonnal)?',
        options: ['Loose fingers with thumb sticking outward', 'Fingers joined tight with thumb tucked firmly against palm edge', 'Fingers spread wide', 'Clenched fist with thumb outside'],
        correctIndex: 1,
        explanation: 'Fingers must be pressed together with the thumb tucked firmly to prevent injury and create a rigid striking blade.'
      },
      {
        question: 'On which movement of Taegeuk 1 Jang is the martial shout (Kihap) executed?',
        options: ['Movement 1', 'Movement 9', 'The final 18th movement', 'Every movement'],
        correctIndex: 2,
        explanation: 'The Kihap in Taegeuk 1 Jang is voiced on the final 18th movement (forward long stance punch).'
      }
    ]
  },
  {
    gupNumber: 7,
    beltName: 'Yellow Belt with Green Stripe',
    beltColorHex: '#EAB308',
    stripeColorHex: '#16A34A',
    title: '7th Gup: Strengthening the Seedling - Green Stripe',
    objectives: [
      'Understand the philosophical meaning of Taegeuk 2 Jang (Tae Trigram / Lake).',
      'Execute high punches (Olgool Jireugi) targeting the philtrum (Injung).',
      'Master the combination of Ap Chagi into immediate high punch.',
      'Complete all 18 movements of Taegeuk 2 Jang with serenity and inner strength.',
      'Refine sparring distance awareness and bounce timing.'
    ],
    explanation:
      'The green stripe represents the budding green shoot emerging from the yellow soil. Taegeuk 2 Jang corresponds to "Tae", representing a peaceful lake: serene and calm on the surface, yet containing vast power and steadfastness underneath. The student develops controlled breathing and coordinated combinations.',
    stepByStepTechniques: [
      {
        name: 'Olgool Jireugi (High Section Punch)',
        koreanHangul: '얼굴지르기',
        romanized: 'Olgool Jireugi',
        category: 'Strike',
        cues: 'Target is the philtrum (space beneath nose); straight linear trajectory from hip.',
        steps: [
          'Chamber fist at hip with knuckles down.',
          'Drive punch straight upward-forward towards opponent’s eye/nose level.',
          'Rotate 180° at moment of contact, maintaining upright spine without leaning backward.'
        ]
      },
      {
        name: 'Ap Chagi into Olgool Jireugi Combination',
        koreanHangul: '앞차고 얼굴지르기',
        romanized: 'Ap Chagi - Olgool Jireugi',
        category: 'Poomsae',
        cues: 'Deliver front kick, recoil, land in deep Ap Koobi, and strike high punch simultaneously with foot landing.',
        steps: [
          'Chamber and execute Ap Chagi with rear leg.',
          'Recoil kicking foot sharply while driving hips forward.',
          'Land forward in Ap Koobi; the punch impact must synchronize exactly as front foot touches mat.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Taegeuk 2 Jang Rhythm Practice',
        description: 'Perform Taegeuk 2 Jang focusing on the contrast between calm walking stance and deep forward stances.',
        repetitions: '4 full repetitions'
      },
      {
        title: 'Kick-to-Punch Coordination Drill',
        description: 'Execute front kick against paddle, step down into long stance, and fire instant high punch.',
        repetitions: '15 repetitions each leg x 3 sets'
      },
      {
        title: 'Focus Mitt Head Level Punching',
        description: 'Practice high punches on focus mitts maintaining wrist alignment without bending upward.',
        repetitions: '25 high punches each arm'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Punching too early before the front foot plants down during the kick-punch combo.',
        correction: 'Time the punch impact to lock in precisely as the front heel makes contact with the floor.'
      },
      {
        mistake: 'Leaning the torso backward to punch higher at face level.',
        correction: 'Keep the spine vertical and engage core muscles to drive the punch forward.'
      },
      {
        mistake: 'Confusing Taegeuk 1 and Taegeuk 2 opening movements.',
        correction: 'Remember that Taegeuk 2 steps forward into Ap Koobi right after the first low block.'
      }
    ],
    stances: ['Ap Seogi', 'Ap Koobi'],
    blocks: ['Olgool Makgi', 'Momtong An Makgi', 'Arae Makgi'],
    strikes: ['Olgool Jireugi (High Punch)', 'Momtong Bandae Jireugi'],
    kicks: ['Ap Chagi followed immediately by Olgool Jireugi'],
    poomsaeRequired: 'Taegeuk 2 Jang (18 movements - Tae Trigram: Lake)',
    keyPoints: [
      'Taegeuk 2 emphasizes gentle exterior movement backed by inner steel.',
      'Coordinate punch impact with the landing of the kicking foot.',
      'Keep eyes focused on the opponent’s eye level throughout.'
    ],
    terminology: [
      { koreanHangul: '얼굴지르기', romanized: 'Olgool Jireugi', englishMeaning: 'High Punch', category: 'Strike', technicalCues: 'Target is the philtrum (Injung), straight trajectory from hip.', urdu: 'چہرے پر سیدھا گھونسہ', arabic: 'لكمة للوجه' },
      { koreanHangul: '태극 2장', romanized: 'Taegeuk 2 Jang', englishMeaning: 'Taegeuk Form 2 (Lake)', category: 'Poomsae', technicalCues: 'Calm mind, steady breath, joyfulness in execution.', urdu: 'تائیکوانڈو فارم 2', arabic: 'بومسي تايجوك 2' }
    ],
    quiz: [
      {
        question: 'What natural element does Taegeuk 2 Jang symbolize?',
        options: ['Thunder', 'Lake / Calm Joyfulness', 'Wind', 'Fire'],
        correctIndex: 1,
        explanation: 'Taegeuk 2 represents Tae (Lake), symbolizing inner serenity and resolute inner strength.'
      },
      {
        question: 'What is the primary target for an Olgool Jireugi (High Punch)?',
        options: ['Solar plexus', 'The philtrum (under the nose)', 'The kneecap', 'The groin'],
        correctIndex: 1,
        explanation: 'Olgool Jireugi targets the facial midline, specifically the philtrum (Injung).'
      },
      {
        question: 'How should the kick and punch be timed in Taegeuk 2 Jang?',
        options: ['Punch before kicking', 'Punch lands in the air while foot is kicking', 'Punch impacts simultaneously as front foot lands in Ap Koobi', 'Kick, wait 3 seconds, then punch'],
        correctIndex: 2,
        explanation: 'Power is maximized when the punch connects precisely as the stepping foot anchors to the floor.'
      },
      {
        question: 'How many counted movements are in Taegeuk 2 Jang?',
        options: ['16 movements', '18 movements', '20 movements', '22 movements'],
        correctIndex: 1,
        explanation: 'Taegeuk 2 Jang has exactly 18 movements ending with a final punch and Kihap.'
      },
      {
        question: 'What does the green stripe on the yellow belt signify?',
        options: ['End of martial journey', 'Sprouting of the seedling towards green belt', 'Master rank', 'Referee certification'],
        correctIndex: 1,
        explanation: 'The green stripe signifies the initial sprouting of the plant, bridging basic foundation into flourishing skill.'
      }
    ]
  },
  {
    gupNumber: 6,
    beltName: 'Green Belt',
    beltColorHex: '#16A34A',
    title: '6th Gup: The Sprouting Plant - Green Belt',
    objectives: [
      'Understand the philosophical meaning of Green Belt (growing plant flourishing).',
      'Master Dwit Koobi (Back Stance / L-Stance) with 70% rear weight distribution.',
      'Execute Sonnal Mok Chigi (Knife-Hand Neck Strike) and Hansonnal Yeop Makgi.',
      'Perform all 20 movements of Taegeuk 3 Jang (Ri Trigram / Fire).',
      'Learn the chambering and balance mechanics for Yeop Chagi (Side Kick).'
    ],
    explanation:
      'Green represents the plant’s growth as Taekwondo skill begins to develop rapidly. Taegeuk 3 Jang symbolizes "Ri" (Fire and Sun), bringing warmth, passion, and light. The introduction of Dwit Koobi (Back Stance) and knife-hand strikes adds sophisticated defensive counter-postures.',
    stepByStepTechniques: [
      {
        name: 'Dwit Koobi (Back L-Stance)',
        koreanHangul: '뒷굽이',
        romanized: 'Dwit Koobi',
        category: 'Stance',
        cues: 'Feet form 90° angle; heels align; 70% weight on back bent leg; 30% front leg.',
        steps: [
          'Position feet perpendicular forming a 90-degree "L" shape with heels on a shared line.',
          'Bend back knee deeply, placing 70% of total body weight over rear foot.',
          'Bend front knee slightly with 30% weight, ready to kick immediately.',
          'Keep torso upright and turned 45 degrees to minimize target profile.'
        ]
      },
      {
        name: 'Hansonnal Momtong Yeop Makgi (Knife-Hand Side Block)',
        koreanHangul: '한손날몸통옆막기',
        romanized: 'Hansonnal Yeop Makgi',
        category: 'Block',
        cues: 'Chamber open knifehand behind shoulder; block torso attack with knife-blade edge.',
        steps: [
          'Chamber open hand backward at ear level, other fist at opposite hip.',
          'Execute block in Dwit Koobi, positioning the blade of the hand vertically aligned with torso centerline.'
        ]
      },
      {
        name: 'Yeop Chagi (Side Kick Fundamentals)',
        koreanHangul: '옆차기',
        romanized: 'Yeop Chagi',
        category: 'Kick',
        cues: 'Chamber knee to chest; pivot base foot 180°; thrust foot-blade (Balnal) horizontally.',
        steps: [
          'Lift kicking knee toward opposite armpit while turning base foot 180 degrees.',
          'Lock ankle so the knife-edge of the foot (Balnal) points horizontal.',
          'Thrust leg in straight line, engaging glute and hip abductors.',
          'Recoil knee along the same linear path before landing.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Dwit Koobi Weight Shifting Drills',
        description: 'Transition between Ap Koobi and Dwit Koobi across the mat, checking 70/30 weight balance.',
        repetitions: '15 stance shifts x 3 sets'
      },
      {
        title: 'Taegeuk 3 Jang Fire Rhythm',
        description: 'Execute Taegeuk 3 Jang with explosive double punches and sharp knife-hand strikes.',
        repetitions: '4 full executions'
      },
      {
        title: 'Side Kick Bar Hold & Extension',
        description: 'Hold barre or wall; extend side kick slowly, hold 3 seconds at hip level, and recoil cleanly.',
        repetitions: '12 holds per leg x 3 sets'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting too much weight on the front foot in Dwit Koobi, ruining the defensive advantage.',
        correction: 'Sit back so 70% of your weight is loaded on the rear hip and heel.'
      },
      {
        mistake: 'Turning Yeop Chagi into an angled roundhouse kick by not pivoting the base foot 180 degrees.',
        correction: 'Fully pivot the base heel towards the target to allow linear side-kick thrust.'
      },
      {
        mistake: 'Dropping the reaction fist during Sonnal Mok Chigi.',
        correction: 'Pull reaction fist firmly to opposite hip with palm facing up.'
      }
    ],
    stances: ['Dwit Koobi (Back Stance)', 'Ap Koobi', 'Ap Seogi'],
    blocks: ['Hansonnal Momtong Yeop Makgi', 'Arae Makgi'],
    strikes: ['Sonnal Mok Chigi', 'Momtong Du-beon Jireugi'],
    kicks: ['Yeop Chagi (Side Kick with Balnal blade)', 'Ap Chagi'],
    poomsaeRequired: 'Taegeuk 3 Jang (20 movements - Ri Trigram: Fire)',
    keyPoints: [
      'In Dwit Koobi, 70% of weight is on the rear leg and feet form a 90° angle.',
      'Side kick requires striking with the knife-blade of the foot (Balnal).',
      'Taegeuk 3 consists of 20 movements reflecting the energy of Fire.'
    ],
    terminology: [
      { koreanHangul: '뒷굽이', romanized: 'Dwit Koobi', englishMeaning: 'Back Stance (L-Stance)', category: 'Stance', technicalCues: '70% weight on rear foot, 30% front foot, perpendicular heel alignment.', urdu: 'پچھلا دفاعی موقف', arabic: 'وقفة خلفية' },
      { koreanHangul: '손날목치기', romanized: 'Sonnal Mok Chigi', englishMeaning: 'Knife-Hand Neck Strike', category: 'Strike', technicalCues: 'Striking with the lateral edge of open hand (Balnal/Sonnal).', urdu: 'ہتھیلی کے کنارے سے گردن پر وار', arabic: 'ضربة السيف للرقبة' }
    ],
    quiz: [
      {
        question: 'What percentage of body weight rests on the back leg in Dwit Koobi (Back Stance)?',
        options: ['50%', '30%', '70%', '90%'],
        correctIndex: 2,
        explanation: 'Dwit Koobi distributes 70% on the rear bent leg and 30% on the front leg.'
      },
      {
        question: 'What trigram element is represented in Taegeuk 3 Jang?',
        options: ['Water', 'Fire & Sun (Ri)', 'Earth', 'Heaven'],
        correctIndex: 1,
        explanation: 'Taegeuk 3 Jang symbolizes Ri (Fire), which brings warmth, enthusiasm, and controlled power.'
      },
      {
        question: 'What is the primary striking tool for a classical Yeop Chagi (Side Kick)?',
        options: ['Instep', 'Toes', 'Knife-blade of foot (Balnal)', 'Knee'],
        correctIndex: 2,
        explanation: 'Yeop Chagi strikes with Balnal (the foot blade) or Dwikoomchi (the heel).'
      },
      {
        question: 'How many counted movements are in Taegeuk 3 Jang?',
        options: ['18 movements', '20 movements', '22 movements', '24 movements'],
        correctIndex: 1,
        explanation: 'Taegeuk 3 Jang consists of exactly 20 counted movements.'
      },
      {
        question: 'What does the Green Belt signify in Taekwondo progression?',
        options: ['Danger and power', 'The growth of the plant as skills begin to develop', 'Master teacher status', 'Innocence of beginner'],
        correctIndex: 1,
        explanation: 'Green signifies the plant sprouting and growing as Taekwondo capability strengthens.'
      }
    ]
  },
  {
    gupNumber: 5,
    beltName: 'Green Belt with Blue Stripe',
    beltColorHex: '#16A34A',
    stripeColorHex: '#2563EB',
    title: '5th Gup: Thunderous Elevation - Blue Stripe',
    objectives: [
      'Master Taegeuk 4 Jang (20 movements - Jin Trigram / Thunder).',
      'Execute Sonnal Momtong Makgi (Double Knife-Hand Middle Block).',
      'Perform Jebipoom Mok Chigi (Swallow Neck Strike with simultaneous High Block).',
      'Execute Pyonsonkkeut Sewo Jireugi (Spear-Finger Thrust with elbow support).',
      'Deliver penetrating Yeop Chagi with hip rotation and recoil.'
    ],
    explanation:
      'The blue stripe on green reflects the growing tree reaching up towards the boundless blue sky. Taegeuk 4 Jang corresponds to "Jin" (Thunder), representing dignity, awe-inspiring power, and overcoming fear. Complex multi-directional techniques like spear-fingers and double knife-hands are mastered.',
    stepByStepTechniques: [
      {
        name: 'Sonnal Momtong Makgi (Double Knife-Hand Middle Block)',
        koreanHangul: '손날몸통막기',
        romanized: 'Sonnal Momtong Makgi',
        category: 'Block',
        cues: 'Both hands open in knife-hand shape; rear hand protects solar plexus; lead hand blocks side attack.',
        steps: [
          'Chamber both knife-hands behind rear shoulder with palms facing away.',
          'Step into Dwit Koobi while driving lead knife-hand to chest center and rear knife-hand to solar plexus.'
        ]
      },
      {
        name: 'Jebipoom Mok Chigi (Swallow Neck Strike)',
        koreanHangul: '제비품목치기',
        romanized: 'Jebipoom Mok Chigi',
        category: 'Strike',
        cues: 'Simultaneous high knife-hand block and forward knife-hand neck strike in Ap Koobi.',
        steps: [
          'Chamber lead open hand at opposite hip, rear open hand near shoulder.',
          'Step into Ap Koobi: lead hand executes high face block while rear hand delivers knife-hand strike to neck.'
        ]
      },
      {
        name: 'Pyonsonkkeut Sewo Jireugi (Spear-Finger Thrust)',
        koreanHangul: '편손끝세워찌르기',
        romanized: 'Pyonsonkkeut Jireugi',
        category: 'Strike',
        cues: 'Three fingertips aligned vertically; supporting palm placed flat under striking elbow.',
        steps: [
          'Align index, middle, and ring fingers rigid and straight with thumb tucked.',
          'Thrust forward straight into opponent’s solar plexus while placing supporting palm under elbow.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Taegeuk 4 Jang Power and Pause',
        description: 'Execute Taegeuk 4 Jang with deliberate pauses on Sonnal Makgi and explosive delivery on spear fingers.',
        repetitions: '4 full executions'
      },
      {
        title: 'Jebipoom Coordination Drill',
        description: 'Advance in Ap Koobi executing continuous Jebipoom Mok Chigi left and right.',
        repetitions: '20 steps x 3 sets'
      },
      {
        title: 'Side Kick Power on Shield',
        description: 'Throw full power Yeop Chagi onto heavy kick shield held by partner, focusing on Balnal contact.',
        repetitions: '15 kicks per leg x 3 sets'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Failing to support the elbow with the opposite palm during Pyonsonkkeut Jireugi.',
        correction: 'Place the supporting open palm directly underneath the striking elbow to reinforce the joint.'
      },
      {
        mistake: 'Executing the block and strike sequentially instead of simultaneously in Jebipoom Mok Chigi.',
        correction: 'Both arms must reach full extension at the exact same split-second.'
      },
      {
        mistake: 'Allowing the fingers to bend backward on spear-finger thrust.',
        correction: 'Keep fingers rigid and strike strictly with the tips, reinforced by tense wrist tendons.'
      }
    ],
    stances: ['Dwit Koobi', 'Ap Koobi'],
    blocks: ['Sonnal Momtong Makgi (Double Knife-Hand Middle Block)', 'Momtong Bakkat Makgi'],
    strikes: ['Pyonsonkkeut Sewo Jireugi', 'Jebipoom Mok Chigi'],
    kicks: ['Yeop Chagi (Side Kick)', 'Ap Chagi'],
    poomsaeRequired: 'Taegeuk 4 Jang (20 movements - Jin Trigram: Thunder)',
    keyPoints: [
      'Double knife-hand block requires rear palm guarding the solar plexus.',
      'Spear finger thrust requires supporting hand under the striking elbow.',
      'Taegeuk 4 Jang embodies the explosive dignity of thunder.'
    ],
    terminology: [
      { koreanHangul: '제비품목치기', romanized: 'Jebipoom Mok Chigi', englishMeaning: 'Swallow Neck Strike', category: 'Strike', technicalCues: 'Simultaneous Hansonnal Olgool Makgi and Sonnal Mok Chigi.', urdu: 'ابابیل کی گردن پر ضرب', arabic: 'ضربة السنونو للرقبة' },
      { koreanHangul: '편손끝찌르기', romanized: 'Pyonsonkkeut Jireugi', englishMeaning: 'Spear Fingertip Thrust', category: 'Strike', technicalCues: 'Supporting palm under elbow, fingers rigid aiming for solar plexus.', urdu: 'انگلیوں کے سرے سے نیزہ وار', arabic: 'طعنة أطراف الأصابع' }
    ],
    quiz: [
      {
        question: 'What trigram element is represented by Taegeuk 4 Jang?',
        options: ['Jin (Thunder)', 'Gam (Water)', 'Gon (Earth)', 'Seon (Wind)'],
        correctIndex: 0,
        explanation: 'Taegeuk 4 Jang represents Jin (Thunder), which commands awe and inspires fearless courage.'
      },
      {
        question: 'Where is the supporting hand placed during Pyonsonkkeut Sewo Jireugi (Spear-Finger Thrust)?',
        options: ['Behind the back', 'Underneath the striking elbow', 'On top of the head', 'At the hip'],
        correctIndex: 1,
        explanation: 'The supporting open palm is placed flat beneath the elbow of the thrusting arm for joint stabilization.'
      },
      {
        question: 'Which two techniques occur simultaneously in Jebipoom Mok Chigi?',
        options: ['Low block and high punch', 'Knife-hand high block and knife-hand neck strike', 'Middle punch and front kick', 'Double low block'],
        correctIndex: 1,
        explanation: 'Jebipoom Mok Chigi coordinates an open high block and an inward knife-hand neck strike at the same instant.'
      },
      {
        question: 'In Sonnal Momtong Makgi, what does the rear hand protect?',
        options: ['The kneecap', 'The solar plexus (Momtong)', 'The back of the head', 'The groin'],
        correctIndex: 1,
        explanation: 'The rear knife-hand rests palm-up in front of the solar plexus to guard against center attacks.'
      },
      {
        question: 'How many counted movements make up Taegeuk 4 Jang?',
        options: ['18 movements', '20 movements', '22 movements', '25 movements'],
        correctIndex: 1,
        explanation: 'Taegeuk 4 Jang consists of 20 counted movements.'
      }
    ]
  },
  {
    gupNumber: 4,
    beltName: 'Blue Belt',
    beltColorHex: '#2563EB',
    title: '4th Gup: Sky & Maturing Power - Blue Belt',
    objectives: [
      'Understand the philosophical meaning of Blue Belt (the sky towards which the tree reaches).',
      'Master Taegeuk 5 Jang (20 movements - Seon Trigram / Wind).',
      'Execute Me Jumeok Naeryo Chigi (Downward Hammer-Fist Strike).',
      'Perform Palkoop Dollyo Chigi (Turning Elbow Strike) and Palkoop Pyojeok Chigi (Target Elbow Strike).',
      'Execute Dwit Chagi (Turning Back Kick) with linear driving force and heel contact.'
    ],
    explanation:
      'Blue symbolizes the sky and high heavens towards which the maturing tree reaches. Taegeuk 5 Jang represents "Seon" (Wind), which can be gentle like a spring breeze or furious like a typhoon. The student incorporates powerful close-quarter elbow and hammer-fist strikes alongside the formidable Dwit Chagi (Back Kick).',
    stepByStepTechniques: [
      {
        name: 'Me Jumeok Naeryo Chigi (Hammer-Fist Strike)',
        koreanHangul: '메주먹내려치기',
        romanized: 'Me Jumeok Naeryo Chigi',
        category: 'Strike',
        cues: 'Strike downward with bottom fleshy base of clenched fist; target is bridge of nose or collarbone.',
        steps: [
          'Raise clenched fist high above head alongside ear.',
          'Drive fist downward vertically with snapping elbow extension onto target.'
        ]
      },
      {
        name: 'Palkoop Dollyo Chigi (Turning Elbow Strike)',
        koreanHangul: '팔굽돌려치기',
        romanized: 'Palkoop Dollyo Chigi',
        category: 'Strike',
        cues: 'Rotate torso violently; point elbow apex directly through target jaw level.',
        steps: [
          'Fold striking arm tightly with fist on chest.',
          'Rotate hips and shoulders aggressively, driving the bony point of the elbow horizontally across target.'
        ]
      },
      {
        name: 'Dwit Chagi (Turning Back Kick)',
        koreanHangul: '뒤차기',
        romanized: 'Dwit Chagi',
        category: 'Kick',
        cues: 'Look over shoulder; keep knees brushing close together; thrust heel straight back like a mule.',
        steps: [
          'Turn body 180° away from opponent while looking over the kicking shoulder.',
          'Chamber kicking knee straight up to chest, keeping knees tightly together.',
          'Drive heel straight back linearly with toes pointed down.',
          'Retract leg along identical path before planting forward or back.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Taegeuk 5 Jang Wind Dynamics',
        description: 'Perform Taegeuk 5 Jang focusing on fluid transitions into hammer-fist and elbow target strikes.',
        repetitions: '4 full executions'
      },
      {
        title: 'Dwit Chagi Linear Shield Driving',
        description: 'Partner holds heavy kicking shield at body level; throw 20 turning back kicks per leg focusing on heel impact.',
        repetitions: '20 kicks each leg x 3 sets'
      },
      {
        title: 'Elbow Strike Combinations on Mitts',
        description: 'Practice turning elbow strike followed immediately by target elbow strike against open palm.',
        repetitions: '20 sets per side'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Flaring the knee outward on Dwit Chagi, turning it into an ineffective round kick.',
        correction: 'Keep the knees tightly touching during chamber to guarantee a straight linear thrust.'
      },
      {
        mistake: 'Failing to look over the shoulder before kicking in Dwit Chagi.',
        correction: 'Turn head first to acquire visual target before launching the kick.'
      },
      {
        mistake: 'Striking with the side of the fist rather than the bottom fleshy heel in Me Jumeok.',
        correction: 'Impact strictly with the bottom base of the clenched fist (the hammer base).'
      }
    ],
    stances: ['Kyocha Seogi (Cross Stance)', 'Dwit Koobi', 'Ap Koobi'],
    blocks: ['Arae Makgi', 'Momtong Makgi'],
    strikes: ['Me Jumeok Naeryo Chigi', 'Palkoop Dollyo Chagi', 'Palkoop Pyojeok Chigi'],
    kicks: ['Dwit Chagi (Turning Back Kick with heel impact)', 'Ap Chagi'],
    poomsaeRequired: 'Taegeuk 5 Jang (20 movements - Seon Trigram: Wind)',
    keyPoints: [
      'Dwit Chagi drives the heel straight back with knees rubbing together.',
      'Wind can be flexible and calm, or devastating like a typhoon.',
      'Cross stance (Kyocha Seogi) requires balance on the ball of the rear foot.'
    ],
    terminology: [
      { koreanHangul: '뒤차기', romanized: 'Dwit Chagi', englishMeaning: 'Back Kick', category: 'Kick', technicalCues: 'Look over kicking shoulder, thrust heel straight without flaring knee.', urdu: 'پیچھے کی طرف زوردار کک', arabic: 'ركلة خلفية مستقيمة' },
      { koreanHangul: '팔굽돌려치기', romanized: 'Palkoop Dollyo Chagi', englishMeaning: 'Elbow Turning Strike', category: 'Strike', technicalCues: 'Rotate torso violently, strike jaw with elbow apex.', urdu: 'گھومتی ہوئی کہنی کا وار', arabic: 'ضربة الكوع الدائرية' }
    ],
    quiz: [
      {
        question: 'What trigram element represents Taegeuk 5 Jang?',
        options: ['Seon (Wind)', 'Ri (Fire)', 'Keon (Heaven)', 'Gam (Water)'],
        correctIndex: 0,
        explanation: 'Taegeuk 5 Jang symbolizes Seon (Wind), alternating between gentle breeze and fierce storm.'
      },
      {
        question: 'Why must the knees rub close together when chambering for Dwit Chagi (Back Kick)?',
        options: ['To spin faster in circles', 'To ensure a straight linear thrust and prevent flaring outward', 'To jump higher', 'It is not necessary'],
        correctIndex: 1,
        explanation: 'Keeping knees close prevents the kick from becoming a sweeping arc, maximizing linear penetrative force.'
      },
      {
        question: 'What part of the foot strikes the target in a proper Dwit Chagi?',
        options: ['Toes', 'Instep', 'Heel (Dwikoomchi)', 'Knee'],
        correctIndex: 2,
        explanation: 'Dwit Chagi strikes with the flat bottom or edge of the heel (Dwikoomchi).'
      },
      {
        question: 'What stance is introduced in Taegeuk 5 Jang where one foot crosses over the other?',
        options: ['Beom Seogi', 'Kyocha Seogi (Cross Stance)', 'Hakdari Seogi', 'Juchum Seogi'],
        correctIndex: 1,
        explanation: 'Kyocha Seogi (Cross Stance) is introduced in Taegeuk 5 Jang.'
      },
      {
        question: 'What does the Blue Belt symbolize in Taekwondo?',
        options: ['The blood of combat', 'The heavens/sky toward which the tree grows', 'Earth and soil', 'Pure innocence'],
        correctIndex: 1,
        explanation: 'Blue signifies the sky towards which the growing tree reaches as martial proficiency matures.'
      }
    ]
  },
  {
    gupNumber: 3,
    beltName: 'Blue Belt with Red Stripe',
    beltColorHex: '#2563EB',
    stripeColorHex: '#DC2626',
    title: '3rd Gup: River & Adaptability - Red Stripe',
    objectives: [
      'Understand the philosophical meaning of Taegeuk 6 Jang (Gam Trigram / Water).',
      'Master Arae Hecho Makgi (Low Wedge Block) and Hansonnal Olgool Bakkat Makgi.',
      'Execute continuous fluid roundhouse kicking combinations.',
      'Perform introductory Dwi Huryeo Chagi (Spinning Hook Kick) mechanics.',
      'Complete all 19 movements of Taegeuk 6 Jang with effortless flow.'
    ],
    explanation:
      'The red stripe warns that the student is nearing dangerous fighting competence. Taegeuk 6 Jang symbolizes "Gam" (Water): fluid, adaptable, and unrelenting. Water never argues with an obstacle; it flows around it, yet through continuous persistence, it carves through stone. The practitioner learns to adapt to any combat rhythm.',
    stepByStepTechniques: [
      {
        name: 'Hansonnal Olgool Bakkat Makgi (High Knife-Hand Outer Block)',
        koreanHangul: '한손날얼굴바깥막기',
        romanized: 'Hansonnal Olgool Bakkat Makgi',
        category: 'Block',
        cues: 'Chamber across body; sweep open knife-hand outward to temple level.',
        steps: [
          'Chamber open hand from opposite hip across chest.',
          'Sweep forearm outward to temple level, palm facing forward-outward.'
        ]
      },
      {
        name: 'Arae Hecho Makgi (Low Wedge Block)',
        koreanHangul: '아래헤쳐막기',
        romanized: 'Arae Hecho Makgi',
        category: 'Block',
        cues: 'Cross forearms in front of solar plexus; sweep both downward-outward simultaneously.',
        steps: [
          'Cross both fists in front of chest, right arm outside.',
          'Sweep both arms downward diagonally to sides, halting 2 fist-widths outside each thigh.'
        ]
      },
      {
        name: 'Dwi Huryeo Chagi (Spinning Hook Kick Intro)',
        koreanHangul: '뒤후려차기',
        romanized: 'Dwi Huryeo Chagi',
        category: 'Kick',
        cues: '360° spin; look at target; whip heel across face level with knee flexion.',
        steps: [
          'Spin 180° away, spot target over shoulder.',
          'Extend leg slightly to the side of target, then whip heel horizontally across face by flexing knee.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Taegeuk 6 Jang Water Flow Sequence',
        description: 'Execute Taegeuk 6 Jang continuously without hesitating between blocks and kicks.',
        repetitions: '4 full executions'
      },
      {
        title: 'Spinning Hook Kick Rotation Drills',
        description: 'Practice spotting and spinning 360 degrees to strike head-level target with heel.',
        repetitions: '15 kicks per leg x 3 sets'
      },
      {
        title: 'Fluid Roundhouse Combination Combos',
        description: 'Double roundhouse kicking on paddles without setting kicking foot down between strikes.',
        repetitions: '20 double kicks per leg'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Pausing robotically between movements in Taegeuk 6 Jang.',
        correction: 'Transition seamlessly from block into kick like flowing water.'
      },
      {
        mistake: 'Failing to whip the knee on Dwi Huryeo Chagi, resulting in a slow stiff-legged swing.',
        correction: 'Bend and snap the knee sharply through the target to generate whipping speed.'
      },
      {
        mistake: 'Flaring elbows outward during Arae Hecho Makgi.',
        correction: 'Sweep forearms firmly downward along the body contour.'
      }
    ],
    stances: ['Naranhi Seogi', 'Ap Koobi', 'Dwit Koobi'],
    blocks: ['Hansonnal Olgool Bakkat Makgi', 'Arae Hecho Makgi'],
    strikes: ['Momtong Bandae Jireugi'],
    kicks: ['Dollyo Chagi combo into high Ap Chagi', 'Dwi Huryeo Chagi (Spinning Hook Kick)'],
    poomsaeRequired: 'Taegeuk 6 Jang (19 movements - Gam Trigram: Water)',
    keyPoints: [
      'Water flows around all obstacles with effortless adaptability.',
      'Low wedge block opens both arms simultaneously to deflect double low attacks.',
      'Maintain strong core stability on circular kicking landings.'
    ],
    terminology: [
      { koreanHangul: '뒤후려차기', romanized: 'Dwi Huryeo Chagi', englishMeaning: 'Spinning Hook Kick', category: 'Kick', technicalCues: 'Spin 360°, whip heel through target with knee flexion.', urdu: 'گھومتی ہوئی ہک کک', arabic: 'ركلة الخطاف الخلفية' },
      { koreanHangul: '아래헤쳐막기', romanized: 'Arae Hecho Makgi', englishMeaning: 'Low Wedge Block', category: 'Block', technicalCues: 'Both arms sweep diagonally outward at 45° to block simultaneous low attacks.', urdu: 'نیچے دوہرا دفاعی بلاک', arabic: 'صد اسفيني مزدوج للأسفل' }
    ],
    quiz: [
      {
        question: 'What natural element is represented by Gam in Taegeuk 6 Jang?',
        options: ['Fire', 'Water / Flowing Adaptability', 'Earth', 'Wind'],
        correctIndex: 1,
        explanation: 'Gam symbolizes water: soft, yielding, yet possessing the power to carve through stone.'
      },
      {
        question: 'What is the purpose of Arae Hecho Makgi (Low Wedge Block)?',
        options: ['To attack the eyes', 'To block simultaneous low strikes to both flanks', 'To grab the opponent’s collar', 'To bow to the referee'],
        correctIndex: 1,
        explanation: 'Arae Hecho Makgi spreads both forearms outward to deflect simultaneous low kicks or attacks.'
      },
      {
        question: 'How many counted movements are in Taegeuk 6 Jang?',
        options: ['17 movements', '19 movements', '21 movements', '23 movements'],
        correctIndex: 1,
        explanation: 'Taegeuk 6 Jang consists of 19 counted movements.'
      },
      {
        question: 'What striking surface makes contact during Dwi Huryeo Chagi (Spinning Hook Kick)?',
        options: ['Toes', 'Back of the heel or sole (Dwikoomchi)', 'Knee', 'Shin'],
        correctIndex: 1,
        explanation: 'Dwi Huryeo Chagi strikes across the face with the back of the heel or flat bottom of the foot.'
      },
      {
        question: 'What does the red stripe on the blue belt caution the student about?',
        options: ['Injury from kicking', 'Approaching danger and the need for strict self-control', 'Lack of flexibility', 'Federation fees'],
        correctIndex: 1,
        explanation: 'Red signifies danger, reminding the advancing student that their techniques now possess lethal capability requiring deep moral restraint.'
      }
    ]
  },
  {
    gupNumber: 2,
    beltName: 'Red Belt',
    beltColorHex: '#DC2626',
    title: '2nd Gup: Danger & Self-Control - Red Belt',
    objectives: [
      'Understand the philosophical meaning of Red Belt (danger, maturity, self-restraint).',
      'Master Beom Seogi (Tiger Stance / Cat Stance) with 90% rear weight.',
      'Execute Gawi Makgi (Scissors Block) with simultaneous scissors motion.',
      'Perform Du Jumeok Jeocheo Jireugi (Double Uppercuts) and Bo Jumeok (Covered Fist).',
      'Master all 25 movements of Taegeuk 7 Jang (Gan Trigram / Mountain).'
    ],
    explanation:
      'Red signifies danger, cautioning the student to practice self-control and warning opponents of deadly capability. Taegeuk 7 Jang represents "Gan" (Mountain), symbolizing steadfast immobility, stability, and wisdom. The student masters Beom Seogi (Tiger Stance) and complex simultaneous blocks like Gawi Makgi.',
    stepByStepTechniques: [
      {
        name: 'Beom Seogi (Tiger Stance / Cat Stance)',
        koreanHangul: '범서기',
        romanized: 'Beom Seogi',
        category: 'Stance',
        cues: '90% weight on rear bent leg; front heel raised resting on ball of foot; knees squeezed inward.',
        steps: [
          'Place rear foot angled at 30 degrees, bend rear knee deeply carrying 90% of body weight.',
          'Place front foot one foot-length forward, touching floor only with the ball of the foot (Apchook).',
          'Keep knees compressed inward like a coiled spring ready to strike.'
        ]
      },
      {
        name: 'Gawi Makgi (Scissors Block)',
        koreanHangul: '가위막기',
        romanized: 'Gawi Makgi',
        category: 'Block',
        cues: 'One arm executes Arae Makgi; other arm executes Momtong Bakkat Makgi simultaneously.',
        steps: [
          'Chamber both arms crossed in front of torso.',
          'Drive lead arm into low block while trailing arm sweeps outward into middle outward block simultaneously like scissors.'
        ]
      },
      {
        name: 'Bo Jumeok (Covered Fist Ready Stance)',
        koreanHangul: '보주먹',
        romanized: 'Bo Jumeok',
        category: 'Command',
        cues: 'Left palm wraps completely around right clenched fist at solar plexus level.',
        steps: [
          'Clench right fist, place in front of chest.',
          'Wrap left open palm around the right fist, fingers covering knuckles; raise over 5 seconds.',
          'Signifies moral restraint: power governed by peaceful wisdom.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Beom Seogi Balance & Spring Drills',
        description: 'Hold Beom Seogi for 30 seconds per leg, then fire instant front snap kick without dropping heel.',
        repetitions: '10 kicks per leg x 3 sets'
      },
      {
        title: 'Taegeuk 7 Jang Mountain Precision',
        description: 'Perform Taegeuk 7 Jang focusing on immovable tiger stances and sharp scissors blocks.',
        repetitions: '4 full executions'
      },
      {
        title: 'Double Uppercut Close-Quarter Power',
        description: 'From horse stance, drive double uppercuts into focus pads targeting floating ribs.',
        repetitions: '25 double strikes x 3 sets'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting too much weight on the front foot in Beom Seogi, making it impossible to spring.',
        correction: 'Keep 90% of weight on the back leg so the front foot can lift instantly without shifting weight.'
      },
      {
        mistake: 'Executing the two arms of Gawi Makgi at different times.',
        correction: 'Both the low block and the outward middle block must snap into place at the exact same instant.'
      },
      {
        mistake: 'Letting the front heel touch the floor in Tiger Stance.',
        correction: 'Keep the front heel elevated 1-2 inches above the mat at all times.'
      }
    ],
    stances: ['Beom Seogi (Tiger Stance)', 'Juchum Seogi', 'Ap Koobi', 'Moa Seogi'],
    blocks: ['Gawi Makgi (Scissors Block)', 'Sonnal Arae Makgi', 'Mureup Kkeokki'],
    strikes: ['Du Jumeok Jeocheo Jireugi (Double Uppercut)', 'Deung Jumeok Olgool Bakkat Chigi'],
    kicks: ['Pyojeok Chagi (Target Kick with crescent foot)', 'Yeop Chagi'],
    poomsaeRequired: 'Taegeuk 7 Jang (25 movements - Gan Trigram: Mountain)',
    keyPoints: [
      'In Beom Seogi, 90% of weight is on the rear leg and front heel is raised.',
      'Gawi Makgi coordinates low block and middle block simultaneously like open scissors.',
      'Red belt commands strict self-discipline and moral humility.'
    ],
    terminology: [
      { koreanHangul: '범서기', romanized: 'Beom Seogi', englishMeaning: 'Tiger Stance (Cat Stance)', category: 'Stance', technicalCues: '90% weight rear leg, front heel raised, knees squeezed inward.', urdu: 'شیر کا پاؤں موقف', arabic: 'وقفة النمر' },
      { koreanHangul: '가위막기', romanized: 'Gawi Makgi', englishMeaning: 'Scissors Block', category: 'Block', technicalCues: 'Simultaneous Arae Makgi and Momtong Bakkat Makgi crossed like shears.', urdu: 'قینچی بلاک', arabic: 'صد المقص' },
      { koreanHangul: '보주먹', romanized: 'Bo Jumeok', englishMeaning: 'Covered Fist', category: 'Command', technicalCues: 'Right fist wrapped by left palm at chest level, symbol of martial restraint.', urdu: 'ڈھکی ہوئی مٹھی', arabic: 'القبضة المغطاة' }
    ],
    quiz: [
      {
        question: 'What is the body weight distribution in Beom Seogi (Tiger Stance)?',
        options: ['50% on both legs', '70% front / 30% back', '90% on rear leg / 10% on front ball of foot', '100% on front leg'],
        correctIndex: 2,
        explanation: 'Beom Seogi places 90% of weight onto the back bent leg, while the front foot rests lightly on the ball.'
      },
      {
        question: 'What trigram element corresponds to Taegeuk 7 Jang?',
        options: ['Gan (Mountain / Steadfastness)', 'Keon (Heaven)', 'Ri (Fire)', 'Jin (Thunder)'],
        correctIndex: 0,
        explanation: 'Taegeuk 7 represents Gan (Mountain), symbolizing majestic steadfastness and immobility.'
      },
      {
        question: 'What does Bo Jumeok (Covered Fist) symbolize in martial philosophy?',
        options: ['Ready to attack blindly', 'Moral restraint: physical power governed by peace and wisdom', 'Disrespect to the opponent', 'A secret weapon'],
        correctIndex: 1,
        explanation: 'Wrapping the left palm around the clenched right fist signifies self-control and the suppression of unprovoked violence.'
      },
      {
        question: 'How many counted movements are in Taegeuk 7 Jang?',
        options: ['20 movements', '22 movements', '25 movements', '28 movements'],
        correctIndex: 2,
        explanation: 'Taegeuk 7 Jang consists of 25 counted movements.'
      },
      {
        question: 'What does the Red Belt signify in the belt hierarchy?',
        options: ['Danger: extreme technical proficiency requiring deep self-control', 'Beginner ranking', 'Retirement from martial arts', 'Yellow belt equivalent'],
        correctIndex: 0,
        explanation: 'Red signifies danger, reminding the student of the destructive potential of their techniques and demanding supreme self-discipline.'
      }
    ]
  },
  {
    gupNumber: 1,
    beltName: 'Red Belt with Black Stripe (Cho Dan Bo)',
    beltColorHex: '#DC2626',
    stripeColorHex: '#0B0F19',
    title: '1st Gup: Black Belt Candidate (Cho Dan Bo) - Red/Black Stripe',
    objectives: [
      'Master Taegeuk 8 Jang (27 movements - Gon Trigram / Earth & Receptive Harmony).',
      'Execute Santul Makgi (Mountain Block) and Oedanteul Makgi with rigid alignment.',
      'Perform Dubal Dangsang Chagi (Double Jumping Front Kick with Kihap on 2nd kick).',
      'Execute Dangkyo Teok Jireugi (Pulling Jaw Uppercut) in Beom Seogi.',
      'Demonstrate indomitable spirit, referee knowledge, and readiness for 1st Dan Kukkiwon promotion.'
    ],
    explanation:
      'Cho Dan Bo is the sacred threshold between Gup training and Dan mastery. Taegeuk 8 Jang represents "Gon" (Pure Earth, the ultimate yin, receptivity, and completion). The practitioner integrates all previous stances, jumping kicks, and mountain blocks, preparing mind, body, and spirit for the solemn responsibility of the Black Belt.',
    stepByStepTechniques: [
      {
        name: 'Santul Makgi (Mountain Block)',
        koreanHangul: '산틀막기',
        romanized: 'Santul Makgi',
        category: 'Block',
        cues: 'One arm executes high outer block; other arm executes low block forming mountain peak silhouette.',
        steps: [
          'Cross arms in front of chest.',
          'Step into Juchum Seogi while extending one arm into high side block and other arm into low block simultaneously.'
        ]
      },
      {
        name: 'Dubal Dangsang Chagi (Two-Foot Jumping Front Kick)',
        koreanHangul: '두발당성차기',
        romanized: 'Dubal Dangsang Chagi',
        category: 'Kick',
        cues: 'Jump off rear foot; first kick is low feint; second kick strikes head height at jump apex with loud Kihap.',
        steps: [
          'Jump forward off rear foot, firing a rapid low front kick in mid-air.',
          'While airborne, chamber opposite leg and fire a full-power high front kick at the peak of the jump with Kihap.'
        ]
      },
      {
        name: 'Dangkyo Teok Jireugi (Pulling Jaw Uppercut)',
        koreanHangul: '당겨턱지르기',
        romanized: 'Dangkyo Teok Jireugi',
        category: 'Strike',
        cues: 'Pull opponent’s collar with lead hand while driving rear uppercut into chin in Beom Seogi.',
        steps: [
          'From Tiger Stance, grab opponent’s lapel with forward hand.',
          'Yank opponent forward while driving rear uppercut vertically under their jaw.'
        ]
      }
    ],
    practicalTraining: [
      {
        title: 'Taegeuk 8 Jang Dan Readiness Rehearsal',
        description: 'Perform Taegeuk 8 Jang 5 times under examination conditions with explosive jump kicks and crisp Santul Makgi.',
        repetitions: '5 full executions'
      },
      {
        title: 'Airborne Double Kick Plyometrics',
        description: 'Practice Dubal Dangsang Chagi onto two held paddles at progressive heights (chest then head).',
        repetitions: '15 jumps x 3 sets'
      },
      {
        title: 'Cumulative Poomsae Marathon (Taegeuk 1 to 8)',
        description: 'Run through all 8 Taegeuk poomsae back-to-back with 1-minute rest between forms.',
        repetitions: '1 complete cycle of Taegeuk 1–8'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Shouting Kihap on the first kick of Dubal Dangsang Chagi instead of the decisive second kick.',
        correction: 'Save the full martial shout (Kihap) for the high scoring second kick.'
      },
      {
        mistake: 'Letting the mountain block arms sag below shoulder and hip levels.',
        correction: 'Lock the high arm rigidly at temple height and low arm 2 fist-widths above knee.'
      },
      {
        mistake: 'Failing to pull the reaction hand when delivering Dangkyo Teok Jireugi.',
        correction: 'Pull the grasping hand firmly back to the chest to multiply the impact of the uppercut.'
      }
    ],
    stances: ['Beom Seogi', 'Ap Koobi', 'Dwit Koobi', 'Kyocha Seogi', 'Juchum Seogi'],
    blocks: ['Santul Makgi (Mountain Block)', 'Oedanteul Makgi', 'Kodureo Arae Makgi'],
    strikes: ['Dangkyo Teok Jireugi (Pulling Jaw Punch)', 'Momtong Geodeureo Bakkat Makgi'],
    kicks: ['Dubal Dangsang Chagi (Double Jumping Front Kick)', 'Ap Chagi'],
    poomsaeRequired: 'Taegeuk 8 Jang (27 movements - Gon Trigram: Earth)',
    keyPoints: [
      'Santul Makgi forms a majestic mountain profile with both arms.',
      'Dubal Dangsang Chagi requires the Kihap on the second, higher kick.',
      'Cho Dan Bo candidate must exhibit humility, leadership, and exemplary technique.'
    ],
    terminology: [
      { koreanHangul: '산틀막기', romanized: 'Santul Makgi', englishMeaning: 'Mountain Block', category: 'Block', technicalCues: 'High side block + low block simultaneously forming mountain peak contour.', urdu: 'پہاڑ جیسا بلاک', arabic: 'صد الجبل' },
      { koreanHangul: '두발당성차기', romanized: 'Dubal Dangsang Chagi', englishMeaning: 'Double Jumping Front Kick', category: 'Kick', technicalCues: 'First kick feints low, second kick strikes solar plexus/face at peak jump height.', urdu: 'ہوا میں دوہری اچھلتی کک', arabic: 'ركلة القفز المزدوجة' },
      { koreanHangul: '초단보', romanized: 'Cho Dan Bo', englishMeaning: 'Black Belt Candidate', category: 'Command', technicalCues: 'Preparing mind, spirit, and technique for 1st Dan examination.', urdu: 'بلیک بیلٹ کا امیدوار', arabic: 'مرشح الحزام الأسود' }
    ],
    quiz: [
      {
        question: 'What trigram element is represented by Taegeuk 8 Jang?',
        options: ['Gon (Mother Earth / Pure Receptivity)', 'Keon (Heaven)', 'Gam (Water)', 'Ri (Fire)'],
        correctIndex: 0,
        explanation: 'Taegeuk 8 Jang symbolizes Gon (Pure Earth), representing the fertile ground of all previous learning.'
      },
      {
        question: 'On which kick of Dubal Dangsang Chagi is the martial shout (Kihap) released?',
        options: ['On the first kick only', 'On the second (higher) kick at peak jump height', 'On neither kick', 'While landing'],
        correctIndex: 1,
        explanation: 'The first kick is a rapid feint; the second kick delivers the full-power strike accompanied by a decisive Kihap.'
      },
      {
        question: 'How many counted movements are in Taegeuk 8 Jang?',
        options: ['20 movements', '24 movements', '27 movements', '30 movements'],
        correctIndex: 2,
        explanation: 'Taegeuk 8 Jang has 27 counted movements.'
      },
      {
        question: 'What is the characteristic profile of Santul Makgi (Mountain Block)?',
        options: ['Both arms crossed at waist', 'One arm in high side block and one in low block forming a mountain peak contour', 'Both hands covering face', 'Both arms pointing forward'],
        correctIndex: 1,
        explanation: 'Santul Makgi resembles the Chinese character for Mountain (山), with one high side block and one low block.'
      },
      {
        question: 'What does the term "Cho Dan Bo" mean in Korean Taekwondo hierarchy?',
        options: ['Retired master', 'Black Belt Candidate / Deputy Black Belt', 'Referee examiner', 'White belt beginner'],
        correctIndex: 1,
        explanation: 'Cho Dan Bo translates to Black Belt Candidate: a 1st Gup student preparing for their 1st Dan testing.'
      }
    ]
  }
];

export const DAN_LEVELS: DanLevelInfo[] = [
  {
    danNumber: 1,
    title: '1st Dan: The Novice Black Belt',
    koreanTitle: 'Il Dan',
    koreanHangul: '1단 (초단)',
    philosophicalTheme: 'The black belt is not the finish line, but the birth of true martial understanding. White belt absorbs all colors; black belt withstands all tests.',
    requiredPoomsae: 'Koryo (30 movements)',
    curriculumTopics: [
      'Kukkiwon Standard Technical Foundations',
      'Poomsae Koryo execution and bunkai (practical application)',
      'Basic instructional terminology & assistant class management',
      'Electronic scoring system (PSS) competition awareness',
      'The 5 Tenets of Taekwondo in daily life'
    ],
    teachingRequirements: 'Assistant Coach / Assistant Instructor (Jogyo)',
    thesisTheme: 'The Transformation of Character Through Taekwondo Practice'
  },
  {
    danNumber: 2,
    title: '2nd Dan: Solidity & Inner Discipline',
    koreanTitle: 'Ee Dan',
    koreanHangul: '2단',
    philosophicalTheme: 'Keumgang (The Diamond Mountain): Unbreakable hardness, mental clarity, and immobility against negative impulses.',
    requiredPoomsae: 'Keumgang (27 movements)',
    curriculumTopics: [
      'Poomsae Keumgang mastery (Hakdari Seogi / Crane Stance stability)',
      'Advanced counter-sparring tactics (Bada Chagi & Cut-kick traps)',
      'Basic sports science: biomechanics of the kinetic chain in kicking',
      'Dojang emergency first-aid and sports injury triage',
      'Taekwondo history: The Nine Kwans to KTA and Kukkiwon foundation'
    ],
    teachingRequirements: 'Club Assistant Instructor',
    thesisTheme: 'Biomechanics of Kicking Power & Joint Longevity in Taekwondo'
  },
  {
    danNumber: 3,
    title: '3rd Dan: Pedagogical Mastery',
    koreanTitle: 'Sam Dan',
    koreanHangul: '3단',
    philosophicalTheme: 'Taebaek (The Bright Mountain): The sacred mountain representing divine origin and noble leadership of the people.',
    requiredPoomsae: 'Taebaek (26 movements)',
    curriculumTopics: [
      'Poomsae Taebaek precision (Geumgang Momtong Makgi, Barun Sonal)',
      'Curriculum sequencing for youth and adult learners',
      'National referee mechanics: scoring criteria and Gam-jeom hand signals',
      'Strength, power, and periodization programming for competitive athletes',
      'Martial ethics and resolving conflict peacefully'
    ],
    teachingRequirements: 'Senior Instructor (Gyosanim)',
    thesisTheme: 'Effective Pedagogy for Developing Discipline in Modern Youth Athletes'
  },
  {
    danNumber: 4,
    title: '4th Dan: Master Instructor (Sabomnim)',
    koreanTitle: 'Sa Dan',
    koreanHangul: '4단 (사범)',
    philosophicalTheme: 'Pyongwon (The Vast Plain): Source of sustenance, peace, and boundless horizon. The stage of genuine Mastership.',
    requiredPoomsae: 'Pyongwon (21 movements)',
    curriculumTopics: [
      'Poomsae Pyongwon execution (balance in Kyocha Seogi and Hakdari Seogi)',
      'Kukkiwon Master Course certification curriculum',
      'Independent Dojang management, safety compliance, and federation governance',
      'Advanced Sparring Tactics: Golden Point decision making and coaching corner ethics',
      'Taekwondo Philosophy: Um-Yang (Yin-Yang) dynamics in combat and peace'
    ],
    teachingRequirements: 'Official Master Instructor (Sabomnim) & Dojang Head Coach',
    thesisTheme: 'Formal Written Dissertation: Dojang Leadership & Educational Stewardship'
  },
  {
    danNumber: 5,
    title: '5th Dan: Senior Master (Godeung Sabom)',
    koreanTitle: 'Oh Dan',
    koreanHangul: '5단 (고단자)',
    philosophicalTheme: 'Sipjin (The Decimal System & 10 Symbols of Longevity): Sun, moon, mountain, water, stone, pine tree, herb of eternal youth, turtle, crane, and deer.',
    requiredPoomsae: 'Sipjin (28 movements)',
    curriculumTopics: [
      'Poomsae Sipjin deep study: slow breathing movements (Bawi Milgi / Rock Pushing)',
      'National and International Referee Chairmanship and Protest Committee handling',
      'Mentorship of junior masters and instructor credentialing',
      'National sports federation policy alignment (PTF / WT / IOC standards)'
    ],
    teachingRequirements: 'Senior Master & National Examiner',
    thesisTheme: 'Taekwondo as a Global Cultural Movement and Values Ambassador'
  },
  {
    danNumber: 6,
    title: '6th Dan: Grandmaster Track (Grand Master)',
    koreanTitle: 'Yuk Dan',
    koreanHangul: '6단 (원로사범)',
    philosophicalTheme: 'Jitae (The Earth): The human being standing upright on earth, battling difficulties with indomitable perseverance.',
    requiredPoomsae: 'Jitae (28 movements)',
    curriculumTopics: [
      'Poomsae Jitae: Grounding force, multi-directional defense against multiple attackers',
      'High Dan Promotion Committee procedures',
      'Global martial arts research & historical preservation',
      'High-performance athlete psychological conditioning for Olympic Games'
    ],
    teachingRequirements: 'Grandmaster Committee Member / Technical Advisor',
    thesisTheme: 'Philosophical Synthesis of Traditional Moo Do and Modern Olympic Sport'
  },
  {
    danNumber: 7,
    title: '7th Dan: Grandmaster Elder',
    koreanTitle: 'Chil Dan',
    koreanHangul: '7단 (대사범)',
    philosophicalTheme: 'Cheonkwon (The Heavens): Celestial sovereignty, piety, fluid circular movements mirroring the cosmos.',
    requiredPoomsae: 'Cheonkwon (26 movements)',
    curriculumTopics: [
      'Poomsae Cheonkwon: Open circular wingspan motions, balance and spiritual elevation',
      'National Federation Executive Leadership & Olympic Committee liaison',
      'Senior Examiner at Kukkiwon International Promotion Tests',
      'Standardization of Taekwondo technical doctrine across continents'
    ],
    teachingRequirements: 'Senior Grandmaster & Continental Technical Chair',
    thesisTheme: 'Universal Human Dignity and Ethical Stewardship in Martial Arts'
  },
  {
    danNumber: 8,
    title: '8th Dan: Grandmaster of Adaptability',
    koreanTitle: 'Pal Dan',
    koreanHangul: '8단 (원로 대사범)',
    philosophicalTheme: 'Hansu (The Water Source): Fluidity, nourishing all life without contention, conforming to all vessels while retaining essence.',
    requiredPoomsae: 'Hansu (27 movements)',
    curriculumTopics: [
      'Poomsae Hansu: Serpentine power, profound breath control, soft yielding overcoming hard force',
      'Custodianship of Kukkiwon heritage and global development programs',
      'Lifetime achievement and federation advisory councils'
    ],
    teachingRequirements: 'Kukkiwon Advisory Grandmaster',
    thesisTheme: 'Lifelong Martial Cultivation: Harmonizing Body, Mind, and Universe'
  },
  {
    danNumber: 9,
    title: '9th Dan: Grandmaster of Highest Honor (Kwanjangnim)',
    koreanTitle: 'Gu Dan',
    koreanHangul: '9단 (최고 원로)',
    philosophicalTheme: 'Ilyeo (Oneness): Buddhist concept of the unity of body and mind, subject and object. The ultimate attainment of harmony.',
    requiredPoomsae: 'Ilyeo (23 movements)',
    curriculumTopics: [
      'Poomsae Ilyeo: Complete oneness, internal breath focus, mastery through detachment',
      'Highest international board governance and honorary ambassadorship',
      'Preserving the eternal legacy of Taekwondo for future generations'
    ],
    teachingRequirements: 'Grandmaster Emeritus / Kukkiwon Supreme Council',
    thesisTheme: 'The Final Synthesis: Taekwondo as a Pathway to World Peace'
  }
];

export const POOMSAE_DATABASE: PoomsaeDetail[] = [
  {
    id: 'taegeuk-1',
    name: 'Taegeuk 1 Jang (태극 1장)',
    koreanHangul: '태극 1장',
    trigramSymbol: '☰',
    trigramMeaning: 'Keon (건) - Heaven & Sky',
    natureElement: 'Heaven / Pure Yang / Origin of Creation',
    totalMovements: 18,
    recommendedGrade: '8th Gup (Yellow Belt)',
    overview: 'The first Poomsae introduces basic walking stance, forward long stance, low block, middle inside block, high block, and middle punch. It represents the sky, which provides light and rain to allow seeds to sprout.',
    keyStances: ['Naranhi Seogi', 'Ap Seogi', 'Ap Koobi'],
    keyTechniques: ['Arae Makgi', 'Momtong Baro Jireugi', 'Momtong Bandae Jireugi', 'Momtong An Makgi', 'Ap Chagi', 'Olgool Makgi'],
    steps: [
      { stepNumber: 1, stance: 'Left Ap Seogi', technique: 'Left Arae Makgi', koreanName: '왼 앞서기 아래막기', description: 'Turn 90° left into walking stance, sweep left low block.', targetArea: 'Arae (Low)', direction: 'Left' },
      { stepNumber: 2, stance: 'Right Ap Seogi', technique: 'Right Momtong Baro Jireugi', koreanName: '오른 앞서기 몸통반대지르기', description: 'Step forward into right walking stance, execute right middle punch.', targetArea: 'Momtong (Middle)', direction: 'Forward' },
      { stepNumber: 3, stance: 'Right Ap Seogi', technique: 'Right Arae Makgi', koreanName: '오른 앞서기 아래막기', description: 'Turn 180° right into right walking stance, execute right low block.', targetArea: 'Arae (Low)', direction: 'Right' },
      { stepNumber: 4, stance: 'Left Ap Seogi', technique: 'Left Momtong Baro Jireugi', koreanName: '왼 앞서기 몸통반대지르기', description: 'Step forward into left walking stance, execute left middle punch.', targetArea: 'Momtong (Middle)', direction: 'Forward' },
      { stepNumber: 5, stance: 'Left Ap Koobi', technique: 'Left Arae Makgi + Right Momtong Baro Jireugi', koreanName: '왼 앞굽이 아래막기 몸통지르기', description: 'Turn 90° left down center line into long stance, low block followed immediately by reverse punch.', targetArea: 'Momtong (Middle)', direction: 'Turn' }
    ],
    quizQuestion: {
      question: 'How many total movements are in Taegeuk 1 Jang?',
      options: ['16 movements', '18 movements', '20 movements', '22 movements'],
      correctIndex: 1,
      explanation: 'Taegeuk 1 Jang has precisely 18 recognized movements ending with a Kihap on the final punch.'
    }
  },
  {
    id: 'taegeuk-2',
    name: 'Taegeuk 2 Jang (태극 2장)',
    koreanHangul: '태극 2장',
    trigramSymbol: '☱',
    trigramMeaning: 'Tae (태) - Lake & Joyfulness',
    natureElement: 'Lake / Serenity / Gentle Exterior with Inner Steel',
    totalMovements: 18,
    recommendedGrade: '7th Gup (Yellow Belt Green Stripe)',
    overview: 'Taegeuk 2 Jang expresses inner strength hidden beneath calm composure, like deep lake waters. Introduces high face punches following front kicks.',
    keyStances: ['Ap Seogi', 'Ap Koobi'],
    keyTechniques: ['Arae Makgi', 'Momtong Bandae Jireugi', 'Olgool Jireugi', 'Ap Chagi', 'Olgool Makgi'],
    steps: [
      { stepNumber: 1, stance: 'Left Ap Seogi', technique: 'Left Arae Makgi', koreanName: '왼 앞서기 아래막기', description: 'Turn 90° left into left walking stance, low block.', targetArea: 'Arae (Low)', direction: 'Left' },
      { stepNumber: 2, stance: 'Right Ap Koobi', technique: 'Right Momtong Bandae Jireugi', koreanName: '오른 앞굽이 몸통반대지르기', description: 'Step forward into right forward long stance, execute right middle punch.', targetArea: 'Momtong (Middle)', direction: 'Forward' },
      { stepNumber: 3, stance: 'Right Ap Seogi', technique: 'Right Arae Makgi', koreanName: '오른 앞서기 아래막기', description: 'Turn 180° right into right walking stance, low block.', targetArea: 'Arae (Low)', direction: 'Right' },
      { stepNumber: 4, stance: 'Left Ap Koobi', technique: 'Left Momtong Bandae Jireugi', koreanName: '왼 앞굽이 몸통반대지르기', description: 'Step into left long stance, left middle punch.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'In Taegeuk 2 Jang, what punch is executed after the Ap Chagi on the center line?',
      options: ['Arae Jireugi', 'Olgool Jireugi (High Punch)', 'Momtong Jireugi', 'Dwit Jireugi'],
      correctIndex: 1,
      explanation: 'Taegeuk 2 Jang features Ap Chagi followed directly by Olgool Jireugi targeting the philtrum.'
    }
  },
  {
    id: 'taegeuk-3',
    name: 'Taegeuk 3 Jang (태극 3장)',
    koreanHangul: '태극 3장',
    trigramSymbol: '☲',
    trigramMeaning: 'Ri (리) - Fire & Sun',
    natureElement: 'Fire / Energy / Passion & Control',
    totalMovements: 20,
    recommendedGrade: '6th Gup (Green Belt)',
    overview: 'Fire gives warmth and passion, but must be governed by self-control. Introduces knife-hand neck strike (Sonnal Mok Chigi), single knife-hand block, and rapid combinations.',
    keyStances: ['Ap Seogi', 'Ap Koobi', 'Dwit Koobi (Back Stance)'],
    keyTechniques: ['Sonnal Mok Chigi', 'Hansonnal Momtong Yeop Makgi', 'Momtong Du-beon Jireugi'],
    steps: [
      { stepNumber: 1, stance: 'Left Ap Seogi', technique: 'Left Arae Makgi', koreanName: '왼 앞서기 아래막기', description: 'Turn left into walking stance, low block.', targetArea: 'Arae (Low)', direction: 'Left' },
      { stepNumber: 2, stance: 'Left Ap Koobi', technique: 'Right Ap Chagi + Right/Left Double Punch', koreanName: '앞차기 후 두번지르기', description: 'Right front kick, landing in long stance with right-left double middle punch.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'Which new open-hand technique is first introduced in Taegeuk 3 Jang?',
      options: ['Bo Jumeok', 'Sonnal Mok Chigi (Knife-hand Neck Strike)', 'Pyonsonkkeut Jireugi', 'Santul Makgi'],
      correctIndex: 1,
      explanation: 'Taegeuk 3 introduces Sonnal Mok Chigi as the student advances to Green Belt.'
    }
  },
  {
    id: 'taegeuk-4',
    name: 'Taegeuk 4 Jang (태극 4장)',
    koreanHangul: '태극 4장',
    trigramSymbol: '☳',
    trigramMeaning: 'Jin (진) - Thunder',
    natureElement: 'Thunder / Awesomeness / Overcoming Fear',
    totalMovements: 20,
    recommendedGrade: '5th Gup (Green Belt Blue Stripe)',
    overview: 'Thunder generates awe and courage. Introduces Sonnal Momtong Makgi (Double knife-hand middle block), Pyonsonkkeut Jireugi (spear-finger thrust), and Jebipoom Mok Chigi.',
    keyStances: ['Dwit Koobi', 'Ap Koobi'],
    keyTechniques: ['Sonnal Momtong Makgi', 'Pyonsonkkeut Jireugi', 'Jebipoom Mok Chigi', 'Yeop Chagi'],
    steps: [
      { stepNumber: 1, stance: 'Left Dwit Koobi', technique: 'Sonnal Momtong Makgi', koreanName: '손날몸통막기', description: 'Turn 90° left into back stance, double knifehand block.', targetArea: 'Momtong (Middle)', direction: 'Left' },
      { stepNumber: 2, stance: 'Right Ap Koobi', technique: 'Right Pyonsonkkeut Sewo Jireugi', koreanName: '편손끝세워찌르기', description: 'Step forward into long stance, spear finger thrust with left palm under right elbow.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'What is the trigram of Taegeuk 4 Jang and what does it represent?',
      options: ['Jin - Thunder', 'Ri - Fire', 'Gam - Water', 'Keon - Sky'],
      correctIndex: 0,
      explanation: 'Jin represents thunder, demanding that the student move with decisive, courageous energy.'
    }
  },
  {
    id: 'taegeuk-5',
    name: 'Taegeuk 5 Jang (태극 5장)',
    koreanHangul: '태극 5장',
    trigramSymbol: '☴',
    trigramMeaning: 'Seon (선) - Wind',
    natureElement: 'Wind / Flexibility & Typhoon Power',
    totalMovements: 20,
    recommendedGrade: '4th Gup (Blue Belt)',
    overview: 'Wind can be quiet breeze or devastating hurricane. Introduces hammer-fist (Me Jumeok), turning elbow strikes (Palkoop Dollyo Chigi), and cross stance (Kyocha Seogi).',
    keyStances: ['Ap Koobi', 'Dwit Koobi', 'Kyocha Seogi'],
    keyTechniques: ['Me Jumeok Naeryo Chigi', 'Palkoop Dollyo Chigi', 'Deung Jumeok Olgool Bakkat Chigi'],
    steps: [
      { stepNumber: 1, stance: 'Left Ap Koobi', technique: 'Left Arae Makgi + Left Me Jumeok', koreanName: '아래막기 후 메주먹내려치기', description: 'Low block followed immediately by downward hammer-fist.', targetArea: 'Momtong (Middle)', direction: 'Left' }
    ],
    quizQuestion: {
      question: 'Which elbow strike is prominently practiced in Taegeuk 5 Jang?',
      options: ['Palkoop Pyojeok Chigi (Target Elbow Strike)', 'Palkoop Dollyo Chigi (Turning Elbow Strike)', 'Palkoop Naeryo Chigi', 'Both Turning and Target Elbow Strikes'],
      correctIndex: 3,
      explanation: 'Taegeuk 5 Jang incorporates both Palkoop Dollyo Chigi and Palkoop Pyojeok Chigi (striking open palm target).'
    }
  },
  {
    id: 'taegeuk-6',
    name: 'Taegeuk 6 Jang (태극 6장)',
    koreanHangul: '태극 6장',
    trigramSymbol: '☵',
    trigramMeaning: 'Gam (감) - Water',
    natureElement: 'Water / Flow & Adaptability',
    totalMovements: 19,
    recommendedGrade: '3rd Gup (Blue Belt Red Stripe)',
    overview: 'Water yields to pressure but never loses its essence. It introduces low open-wedge blocks, single knife-hand high outer blocks, and fluid roundhouse combinations.',
    keyStances: ['Naranhi Seogi', 'Ap Koobi', 'Dwit Koobi'],
    keyTechniques: ['Hansonnal Olgool Bakkat Makgi', 'Dollyo Chagi', 'Olgool Bakkat Makgi'],
    steps: [
      { stepNumber: 1, stance: 'Left Ap Koobi', technique: 'Left Arae Makgi', koreanName: '왼 앞굽이 아래막기', description: 'Turn into long stance, low block.', targetArea: 'Arae (Low)', direction: 'Left' }
    ],
    quizQuestion: {
      question: 'Which kick combination defines the pacing in Taegeuk 6 Jang?',
      options: ['Front Kick into Axe Kick', 'Turning Roundhouse Kick (Dollyo Chagi)', 'Back Kick into Side Kick', 'Spin Hook Kick'],
      correctIndex: 1,
      explanation: 'Taegeuk 6 Jang features prominent Dollyo Chagi kicking into balanced long stance landing.'
    }
  },
  {
    id: 'taegeuk-7',
    name: 'Taegeuk 7 Jang (태극 7장)',
    koreanHangul: '태극 7장',
    trigramSymbol: '☶',
    trigramMeaning: 'Gan (간) - Mountain',
    natureElement: 'Mountain / Steadfast Immobility',
    totalMovements: 25,
    recommendedGrade: '2nd Gup (Red Belt)',
    overview: 'Mountains stand unwavering. Features Beom Seogi (Tiger Stance), Bo Jumeok (Covered Fist), Gawi Makgi (Scissors Block), and Du Jumeok Jeocheo Jireugi (Double Uppercuts).',
    keyStances: ['Beom Seogi', 'Juchum Seogi', 'Ap Koobi'],
    keyTechniques: ['Sonnal Arae Makgi', 'Gawi Makgi', 'Mureup Kkeokki', 'Bo Jumeok'],
    steps: [
      { stepNumber: 1, stance: 'Left Beom Seogi', technique: 'Sonnal Arae Makgi', koreanName: '왼 범서기 손날아래막기', description: 'Turn left into Tiger Stance, low knifehand block.', targetArea: 'Arae (Low)', direction: 'Left' }
    ],
    quizQuestion: {
      question: 'What is the stance with 90% rear weight used frequently in Taegeuk 7 Jang?',
      options: ['Ap Koobi', 'Juchum Seogi', 'Beom Seogi (Tiger Stance)', 'Hakdari Seogi'],
      correctIndex: 2,
      explanation: 'Beom Seogi (Tiger Stance) is the hallmark stance of Taegeuk 7 Jang, emphasizing coiled springing readiness.'
    }
  },
  {
    id: 'taegeuk-8',
    name: 'Taegeuk 8 Jang (태극 8장)',
    koreanHangul: '태극 8장',
    trigramSymbol: '☷',
    trigramMeaning: 'Gon (곤) - Earth',
    natureElement: 'Earth / Pure Receptive Yin / Completion of Gup Training',
    totalMovements: 27,
    recommendedGrade: '1st Gup (Cho Dan Bo)',
    overview: 'The earth receives heaven’s energy and nurtures all life to fruition. The pinnacle form before Black Belt: features Santul Makgi, Dubal Dangsang Chagi, and Dangkyo Teok Jireugi.',
    keyStances: ['Ap Koobi', 'Dwit Koobi', 'Beom Seogi', 'Kyocha Seogi'],
    keyTechniques: ['Kodureo Bakkat Makgi', 'Dubal Dangsang Chagi', 'Santul Makgi', 'Dangkyo Teok Jireugi'],
    steps: [
      { stepNumber: 1, stance: 'Left Dwit Koobi', technique: 'Kodureo Momtong Bakkat Makgi', koreanName: '거들어 몸통바깥막기', description: 'Assisted middle outward block in back stance.', targetArea: 'Momtong (Middle)', direction: 'Left' }
    ],
    quizQuestion: {
      question: 'What is the meaning of the Gon trigram for Taegeuk 8 Jang?',
      options: ['Pure Earth / Receptivity', 'Heaven / Light', 'Fire / Lightning', 'Lake / Reflection'],
      correctIndex: 0,
      explanation: 'Gon symbolizes the Mother Earth: the source and receptacle of all life, representing the mastery of Gup fundamentals.'
    }
  },
  {
    id: 'koryo',
    name: 'Koryo (고려)',
    koreanHangul: '고려',
    trigramSymbol: '★',
    trigramMeaning: 'Dynasty of Strength & Spiritual Nobility (918–1392 AD)',
    natureElement: 'Resolute Korean Heritage & Conviction',
    totalMovements: 30,
    recommendedGrade: '1st Dan (Black Belt)',
    overview: 'Koryo represents the ancient Korean dynasty known for heroic resistance against Mongol armies. Features Tongmilgi (Pushing Fists) Joon-bi, double side kicks, arc-hand neck strikes (Kalgobi), and diamond block.',
    keyStances: ['Naranhi Seogi (Tongmilgi Joon-bi)', 'Ap Koobi', 'Dwit Koobi'],
    keyTechniques: ['Tongmilgi', 'Kodeo Chagi (Double Kick)', 'Sonnal Bakkat Chigi', 'Me Jumeok Pyojeok Chigi'],
    steps: [
      { stepNumber: 1, stance: 'Naranhi Seogi', technique: 'Tongmilgi Joonbi', koreanName: '통밀기준비서기', description: 'Hands rise slowly like pushing a heavy log, breathing deeply over 5 seconds.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'What is the characteristic ready stance (Joon-bi) of Poomsae Koryo?',
      options: ['Gibon Joon-bi', 'Tongmilgi Joon-bi (Pushing Fists)', 'Bo Jumeok Joon-bi', 'Kyop Son Joon-bi'],
      correctIndex: 1,
      explanation: 'Poomsae Koryo begins with Tongmilgi Joon-bi, where both open palms push slowly forward in front of the chest.'
    }
  },
  {
    id: 'keumgang',
    name: 'Keumgang (금강)',
    koreanHangul: '금강',
    trigramSymbol: '◆',
    trigramMeaning: 'Diamond / Hardness / Mount Keumgang',
    natureElement: 'Diamond Unbreakability & Buddhist Warrior Mountain',
    totalMovements: 27,
    recommendedGrade: '2nd Dan',
    overview: 'Keumgang means "too hard to be broken" and reflects both the Diamond Sutra and Mount Keumgang. The form’s line is shaped like the Chinese character for mountain (山). Hallmark stance: Hakdari Seogi (Crane Stance) and Santul Makgi.',
    keyStances: ['Hakdari Seogi (Crane Stance)', 'Juchum Seogi (Horseback Riding Stance)'],
    keyTechniques: ['Santul Makgi', 'Keumgang Makgi', 'Chetdari Jireugi (Fork Punch)'],
    steps: [
      { stepNumber: 1, stance: 'Hakdari Seogi', technique: 'Santul Makgi', koreanName: '학다리서기 산틀막기', description: 'Balance on one leg with other foot tucked behind knee, arms extended in mountain block.', targetArea: 'Olgool (High)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'Which one-legged balance stance is heavily tested in Poomsae Keumgang?',
      options: ['Ap Seogi', 'Hakdari Seogi (Crane Stance)', 'Kyocha Seogi', 'Beom Seogi'],
      correctIndex: 1,
      explanation: 'Hakdari Seogi tests immovable equilibrium as one foot hooks behind the supporting knee.'
    }
  },
  {
    id: 'taebaek',
    name: 'Taebaek (태백)',
    koreanHangul: '태백',
    trigramSymbol: '▲',
    trigramMeaning: 'Bright Mountain / Tangun Mythological Cradle',
    natureElement: 'Divine Light & Ancient Royal Sanctity',
    totalMovements: 26,
    recommendedGrade: '3rd Dan',
    overview: 'Taebaek represents the mythological mountain where the legendary founder of Korea, Tangun, established the kingdom. Movements are swift, agile, and filled with sacred dignity.',
    keyStances: ['Ap Koobi', 'Dwit Koobi', 'Beom Seogi'],
    keyTechniques: ['Geumgang Momtong Makgi', 'Barun Sonal', 'Japki & Palkoop Strike'],
    steps: [
      { stepNumber: 1, stance: 'Dwit Koobi', technique: 'Hansonnal Bakkat Makgi', koreanName: '손날바깥막기', description: 'Crisp open hand outer block with intense gaze.', targetArea: 'Momtong (Middle)', direction: 'Left' }
    ],
    quizQuestion: {
      question: 'What historical figure is associated with Mount Taebaek?',
      options: ['King Sejong', 'Tangun (Founder of Gojoseon)', 'General Yi Sun-sin', 'Bodhidharma'],
      correctIndex: 1,
      explanation: 'Taebaek honors Tangun, the mythological founder of the Korean nation on the Bright Mountain.'
    }
  },
  {
    id: 'pyongwon',
    name: 'Pyongwon (평원)',
    koreanHangul: '평원',
    trigramSymbol: '一',
    trigramMeaning: 'Vast Plain / Boundless Horizon & Sustenance',
    natureElement: 'The Plain / Source of Human Nourishment',
    totalMovements: 21,
    recommendedGrade: '4th Dan (Master Sabomnim)',
    overview: 'Pyongwon represents a vast plain spreading out boundlessly: the origin of all living creatures and sustenance for human civilization. The form requires extreme balance, transitioning between cross stances and crane stances.',
    keyStances: ['Naranhi Seogi', 'Kyocha Seogi (Cross Stance)', 'Hakdari Seogi (Crane Stance)', 'Juchum Seogi'],
    keyTechniques: ['Sonnal Momtong Makgi', 'Palkoop Naeryo Chigi', 'Me Jumeok Pyojeok Chigi', 'Yeop Chagi'],
    steps: [
      { stepNumber: 1, stance: 'Moa Seogi', technique: 'Tongmilgi Joonbi', koreanName: '통밀기준비서기', description: 'Deep breath focus, pushing fists slowly over 5 seconds.', targetArea: 'Momtong (Middle)', direction: 'Forward' },
      { stepNumber: 2, stance: 'Hakdari Seogi', technique: 'Geumgang Makgi', koreanName: '금강막기', description: 'One-legged balance in crane stance with diamond block.', targetArea: 'Olgool (High)', direction: 'Turn' }
    ],
    quizQuestion: {
      question: 'What philosophical concept is embodied by Poomsae Pyongwon?',
      options: ['The deep ocean abyss', 'The vast plain that sustains human life and endless peace', 'The erupting volcano', 'The winter frost'],
      correctIndex: 1,
      explanation: 'Pyongwon signifies the vast fertile plain, representing peace, sustenance, and the boundless potential of the 4th Dan Master.'
    }
  },
  {
    id: 'sipjin',
    name: 'Sipjin (십진)',
    koreanHangul: '십진',
    trigramSymbol: '十',
    trigramMeaning: 'The Decimal System & 10 Symbols of Longevity',
    natureElement: 'Sun, Moon, Mountain, Water, Stone, Pine, Herb, Turtle, Crane, Deer',
    totalMovements: 28,
    recommendedGrade: '5th Dan (Senior Master)',
    overview: 'Sipjin represents the decimal system as an infinite progression and incorporates the 10 traditional Korean symbols of eternal life. The form features slow, deep, isometric power movements (Bawi Milgi / Rock Pushing).',
    keyStances: ['Juchum Seogi', 'Ap Koobi', 'Dwit Koobi'],
    keyTechniques: ['Bawi Milgi (Rock Pushing)', 'Hwangso Makgi (Bull Block)', 'Sonnal Bakkat Chigi'],
    steps: [
      { stepNumber: 1, stance: 'Juchum Seogi', technique: 'Hwangso Makgi', koreanName: '황소막기', description: 'Double high fist block overhead resembling a strong bull’s horns.', targetArea: 'Olgool (High)', direction: 'Forward' },
      { stepNumber: 2, stance: 'Ap Koobi', technique: 'Bawi Milgi', koreanName: '바위밀기', description: 'Slow isometric pushing motion moving like a giant boulder over 8 seconds.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'What is the characteristic slow isometric movement in Poomsae Sipjin?',
      options: ['Axe kick', 'Bawi Milgi (Rock Pushing)', 'Scissors kick', 'Jumping punch'],
      correctIndex: 1,
      explanation: 'Bawi Milgi simulates pushing a heavy granite boulder with deep abdominal breath control and unwavering muscular tension.'
    }
  },
  {
    id: 'jitae',
    name: 'Jitae (지태)',
    koreanHangul: '지태',
    trigramSymbol: '地',
    trigramMeaning: 'The Earth / The Human Standing Resolute on Earth',
    natureElement: 'Terrestrial Strength & Struggle',
    totalMovements: 28,
    recommendedGrade: '6th Dan (Grandmaster Track)',
    overview: 'Jitae signifies a human being standing with feet planted firmly on the earth, looking up at heaven and wrestling with life’s tribulations. Movements feature multi-directional defense and grounding force.',
    keyStances: ['Juchum Seogi', 'Ap Koobi', 'Beom Seogi'],
    keyTechniques: ['Olgool Bakkat Makgi', 'Palkoop Pyojeok Chigi', 'Me Jumeok Chigi'],
    steps: [
      { stepNumber: 1, stance: 'Naranhi Seogi', technique: 'Pyeonhido Joonbi', koreanName: '기본준비', description: 'Strong grounding breath connecting feet to the earth.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'What does Jitae represent in Taekwondo philosophy?',
      options: ['The bird flying in clouds', 'A human being standing firmly on earth struggling and prevailing over life’s challenges', 'The running river', 'Lightning striking tree'],
      correctIndex: 1,
      explanation: 'Jitae symbolizes the human being rooted firmly on earth, overcoming all adversity through indomitable perseverance.'
    }
  },
  {
    id: 'cheonkwon',
    name: 'Cheonkwon (천권)',
    koreanHangul: '천권',
    trigramSymbol: '天',
    trigramMeaning: 'The Heavens / Celestial Sovereignty',
    natureElement: 'The Celestial Sky & Infinite Cosmos',
    totalMovements: 26,
    recommendedGrade: '7th Dan (Senior Grandmaster)',
    overview: 'Cheonkwon symbolizes the heavens, the creator of the universe, and the noble reverence of humanity toward celestial virtue. The forms feature large, fluid, circular motions resembling celestial orbits.',
    keyStances: ['Beom Seogi', 'Ap Koobi', 'Dwit Koobi'],
    keyTechniques: ['Nalgaepyeogi (Wingspreading Block)', 'Sonnal Bakkat Chigi', 'Du Jumeok Jeocheo Jireugi'],
    steps: [
      { stepNumber: 1, stance: 'Moa Seogi', technique: 'Nalgaepyeogi', koreanName: '날개펴기', description: 'Arms open circular and wide like eagle wings welcoming heaven.', targetArea: 'Olgool (High)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'What type of arm motion characterizes Poomsae Cheonkwon?',
      options: ['Short rapid jabs', 'Broad, circular wing-spreading motions mimicking celestial spheres', 'Crawling movements', 'Only elbow strikes'],
      correctIndex: 1,
      explanation: 'Cheonkwon features grand circular wing-spreading movements (Nalgaepyeogi) reflecting cosmic openness.'
    }
  },
  {
    id: 'hansu',
    name: 'Hansu (한수)',
    koreanHangul: '한수',
    trigramSymbol: '水',
    trigramMeaning: 'The Water Source / Formless Adaptability',
    natureElement: 'The Ocean / Primeval Fluid Source',
    totalMovements: 27,
    recommendedGrade: '8th Dan (Grandmaster Elder)',
    overview: 'Hansu represents the source of water: pure, fluid, unceasing, and nourishing to all life. Water never forces its way; it accommodates any vessel yet wears away mountains. Movements are exceptionally serpentine, soft, yet devastating.',
    keyStances: ['Dwit Koobi', 'Beom Seogi', 'Ap Koobi'],
    keyTechniques: ['Sonnal Olgool Makgi', 'Pyojeok Chagi', 'Me Jumeok Naeryo Chigi'],
    steps: [
      { stepNumber: 1, stance: 'Beom Seogi', technique: 'Sonnal Momtong Makgi', koreanName: '손날몸통막기', description: 'Serpentine yielding defense in tiger stance.', targetArea: 'Momtong (Middle)', direction: 'Left' }
    ],
    quizQuestion: {
      question: 'What quality of water is emphasized in Poomsae Hansu?',
      options: ['Freezing into ice', 'Formless adaptability, softness overcoming hardness, and giving life without contention', 'Boiling with anger', 'Flooding destruction'],
      correctIndex: 1,
      explanation: 'Hansu teaches water’s supreme martial wisdom: yielding to force to neutralize it completely.'
    }
  },
  {
    id: 'ilyeo',
    name: 'Ilyeo (일여)',
    koreanHangul: '일여',
    trigramSymbol: '卍',
    trigramMeaning: 'Oneness / Unity of Body and Mind',
    natureElement: 'Spiritual Enlightenment / Absolute Harmony',
    totalMovements: 23,
    recommendedGrade: '9th Dan (Grandmaster of Highest Honor)',
    overview: 'Ilyeo represents the highest state of martial philosophy: the Buddhist principle of "Oneness", where body and mind, martial art and spirit, subject and object merge into seamless unity. The path of combat becomes the path of peace.',
    keyStances: ['Hakdari Seogi (Crane Stance)', 'Beom Seogi', 'Ap Koobi'],
    keyTechniques: ['Bo Jumeok', 'Santul Makgi', 'Sonnal Olgool Makgi'],
    steps: [
      { stepNumber: 1, stance: 'Moa Seogi', technique: 'Bo Jumeok Joonbi', koreanName: '보주먹준비', description: 'Complete inner stillness and unification of mind and body.', targetArea: 'Momtong (Middle)', direction: 'Forward' }
    ],
    quizQuestion: {
      question: 'What is the highest philosophical attainment represented by Poomsae Ilyeo?',
      options: ['Defeating 100 opponents', 'Oneness of body, mind, and spirit where martial art becomes world peace', 'Speed of kicking', 'Physical invulnerability'],
      correctIndex: 1,
      explanation: 'Ilyeo represents the state of Oneness (Saint Wonhyo’s philosophy) where the martial artist transcends conflict into ultimate universal harmony.'
    }
  }
];

export const KYORUGI_SCENARIOS: KyorugiScenario[] = [
  {
    id: 'scen-1',
    title: 'Opponent Opening with Lead Cut Kick (Push Kick)',
    situation: 'Your opponent in Hong (Red) constantly steps in with a stiff lead-leg cut kick to check your distance and disrupt your rhythm.',
    opponentAction: 'Stepping forward with lead foot up, probing trunk electronic protector (PSS).',
    tacticalOptions: [
      {
        action: 'Slide 45° off-angle to open side, fire counter back kick (Dwi Chagi) under their raised leg.',
        scoreOutcome: 'Direct hit to Trunk PSS (4 Points Turning Kick)',
        isOptimal: true,
        tacticalRationale: 'Pivoting off-line bypasses the line of their push kick, exposing their back ribs to a lethal Dwi Chagi.'
      },
      {
        action: 'Stand stationary and try to punch through their pushing foot.',
        scoreOutcome: 'Pushed back out of ring / Gam-jeom penalty',
        isOptimal: false,
        tacticalRationale: 'A punch cannot overcome the kinetic leverage of a straight leg cut kick without angle evasion.'
      },
      {
        action: 'Retreat straight backward to the boundary line.',
        scoreOutcome: 'Trapped on boundary line / Risk of Gam-jeom for stepping out',
        isOptimal: false,
        tacticalRationale: 'Moving straight back surrenders mat control and invites the referee to penalize stalling.'
      }
    ]
  },
  {
    id: 'scen-2',
    title: 'Clinch Break & Head Kick Trap',
    situation: 'Both fighters clash into a close clinch. The referee has not called Kal-ryeo yet. Your opponent drops their guard to push away.',
    opponentAction: 'Pushing with both hands and retreating straight back with head unprotected.',
    tacticalOptions: [
      {
        action: 'Slip side-step off the push, hook an in-close spinning hook kick or crescent head kick (Naeryeo / Dollyo to head).',
        scoreOutcome: 'Direct hit to Head PSS (3 to 5 Points)',
        isOptimal: true,
        tacticalRationale: 'Fighters instinctively drop their hands when separating from clinches. Exploiting this split second scores high.'
      },
      {
        action: 'Hold opponent tightly with both arms until referee steps in.',
        scoreOutcome: 'Gam-jeom penalty for holding / stalling',
        isOptimal: false,
        tacticalRationale: 'Under WT rules, holding and grabbing in clinch receives an immediate Gam-jeom penalty.'
      }
    ]
  },
  {
    id: 'scen-3',
    title: 'Last 10 Seconds: Trailing by 1 Point in Round 3',
    situation: 'You are down 6–7. Time remaining: 0:08. Opponent is bouncing defensively near their boundary.',
    opponentAction: 'Bouncing backward, looking to burn clock with evasive movement.',
    tacticalOptions: [
      {
        action: 'Faint low cut kick to draw their block, instantly chamber high jumping double roundhouse (Narae Chagi) to head.',
        scoreOutcome: 'Head strike contact (3 Points) -> Win Round 9–7!',
        isOptimal: true,
        tacticalRationale: 'High-risk, high-reward attack forces the referee or PSS to register score before clock expires.'
      },
      {
        action: 'Throw a single body punch from long distance.',
        scoreOutcome: 'Falls short, buzzer sounds / Loss by 1 point',
        isOptimal: false,
        tacticalRationale: 'A single punch lacks the reach and scoring potential to overcome the deficit in remaining time.'
      }
    ]
  }
];

export const REFEREE_SIGNALS: RefereeSignal[] = [
  {
    koreanCommand: 'Charyeot',
    koreanHangul: '차렷',
    englishMeaning: 'Attention',
    urdu: 'توجہ / ہوشیار',
    arabic: 'انتباه',
    handGestureDescription: 'Both arms extended downward at 45° angle with palms open towards body.',
    contextUsage: 'Called before greeting athletes, at match opening, and during official announcements.'
  },
  {
    koreanCommand: 'Kyeong-rye',
    koreanHangul: '경례',
    englishMeaning: 'Bow (Courtesy)',
    urdu: 'احترام کا جھکاؤ',
    arabic: 'التحية باحترام',
    handGestureDescription: 'Right arm bends at 45° with palm open facing front, bowing head slightly.',
    contextUsage: 'Instructs Cheong (Blue) and Hong (Red) competitors to bow to the referee and to each other.'
  },
  {
    koreanCommand: 'Joon-bi',
    koreanHangul: '준비',
    englishMeaning: 'Ready',
    urdu: 'تیار',
    arabic: 'استعداد',
    handGestureDescription: 'Both arms brought up from sides in front of chest, then pressed downward with fists clenched.',
    contextUsage: 'Fighters enter fighting stance (Gyeorugi Joonbi) awaiting start command.'
  },
  {
    koreanCommand: 'Shi-jak',
    koreanHangul: '시작',
    englishMeaning: 'Start / Fight',
    urdu: 'شروع کرو',
    arabic: 'ابدأ',
    handGestureDescription: 'Sharp horizontal knife-hand chop between fighters from right to left while stepping back with right foot.',
    contextUsage: 'Initiates combat action at the start of rounds or after pauses.'
  },
  {
    koreanCommand: 'Kal-ryeo',
    koreanHangul: '갈려',
    englishMeaning: 'Break / Separate',
    urdu: 'الگ ہو جاؤ',
    arabic: 'توقف / افتراق',
    handGestureDescription: 'Right open knife-hand quickly thrust vertically down between both fighters.',
    contextUsage: 'Commands athletes to cease striking immediately (e.g. during clinch, fall, or rule infraction).'
  },
  {
    koreanCommand: 'Kye-sok',
    koreanHangul: '계속',
    englishMeaning: 'Continue',
    urdu: 'جاری رکھو',
    arabic: 'تابع',
    handGestureDescription: 'Sharp vertical blade hand movement between competitors without stepping.',
    contextUsage: 'Resumes fighting after Kal-ryeo pause.'
  },
  {
    koreanCommand: 'Keuman',
    koreanHangul: '그만',
    englishMeaning: 'Stop / Time is Up',
    urdu: 'ختم / رک جاؤ',
    arabic: 'انتهى / توقف',
    handGestureDescription: 'Both arms raised diagonally above head with open hands.',
    contextUsage: 'Signals the end of a round or final bout conclusion.'
  },
  {
    koreanCommand: 'Gam-jeom',
    koreanHangul: '감점',
    englishMeaning: 'Penalty (1 Point to Opponent)',
    urdu: 'پینلٹی / جرمانہ',
    arabic: 'نقطة جزاء',
    handGestureDescription: 'Index finger of right hand pointed straight up at the offending athlete.',
    contextUsage: 'Awarded for falling down, boundary exit, pushing, grabbing, kicking below belt, or misconduct.'
  },
  {
    koreanCommand: 'Shi-gan',
    koreanHangul: '시간',
    englishMeaning: 'Timeout (Clock Stop)',
    urdu: 'وقت روکو',
    arabic: 'إيقاف الوقت',
    handGestureDescription: 'Index fingers of both hands crossed to form a "T" sign above chest.',
    contextUsage: 'Directs the recorder/timer to stop match clock (e.g. doctor call, video replay).'
  },
  {
    koreanCommand: 'Cheong / Hong Seung',
    koreanHangul: '청 / 홍 승',
    englishMeaning: 'Blue / Red Victorious',
    urdu: 'نیلے / سرخ کی فتح',
    arabic: 'فوز الأزرق / فوز الأحمر',
    handGestureDescription: 'Open palm raised towards the winning athlete on the appropriate side.',
    contextUsage: 'Official announcement of match winner.'
  }
];

export const WT_REFEREE_RULES: RefereeRulePoint[] = [
  {
    category: 'Scoring Table (WT 2024–2026)',
    ruleTitle: 'Valid Points System',
    pointsOrPenalty: '1, 2, 3, 4, 5 Points',
    details: 'Punch to trunk PSS: 1 point. Valid kick to trunk PSS: 2 points. Valid turning kick to trunk PSS: 4 points. Valid kick to head: 3 points. Valid turning kick to head: 5 points.',
    officialRef: 'WT Competition Rules Article 12'
  },
  {
    category: 'Match Format',
    ruleTitle: 'Best of 3 System',
    pointsOrPenalty: '2 Rounds to Win',
    details: 'Matches are conducted in Best of 3 rounds (2 minutes each with 1 minute rest). The fighter who wins 2 rounds wins the match. If points are tied in a round: superiority is decided by high-value turning points, then strike hits, then hit registered counts, then referee decision.',
    officialRef: 'WT Competition Rules Article 15'
  },
  {
    category: 'Gam-jeom Penalties',
    ruleTitle: 'Boundary Exit',
    pointsOrPenalty: '+1 Point to Opponent',
    details: 'Crossing the boundary line completely with both feet touching the floor outside the boundary line triggers an immediate Gam-jeom.',
    officialRef: 'WT Competition Rules Article 14.4.1'
  },
  {
    category: 'Gam-jeom Penalties',
    ruleTitle: 'Falling Down',
    pointsOrPenalty: '+1 Point to Opponent',
    details: 'Falling to the floor without contact, or falling as an intentional tactic to avoid being kicked. Exception: if pushed down by opponent, the pusher receives Gam-jeom.',
    officialRef: 'WT Competition Rules Article 14.4.2'
  },
  {
    category: 'Gam-jeom Penalties',
    ruleTitle: 'Lifting Leg to Block / Inactivity',
    pointsOrPenalty: '+1 Point to Opponent',
    details: 'Lifting the knee or leg for more than 3 seconds without kicking ("monkey kick" / cut-kick stalling) or kicking below the belt.',
    officialRef: 'WT Competition Rules Article 14.4.4'
  },
  {
    category: 'Instant Video Replay (IVR)',
    ruleTitle: 'Coach Challenge Card',
    pointsOrPenalty: '1 Card per match (retained if successful)',
    details: 'Coaches may challenge head kicks, falling infractions, or technical turning points. If the review confirms the appeal, the card is retained; if rejected, the card is forfeited.',
    officialRef: 'WT Competition Rules Article 21'
  }
];

export const EXAM_QUESTION_BANK: ExamQuestion[] = [
  {
    id: 'eq-1',
    category: 'Gup Theory',
    question: 'What is the literal translation of the word "Tae-Kwon-Do"?',
    options: [
      'The art of unarmed striking and wrestling',
      'The Way of the Foot and the Fist',
      'The discipline of sword and shield',
      'The ancient art of Korean kings'
    ],
    correctIndex: 1,
    explanation: '"Tae" means foot/kicking, "Kwon" means fist/punching, and "Do" means the philosophical way of life.'
  },
  {
    id: 'eq-2',
    category: 'WT Referee Rules',
    question: 'Under official WT 2024–2026 Competition Rules, how many points are awarded for a valid turning kick to the trunk protector (PSS)?',
    options: ['2 points', '3 points', '4 points', '5 points'],
    correctIndex: 2,
    explanation: 'A regular kick to trunk is 2 points, while a turning kick (such as Dwi Chagi or Dolgae Chagi) earns 4 points.'
  },
  {
    id: 'eq-3',
    category: 'Korean Terminology',
    question: 'What is the Korean term for "Attention" and "Bow"?',
    options: [
      'Joon-bi and Shi-jak',
      'Charyeot and Kyeong-rye',
      'Kal-ryeo and Kye-sok',
      'Ap Koobi and Dwit Koobi'
    ],
    correctIndex: 1,
    explanation: 'Charyeot is the command for Attention; Kyeong-rye is the command to Bow in courtesy.'
  },
  {
    id: 'eq-4',
    category: 'Dan Mastery',
    question: 'What is the required Poomsae for promotion to 1st Dan under Kukkiwon regulations?',
    options: ['Taegeuk 8 Jang and Koryo', 'Keumgang and Taebaek', 'Sipjin and Jitae', 'Pyongwon only'],
    correctIndex: 0,
    explanation: 'Candidates for 1st Dan demonstrate the final Gup form (Taegeuk 8 Jang) and their designated foundational black belt form (Koryo).'
  },
  {
    id: 'eq-5',
    category: 'WT Referee Rules',
    question: 'If a fighter accumulates how many Gam-jeom penalties in a single round, will they lose that round automatically?',
    options: ['3 Gam-jeom', '5 Gam-jeom', '7 Gam-jeom', '10 Gam-jeom'],
    correctIndex: 1,
    explanation: 'Under WT Competition Rules (Article 15), if a contestant receives 5 Gam-jeom penalties in a single round, the referee declares the opponent winner of that round by penalty.'
  },
  {
    id: 'eq-6',
    category: 'Kyorugi Tactics',
    question: 'When fighting an opponent in the opposite stance (Open Stance: Left foot forward vs Right foot forward), which kick has the cleanest direct path to their open chest protector?',
    options: ['Rear leg Dollyo Chagi (Roundhouse Kick)', 'Lead leg side push', 'Low scoop kick', 'Axe kick to back of head'],
    correctIndex: 0,
    explanation: 'In open stance, the rear leg roundhouse kick travels directly into the open belly/chest protector with maximum power and minimal blocking obstruction.'
  },
  {
    id: 'eq-7',
    category: 'Gup Theory',
    question: 'Which of the following is NOT one of the traditional 5 Tenets of Taekwondo?',
    options: ['Courtesy (Ye-Ui)', 'Integrity (Yom-Chi)', 'Aggression (Gong-Gyeok)', 'Indomitable Spirit (Baekjeol-Bulgul)'],
    correctIndex: 2,
    explanation: 'The 5 Tenets are Courtesy, Integrity, Perseverance (In-Nae), Self-Control (Guk-Gi), and Indomitable Spirit. Aggression is contrary to the martial philosophy.'
  },
  {
    id: 'eq-8',
    category: 'Korean Terminology',
    question: 'What is the Korean term for "Horseback Riding Stance"?',
    options: ['Ap Seogi', 'Juchum Seogi', 'Beom Seogi', 'Moa Seogi'],
    correctIndex: 1,
    explanation: 'Juchum Seogi (Horseback Riding Stance) develops strong thigh stamina and core alignment.'
  }
];

export const GENERAL_TERMINOLOGY: TerminologyItem[] = [
  { koreanHangul: '도장', romanized: 'Dojang', englishMeaning: 'Taekwondo Training Hall / Gymnasium', category: 'General' as any, technicalCues: 'Sacred floor of discipline; bow when entering and leaving.', urdu: 'تائیکوانڈو ٹریننگ ہال', arabic: 'قاعة تدريب التايكوندو' },
  { koreanHangul: '도복', romanized: 'Dobok', englishMeaning: 'Taekwondo Uniform', category: 'General' as any, technicalCues: 'White uniform symbolizing purity, belt tied evenly with ends balanced.', urdu: 'تائیکوانڈو کی وردی', arabic: 'بدلة التايكوندو' },
  { koreanHangul: '띠', romanized: 'Tti', englishMeaning: 'Belt', category: 'General' as any, technicalCues: 'Represents student rank and spiritual journey.', urdu: 'بیلٹ / پٹکا', arabic: 'الحزام' },
  { koreanHangul: '사범님', romanized: 'Sabomnim', englishMeaning: 'Master Instructor (4th Dan & above)', category: 'Command', technicalCues: 'Address with respectful bow and hands placed cleanly in front.', urdu: 'ماسٹر انسٹرکٹر', arabic: 'المدرب الأستاذ' },
  { koreanHangul: '관장님', romanized: 'Kwanjangnim', englishMeaning: 'Grandmaster / School President', category: 'Command', technicalCues: 'Highest ranking head of dojang or federation.', urdu: 'گرینڈ ماسٹر / چیف', arabic: 'الجراند ماستر' },
  { koreanHangul: '기합', romanized: 'Kihap', englishMeaning: 'Energy Shout / Martial Shout', category: 'Command', technicalCues: 'Exhale sharply from lower abdomen (Danjeon) on point of impact.', urdu: 'توانائی کی للکار / چیخ', arabic: 'صرخة الطاقة القتالية' },
  { koreanHangul: '겨루기', romanized: 'Kyorugi', englishMeaning: 'Sparring / Match Combat', category: 'Referee', technicalCues: 'Dynamic Olympic style free combat on octagonal mat.', urdu: 'مقابلہ / فائٹنگ', arabic: 'القتال / المبارزة' },
  { koreanHangul: '품새', romanized: 'Poomsae', englishMeaning: 'Forms / Patterns', category: 'Poomsae', technicalCues: 'Defensive and offensive techniques arranged in meaningful diagrammatic patterns.', urdu: 'تائیکوانڈو فارمز', arabic: 'البومسي (الحركات الاستعراضية)' }
];
