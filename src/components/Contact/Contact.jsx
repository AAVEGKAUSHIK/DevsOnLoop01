import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${
        variant === 'default'
          ? 'bg-purple-600 text-white hover:bg-purple-700'
          : variant === 'outline'
          ? 'border border-purple-500 text-purple-500 hover:bg-purple-100 hover:text-purple-600'
          : 'hover:bg-gray-800 hover:text-purple-400'
      } ${
        size === 'default'
          ? 'h-10 py-2 px-4'
          : size === 'sm'
          ? 'h-9 px-3 rounded-md'
          : 'h-11 px-8 rounded-md'
      } ${className}`}
      ref={ref}
      {...props}
    />
  )
});

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
});

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      console.log('Form submitted:', formData);
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">Get in Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-purple-500">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-400">
              <Mail className="mr-2 h-6 w-6" />
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" variant="default" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
              {submitMessage && (
                <p className={`mt-2 text-sm ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-purple-500">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-400">
              <Phone className="mr-2 h-6 w-6" />
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-purple-400 mr-3" />
                <span>Innovation and Incubation Center, BIET Jhansi (284128), Uttar Pradesh, India </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-purple-400 mr-3" />
                <span>+91-6396864741</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-purple-400 mr-3" />
                <span>contact@devsonloop.com</span>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-400">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/company/devsonloopclub" target='_blank' className="text-gray-300 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}