export const SUPPLIERS = [
  { id: 's1', name: 'Rust Oleum', tier: 'Gold' },
  { id: 's2', name: 'Samsung', tier: 'Platinum' },
  { id: 's3', name: 'Kohler', tier: 'Silver' },
];

export const DEMO_TEMPLATES = [
  {
    id: 't1',
    name: 'Spring Paint Sale',
    status: 'live',
    channels: ['Email', 'DV360', 'On-site', 'Meta'],
    constraints: {
      headlineMax: 30,
      subMax: 50,
      cta: ['Shop Now', 'Learn More', 'Free Shipping'],
      brandColors: ['#F97316', '#fff', '#333'],
    },
    supplier: 'All Suppliers',
    description: 'For seasonal paint promotions. Auto-generates 18 ad sizes across all HD channels.',
  },
  {
    id: 't2',
    name: 'Seasonal Promotion Default',
    status: 'live',
    channels: ['Email', 'On-site', 'Meta'],
    constraints: {
      headlineMax: 35,
      subMax: 60,
      cta: ['Shop Now', 'Explore Now'],
      brandColors: ['#1E3A5F', '#fff'],
    },
    supplier: 'Gold + Platinum',
    description: 'General seasonal template. 14 ad sizes.',
  },
  {
    id: 't3',
    name: 'PLA Default',
    status: 'live',
    channels: ['DV360', 'The Trade Desk'],
    constraints: {
      headlineMax: 25,
      subMax: 45,
      cta: ['Shop Now'],
      brandColors: ['#F97316', '#fff'],
    },
    supplier: 'All Suppliers',
    description: 'Product listing ad default for programmatic channels. 8 ad sizes.',
  },
];

export const AD_SPECS = [
  { channel: 'Email', label: 'Email Banner', w: 600, h: 400 },
  { channel: 'DV360', label: 'Medium Rectangle', w: 300, h: 250 },
  { channel: 'DV360', label: 'Leaderboard', w: 728, h: 90 },
  { channel: 'DV360', label: 'Billboard', w: 970, h: 250 },
  { channel: 'On-site', label: 'Medium Rectangle', w: 300, h: 250 },
  { channel: 'On-site', label: 'Leaderboard', w: 728, h: 90 },
  { channel: 'On-site', label: 'Billboard', w: 970, h: 250 },
  { channel: 'On-site', label: 'Super Leaderboard', w: 1200, h: 150 },
  { channel: 'On-site', label: 'Half Page', w: 300, h: 600 },
  { channel: 'On-site', label: 'Wide Skyscraper', w: 160, h: 600 },
  { channel: 'On-site', label: 'Skyscraper', w: 120, h: 600 },
  { channel: 'On-site', label: 'Large Leaderboard', w: 970, h: 90 },
  { channel: 'On-site', label: 'Homepage Hero', w: 1920, h: 400 },
  { channel: 'On-site', label: 'Inline Banner', w: 970, h: 90 },
  { channel: 'On-site', label: 'Footer Banner', w: 728, h: 90 },
  { channel: 'Meta', label: 'Square (1:1)', w: 1080, h: 1080 },
  { channel: 'Meta', label: 'Landscape (16:9)', w: 1200, h: 675 },
  { channel: 'Meta', label: 'Vertical (4:5)', w: 1080, h: 1350 },
];

