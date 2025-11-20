'use client';

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Mail } from 'lucide-react';
import { SubscriptionSource } from '@/lib/generated/prisma/enums';

const SUBSCRIBE_MUTATION = gql`
  mutation Subscribe($input: SubscribeInput!) {
    subscribe(input: $input) {
      id
      email
      status
      token
    }
  }
`;

type Props = {
  onClose?: () => void;
  source?: SubscriptionSource;
  subscribed?: boolean;
};

export default function SubscriptionForm({ onClose, source = SubscriptionSource.FORM, subscribed = false }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(subscribed || typeof window !== 'undefined' && localStorage.getItem('isSubscribed') === 'true');

  const [subscribe, { loading }] = useMutation(SUBSCRIBE_MUTATION);

  useEffect(() => {
    if (isSubscribed) {
      const t = setTimeout(() => {
        setIsSubscribed(false);
        onClose?.();
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [isSubscribed, onClose]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribe({
        variables: {
          input: {
            email,
            name: name || null,
            preferences: null,
            source,
          },
        },
      });
      setIsSubscribed(true);
      localStorage.setItem('isSubscribed', 'true');
      setEmail('');
      setName('');
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };
  if (isSubscribed) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <p className="text-white font-semibold">Thank you for subscribing!</p>
        <p className="text-cyan-100">We&apos;ll keep you updated on new features.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
        />
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
        />
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="bg-linear-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white font-semibold"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
          <Mail className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}