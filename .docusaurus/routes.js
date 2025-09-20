import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/precogx-docs/docs',
    component: ComponentCreator('/precogx-docs/docs', '733'),
    routes: [
      {
        path: '/precogx-docs/docs',
        component: ComponentCreator('/precogx-docs/docs', '684'),
        routes: [
          {
            path: '/precogx-docs/docs',
            component: ComponentCreator('/precogx-docs/docs', '456'),
            routes: [
              {
                path: '/precogx-docs/docs/architecture',
                component: ComponentCreator('/precogx-docs/docs/architecture', '62e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/customer-value',
                component: ComponentCreator('/precogx-docs/docs/customer-value', '3fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/faq',
                component: ComponentCreator('/precogx-docs/docs/faq', '1ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/frameworks',
                component: ComponentCreator('/precogx-docs/docs/frameworks', '0af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/getting-started/first-agent',
                component: ComponentCreator('/precogx-docs/docs/getting-started/first-agent', '4bc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/getting-started/installation',
                component: ComponentCreator('/precogx-docs/docs/getting-started/installation', '177'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/getting-started/quickstart',
                component: ComponentCreator('/precogx-docs/docs/getting-started/quickstart', '90e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/intro',
                component: ComponentCreator('/precogx-docs/docs/intro', 'ae7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/no-code-integration',
                component: ComponentCreator('/precogx-docs/docs/no-code-integration', '531'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/pricing',
                component: ComponentCreator('/precogx-docs/docs/pricing', '478'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/security',
                component: ComponentCreator('/precogx-docs/docs/security', 'cb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/precogx-docs/docs/slack-integration',
                component: ComponentCreator('/precogx-docs/docs/slack-integration', '536'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/precogx-docs/',
    component: ComponentCreator('/precogx-docs/', '448'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
