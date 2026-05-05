import { useState } from 'react';

// Styles
import './styles/global.css';
import './styles/animations.css';

// Components
import Navbar     from './components/Navbar.jsx';
import Hero       from './components/Hero.jsx';
import Experience from './components/Experience.jsx';
import Projects   from './components/Projects.jsx';
import TechStack  from './components/TechStack.jsx';
import Contact    from './components/Contact.jsx';
import Footer     from './components/Footer.jsx';
import ChatPanel, { ChatFab } from './components/ChatPanel.jsx';

// ============================================================
// APP — root component, composes everything
// ============================================================

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        <Hero       onOpenChat={() => setChatOpen(true)} />
        <Experience />
        <Projects   />
        <TechStack  />
        <Contact    />
      </main>

      <Footer />

      {/* AI Chat */}
      {chatOpen
        ? <ChatPanel onClose={() => setChatOpen(false)} />
        : <ChatFab   onClick={() => setChatOpen(true)}  />
      }
    </>
  );
}