export const INITIAL_SUBMISSIONS = [
  {
    id: 'sub_a',
    supplier: 'Rust Oleum',
    supplierId: 's1',
    template: 'Spring Paint Sale',
    submittedAt: '2026-04-11T10:00:00Z',
    status: 'pending',
    headline: '30% Off Interior Paints',
    subheading: 'Premium finishes at unbeatable prices',
    cta: 'Shop Now',
    aiStatus: 'pass',
    aiIssues: [],
    confidence: 94,
    scenario: 'a',
  },
  {
    id: 'sub_b',
    supplier: 'Rust Oleum',
    supplierId: 's1',
    template: 'Spring Paint Sale',
    submittedAt: '2026-04-12T09:30:00Z',
    status: 'pending',
    headline: 'Best Paint Sale Ever!',
    subheading: 'Highest quality at the lowest price',
    cta: 'Shop Now',
    aiStatus: 'warn',
    aiIssues: [
      'Superlative "Best" requires third-party proof',
      'Superlative "lowest" requires substantiation',
    ],
    confidence: 61,
    scenario: 'b',
  },
  {
    id: 'sub_c',
    supplier: 'Samsung',
    supplierId: 's2',
    template: 'PLA Default',
    submittedAt: '2026-04-10T14:00:00Z',
    status: 'approved',
    headline: 'New 4K QLED TVs',
    subheading: 'Crystal-clear picture, vibrant colors',
    cta: 'Shop Now',
    aiStatus: 'pass',
    aiIssues: [],
    confidence: 97,
    scenario: 'c',
  },
  {
    id: 'sub_d',
    supplier: 'Kohler',
    supplierId: 's3',
    template: 'Spring Paint Sale',
    submittedAt: '2026-04-13T08:00:00Z',
    status: 'pending',
    headline: 'Bath Fixtures 20% Off',
    subheading: 'Upgrade your bathroom today',
    cta: 'Shop Now',
    aiStatus: 'pass',
    aiIssues: [],
    confidence: 91,
    scenario: null,
  },
  {
    id: 'sub_e',
    supplier: 'Samsung',
    supplierId: 's2',
    template: 'Seasonal Promotion Default',
    submittedAt: '2026-04-12T11:00:00Z',
    status: 'pending',
    headline: 'Galaxy S25 — Now at HD',
    subheading: 'Pick up in-store or online',
    cta: 'Shop Now',
    aiStatus: 'pass',
    aiIssues: [],
    confidence: 88,
    scenario: null,
  },
  {
    id: 'sub_f',
    supplier: 'Rust Oleum',
    supplierId: 's1',
    template: 'Seasonal Promotion Default',
    submittedAt: '2026-04-09T16:00:00Z',
    status: 'approved',
    headline: 'Spray Paint Clearance',
    subheading: 'Wide range of colors and finishes',
    cta: 'Learn More',
    aiStatus: 'pass',
    aiIssues: [],
    confidence: 93,
    scenario: null,
  },
  {
    id: 'sub_g',
    supplier: 'Kohler',
    supplierId: 's3',
    template: 'PLA Default',
    submittedAt: '2026-04-08T12:00:00Z',
    status: 'rejected',
    headline: 'Best Kitchen Sinks',
    subheading: 'Top-rated by consumers',
    cta: 'Shop Now',
    aiStatus: 'warn',
    aiIssues: ['Superlative detected'],
    confidence: 52,
    scenario: null,
  },
  {
    id: 'sub_h',
    supplier: 'Samsung',
    supplierId: 's2',
    template: 'PLA Default',
    submittedAt: '2026-04-07T10:00:00Z',
    status: 'revisions',
    headline: 'Smart Home Hub',
    subheading: 'Connect everything seamlessly',
    cta: 'Learn More',
    aiStatus: 'pass',
    aiIssues: [],
    confidence: 89,
    scenario: null,
  },
];

export const INITIAL_TAB_CONFIG = {
  pending:   { label: 'Pending',   total: 7,  ids: ['sub_a', 'sub_b', 'sub_d', 'sub_e'] },
  approved:  { label: 'Approved',  total: 45, ids: ['sub_c', 'sub_f'] },
  rejected:  { label: 'Rejected',  total: 2,  ids: ['sub_g'] },
  revisions: { label: 'Revisions', total: 3,  ids: ['sub_h'] },
};

export function checkCompliance(headline, subheading) {
  const superlatives = ['best', 'most', 'only', 'always', 'lowest', 'highest', 'never', 'perfect', 'greatest', '#1', 'number one'];
  const text = ((headline || '') + ' ' + (subheading || '')).toLowerCase();
  const found = superlatives.filter(s => text.includes(s));
  return { pass: found.length === 0, issues: found.map(s => `Superlative "${s}" requires third-party proof`) };
}

export function fmtDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function thirtyDaysStr() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export function statusColor(status) {
  return { pending: 'warning', approved: 'success', rejected: 'error', revisions: 'warning' }[status] || 'default';
}

export function statusLabel(status) {
  return { pending: 'Pending', approved: 'Approved', rejected: 'Rejected', revisions: 'Revisions' }[status] || status;
}
