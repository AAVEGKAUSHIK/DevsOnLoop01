import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, User, ChevronRight, X } from 'lucide-react';

const Button = ({ children, onClick, primary, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-semibold transition-colors ${
      primary ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-700 text-white hover:bg-gray-600'
    } ${className}`}
  >
    {children}
  </button>
);

const Card = ({ event, onViewDetails }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
      <div className="flex items-center text-gray-400 mb-2">
        <Calendar className="mr-2" size={16} />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center text-gray-400 mb-2">
        <Clock className="mr-2" size={16} />
        <span>{event.time}</span>
      </div>
      <div className="flex items-center text-gray-400">
        <MapPin className="mr-2" size={16} />
        <span>{event.location}</span>
      </div>
    </div>
    <div className="px-4 py-2 bg-gray-700">
      <Button onClick={() => onViewDetails(event)} className="w-full justify-center">
        View Details <ChevronRight size={16} className="inline ml-1" />
      </Button>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, event }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <div className="space-y-4">
            <div className="flex items-center text-gray-300">
              <Calendar className="mr-2" size={20} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="mr-2" size={20} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="mr-2" size={20} />
              <span>{event.location}</span>
            </div>
            <p className="text-gray-300">{event.description}</p>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Speakers</h3>
              <div className="flex space-x-4">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center">
                    <img src={speaker.image} alt={speaker.name} className="w-10 h-10 rounded-full mr-2" />
                    <span className="text-gray-300">{speaker.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Agenda</h3>
              <ul className="list-disc list-inside text-gray-300">
                {event.agenda.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Button primary onClick={onClose} className="mt-6 w-full justify-center">
            Close
          </Button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const EventPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = {
    upcoming: [
      {
        id: 1,
        title: 'Web Development Workshop',
        date: 'August 15, 2024',
        time: '2:00 PM - 5:00 PM',
        location: 'Virtual (Zoom)',
        image: '/placeholder.svg?height=200&width=400',
        description: 'Join us for an intensive workshop on modern web development techniques and best practices.',
        speakers: [
          { name: 'Jane Doe', image: '/placeholder.svg?height=100&width=100' },
          { name: 'John Smith', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Introduction to HTML5 and CSS3',
          'JavaScript ES6+ features',
          'React.js fundamentals',
          'Building responsive layouts',
          'Q&A session',
        ],
      },
      {
        id: 2,
        title: 'AI in Web Applications Seminar',
        date: 'September 5, 2024',
        time: '3:00 PM - 6:00 PM',
        location: 'Tech Hub Auditorium',
        image: '/placeholder.svg?height=200&width=400',
        description: 'Explore the integration of AI technologies in modern web applications.',
        speakers: [
          { name: 'Alice Johnson', image: '/placeholder.svg?height=100&width=100' },
          { name: 'Bob Williams', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Introduction to AI in web development',
          'Machine learning models for web apps',
          'Natural Language Processing in user interfaces',
          'Ethical considerations in AI',
          'Panel discussion',
        ],
      },
      {
        id: 3,
        title: 'Hackathon: Build for the Future',
        date: 'October 10-12, 2024',
        time: 'All Day',
        location: 'University Campus',
        image: '/placeholder.svg?height=200&width=400',
        description: 'A 48-hour coding challenge to build innovative solutions for future technologies.',
        speakers: [
          { name: 'Eva Brown', image: '/placeholder.svg?height=100&width=100' },
          { name: 'Michael Lee', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Opening ceremony and team formation',
          'Coding sessions',
          'Mentorship hours',
          'Project presentations',
          'Awards ceremony',
        ],
      },
      {
        id: 4,
        title: 'Mobile App Development Workshop',
        date: 'November 20, 2024',
        time: '1:00 PM - 4:00 PM',
        location: 'Innovation Center',
        image: '/placeholder.svg?height=200&width=400',
        description: 'Learn to build cross-platform mobile apps using React Native.',
        speakers: [
          { name: 'Sarah Davis', image: '/placeholder.svg?height=100&width=100' },
          { name: 'Tom Wilson', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Introduction to React Native',
          'Setting up the development environment',
          'Building UI components',
          'Handling user input and navigation',
          'Publishing your app',
        ],
      },
    ],
    past: [
      {
        id: 5,
        title: 'JavaScript Fundamentals Course',
        date: 'May 20, 2024',
        time: '2:00 PM - 5:00 PM',
        location: 'Online',
        image: '/placeholder.svg?height=200&width=400',
        description: 'A comprehensive course covering the basics of JavaScript programming.',
        speakers: [
          { name: 'Emily Chen', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Variables and data types',
          'Control structures',
          'Functions and scope',
          'DOM manipulation',
          'Asynchronous JavaScript',
        ],
      },
      {
        id: 6,
        title: 'UI/UX Design Principles Workshop',
        date: 'June 15, 2024',
        time: '10:00 AM - 1:00 PM',
        location: 'Design Studio',
        image: '/placeholder.svg?height=200&width=400',
        description: 'Learn the fundamental principles of creating user-friendly interfaces.',
        speakers: [
          { name: 'Olivia Taylor', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Introduction to UI/UX design',
          'User research and personas',
          'Wireframing and prototyping',
          'Visual design principles',
          'Usability testing',
        ],
      },
      {
        id: 7,
        title: 'Data Structures and Algorithms Seminar',
        date: 'July 5, 2024',
        time: '3:00 PM - 6:00 PM',
        location: 'Computer Science Building',
        image: '/placeholder.svg?height=200&width=400',
        description: 'An in-depth look at essential data structures and algorithms for efficient programming.',
        speakers: [
          { name: 'Dr. Alan Turing', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Arrays and linked lists',
          'Trees and graphs',
          'Sorting and searching algorithms',
          'Dynamic programming',
          'Algorithm complexity analysis',
        ],
      },
      {
        id: 8,
        title: 'Open Source Contribution Workshop',
        date: 'July 25, 2024',
        time: '2:00 PM - 5:00 PM',
        location: 'Virtual (Discord)',
        image: '/placeholder.svg?height=200&width=400',
        description: 'Learn how to contribute to open source projects and collaborate with developers worldwide.',
        speakers: [
          { name: 'Linus Torvalds', image: '/placeholder.svg?height=100&width=100' },
        ],
        agenda: [
          'Introduction to open source',
          'Git and GitHub basics',
          'Finding projects to contribute to',
          'Creating pull requests',
          'Open source etiquette and best practices',
        ],
      },
    ],
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">DevsOnLoop Events</h1>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button 
            onClick={() => setActiveTab('upcoming')} 
            primary={activeTab === 'upcoming'}
          >
            Upcoming Events
          </Button>
          <Button 
            onClick={() => setActiveTab('past')} 
            primary={activeTab === 'past'}
          >
            Past Events
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events[activeTab].map((event) => (
            <Card key={event.id} event={event} onViewDetails={handleViewDetails} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button primary onClick={() => alert('Load more events')}>
            Load More Events
          </Button>
        </div>
      </div>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventPage;
