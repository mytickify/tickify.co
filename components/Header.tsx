"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Plus, Home, Calendar, Menu, X, User, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";
import { Route } from "next";

type HeaderProps = {
  siteName: string;
};

const navigation: { name: string; href: Route; icon: LucideIcon }[] = [
  { name: "Discover", href: "/", icon: Home },
  { name: "Create Event", href: "/events/create", icon: Plus },
  { name: "Events", href: "/home", icon: Calendar },
];

export default function Header({ siteName }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data } = useSession();
  const isConnected = !!data?.user;
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-600 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
              {siteName}
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
                        ? "bg-linear-to-r from-cyan-600 to-amber-500 text-white"
                        : "hover:bg-cyan-100/50"
                    }
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
            {/* Session Status Icon + Dropdown */}
            <div className="ml-2 relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="p-2 rounded-lg hover:bg-cyan-100/50 transition-colors flex items-center"
                title={isConnected ? "Account" : "Sign in"}
                aria-label={isConnected ? "Account" : "Sign in"}
                aria-expanded={userMenuOpen}
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
              <span
                className={`absolute -top-0.5 -right-0.5 block w-2.5 h-2.5 rounded-full border border-white ${
                  isConnected ? "bg-green-500" : "bg-gray-400"
                }`}
                aria-label={isConnected ? "Connected" : "Disconnected"}
                title={isConnected ? "Connected" : "Disconnected"}
              />

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg shadow-lg glass-effect p-2">
                  {isConnected ? (
                    <div>
                      <Link
                        href="/auth"
                        className="block px-3 py-2 rounded-md hover:bg-cyan-100/50 text-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Account
                      </Link>
                      <div className="my-2">
                        <Separator />
                      </div>
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md hover:bg-cyan-100/50 text-sm"
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link
                        href="/auth"
                        className="block px-3 py-2 rounded-md hover:bg-cyan-100/50 text-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                        ? "bg-linear-to-r from-cyan-600 to-amber-500 text-white"
                        : ""
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
            {/* Mobile Session Status (clickable) */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                {isConnected ? (
                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-lg bg-white/50 hover:bg-cyan-100/50"
                    title="Sign out"
                    aria-label="Sign out"
                  >
                    <User className="w-5 h-5 text-gray-700" />
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className="p-2 rounded-lg bg-white/50 hover:bg-cyan-100/50"
                    title="Sign in"
                    aria-label="Sign in"
                  >
                    <User className="w-5 h-5 text-gray-700" />
                  </Link>
                )}
                <span className="text-sm text-gray-700">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <span
                className={`block w-2.5 h-2.5 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-gray-400"
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
