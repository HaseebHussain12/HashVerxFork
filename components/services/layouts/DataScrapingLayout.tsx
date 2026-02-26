'use client';

import { useEffect, useRef, useState } from 'react';
import { servicesData } from '@/lib/servicesData';
import ServiceHeroSection from '../ServiceHeroSection';
import ServiceOverviewSection from '../ServiceOverviewSection';
import ServiceTypesSection from '../ServiceTypesSection';
import type { OverviewCapability } from '../ServiceOverviewSection';
import type { ServiceTypeItem } from '../ServiceTypesSection';
import dataScrapingMainImage from '../../../assets/DataScraping/main.jpg';
import dataScrapingOverviewImage from '../../../assets/DataScraping/overview.jpg';
import dataScrapingWebsitesImage from '../../../assets/DataScraping/Websites.jpg';
import dataScrapingMarketplacesImage from '../../../assets/DataScraping/Marketplaces.jpg';
import dataScrapingPlatformsImage from '../../../assets/DataScraping/PublicPlatforms.jpg';

const slug = 'data-scraping-web-crawling';
const service = servicesData[slug];

const sources = service.sections.find((s) => s.id === 'data-sources');
const sourceItems = sources?.type === 'list' ? sources.items : [];
const deliverables = service.sections.find((s) => s.id === 'deliverables');
const deliverItems = deliverables?.type === 'list' ? deliverables.items : [];
const overviewCapabilities: OverviewCapability[] = sourceItems.map((item) => ({ title: item }));
const automation = service.sections.find((s) => s.id === 'automation');

const HERO_IMAGE = dataScrapingMainImage;
const OVERVIEW_IMAGE = dataScrapingOverviewImage;

const TYPES_ITEMS: ServiceTypeItem[] = [
  { id: 'websites', title: 'Websites', image: dataScrapingWebsitesImage, hoverText: 'We collect and structure data from websites at scale. Whether you need product data, pricing, or content, we deliver clean, reliable datasets on a schedule that fits your workflow.' },
  { id: 'marketplaces', title: 'Marketplaces', image: dataScrapingMarketplacesImage, hoverText: 'Marketplace and e-commerce data for competitive intelligence and pricing. We handle complex structures and anti-scraping measures so you get the data you need in CSV, JSON, or via API.' },
  { id: 'platforms', title: 'Public Platforms', image: dataScrapingPlatformsImage, hoverText: 'Structured data from public platforms and directories. We design crawlers that respect terms of use and deliver normalized data ready for analytics, ML, or integration into your applications.' },
];

const SCRAPING_SERVICES = [
  {
    title: 'Lead Generation & Marketing Data',
    description: 'Extract prospect data, contact lists, and market intelligence from the web. We deliver structured lead data for your sales and marketing teams to fuel campaigns and outreach.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
    ),
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    title: 'Social Media Data Scraping',
    description: 'Collect social metrics, posts, engagement data, and audience insights from public social platforms. Use structured social data for brand monitoring, competitor analysis, and trend research.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Web Scraping Solution',
    description: 'End-to-end web scraping for product catalogs, pricing, reviews, and any public web content. We build robust crawlers that handle pagination, JavaScript-rendered pages, and anti-bot measures.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v4" /></svg>
    ),
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    title: 'Web Scraping API',
    description: 'RESTful APIs and webhooks for on-demand or scheduled data delivery. Integrate live data feeds into your applications without managing infrastructure or crawler maintenance.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    color: 'text-[#51CFDF]',
    bgColor: 'bg-[#51CFDF]/10',
  },
  {
    title: 'Custom AI Solution',
    description: 'Combine web scraping with AI for intelligent data extraction, classification, and enrichment. We build custom pipelines that use NLP and ML to transform raw web data into actionable insights.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
    ),
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
];

export default function DataScrapingLayout() {
  const [pipelineVisible, setPipelineVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setPipelineVisible(true), { threshold: 0.1 });
    if (pipelineRef.current) o.observe(pipelineRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setServicesVisible(true), { threshold: 0.1 });
    if (servicesRef.current) o.observe(servicesRef.current);
    return () => o.disconnect();
  }, []);

  return (
    <>
      <ServiceHeroSection
        image={HERO_IMAGE}
        imageAlt="Data scraping and web crawling"
        label={service.title}
        title={service.subtitle}
        ctaText="Request sample"
      />
      <ServiceOverviewSection
        intro={service.intro}
        capabilities={overviewCapabilities}
        image={OVERVIEW_IMAGE}
        imageAlt="Data pipeline"
        capabilitiesHeading="Data sources:"
      />
      <ServiceTypesSection sectionTitle="Data Sources We Handle" items={TYPES_ITEMS} />

      <section ref={pipelineRef} className="pt-10 pb-20 md:pt-12 md:pb-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-3 gap-6 md:gap-8 items-stretch transition-all duration-700 ${pipelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="p-6 md:p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-[#51CFDF]/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-lg bg-[#51CFDF]/20 flex items-center justify-center text-[#51CFDF] text-sm font-bold">01</span>
                <p className="text-[#51CFDF] text-sm font-semibold uppercase tracking-wider">Sources</p>
              </div>
              <ul className="space-y-2.5">
                {sourceItems.map((item, i) => (
                  <li key={i} className="text-white font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#51CFDF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#51CFDF]/20 border border-[#51CFDF]/40 flex items-center justify-center text-[#51CFDF] shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </div>
            </div>
            <div className="p-6 md:p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-[#51CFDF]/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-lg bg-[#51CFDF]/20 flex items-center justify-center text-[#51CFDF] text-sm font-bold">02</span>
                <p className="text-[#51CFDF] text-sm font-semibold uppercase tracking-wider">Deliverables</p>
              </div>
              <ul className="space-y-2.5">
                {deliverItems.map((item, i) => (
                  <li key={i} className="text-white font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#51CFDF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`mt-10 p-6 md:p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:border-[#51CFDF]/40 transition-all duration-700 delay-200 ${pipelineVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-[#51CFDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <h3 className="text-white text-lg font-bold uppercase tracking-wider">Automation</h3>
            </div>
            <p className="text-white/90 leading-relaxed text-base md:text-lg">{automation?.type === 'paragraph' ? automation.content : ''}</p>
          </div>
        </div>
      </section>

      {/* Web And Data Scraping Services We Offer */}
      <section ref={servicesRef} className="py-16 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <p className="text-[#51CFDF] text-sm font-semibold uppercase tracking-wider mb-2">Web And Data Scraping</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Services We Offer</h2>
            <p className="text-white/80 text-lg max-w-2xl">
              Our talented web scraping experts extract information your business needs using effective data and web scraping tools and techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {SCRAPING_SERVICES.map((item, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-[#51CFDF]/40 transition-all duration-300 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center mb-5`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
