'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, User, MessageCircle, Phone, Linkedin, Github, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import FloatingParticles from '@/components/FloatingParticles';

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <main className="mt-18 relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      <FloatingParticles count={15} />

      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <Mail className="w-5 h-5 text-purple-400 mr-2" />
          <span className="text-purple-300 text-sm font-medium">Contact Us</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in touch with us</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Have questions or need assistance? We&apost;re here to help you with anything you need.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mb-16">
         
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 rounded-2xl p-8 border border-purple-700/30">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-2 text-purple-400" /> Contact Information
          </h2>
          <p className="text-gray-300 mb-8">
            Feel free to reach out to us through any of these channels. We typically respond within 24 hours.
          </p>

          <div className="space-y-6">
            {[
              { href: 'https://wa.me/923412011877', label: 'WhatsApp', value: '+92 341 2011877', icon: MessageSquare },
              { href: 'https://www.linkedin.com/in/hafiz-waseem-ahmed-50a4b2347/', label: 'LinkedIn', value: 'Hafiz Waseem Ahmed', icon: Linkedin },
              { href: 'https://github.com/Paxto2002', label: 'GitHub', value: 'Paxto2002', icon: Github },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group text-gray-300 hover:text-white transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mr-4 group-hover:bg-purple-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      <section className="max-w-4xl mx-auto text-center relative z-10 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Quick Answers to Common Questions</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Check out our FAQ section for instant solutions to frequently asked questions.</p>
        <Link href="/help-center" className="inline-flex items-center justify-center group relative h-12 px-6 rounded-full bg-gray-800/50 text-white overflow-hidden transition-all duration-300 hover:bg-gray-700/70 hover:shadow-lg hover:shadow-purple-500/20 border border-gray-700">
          <span className="relative z-10 font-semibold">Visit Help Center</span>
          <Send className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </section>
    </main>
  );
}
