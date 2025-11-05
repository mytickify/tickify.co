
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye } from "lucide-react";
import EventEditor from "@/components/events/EventEditor";
import EventPreview from "@/components/events/EventPreview";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateEvent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPreview, setShowPreview] = useState(true);
  const [eventData, setEventData] = useState({
    name: "My Amazing Event",
    description: "Join us for an unforgettable experience",
    date: new Date().toISOString(),
    location: "Your City",
    venue: "Main Venue",
    category: "music",
    status: "draft",
    primary_color: "#06B6D4", // Changed from #8B5CF6
    secondary_color: "#F59E0B", // Changed from #F97316
    cover_image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    ticket_types: [
      {
        name: "General Admission",
        description: "Standard entry ticket",
        price: 50,
        currency: "USD",
        quantity_available: 100,
        quantity_sold: 0
      }
    ],
    tags: [],
    is_featured: false
  });

  // Get URL params using Next.js approach
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const isEditing = !!editEventId;

  useEffect(() => {
    // Parse URL params on client side
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setEditEventId(id);
  }, []);

  // Load event data if editing
  const { data: existingEvent, isLoading } = useQuery({
    queryKey: ['event-edit', editEventId],
    queryFn: async () => {
      const response = await fetch(`/api/events/${editEventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      return response.json();
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingEvent) {
      setEventData(existingEvent);
    }
  }, [existingEvent]);

  const createEventMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['my-events'] });
      router.push("/my-events");
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['my-events'] });
      queryClient.invalidateQueries({ queryKey: ['event', editEventId] });
      router.push("/my-events");
    },
  });

  const handleSave = async (status) => {
    const user = await base44.auth.me();
    const dataToSave = {
      ...eventData,
      status: status || eventData.status, // Keep current status if not specified
      organizer_email: user.email,
      organizer_name: user.full_name
    };

    if (isEditing) {
      updateEventMutation.mutate({ id: editEventId, data: dataToSave });
    } else {
      createEventMutation.mutate(dataToSave);
    }
  };

  const isPending = createEventMutation.isPending || updateEventMutation.isPending;

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-orange-50/20 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="w-64 h-8 mx-auto mb-4" />
          <Skeleton className="w-48 h-4 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/20">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 sm:top-20 z-40">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(isEditing ? "/my-events" : "/")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {isEditing ? "Edit Event" : "Create Event"}
                </h1>
                <p className="text-sm text-gray-600">Design your event with live preview</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="hidden lg:flex"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleSave(eventData.status)}
                    disabled={isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>

                  {eventData.status !== 'published' && (
                    <Button
                      onClick={() => handleSave('published')}
                      disabled={isPending}
                      className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white"
                    >
                      {isPending ? "Publishing..." : "Publish Event"}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleSave('draft')}
                    disabled={isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>

                  <Button
                    onClick={() => handleSave('published')}
                    disabled={isPending}
                    className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white"
                  >
                    {isPending ? "Publishing..." : "Publish Event"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Editor */}
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-180px)]">
          {/* Editor Panel */}
          <div className="bg-white border-r overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <EventEditor eventData={eventData} setEventData={setEventData} />
          </div>

          {/* Preview Panel */}
          <div 
            className={`bg-gray-50 overflow-y-auto ${showPreview ? '' : 'hidden lg:block'}`}
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          >
            <div className="sticky top-0 bg-gray-100 border-b px-6 py-3 z-10">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Live Preview
              </p>
            </div>
            <EventPreview eventData={eventData} />
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-full shadow-2xl bg-gradient-to-r from-purple-600 to-orange-500 text-white"
        >
          <Eye className="w-5 h-5 mr-2" />
          {showPreview ? "Show Editor" : "Show Preview"}
        </Button>
      </div>
    </div>
  );
}
