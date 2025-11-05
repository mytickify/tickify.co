"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Plus, Home, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QueryProvider } from "@/providers/query";
import { ApolloProviderWrapper } from "@/providers/apollo";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Discover", href: "/", icon: Home },
    { name: "Create Event", href: "/create", icon: Plus },
    { name: "Events", href: "/events", icon: Calendar },
  ];

  return (
    <QueryProvider>
      <ApolloProviderWrapper>
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-amber-50">
        <style>{`
          :root {
            --primary: 188 94% 43%;
            --primary-foreground: 0 0% 100%;
            --secondary: 38 92% 50%;
            --accent: 188 80% 40%;
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-effect shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                TicketHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={
                        isActive
                          ? "bg-gradient-to-r from-cyan-600 to-amber-500 text-white"
                          : "hover:bg-cyan-100/50"
                      }
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cyan-100/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-effect border-t">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-600 to-amber-500 text-white"
                          : ""
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-900 to-amber-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Ticket className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">TicketHub</span>
              </div>
              <p className="text-cyan-200 max-w-md">
                Create, discover, and attend amazing events. Your ticket to unforgettable experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-cyan-200">
                <li><Link href="/events" className="hover:text-white transition-colors">Discover Events</Link></li>
                <li><Link href="/create" className="hover:text-white transition-colors">Create Event</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-cyan-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-cyan-200">
            <p>&copy; 2025 TicketHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
      </ApolloProviderWrapper>
    </QueryProvider>
  );
}