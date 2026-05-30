import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const serviceAreas = 'Barrie · Innisfil · Simcoe County · Toronto · GTA · Ontario';
const email = 'info@ditahouse.com';
const pages = ['services', 'work', 'process', 'ardita', 'start'];

const images = {
  hands: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=82',
  desk: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=82',
  materials: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=82',
  industrial: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=82',
  home: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=82',
  laptop: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=82'
};

const services = [
  ['01', 'Fractional Marketing Direction', 'Senior marketing leadership for businesses that need priorities, campaigns, customer-facing materials, and execution direction without hiring a full-time department head.', ['Monthly strategy and campaign planning', 'Marketing calendar and priority setting', 'Website, email, social, and collateral direction', 'KPI review, budget direction, and vendor coordination', 'Sales and marketing alignment'], 'Manufacturers, distributors, builders, contractors, real estate brands, and growing local service businesses.'],
  ['02', 'Website Strategy & Redesign', 'For companies whose website no longer reflects their level, services, customer expectations, or sales process.', ['Website audit and conversion-path review', 'Homepage and service-page structure', 'Content architecture and page-by-page copy direction', 'User flow, customer journey, and CTA planning', 'Developer-ready implementation notes'], 'Businesses with outdated websites, weak service pages, unclear navigation, or quote/contact journeys that cost leads.'],
  ['03', 'Brand Refresh & Repositioning', 'For companies that have evolved, but still look, sound, or present like an earlier version of themselves.', ['Brand audit and positioning cleanup', 'Core message, customer promise, and offer language', 'Visual identity direction and usage standards', 'Brand guidelines, template direction, and launch support', 'Website copy and collateral alignment'], 'Family businesses, local leaders, product companies, and brands that look smaller than they are.'],
  ['04', 'Sales Materials & Customer Journey', 'For teams that sell with scattered files, unclear follow-up, and materials that do not support the close.', ['Sales decks, brochures, proposals, and one-pagers', 'Quote, inquiry, and onboarding flow review', 'Email follow-up structure', 'Customer-facing resource library', 'Consistency across sales and marketing touchpoints'], 'Businesses with real capability but weak selling materials, inconsistent follow-up, or a messy customer journey.'],
  ['05', 'Launch Campaigns & Event Support', 'For businesses preparing a rollout, showroom event, product announcement, trade show, service launch, or local campaign.', ['Launch message and campaign structure', 'Landing page, email, and social direction', 'Event material planning', 'Sales and follow-up assets', 'Post-launch review and next-step planning'], 'Companies that need a clean rollout instead of a last-minute announcement.']
];

const industries = [
  ['Manufacturers & Distributors', 'Catalogues, product lines, sales materials, showroom clarity, trade support, and websites that make the company easier to understand and easier to sell.', images.industrial],
  ['Builders, Trades & Home Brands', 'Sharper local trust, project presentation, quote flow, signage, brochures, before/after proof, and practical marketing support that helps the business look established.', images.home],
  ['Real Estate & Property Brands', 'Listing materials, community positioning, personal brand polish, investor-facing decks, and customer journeys that match the value of the property or service.', images.materials],
  ['Local Service Businesses', 'A cleaner brand, stronger website, clearer offers, and marketing direction for businesses ready to move beyond scattered posts and random design.', images.desk]
];

const workCards = [
  ['brand', 'Outdated business, upgraded perception.', 'For companies with strong operations and weak market presentation. Includes brand cleanup, positioning, visual direction, and usage standards.'],
  ['website', 'From online brochure to sales path.', 'For websites that need clearer structure, stronger service pages, sharper proof, and better conversion logic.'],
  ['sales', 'From scattered assets to a clean selling kit.', 'For teams that need decks, brochures, proposals, email follow-up, and onboarding materials that feel consistent.'],
  ['launch', 'From announcement to full rollout.', 'For product launches, showroom events, trade shows, and local campaigns requiring planning, assets, and follow-up.'],
  ['message', 'The words before the visuals.', 'For businesses whose offer is strong but hard to explain. Includes audience, hierarchy, homepage messaging, and sales language.'],
  ['customer', 'Fixing the journey before fixing the design.', 'For quote flows, forms, service navigation, portals, and post-inquiry journeys that need to be easier to follow.']
];

