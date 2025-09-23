import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ef5'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '925'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'aa1'),
            routes: [
              {
                path: '/docs/api-reference',
                component: ComponentCreator('/docs/api-reference', '756'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture',
                component: ComponentCreator('/docs/architecture', '4b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/customer-value',
                component: ComponentCreator('/docs/customer-value', '20c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/faq',
                component: ComponentCreator('/docs/faq', '947'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/frameworks',
                component: ComponentCreator('/docs/frameworks', '71a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/first-agent',
                component: ComponentCreator('/docs/getting-started/first-agent', '2d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/installation',
                component: ComponentCreator('/docs/getting-started/installation', '267'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/quickstart',
                component: ComponentCreator('/docs/getting-started/quickstart', '1cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integrations/dify',
                component: ComponentCreator('/docs/integrations/dify', '120'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integrations/flowise',
                component: ComponentCreator('/docs/integrations/flowise', '1cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integrations/n8n',
                component: ComponentCreator('/docs/integrations/n8n', 'd75'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/no-code-integration',
                component: ComponentCreator('/docs/no-code-integration', '03b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pricing',
                component: ComponentCreator('/docs/pricing', 'e46'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/security',
                component: ComponentCreator('/docs/security', '3ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/slack-integration',
                component: ComponentCreator('/docs/slack-integration', '49d'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
