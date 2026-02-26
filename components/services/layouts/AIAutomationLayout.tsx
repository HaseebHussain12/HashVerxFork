'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { servicesData } from '@/lib/servicesData';
import ServiceHeroSection from '../ServiceHeroSection';
import ServiceOverviewSection from '../ServiceOverviewSection';
import ServiceTypesSection from '../ServiceTypesSection';
import type { OverviewCapability } from '../ServiceOverviewSection';
import type { ServiceTypeItem } from '../ServiceTypesSection';
import aiMainImage from '../../../assets/ai/main.jpg';
import aiOverviewImage from '../../../assets/ai/overview.jpg';
import aiBusinessWorkflowsImage from '../../../assets/ai/BusinessWorkflows.jpg';
import aiSeoImage from '../../../assets/ai/Ai&SEo.jpg';
import aiAnalyticsImage from '../../../assets/ai/Analytics&Support.jpg';

const slug = 'ai-seo-automation';
const service = servicesData[slug];

const capabilities = service.sections.find((s) => s.id === 'ai-seo-capabilities');
const capItems = capabilities?.type === 'list' ? capabilities.items : [];
const overviewCapabilities: OverviewCapability[] = capItems.map((item) => ({ title: item }));

const HERO_IMAGE = aiMainImage;
const OVERVIEW_IMAGE = aiOverviewImage;

const TYPES_ITEMS: ServiceTypeItem[] = [
  { id: 'automation', title: 'Business Workflows', image: aiBusinessWorkflowsImage, hoverText: 'We automate repetitive tasks and workflows so your team can focus on high-value work. From approval flows to data sync, our solutions reduce errors and save time across HRMS, retail, and more.' },
  { id: 'ai', title: 'AI & SEO', image: aiSeoImage, hoverText: 'AI chatbots, content, and technical SEO that drive visibility and engagement. We implement AI-powered tools and SEO strategies tailored to your industry and goals.' },
  { id: 'analytics', title: 'Analytics & Support', image: aiAnalyticsImage, hoverText: 'Data-driven reporting and AI-enhanced customer support. We build dashboards, automate insights, and deploy intelligent support tools so you can scale without proportionally scaling headcount.' },
];

const CAP_ICONS = [
  /* AI Chatbots */
  <svg key="chatbot" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  /* AI Content & SEO */
  <svg key="content" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  /* Technical SEO */
  <svg key="seo" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  /* Analytics & Reporting */
  <svg key="analytics" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  /* Data & Documents */
  <svg key="data" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  /* Customer Support */
  <svg key="support" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
];

const ADVANTAGE_ITEMS = [
  {
    title: 'AI experts',
    description: 'From concept to production, our AI Launchpad accelerates innovation, taking your idea to proof of concept in 90 days.',
    highlight: ['AI Launchpad'],
  },
  {
    title: 'Product mindset',
    description: 'We deliver outcomes, not just outputs, aligning product development with your business and customer goals.',
  },
  {
    title: 'Delivery excellence',
    description: 'We get things done. Our deep technical expertise and focus on agile, high-velocity delivery ensures satisfaction.',
  },
  {
    title: 'Industry expertise',
    description: 'We solve business challenges with deep industry insight, ensuring solutions are relevant and impactful.',
  },
  {
    title: 'Global scale',
    description: 'With experts across four continents, we deliver global solutions to drive and scale your digital transformation.',
  },
  {
    title: 'Security implementation',
    description: 'Security is at our core. We meet stringent regulatory demands across industries like healthcare, finance, and more.',
    highlight: ['healthcare', 'finance'],
  },
];

const ADVANTAGE_ICONS = [
  /* AI experts - sparkles */
  <svg key="ai" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  /* Product mindset - shield check */
  <svg key="product" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  /* Delivery excellence - paper plane */
  <svg key="delivery" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
  /* Industry expertise - medal / badge */
  <svg key="industry" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  /* Global scale - globe */
  <svg key="global" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0c8.284 0 15 6.716 15 15s-6.716 15-15 15m0-0c-8.284 0-15-6.716-15-15S3.716 3 12 3" /></svg>,
  /* Security implementation - lock */
  <svg key="security" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
];

export default function AIAutomationLayout() {
  const [bentoVisible, setBentoVisible] = useState(false);
  const [advantageVisible, setAdvantageVisible] = useState(false);
  const bentoRef = useRef<HTMLDivElement>(null);
  const advantageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setBentoVisible(true), { threshold: 0.1 });
    if (bentoRef.current) o.observe(bentoRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setAdvantageVisible(true), { threshold: 0.1 });
    if (advantageRef.current) o.observe(advantageRef.current);
    return () => o.disconnect();
  }, []);

  const renderDescription = (item: (typeof ADVANTAGE_ITEMS)[0]) => {
    if (!item.highlight) return item.description;
    let text = item.description;
    item.highlight.forEach((term) => {
      text = text.replace(new RegExp(`(${term})`, 'gi'), '<u>$1</u>');
    });
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <>
      <ServiceHeroSection
        image={HERO_IMAGE}
        imageAlt="AI and automation"
        label={service.title}
        title={service.subtitle}
        ctaText="Start automation"
      />
      <ServiceOverviewSection
        intro={service.intro}
        capabilities={overviewCapabilities}
        image={OVERVIEW_IMAGE}
        imageAlt="AI SEO Automation"
        capabilitiesHeading="AI & SEO capabilities:"
      />
      <ServiceTypesSection sectionTitle="What We Automate & Deliver" items={TYPES_ITEMS} />

      <section ref={bentoRef} className="pt-8 pb-24 md:pt-10 md:pb-28 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What we offer</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {capItems.map((item, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl hover:border-[#51CFDF]/40 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center ${bentoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5 shrink-0">
                  {CAP_ICONS[i % CAP_ICONS.length]}
                </div>
                <h3 className="font-semibold text-white text-base md:text-lg leading-snug">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your unfair advantage */}
      <section ref={advantageRef} className="pt-16 pb-24 md:pt-20 md:pb-28 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16">
            Your unfair <span className="text-[#51CFDF]">advantage</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {ADVANTAGE_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex gap-5 ${advantageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-500`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#51CFDF]/15 text-[#51CFDF] flex items-center justify-center shrink-0">
                  {ADVANTAGE_ICONS[i]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed [&_u]:underline [&_u]:decoration-[#51CFDF] [&_u]:underline-offset-2">
                    {renderDescription(item)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Design CTA Banner */}
      <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-white/20 shadow-xl">
            {/* Abstract tech pattern - right side, behind content */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#51CFDF]/20 to-transparent" />
              <svg className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] text-[#51CFDF]" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="135" y2="65" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="135" y2="135" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="65" y2="65" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="65" y2="135" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="185" cy="100" r="2" fill="currentColor" />
                <circle cx="135" cy="65" r="2" fill="currentColor" />
                <circle cx="135" cy="135" r="2" fill="currentColor" />
                <circle cx="65" cy="65" r="2" fill="currentColor" />
                <circle cx="65" cy="135" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-10 md:p-14 lg:p-16 dark-text-on-light">
              <div className="md:max-w-xl">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Build custom websites that deliver real business value
                </h3>
                <p className="text-base md:text-lg leading-relaxed">
                  From concept to launch, we design and develop modern, fast, SEO-ready websites that represent your brand and convert visitors into customers.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 bg-[#51CFDF] hover:bg-[#6dd9e8] text-[#0a1628] font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105"
              >
                Let&apos;s connect
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