const faqs = [
  ['Do you only design logos?', 'No. dita. is built around brand direction, websites, campaigns, sales materials, customer journey, and monthly marketing leadership. Visual design is part of the system, not the whole offer.'],
  ['Who is this best for?', 'Established and growing Ontario businesses that have real substance behind them but need sharper presentation, clearer messaging, better customer materials, or senior marketing direction.'],
  ['Can we start small?', 'Yes. The focused brief and clarity sprint are designed to identify the highest-priority fixes before committing to a larger project.'],
  ['Do you work with existing teams?', 'Yes. dita. can lead direction, organize priorities, coordinate vendors, and create the structure internal or external teams need to execute with consistency.']
];

function routeFromPath() {
  const slug = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  return pages.includes(slug) ? slug : 'home';
}
function goTo(page) {
  const path = page === 'home' ? '/' : `/${page}`;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Logo({ footer = false }) {
  return <button className={`logo ${footer ? 'footer-logo' : ''}`} onClick={() => goTo('home')} aria-label="dita. Creative House home"><img src="/assets/dita-logo.svg" alt="dita. Creative House" /></button>;
}
function Header({ page }) {
  return <header className="site-header"><div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Primary navigation">{pages.map(item => <button key={item} onClick={() => goTo(item)} className={page === item ? 'active' : ''}>{item === 'ardita' ? 'Ardita' : item}</button>)}</nav><button className="start-btn" onClick={() => goTo('start')}>Start</button></div><div className="mobile-nav">{pages.map(item => <button key={item} onClick={() => goTo(item)} className={page === item ? 'active' : ''}>{item === 'ardita' ? 'Ardita' : item}</button>)}</div></header>;
}
function Footer() {
  return <footer className="footer"><div className="inner footer-grid"><Logo footer /><div><p>Brand, website, marketing, and sales-support systems for Ontario businesses ready to present with more clarity.</p><small>{serviceAreas}</small><small className="copyright">© {new Date().getFullYear()} dita. Creative House. All rights reserved.</small></div><div className="footer-links"><a href={`mailto:${email}`}>{email}</a><button onClick={() => goTo('start')}>Project Brief</button><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button></div></div></footer>;
}
function Label({ children }) { return <div className="label">{children}</div>; }
function Display({ children, className = '' }) { return <h1 className={`display ${className}`}>{children}</h1>; }
function Section({ children, dark = false, className = '' }) { return <section className={`${dark ? 'dark-section' : 'light-section'} ${className}`}>{children}</section>; }
function Body({ children }) { return <p className="body">{children}</p>; }
function CTA({ children, onClick, light = false }) { return <button className={`cta ${light ? 'light' : ''}`} onClick={onClick}>{children}<span>↗</span></button>; }
function ImageCard({ src, alt, caption }) { return <figure className="image-card"><img src={src} alt={alt} /><figcaption><span>{caption}</span><b>●</b></figcaption></figure>; }

function Home() {
  const [problem, setProblem] = useState('website');
  const answers = {
    website: ['Website Strategy & Redesign', 'Your site should guide the buyer from first impression to inquiry without making them work to understand you.'],
    brand: ['Brand Refresh & Repositioning', 'The goal is not decoration. The goal is to make the business look as capable as it already is.'],
    sales: ['Sales Materials & Customer Journey', 'If the sales process depends on scattered files and inconsistent follow-up, the customer feels that.'],
    monthly: ['Fractional Marketing Direction', 'Senior direction, prioritization, and execution leadership each month.'],
    launch: ['Launch Campaigns & Event Support', 'A launch needs message, timing, assets, follow-up, and sales alignment before it goes public.']
  };
  return <>
    <Section className="hero-section"><div className="inner hero-grid"><div><Label>Creative House / Ontario</Label><Display>Creative direction for businesses ready to look established and sell clearer.</Display><Body>dita. is a creative house led by Ardita Lilaj, bringing marketing leadership, brand direction, website strategy, campaign planning, and sales-support systems directly to growing Ontario businesses.</Body><div className="button-row"><CTA onClick={() => goTo('start')}>Start the Brief</CTA><button className="outline-btn" onClick={() => goTo('services')}>View Services</button></div></div><ImageCard src={images.hands} alt="Creative workspace and strategy materials" caption="Brand / Website / Sales" /></div></Section>
    <Section className="proof-strip"><div className="inner">{['Brand direction','Websites','Campaigns','Sales materials','Customer journey','Monthly leadership'].map(x => <div key={x}>{x}</div>)}</div></Section>
    <Section className="pad"><div className="inner split"><div><Label>Proof of Direction</Label><h2 className="major">Leadership experience, applied personally.</h2></div><div className="proof-grid">{[['Department-level leadership','Experience leading marketing functions, priorities, campaigns, customer-facing materials, and business communication — not just assisting inside them.'],['Built for business use','Websites, brochures, decks, campaigns, events, templates, follow-up materials, and customer journeys that have to work beyond looking good.'],['Ontario-focused','Built for companies across Barrie, Innisfil, Simcoe County, Toronto, the GTA, and surrounding markets.'],['Led directly by Ardita','Senior thinking without a full-time marketing department, bloated agency process, or random execution.']].map(([t,d]) => <article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></div></Section>
    <Section dark className="pad"><div className="inner split"><div><Label>Start with the issue</Label><h2 className="major">What is costing you clarity?</h2></div><div><div className="pill-row">{[['website','Website outdated'],['brand','Brand inconsistent'],['sales','Sales materials messy'],['monthly','Need marketing lead'],['launch','Launching something']].map(([k,l]) => <button key={k} onClick={() => setProblem(k)} className={problem === k ? 'selected' : ''}>{l}</button>)}</div><div className="diagnostic"><h3>{answers[problem][0]}</h3><p>{answers[problem][1]}</p><button onClick={() => goTo('services')}>See the service path</button></div></div></div></Section>
    <WhoWeHelp />
    <Section className="pad"><div className="inner"><div className="section-top"><div><Label>Selected Direction</Label><h2 className="major">The work should feel inevitable — not decorated.</h2></div><button className="text-link" onClick={() => goTo('work')}>View work</button></div><WorkGrid limit={3} /></div></Section>
    <Section dark className="pad"><div className="inner split"><div><Label>Process</Label><h2 className="major">A precise process for messy marketing problems.</h2></div><div className="process-mini">{['Audit','Position','Structure','Refine','Launch'].map((x,i) => <div key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div></div></Section>
    <CTASection />
  </>;
}

function WhoWeHelp() {
  return <Section className="pad"><div className="inner split industry-split"><div><Label>Who We Help</Label><h2 className="major">Built for companies with substance that need sharper presentation.</h2></div><div className="industry-grid">{industries.map(([t,d,img]) => <article className="industry-card" key={t}><img src={img} alt={t} /><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></div></Section>;
}
function WorkGrid({ limit }) {
  const items = limit ? workCards.slice(0, limit) : workCards;
  return <div className="work-grid">{items.map(([tag,title,desc],i) => <article key={title} className={i % 2 ? 'dark-card' : ''}><b>●</b><small>{tag}</small><h3>{title}</h3><p>{desc}</p></article>)}</div>;
}
function Services() {
  return <><Section className="page-hero"><div className="inner"><Label>Services</Label><Display>The work is creative. The reason is commercial.</Display><Body>dita. offers a focused service stack for companies that need stronger market presence, a cleaner customer journey, and a sales-aligned marketing system.</Body></div></Section><Section dark className="pad"><div className="inner"><Label>Engagement Options</Label><h2 className="major">Choose the level of involvement.</h2><div className="engagement-grid">{[['Clarity Sprint','Audit, direction, and roadmap for the highest-priority fixes.','Best first step'],['Project Build','A defined brand, website, sales, or launch project with clear scope.','Best for transformation'],['Monthly Lead','Ongoing fractional strategy and execution leadership each month.','Best for momentum']].map(([t,d,s]) => <article key={t}><h3>{t}</h3><p>{d}</p><small>{s}</small></article>)}</div></div></Section><Section className="pad"><div className="inner"><div className="service-list">{services.map(([n,t,intro,items,best]) => <article className="service-row" key={n}><span>{n}</span><div><h2>{t}</h2><p>{intro}</p><ul>{items.map(x => <li key={x}>{x}</li>)}</ul><p className="best"><strong>Best for:</strong> {best}</p></div></article>)}</div></div></Section><CTASection /></>;
}
function Work() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? workCards : workCards.filter(([t]) => t === filter), [filter]);
  return <><Section className="page-hero"><div className="inner"><Label>Work</Label><Display>Portfolio direction for businesses that need to look sharper and sell clearer.</Display><Body>Until public case studies are available, this page shows the types of business problems dita. is built to solve. Real case studies can be dropped in without redesigning the site.</Body><div className="filters">{['all','brand','website','sales','launch','message','customer'].map(x => <button key={x} className={filter === x ? 'active' : ''} onClick={() => setFilter(x)}>{x}</button>)}</div><div className="work-grid">{filtered.map(([tag,title,desc],i) => <article key={title} className={i % 2 ? 'dark-card' : ''}><b>●</b><small>{tag}</small><h3>{title}</h3><p>{desc}</p></article>)}</div></div></Section><Section className="quote"><h2>The work should feel inevitable — not decorated.</h2></Section><Section className="pad"><div className="inner split"><h2 className="small-major">What a real case study will include.</h2><div className="case-list">{['The business problem before design started','The strategic decision behind the creative direction','The assets built: website, deck, campaign, collateral, or system','The measurable outcome where available','The next step created for the client'].map(x => <div key={x}>• {x}</div>)}<CTA onClick={() => goTo('start')}>Build the First One</CTA></div></div></Section></>;
}
function Process() {
  return <><Section className="page-hero"><div className="inner"><Label>Process</Label><Display>A precise process for messy marketing problems.</Display><Body>The goal is not to make things busier. The goal is to remove what is unclear, align what matters, and build the materials that help the business move.</Body></div></Section><Section dark className="pad"><div className="inner process-grid">{[['Audit','Review the current brand, website, customer journey, sales materials, audience, and gaps.'],['Position','Define what the company should be known for, who it is speaking to, and what needs to be clearer.'],['Structure','Build the message hierarchy, site flow, campaign map, or sales system before visual execution.'],['Refine','Develop the finished direction with restraint, proof, white space, and business purpose.'],['Launch','Prepare the rollout, assets, handoff notes, and follow-up system so the work actually gets used.']].map(([t,d],i) => <article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div></Section><Section className="pad"><div className="inner"><Label>What makes the process different</Label><h2 className="major wide">Strategy is not a slide deck. It is the decision system behind the work.</h2><div className="values-grid">{[['No hype','Clear claims. Real proof. No empty words.'],['No clutter','White space, hierarchy, and restraint are part of the strategy.'],['No random execution','Every page, post, brochure, and email has a purpose.'],['No copied agency language','The business gets a voice that fits its market, not a borrowed template.']].map(([t,d]) => <article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></div></Section><CTASection /></>;
}
function Ardita() {
  return <><Section className="page-hero"><div className="inner"><Label>Ardita Lilaj</Label><Display>Marketing leadership, brought directly to growing businesses.</Display><Body>dita. was founded by Ardita Lilaj after years leading marketing departments and sales-support functions — with a focus on brand, campaigns, customer experience, events, websites, business growth, and the materials that help teams sell with clarity.</Body></div></Section><Section className="pad"><div className="inner split ardita-split"><ImageCard src={images.desk} alt="Creative strategy materials and laptop" caption="Founder-led creative direction" /><div><p className="long-copy">Ardita created dita. to work with businesses in a more direct, intentional way. The kind of businesses that have substance behind them, but need their brand, website, customer journey, sales materials, and marketing system to reflect that substance.</p><p className="long-copy">The work is not about making things pretty for the sake of being pretty. It is about shaping perception, improving the customer journey, supporting sales, and giving the business a clearer standard to operate from.</p><div className="line-list">{['Brand and campaign direction','Sales and customer journey experience','Website strategy and content planning','Trade, showroom, and launch marketing',serviceAreas].map(x => <div key={x}>{x}</div>)}</div></div></div></Section><Section className="quote"><h2>Confidence without noise.</h2></Section><Section className="pad"><div className="inner split"><h2 className="small-major">The dot is the detail.</h2><div><p className="long-copy">The red dot is the final touch — the detail that separates nearly finished from exactly right. It is small, deliberate, and unmistakable.</p><p className="long-copy">That is the standard behind the work: edit until the message is clear, align the system, and leave only what earns its place.</p><CTA onClick={() => goTo('start')}>Work with Ardita</CTA></div></div></Section></>;
}
function Start() {
  const [status, setStatus] = useState('');
  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const body = Object.entries(data).map(([k,v]) => `${k}: ${v}`).join('\n\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Project Brief — dita. Creative House')}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app should open with the brief filled in. Send it from there.');
  }
  return <><Section className="page-hero"><div className="inner"><Label>Start</Label><Display>The first step is a focused brief.</Display><Body>The goal is not to sell you a package you do not need. The goal is to understand what is unclear, what is missing, and what needs to be built first.</Body></div></Section><Section className="pad"><div className="inner split form-split"><div><h2 className="small-major">Send the issue before the solution.</h2><p className="contact-line"><a href={`mailto:${email}`}>{email}</a><br />{serviceAreas}</p><div className="next-box"><strong>What happens next</strong><p>Ardita reviews the business, current materials, and issue before recommending the best first step.</p></div></div><form onSubmit={submit}>{['Business name','Website or Instagram','Location','Industry','Timeline','Investment range / budget comfort'].map(x => <label key={x}>{x}<input required name={x} /></label>)}<label>What do you need help with?<select name="Need"><option>Brand clarity / refresh</option><option>Website strategy / redesign</option><option>Sales materials / customer journey</option><option>Launch campaign / event support</option><option>Monthly marketing direction</option><option>Not sure yet</option></select></label><label>What feels unclear right now?<textarea required name="What feels unclear" rows="5" /></label><label>Anything already built?<textarea name="Anything already built" rows="4" /></label><button className="submit-btn">Send the Brief</button>{status && <p className="form-status">{status}</p>}</form></div></Section></>;
}
function CTASection() { return <Section className="closing"><div className="inner closing-grid"><div><Label>Ready to define the problem?</Label><h2 className="small-major">The first step is a focused brief.</h2></div><CTA onClick={() => goTo('start')}>Start the Brief</CTA></div></Section>; }
function FAQSection() { return <Section className="pad faq-section"><div className="inner split"><div><Label>Questions</Label><h2 className="major">Clear before anything gets built.</h2></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></Section>; }

function App() {
  const [page, setPage] = useState(routeFromPath());
  useEffect(() => {
    const sync = () => setPage(routeFromPath());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  useEffect(() => {
    const titles = {home:'dita. Creative House | Brand, Website & Marketing Direction',services:'Services | dita. Creative House',work:'Work | dita. Creative House',process:'Process | dita. Creative House',ardita:'Ardita Lilaj | dita. Creative House',start:'Start a Brief | dita. Creative House'};
    document.title = titles[page] || titles.home;
  }, [page]);
  const Component = {home: Home, services: Services, work: Work, process: Process, ardita: Ardita, start: Start}[page] || Home;
  return <><Header page={page} /><main><Component />{page === 'home' && <FAQSection />}</main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
