import Link from "next/link";
import { Ticket } from "lucide-react";
import { QueryProvider } from "@/providers/query";
import { ApolloProviderWrapper } from "@/providers/apollo";
import Header from "@/components/Header";

const SITE_NAME = "Tickify";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryProvider>
      <ApolloProviderWrapper>
        <div className="min-h-screen bg-linear-to-br from-cyan-50 to-amber-50">
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
          <Header siteName={SITE_NAME} />

          {/* Main Content */}
          <main className="pt-16 sm:pt-20">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-linear-to-r from-cyan-900 to-amber-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold">{SITE_NAME}</span>
                  </div>
                  <p className="text-cyan-200 max-w-md">
                    Create, discover, and attend amazing events. Your ticket to unforgettable experiences.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2 text-cyan-200">
                    <li><Link href="/home" className="hover:text-white transition-colors">Discover Events</Link></li>
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
                <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </ApolloProviderWrapper>
    </QueryProvider>
  );
}