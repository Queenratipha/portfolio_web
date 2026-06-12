// ============================================================
// Portfolio Data — IRAKOZE Latifa
// Edit this file to update your portfolio content
// ============================================================

export const personalInfo = {
  name: 'IRAKOZE Latifa',
  title: 'Creative UI/UX Designer & Full-Stack Developer',
  taglines: [
    'UI/UX Designer',
    'Front-End Developer',
    'React.js Specialist',
    'Full-Stack Developer',
    'Creative Problem Solver',
  ],
  bio: `A passionate designer and developer with 2+ years of experience creating beautiful, 
    user-centric experiences. I bridge the gap between design and development, turning creative 
    visions into actionable, engaging applications that users love. My approach combines aesthetic 
    skills with technical expertise to deliver exceptional results.`,
  email: 'irakozeratipha@gmail.com',
  phone: '+250796291905',
  phone2: '+250738320430',
  location: 'Kigali, Gasabo, Rwanda',
  website: 'latifairakoze.design',
  whatsapp: 'https://wa.me/250796291905',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  twitter: 'https://twitter.com/',
  cvFile: '/cv.html',
  availableForWork: true,
  yearsExperience: 2,
  projectsCompleted: 20,
  happyClients: 15,
  coffeeConsumed: 500,
};

export const skills = [
  // Frontend
  { name: 'HTML5', level: 98, category: 'Frontend', color: '#e34f26' },
  { name: 'CSS3 / Sass', level: 96, category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', level: 92, category: 'Frontend', color: '#f7df1e' },
  { name: 'React.js', level: 90, category: 'Frontend', color: '#61dafb' },
  { name: 'Tailwind CSS', level: 88, category: 'Frontend', color: '#06b6d4' },
  // UI/UX
  { name: 'UI/UX Design', level: 95, category: 'Design', color: '#ff6b6b' },
  { name: 'Figma', level: 90, category: 'Design', color: '#f24e1e' },
  { name: 'Adobe XD', level: 80, category: 'Design', color: '#ff61f6' },
  // Backend
  { name: 'Node.js', level: 78, category: 'Backend', color: '#68a063' },
  { name: 'Express.js', level: 72, category: 'Backend', color: '#ffffff' },
  { name: 'MongoDB', level: 65, category: 'Backend', color: '#47a248' },
  { name: 'Python', level: 40, category: 'Backend', color: '#3776ab' },
];

export const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'knax_250',
    period: '2022 – Present',
    type: 'Full-time',
    description:
      'Led design initiatives for mobile and web applications serving 500K+ users. Collaborated with cross-functional teams to redesign the main product interface, resulting in a 40% increase in user engagement. Mentored junior developers and established comprehensive design system guidelines that improved development efficiency by 60%.',
    tech: ['React', 'Node.js', 'MongoDB', 'Figma'],
  },
  {
    id: 2,
    role: 'Front-End Developer & Designer',
    company: 'knax_250',
    period: '2024 – Present',
    type: 'Full-time',
    description:
      'Developed responsive web applications using React and modern CSS frameworks. Designed and implemented user interfaces for 20+ client projects, focusing on accessibility and performance optimization. Improved website performance by 60% through advanced optimization techniques.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
];

