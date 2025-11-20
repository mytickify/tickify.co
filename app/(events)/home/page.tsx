
"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, TrendingUp, LucideIcon } from "lucide-react";

import EventCard from "@/components/events/EventCard";
import EventsList from "@/components/events/EventsList";

import { EventCategoryType, GetEventsDocument, GetEventsQuery } from "@/graphql/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType|"all">("all");

 const {data: events, loading: isLoading } = useQuery<GetEventsQuery>(GetEventsDocument);

  const categories: { id: EventCategoryType | "all"; label: string; icon: LucideIcon }[] = [
    { id: "all", label: "All Events", icon: Sparkles },
    { id: EventCategoryType.Music, label: "Music", icon: TrendingUp },
    { id: EventCategoryType.Sports, label: "Sports", icon: TrendingUp },
    { id: EventCategoryType.Arts, label: "Arts", icon: TrendingUp },
    { id: EventCategoryType.Festival, label: "Festivals", icon: TrendingUp },
    { id: EventCategoryType.Nightlife, label: "Nightlife", icon: TrendingUp },
  ];

  const filteredEvents = events?.events?.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || (event.categories || []).some(c => (c?.description || '').toUpperCase() === String(selectedCategory).toUpperCase());
    return matchesSearch && matchesCategory;
  }) || [];

  const featuredEvents = events?.events?.filter(e => e.is_featured).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-600 via-cyan-700 to-amber-600 gradient-animate" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center text-white">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 animate-fade-in">
              Discover Your Next
              <br />
              <span className="bg-linear-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">
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
                    className="h-14 px-8 bg-linear-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white font-semibold"
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
                onClick={() => setSelectedCategory(category.id as EventCategoryType  | "all")}
                className={
                  selectedCategory === category.id
                    ? "bg-linear-to-r from-cyan-600 to-amber-500 text-white"
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
              <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                Featured Events
              </h2>
              <p className="text-gray-600 mt-2">Don&apos;t miss these amazing experiences</p>
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
      <EventsList
        events={events?.events || []}
        filteredEvents={filteredEvents}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        categories={categories}
      />
    </div>
  );
}
