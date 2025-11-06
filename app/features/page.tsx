"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { 
  Sparkles, 
  Palette, 
  Layout, 
  Ticket, 
  Type, 
  Camera, 
  Upload, 
  MessageSquare, 
  Users,
  Eye,
  Zap,
  Smartphone,
  CheckCircle,
  Rocket,
  Mail
} from "lucide-react";

const DEFAULT_SHOW_MAILING_LIST = true;

export default function FeaturesPage() {
  const router = useRouter();
  const { data } = useSession();
  const [showMailingList, setShowMailingList] = useState(DEFAULT_SHOW_MAILING_LIST);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (data?.user) {
      router.replace("/home");
    }
  }, [data?.user, router]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribed email:", email);
    setIsSubscribed(true);
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setShowMailingList(false);
    }, 3000);
  };
  const features = [
    {
      title: "Live Split-Screen Editor",
      description: "Real-time preview that updates instantly as you make changes",
      icon: Eye,
      details: [
        "Left panel: Event creation form with 4 tabs",
        "Right panel: Live preview updates instantly",
        "See changes as you type, select colors, and modify layouts"
      ]
    },
    {
      title: "Creative Theme Presets",
      description: "5 professionally designed color schemes for different event types",
      icon: Palette,
      details: [
        "Vibrant: Orange/Yellow for summer festivals",
        "Ocean: Blue tones for aquatic events",
        "Sunset: Red/Orange for evening events",
        "Forest: Green for nature experiences",
        "Neon: Purple/Cyan for nightlife and raves"
      ]
    },
    {
      title: "Four Unique Layouts",
      description: "Choose from different design layouts for your event page",
      icon: Layout,
      details: [
        "Single Column: Classic centered design",
        "Two Column: Split screen with sticky info",
        "Card Layout: Modern card-based design",
        "Minimal: Clean, centered typography"
      ]
    },
    {
      title: "Ticket Management",
      description: "Complete ticket system with multiple tiers and pricing",
      icon: Ticket,
      details: [
        "Multiple ticket tiers (VIP, Early Bird, General)",
        "Custom pricing and quantity management",
        "Currency support (USD, CLP, EUR, GBP)",
        "Real-time availability tracking"
      ]
    },
    {
      title: "Real-Time Color Picker",
      description: "Fine-tune your event's visual identity with precise color control",
      icon: Palette,
      details: [
        "Visual color picker with click-to-choose",
        "Hex code input for exact color matching",
        "5 customizable colors: Primary, Secondary, Accent, Background, Text",
        "Instant preview updates"
      ]
    },
    {
      title: "Gradient System",
      description: "Beautiful gradient backgrounds that enhance your event's visual appeal",
      icon: Palette,
      details: [
        "Toggle gradient effects on/off",
        "4 gradient directions: Horizontal, Diagonal, Vertical, Reverse",
        "Smooth color transitions between Primary and Secondary",
        "Professional visual enhancements"
      ]
    },
    {
      title: "Typography Options",
      description: "Choose fonts that match your event's personality",
      icon: Type,
      details: [
        "Modern: Clean sans-serif (professional)",
        "Elegant: Classic serif (sophisticated)",
        "Bold: Impact style (energetic)",
        "Playful: Comic/casual (fun events)"
      ]
    },
    {
      title: "Smart Features Toggle",
      description: "Enable additional functionality to enhance your event",
      icon: Zap,
      details: [
        "Photo Gallery: Show event photos",
        "Guest Uploads: Let attendees share photos",
        "Live Chat: Enable real-time communication",
        "Collaborators: Display sponsors and partners"
      ]
    },
    {
      title: "Responsive Design",
      description: "Perfect experience on all devices from desktop to mobile",
      icon: Smartphone,
      details: [
        "Mobile-friendly layouts",
        "Backdrop blur effects",
        "Smooth transitions and hover effects",
        "Optimized for all screen sizes"
      ]
    }
  ];

  const useCases = [
    { type: "Music Festivals", color: "from-purple-600 to-pink-600" },
    { type: "Conferences", color: "from-blue-600 to-cyan-600" },
    { type: "Sports Events", color: "from-green-600 to-emerald-600" },
    { type: "Art Exhibitions", color: "from-orange-600 to-amber-600" },
    { type: "Food Festivals", color: "from-red-600 to-orange-600" },
    { type: "Charity Events", color: "from-teal-600 to-cyan-600" },
    { type: "Private Parties", color: "from-fuchsia-600 to-purple-600" },
    { type: "Corporate Events", color: "from-gray-600 to-slate-600" },
    { type: "Outdoor Adventures", color: "from-lime-600 to-green-600" },
    { type: "Virtual Events", color: "from-indigo-600 to-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50/30 to-amber-50/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-600 via-cyan-700 to-amber-600 gradient-animate" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center text-white">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Rocket className="w-4 h-4 text-amber-300" />
              <span className="text-amber-300 font-semibold text-sm">Coming Soon</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
              Powerful Features for
              <br />
              <span className="bg-linear-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto">
              Everything you need to create stunning, professional event pages that convert
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!showMailingList ? (
                <>
                  <Link href="/create">
                    <Button size="lg" className="h-14 px-8 bg-linear-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white font-semibold">
                      Start Creating
                      <Sparkles className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/home">
                    <Button size="lg" variant="outline" className="h-14 px-8 border-white/30 hover:bg-white/10">
                      Browse Events
                      <Eye className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </>
              ) : isSubscribed ? (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-white font-semibold">Thank you for subscribing!</p>
                  <p className="text-cyan-100">We&apos;ll keep you updated on new features.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button 
                      type="submit"
                      size="lg" 
                      className="bg-linear-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white font-semibold"
                    >
                      Subscribe
                      <Mail className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="lg"
                      className="border-white/30 hover:bg-white/10 text-white"
                      onClick={() => setShowMailingList(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
            Everything You Need in One Platform
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our comprehensive feature set makes it easy to create professional event pages
            that stand out and drive ticket sales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-linear-to-r from-cyan-100 to-amber-100">
                      <IconComponent className="w-6 h-6 text-cyan-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-linear-to-br from-cyan-50/50 to-amber-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
              Perfect For Any Event Type
            </h2>
            <p className="text-gray-600 mt-4">
              From intimate gatherings to large-scale festivals, our platform adapts to your needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`bg-linear-to-r ${useCase.color} rounded-2xl p-4 text-center text-white font-semibold text-sm hover:scale-105 transition-transform duration-200`}
              >
                {useCase.type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Create Your Next Event?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of event creators who trust our platform to showcase their events
            with beautiful, professional designs that convert visitors into attendees.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="h-14 px-8 bg-linear-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white font-semibold">
                Start Creating Free
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/home">
              <Button size="lg" variant="outline" className="h-14 px-8">
                See Examples
                <Eye className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Set up in minutes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Professional results
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
