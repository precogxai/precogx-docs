import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>> | null;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Real-time Threat Detection',
    Svg: null,
    description: (
      <>
        Monitor your AI agents in real-time with advanced threat detection 
        capabilities that identify and block malicious activities instantly.
      </>
    ),
  },
  {
    title: 'Easy Integration',
    Svg: null,
    description: (
      <>
        Get started in minutes with our lightweight SDK. Integrate with 
        LangChain, AutoGen, CrewAI, or use our simple API for maximum flexibility.
      </>
    ),
  },
  {
    title: 'Guardrail your AI Agents',
    Svg: null,
    description: (
      <>
        Built for enterprise with SOC2 compliance, advanced analytics, 
        and human-in-the-loop validation for critical security decisions.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
