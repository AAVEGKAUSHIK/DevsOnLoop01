import React, { useState, useEffect } from 'react';
import { Bell, Calendar, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

// Button component
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button'
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === 'ghost'
          ? 'hover:bg-gray-700 hover:text-purple-400'
          : variant === 'outline'
          ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      } ${
        size === 'sm'
          ? 'h-9 rounded-md px-3'
          : size === 'lg'
          ? 'h-11 rounded-md px-8'
          : size === 'icon'
          ? 'h-10 w-10'
          : 'h-10 px-4 py-2'
      } ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

// Tabs component
const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-800 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md ${
            activeTab === tab
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Input component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

// AnnouncementCard component
const AnnouncementCard = ({ title, date, description, category, onReadMore }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <span className="text-sm text-gray-400">{date}</span>
    </div>
    <p className="text-gray-300 mb-2">{description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-purple-400">{category}</span>
      <Button className="mt-2" variant="outline" onClick={onReadMore}>Read More</Button>
    </div>
  </div>
);

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Announcement Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

// SubscriptionModal component
const SubscriptionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg p-4 shadow-lg z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">Subscribed!</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-gray-300">Thank you for subscribing to our newsletter.</p>
    </div>
  );
};

// Main AnnouncementPage component
const AnnouncementPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const tabs = ['All', 'Events', 'Updates', 'News'];
  const itemsPerPage = 6;

  const allAnnouncements = [
    {
      title: "Upcoming Hackathon",
      date: "June 15, 2023",
      description: "Join us for our annual 24-hour coding challenge. Great prizes to be won!",
      category: "Events",
      fullContent: "Get ready for an exciting 24-hour coding marathon! Our annual hackathon is back, bigger and better than ever. Teams will compete to create innovative solutions to real-world problems. With amazing prizes up for grabs and the chance to network with industry professionals, this is an event you won't want to miss. Register now to secure your spot!"
    },
    {
      title: "New Course: Advanced React",
      date: "July 1, 2023",
      description: "Enhance your React skills with our new advanced course. Limited spots available!",
      category: "Updates",
      fullContent: "Take your React skills to the next level with our comprehensive Advanced React course. Dive deep into hooks, context, and performance optimization. Learn best practices for state management, code splitting, and server-side rendering. This course is perfect for developers looking to master complex React applications. Don't miss out – enroll today!"
    },
    {
      title: "Community Meetup",
      date: "June 30, 2023",
      description: "Let's gather for a night of networking and tech talks. RSVP now!",
      category: "Events",
      fullContent: "Join us for an evening of inspiration and connection at our monthly community meetup. We'll have lightning talks from local tech leaders, followed by a networking session where you can mingle with fellow developers. Whether you're a seasoned pro or just starting out, there's something for everyone. Light refreshments will be provided. RSVP to secure your spot!"
    },
    {
      title: "Job Fair",
      date: "August 5, 2023",
      description: "Connect with top tech companies hiring in your area. Bring your resume!",
      category: "Events",
      fullContent: "Don't miss this opportunity to jumpstart your career! Our upcoming job fair will feature representatives from leading tech companies in the area. Come prepared with your resume and portfolio to make a great first impression. There will be on-the-spot interviews for qualified candidates. Whether you're looking for an internship or a full-time position, this is your chance to shine!"
    },
    {
      title: "New Partnership Announcement",
      date: "July 10, 2023",
      description: "We're excited to announce our new partnership with TechGiant Inc.",
      category: "News",
      fullContent: "We are thrilled to announce our strategic partnership with TechGiant Inc., a leader in cloud computing solutions. This collaboration will bring exclusive benefits to our members, including discounted access to TechGiant's suite of developer tools and priority registration for their workshops and webinars. Stay tuned for more details on how you can leverage this partnership to accelerate your career!"
    },
    {
      title: "Website Redesign Launch",
      date: "July 20, 2023",
      description: "Check out our newly redesigned website with improved features and user experience.",
      category: "Updates",
      fullContent: "We're proud to unveil our newly redesigned website! After months of hard work and valuable feedback from our community, we've created a more intuitive, faster, and feature-rich platform. Explore our new learning paths, interactive coding challenges, and improved discussion forums. We've also enhanced mobile responsiveness for a seamless experience across all devices. Let us know what you think!"
    },
    {
      title: "Annual Developer Survey Results",
      date: "August 15, 2023",
      description: "Discover the latest trends and insights from our annual developer survey.",
      category: "News",
      fullContent: "The results are in! Our annual developer survey provides a comprehensive look at the current state of the developer ecosystem. From popular programming languages and frameworks to job satisfaction and work-life balance, get insights into what your peers are thinking and doing. This year's survey had over 50,000 respondents from 170 countries. Download the full report to dive into the data!"
    },
    {
      title: "Introduction to Machine Learning Workshop",
      date: "September 1, 2023",
      description: "Join our hands-on workshop to get started with machine learning concepts and tools.",
      category: "Events",
      fullContent: "Curious about machine learning but don't know where to start? Join our beginner-friendly workshop! In this hands-on session, you'll learn the basics of machine learning, including data preprocessing, model selection, and evaluation. We'll use Python and popular libraries like scikit-learn to build your first ML model. No prior experience with machine learning is required, but basic Python knowledge is recommended. Space is limited, so register early!"
    },
  ];

  const [filteredAnnouncements, setFilteredAnnouncements] = useState(allAnnouncements);

  useEffect(() => {
    filterAnnouncements();
  }, [activeTab, searchTerm]);

  const filterAnnouncements = () => {
    let filtered = allAnnouncements;

    if (activeTab !== 'All') {
      filtered = filtered.filter(announcement => announcement.category === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(announcement => 
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAnnouncements(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscriptionModalOpen(true);
    setTimeout(() => setIsSubscriptionModalOpen(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">Announcements</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Search announcements..." 
              className="w-64" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={filterAnnouncements}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAnnouncements.map((announcement, index) => (
            <AnnouncementCard 
              key={index} 
              {...announcement} 
              onReadMore={() => handleReadMore(announcement)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {Math.ceil(filteredAnnouncements.length / itemsPerPage)}
          </span>
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredAnnouncements.length}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-4">Subscribe to our newsletter to receive the latest announcements directly in your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" required />
            <Button type="submit" className="flex items-center justify-center">
              <Bell className="mr-2 h-4 w-4" /> Subscribe
            </Button>
          </form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedAnnouncement && (
          <>
            <h3 className="text-2xl font-semibold text-white mb-2">{selectedAnnouncement.title}</h3>
            <p className="text-gray-400 mb-4">{selectedAnnouncement.date} | {selectedAnnouncement.category}</p>
            <p className="text-gray-300">{selectedAnnouncement.fullContent}</p>
          </>
        )}
      </Modal>

      <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setIsSubscriptionModalOpen(false)} />
    </div>
  );
};

export default AnnouncementPage;