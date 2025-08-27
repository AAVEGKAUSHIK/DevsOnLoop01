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
    className="bg-gray-800 scrollbar-thumb-purple-500 scrollbar-track-gray-200 scrollbar-thin p-4 rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 mx-2"
    whileHover={{ y: -5, boxShadow: '0 5px 20px rgba(139, 92, 246, 0)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="relative items-center h-48 overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t "></div>
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
        name: 'Kapil Gautam',
        role: 'Lead Developer',
        bio: 'Full-stack developer with 5+ years of experience in web technologies.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/kapilsir.jpeg',
        linkedin: 'https://www.linkedin.com/in/kapil-gautam52/',
        github: 'https://github.com/Kapil-gautam',
        twitter: '',
        portfolio: '',
      },
    ],
    mentors: [
      {
        name: 'Nikhil Kesarwani',
        role: 'Assistant Mentor',
        bio: '2+ years of experience in App Development.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/nikhil.png',
        linkedin: 'https://www.linkedin.com/in/nikhilkesarwani111/',
        github: 'https://github.com/Nikhil-kesarwani111',
      },
      {
        name: 'Prajjwal Jaiswal',
        role: 'Data Science Mentor',
        bio: 'Specializes in machine learning and data analytics.',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQEZiIfV5hor3Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725282785840?e=1759363200&v=beta&t=08F77uv-I6ketgXcnkqtwrLp5Gsk88qFlbVUBaZELj8',
        linkedin: 'https://www.linkedin.com/in/prajjwal-jaiswal-452381224/',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Vineet Singh',
        role: 'Cybersecurity Expert',
        bio: 'Focuses on web application security and ethical hacking.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/Vineet%20Singh.jpg',
        linkedin: 'https://www.linkedin.com/in/vineet-singh021/',
        github: 'https://github.com',
      },
      {
        name: 'Harsh Kushwaha',
        role: 'UX Research Mentor',
        bio: 'Specializes in user research and usability testing methodologies.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/1000056685-01%20(1)%20-%20Harsh%20Kumar%20Kushwaha.jpeg',
        linkedin: 'https://www.linkedin.com/in/harsh-kumar-kushwaha-a67338203/',
        portfolio: 'https://sarahthompson.com',
      },
      {
        name: 'Shreya Pal',
        role: 'Cloud Architecture Mentor',
        bio: 'Expert in designing scalable and resilient cloud infrastructures.',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQFUio6ctpIdEQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720207929896?e=1759363200&v=beta&t=502-YqYWnpVs2WCsSa3SCTq-tbc4TKeqlvOP553msnY',
        linkedin: 'https://www.linkedin.com/in/shreya-pal-43876b25b/',
        github: 'https://github.com',
      },
      {
        name: 'Anjali V.P. Upadhyay',
        role: 'Agile Coach',
        bio: 'Helps teams implement and optimize agile methodologies.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/Anjali%20Upadhyay.jpeg',
        linkedin: 'https://www.linkedin.com/in/anjali-upadhyay-721435268/',
        twitter: 'https://twitter.com',
      },
    ],
    Coordinators: [
      {
        name: 'Aaveg Kaushik',
        role: 'FullStack Developer',
        bio: 'Enthusiastic about React and modern JavaScript frameworks.',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQF4ItaMDM7V9A/profile-displayphoto-shrink_400_400/B56ZeIilZhG0Ao-/0/1750342458649?e=1759363200&v=beta&t=DDmQ7F5nXuqsihTbZp_MMIafw-07KPK3p2IUnmgkZVw',
        github: 'https://github.com/AAVEGKAUSHIK',
        linkedin: 'https://www.linkedin.com/in/aavegkaushik/',
        portfolio: 'https://sarahdavis.com',
      },
      {
        name: 'Dhruv Tandon',
        role: 'Backend Developer',
        bio: 'Experienced in Node.js and database management.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/DhruvTandon.jpg',
        linkedin: 'https://www.linkedin.com/in/dhruv-tandon-6b65192ab/',
        github: 'https://github.com',
      },
      {
        name: 'Anmol Varshney',
        role: 'Video Editor',
        bio: 'Experienced in Video Editing.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/anmol.jpg',
        linkedin: 'https://www.linkedin.com/in/dhruv-tandon-6b65192ab/',
        github: 'https://github.com',
      },
      {
        name: 'Pranjali Gupta',
        role: 'Content Writer',
        bio: 'Skilled in Write Content for every event post for various Social Media Handles.',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQF40KXUVJtfNA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718253646642?e=1759363200&v=beta&t=K052kEBnY-w0F5NmvoMG5Yq6out7rOQlDZxFroHQn5I',
        linkedin: 'https://www.linkedin.com/in/pranjali-gupta-1b9446309/',
        github: 'https://github.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Sumit Kumar Thakur',
        role: 'DevOps Engineer',
        bio: 'Passionate about automating deployment processes and improving system reliability.',
        image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/Sumit.jpg',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
      {
        name: 'Naincy Shivhare',
        role: 'UI Designer',
        bio: 'Creative designer with a keen eye for user-centric interfaces.',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQFtB5bJlfvWUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716386313202?e=1759363200&v=beta&t=G30M_HZlt6PtjRgl92ibmepAgO_dT3LW35xdV2Ymi5A',
        linkedin: 'https://www.linkedin.com/in/naincy-shivhare-376492272/',
        portfolio: 'https://emmaroberts.design',
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

        <ScrollableSection title="Coordinators">
          {teamMembers.Coordinators.map((member, index) => (
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