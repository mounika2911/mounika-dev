import { STACK } from '../constants/data.js';
import SectionLabel from './ui/SectionLabel.jsx';
import './TechStack.css';

// ============================================================
// TECH STACK SECTION
// ============================================================

const TechStack = () => (
  <section id="stack" className="techstack">
    <div className="techstack__inner">
      <SectionLabel>Tools & Technologies</SectionLabel>
      <h2 className="techstack__title">Tech Stack</h2>

      <div className="techstack__grid">
        {STACK.map((name, i) => (
          <div key={name} className="techstack__pill">
            <span className="techstack__pill-dot" />
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
