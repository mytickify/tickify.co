
"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye } from "lucide-react";
import EventEditor from "@/components/events/EventEditor";
import EventPreview from "@/components/events/EventPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateEventDocument, GetEventByIdDocument, GetEventByIdQuery, UpdateEventDocument } from "@/graphql/operations";
import { Event, EventCategoryType, EventStatus } from "@/graphql/types";
import { useMutation, useQuery } from "@apollo/client/react";

const DEFAULT_EVENT_DATA = {
  title: "Event Name",
  description: "Description of the event",
  location: {
    address: "19 Rue de la République",
    city: "Paris",
    venue: "Parc des Princes",
  },
  category: {
    type: [EventCategoryType.Music,],
    description: "",
  },
  status: EventStatus.Draft,
  is_featured: false,
  createdAt: new Date().toISOString(),
  endDate: new Date().toISOString(),
  endTime: new Date().toISOString(),
  startTime: new Date().toISOString().split('T')[1].slice(0, 5),
  startDate: new Date().toISOString().split('T')[0],
  id: "",
  organizer: {
    name: "Organizer Name",
    email: "organizer@example.com",
    phone: "1234567890",
  },
}

function CreateEventContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editEventId = (searchParams.get('id') as string) || '';

  const [showPreview, setShowPreview] = useState(true);

  // Get URL params using Next.js approach
  const isEditing = !!editEventId;

  // Load event data if editing
  const { data: existingEvent, loading: isLoading } = useQuery<GetEventByIdQuery>(GetEventByIdDocument, {
    variables: { id: editEventId },
    skip: !isEditing,
  });

  const eventData: Event = isEditing ? existingEvent?.event || DEFAULT_EVENT_DATA : DEFAULT_EVENT_DATA;
  const [previewData, setPreviewData] = useState<Event>(eventData);
  React.useEffect(() => {
    setPreviewData(eventData);
  }, [isEditing, existingEvent?.event]);

  const [createEventMutation, { data: createData, loading: createLoading, error: createError }] = useMutation(CreateEventDocument);

  const [updateEventMutation, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UpdateEventDocument);

  const handleSave = async (status?: EventStatus) => {
    const dataToSave: Event = {
      ...eventData,
      status: status || eventData?.status // Keep current status if not specified
    };

    if (isEditing) {
      updateEventMutation({
        variables: {
          id: editEventId,
          input: dataToSave,
        },
        refetchQueries: "active",
      });
    } else {
      createEventMutation(
        {
          variables: {
            input: {

              title: dataToSave.title || "",
              description: dataToSave.description || "",
              startDate: new Date(dataToSave.startDate || "").toISOString().split('T')[0],
              startTime: dataToSave.startTime || "",
              endDate: new Date(dataToSave.endDate || "").toISOString().split('T')[0],
              endTime: dataToSave.endTime || "",
              location: dataToSave.location || {
                address: "",
                city: "",
                venue: "",
              },
              category: dataToSave.category || {
                type: [],
                description: "",
              },
              status: dataToSave.status || EventStatus.Draft,
              is_featured: dataToSave.is_featured || false,
              organizer: {
                name: dataToSave.organizer?.name || "",
                email: dataToSave.organizer?.email || "",
                phone: dataToSave.organizer?.phone || "",
              },

            }
          }
        }
      );
    }
  };

  const isPending = createLoading || updateLoading;

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/30 to-orange-50/20 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="w-64 h-8 mx-auto mb-4" />
          <Skeleton className="w-48 h-4 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50/30 to-amber-50/20">
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
                    onClick={() => handleSave(eventData?.status)}
                    disabled={isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>

                  {eventData?.status !== EventStatus.Published && (
                    <Button
                      onClick={() => handleSave(EventStatus.Published)}
                      disabled={isPending}
                      className="bg-linear-to-r from-cyan-600 to-amber-500 text-white"
                    >
                      {isPending ? "Publishing..." : "Publish Event"}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleSave(EventStatus.Draft)}
                    disabled={isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>

                  <Button
                    onClick={() => handleSave(EventStatus.Published)}
                    disabled={isPending}
                    className="bg-linear-to-r from-cyan-600 to-amber-500 text-white"
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
            <EventEditor editorData={eventData} onChange={setPreviewData} />
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
            <EventPreview eventData={previewData} />
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-full shadow-2xl bg-linear-to-r from-purple-600 to-orange-500 text-white"
        >
          <Eye className="w-5 h-5 mr-2" />
          {showPreview ? "Show Editor" : "Show Preview"}
        </Button>
      </div>
    </div>
  );
}

export default function CreateEvent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/30 to-orange-50/20 flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="w-64 h-8 mx-auto mb-4" />
            <Skeleton className="w-48 h-4 mx-auto" />
          </div>
        </div>
      }
    >
      <CreateEventContent />
    </Suspense>
  );
}
