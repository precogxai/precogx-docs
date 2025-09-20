import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PrecogX Documentation',
  tagline: 'Next-Gen SOAR Platform for Agentic AI world',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://precogxai.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain deployment, it should be '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'precogxai', // Usually your GitHub org/user name.
  projectName: 'precogx-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/precogxai/precogx-docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'PrecogX',
      logo: {
        alt: 'PrecogX Logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://app.precogx.ai',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/precogxai/precogx_sdk',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Quickstart',
              to: '/docs/getting-started/quickstart',
            },
            {
              label: 'Installation',
              to: '/docs/getting-started/installation',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Dashboard',
              href: 'https://app.precogx.ai',
            },
            {
              label: 'Pricing',
              href: 'https://precogx.ai/#pricing',
            },
            {
              label: 'Features',
              href: 'https://precogx.ai/#features',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/precogxai',
            },
            {
              label: 'Status',
              href: 'https://status.precogx.ai',
            },
            {
              label: 'Contact',
              href: 'mailto:support@precogx.ai',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PrecogX. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
