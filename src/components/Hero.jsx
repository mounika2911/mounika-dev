import { ME, EMPLOYER, SOCIALS } from '../constants/data.js';
import Button from './ui/Button.jsx';
import SocialLink from './ui/SocialLink.jsx';
import { DownloadIcon, SparkleIcon } from '../assets/icons/index.jsx';
import './Hero.css';

// ============================================================
// HERO SECTION
// ============================================================

const Hero = ({ onOpenChat }) => (
  <section id="about" className="hero">

    {/* Background grid lines */}
    <div className="hero__grid" aria-hidden="true" />

    <div className="hero__inner">

      {/* Left — text */}
      <div className="hero__content">

        <div className="hero__badge anim-fade-up delay-1">
          <span className="hero__badge-dot anim-pulse" />
          Open to opportunities
        </div>

        <h1 className="hero__name anim-fade-up delay-2">
          Hi, I'm<br />
          <span className="hero__name-highlight">{ME.name}</span>
        </h1>

        <p className="hero__title anim-fade-up delay-3">
          {ME.title} <span className="hero__title-dim">{ME.subtitle}</span>
        </p>

        <p className="hero__bio anim-fade-up delay-4">{ME.bio}</p>

        <div className="hero__actions anim-fade-up delay-5">
          <Button
            as="a"
            href={ME.resumeUrl}
            download
            variant="solid"
            icon={<DownloadIcon />}
          >
            Download Resume
          </Button>

          <Button
            variant="ghost"
            icon={<SparkleIcon />}
            onClick={onOpenChat}
          >
            Ask AI About Me
          </Button>
        </div>

        <div className="hero__socials anim-fade-up delay-5">
          {SOCIALS.map(s => (
            <SocialLink key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Right — avatar */}
      <div className="hero__visual anim-float">
        <div className="hero__avatar-wrap">
          {/* Spinning ring */}
          <svg className="hero__ring anim-spin-slow" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="105" fill="none"
              stroke="var(--clr-green)" strokeWidth="1"
              strokeDasharray="6 5" strokeOpacity="0.4" />
          </svg>

          {/* Avatar */}
          <div className="hero__avatar">
            {ME.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        {/* Status badge */}
        <div className="hero__status">
          <span className="hero__status-dot anim-pulse" />
          {EMPLOYER.role} @ {EMPLOYER.current}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
