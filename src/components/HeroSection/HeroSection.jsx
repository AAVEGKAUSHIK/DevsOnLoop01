import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Twitter, Code, Rocket, Calendar, Users, Trophy, ChevronLeft, ChevronRight, Book, Globe, Zap, MessageSquare } from 'lucide-react';

const Button = ({ children, primary, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-semibold transition-colors ${
      primary
        ? 'bg-purple-600 text-white hover:bg-purple-700'
        : 'bg-gray-700 text-white hover:bg-gray-600'
    }`}
  >
    {children}
  </button>
);

const RoadmapStep = ({ step, isActive, onClick }) => (
  <motion.div
    className={`flex flex-col items-center cursor-pointer ${isActive ? 'text-purple-500' : 'text-gray-400'}`}
    onClick={() => onClick(step.id)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
        isActive ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
      }`}
      animate={{ scale: isActive ? 1.2 : 1 }}
    >
      {step.icon}
    </motion.div>
    <span className="font-semibold text-center text-sm">{step.title}</span>
  </motion.div>
);

const RoadmapContent = ({ step }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="mt-12"
  >
    <h3 className="text-2xl font-bold text-purple-400 mb-2">{step.date}</h3>
    <h4 className="text-3xl font-bold text-white mb-4">{step.title}</h4>
    <p className="text-gray-300 mb-6">{step.description}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {step.details.map((detail, index) => (
        <motion.div 
          key={index} 
          className="bg-gray-800 p-6 rounded-lg shadow-md flex items-start"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mr-4 text-purple-500">
            {detail.icon}
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">{detail.title}</h5>
            <p className="text-gray-300">{detail.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-80"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img src={items[currentIndex].image} alt={items[currentIndex].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{items[currentIndex].title}</h2>
              <p className="text-xl text-gray-200 mb-8">{items[currentIndex].description}</p>
              <Button primary>{items[currentIndex].buttonText}</Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const ScrollableSection = ({ children, title }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        scroll(-200);
      } else if (e.key === 'ArrowRight') {
        scroll(200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className="mb-16 relative">
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide space-x-8 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {children}
        </div>
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            onClick={() => scroll(-200)}
            style={{ marginTop: '-20px' }}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            onClick={() => scroll(200)}
            style={{ marginTop: '-20px' }}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

const ImprovedDevsOnLoop = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const roadmapSteps = [
    {
      id: 1,
      date: 'September 2023',
      title: 'Club Foundation',
      description: 'DevsOnLoop was established with 20 founding members, setting the stage for a vibrant community of student developers.',
      icon: <Users size={24} />,
      details: [
        { 
          title: 'Founding Team', 
          description: 'Assembled a diverse group of passionate students to lead the club.',
          icon: <Users size={24} />
        },
        { 
          title: 'Mission Statement', 
          description: 'Defined our goal to foster collaboration and innovation in web & App development.',
          icon: <Rocket size={24} />
        },
      ],
    },
    {
      id: 2,
      date: 'December 2023',
      title: 'First Hackathon',
      description: 'Successfully organized our inaugural 24-hour coding challenge, bringing together students from various disciplines.',
      icon: <Code size={24} />,
      details: [
        { 
          title: 'Event Planning', 
          description: 'Coordinated logistics, sponsors, and mentors for the hackathon.',
          icon: <Calendar size={24} />
        },
        { 
          title: 'Project Showcase', 
          description: 'Highlighted innovative projects created during the event.',
          icon: <Rocket size={24} />
        },
      ],
    },
    {
      id: 3,
      date: 'March 2024',
      title: 'Open Source Contribution',
      description: 'Collaborated on a major open source project, making over 100 commits and gaining real-world development experience.',
      icon: <Github size={24} />,
      details: [
        { 
          title: 'Project Selection', 
          description: 'Chose a high-impact open source project aligned with our skills and interests.',
          icon: <Code size={24} />
        },
        { 
          title: 'Contribution Process', 
          description: 'Learned about git workflows, code reviews, and collaborative coding practices.',
          icon: <Github size={24} />
        },
      ],
    },
    {
      id: 4,
      date: 'June 2024',
      title: 'Summer Bootcamp',
      description: 'Launching our intensive web development bootcamp for beginners, aiming to introduce more students to the world of coding.',
      icon: <Calendar size={24} />,
      details: [
        { 
          title: 'Curriculum Development', 
          description: 'Created a comprehensive syllabus covering HTML, CSS, JavaScript, and modern frameworks.',
          icon: <Code size={24} />
        },
        { 
          title: 'Mentorship Program', 
          description: 'Paired experienced club members with beginners for personalized guidance.',
          icon: <Users size={24} />
        },
      ],
    },
    {
      id: 5,
      date: 'September 2024',
      title: 'Tech Talk Series',
      description: 'Launched a monthly tech talk series featuring industry experts and alumni, providing insights into the latest trends and career opportunities.',
      icon: <MessageSquare size={24} />,
      details: [
        { 
          title: 'Speaker Lineup', 
          description: 'Curated a diverse range of speakers from various tech fields.',
          icon: <Users size={24} />
        },
        { 
          title: 'Knowledge Sharing', 
          description: 'Facilitated Q&A sessions and networking opportunities for attendees.',
          icon: <MessageSquare size={24} />
        },
      ],
    },
    {
      id: 6,
      date: 'December 2024',
      title: 'National Recognition',
      description: 'Recognized as a top college developer club nationally, showcasing our projects and community impact.',
      icon: <Trophy size={24} />,
      details: [
        { 
          title: 'Achievement Compilation', 
          description: 'Documented our journey, projects, and member success stories.',
          icon: <Trophy size={24} />
        },
        { 
          title: 'Networking', 
          description: 'Established connections with industry professionals and other top-tier clubs.',
          icon: <Users size={24} />
        },
      ],
    },
  ];

  const featuredProjects = [
    {
      title: 'Campus Connect',
      description: 'A social platform for college events and activities.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Study Buddy AI',
      description: 'AI-powered study assistant for personalized learning.',
      image: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'EcoTrack',
      description: 'Mobile app for tracking and reducing carbon footprint.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Code Mentor',
      description: 'Platform connecting coding mentors with students.',
      image: 'https://plus.unsplash.com/premium_photo-1682130138138-070e8f7a4fd5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Virtual Hackathon',
      description: 'Online platform for organizing and participating in hackathons.',
      image: 'https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const carouselItems = [
    {
      title: "Join the Future of Web Development",
      description: "Collaborate, Learn, and Create with Peers at DevsOnLoop",
      buttonText: "Join Us",
      image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg",
    },
    {
      title: "Upcoming Hackathon",
      description: "Get ready for our 24-hour coding challenge",
      buttonText: "Register Now",
      image: "https://www.kreativdistrikt.com/wp-content/uploads/2024/02/The-Art-of-Successful-Hackathon-Management.webp",
    },
    {
      title: "Open Source Projects",
      description: "Contribute to real-world projects and gain experience",
      buttonText: "Explore Projects",
      image: "https://onlim.com/wp-content/uploads/Open-Source.jpg",
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <main>
          <section className="mb-16">
            <Carousel items={carouselItems} />
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Our Journey</h2>
            <div className="bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start mb-12 overflow-x-auto pb-4">
                {roadmapSteps.map((step) => (
                  <div key={step.id} className="flex-shrink-0 mx-2">
                    <RoadmapStep
                      step={step}
                      isActive={activeStep === step.id}
                      onClick={setActiveStep}
                    />
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-700 rounded-full mb-12">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(activeStep / roadmapSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <AnimatePresence mode="wait">
                <RoadmapContent key={activeStep} step={roadmapSteps[activeStep - 1]} />
              </AnimatePresence>
            </div>
          </section>

          <ScrollableSection title="Featured Projects">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </ScrollableSection>

          <ScrollableSection title="What We Offer">
            {[
              { title: "Workshops", description: "Hands-on learning experiences", icon: <Book size={24} /> },
              { title: "Networking", description: "Connect with industry professionals", icon: <Globe size={24} /> },
              { title: "Hackathons", description: "Compete and innovate", icon: <Zap size={24} /> },
              { title: "Mentorship", description: "Guidance from experienced developers", icon: <Users size={24} /> },
              { title: "Tech Talks", description: "Insights from industry experts", icon: <MessageSquare size={24} /> },
              { title: "Project Collaboration", description: "Work on real-world projects", icon: <Code size={24} /> },
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md flex-shrink-0 w-64">
                <div className="text-purple-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </ScrollableSection>

          <ScrollableSection title="Testimonials">
            {[
              { name: "Mayank Trivedi", role: "Computer Science Student", quote: "DevsOnLoop has been instrumental in my growth as a developer. The community and resources are unparalleled." },
              { name: "Pallavi Yadav", role: "Information Technology Student", quote: "Thanks to the connections I made through DevsOnLoop, I landed my dream job right out of college!" },
              { name: "Anushka", role: "Chemical Engineering Student", quote: "The mentorship program at DevsOnLoop gave me the confidence to tackle complex projects and accelerate my career." },
              { name: "Deepanshu Chauhan", role: "Computer Science Student", quote: "DevsOnLoop's workshops filled the gaps in my coding knowledge and helped me transition into tech smoothly." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md flex-shrink-0 w-80">
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-purple-400">{testimonial.role}</div>
              </div>
            ))}
          </ScrollableSection>
        </main>
      </div>
    </div>
  );
};

export default ImprovedDevsOnLoop;