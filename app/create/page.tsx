'use client';

import { useState } from 'react';
import { Event, EventTheme, TicketTier } from '@/types';
import { generateId, generateSlug, defaultThemes } from '@/lib/utils';
import EventPreview from '@/components/EventPreview';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function CreateEventPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'details' | 'tickets' | 'theme' | 'features'>('details');
  
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: {
      venue: '',
      address: '',
      city: ''
    },
    organizer: {
      name: '',
      email: ''
    },
    theme: defaultThemes.vibrant,
    ticketTiers: [],
    images: {
      gallery: []
    },
    features: {
      showGallery: false,
      allowGuestUploads: false,
      showChat: false,
      showCollaborators: false
    },
    collaborators: [],
    status: 'draft'
  });

  const updateEvent = (updates: Partial<Event>) => {
    setEventData(prev => ({ ...prev, ...updates }));
  };

  const updateTheme = (updates: Partial<EventTheme>) => {
    setEventData(prev => ({
      ...prev,
      theme: { ...prev.theme!, ...updates }
    }));
  };

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: generateId(),
      name: 'General Admission',
      price: 0,
      currency: 'USD',
      quantity: 100,
      soldCount: 0,
      available: true
    };
    setEventData(prev => ({
      ...prev,
      ticketTiers: [...(prev.ticketTiers || []), newTier]
    }));
  };

  const updateTicketTier = (id: string, updates: Partial<TicketTier>) => {
    setEventData(prev => ({
      ...prev,
      ticketTiers: prev.ticketTiers?.map(tier => 
        tier.id === id ? { ...tier, ...updates } : tier
      )
    }));
  };

  const deleteTicketTier = (id: string) => {
    setEventData(prev => ({
      ...prev,
      ticketTiers: prev.ticketTiers?.filter(tier => tier.id !== id)
    }));
  };

  const handleSubmit = async () => {
    const event: Event = {
      ...eventData as Event,
      id: generateId(),
      slug: generateSlug(eventData.title || 'event'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published'
    };

    // Save to API
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/event/${data.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Editor Panel */}
        <div className="w-1/2 overflow-y-auto bg-white border-r">
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">Create Your Event</h1>
              <p className="text-gray-600">Design and customize your event page in real-time</p>
            </div>
            
            <div className="flex border-t">
              <TabButton 
                active={activeTab === 'details'} 
                onClick={() => setActiveTab('details')}
                icon="📝"
              >
                Details
              </TabButton>
              <TabButton 
                active={activeTab === 'tickets'} 
                onClick={() => setActiveTab('tickets')}
                icon="🎟️"
              >
                Tickets
              </TabButton>
              <TabButton 
                active={activeTab === 'theme'} 
                onClick={() => setActiveTab('theme')}
                icon="🎨"
              >
                Theme
              </TabButton>
              <TabButton 
                active={activeTab === 'features'} 
                onClick={() => setActiveTab('features')}
                icon="⚙️"
              >
                Features
              </TabButton>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <DetailsTab eventData={eventData} updateEvent={updateEvent} />
            )}
            {activeTab === 'tickets' && (
              <TicketsTab 
                tickets={eventData.ticketTiers || []}
                onAdd={addTicketTier}
                onUpdate={updateTicketTier}
                onDelete={deleteTicketTier}
              />
            )}
            {activeTab === 'theme' && (
              <ThemeTab theme={eventData.theme!} updateTheme={updateTheme} />
            )}
            {activeTab === 'features' && (
              <FeaturesTab eventData={eventData} updateEvent={updateEvent} />
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t p-6">
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 h-12 text-lg font-bold"
              size="lg"
            >
              Publish Event 🚀
            </Button>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="w-1/2 bg-gray-100">
          <div className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center z-10">
            <span className="font-semibold">Live Preview</span>
            <span className="text-sm opacity-70">Updates in real-time</span>
          </div>
          <div className="h-[calc(100vh-60px)] overflow-auto">
            <EventPreview event={eventData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean, onClick: () => void, icon: string, children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-3 font-semibold transition-colors ${
        active 
          ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  );
}

function DetailsTab({ eventData, updateEvent }: { eventData: Partial<Event>, updateEvent: (updates: Partial<Event>) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          type="text"
          value={eventData.title}
          onChange={(e) => updateEvent({ title: e.target.value })}
          placeholder="Amazing Summer Festival 2025"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={eventData.description}
          onChange={(e) => updateEvent({ description: e.target.value })}
          placeholder="Tell people what makes your event special..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={eventData.startDate}
            onChange={(e) => updateEvent({ startDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time *</Label>
          <Input
            id="startTime"
            type="time"
            value={eventData.startTime}
            onChange={(e) => updateEvent({ startTime: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={eventData.endDate}
            onChange={(e) => updateEvent({ endDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={eventData.endTime}
            onChange={(e) => updateEvent({ endTime: e.target.value })}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="venue">Venue Name *</Label>
        <Input
          id="venue"
          type="text"
          value={eventData.location?.venue}
          onChange={(e) => updateEvent({ 
            location: { ...eventData.location!, venue: e.target.value }
          })}
          placeholder="The Grand Arena"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          type="text"
          value={eventData.location?.address}
          onChange={(e) => updateEvent({ 
            location: { ...eventData.location!, address: e.target.value }
          })}
          placeholder="123 Main Street"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          type="text"
          value={eventData.location?.city}
          onChange={(e) => updateEvent({ 
            location: { ...eventData.location!, city: e.target.value }
          })}
          placeholder="Santiago"
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="organizerName">Organizer Name *</Label>
        <Input
          id="organizerName"
          type="text"
          value={eventData.organizer?.name}
          onChange={(e) => updateEvent({ 
            organizer: { ...eventData.organizer!, name: e.target.value }
          })}
          placeholder="Your Name or Company"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organizerEmail">Organizer Email *</Label>
        <Input
          id="organizerEmail"
          type="email"
          value={eventData.organizer?.email}
          onChange={(e) => updateEvent({ 
            organizer: { ...eventData.organizer!, email: e.target.value }
          })}
          placeholder="contact@example.com"
        />
      </div>
    </div>
  );
}

function TicketsTab({ tickets, onAdd, onUpdate, onDelete }: { tickets: TicketTier[], onAdd: () => void, onUpdate: (id: string, updates: Partial<TicketTier>) => void, onDelete: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Ticket Tiers</h3>
          <p className="text-sm text-gray-600">Create different ticket types and pricing</p>
        </div>
        <Button
          onClick={onAdd}
          className="bg-orange-500 hover:bg-orange-600"
        >
          + Add Tier
        </Button>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <p className="text-gray-500 mb-4">No ticket tiers yet</p>
          <Button
            onClick={onAdd}
            className="bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            Create First Ticket Tier
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((tier: TicketTier) => (
            <div key={tier.id} className="p-4 border rounded-xl bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold">Ticket Tier</h4>
                <button
                  onClick={() => onDelete(tier.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => onUpdate(tier.id, { name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Tier Name (e.g., VIP, Early Bird)"
                />
                
                <textarea
                  value={tier.description || ''}
                  onChange={(e) => onUpdate(tier.id, { description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Description (optional)"
                  rows={2}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Price</label>
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => onUpdate(tier.id, { price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Currency</label>
                    <select
                      value={tier.currency}
                      onChange={(e) => onUpdate(tier.id, { currency: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="USD">USD</option>
                      <option value="CLP">CLP</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Available Quantity</label>
                  <input
                    type="number"
                    value={tier.quantity}
                    onChange={(e) => onUpdate(tier.id, { quantity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeTab({ theme, updateTheme }: { theme: EventTheme, updateTheme: (updates: Partial<EventTheme>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Preset Themes</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(defaultThemes).map(([name, presetTheme]) => (
            <button
              key={name}
              onClick={() => updateTheme(presetTheme)}
              className="p-4 border-2 rounded-xl hover:border-orange-500 transition-colors text-left"
            >
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: (presetTheme as EventTheme).primaryColor }}></div>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: (presetTheme as EventTheme).secondaryColor }}></div>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: (presetTheme as EventTheme).accentColor }}></div>
              </div>
              <span className="font-semibold capitalize">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Custom Colors</h3>
        <div className="space-y-3">
          <ColorPicker 
            label="Primary Color" 
            color={theme.primaryColor}
            onChange={(color) => updateTheme({ primaryColor: color })}
          />
          <ColorPicker 
            label="Secondary Color" 
            color={theme.secondaryColor}
            onChange={(color) => updateTheme({ secondaryColor: color })}
          />
          <ColorPicker 
            label="Accent Color" 
            color={theme.accentColor}
            onChange={(color) => updateTheme({ accentColor: color })}
          />
          <ColorPicker 
            label="Background Color" 
            color={theme.backgroundColor}
            onChange={(color) => updateTheme({ backgroundColor: color })}
          />
          <ColorPicker 
            label="Text Color" 
            color={theme.textColor}
            onChange={(color) => updateTheme({ textColor: color })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Font Style</label>
        <select
          value={theme.fontFamily}
          onChange={(e) => updateTheme({ fontFamily: e.target.value as EventTheme['fontFamily'] })}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
        >
          <option value="modern">Modern (Sans-serif)</option>
          <option value="elegant">Elegant (Serif)</option>
          <option value="bold">Bold (Impact)</option>
          <option value="playful">Playful (Comic)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Layout Style</label>
        <div className="grid grid-cols-2 gap-3">
          {(['single', 'two-column', 'card', 'minimal'] as const).map((layout) => (
            <button
              key={layout}
              onClick={() => updateTheme({ layout })}
              className={`p-3 border-2 rounded-xl transition-colors ${
                theme.layout === layout 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <span className="capitalize">{layout}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={theme.gradientEnabled}
            onChange={(e) => updateTheme({ gradientEnabled: e.target.checked })}
            className="w-5 h-5"
          />
          <span className="font-semibold">Enable Gradient</span>
        </label>
      </div>

      {theme.gradientEnabled && (
        <div>
          <label className="block text-sm font-semibold mb-2">Gradient Direction</label>
          <select
            value={theme.gradientDirection}
            onChange={(e) => updateTheme({ gradientDirection: e.target.value as EventTheme['gradientDirection'] })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          >
            <option value="to-r">Left to Right</option>
            <option value="to-br">Top-Left to Bottom-Right</option>
            <option value="to-b">Top to Bottom</option>
            <option value="to-bl">Top-Right to Bottom-Left</option>
          </select>
        </div>
      )}
    </div>
  );
}

function FeaturesTab({ eventData, updateEvent }: { eventData: Partial<Event>, updateEvent: (updates: Partial<Event>) => void }) {
  const updateFeature = (key: string, value: boolean) => {
    updateEvent({
      features: { 
        showGallery: false,
        allowGuestUploads: false,
        showChat: false,
        showCollaborators: false,
        ...eventData.features, 
        [key]: value 
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Event Features</h3>
        <p className="text-sm text-gray-600 mb-6">Enable additional features for your event page</p>
      </div>

      <FeatureToggle
        label="Photo Gallery"
        description="Display event photos and media"
        enabled={eventData.features?.showGallery || false}
        onChange={(val) => updateFeature('showGallery', val)}
      />

      <FeatureToggle
        label="Guest Uploads"
        description="Allow guests to upload their own photos"
        enabled={eventData.features?.allowGuestUploads || false}
        onChange={(val) => updateFeature('allowGuestUploads', val)}
      />

      <FeatureToggle
        label="Live Chat"
        description="Enable real-time chat with attendees"
        enabled={eventData.features?.showChat || false}
        onChange={(val) => updateFeature('showChat', val)}
      />

      <FeatureToggle
        label="Show Collaborators"
        description="Display sponsors, artists, and vendors"
        enabled={eventData.features?.showCollaborators || false}
        onChange={(val) => updateFeature('showCollaborators', val)}
      />
    </div>
  );
}

function ColorPicker({ label, color, onChange }: { label: string, color: string, onChange: (color: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg cursor-pointer border"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-28 px-3 py-2 border rounded-lg text-sm font-mono"
        />
      </div>
    </div>
  );
}

function FeatureToggle({ label, description, enabled, onChange }: { label: string, description: string, enabled: boolean, onChange: (value: boolean) => void }) {
  return (
    <div className="p-4 border rounded-xl">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 mt-1"
        />
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </label>
    </div>
  );
}
