import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Hero from './components/Hero'
import About from './components/About'
import Event from './components/Event'
import Schedule from './components/Schedule'
import Sponsors from './components/Sponsors'
import Reel from './components/Reel'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import SchedulePageNew_1 from './pages/SchedulePageNew_1'
import SchedulePageNew_2 from './pages/SchedulePageNew_2'
import SchedulePageNew_3 from './pages/SchedulePageNew_3'
import EventDetails from './components/EventDetails'

function HomePage({ scrollToRefs, scrollToSection, isScrolled }) {
  const location = useLocation();

  useEffect(() => {
    // If we're returning from an event page, scroll instantly to the events section
    if (location.state?.scrollToEvents && scrollToRefs.eventRef.current) {
      setTimeout(() => {
        scrollToRefs.eventRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        // Clear state so it doesn't fire again on re-renders
        window.history.replaceState({}, document.title);
      }, 50);
    }
  }, [location.state, scrollToRefs.eventRef]);

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
      />
      <div className="flex flex-col min-h-screen">
        <Navbar
          scrollToRefs={scrollToRefs}
          scrollToSection={scrollToSection}
          isScrolled={isScrolled}
        />

      <main className="grow bg-black">
        <Hero ref={scrollToRefs.heroRef} />
        <About ref={scrollToRefs.aboutRef} />
        <Event ref={scrollToRefs.eventRef} />
        <Schedule ref={scrollToRefs.scheduleRef} />
        <Sponsors ref={scrollToRefs.sponsorsRef} />
        <Reel ref={scrollToRefs.reelRef} />
      </main>

        <Footer
          scrollToRefs={scrollToRefs}
          scrollToSection={scrollToSection}
        />
      </div>
    </>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const scheduleRef = useRef(null);
  const eventRef = useRef(null);
  const sponsorsRef = useRef(null);
  const reelRef = useRef(null);

  const scrollToRefs = { heroRef, aboutRef, scheduleRef, eventRef, sponsorsRef, reelRef };
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll event for navbar background and disable native scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              scrollToRefs={scrollToRefs}
              scrollToSection={scrollToSection}
              isScrolled={isScrolled}
            />
          }
        />
        <Route path="/schedule/1" element={<SchedulePageNew_1 />} />
        <Route path="/schedule/2" element={<SchedulePageNew_2 />} />
        <Route path="/schedule/3" element={<SchedulePageNew_3 />} />
        <Route path="/events/:eventName" element={<EventDetails />} />
      </Routes>
      <Chatbot />
    </div>
  )
}

export default App
