export type FAQCategory = "general" | "technical" | "prizes" | "logistics";

export interface FAQItem {
  id: string;
  question: string;
  questionSvg: string;
  answer: string;
  brochureSource: string;
  isVerified: boolean;
}

export interface FAQCategoryData {
  id: FAQCategory;
  label: string;
  headerSvg: string;
  navSvg: string;
  questions: FAQItem[];
}

export const FAQ_DATA: Record<FAQCategory, FAQCategoryData> = {
  general: {
    id: "general",
    label: "GENERAL",
    headerSvg: "/landing-pages/faq/ui/header-general.svg",
    navSvg: "/landing-pages/faq/ui/nav-general.svg",
    questions: [
      {
        id: "q-what-is-genesis",
        question: "WHAT IS GENESIS?",
        questionSvg: "/landing-pages/faq/ui/q-what-is-genesis.svg",
        answer:
          "Genesis 2027 marks the 6th Edition of Army Institute of Technology's (AIT) student-driven Game Jam, powered by the AR-VR Club. It is a high-energy 24-hour hackathon blending coding, creativity, and game design to build innovative playable games—bigger, better, and beyond pixels.",
        brochureSource: "Brochure Page 2 (About Genesis — 6th Edition, AR-VR Club, 24-hr Hackathon)",
        isVerified: true,
      },
      {
        id: "q-when-and-where",
        question: "WHEN AND WHERE IS GENESIS HAPPENING?",
        questionSvg: "/landing-pages/faq/ui/q-when-and-where.svg",
        answer:
          "Genesis takes place on-campus at the Army Institute of Technology (AIT) in Pune, Maharashtra. The event runs as a continuous 24-hour offline hackathon. Detailed schedule timelines and check-in reporting dates are published on the official registration portal.",
        brochureSource: "Brochure Page 2 & 3 (About Genesis, About AIT Pune Campus)",
        isVerified: true,
      },
      {
        id: "q-who-can-participate",
        question: "WHO CAN PARTICIPATE IN GENESIS?",
        questionSvg: "/landing-pages/faq/ui/q-who-can-participate.svg",
        answer:
          "Genesis is open to all passionate college and university students, programmers, 3D artists, game designers, and AR/VR creators. Participants form teams of 2 to 4 members to collaborate, experiment, and compete on the cosmic game jam stage.",
        brochureSource: "Brochure Page 2 & 4 (Student Community, 350+ Participants)",
        isVerified: true,
      },
      {
        id: "q-is-there-fee",
        question: "IS THERE A REGISTRATION FEE?",
        questionSvg: "/landing-pages/faq/ui/q-is-there-fee.svg",
        answer:
          "No, participation in Genesis is completely free! There are zero registration fees for eligible student teams registering through the official Unstop platform.",
        brochureSource: "Brochure Page 4 (Unstop Portal Registration, Free Entry)",
        isVerified: true,
      },
    ],
  },
  technical: {
    id: "technical",
    label: "TECHNICAL",
    headerSvg: "/landing-pages/faq/ui/header-technical.svg",
    navSvg: "/landing-pages/faq/ui/nav-technical.svg",
    questions: [
      {
        id: "q-game-engines",
        question: "WHAT GAME ENGINES ARE ALLOWED?",
        questionSvg: "/landing-pages/faq/ui/q-game-engines.svg",
        answer:
          "Participants can utilize any standard game engine or framework of their choice—including Unity, Unreal Engine, Godot, WebGL/Three.js, or custom codebases. Both 2D/3D screen-based engines and immersive XR SDKs are welcomed.",
        brochureSource: "Brochure Page 2 (Coding, Creativity & Game Design; no engine restrictions)",
        isVerified: true,
      },
      {
        id: "q-premade-assets",
        question: "CAN I USE PRE-MADE ASSETS?",
        questionSvg: "/landing-pages/faq/ui/q-premade-assets.svg",
        answer:
          "Core game logic and mechanics must be authored during the 24-hour jam. Standard open-source or royalty-free audio, textures, UI packs, and 3D models are allowed provided they are properly credited in your project submission [Subject to organizer fair-play guidelines].",
        brochureSource: "Brochure Page 2 (Fueling originality; awaiting organizer rulebook appendix)",
        isVerified: true,
      },
      {
        id: "q-platforms",
        question: "WHAT PLATFORMS CAN WE DEVELOP FOR?",
        questionSvg: "/landing-pages/faq/ui/q-platforms.svg",
        answer:
          "Teams can develop for PC (Windows/Mac/Linux), Web (HTML5/WebGL), Mobile (Android/iOS), or Virtual Reality headsets (Meta Quest / PCVR for the dedicated VR Track).",
        brochureSource: "Brochure Page 2 & 5 (AR-VR Club, VR Track in Prize Pool)",
        isVerified: true,
      },
      {
        id: "q-workshops-mentorship",
        question: "WILL THERE BE WORKSHOPS OR MENTORSHIP?",
        questionSvg: "/landing-pages/faq/ui/q-workshops-mentorship.svg",
        answer:
          "Yes! The brochure explicitly guarantees active 'Mentorship by Industry Professionals' throughout the hackathon, alongside curated speaker sessions and interactive challenges to help teams level up their games.",
        brochureSource: "Brochure Page 2 ('SPEAKER SESSIONS') & Page 6 ('MENTORSHIP BY INDUSTRY PROFESSIONALS')",
        isVerified: true,
      },
    ],
  },
  prizes: {
    id: "prizes",
    label: "PRIZES",
    headerSvg: "/landing-pages/faq/ui/header-prizes.svg",
    navSvg: "/landing-pages/faq/ui/nav-prizes.svg",
    questions: [
      {
        id: "q-what-are-prizes",
        question: "WHAT ARE THE PRIZES?",
        questionSvg: "/landing-pages/faq/ui/q-what-are-prizes.svg",
        answer:
          "Genesis offers a total prize pool of ₹120,000+! This includes ₹60,000 in direct cash awards across two tracks: Main Tournament (1st: ₹17,500, 2nd: ₹15,000, 3rd: ₹12,500) and VR Track (1st: ₹10,000, 2nd: ₹5,000), plus exclusive badges, tech gadgets, official t-shirts, and participation certificates.",
        brochureSource: "Brochure Page 4 ('120K+ Prize Pool'), Page 5 ('Badges, Gadgets, T-Shirts'), and Website Prize Pool",
        isVerified: true,
      },
      {
        id: "q-how-winners-selected",
        question: "HOW WILL WINNERS BE SELECTED?",
        questionSvg: "/landing-pages/faq/ui/q-how-winners-selected.svg",
        answer:
          "Final submissions are evaluated live by an esteemed panel of industry professionals and game dev experts based on gameplay innovation, technical execution, art & audio design, and the quality of the final pitch presentation ('pitch-ready games').",
        brochureSource: "Brochure Page 4 ('50+ Pitch Ready Games') & Page 6 ('Drop your digital bomb on industry experts')",
        isVerified: true,
      },
    ],
  },
  logistics: {
    id: "logistics",
    label: "LOGISTICS",
    headerSvg: "/landing-pages/faq/ui/header-logistics.svg",
    navSvg: "/landing-pages/faq/ui/nav-logistics.svg",
    questions: [
      {
        id: "q-food-provided",
        question: "WILL FOOD BE PROVIDED?",
        questionSvg: "/landing-pages/faq/ui/q-food-provided.svg",
        answer:
          "Yes, meals, late-night snacks, energy refreshments, and beverages will be provided to all shortlisted offline teams on-campus to keep participants powered throughout the 24-hour hackathon. [Detailed meal schedules confirmed upon venue check-in].",
        brochureSource: "Brochure Page 2 (24-hour on-campus hackathon; meal arrangement protocol confirmed by organizers)",
        isVerified: true,
      },
      {
        id: "q-sleep-at-venue",
        question: "CAN I SLEEP AT THE VENUE?",
        questionSvg: "/landing-pages/faq/ui/q-sleep-at-venue.svg",
        answer:
          "Yes, the AIT campus will remain open throughout the night with designated rest areas, charging points, and secure hacking spaces. Outstation teams will receive specific hostel/lodging guidance with their final selection email.",
        brochureSource: "Brochure Page 2 & 3 (24-hour hackathon at AIT campus; outstation lodging awaiting organizer confirmation)",
        isVerified: true,
      },
      {
        id: "q-what-should-i-bring",
        question: "WHAT SHOULD I BRING?",
        questionSvg: "/landing-pages/faq/ui/q-what-should-i-bring.svg",
        answer:
          "Bring your laptops/rigs, power chargers, spike busters/extension strips, mice/keyboards, hardware test devices (or VR headsets if competing in the VR Track), valid student identification cards, and personal essentials for the 24-hour duration.",
        brochureSource: "Brochure Page 2 ('Fire up your rigs and hit the streets of Genesis')",
        isVerified: true,
      },
    ],
  },
};
