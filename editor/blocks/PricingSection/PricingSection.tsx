import React from 'react';
import './PricingSection.css';
import { Event } from '@/graphql/types';

export interface PricingSectionComponentProps {
  event?: Pick<Event, 'id' | 'title' | 'description' | 'ticketTiers'>;
  columns?: 2 | 3 | 4;
}

const PricingSection: React.FC<PricingSectionComponentProps> = ({
  event,
  columns = 3,
}) => {

  const { ticketTiers } = event || {};
  if (!ticketTiers || ticketTiers.length === 0 || !event) return <pre>{JSON.stringify(event, null, 2)}</pre>;
  return (
    <section
      className="pricing-section"
    >
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">{event.title}</h2>
          {event.description && <p className="pricing-description">{event.description}</p>}
        </div>

        <div className={`pricing-grid pricing-grid-${columns}`}>
          {event.ticketTiers?.map((ticket) => (
            <div
              key={ticket.name}
              className={`pricing-card ${!ticket.available ? 'sold-out' : ''}`}
            >
              <h3 className="ticket-name">{ticket.name}</h3>
              <div className="ticket-price">
                <span className="price-currency">{ticket.currency}</span>
                <span className="price-amount">{ticket.price}</span>
              </div>
              {ticket.description && (
                <p className="ticket-description">{ticket.description}</p>
              )}
              {/* {ticket.features && ticket.features.length > 0 && (
                <ul className="ticket-features">
                  {ticket.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )} */}
              <button
                className="ticket-button"
                disabled={!ticket.available}
              >
                {ticket.available ? 'Comprar' : 'Agotado'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
