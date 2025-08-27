import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import HeroSection from './components/HeroSection/HeroSection.jsx'
import TeamsPage from './components/Team/Team.jsx'
import EventPage from './components/Events/Events.jsx'
import ContactPage from './components/Contact/Contact.jsx'
import AnnouncementPage from './components/Announcement/Announcement.jsx'
import ResourcesSection from './components/LearningResources/LearningResources.jsx'
import ErrorPage from './components/ErrorPage/ErrorPage.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,  // This sets HeroSection as the default route
          element: <HeroSection />
        },
        {
          path: '/',
          element: <HeroSection />
        },
        {
          path: 'Team',
          element: <TeamsPage />
        },
        {
          path: 'Events',
          element: <EventPage />
        },
        {
          path: 'Contact',
          element: <ContactPage />
        },
        {
          path: 'Announcement',
          element: <AnnouncementPage />
        },
        {
          path: 'LearningResources',
          element: < ResourcesSection/>
        },
        {
          path: '*',
          element: < ErrorPage/>
        }
      ]
    }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)