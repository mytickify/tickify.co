"use client";
import { useState } from "react";
import { signIn, signUp, useSession } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import type { Route } from "next";

export default function AuthPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextParam = (() => {
    const raw = searchParams.get("next") || "/dashboard";
    // Ensure relative path to avoid open redirects
    return raw.startsWith("/") ? raw : "/dashboard";
  })();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signIn.email({
      email,
      password,
      callbackURL: nextParam,
    });
    setLoading(false);
    if (error) setError(error.message || "Sign in failed");
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signUp.email({
      email,
      name: email.split("@")[0],
      password,
      callbackURL: nextParam,
    });
    setLoading(false);
    if (error) setError(error.message || "Sign up failed");
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          {session ? (
            <div className="space-y-2">
              <p className="text-sm">Signed in as: {session.user?.email}</p>
              <Button onClick={() => router.replace(nextParam as Route)}>Continue</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <Button disabled={loading} onClick={handleSignIn}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <Button disabled={loading} variant="secondary" onClick={handleSignUp}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}