# 🚀 Getting Started

## Quick Start

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Create Your First Event

1. **Go to Home Page** - You'll see a vibrant landing page
2. **Click "Create Your Event 🚀"** - Opens the live editor
3. **Fill Event Details**:
   - Event title
   - Description
   - Date and time
   - Venue and location
   - Organizer info

4. **Add Ticket Tiers** (optional):
   - Click "Add Tier"
   - Set name, price, and quantity
   - Add multiple tiers for VIP, Early Bird, etc.

5. **Customize Theme**:
   - Choose from 5 preset themes (Vibrant, Ocean, Sunset, Forest, Neon)
   - Or customize colors manually
   - Change font style (Modern, Elegant, Bold, Playful)
   - Select layout (Single Column, Two Column, Card, Minimal)
   - Enable gradient backgrounds

6. **Enable Features** (optional):
   - Photo Gallery
   - Guest Uploads
   - Live Chat
   - Show Collaborators

7. **Watch Live Preview** - Right panel updates in real-time as you make changes

8. **Publish Event** - Click "Publish Event 🚀" button

## View Your Event

After publishing, you'll be redirected to your event page with your custom theme!

- **Public URL**: `http://localhost:3000/event/[your-event-slug]`
- **Browse All**: `http://localhost:3000/events`

## Key Features

### 🎨 5 Creative Theme Presets

Different from aguasabiertaschile.cl's colors:

- **Vibrant** (Orange/Yellow) - Energetic, fun events
- **Ocean** (Blue tones) - Aquatic, calm events  
- **Sunset** (Red/Orange) - Evening, romantic events
- **Forest** (Green) - Nature, outdoor events
- **Neon** (Purple/Cyan) - Night parties, concerts

### 📐 4 Layout Styles

- **Single Column** - Classic, focused layout
- **Two Column** - Split screen with sticky header
- **Card** - Modern card-based design
- **Minimal** - Clean, centered approach

### 🎟️ Ticket Management

- Multiple ticket tiers
- Custom pricing per tier
- Quantity limits
- Currency options (USD, CLP, EUR, GBP)
- Sold out tracking

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## Next Steps

1. **Add Database**: Replace `lib/store.ts` with PostgreSQL/MongoDB
2. **Payment Integration**: Add Stripe or PayPal for ticket sales
3. **Authentication**: Add user login for event management
4. **Image Uploads**: Enable banner and gallery uploads
5. **Email Notifications**: Send tickets via email

## Project Structure

```
ticket-app/
├── app/
│   ├── page.tsx              # Landing page
│   ├── create/page.tsx       # Event creator with live editor
│   ├── event/[slug]/page.tsx # Public event page
│   ├── events/page.tsx       # Event listing
│   └── api/events/           # API routes
├── components/
│   └── EventPreview.tsx      # Live preview with 4 layouts
├── lib/
│   ├── store.ts              # Temporary storage
│   └── utils.ts              # Theme presets & helpers
└── types/
    └── index.ts              # TypeScript definitions
```

## Tips

- Changes update in **real-time** in the preview panel
- Each event gets a **unique slug** based on its title
- **Themes are per-event** - each event can have different colors
- Use **preset themes** as starting points, then customize
- **Gradient backgrounds** work great with Vibrant, Ocean, and Neon themes

Enjoy creating beautiful events! 🎉