export const education = [
  {
    id: 1,
    degree: 'Certificate in Full Stack Web Development',
    institution: 'knax_250',
    location: 'Rwanda',
    year: '2025',
    description: 'Intensive internship program covering full-stack development, cloud services, and modern web practices.',
    icon: '🎓',
  },
  {
    id: 2,
    degree: 'L3 Certificate – Front-End Developer',
    institution: 'GARDEN TSS',
    location: 'Rwanda',
    year: '2023 – 2024',
    description: 'Comprehensive front-end curriculum covering HTML, CSS, JavaScript, and React fundamentals.',
    icon: '📚',
  },
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with product filtering, cart management, payment integration, and real-time inventory tracking.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative Kanban-style project management tool with drag-and-drop, real-time updates, team collaboration, and deadline tracking.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    tags: ['React', 'Firebase', 'Tailwind', 'DnD'],
    category: 'Frontend',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Healthcare Dashboard',
    description: 'Modern healthcare management dashboard with patient records, appointment scheduling, analytics, and responsive design for all devices.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    tags: ['React', 'Chart.js', 'REST API', 'CSS Grid'],
    category: 'UI/UX',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Restaurant Booking App',
    description: 'Complete restaurant reservation system with real-time table availability, menu showcase, order management, and customer notifications.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Twilio'],
    category: 'Full Stack',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Finance Tracker',
    description: 'Personal finance management app with expense tracking, budget goals, interactive charts, CSV export, and multi-currency support.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    tags: ['React', 'Redux', 'Recharts', 'LocalStorage'],
    category: 'Frontend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Brand Identity Design',
    description: 'Complete brand identity package for a tech startup including logo design, color palette, typography system, and brand guidelines document.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Figma', 'Adobe XD', 'Illustrator', 'Branding'],
    category: 'UI/UX',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export const services = [
  {
    id: 1,
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating stunning, user-centered interfaces with intuitive user flows, wireframes, prototypes, and high-fidelity designs that convert.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    icon: '⚛️',
    title: 'React Development',
    description: 'Building performant, scalable React applications with modern hooks, context API, and best practices for maintainable codebases.',
    features: ['React.js', 'Next.js', 'TypeScript', 'Testing'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    icon: '🔧',
    title: 'Full-Stack Development',
    description: 'End-to-end web application development from database architecture to polished UI, handling both frontend and backend seamlessly.',
    features: ['Node.js', 'MongoDB', 'REST APIs', 'Deployment'],
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    icon: '📱',
    title: 'Responsive Design',
    description: 'Crafting pixel-perfect responsive layouts that look and perform flawlessly on every device, from mobile phones to large desktop screens.',
    features: ['Mobile-First', 'Tailwind CSS', 'CSS Grid', 'Flexbox'],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    icon: '🚀',
    title: 'Performance Optimization',
    description: 'Auditing and optimizing web apps for blazing fast load times, smooth animations, and excellent Core Web Vitals scores.',
    features: ['Code Splitting', 'Lazy Loading', 'SEO', 'Caching'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    icon: '🛒',
    title: 'E-Commerce Solutions',
    description: 'Building complete online stores with product management, secure payment gateways, inventory systems, and customer dashboards.',
    features: ['Stripe/PayPal', 'Cart & Checkout', 'Admin Panel', 'Analytics'],
    color: 'from-indigo-500 to-purple-500',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Jean-Pierre Habimana',
    role: 'CEO, TechKigali',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    rating: 5,
    text: "Latifa transformed our outdated website into a modern, fast, and beautiful platform. Her attention to detail and dedication to user experience is unmatched. Our conversion rate went up 45% after the redesign!",
  },
  {
    id: 2,
    name: 'Amina Uwera',
    role: 'Founder, AfriStyle',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
    rating: 5,
    text: "Working with Latifa was an absolute pleasure. She understood our brand vision perfectly and delivered a website that exceeded all expectations. Professional, creative, and technically excellent.",
  },
  {
    id: 3,
    name: 'David Mugisha',
    role: 'Product Manager, StartupRW',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
    text: "Latifa built our entire SaaS dashboard from scratch. Her React skills are exceptional, and she managed the project independently with minimal supervision. Highly recommend her for complex projects.",
  },
  {
    id: 4,
    name: 'Sarah Nkurunziza',
    role: 'Marketing Director, GreenRwanda',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    text: "The landing page Latifa designed for our campaign got an amazing response. Clean, modern design with great animations. She delivered on time and was extremely responsive throughout the process.",
  },
];

export const languages = [
  { name: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' },
  { name: 'English', level: 'Fluent', flag: '🇺🇸' },
  { name: 'French', level: 'Basic', flag: '🇫🇷' },
];

export const interests = [
  { name: 'Digital Art', icon: '🎨' },
  { name: 'Photography', icon: '📸' },
  { name: 'Running', icon: '🏃‍♀️' },
  { name: 'Music', icon: '🎵' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Reading', icon: '📚' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];
