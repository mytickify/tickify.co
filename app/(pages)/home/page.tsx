
"use client";

import { useState } from "react";
// import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
//import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import EventCard from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getAll } from "@/app/actions/events";
import { EventCategory } from "@/types";

async function getEvents() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/events`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return [];
  }
  
  return res.json();
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory|"all">("all");

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getAll,
    initialData: [],
  });

  const categories = [
    { id: "all", label: "All Events", icon: Sparkles },
    { id: "music", label: "Music", icon: TrendingUp },
    { id: "sports", label: "Sports", icon: TrendingUp },
    { id: "arts", label: "Arts", icon: TrendingUp },
    { id: "festival", label: "Festivals", icon: TrendingUp },
    { id: "nightlife", label: "Nightlife", icon: TrendingUp },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "all" || event.category.type.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredEvents = events.filter(e => e.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-700 to-amber-600 gradient-animate" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center text-white">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 animate-fade-in">
              Discover Your Next
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">
                Unforgettable Experience
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-cyan-100 mb-12 max-w-2xl mx-auto">
              Find and book tickets to the hottest events in your city
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="glass-effect rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search events, artists, venues..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-14 text-lg border-0 bg-white/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white font-semibold"
                  >
                    Search
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="glass-effect rounded-2xl p-4 shadow-xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id as EventCategory | "all")}
                className={
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-600 to-amber-500 text-white"
                    : "hover:bg-cyan-100/50"
                }
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                Featured Events
              </h2>
              <p className="text-gray-600 mt-2">Don't miss these amazing experiences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.label}` : "All Events"}
            </h2>
            <p className="text-gray-600 mt-2">{filteredEvents.length} events available</p>
          </div>

          <Link href={"/create"}>
            <Button className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white">
              Create Event
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-100 to-amber-100 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-cyan-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Link href={"/create"}>
              <Button className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white">
                Create the first event
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
