// Simple Prisma seed script to populate sample events
// Run with: npm run db:seed (requires DATABASE_URL)

const { PrismaClient } = require('../lib/generated/prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample events...');

  // Optional: wipe existing events to avoid duplicates during development
  await prisma.event.deleteMany();

  const nowDate = new Date();
  const today = nowDate.toISOString().split('T')[0];
  const timeHM = nowDate.toISOString().split('T')[1].slice(0, 5);

  const sampleEvents = [
    {
      slug: 'summer-music-fest',
      title: 'Summer Music Fest',
      description: 'A vibrant outdoor festival featuring top artists and DJs.',
      startDate: today,
      startTime: timeHM,
      endDate: today,
      endTime: timeHM,
      is_featured: true,
      status: 'PUBLISHED',
      category: { type: ['MUSIC'], description: 'Live performances and DJ sets' },
      location: { venue: 'City Park', address: '123 Park Ave', city: 'Metropolis' },
      organizer: { name: 'Fest Org', email: 'org@example.com', phone: '1234567890' },
      theme: {
        primaryColor: '#FF6B35',
        secondaryColor: '#F7931E',
        accentColor: '#FDC830',
        backgroundColor: '#FFFFFF',
        textColor: '#1A1A1A',
        fontFamily: 'bold',
        layout: 'two-column',
        gradientEnabled: true,
        gradientDirection: 'to-br',
      },
      images: { banner: 'https://images.unsplash.com/photo-1540039155733-5b7f2fafa355?w=1200&q=80' },
      ticketTiers: [
        { name: 'General Admission', price: 49.99, currency: 'USD', quantity: 500, description: 'Entry only' },
        { name: 'VIP', price: 149.99, currency: 'USD', quantity: 100, description: 'VIP area access' },
      ],
      features: { showGallery: true, allowGuestUploads: false, showChat: false, showCollaborators: true },
      collaborators: [
        { name: 'Coke', type: 'sponsor', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Coca-Cola-Logo-700x394.png' },
      ],
      // Top-level mirrors for convenience
      cover_image: 'https://images.unsplash.com/photo-1540039155733-5b7f2fafa355?w=1200&q=80',
      primary_color: '#FF6B35',
      secondary_color: '#F7931E',
    },
    {
      slug: 'tech-conference-2025',
      title: 'Tech Conference 2025',
      description: 'Talks and workshops on AI, cloud, and web tech.',
      startDate: today,
      startTime: timeHM,
      endDate: today,
      endTime: timeHM,
      is_featured: false,
      status: 'PUBLISHED',
      category: { type: ['CONFERENCE'], description: 'Technology conference' },
      location: { venue: 'Convention Center', address: '500 Tech Blvd', city: 'Silicon City' },
      organizer: { name: 'TechOrg', email: 'contact@techconf.io', phone: '555-0101' },
      theme: {
        primaryColor: '#006BA6',
        secondaryColor: '#0496FF',
        accentColor: '#00D9FF',
        backgroundColor: '#F8FBFF',
        textColor: '#003049',
        fontFamily: 'modern',
        layout: 'single',
        gradientEnabled: true,
        gradientDirection: 'to-r',
      },
      images: { banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80' },
      ticketTiers: [
        { name: 'Standard', price: 199.0, currency: 'USD', quantity: 1000, description: 'Access to all talks' },
        { name: 'Workshop Pass', price: 299.0, currency: 'USD', quantity: 300, description: 'Includes workshops' },
      ],
      features: { showGallery: false, allowGuestUploads: false, showChat: true, showCollaborators: true },
      collaborators: [
        { name: 'AWS', type: 'sponsor', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
      ],
      cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
      primary_color: '#006BA6',
      secondary_color: '#0496FF',
    },
    {
      slug: 'art-expo',
      title: 'Modern Art Expo',
      description: 'Gallery showcases from modern artists around the world.',
      startDate: today,
      startTime: timeHM,
      endDate: today,
      endTime: timeHM,
      is_featured: false,
      status: 'DRAFT',
      category: { type: ['ARTS'], description: 'Art exhibitions' },
      location: { venue: 'Art Hall', address: '50 Gallery St', city: 'Florence' },
      organizer: { name: 'ArtGroup', email: 'hello@artexpo.org', phone: '444-2222' },
      theme: {
        primaryColor: '#E63946',
        secondaryColor: '#F77F00',
        accentColor: '#FCBF49',
        backgroundColor: '#FFFCF9',
        textColor: '#2B2D42',
        fontFamily: 'elegant',
        layout: 'card',
        gradientEnabled: true,
        gradientDirection: 'to-b',
      },
      images: { banner: 'https://images.unsplash.com/photo-1458530970867-aaa3700e9664?w=1200&q=80' },
      ticketTiers: [
        { name: 'Entry', price: 20.0, currency: 'USD', quantity: 300, description: 'General entry' },
      ],
      features: { showGallery: true, allowGuestUploads: true, showChat: false, showCollaborators: false },
      collaborators: [],
      cover_image: 'https://images.unsplash.com/photo-1458530970867-aaa3700e9664?w=1200&q=80',
      primary_color: '#E63946',
      secondary_color: '#F77F00',
    },
  ];

  for (const ev of sampleEvents) {
    const normalizedTiers = Array.isArray(ev.ticketTiers)
      ? ev.ticketTiers.map((t) => ({
          ...t,
          soldCount: 0,
          available: (typeof t.quantity === 'number' ? t.quantity > 0 : true),
        }))
      : undefined;

    await prisma.event.create({
      data: {
        ...ev,
        ticketTiers: normalizedTiers,
      },
    });
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });