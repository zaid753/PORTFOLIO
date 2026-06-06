const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });

doc.pipe(fs.createWriteStream('public/resume.pdf'));

doc.fontSize(24).text('Mohammed Jaid', { align: 'center' });
doc.fontSize(10).moveDown();
doc.text('+91-8318666236 | mohammedjaid813@gmail.com | linkedin.com/in/mohammedjaid', { align: 'center' });
doc.moveDown(2);

doc.fontSize(14).text('TECHNICAL SKILLS', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10);
doc.text('Languages: JavaScript, Python, C++, TypeScript, SQL');
doc.text('Frontend: React.js, Next.js, Tailwind CSS, HTML5');
doc.text('Backend: Node.js, Express.js, REST APIs');
doc.text('Databases: MongoDB, Firebase, MySQL');
doc.text('Cloud, AI & APIs: OpenAI API, Google Gemini API, n8n, Dialogflow, Vercel');
doc.text('Developer Tools: Git, GitHub, Postman, Figma, WebRTC, AWS/OCI');

doc.moveDown(1.5);
doc.fontSize(14).text('PROJECTS', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10);
doc.font('Helvetica-Bold').text('PulseTalk (2025-2026)');
doc.font('Helvetica').text('- Architected a full-stack AI telehealth platform for rural India; implemented voice-based symptom triage via Dialogflow.');
doc.text('- Engineered real-time teleconsultation using Daily.co WebRTC, persistent health records in Firebase Firestore.');
doc.text('- Designed a scalable Node.js + Express.js backend with offline-resilient architecture; Winner - HACKFEST SDC.');

doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('NyayaSarathi (2025)');
doc.font('Helvetica').text('- Built a full-stack LegalTech platform integrating Google Gemini API to translate legal queries.');
doc.text('- Engineered a modular Next.js + TypeScript frontend with a clean services-layer API separation, responsive Tailwind CSS UI.');

doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('GlobeTrekker (2025)');
doc.font('Helvetica').text('- Developed an AI-powered travel planner integrating Google Gemini API to generate structured, day-wise itineraries.');
doc.text('- Implemented a modular React + TypeScript + Vite architecture.');

doc.moveDown(1.5);
doc.fontSize(14).text('EXPERIENCE', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10);
doc.font('Helvetica-Bold').text('Indian Institute of Technology, Kanpur');
doc.font('Helvetica').text('Project Intern - Virtual Labs (Oct 2024 - Jun 2025)');
doc.text('- Contributed to India\'s national Virtual Labs platform, improving a physics simulation.');

doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('BhuBhraman');
doc.font('Helvetica').text('Web Development Intern (June 2024 - Jul 2024)');

doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Google');
doc.font('Helvetica').text('Student Ambassador (Sep 2025 - Feb 2026)');

doc.moveDown(1.5);
doc.fontSize(14).text('EDUCATION & CERTIFICATIONS', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10);
doc.font('Helvetica-Bold').text('Dr. A.P.J. Abdul Kalam Technical University (AKTU) - REC Banda');
doc.font('Helvetica').text('B.Tech, Information Technology (Oct 2023 - Jun 2027)');
doc.moveDown(0.5);
doc.text('OCI Certified: Generative AI Professional | Data Science Professional | DevOps Professional');

doc.end();
console.log("PDF generated successfully!");
