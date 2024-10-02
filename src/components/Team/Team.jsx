import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Instagram, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const SocialIcon = ({ icon: Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
  >
    <Icon size={18} />
  </a>
);

const TeamMemberCard = ({ member }) => (
  <motion.div
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 mx-2"
    whileHover={{ y: -5, boxShadow: '0 5px 20px rgba(139, 92, 246, 0.2)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
      <p className="text-purple-400 text-sm mb-3">{member.role}</p>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{member.bio}</p>
      <div className="flex justify-start space-x-3">
        {member.linkedin && <SocialIcon icon={Linkedin} href={member.linkedin} />}
        {member.github && <SocialIcon icon={Github} href={member.github} />}
        {member.twitter && <SocialIcon icon={Twitter} href={member.twitter} />}
        {member.instagram && <SocialIcon icon={Instagram} href={member.instagram} />}
        {member.portfolio && <SocialIcon icon={Globe} href={member.portfolio} />}
      </div>
    </div>
  </motion.div>
);

const ScrollableSection = ({ title, children }) => {
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
      <h2 className="text-2xl font-bold text-purple-500 mb-6">{title}</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
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

const PartnerLogo = ({ name, logo }) => (
  <motion.div
    className="bg-gray-800 p-4 rounded-lg flex items-center justify-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <img src={logo} alt={name} className="max-h-10 max-w-full filter grayscale hover:grayscale-0 transition-all duration-300" />
  </motion.div>
);

const TeamsPage = () => {
  const teamMembers = {
    coreTeam: [
      {
        name: 'Jane Doe',
        role: 'Lead Developer',
        bio: 'Full-stack developer with 5+ years of experience in web technologies.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        portfolio: 'https://janedoe.com',
      },
      {
        name: 'John Smith',
        role: 'UI/UX Designer',
        bio: 'Passionate about creating intuitive and beautiful user interfaces.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        instagram: 'https://instagram.com',
      },
      {
        name: 'Alice Johnson',
        role: 'Project Manager',
        bio: 'Experienced in leading agile teams and delivering successful projects.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Bob Wilson',
        role: 'Backend Specialist',
        bio: 'Expert in scalable architecture and database optimization.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
      {
        name: 'Emma Davis',
        role: 'DevOps Engineer',
        bio: 'Specializes in CI/CD pipelines and cloud infrastructure.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
      {
        name: 'Michael Chen',
        role: 'Mobile Developer',
        bio: 'Experienced in developing cross-platform mobile applications.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
      {
        name: 'Sophia Rodriguez',
        role: 'Data Scientist',
        bio: 'Expert in machine learning and data analysis techniques.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
    ],
    mentors: [
      {
        name: 'Dr. Robert Brown',
        role: 'Senior Software Architect',
        bio: '20+ years of experience in software architecture and system design.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Emily Chen',
        role: 'Data Science Mentor',
        bio: 'Specializes in machine learning and data analytics.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Michael Lee',
        role: 'Cybersecurity Expert',
        bio: 'Focuses on web application security and ethical hacking.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Sarah Thompson',
        role: 'UX Research Mentor',
        bio: 'Specializes in user research and usability testing methodologies.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        portfolio: 'https://sarahthompson.com',
      },
      {
        name: 'David Garcia',
        role: 'Cloud Architecture Mentor',
        bio: 'Expert in designing scalable and resilient cloud infrastructures.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Lisa Wong',
        role: 'Agile Coach',
        bio: 'Helps teams implement and optimize agile methodologies.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    ],
    members: [
      {
        name: 'Sarah Davis',
        role: 'Frontend Developer',
        bio: 'Enthusiastic about React and modern JavaScript frameworks.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        portfolio: 'https://sarahdavis.com',
      },
      {
        name: 'Tom Wilson',
        role: 'Backend Developer',
        bio: 'Experienced in Node.js and database management.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Lisa Anderson',
        role: 'Mobile App Developer',
        bio: 'Skilled in developing cross-platform mobile applications.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'David Kim',
        role: 'DevOps Engineer',
        bio: 'Passionate about automating deployment processes and improving system reliability.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
      {
        name: 'Emma Roberts',
        role: 'UI Designer',
        bio: 'Creative designer with a keen eye for user-centric interfaces.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        portfolio: 'https://emmaroberts.design',
      },
      {
        name: 'Alex Johnson',
        role: 'Data Analyst',
        bio: 'Skilled in data visualization and statistical analysis.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Olivia Martinez',
        role: 'QA Specialist',
        bio: 'Ensures high-quality software through rigorous testing methodologies.',
        image: '/placeholder.svg?height=200&width=200',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Ryan Patel',
        role: 'Blockchain Developer',
        bio: 'Passionate about decentralized technologies and smart contracts.',
        image: '/placeholder.svg?height=200&width=200',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
    ],
  };

  const partners = [
    { name: 'TechCorp', logo: '/placeholder.svg?height=50&width=150' },
    { name: 'InnovateSoft', logo: '/placeholder.svg?height=50&width=150' },
    { name: 'DevHub', logo: '/placeholder.svg?height=50&width=150' },
    { name: 'CodeMasters', logo: '/placeholder.svg?height=50&width=150' },
    { name: 'CloudScale', logo: '/placeholder.svg?height=50&width=150' },
    { name: 'DataDrive', logo: '/placeholder.svg?height=50&width=150' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 text-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h1>
        
        <ScrollableSection title="Core Team">
          {teamMembers.coreTeam.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </ScrollableSection>

        <ScrollableSection title="Mentors">
          {teamMembers.mentors.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </ScrollableSection>

        <ScrollableSection title="Members">
          {teamMembers.members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </ScrollableSection>

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-purple-500 mb-6 text-center">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <PartnerLogo key={index}
                name={partner.name} logo={partner.logo} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamsPage;