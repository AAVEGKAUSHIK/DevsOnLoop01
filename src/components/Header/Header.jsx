import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/loop.png'
import { MenuIcon, XIcon, FileText } from 'lucide-react';

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button'
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === 'ghost'
          ? 'hover:bg-gray-700 hover:text-purple-400'
          : variant === 'outline'
          ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
          : variant === 'coc'
          ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
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

const NavButton = ({ to, children }) => {
  return (
    <Link to={to} className="group">
      <Button
        variant="ghost"
        className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium relative overflow-hidden"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </Button>
    </Link>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openCodeOfConduct = () => {
    window.open('/code-of-conduct.pdf', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900 bg-opacity-95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex p-2 m-2 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} className='h-20' alt="" />
            </Link>
          </div>
          <nav className="hidden md:flex md:flex-1 md:justify-center items-center space-x-2">
            <NavButton to="/">Home</NavButton>
            <NavButton to="/Team">Team</NavButton>
            <NavButton to="/Events">Events</NavButton>
            <NavButton to="/Contact">Contact</NavButton>
            <NavButton to="/Announcement">Announcement</NavButton>
            <NavButton to="/LearningResources">Learning Resources</NavButton>
            
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="coc"
              size="sm"
              className="flex items-center space-x-2"
              onClick={openCodeOfConduct}
            >
              <FileText className="h-4 w-4" />
              <span>Code of Conduct</span>
            </Button>
          </div>
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-purple-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavButton to="/Home">Home</NavButton>
            <NavButton to="/Team">Team</NavButton>
            <NavButton to="/Events">Events</NavButton>
            <NavButton to="/Contact">Contact</NavButton>
            <NavButton to="/Announcement">Announcement</NavButton>
            <NavButton to="/LearningResources">Learning Resources</NavButton>
            <Button
              variant="coc"
              size="sm"
              className="flex items-center space-x-2 w-full justify-center"
              onClick={openCodeOfConduct}
            >
              <FileText className="h-4 w-4" />
              <span>Code of Conduct</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}