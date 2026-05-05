import { EXPERIENCE } from '../constants/data.js';
import SectionLabel from './ui/SectionLabel.jsx';
import './Experience.css';

// ============================================================
// EXPERIENCE SECTION
// ============================================================

const Experience = () => (
  <section id="experience" className="experience">
    <div className="experience__inner">
      <SectionLabel>Career Path</SectionLabel>
      <h2 className="experience__title">Experience</h2>

      <div className="experience__timeline">
        {/* Vertical line */}
        <div className="experience__line" />

        {EXPERIENCE.map((item, i) => (
          <div key={i} className="experience__item">
            <div className="experience__dot" />
            <div className="experience__card">
              <div className="experience__card-header">
                <div>
                  <h3 className="experience__role">{item.role}</h3>
                  <span className="experience__company">{item.company}</span>
                </div>
                <span className="experience__period">{item.period}</span>
              </div>
              <p className="experience__desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
