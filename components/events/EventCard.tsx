import React from "react";
import Link from "next/link";
// import { createPageUrl } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket, Star } from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/graphql/types";

export default function EventCard({ event, featured = false } : { event: Event, featured?: boolean }) {
  const categoryColors = {
    MUSIC: "bg-purple-100 text-purple-700 border-purple-200",
    SPORTS: "bg-blue-100 text-blue-700 border-blue-200",
    ARTS: "bg-pink-100 text-pink-700 border-pink-200",
    FESTIVAL: "bg-orange-100 text-orange-700 border-orange-200",
    CONFERENCE: "bg-green-100 text-green-700 border-green-200",
    NIGHTLIFE: "bg-indigo-100 text-indigo-700 border-indigo-200",
    COMEDY: "bg-yellow-100 text-yellow-700 border-yellow-200",
    THEATRE: "bg-red-100 text-red-700 border-red-200",
    OTHER: "bg-gray-100 text-gray-700 border-gray-200"
  };

  const minPrice = event?.ticketTiers?.reduce((min, ticket) => 
    ticket.price < min ? ticket.price : min, 
    event?.ticketTiers[0]?.price || 0
  );

  return (
    <Link href={`/event/${event.id}`}>
      <div 
        className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
          featured ? 'ring-2 ring-orange-400' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, ${event.primary_color}15 0%, ${event.secondary_color}15 100%)`
        }}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${event.cover_image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'})`
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge className={`${categoryColors[event.categories?.[0]?.type || 'OTHER']} border`}>
              {event.categories?.[0]?.type || 'Event'}
            </Badge>
            {featured && (
              <Badge className="bg-orange-500 text-white border-0">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
          </div>

          {/* Price Tag */}
          {minPrice !== undefined && (
            <div className="absolute bottom-4 right-4">
              <div 
                className="px-4 py-2 rounded-full font-bold text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${event.primary_color} 0%, ${event.secondary_color} 100%)`
                }}
              >
                From ${minPrice}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-1">
            {event.title || 'Event'}
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>{format(new Date(event.startDate), "EEE, MMM d, yyyy 'at' h:mm a")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="line-clamp-1">{event.location.venue || 'Location not specified'}</span>
            </div>

            {event.ticketTiers && event.ticketTiers.length > 0 && (
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-teal-500" />
                <span>{event.ticketTiers.length} ticket type{event.ticketTiers.length > 1 ? 's' : ''} available</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className="mt-4 text-gray-600 text-sm line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}