import { jsPDF } from 'jspdf';

export const generateResumeBlobUrl = () => {
  const doc = new jsPDF();
  
  // Settings
  const margin = 20;
  let y = 20;
  
  const addLine = (weight: number = 0.5) => {
    doc.setLineWidth(weight);
    doc.line(margin, y, 210 - margin, y);
    y += 5;
  };

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Mohammed Jaid', 105, y, { align: 'center' });
  
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('+91-8318666236 | mohammedjaid813@gmail.com | linkedin.com/in/mohammedjaid', 105, y, { align: 'center' });
  
  y += 5;
  doc.text('github.com/zaid753 | leetcode.com/u/zaid4hamed', 105, y, { align: 'center' });
  
  y += 8;
  addLine(0.2);
  
  // Technical Skills
  y += 5;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', margin, y);
  
  y += 7;
  doc.setFontSize(10);
  const skills = [
    { label: 'Languages:', value: 'JavaScript, Python, C++, TypeScript, SQL' },
    { label: 'Frontend:', value: 'React.js, Next.js, Tailwind CSS, HTML5' },
    { label: 'Backend:', value: 'Node.js, Express.js, REST APIs' },
    { label: 'Databases:', value: 'MongoDB, Firebase, MySQL' },
    { label: 'Cloud & AI:', value: 'OpenAI API, Google Gemini API, n8n, Dialogflow, Vercel' },
    { label: 'Dev Tools:', value: 'Git, GitHub, Postman, Figma, WebRTC, AWS/OCI' }
  ];

  skills.forEach(skill => {
    doc.setFont('helvetica', 'bold');
    doc.text(skill.label, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(skill.value, margin + 28, y);
    y += 5;
  });

  // Projects
  y += 5;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('PROJECTS', margin, y);
  y += 2;
  addLine(0.2);
  
  const projects = [
    {
      title: 'StockPilot 2.0 | React.js, Node.js, Express.js, AI/ML, MongoDB',
      date: '2025',
      points: [
        'Developed a full-stack inventory management and sales analytics platform featuring product tracking and voice-based system.',
        'Implemented AI automation for stock monitoring and smart invoice generation using OCR technologies.'
      ]
    },
    {
      title: 'PulseTalk | React.js, Node.js, Express.js, Firebase, Dialogflow',
      date: '2025-2026',
      points: [
        'Architected a full-stack AI telehealth platform for rural India; implemented voice-based symptom triage via Dialogflow NLP.',
        'Engineered real-time teleconsultation using Daily.co WebRTC and role-specific dashboards for healthcare workers.'
      ]
    },
    {
      title: 'NyayaSarathi | TypeScript, Next.js, Google Gemini API, Vercel',
      date: '2025',
      points: [
        'Built a LegalTech platform integrating Gemini API to translate legal queries into structured guidance.',
        'Improving legal accessibility for non-expert users with modular Next.js architecture.'
      ]
    },
    {
      title: 'GlobeTrekker | TypeScript, React, Vite, Google Gemini API, Firebase',
      date: '2025',
      points: [
        'AI travel planner generating personalized itineraries via natural language.',
        'Deployed on Vercel with responsive UI and modular architecture for fast bundling.'
      ]
    }
  ];

  projects.forEach(project => {
    y += 5;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(project.title, margin, y);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(project.date, 190 - margin, y, { align: 'right' });
    
    project.points.forEach(point => {
      y += 5;
      doc.text('\u2022 ' + point, margin + 5, y, { maxWidth: 170 });
      y += (doc.getTextDimensions(point, { maxWidth: 170 }).h / 4);
    });
    y += 2;
  });

  // Experience
  y += 5;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('EXPERIENCE', margin, y);
  y += 2;
  addLine(0.2);
  
  const experiences = [
    {
      company: 'Indian Institute of Technology, Kanpur',
      role: 'Project Intern - Virtual Labs, Ministry of Education',
      date: 'Oct 2024 - Jun 2025',
      points: [
        'Contributed to India\'s national Virtual Labs platform, improving physics simulations accessed by thousands of students.',
        'Refactored simulation logic and enhanced frontend UI for a government-backed open-source codebase.'
      ]
    },
    {
      company: 'Google',
      role: 'Student Ambassador (Nationally Selected)',
      date: 'Sep 2025 - Feb 2026',
      points: [
        'Conducted AI workshops on Google Gemini and Google Cloud for 1000+ students.',
        'Drove developer ecosystem adoption and cloud certification awareness on campus.'
      ]
    }
  ];

  experiences.forEach(exp => {
    y += 5;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.company, margin, y);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(exp.date, 190 - margin, y, { align: 'right' });
    
    y += 5;
    doc.setFont('helvetica', 'bolditalic');
    doc.text(exp.role, margin + 5, y);
    
    exp.points.forEach(point => {
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.text('\u2022 ' + point, margin + 5, y, { maxWidth: 170 });
    });
    y += 2;
  });

  // Education
  y += 5;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', margin, y);
  y += 2;
  addLine(0.2);
  
  y += 5;
  doc.setFontSize(11);
  doc.text('Dr. A.P.J. Abdul Kalam Technical University (AKTU) - REC Banda', margin, y);
  doc.setFontSize(9);
  doc.text('2023 - 2027', 190 - margin, y, { align: 'right' });
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('Bachelor of Technology in Information Technology', margin + 5, y);

  // Return blob URL for preview
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
};

export const generateResume = () => {
  const url = generateResumeBlobUrl();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Mohammed_Jaid_Resume.pdf';
  a.click();
  URL.revokeObjectURL(url);
};
