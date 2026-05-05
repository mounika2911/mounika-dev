import { PROJECTS } from '../constants/data.js';
import SectionLabel from './ui/SectionLabel.jsx';
import { ArrowUpRightIcon } from '../assets/icons/index.jsx';
import './Projects.css';

// ============================================================
// PROJECTS SECTION
// ============================================================

const ProjectCard = ({ name, year, emoji, description, tags, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="project-card">
    <div className="project-card__top">
      <div className="project-card__icon">{emoji}</div>
      <ArrowUpRightIcon size={16} />
    </div>

    <div className="project-card__body">
      <div className="project-card__meta">
        <h3 className="project-card__name">{name}</h3>
        <span className="project-card__year">{year}</span>
      </div>
      <p className="project-card__desc">{description}</p>
    </div>

    <div className="project-card__tags">
      {tags.map(t => (
        <span key={t} className="project-card__tag">{t}</span>
      ))}
    </div>
  </a>
);

const Projects = () => (
  <section id="projects" className="projects">
    <div className="projects__inner">
      <SectionLabel>Selected Work</SectionLabel>
      <h2 className="projects__title">Projects</h2>

      <div className="projects__grid">
        {PROJECTS.map(p => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
