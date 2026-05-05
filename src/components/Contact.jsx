import { ME, SOCIALS } from '../constants/data.js';
import SectionLabel from './ui/SectionLabel.jsx';
import Button from './ui/Button.jsx';
import SocialLink from './ui/SocialLink.jsx';
import { MailIcon, MapPinIcon, PhoneIcon } from '../assets/icons/index.jsx';
import './Contact.css';

// ============================================================
// CONTACT SECTION
// ============================================================

const Contact = () => (
  <section id="contact" className="contact">
    <div className="contact__inner">
      <SectionLabel>Say Hello</SectionLabel>

      <h2 className="contact__title">
        Let's build something<br />
        <span className="contact__title-accent">great together.</span>
      </h2>

      <p className="contact__sub">
        I'm open to new opportunities. Whether you have a project
        in mind or just want to connect — my inbox is always open.
      </p>

      <Button
        as="a"
        href={`mailto:${ME.email}`}
        variant="solid"
        size="lg"
        icon={<MailIcon />}
        className="contact__email-btn"
      >
        {ME.email}
      </Button>

      <div className="contact__meta">
        <span><MapPinIcon /> {ME.location}</span>
        <span className="contact__meta-divider">·</span>
        <span><PhoneIcon /> {ME.phone}</span>
      </div>

      <div className="contact__socials">
        {SOCIALS.map(s => (
          <SocialLink key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
