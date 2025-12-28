
import { Project, SiteContent, Song } from './types';

export const INITIAL_SITE_CONTENT: SiteContent = {
  heroTagline: "EST. 198X // ADVENTURES LAB",
  heroHeadline1: "SURPRISE",
  heroHeadline2: "MOVE",
  heroDescription: "WE BUILD DIGITAL EXPERIMENTS.\nSOMETIMES THEY BREAK.\nTHEN WE FIX THEM OR KILL THEM.",
  
  aboutTitle: "THE RULES\nHAVE CHANGED.",
  aboutText: "Born in the storm water drains of Dickson. We're co-conspirators just hacking on ideas that might go nowhere or might change everything.\n\nWe build fast because we're impatient. We break things because it's educational. You miss 100% of the shots you don't take, so we're just taking shots.\n\nLet's find an abandoned house with an empty pool together.",
  
  // About Page Specifics
  aboutHeadline: "WE ARE THE\nGLITCH.",
  aboutManifesto: "THE CORPORATE WORLD IS BEIGE. WE PAINT IN NEON.\n\nThis isn't a business plan, it's a sketchbook with a domain name. We are a venture studio built on caffeine, loud music, and spaghetti code that somehow runs.\n\nWe don't have a roadmap. We have momentum. We don't chase clients. We chase the glitch. If it's fun, we build it. If it works, we ship it.",
  aboutValues: [
    "JUST SHIP IT",
    "SERIOUS PLAY",
    "CHAOTIC GOOD",
    "FAIL LOUDLY",
    "VIBES OVER ROI"
  ],
  aboutQuote: "\"If it ain't broken, break it.\"",

  contactTitle: "GOT AN IDEA?\nOR A COMPLAINT?",
  contactSubtitle: "(TELL YO MAMA)"
};

