import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started with PrecogX 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Next-Gen SOAR Platform for Agentic AI world`}
      description="Complete documentation for PrecogX SOAR platform - AI security orchestration, threat detection, and agent protection. Get started with SDK, integrations, and deployment guides.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className="padding-vert--xl">
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <div className="text--center">
                  <div className="row">
                    <div className="col col--4">
                      <div className="card">
                        <div className="card__header">
                          <h3>🚀 Quickstart</h3>
                        </div>
                        <div className="card__body">
                          <p>Get started with PrecogX in 5 minutes</p>
                        </div>
                        <div className="card__footer">
                          <Link className="button button--primary" to="/docs/getting-started/quickstart">
                            Start Here
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col col--4">
                      <div className="card">
                        <div className="card__header">
                          <h3>⚙️ Installation</h3>
                        </div>
                        <div className="card__body">
                          <p>Install the SDK and configure your first agent</p>
                        </div>
                        <div className="card__footer">
                          <Link className="button button--primary" to="/docs/getting-started/installation">
                            Install SDK
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col col--4">
                      <div className="card">
                        <div className="card__header">
                          <h3>🤖 First Agent</h3>
                        </div>
                        <div className="card__body">
                          <p>Create and protect your first AI agent</p>
                        </div>
                        <div className="card__footer">
                          <Link className="button button--primary" to="/docs/getting-started/first-agent">
                            Create Agent
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
