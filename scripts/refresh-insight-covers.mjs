import fs from 'node:fs'
import path from 'node:path'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-01'
const assetVersion = '2026-07-04-v2'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const frontendRoot = path.resolve(studioRoot, '..', 'Hva-website-front')
const outputDir = path.join(studioRoot, 'assets', 'generated-insight-covers')
const require = createRequire(import.meta.url)
const sharp = require(path.join(frontendRoot, 'node_modules', 'sharp'))
const client = getCliClient({apiVersion})

const W = 1600
const H = 900

const colors = {
  navy: '#172132',
  navy2: '#0a1422',
  ink: '#202838',
  slate: '#6d7788',
  muted: '#9aa3af',
  gold: '#dfad49',
  gold2: '#f3d486',
  cream: '#f7f4ed',
  paper: '#f2f0ea',
  blue: '#8fb7cf',
  teal: '#62b6a3',
  green: '#74b98f',
  rust: '#b8784e',
}

const covers = [
  {
    id: 'IuK2abzZBGOYd51ySRR7RH',
    type: 'caseStudy',
    slug: 'zoho-grade-crm-platform',
    filename: 'zoho-crm-real-estate-operations-dashboard.webp',
    alt: 'Real estate CRM operating dashboard with property pipeline stages and lead follow-up signals',
    svg: realEstateCrmCover(),
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf1Mrt',
    type: 'caseStudy',
    slug: 'multilingual-whatsapp-ai-agent',
    filename: 'multilingual-whatsapp-ai-lead-operations.webp',
    alt: 'Multilingual WhatsApp lead operations system with chat flows connected to a sales pipeline',
    svg: multilingualWhatsappCover(),
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf17Rb',
    type: 'newsArticle',
    slug: 'nvidia-rtx-spark-local-ai-superchip-private-agents',
    filename: 'nvidia-rtx-spark-private-ai-superchip.webp',
    alt: 'Private AI superchip workstation with local agent nodes and secure compute signals',
    svg: privateAiChipCover(),
  },
  {
    id: 'C9kRM0yIrVzAHS6D3EimQS',
    type: 'perspective',
    slug: 'fix-the-workflow-before-ai',
    filename: 'workflow-before-ai-operating-map.webp',
    alt: 'Operating workflow map showing constraints resolved before AI automation is added',
    svg: workflowBeforeAiCover(),
  },
  {
    id: 'IuK2abzZBGOYd51ySRR4tL',
    type: 'perspective',
    slug: 'consulting-engineering-one-loop',
    filename: 'consulting-engineering-one-accountable-loop.webp',
    alt: 'Consulting, engineering, and operations connected in one accountable delivery loop',
    svg: oneLoopCover(),
  },
  {
    id: 'IuK2abzZBGOYd51ySRR22p',
    type: 'post',
    slug: 'why-companies-must-integrate-ai-agents-2025',
    filename: 'enterprise-ai-agents-operating-model.webp',
    alt: 'Enterprise AI agent operating model with autonomous task nodes connected to a command dashboard',
    svg: enterpriseAgentsCover(),
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf10ju',
    type: 'post',
    slug: 'whatsapp-ai-chatbot-morocco-business-guide',
    filename: 'whatsapp-ai-chatbots-moroccan-businesses.webp',
    alt: 'WhatsApp AI chatbot service map for Moroccan businesses with customer message flows',
    svg: whatsappMoroccoCover(),
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf0jQW',
    type: 'post',
    slug: 'agentic-ai-autonomous-revolution',
    filename: 'agentic-ai-autonomous-business-operations.webp',
    alt: 'Autonomous agent network coordinating business workflows across an operations dashboard',
    svg: agenticAiCover(),
  },
  {
    id: 'C9kRM0yIrVzAHS6D3Eis3x',
    type: 'researchReport',
    slug: 'ai-operations-benchmark-response-conversion',
    filename: 'ai-operations-benchmark-response-conversion.webp',
    alt: 'AI operations benchmark dashboard comparing response time and conversion performance',
    svg: benchmarkCover(),
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf1Oye',
    type: 'researchReport',
    slug: 'digital-transformation-execution-patterns-mid-market',
    filename: 'digital-transformation-execution-patterns-mid-market.webp',
    alt: 'Digital transformation execution roadmap with phased implementation blocks for mid-market firms',
    svg: transformationPatternsCover(),
  },
  {
    id: 'C9kRM0yIrVzAHS6D3EitwS',
    type: 'researchReport',
    slug: 'cloud-reliability-readiness-index-2026',
    filename: 'cloud-reliability-readiness-index-2026.webp',
    alt: 'Cloud reliability readiness index with monitoring signals across resilient infrastructure',
    svg: cloudReliabilityCover(),
  },
]

