import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MapPin, Linkedin, Github, Code, Copy, Check, Instagram } from 'lucide-react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import emailjs from '@emailjs/browser';

export function Contact() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ user_name: '', user_email: '', subject: '', message: '' });
  const [isValid, setIsValid] = useState(false);

  React.useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isFormValid = 
      formData.user_name.trim().length > 0 &&
      emailRegex.test(formData.user_email) &&
      formData.subject.trim().length > 0 &&
      formData.message.trim().length > 0;
      
    setIsValid(isFormValid);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mohammedjaid813@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('loading');

    // Make sure these match your EmailJS templates and keys
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_6tmxanl';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id_here'; // Replace with your actual template ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_here'; // Replace with your actual public key

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        setStatus('success');
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((error) => {
        console.error('Email Submit Error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mohammedjaid813@gmail.com', href: 'mailto:mohammedjaid813@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'in/mohammedjaid', href: 'https://linkedin.com/in/mohammedjaid' },
    { icon: Instagram, label: 'Instagram', value: '@zaid_4hmed', href: 'https://www.instagram.com/zaid_4hmed/' },
    { icon: Github, label: 'GitHub', value: '@zaid753', href: 'https://github.com/zaid753' },
    { icon: Code, label: 'LeetCode', value: '@zaid4hamed', href: 'https://leetcode.com/u/zaid4hamed' },
  ];

  return (
    <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info Column */}
        <div className="space-y-8">
          <h3 className="text-3xl font-display font-bold">{t.contact.heading}</h3>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {t.contact.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="relative group">
                <a 
                  href={info.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card delay={i * 0.1} className="p-6 h-full flex items-center space-x-4 hover:border-blue-500/50 transition-all group-hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all hover-animate-pulse-glow">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{info.label}</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{info.value}</div>
                    </div>
                  </Card>
                </a>
                
                {info.label === 'Email' && (
                  <button 
                    onClick={handleCopyEmail}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all shrink-0 z-10"
                    title={t.contact.copy_email}
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {copied && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full border border-green-500/50 flex items-center space-x-3 shadow-xl"
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">{t.contact.email_copied}</span>
              </motion.div>
            )}

            {status === 'success' && (
               <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-10 right-4 md:right-10 z-[150] glass px-6 py-4 rounded-xl border border-green-500/50 flex items-start space-x-4 shadow-2xl bg-white dark:bg-zinc-900"
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">Message Sent successfully</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Thanks for reaching out! I'll get back to you soon.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Form Column */}
        <Card delay={0.3} className="p-8 md:p-10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t.contact.form.name}</label>
                <input 
                  required
                  name="user_name"
                  type="text" 
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-transparent dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t.contact.form.email}</label>
                <input 
                  required
                  name="user_email"
                  type="email" 
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-transparent dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all" 
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t.contact.form.subject}</label>
              <input 
                required
                name="subject"
                type="text" 
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-transparent dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all" 
                placeholder="Collaboration Opportunity"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t.contact.form.message}</label>
              <textarea 
                required
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-transparent dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all resize-none" 
                placeholder="How can I help you?"
              />
            </div>

            <Button 
              className="w-full py-4 text-lg" 
              disabled={!isValid || status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  {t.contact.form.sending}
                </div>
              ) : status === 'success' ? (
                t.contact.form.success
              ) : status === 'error' ? (
                t.contact.form.error
              ) : (
                <>
                  {t.contact.form.send}
                  <Send className="ml-3 w-5 h-5" />
                </>
              )}
            </Button>
            
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-500 font-medium"
              >
                {t.contact.form.footer_success}
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-500 font-medium"
              >
                {t.contact.form.footer_error}
              </motion.p>
            )}
          </form>
        </Card>
      </div>
    </Section>
  );
}
