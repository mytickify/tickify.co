import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-cyan-400">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-7xl font-bold mb-6">
            Create Amazing Events
          </h1>
          <p className="text-2xl mb-12 opacity-90">
            Design beautiful event pages with live customization and sell tickets effortlessly
          </p>
          <Link 
            href="/create"
            className="inline-block bg-white text-orange-600 px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
          >
            Create Your Event 🚀
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
          <FeatureCard
            icon="🎨"
            title="Live Editor"
            description="Customize colors, fonts, layouts and see changes in real-time"
          />
          <FeatureCard
            icon="🎟️"
            title="Ticket Sales"
            description="Create multiple ticket tiers with different pricing and quantities"
          />
          <FeatureCard
            icon="✨"
            title="Unique Designs"
            description="Every event gets its own personalized look with 5 preset themes"
          />
          <FeatureCard
            icon="📱"
            title="Mobile Ready"
            description="Beautiful event pages that work perfectly on all devices"
          />
          <FeatureCard
            icon="⚡"
            title="Instant Publishing"
            description="Go live in minutes with your custom event page"
          />
          <FeatureCard
            icon="🎭"
            title="Event Features"
            description="Add galleries, chat, collaborators and more to engage attendees"
          />
        </div>

        <div className="text-center mt-20">
          <Link 
            href="/events"
            className="text-white text-lg underline hover:opacity-80 transition-opacity"
          >
            Browse All Events →
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white hover:bg-white/20 transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="opacity-90">{description}</p>
    </div>
  );
}
