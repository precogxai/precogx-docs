import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quickstart',
        'getting-started/installation',
        'getting-started/first-agent',
      ],
    },
    {
      type: 'category',
      label: 'Integration Guides',
      items: [
        {
          type: 'category',
          label: 'Framework Integrations',
          items: [
            'frameworks',
          ],
        },
        {
          type: 'category',
          label: 'No-Code Platform Integrations',
          items: [
            'no-code-integration',
            'integrations/flowise',
            'integrations/n8n',
            'integrations/dify',
          ],
        },
        'api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Security & Architecture',
      items: [
        'real-time-prevention',
        'architecture',
        'security',
      ],
    },
    {
      type: 'category',
      label: 'SDK Reference',
      items: [
        'sdk/how-agents-work',
      ],
    },
    {
      type: 'category',
      label: 'Business',
      items: [
        'pricing',
        'customer-value',
        'faq',
      ],
    },
    {
      type: 'category',
      label: 'Case Studies',
      items: [
        'case-studies/overview',
        'case-studies/fintech-trading',
        'case-studies/healthcare-clinical',
        'case-studies/ecommerce-support',
        'case-studies/legal-contract',
        'case-studies/hr-talent',
      ],
    },
    {
      type: 'category',
      label: 'Legal',
      items: [
        'legal/terms',
        'legal/privacy',
      ],
    },
  ],
};

export default sidebars;