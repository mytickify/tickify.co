"use client";

import EventCard from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, LucideIcon } from "lucide-react";
import { Event, EventCategoryType, GetEventsQuery } from "@/graphql/types";

interface EventsListProps {
  events?: GetEventsQuery["events"];
  filteredEvents: Event[];
  isLoading: boolean;
  selectedCategory: EventCategoryType | "all";
  categories: { id: EventCategoryType | "all"; label: string; icon: LucideIcon }[];
}

export default function EventsList({
  filteredEvents,
  isLoading,
  selectedCategory,
  categories
}: EventsListProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.label}` : "All Events"}
          </h2>
          <p className="text-gray-600 mt-2">{filteredEvents.length} events available</p>
        </div>

        <Link href={"/events/create"}>
          <Button className="bg-linear-to-r from-cyan-600 to-amber-500 text-white">
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
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-cyan-100 to-amber-100 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-cyan-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <Link href={"/events/create"}>
            <Button className="bg-linear-to-r from-cyan-600 to-amber-500 text-white">
              Create the first event
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}