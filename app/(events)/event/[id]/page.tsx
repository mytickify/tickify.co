
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Ticket, Clock, Share2, Heart, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { GetEventByIdDocument, GetEventByIdQuery } from "@/graphql/types";

export default function EventDetails() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;

  const { data, loading } = useQuery<GetEventByIdQuery>(GetEventByIdDocument, {
    variables: { id: eventId },
    skip: !eventId,
  });

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const event = data?.event;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <Link href="/">
            <Button>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const primary = event.theme?.primaryColor || "#0ea5e9";
  const secondary = event.theme?.secondaryColor || "#f59e0b";
  const banner = event.images?.banner || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600";

  const totalCapacity = (event.ticketTiers || []).reduce((sum, t) => sum + (t.quantity || 0), 0);

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner})`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${primary}40, ${secondary}90)`
          }}
        />
        
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 text-white hover:bg-white/20 z-10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-white">
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30 text-sm">
              {event.category.type[0] || "Event"}
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.startTime}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location.venue}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="glass-effect">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${primary}20` }}
                    >
                      <MapPin 
                        className="w-8 h-8"
                        style={{ color: primary }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-semibold text-lg">{event.location.venue}</p>
                      <p className="text-sm text-gray-600">{event.location.address}, {event.location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${secondary}20` }}
                    >
                      <Users 
                        className="w-8 h-8"
                        style={{ color: secondary }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p className="font-semibold text-lg">
                        {totalCapacity} attendees
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collaborators */}
            {event.collaborators && event.collaborators.length > 0 && (
              <Card className="glass-effect" style={{
                background: `linear-gradient(135deg, ${primary}08, ${secondary}08)`
              }}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-2">Collaborators</h2>
                  <p className="text-gray-600 mb-6">
                    Featuring these amazing sponsors, artists, and partners
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {event.collaborators.map((collab, index) => (
                      <div key={index} className="text-center group">
                        <div className="mb-4 mx-auto transform transition-transform duration-300 group-hover:scale-110">
                          {collab.avatar ? (
                            <img 
                              src={collab.avatar} 
                              alt={collab.name}
                              className="w-24 h-24 rounded-full object-cover mx-auto border-4 shadow-xl"
                              style={{ borderColor: primary }}
                            />
                          ) : (
                            <div 
                              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-xl"
                              style={{ 
                                background: `linear-gradient(135deg, ${primary}, ${secondary})`
                              }}
                            >
                              {collab.name ? collab.name[0] : '?'}
                            </div>
                          )}
                        </div>
                        <p className="font-bold text-base">{collab.name || 'Collaborator'}</p>
                        <p className="text-sm" style={{ color: primary }}>{collab.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizer */}
            {event.organizer && (
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Organized By</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-cyan-600 to-amber-500 flex items-center justify-center text-white text-2xl font-bold">
                      {event.organizer.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{event.organizer.name}</p>
                      <p className="text-gray-600">{event.organizer.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Tickets */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Ticket className="w-6 h-6" />
                    Tickets
                  </h2>
                  
                  <div className="space-y-4">
                    {(event.ticketTiers || []).map((ticket, index) => {
                      const available = (ticket.quantity || 0) - (ticket.soldCount || 0);
                      return (
                        <div 
                          key={index}
                          className="p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
                          style={{
                            borderColor: `${primary}30`,
                            background: `linear-gradient(135deg, ${primary}05, ${secondary}05)`
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{ticket.name}</h3>
                              {ticket.description && (
                                <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <p 
                                className="text-2xl font-bold"
                                style={{ color: primary }}
                              >
                                ${ticket.price}
                              </p>
                              <p className="text-xs text-gray-500">{ticket.currency}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              {available > 0 ? `${available} available` : 'Sold out'}
                            </p>
                            <Button
                              size="sm"
                              disabled={available === 0}
                              style={{
                                background: available > 0 
                                  ? `linear-gradient(135deg, ${primary}, ${secondary})`
                                  : '#ccc',
                                color: 'white'
                              }}
                            >
                              {available > 0 ? 'Select' : 'Sold Out'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
