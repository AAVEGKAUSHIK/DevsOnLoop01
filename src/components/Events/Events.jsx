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
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        image: 'https://plus.unsplash.com/premium_photo-1705267936187-aceda1a6c1a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        image: 'https://images.unsplash.com/photo-1640163561346-7778a2edf353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        image: 'https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png',
        description: 'A comprehensive course covering the basics of JavaScript programming.',
        speakers: [
          { name: 'Kapil Gautam', image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/kapilsir.jpeg' },
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
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mg6_tCwzLx6EeZGA_HaBZqRNLlKKyxWSFw&s',
        description: 'Learn the fundamental principles of creating user-friendly interfaces.',
        speakers: [
          { name: 'Kapil Gautam', image: 'https://innovanza.iicbietjhs.in/2024Event_template/temp/assets/images/kapilsir.jpeg' },
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
        image: 'https://repository-images.githubusercontent.com/354254077/bce9404a-5a1c-491c-b778-ee99c018b00e',
        description: 'An in-depth look at essential data structures and algorithms for efficient programming.',
        speakers: [
          { name: 'Rohit Shankar Sinha', image: 'https://media.licdn.com/dms/image/v2/D4D03AQEObRT2cBxl7g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1691423610721?e=1759363200&v=beta&t=Vpy8aGd9QhD8AEoMFWRDnbSSThUVy3vOHKXoitM4Rss' },
          { name: 'Ritik Rathor', image: 'https://media.licdn.com/dms/image/v2/D5603AQGEOCNRBwE2Rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729781575587?e=1738800000&v=beta&t=y3yfzPWYcUWgWYEusDl7FRRwQnMtW14AQhXBpCV0Yi0' }
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
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVa4mfyX7Vrwibz0kjUvTutXCQsY8x5PTIU2SuaBTglWhjdYRS5DdX_WcJPQzxAo6Uv8&usqp=CAU',
        description: 'Learn how to contribute to open source projects and collaborate with developers worldwide.',
        speakers: [
          { name: 'Dhruv Agrawal', image: 'https://media.licdn.com/dms/image/v2/D4D03AQEqpK2Od1d-cw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704341287905?e=1759363200&v=beta&t=sUh0kQnlK89T0dsa7qyL_kw_b0uJ1sT0YTGVwnDEAeg' },
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
