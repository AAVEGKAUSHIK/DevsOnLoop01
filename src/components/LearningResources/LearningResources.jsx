import React, { useState } from 'react'
import { X, ExternalLink, FileText, Video, Image } from 'lucide-react'

// Button component
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Tab component
const Tab = ({ children, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
        isActive
          ? 'bg-purple-700 text-white border-b-2 border-purple-400'
          : 'text-purple-300 hover:text-purple-100'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ResourceCard component
const ResourceCard = ({ resource, onClick }) => {
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="w-6 h-6 text-purple-400" />
      case 'document':
      case 'notes':
        return <FileText className="w-6 h-6 text-purple-400" />
      case 'ppt':
        return <Image className="w-6 h-6 text-purple-400" />
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getIcon(resource.type)}
          <p className="text-sm font-semibold text-purple-300">{resource.type}</p>
        </div>
        <span className="text-xs text-gray-400">{resource.duration}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{resource.title}</h3>
      <p className="text-sm text-gray-300 mb-4">{resource.description}</p>
      <button
        onClick={() => onClick(resource)}
        className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors duration-300"
      >
        View Resource
        <ExternalLink className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
}

// Modal component
const Modal = ({ isOpen, onClose, resource }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white">{resource.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="object-cover rounded-lg"
            />
          </div>
          <p className="text-gray-300 mb-4">{resource.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
            <span>Type: {resource.type}</span>
            <span>Duration: {resource.duration}</span>
          </div>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Open Resource
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}

// Main component
export default function ResourcesSection() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedResource, setSelectedResource] = useState(null)

  const resources = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      type: 'Video',
      duration: '45 min',
      description: 'Learn the basics of HTML, CSS, and JavaScript in this comprehensive introduction to web development.',
      link: '#',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Features',
      type: 'Document',
      duration: '20 min read',
      description: 'Explore the powerful features introduced in ES6 and beyond, including arrow functions, destructuring, and more.',
      link: '#',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    },
    {
      id: 3,
      title: 'React Hooks Deep Dive',
      type: 'Video',
      duration: '1 hour',
      description: 'Master React Hooks with this in-depth tutorial covering useState, useEffect, useContext, and custom hooks.',
      link: '#',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    },
    {
      id: 4,
      title: 'CSS Grid and Flexbox Layout Techniques',
      type: 'PPT',
      duration: '30 slides',
      description: 'Learn how to create complex layouts easily using CSS Grid and Flexbox with practical examples.',
      link: '#',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    },
    {
      id: 5,
      title: 'Node.js and Express.js Fundamentals',
      type: 'Video',
      duration: '1.5 hours',
      description: 'Build robust backend applications with Node.js and Express.js in this comprehensive tutorial.',
      link: '#',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    },
    {
      id: 6,
      title: 'Database Design Best Practices',
      type: 'Document',
      duration: '25 min read',
      description: 'Learn essential database design principles to create efficient and scalable data structures for your applications.',
      link: '#',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    },
  ]

  const filteredResources = activeTab === 'all'
    ? resources
    : resources.filter(resource => resource.type.toLowerCase() === activeTab)

  return (
    <section className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-2">Learning Resources</h2>
        <p className="text-xl text-gray-300 mb-8">Expand your knowledge with our curated collection of web development resources</p>
        <div className="mb-8 border-b border-gray-700">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {['all', 'video', 'document', 'ppt', 'notes'].map((tab) => (
              <Tab
                key={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Tab>
            ))}
          </nav>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={setSelectedResource}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 text-lg">
            Load More Resources
          </Button>
        </div>
      </div>
      <Modal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
    </section>
  )
}