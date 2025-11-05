'use client';

import { Event } from '@/types';
import { getThemeStyles } from '@/lib/utils';
import { format } from 'date-fns';

interface EventPreviewProps {
  event: Partial<Event>;
}

export default function EventPreview({ event }: EventPreviewProps) {
  // Force re-render when event changes
  const theme = event.theme || {
    primaryColor: '#FF6B35',
    secondaryColor: '#F7931E',
    accentColor: '#FDC830',
    backgroundColor: '#FFFFFF',
    textColor: '#1A1A1A',
    fontFamily: 'modern' as const,
    layout: 'two-column' as const,
    gradientEnabled: true,
    gradientDirection: 'to-br' as const
  };

  const styles = getThemeStyles(theme);
  
  const gradientClass = theme.gradientEnabled 
    ? `bg-gradient-${theme.gradientDirection}` 
    : '';

  const renderLayout = () => {
    switch (theme.layout) {
      case 'two-column':
        return <TwoColumnLayout event={event} theme={theme} />;
      case 'card':
        return <CardLayout event={event} theme={theme} />;
      case 'minimal':
        return <MinimalLayout event={event} theme={theme} />;
      default:
        return <SingleColumnLayout event={event} theme={theme} />;
    }
  };

  return (
    <div 
      className="min-h-screen w-full overflow-auto"
      style={{ 
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: styles.fontFamily
      }}
    >
      {renderLayout()}
    </div>
  );
}

function SingleColumnLayout({ event, theme }: { event: Partial<Event>, theme: any }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div 
        className={`rounded-3xl p-12 mb-8 ${theme.gradientEnabled ? 'bg-gradient-to-br' : ''}`}
        style={{
          backgroundImage: theme.gradientEnabled 
            ? `linear-gradient(to bottom right, ${theme.primaryColor}, ${theme.secondaryColor})`
            : theme.primaryColor,
          backgroundColor: theme.gradientEnabled ? undefined : theme.primaryColor
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          {event.title || 'Event Title'}
        </h1>
        <p className="text-xl text-white/90">
          {event.description || 'Event description goes here...'}
        </p>
      </div>

      <div className="bg-white/50 backdrop-blur rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primaryColor }}>
          📅 Event Details
        </h3>
        <div className="space-y-4">
          <DetailRow 
            label="Date" 
            value={event.startDate ? format(new Date(event.startDate), 'MMMM dd, yyyy') : 'TBD'} 
          />
          <DetailRow 
            label="Time" 
            value={event.startTime ? `${event.startTime} - ${event.endTime || ''}` : 'TBD'} 
          />
          <DetailRow 
            label="Location" 
            value={event.location?.venue || 'TBD'} 
          />
          {event.location?.address && (
            <DetailRow label="Address" value={event.location.address} />
          )}
        </div>
      </div>

      <TicketSection event={event} theme={theme} />
    </div>
  );
}

function TwoColumnLayout({ event, theme }: { event: Partial<Event>, theme: any }) {
  return (
    <div className="min-h-screen">
      <div 
        className="h-screen sticky top-0 w-1/2 float-left p-12 flex flex-col justify-center"
        style={{
          backgroundImage: theme.gradientEnabled 
            ? `linear-gradient(${theme.gradientDirection.replace('to-', 'to ')}, ${theme.primaryColor}, ${theme.secondaryColor})`
            : undefined,
          backgroundColor: theme.gradientEnabled ? undefined : theme.primaryColor
        }}
      >
        <h1 className="text-6xl font-bold text-white mb-6">
          {event.title || 'Event Title'}
        </h1>
        <p className="text-2xl text-white/90 mb-8">
          {event.description || 'Event description goes here...'}
        </p>
        <div className="space-y-4 text-white text-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <span>{event.startDate ? format(new Date(event.startDate), 'MMMM dd, yyyy') : 'Date TBD'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">⏰</span>
            <span>{event.startTime || 'Time TBD'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">📍</span>
            <span>{event.location?.venue || 'Location TBD'}</span>
          </div>
        </div>
      </div>
      
      <div className="w-1/2 float-right p-12">
        <TicketSection event={event} theme={theme} />
        
        {event.features?.showCollaborators && event.collaborators && event.collaborators.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primaryColor }}>
              Partners & Collaborators
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {event.collaborators.map((collab, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/50 backdrop-blur">
                  <p className="font-semibold">{collab.name}</p>
                  <p className="text-sm opacity-70">{collab.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CardLayout({ event, theme }: { event: Partial<Event>, theme: any }) {
  return (
    <div className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <div 
          className="rounded-3xl overflow-hidden shadow-2xl mb-12"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <div className="p-12 text-white">
            <h1 className="text-6xl font-bold mb-4">
              {event.title || 'Event Title'}
            </h1>
            <p className="text-xl opacity-90">
              {event.description || 'Event description goes here...'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <InfoCard 
            icon="📅" 
            title="Date" 
            value={event.startDate ? format(new Date(event.startDate), 'MMM dd, yyyy') : 'TBD'}
            color={theme.secondaryColor}
          />
          <InfoCard 
            icon="⏰" 
            title="Time" 
            value={event.startTime || 'TBD'}
            color={theme.secondaryColor}
          />
          <InfoCard 
            icon="📍" 
            title="Venue" 
            value={event.location?.venue || 'TBD'}
            color={theme.secondaryColor}
          />
        </div>

        <TicketSection event={event} theme={theme} />
      </div>
    </div>
  );
}

function MinimalLayout({ event, theme }: { event: Partial<Event>, theme: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 
          className="text-7xl font-bold mb-8"
          style={{ color: theme.primaryColor }}
        >
          {event.title || 'Event Title'}
        </h1>
        
        <p className="text-xl mb-12 opacity-80">
          {event.description || 'Event description goes here...'}
        </p>

        <div className="flex justify-center gap-12 mb-16 text-lg">
          <div>
            <div className="font-bold" style={{ color: theme.primaryColor }}>Date</div>
            <div>{event.startDate ? format(new Date(event.startDate), 'MMM dd, yyyy') : 'TBD'}</div>
          </div>
          <div className="border-l-2" style={{ borderColor: theme.accentColor }}></div>
          <div>
            <div className="font-bold" style={{ color: theme.primaryColor }}>Time</div>
            <div>{event.startTime || 'TBD'}</div>
          </div>
          <div className="border-l-2" style={{ borderColor: theme.accentColor }}></div>
          <div>
            <div className="font-bold" style={{ color: theme.primaryColor }}>Venue</div>
            <div>{event.location?.venue || 'TBD'}</div>
          </div>
        </div>

        <TicketSection event={event} theme={theme} />
      </div>
    </div>
  );
}

function TicketSection({ event, theme }: { event: Partial<Event>, theme: any }) {
  if (!event.ticketTiers || event.ticketTiers.length === 0) {
    return (
      <div className="text-center p-8 bg-white/30 backdrop-blur rounded-2xl">
        <p className="text-lg opacity-70">Ticket information coming soon...</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6" style={{ color: theme.primaryColor }}>
        🎟️ Get Your Tickets
      </h3>
      <div className="space-y-4">
        {event.ticketTiers.map((tier) => (
          <div 
            key={tier.id}
            className="p-6 rounded-xl bg-white/70 backdrop-blur flex justify-between items-center hover:scale-[1.02] transition-transform"
          >
            <div>
              <h4 className="text-xl font-bold">{tier.name}</h4>
              {tier.description && (
                <p className="text-sm opacity-70">{tier.description}</p>
              )}
              <p className="text-sm mt-2">
                {tier.soldCount >= tier.quantity 
                  ? '❌ Sold Out' 
                  : `✅ ${tier.quantity - tier.soldCount} available`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold" style={{ color: theme.primaryColor }}>
                {tier.currency} ${tier.price.toLocaleString()}
              </div>
              <button 
                className="mt-3 px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: theme.accentColor }}
                disabled={tier.soldCount >= tier.quantity}
              >
                {tier.soldCount >= tier.quantity ? 'Sold Out' : 'Buy Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="font-semibold">{label}</span>
      <span className="opacity-80">{value}</span>
    </div>
  );
}

function InfoCard({ icon, title, value, color }: { icon: string, title: string, value: string, color: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="font-bold mb-2" style={{ color }}>{title}</div>
      <div className="text-lg">{value}</div>
    </div>
  );
}