export const PLAYLIST: Song[] = [
  {
    id: 'track1',
    name: 'Night Owl',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3',
  },
  {
    id: 'track2',
    name: 'Enthusiast',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
  },
  {
    id: 'track3',
    name: 'Algorithms',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3',
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Gnar-lytics',
    description: 'Real-time shredding metrics for your SaaS. Track MRR while you hit the half-pipe.',
    fullDescription: 'Stop staring at boring spreadsheets. Gnar-lytics turns your boring Stripe data into a high-score arcade game. We gamified the hustle so you can grind on revenue metrics like you grind a handrail. Built for founders who play to win.',
    features: [
      'Real-time MRR visualizer (8-bit style)',
      'Churn alerts that sound like breaking glass',
      'Competitor tracking radar',
      'Dark mode only (obviously)'
    ],
    techStack: ['Next.js', 'Supabase', 'D3.js', 'WebGL'],
    tags: ['Dashboard', 'Analytics', 'Radical'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    gallery: [
        'https://picsum.photos/600/400?random=10',
        'https://picsum.photos/600/400?random=11'
    ],
    link: '#',
    status: 'LIVE'
  },
  {
    id: '2',
    title: 'Deck Check',
    description: 'AI-powered skateboard deck recognition. Is it a Powell Peralta or a cheap knockoff?',
    fullDescription: 'Using computer vision models trained on over 50,000 vintage skate magazines and blurry VHS tapes, Deck Check instantly identifies any board. Point your camera, snap a pic, and get the history, estimated value, and street cred rating instantly.',
    features: [
      'Instant brand recognition',
      'Vintage value estimator',
      'Fake vs Real detection',
      'Marketplace integration'
    ],
    techStack: ['Python', 'TensorFlow', 'React Native', 'FastAPI'],
    tags: ['AI', 'Vision', 'Utility'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    gallery: [
        'https://picsum.photos/600/400?random=12',
        'https://picsum.photos/600/400?random=13'
    ],
    link: '#',
    status: 'MVP'
  },
  {
    id: '3',
    title: 'Thrash Cache',
    description: 'Decentralized storage for your underground zines. Keep your content safe.',
    fullDescription: ' The internet is rotting. Corporate servers are deleting history. Thrash Cache uses IPFS to permanently archive underground punk and skate zines. Once it is uploaded, it cannot be taken down. Information wants to be free, man.',
    features: [
      'Perma-storage via IPFS',
      'Encrypted uploads',
      'Zine reader viewer',
      'Community curation'
    ],
    techStack: ['Solidity', 'IPFS', 'Ethereum', 'React'],
    tags: ['Web3', 'Storage', 'Privacy'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    gallery: [
        'https://picsum.photos/600/400?random=14',
        'https://picsum.photos/600/400?random=15'
    ],
    link: '#',
    status: 'MATURE/EXIT'
  },
  {
    id: '4',
    title: 'Bail Bond',
    description: 'Insurance for when your code crashes hard. Automated rollback systems.',
    fullDescription: 'We tried to build a DevOps tool that automatically reverts bad deploys by bribing the server. It turns out servers do not take bribes. This project failed spectacularly, but the UI was sick.',
    features: [
      'Automatic Rollbacks',
      'Slack Shaming Bot',
      'Incident Reports generated in Haiku'
    ],
    techStack: ['Go', 'Kubernetes', 'Docker'],
    tags: ['DevOps', 'Security', 'Tools'],
    imageUrl: 'https://picsum.photos/600/400?random=4',
    gallery: [
        'https://picsum.photos/600/400?random=16',
        'https://picsum.photos/600/400?random=17'
    ],
    link: '#',
    status: 'DEAD'
  },
  {
    id: '5',
    title: 'Vibe Coder',
    description: 'An IDE that only compiles if the vibe is right. Plays punk rock while you debug.',
    fullDescription: 'Why code in silence? Vibe Coder connects to Spotify and your linter. If the music stops, the code stops compiling. If you write a bug, the music switches to Easy Listening Jazz. Keep the BPM up to keep the build passing.',
    features: [
      'BPM-based compilation',
      'Linter-controlled volume',
      'Mosh pit mode (Dark Theme)'
    ],
    techStack: ['Electron', 'Spotify API', 'TypeScript'],
    tags: ['IDE', 'Audio', 'Experiment'],
    imageUrl: 'https://picsum.photos/600/400?random=5',
    gallery: [
        'https://picsum.photos/600/400?random=18',
        'https://picsum.photos/600/400?random=19'
    ],
    link: '#',
    status: 'HACKING IT'
  },
  {
    id: '6',
    title: 'DFLCT',
    description: 'Privacy gear for the kids who grew up glitching arcade machines. Stay unscannable.',
    fullDescription: 'The machines are watching like it’s Blade Runner, and most people just shrug. DFLCT doesn’t. This is privacy gear for the kids who grew up glitching arcade machines and skating carparks after dark. Patterns that scramble tracking like a scratched CD, materials that block signals like a busted Walkman aerial. Neo-streetwear for anyone who refuses to be background data.',
    features: [
      'Adversarial Patterns', 
      'Signal Blocking Pockets', 
      'Flash-Reflective Fabric'
    ],
    techStack: ['Computer Vision', 'Textile Engineering', 'RFID Shielding'],
    tags: ['OffTheRadar', 'CyberStreet', 'Privacy'],
    imageUrl: 'https://picsum.photos/600/400?random=6',
    gallery: [
        'https://picsum.photos/600/400?random=20',
        'https://picsum.photos/600/400?random=21'
    ],
    link: '#',
    status: 'MVP'
  },
  {
    id: '7',
    title: 'Comment Collector',
    description: 'One dashboard, every opinion. Pulls the chaotic web together like a mixtape.',
    fullDescription: 'The comment section is the Wild West of the internet — like the food court of an 80s mall after school: noisy, chaotic, weirdly poetic. Comment Collector pulls it together like your mate who always made the perfect mixtape. One dashboard, every opinion, sorted into something you can actually ride.',
    features: [
      'Cross-platform Aggregation',
      'Sentiment Filtering',
      'Vibe Check Analytics'
    ],
    techStack: ['React', 'Node.js', 'NLP Models'],
    tags: ['MixtapeMetrics', 'MallRatScience', 'Social'],
    imageUrl: 'https://picsum.photos/600/400?random=7',
    gallery: [
        'https://picsum.photos/600/400?random=22',
        'https://picsum.photos/600/400?random=23'
    ],
    link: '#',
    status: 'LIVE'
  },
  {
    id: '8',
    title: 'Sounderly',
    description: 'Your life needs a soundtrack. Adaptive scores that follow you like a boombox.',
    fullDescription: 'Remember when life felt like a movie montage? Sounderly brings that back. Your own soundtrack — part The Breakfast Club, part Tony Hawk Pro Skater — shifting with your mood, your grind, your wins. No playlists. No scrolling. Just a score that follows you like the boom box you always wanted trailing behind you.',
    features: [
      'Context-Adaptive Audio',
      'Mood Detection',
      'Infinite Generative Mix'
    ],
    techStack: ['Web Audio API', 'AI Music Gen', 'Mobile Sensors'],
    tags: ['MontageMode', 'SkateSound', 'Audio'],
    imageUrl: 'https://picsum.photos/600/400?random=8',
    gallery: [
        'https://picsum.photos/600/400?random=24',
        'https://picsum.photos/600/400?random=25'
    ],
    link: '#',
    status: 'CONCEPT TESTING'
  },
  {
    id: '9',
    title: 'M-View',
    description: 'Hacked-together real-time streaming from the 90s dial-up swamp.',
    fullDescription: 'Before FaceTime was a verb and before livestreams were everywhere, we were dragging real-time video out of the 90s dial-up swamp and into the future. M-View was full-stack streaming built like a DIY skate ramp — hardware, software, codecs, the lot. Used in hospitals, regional towns, and places where buffering meant someone could get hurt. Think WarGames meets early GoPro energy: hacked-together brilliance that somehow worked every time.',
    features: [
      'Low-Bandwidth Optimization',
      'Custom Codecs',
      'Hardware Encoding'
    ],
    techStack: ['C++', 'RTSP', 'Embedded Systems'],
    tags: ['RealTime', 'FullStack', 'Legacy'],
    imageUrl: 'https://picsum.photos/600/400?random=9',
    gallery: [
        'https://picsum.photos/600/400?random=26',
        'https://picsum.photos/600/400?random=27'
    ],
    link: '#',
    status: 'MATURE/EXIT'
  },
  {
    id: '10',
    title: 'The AI Survival Kit',
    description: 'A counter-manual field guide for professionals staring down the AI wave.',
    fullDescription: 'Corporates are acting like Skynet is “not their problem.” The AI Survival Kit is the counter-manual — a throwback field guide for anyone who grew up on Terminator, watched the robots win, and decided to stay human anyway. It’s built like an underground skate zine: gritty, practical, no academic fluff. Thinking Engines replace templates. Survival Protocols replace panic. A Clarity Journal that forces you to write like your modem is about to drop out. This is how professionals stay sharp when the machines start speeding up.',
    features: [
      'The Alignment Engine',
      'The Strategic Mirror',
      'The Influence Decoder',
      'Survival Protocols',
      'The Clarity Journal'
    ],
    techStack: ['Notion', 'Webflow', 'Memberstack', 'Stripe', 'Loom'],
    tags: ['AISurvival', 'AnalogMindset', 'StayHuman'],
    imageUrl: 'https://picsum.photos/600/400?random=28',
    gallery: [
        'https://picsum.photos/600/400?random=29',
        'https://picsum.photos/600/400?random=30'
    ],
    link: '#',
    status: 'LIVE'
  }
];
