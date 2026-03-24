export type ContentSection =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'pullquote'; content: string; attribution?: string }
  | { type: 'stat-block'; stats: { value: string; label: string; source: string }[] }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  authors: { name: string; role: string; initials: string }[];
  coverImage: string;
  excerpt: string;
  tags: string[];
  sources: { label: string; url: string }[];
  sections: ContentSection[];
};

const POSTS: BlogPost[] = [
  {
    slug: 'agentic-ai-autonomous-revolution',
    title: 'Agentic AI: The Autonomous Revolution Reshaping Business',
    subtitle:
      'How AI agents that plan, decide, and act are moving from the lab into the core of enterprise operations — and what it means for businesses in Morocco and beyond.',
    category: 'AI & Automation',
    readTime: '10 min read',
    publishedAt: '2025-03-10',
    authors: [{ name: 'H.V.A Research Team', role: 'Hive Vault Arc', initials: 'HV' }],
    coverImage: '/Images/aiagent.webp',
    excerpt:
      'Agentic AI systems that can plan, reason, and act autonomously are the next major shift in enterprise technology. Backed by Gartner, McKinsey, and PwC research, we explore what this means for businesses in Morocco and how to get ahead.',
    tags: ['agentic AI', 'AI agents', 'automation', 'Morocco', 'enterprise AI'],
    sources: [
      { label: 'Gartner Top Strategic Technology Trends 2025', url: 'https://www.gartner.com/en/articles/gartner-top-10-strategic-technology-trends-for-2025' },
      { label: 'PwC AI Business Survey 2024', url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-business-survey.html' },
      { label: 'Deloitte State of Generative AI in the Enterprise Q4 2024', url: 'https://www2.deloitte.com/us/en/pages/consulting/articles/state-of-generative-ai-in-the-enterprise.html' },
      { label: 'McKinsey Global Institute — The Economic Potential of Generative AI', url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier' },
      { label: 'MIT Sloan Management Review — Agents at Work 2024', url: 'https://sloanreview.mit.edu' },
      { label: 'MarketsandMarkets — AI Agents Market Forecast 2030', url: 'https://www.marketsandmarkets.com' },
    ],
    sections: [
      {
        type: 'paragraph',
        content:
          'Something fundamental is changing in enterprise software. For the past decade, AI meant pattern recognition — systems that could classify images, transcribe speech, or recommend products. Powerful, yes, but still passive. The next generation is different. Agentic AI doesn\'t wait to be asked a question. It sets goals, breaks them into tasks, calls external tools, evaluates outcomes, and iterates. It acts.',
      },
      {
        type: 'paragraph',
        content:
          'This shift from AI as a tool you use to AI as an agent that works alongside you — or entirely on your behalf — is arguably the most significant technology transition since cloud computing. The numbers back it up. According to Gartner\'s Top Strategic Technology Trends for 2025, at least 15% of day-to-day business decisions will be made autonomously by AI agents by 2028, up from nearly zero today.',
      },
      {
        type: 'stat-block',
        stats: [
          { value: '40%', label: 'of enterprise apps will embed AI agents by 2026', source: 'Gartner, 2024' },
          { value: '$13T', label: 'potential economic value added by AI by 2030', source: 'McKinsey Global Institute' },
          { value: '79%', label: 'of companies using AI reported productivity gains', source: 'PwC AI Business Survey, 2024' },
          { value: '37.1%', label: 'projected CAGR of the AI agents market through 2030', source: 'MarketsandMarkets' },
        ],
      },
      {
        type: 'heading',
        content: 'What Makes AI "Agentic"?',
      },
      {
        type: 'paragraph',
        content:
          'The term "agentic" describes AI systems with four key properties: goal-directed behavior, multi-step planning, tool use, and self-correction. A conventional AI assistant answers a single prompt. An AI agent receives a high-level objective — say, "research our top three competitors and prepare a summary report" — and then autonomously queries databases, browses the web, writes drafts, checks for accuracy, and delivers a final output, flagging anything uncertain along the way.',
      },
      {
        type: 'paragraph',
        content:
          'What makes this possible right now is the convergence of three trends: large language models (LLMs) capable of complex reasoning, the rapid proliferation of APIs that agents can call, and new orchestration frameworks (like LangGraph, AutoGen, and CrewAI) that coordinate multi-agent workflows at production scale.',
      },
      {
        type: 'pullquote',
        content:
          '"We are witnessing a transition from AI as a feature to AI as a colleague. Agentic systems don\'t just answer questions — they own outcomes."',
        attribution: 'MIT Sloan Management Review, Agents at Work, 2024',
      },
      {
        type: 'heading',
        content: 'Why Now? The Conditions Are Finally Right',
      },
      {
        type: 'paragraph',
        content:
          'The concept of software agents is not new — academic papers on autonomous agents date to the 1990s. What\'s new is capability. GPT-4, Claude 3, and Gemini 1.5 demonstrated that LLMs could handle extended reasoning chains reliably enough for production systems. Combined with tool use (the ability to call functions, APIs, and databases), these models became the "brain" that agentic systems needed.',
      },
      {
        type: 'paragraph',
        content:
          'Deloitte\'s State of Generative AI in the Enterprise Q4 2024 report found that 30% of large enterprises are actively exploring agentic AI architectures, while another 38% are already running pilots. Critically, organizations that moved to pilots in 2023 are now reporting concrete results: reduced operational overhead, faster processing of complex requests, and measurable cost savings.',
      },
      {
        type: 'stat-block',
        stats: [
          { value: '38%', label: 'of large enterprises already piloting agentic AI', source: 'Deloitte, Q4 2024' },
          { value: '66%', label: 'of AI-adopting companies saw cost reductions', source: 'PwC AI Business Survey, 2024' },
          { value: '80%', label: 'of customer service interactions handled autonomously by 2029', source: 'Gartner, 2024' },
          { value: '60%', label: 'reduction in decision latency reported from AI agent deployments', source: 'MIT Sloan, 2024' },
        ],
      },
      {
        type: 'heading',
        content: 'Where Agentic AI Is Having the Greatest Impact',
      },
      {
        type: 'subheading',
        content: 'Customer Service & Reception',
      },
      {
        type: 'paragraph',
        content:
          'This is where the ROI is fastest and clearest. AI receptionists and support agents can handle qualification calls, appointment scheduling, FAQ resolution, and escalation routing — 24 hours a day, in multiple languages. Gartner projects that by 2029, 80% of customer service interactions will be resolved autonomously by AI agents, without human intervention. For businesses in Morocco operating across Arabic, French, Spanish, and English, multilingual AI agents remove a bottleneck that human-staffed reception simply cannot solve economically.',
      },
      {
        type: 'subheading',
        content: 'Business Intelligence & Analysis',
      },
      {
        type: 'paragraph',
        content:
          'Traditional BI requires a data analyst to query databases, build reports, and then interpret findings for stakeholders — a process that takes days. Agentic AI analysts compress this to minutes. Connect an AI agent to your CRM, ERP, or database; give it a natural-language question; and it will write and execute the query, visualize the results, identify anomalies, and generate a plain-language summary. McKinsey estimates that knowledge-worker productivity gains from AI — primarily through automation of information retrieval and synthesis — represent a potential $4.4T in annual value globally.',
      },
      {
        type: 'subheading',
        content: 'Operations & Workflow Automation',
      },
      {
        type: 'paragraph',
        content:
          'Beyond the obvious customer-facing use cases, agentic AI is reshaping back-office operations. Invoice processing, contract review, onboarding workflows, inventory management — tasks that required human judgment because they involve variable, unstructured inputs are now within AI agents\' reach. PwC found that 66% of companies that deployed AI in operations reported measurable cost reductions within 12 months.',
      },
      {
        type: 'heading',
        content: 'What This Means for Businesses in Morocco',
      },
      {
        type: 'paragraph',
        content:
          'Morocco is at a strategic inflection point. The country\'s National Digital Transformation Strategy, combined with growing investment in the Casablanca Tech Hub and the proliferation of SMEs across Tangier, Rabat, and Marrakech, means the conditions for AI adoption are increasingly favorable. But the window to gain a competitive advantage is narrowing.',
      },
      {
        type: 'paragraph',
        content:
          'Companies that deploy AI agents in 2025 will operate with fundamentally lower cost structures than competitors who wait until 2027. A Tangier-based logistics company that deploys an AI dispatcher and customer service agent today reduces operational overhead while its competitors are still evaluating vendors. In a market where margins are thin and talent costs are rising, this is not a marginal advantage — it\'s structural.',
      },
      {
        type: 'pullquote',
        content:
          '"The businesses that treat agentic AI as a cost center will lose to the ones that treat it as the operating system of their company."',
        attribution: 'H.V.A Research Team',
      },
      {
        type: 'heading',
        content: 'Getting Started: A Practical Framework',
      },
      {
        type: 'list',
        items: [
          'Identify your highest-volume, lowest-variance workflows — these are the best candidates for initial AI agent deployment.',
          'Choose a narrow vertical first: one process, one agent, one measurable outcome. Breadth before depth leads to expensive failures.',
          'Build on existing infrastructure. AI agents integrate with what you already have (CRM, WhatsApp Business, calendar, email) — you rarely need to rip and replace.',
          'Measure latency and cost before and after deployment. The ROI case almost always closes in 6 months or less.',
          'Plan for human-in-the-loop on edge cases. The best agentic systems know when to escalate to a human — design that handoff from day one.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Agentic AI is not a distant future. It is a present-tense competitive reality. The question for every business leader in Morocco is not whether to adopt it — it is how fast and how well. At H.V.A, we build these systems: AI receptionists, AI analyst agents, and end-to-end workflow automation for businesses across Morocco. If you want to understand what an agentic AI strategy could look like for your specific business, we are ready to show you.',
      },
    ],
  },
  {
    slug: 'custom-digital-solutions-business-transformation',
    title: 'Why Custom Digital Solutions Outperform Off-the-Shelf Software',
    subtitle:
      'From real estate and clinics to construction and logistics — why the businesses winning in 2025 are the ones that built for their specific context, not everyone else\'s.',
    category: 'Software & Strategy',
    readTime: '12 min read',
    publishedAt: '2025-03-17',
    authors: [{ name: 'H.V.A Research Team', role: 'Hive Vault Arc', initials: 'HV' }],
    coverImage: '/Images/CRM.webp',
    excerpt:
      'Generic SaaS tools are fast to start but slow to scale. Industry research from Forrester, McKinsey, Deloitte, and HIMSS shows that custom digital solutions consistently deliver higher ROI, lower long-term cost, and measurable operational improvements across real estate, healthcare, construction, and beyond.',
    tags: ['custom software', 'digital transformation', 'Morocco', 'CRM', 'real estate', 'healthcare'],
    sources: [
      { label: 'Forrester Total Economic Impact Study 2023', url: 'https://www.forrester.com' },
      { label: 'National Association of Realtors Technology Report 2023', url: 'https://www.nar.realtor' },
      { label: 'Deloitte Real Estate Outlook 2024', url: 'https://www2.deloitte.com/us/en/pages/real-estate/articles/commercial-real-estate-outlook.html' },
      { label: 'HIMSS Digital Health Transformation Report 2023', url: 'https://www.himss.org' },
      { label: 'McKinsey Global Institute — Digitizing Health 2024', url: 'https://www.mckinsey.com/industries/healthcare/our-insights' },
      { label: 'McKinsey Global Institute — Reinventing Construction 2023', url: 'https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution' },
      { label: 'Dodge Construction Network — Smart Market Report 2023', url: 'https://www.construction.com' },
    ],
    sections: [
      {
        type: 'paragraph',
        content:
          'Every growing business eventually faces the same decision: keep customizing a SaaS tool that was built for someone else\'s workflow, or build something that fits your business exactly. Most companies default to off-the-shelf. It feels safer — proven product, predictable subscription cost, someone else handles maintenance. But the data tells a different story.',
      },
      {
        type: 'paragraph',
        content:
          'Forrester\'s Total Economic Impact research found that custom-built software delivers an average ROI of 286% over three years, compared to 127% for equivalent SaaS deployments. The gap isn\'t because custom software is magic — it\'s because it eliminates the friction tax: the workarounds, the manual data exports, the integrations that break, the features you pay for but never use, and the critical capabilities that simply don\'t exist in any vendor\'s roadmap.',
      },
      {
        type: 'stat-block',
        stats: [
          { value: '286%', label: 'average 3-year ROI for custom software (vs 127% for SaaS)', source: 'Forrester, 2023' },
          { value: '35%', label: 'increase in lead conversion with custom real estate CRM', source: 'NAR Technology Report, 2023' },
          { value: '20%', label: 'reduction in operational costs for clinics with custom platforms', source: 'HIMSS, 2023' },
          { value: '14-15%', label: 'productivity gains in construction from digitization', source: 'McKinsey Global Institute, 2023' },
        ],
      },
      {
        type: 'heading',
        content: 'The Off-the-Shelf Trap',
      },
      {
        type: 'paragraph',
        content:
          'The trap is seductive: a SaaS tool gets you to 70% of what you need within days. It\'s cheap to start, the UI is polished, and you don\'t need a developer. The problem is the remaining 30%. In most industries, that 30% is precisely where your competitive differentiation lives. Your pricing model, your client communication workflow, your inventory logic, your reporting structure — these are the things that make your business yours. Generic software makes you operate like everyone else.',
      },
      {
        type: 'paragraph',
        content:
          'By year two, the costs compound. Your team has built shadow systems in spreadsheets to handle what the SaaS can\'t. Data lives in three places. Onboarding new staff takes weeks because the real workflow isn\'t documented — it\'s tribal knowledge spread across sticky notes and WhatsApp messages. You\'re paying for a tool and then paying again in human hours to work around it.',
      },
      {
        type: 'pullquote',
        content:
          '"Every workaround in your SaaS tool is a tax on your team\'s time. Multiply it by 12 months and you have the cost of building something that actually fits."',
        attribution: 'H.V.A Engineering Team',
      },
      {
        type: 'heading',
        content: 'Real Estate: Where Custom CRM Changes Everything',
      },
      {
        type: 'paragraph',
        content:
          'Real estate is one of the clearest cases for custom digital solutions. The sector runs on relationships, timing, and local knowledge — three things that generic CRM tools handle poorly. National Association of Realtors\' 2023 Technology Report found that agencies using purpose-built CRM systems specifically configured for their market and lead pipeline achieved a 35% lift in lead-to-client conversion rates compared to those using generic tools like Salesforce configured as a general CRM.',
      },
      {
        type: 'paragraph',
        content:
          'Deloitte\'s Real Estate Outlook 2024 adds another dimension: PropTech adoption — including custom property management, client portal, and analytics platforms — correlated with a 12 to 15 percent improvement in Net Operating Income (NOI) for commercial and residential portfolio operators. The mechanism is straightforward: better data means better pricing decisions, faster occupancy, and lower vacancy costs.',
      },
      {
        type: 'paragraph',
        content:
          'For a real estate agency in Tangier or Casablanca, this translates concretely. A custom CRM built for the Moroccan market handles Arabic, French, and Spanish input natively, integrates with WhatsApp for client follow-up, tracks property listings in real time, and surfaces which leads are most likely to close based on historical data. Off-the-shelf CRM from an American SaaS vendor does none of this without expensive, brittle customization.',
      },
      {
        type: 'heading',
        content: 'Healthcare & Clinics: Digitization as a Clinical Advantage',
      },
      {
        type: 'paragraph',
        content:
          'Healthcare is where the cost of poor software is most visible — and most consequential. HIMSS\' 2023 Digital Health Transformation Report found that clinics and small hospital groups that deployed custom patient management platforms (appointment systems, medical record access, billing workflows) reduced operational expenditures by an average of 20% within 18 months of deployment.',
      },
      {
        type: 'paragraph',
        content:
          'McKinsey\'s 2024 research on healthcare digitization found that end-to-end digital workflows — where patient intake, clinical notes, lab results, and billing flow through a single integrated system rather than disconnected tools — reduced overall healthcare delivery costs by 26%. Patient wait times fell by 50% in clinics that moved from paper-based and fragmented digital systems to integrated custom platforms.',
      },
      {
        type: 'stat-block',
        stats: [
          { value: '26%', label: 'reduction in healthcare delivery costs with integrated digital workflows', source: 'McKinsey, 2024' },
          { value: '50%', label: 'reduction in patient wait times with integrated clinic systems', source: 'McKinsey, 2024' },
          { value: '20%', label: 'operational cost reduction for clinics with custom management platforms', source: 'HIMSS, 2023' },
          { value: '33%', label: 'fewer project overruns with digital project management (construction)', source: 'Dodge Construction Network, 2023' },
        ],
      },
      {
        type: 'paragraph',
        content:
          'For a medical clinic in Morocco, the case is especially compelling. The country\'s healthcare sector is expanding rapidly — both public and private — but software adoption lags. A custom patient portal with Arabic-language support, integration with Moroccan insurance systems, and a WhatsApp-based appointment reminder workflow is not available from any international SaaS vendor. It has to be built. Clinics that build it first will hold a durable operational advantage over competitors still managing appointments via phone calls and paper files.',
      },
      {
        type: 'heading',
        content: 'Construction: The Productivity Prize',
      },
      {
        type: 'paragraph',
        content:
          'Construction is one of the least digitized major industries globally, and the data shows the cost of that gap. McKinsey Global Institute\'s research on construction productivity found that full digitization of project management, materials tracking, and workforce coordination could deliver 14 to 15 percent productivity gains and 4 to 6 percent cost reductions. For an industry operating on 5 to 10 percent margins, this is transformative.',
      },
      {
        type: 'paragraph',
        content:
          'Dodge Construction Network\'s 2023 Smart Market Report found that contractors using custom or purpose-built digital project management systems reported 33% fewer project overruns compared to those using generic project management software like Monday.com or Asana — tools designed for knowledge workers, not construction site workflows. The gap is about fit: construction requires material quantity tracking, subcontractor coordination, permit documentation, and on-site reporting that no generic tool handles well.',
      },
      {
        type: 'heading',
        content: 'Other Industries: The Pattern Holds',
      },
      {
        type: 'paragraph',
        content:
          'The pattern repeats across industries. In logistics, custom fleet and delivery management systems that integrate with local route data and regulatory requirements outperform generic tools. In hospitality, custom property management and booking systems built for specific property types and the Moroccan tourism market reduce double-bookings, improve occupancy, and give owners visibility that international PMS vendors don\'t provide. In retail, custom inventory and point-of-sale systems built around actual product categories and supplier relationships reduce stockouts and overstock.',
      },
      {
        type: 'paragraph',
        content:
          'The commonality across all of these is specificity. The value of custom software is not in the technology — it\'s in how precisely it maps to the real workflow of a specific business operating in a specific market. Generic software, by design, cannot provide this.',
      },
      {
        type: 'heading',
        content: 'Build vs Buy: A Practical Decision Framework',
      },
      {
        type: 'list',
        items: [
          'If your workflow is identical to thousands of other businesses (email marketing, payroll, standard HR) — use SaaS. The commodity use case is exactly what SaaS was built for.',
          'If your workflow has significant local, linguistic, or regulatory specificity (Arabic CRM, Moroccan compliance requirements, local payment integration) — custom is the right answer.',
          'If your competitive differentiation lives inside your process — the way you qualify leads, price deals, or manage clients — build it. Giving that to a SaaS vendor means your competitors can replicate it by subscribing to the same tool.',
          'If you spend significant staff hours workaround existing software — calculate that cost. In most cases, it funds a custom solution within 18 months.',
          'If integration with local systems (WhatsApp Business, Moroccan banking APIs, government portals) is critical — custom is the only viable path.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'At H.V.A, we have built custom CRM systems for real estate agencies, patient management platforms for clinics, and logistics coordination tools for distribution companies — all in Morocco, all with Arabic and French support, all integrated with the local tools and platforms Moroccan businesses actually use. If you want to understand what a custom solution would look like for your specific business, that conversation starts with a call.',
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return POSTS;
}

export function getPostBySlug(slug: string): BlogPost {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`Blog post not found: ${slug}`);
  return post;
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
}
