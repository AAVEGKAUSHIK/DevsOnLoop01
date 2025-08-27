import React from 'react';
import Logo from '../../assets/loop.png'

const SocialIcon = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
    <Icon className="h-6 w-6" />
  </a>
);

const FooterLink = ({ href, children }) => (
  <a href={href} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
    {children}
  </a>
);

const FooterSection = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
    <ul className="mt-4 space-y-4">
      {children}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-24" src={Logo} alt="DevsOnLoop" />
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Empowering developers to connect, learn, and grow together.
            </p>
            <div className="flex space-x-6">
              <SocialIcon href="https://www.instagram.com/devsonloop?igsh=MXF6eDRjZTd2bHE4Mg==" icon={(props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              )} />
              <SocialIcon href="https://www.linkedin.com/company/devsonloopclub" icon={(props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              )} />
              <SocialIcon href="https://github.com" icon={(props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd" />
                </svg>
              )} />
              <SocialIcon href="https://discord.com/channels/1287112939106603068/1287139065983930442" icon={(props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path fillRule="evenodd"
                    d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                    clipRule="evenodd" />
                </svg>
              )} />
              <SocialIcon href="https://whatsapp.com" icon={(props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path fillRule="evenodd"
                    d="M20.448 3.538C18.21 1.3 15.21 0 12 0 5.43 0 0 5.43 0 12c0 2.1.54 4.17 1.56 6l-1.5 5.46c-.06.22 0 .46.16.62.12.12.28.18.44.18.06 0 .12 0 .18-.02l5.46-1.5C8.83 23.46 10.9 24 13 24c6.57 0 12-5.43 12-12 0-3.21-1.3-6.21-3.54-8.46zm-8.44 18.96c-1.92 0-3.8-.52-5.44-1.5l-.38-.22-4 1.1 1.1-4-.22-.38c-.98-1.64-1.5-3.52-1.5-5.44 0-5.86 4.76-10.62 10.62-10.62 2.84 0 5.5 1.1 7.5 3.1s3.1 4.66 3.1 7.5c0 5.86-4.76 10.62-10.62 10.62zm5.96-7.84c-.32-.16-1.9-.94-2.2-1.04-.3-.1-.52-.16-.74.16-.22.32-.84 1.04-1.04 1.26-.2.22-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.92-1.8-2.24-.2-.32 0-.5.14-.66.16-.16.32-.4.48-.6.16-.2.22-.34.32-.56.1-.22.06-.42-.02-.6-.08-.18-.74-1.78-1.02-2.44-.26-.64-.54-.56-.74-.56-.2 0-.42-.02-.64-.02s-.58.08-.88.4c-.3.32-1.14 1.12-1.14 2.72 0 1.6 1.16 3.14 1.32 3.36.16.22 2.28 3.48 5.52 4.88.78.34 1.38.54 1.86.68.78.24 1.48.2 2.04.12.62-.08 1.9-.78 2.16-1.52.26-.74.26-1.38.18-1.52-.08-.14-.3-.22-.62-.38z"
                    clipRule="evenodd" />
                </svg>
              )} />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterSection title="Company">
                <li><FooterLink href="/about">About</FooterLink></li>
                <li><FooterLink href="/team">Team</FooterLink></li>
                <li><FooterLink href="/careers">Careers</FooterLink></li>
                <li><FooterLink href="/blog">Blog</FooterLink></li>
              </FooterSection>
              <FooterSection title="Resources">
                <li><FooterLink href="/docs">Documentation</FooterLink></li>
                <li><FooterLink href="/tutorials">Tutorials</FooterLink></li>
                <li><FooterLink href="/faq">FAQ</FooterLink></li>
                <li><FooterLink href="/support">Support</FooterLink></li>
              </FooterSection>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterSection title="Community">
                <li><FooterLink href="/events">Events</FooterLink></li>
                <li><FooterLink href="/meetups">Meetups</FooterLink></li>
                <li><FooterLink href="/forums">Forums</FooterLink></li>
                <li><FooterLink href="/discord">Discord</FooterLink></li>
              </FooterSection>
              <FooterSection title="Legal">
                <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
                <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
                <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
                <li><FooterLink href="/licenses">Licenses</FooterLink></li>
              </FooterSection>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 DevsOnLoop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}