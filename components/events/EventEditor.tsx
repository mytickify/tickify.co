
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Upload, Palette, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/app/gql/graphql";

export default function EventEditor({ editorData }: { editorData: Event | null, }) {
  const [eventData, setEventData] = useState(editorData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const collabAvatarInputRef = useRef<HTMLInputElement>(null);
  const [uploadingCollabIndex, setUploadingCollabIndex] = useState<number | null>(null);

  const handleInputChange = (field: keyof Event, value: Event[typeof field]) => {
    setEventData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleTicketChange = (index: number, field: keyof NonNullable<NonNullable<Event['ticketTiers']>[0]>, value: NonNullable<NonNullable<Event['ticketTiers']>[0]>[typeof field]) => {
    const newTickets = [...(eventData?.ticketTiers || [])];
    newTickets[index] = { ...newTickets[index], [field]: value };
    setEventData(prev => prev ? { ...prev, ticketTiers: newTickets } : null);
  };

  const addTicketType = () => {
    setEventData(prev => prev ? {
      ...prev,
      ticketTiers: [
        ...(prev.ticketTiers || []),
        {
          name: "New Ticket",
          description: "",
          price: 0,
          currency: "USD",
          quantity_available: 100,
          quantity_sold: 0,
          available: true,
          id: `temp-${Date.now()}`,
          quantity: 100,
          soldCount: 0
        }
      ]
    } : null);
  };

  const removeTicketType = (index: number) => {
    setEventData(prev => prev ? {
      ...prev,
      ticketTiers: (prev.ticketTiers || []).filter((_, i) => i !== index)
    } : null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/integrations/core/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const { file_url } = await response.json();
      handleInputChange('cover_image', file_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCollabChange = (index: number, field: keyof NonNullable<Event['collaborators']>[0], value: NonNullable<Event['collaborators']>[0][typeof field]) => {
    const newCollabs = [...(eventData?.collaborators || [])];
    newCollabs[index] = { ...newCollabs[index], [field]: value };
    setEventData(prev => prev ? { ...prev, collaborators: newCollabs } : null);
  };

  const addCollaborator = () => {
    setEventData(prev => prev ? {
      ...prev,
      collaborators: [
        ...(prev.collaborators || []),
        {
          name: "",
          role: "Artist",
          avatar: "",
          description: "",
          type: "Collaborator"
        }
      ]
    } : null);
  };

  const removeCollaborator = (index: number) => {
    setEventData(prev => prev ? {
      ...prev,
      collaborators: (prev.collaborators || []).filter((_, i) => i !== index)
    } : null);
  };

  const handleCollabAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCollabIndex(index);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/integrations/core/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const { file_url } = await response.json();
      handleCollabChange(index, 'avatar', file_url);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
    setUploadingCollabIndex(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-6 bg-gradient-to-b from-cyan-600 to-amber-500 rounded-full" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={eventData?.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event name"
              className="text-lg font-semibold"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={eventData?.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your event..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                value={eventData?.startDate ? new Date(eventData.startDate).toISOString().slice(0, 16) : ''}
                onChange={(e) => handleInputChange('startDate', new Date(e.target.value).toISOString())}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={eventData?.category.type[0] || ''} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="nightlife">Nightlife</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="theatre">Theatre</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={eventData?.location?.venue || ''}
                onChange={(e) => handleInputChange('location', { ...eventData?.location || {}, venue: e.target.value })}
                placeholder="Venue name"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={eventData?.location?.city || ''}
                onChange={(e) => handleInputChange('location', { ...eventData?.location || {}, city: e.target.value })}
                placeholder="City, State"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-600" />
            Visual Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Cover Image</Label>
            <div className="mt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Cover Image
              </Button>
              {eventData?.cover_image && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img 
                    src={eventData.cover_image} 
                    alt="Cover" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary_color">Primary Color</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="primary_color"
                  type="color"
                  value={eventData?.primary_color || ''}
                  onChange={(e) => handleInputChange('primary_color', e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={eventData?.primary_color || ''}
                  onChange={(e) => handleInputChange('primary_color', e.target.value)}
                  placeholder="#06B6D4"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary_color">Secondary Color</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="secondary_color"
                  type="color"
                  value={eventData?.secondary_color || ''}
                  onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={eventData?.secondary_color || ''}
                  onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                  placeholder="#F59E0B"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collaborators Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-600" />
                Collaborators
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Add sponsors, artists, vendors, and partners to display on your event page
              </p>
            </div>
            <Button onClick={addCollaborator} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(eventData?.collaborators || []).length > 0 ? (
            (eventData?.collaborators || []).map((collab, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Collaborator {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCollaborator(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Label>Avatar</Label>
                    <div className="mt-2">
                      <input
                        ref={collabAvatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCollabAvatarUpload(e, index)}
                        className="hidden"
                        id={`collab-avatar-${index}`}
                      />
                      <label htmlFor={`collab-avatar-${index}`} className="cursor-pointer">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-purple-500 transition-colors">
                          {collab.avatar ? (
                            <img src={collab.avatar} alt={collab.name} className="w-full h-full object-cover" />
                          ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </label>
                      {uploadingCollabIndex === index && (
                        <p className="text-xs text-gray-500 mt-1">Uploading...</p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={collab.name}
                          onChange={(e) => handleCollabChange(index, 'name', e.target.value)}
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      <div>
                        <Label>Role</Label>
                        <Select 
                          value={collab?.role || ''} 
                          onValueChange={(value) => handleCollabChange(index, 'role', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Artist">Artist</SelectItem>
                            <SelectItem value="DJ">DJ</SelectItem>
                            <SelectItem value="Sponsor">Sponsor</SelectItem>
                            <SelectItem value="Vendor">Vendor</SelectItem>
                            <SelectItem value="Speaker">Speaker</SelectItem>
                            <SelectItem value="Partner">Partner</SelectItem>
                            <SelectItem value="Performer">Performer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={collab?.description || ''}
                        onChange={(e) => handleCollabChange(index, 'description', e.target.value)}
                        placeholder="Brief description..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No collaborators added yet</p>
              <p className="text-sm">Add sponsors, artists, or vendors to showcase them on your event page</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ticket Types */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ticket Types</CardTitle>
            <Button onClick={addTicketType} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(eventData?.ticketTiers || []).map((ticket, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Ticket {index + 1}</h4>
                {(eventData?.ticketTiers || []).length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTicketType(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Ticket Name</Label>
                  <Input
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                    placeholder="e.g. VIP Pass"
                  />
                </div>

                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, 'price', parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <Label>Available Quantity</Label>
                  <Input
                    type="number"
                    value={ticket.quantity}
                    onChange={(e) => handleTicketChange(index, 'quantity', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div>
                  <Label>Currency</Label>
                  <Select 
                    value={ticket.currency} 
                    onValueChange={(value) => handleTicketChange(index, 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CLP">CLP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={ticket?.description || ''}
                  onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                  placeholder="Ticket benefits and details..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