function defs() {
  return `
    <defs>
      <filter id="softShadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#07101c" flood-opacity=".22"/>
      </filter>
      <filter id="smallShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="13" flood-color="#07101c" flood-opacity=".18"/>
      </filter>
      <linearGradient id="navyGlow" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#0a1422"/>
        <stop offset=".48" stop-color="#172132"/>
        <stop offset="1" stop-color="#303846"/>
      </linearGradient>
      <linearGradient id="paperGlow" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#fffdf8"/>
        <stop offset=".58" stop-color="#f1eee7"/>
        <stop offset="1" stop-color="#dde5ea"/>
      </linearGradient>
      <linearGradient id="goldWash" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#f6d889" stop-opacity=".95"/>
        <stop offset=".5" stop-color="#dfad49" stop-opacity=".58"/>
        <stop offset="1" stop-color="#8fb7cf" stop-opacity=".36"/>
      </linearGradient>
      <linearGradient id="tealWash" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#0b1928"/>
        <stop offset=".55" stop-color="#1b3541"/>
        <stop offset="1" stop-color="#62b6a3"/>
      </linearGradient>
      <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
        <path d="M72 0H0V72" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="1"/>
      </pattern>
      <pattern id="paperGrid" width="72" height="72" patternUnits="userSpaceOnUse">
        <path d="M72 0H0V72" fill="none" stroke="#172132" stroke-opacity=".06" stroke-width="1"/>
      </pattern>
    </defs>
  `
}

function svgFrame(content, {background = 'url(#paperGlow)', grid = 'paperGrid'} = {}) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${defs()}
      <rect width="${W}" height="${H}" fill="${background}"/>
      <rect width="${W}" height="${H}" fill="url(#${grid})"/>
      ${content}
    </svg>
  `
}

function label(x, y, text, fill = colors.gold) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="5">${text}</text>`
}

function panel(x, y, w, h, fill = '#ffffff', opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${opacity}" stroke="#ffffff" stroke-opacity=".28" filter="url(#smallShadow)"/>`
}

function node(cx, cy, r, fill = colors.gold, stroke = '#ffffff') {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-opacity=".65" stroke-width="2"/>`
}

function line(x1, y1, x2, y2, color = '#ffffff', opacity = '.35', width = 3) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}"/>`
}

function realEstateCrmCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#dcd6c8"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#paperGrid)"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#goldWash)" opacity=".44"/>
    <g opacity=".95">
      <rect x="90" y="210" width="360" height="480" fill="#f7f4ed" filter="url(#softShadow)"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${128 + i * 58}" y="${260 + (i % 2) * 18}" width="42" height="330" fill="#aeb7ba" opacity="${0.55 + i * 0.05}"/>`).join('')}
      ${[0, 1, 2, 3].map((i) => line(110, 330 + i * 72, 430, 330 + i * 72, colors.ink, '.12', 2)).join('')}
      <path d="M82 682C210 628 320 610 465 635" fill="none" stroke="${colors.green}" stroke-width="18" stroke-linecap="round" opacity=".32"/>
    </g>
    <g transform="translate(560 155)">
      ${panel(0, 0, 860, 560, colors.navy, .96)}
      ${label(48, 70, 'CRM OPERATIONS')}
      <rect x="48" y="108" width="764" height="110" fill="#ffffff" opacity=".08"/>
      <rect x="72" y="144" width="150" height="30" fill="${colors.gold}"/>
      <rect x="250" y="144" width="96" height="30" fill="${colors.blue}" opacity=".9"/>
      <rect x="374" y="144" width="230" height="30" fill="#fff" opacity=".26"/>
      <rect x="632" y="144" width="132" height="30" fill="${colors.teal}" opacity=".88"/>
      ${[0, 1, 2, 3].map((i) => `
        <rect x="${72 + i * 184}" y="276" width="138" height="${120 + i * 26}" fill="#ffffff" opacity="${0.1 + i * 0.045}"/>
        <text x="${92 + i * 184}" y="334" fill="#fff" opacity=".72" font-family="Arial" font-size="22" font-weight="700">${['Lead', 'Visit', 'Offer', 'Close'][i]}</text>
      `).join('')}
      ${line(140, 540, 720, 340, colors.gold, '.75', 5)}
      ${[140, 322, 504, 686].map((x, i) => node(x, 540 - i * 66, 15, i === 3 ? colors.teal : colors.gold)).join('')}
    </g>
  `)
}

function multilingualWhatsappCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="url(#tealWash)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <circle cx="1230" cy="96" r="360" fill="${colors.teal}" opacity=".24"/>
    <path d="M250 660C360 430 500 320 730 268C870 236 982 182 1090 102" fill="none" stroke="${colors.gold2}" stroke-opacity=".28" stroke-width="120" stroke-linecap="round"/>
    <g transform="translate(165 150)">
      <rect x="0" y="0" width="430" height="600" rx="52" fill="#081321" filter="url(#softShadow)"/>
      <rect x="32" y="76" width="366" height="464" rx="28" fill="#f7f4ed"/>
      ${[0, 1, 2, 3].map((i) => `
        <rect x="${72 + (i % 2) * 82}" y="${124 + i * 86}" width="${220 - (i % 2) * 30}" height="54" rx="27" fill="${i % 2 ? colors.gold : colors.teal}" opacity="${i % 2 ? '.9' : '.78'}"/>
      `).join('')}
      <circle cx="215" cy="564" r="19" fill="#ffffff" opacity=".24"/>
    </g>
    <g transform="translate(690 200)">
      ${label(0, 0, 'MULTILINGUAL LEAD FLOW')}
      ${[0, 1, 2, 3, 4].map((i) => {
        const y = 78 + i * 86
        return `
          <rect x="0" y="${y}" width="500" height="58" fill="#ffffff" opacity="${0.1 + i * 0.03}"/>
          <text x="28" y="${y + 38}" fill="#fff" font-family="Arial" font-size="26" font-weight="700">${['Arabic', 'French', 'English', 'Sales signal', 'CRM handoff'][i]}</text>
          ${node(548, y + 29, 11, i < 3 ? colors.gold : colors.teal)}
        `
      }).join('')}
      ${line(548, 107, 548, 451, colors.gold2, '.45', 4)}
    </g>
    <path d="M1228 320l118 46l-14 118l-94 58l-94-36l-28-112z" fill="none" stroke="#ffffff" stroke-width="3" stroke-opacity=".26"/>
    ${node(1236, 434, 13, colors.gold2)}
  `, {background: 'url(#tealWash)', grid: 'grid'})
}

function privateAiChipCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="${colors.navy2}"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <radialGradient id="chipRadial" cx=".5" cy=".45" r=".58">
      <stop offset="0" stop-color="#f3d486" stop-opacity=".48"/>
      <stop offset=".55" stop-color="#8fb7cf" stop-opacity=".18"/>
      <stop offset="1" stop-color="#0a1422" stop-opacity="0"/>
    </radialGradient>
    <rect width="${W}" height="${H}" fill="url(#chipRadial)"/>
    <g transform="translate(488 138)" filter="url(#softShadow)">
      <rect x="0" y="0" width="624" height="624" fill="#0f1c2c" stroke="${colors.gold}" stroke-width="4"/>
      <rect x="84" y="84" width="456" height="456" fill="#172132" stroke="#ffffff" stroke-opacity=".18"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `
        ${line(84, 150 + i * 62, 540, 150 + i * 62, colors.blue, '.22', 2)}
        ${line(150 + i * 62, 84, 150 + i * 62, 540, colors.blue, '.22', 2)}
      `).join('')}
      ${[0, 1, 2, 3].map((i) => `
        <rect x="${-46}" y="${92 + i * 110}" width="46" height="18" fill="${colors.gold}" opacity=".75"/>
        <rect x="${624}" y="${92 + i * 110}" width="46" height="18" fill="${colors.gold}" opacity=".75"/>
        <rect x="${92 + i * 110}" y="-46" width="18" height="46" fill="${colors.gold}" opacity=".75"/>
        <rect x="${92 + i * 110}" y="624" width="18" height="46" fill="${colors.gold}" opacity=".75"/>
      `).join('')}
      <circle cx="312" cy="312" r="116" fill="#081321" stroke="${colors.gold2}" stroke-width="2"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (Math.PI * 2 * i) / 6
        const x = 312 + Math.cos(angle) * 190
        const y = 312 + Math.sin(angle) * 190
        return `${line(312, 312, x, y, colors.gold2, '.35', 3)}${node(x, y, 15, colors.blue)}`
      }).join('')}
    </g>
    ${label(112, 148, 'LOCAL PRIVATE AI')}
    <g opacity=".32">
      ${[0, 1, 2, 3, 4].map((i) => `
        <path d="M${118 + i * 82} 708H${360 + i * 74}V${650 - i * 32}H${520 + i * 62}" fill="none" stroke="#ffffff" stroke-width="3"/>
        ${node(520 + i * 62, 650 - i * 32, 8, i % 2 ? colors.gold : colors.blue)}
      `).join('')}
    </g>
  `, {background: colors.navy2, grid: 'grid'})
}

function workflowBeforeAiCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#f5f2eb"/>
    <rect width="${W}" height="${H}" fill="url(#paperGrid)"/>
    <path d="M0 736C270 562 484 676 730 524C968 378 1116 402 1600 222V900H0Z" fill="${colors.blue}" opacity=".14"/>
    <g transform="translate(110 112)">
      ${panel(0, 0, 1380, 652, '#ffffff', .75)}
      ${label(56, 72, 'WORKFLOW FIRST')}
      <g transform="translate(64 150)">
        ${[0, 1, 2, 3].map((i) => `
          <rect x="${i * 270}" y="${i % 2 ? 78 : 0}" width="216" height="130" fill="${i === 1 ? colors.gold2 : '#ffffff'}" stroke="${colors.ink}" stroke-opacity=".14"/>
          <text x="${i * 270 + 26}" y="${(i % 2 ? 78 : 0) + 62}" fill="${colors.ink}" font-family="Arial" font-size="28" font-weight="700">${['Input', 'Constraint', 'Owner', 'Signal'][i]}</text>
          ${i < 3 ? line(i * 270 + 216, (i % 2 ? 78 : 0) + 65, i * 270 + 270, ((i + 1) % 2 ? 78 : 0) + 65, colors.ink, '.32', 4) : ''}
        `).join('')}
        <g transform="translate(1060 30)">
          <circle cx="90" cy="90" r="86" fill="${colors.navy}" opacity=".95"/>
          <path d="M52 94h76M90 56v76" stroke="${colors.gold}" stroke-width="12" stroke-linecap="round"/>
          <rect x="30" y="198" width="120" height="42" fill="#ffffff" stroke="${colors.ink}" stroke-opacity=".18"/>
        </g>
      </g>
      ${[0, 1, 2, 3, 4].map((i) => `
        <rect x="${122 + i * 230}" y="498" width="160" height="20" fill="${i < 3 ? colors.gold : colors.slate}" opacity="${i < 3 ? '.9' : '.25'}"/>
      `).join('')}
    </g>
  `)
}

function oneLoopCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="${colors.navy}"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <circle cx="774" cy="448" r="286" fill="none" stroke="${colors.gold}" stroke-width="42" stroke-opacity=".18"/>
    <circle cx="774" cy="448" r="210" fill="none" stroke="${colors.blue}" stroke-width="2" stroke-opacity=".32"/>
    <path d="M512 430C568 190 900 120 1050 340C1194 552 974 778 710 698C522 640 430 530 512 430Z" fill="none" stroke="${colors.gold}" stroke-width="14" stroke-opacity=".82" stroke-linecap="round"/>
    ${[0, 1, 2].map((i) => {
      const positions = [
        [524, 410, 'DIAGNOSE'],
        [1034, 348, 'BUILD'],
        [708, 698, 'OPERATE'],
      ]
      const [x, y, t] = positions[i]
      return `
        <circle cx="${x}" cy="${y}" r="74" fill="#ffffff" opacity=".09"/>
        ${node(x, y, 22, colors.gold)}
        <text x="${x - 74}" y="${y + 118}" fill="#fff" font-family="Arial" font-size="24" font-weight="700" letter-spacing="4">${t}</text>
      `
    }).join('')}
    ${label(110, 150, 'ONE ACCOUNTABLE LOOP')}
    <g transform="translate(110 694)" opacity=".54">
      <rect x="0" y="0" width="250" height="8" fill="${colors.gold}"/>
      <rect x="286" y="0" width="178" height="8" fill="#ffffff" opacity=".5"/>
      <rect x="500" y="0" width="314" height="8" fill="${colors.blue}"/>
    </g>
  `, {background: colors.navy, grid: 'grid'})
}

function enterpriseAgentsCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#101a29"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <rect x="92" y="120" width="900" height="602" fill="#172132" stroke="#ffffff" stroke-opacity=".12" filter="url(#softShadow)"/>
    ${label(134, 186, 'AGENT OPERATING MODEL')}
    <g transform="translate(150 252)">
      ${[0, 1, 2].map((row) => [0, 1, 2, 3].map((col) => `
        <rect x="${col * 174}" y="${row * 126}" width="132" height="82" fill="#ffffff" opacity="${0.07 + (row + col) * 0.012}"/>
        <circle cx="${col * 174 + 30}" cy="${row * 126 + 28}" r="9" fill="${colors.gold}"/>
      `).join('')).join('')}
      ${[0, 1, 2, 3].map((i) => line(66 + i * 174, 41, 66 + ((i + 1) % 4) * 174, 167, colors.blue, '.28', 2)).join('')}
    </g>
    <g transform="translate(1052 180)" filter="url(#softShadow)">
      <circle cx="210" cy="210" r="210" fill="${colors.gold}" opacity=".14"/>
      <circle cx="210" cy="210" r="132" fill="none" stroke="${colors.gold}" stroke-width="3"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = (Math.PI * 2 * i) / 7
        const x = 210 + Math.cos(a) * 168
        const y = 210 + Math.sin(a) * 168
        return `${line(210, 210, x, y, colors.gold2, '.38', 2)}${node(x, y, 16, i % 2 ? colors.blue : colors.gold)}`
      }).join('')}
      ${node(210, 210, 28, colors.gold)}
    </g>
  `, {background: '#101a29', grid: 'grid'})
}

function whatsappMoroccoCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#efe8d9"/>
    <rect width="${W}" height="${H}" fill="url(#paperGrid)"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#goldWash)" opacity=".28"/>
    <path d="M1038 170l146 26l100 102l-26 160l-122 128l-166-72l-64-154z" fill="${colors.navy}" opacity=".12"/>
    <path d="M1022 178l138 24l94 96l-24 150l-116 120l-158-68l-60-146z" fill="none" stroke="${colors.navy}" stroke-opacity=".33" stroke-width="4"/>
    ${node(1112, 365, 16, colors.gold)}
    <text x="1150" y="372" fill="${colors.ink}" font-family="Arial" font-size="26" font-weight="700">TANGIER</text>
    <g transform="translate(164 126)">
      <rect x="0" y="0" width="438" height="638" rx="48" fill="#101a29" filter="url(#softShadow)"/>
      <rect x="32" y="82" width="374" height="482" rx="28" fill="#f8f5ee"/>
      ${[0, 1, 2, 3, 4].map((i) => `
        <rect x="${i % 2 ? 78 : 38}" y="${132 + i * 75}" width="${i % 2 ? 246 : 300}" height="48" rx="24" fill="${i % 2 ? colors.gold : colors.teal}" opacity="${i % 2 ? '.9' : '.72'}"/>
      `).join('')}
    </g>
    <g transform="translate(700 210)">
      ${label(0, 0, 'MOROCCAN BUSINESS CHATOPS')}
      <path d="M24 116C162 64 326 92 442 160C558 228 706 220 824 150" fill="none" stroke="${colors.gold}" stroke-width="12" stroke-linecap="round" opacity=".42"/>
      ${[0, 1, 2].map((i) => `
        <rect x="${i * 210}" y="256" width="160" height="96" fill="#fff" opacity=".72" stroke="${colors.ink}" stroke-opacity=".1"/>
        <rect x="${i * 210 + 24}" y="294" width="${84 + i * 22}" height="12" fill="${i === 1 ? colors.teal : colors.gold}" opacity=".9"/>
        <rect x="${i * 210 + 24}" y="322" width="${106 - i * 8}" height="12" fill="${colors.ink}" opacity=".14"/>
      `).join('')}
    </g>
  `)
}

function agenticAiCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#11172a"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <radialGradient id="agentGlow" cx=".72" cy=".35" r=".7">
      <stop offset="0" stop-color="#8fb7cf" stop-opacity=".42"/>
      <stop offset=".5" stop-color="#dfad49" stop-opacity=".16"/>
      <stop offset="1" stop-color="#11172a" stop-opacity="0"/>
    </radialGradient>
    <rect width="${W}" height="${H}" fill="url(#agentGlow)"/>
    <g transform="translate(188 152)">
      ${label(0, 0, 'AUTONOMOUS WORKFLOWS')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x = 170 + (i % 4) * 258
        const y = 150 + Math.floor(i / 4) * 238 + (i % 2) * 34
        return `${node(x, y, 30, i % 3 === 0 ? colors.gold : colors.blue)}`
      }).join('')}
      ${[
        [170, 150, 428, 422],
        [428, 184, 686, 150],
        [686, 150, 944, 422],
        [170, 388, 428, 184],
        [686, 422, 944, 184],
        [428, 422, 686, 422],
      ].map((l) => line(l[0], l[1], l[2], l[3], '#fff', '.24', 3)).join('')}
      <rect x="420" y="242" width="290" height="120" fill="#ffffff" opacity=".08"/>
      <text x="462" y="314" fill="#fff" font-family="Arial" font-size="28" font-weight="700">COMMAND LAYER</text>
    </g>
  `, {background: '#11172a', grid: 'grid'})
}

function benchmarkCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#f8f6f1"/>
    <rect width="${W}" height="${H}" fill="url(#paperGrid)"/>
    <g transform="translate(100 124)">
      ${panel(0, 0, 1400, 650, '#ffffff', .84)}
      ${label(58, 80, 'AI OPERATIONS BENCHMARK')}
      <rect x="58" y="138" width="560" height="418" fill="${colors.navy}" opacity=".95"/>
      ${[0, 1, 2, 3, 4].map((i) => line(104, 222 + i * 62, 574, 222 + i * 62, '#fff', '.12', 2)).join('')}
      <polyline points="118,486 220,420 310,452 420,302 560,248" fill="none" stroke="${colors.gold}" stroke-width="8"/>
      <polyline points="118,508 220,486 310,356 420,384 560,272" fill="none" stroke="${colors.blue}" stroke-width="6" opacity=".9"/>
      ${[0, 1, 2].map((i) => `
        <rect x="${720 + i * 190}" y="160" width="150" height="${300 + i * 42}" fill="${i === 0 ? colors.gold : i === 1 ? colors.blue : colors.teal}" opacity=".85"/>
        <text x="${722 + i * 190}" y="522" fill="${colors.ink}" font-family="Arial" font-size="24" font-weight="700">${['RESP', 'CONV', 'LOAD'][i]}</text>
      `).join('')}
      <rect x="720" y="90" width="574" height="42" fill="#172132" opacity=".08"/>
    </g>
  `)
}

function transformationPatternsCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#eee8da"/>
    <rect width="${W}" height="${H}" fill="url(#paperGrid)"/>
    <path d="M0 160C280 70 500 88 740 210C1010 346 1240 240 1600 108V0H0Z" fill="${colors.gold}" opacity=".2"/>
    <g transform="translate(122 144)">
      ${label(0, 0, 'EXECUTION PATTERNS')}
      ${[0, 1, 2, 3].map((i) => `
        <rect x="${i * 340}" y="${120 + i * 58}" width="282" height="136" fill="#fff" opacity=".8" stroke="${colors.ink}" stroke-opacity=".12" filter="url(#smallShadow)"/>
        <text x="${i * 340 + 32}" y="${178 + i * 58}" fill="${colors.ink}" font-family="Arial" font-size="28" font-weight="700">${['Scope', 'Build', 'Adopt', 'Operate'][i]}</text>
        <rect x="${i * 340 + 32}" y="${218 + i * 58}" width="${120 + i * 34}" height="10" fill="${colors.gold}"/>
      `).join('')}
      ${[0, 1, 2].map((i) => line(i * 340 + 282, 188 + i * 58, (i + 1) * 340, 246 + i * 58, colors.ink, '.28', 4)).join('')}
      <rect x="0" y="610" width="1284" height="42" fill="${colors.navy}" opacity=".92"/>
    </g>
  `)
}

