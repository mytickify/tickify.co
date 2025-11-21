import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Ticket, Clock } from "lucide-react";
import { format } from "date-fns";
import { CreateEventInput, Event, GetCategoriesDocument, UpdateEventInput } from "@/graphql/types";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";

export default function EventPreview({ eventData }: { eventData: CreateEventInput | UpdateEventInput }) {
  const { data } = useQuery(GetCategoriesDocument, {variables: {
    filter: {
      IDs: eventData.categoryIds || []
    }
  }});
  const categories = data?.categories || [];
  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${eventData.cover_image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200'})`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${eventData.primary_color}40, ${eventData.secondary_color}80)`
          }}
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          {categories.length > 0 && (
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
              {categories[0].name}
            </Badge>
          )}
          <h1 className="text-4xl font-bold mb-2">{eventData.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(`${eventData.startDate} ${eventData.startTime}`), "EEE, MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {format(new Date(`${eventData.startDate} ${eventData.startTime}`), "h:mm a")}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {eventData.location?.venue || 'Virtual Event'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Description */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-gray-700 leading-relaxed">{eventData.description}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${eventData.primary_color}20` }}
                >
                  <MapPin 
                    className="w-6 h-6"
                    style={{ color: eventData.primary_color as string }}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{eventData.location?.venue || 'Virtual Event'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${eventData.secondary_color}20` }}
                >
                  <Users 
                    className="w-6 h-6"
                    style={{ color: eventData.secondary_color as string }}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="font-semibold">
                    {eventData.ticketTiers?.reduce((sum, t) => sum + (t.quantity || 0), 0)} tickets
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collaborators */}
        {eventData.collaborators && eventData.collaborators.length > 0 && (
          <Card className="mb-6" style={{
            background: `linear-gradient(135deg, ${eventData.primary_color}10, ${eventData.secondary_color}10)`
          }}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">Collaborators</h2>
              <p className="text-gray-600 mb-6">
                Event sponsors, artists, vendors, and partners
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {eventData.collaborators.map((collab, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-3 mx-auto">
                      {collab.avatar ? (
                        <Image
                          src={collab.avatar} 
                          alt={collab.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto border-4 shadow-lg"
                          style={{ borderColor: eventData.primary_color as string }}
                        />
                      ) : (
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${eventData.primary_color}, ${eventData.secondary_color})`
                          }}
                        >
                          {collab.name ? collab.name[0] : '?'}
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-sm">{collab.name || 'Collaborator'}</p>
                    <p className="text-xs text-gray-600 mt-1">{collab.type}</p>
                    {collab.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{collab.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tickets */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Ticket className="w-6 h-6" />
              Tickets
            </h2>
            <div className="space-y-4">
              {eventData.ticketTiers?.map((ticket, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
                  style={{
                    borderColor: `${eventData.primary_color as string}30`,
                    background: `linear-gradient(135deg, ${eventData.primary_color as string}05, ${eventData.secondary_color as string}05)` 
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{ticket.name}</h3>
                      {ticket.description && (
                        <p className="text-sm text-gray-600">{ticket.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p 
                        className="text-2xl font-bold"
                        style={{ color: eventData.primary_color as string }}
                      >
                        ${ticket.price}
                      </p>
                      <p className="text-xs text-gray-500">{ticket.currency}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-600">
                      {ticket.quantity} available
                    </p>
                    <Button
                      size="sm"
                      style={{
                        background: `linear-gradient(135deg, ${eventData.primary_color}, ${eventData.secondary_color})`,
                        color: 'white'
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}