function cloudReliabilityCover() {
  return svgFrame(`
    <rect width="${W}" height="${H}" fill="#0f1a28"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <linearGradient id="cloudSky" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f1a28"/>
      <stop offset=".54" stop-color="#243c4f"/>
      <stop offset="1" stop-color="#8fb7cf"/>
    </linearGradient>
    <rect width="${W}" height="${H}" fill="url(#cloudSky)" opacity=".75"/>
    <g transform="translate(112 152)">
      ${label(0, 0, 'CLOUD RELIABILITY INDEX')}
      <rect x="0" y="98" width="620" height="472" fill="#081321" opacity=".72" filter="url(#softShadow)"/>
      ${[0, 1, 2, 3, 4].map((i) => `
        <rect x="${54 + i * 106}" y="${408 - i * 44}" width="68" height="${86 + i * 44}" fill="${i > 2 ? colors.gold : colors.blue}" opacity=".86"/>
      `).join('')}
      ${[0, 1, 2, 3].map((i) => line(54, 196 + i * 72, 560, 196 + i * 72, '#fff', '.1', 2)).join('')}
    </g>
    <g transform="translate(870 220)">
      <path d="M70 245C-10 225-20 96 92 80C128 12 250 0 286 84C392 78 456 170 414 254Z" fill="#ffffff" opacity=".14"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 44 + i * 82
        const y = 330 + (i % 2) * 60
        return `${node(x, y, 12, colors.gold)}${line(x, y, x, y + 92, colors.gold2, '.32', 3)}`
      }).join('')}
      <rect x="26" y="514" width="456" height="60" fill="#ffffff" opacity=".09"/>
      <text x="50" y="552" fill="#fff" font-family="Arial" font-size="24" font-weight="700">OBSERVABILITY / RESILIENCE / RECOVERY</text>
    </g>
  `, {background: '#0f1a28', grid: 'grid'})
}

async function writeWebp(cover) {
  await fs.promises.mkdir(outputDir, {recursive: true})
  const filePath = path.join(outputDir, cover.filename)
  await sharp(Buffer.from(cover.svg)).webp({quality: 88, effort: 6}).toFile(filePath)
  return filePath
}

async function uploadAsset(cover, filePath) {
  const sourceId = `hva-generated-insight-cover:${assetVersion}:${cover.slug}`
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id, url, originalFilename}',
    {sourceId},
  )

  if (existing?._id) return existing

  return client.assets.upload('image', fs.createReadStream(filePath), {
    filename: cover.filename,
    source: {
      id: sourceId,
      name: 'hva-generated-insight-cover',
      url: `generated://${cover.filename}`,
    },
  })
}

async function patchDocument(cover, asset) {
  const image = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }

  const patch = client.patch(cover.id)

  if (cover.type === 'caseStudy') {
    patch.set({
      'assets.coverImage': image,
      'assets.coverAlt': cover.alt,
    })
  } else {
    patch.set({
      coverImage: image,
      coverAlt: cover.alt,
    })
  }

  await patch.commit()
}

async function main() {
  console.log(`Generating ${covers.length} replacement covers as WebP assets...`)

  for (const cover of covers) {
    const filePath = await writeWebp(cover)
    const asset = await uploadAsset(cover, filePath)
    await patchDocument(cover, asset)
    console.log(`updated ${cover.type}: ${cover.slug} -> ${cover.filename}`)
  }

  console.log('Done. Protected onboarding and custom CRM covers were not touched.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
