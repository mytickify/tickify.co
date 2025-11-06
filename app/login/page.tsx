"use client";

import { useSession, signIn } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    //const router = useRouter();
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
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="text-2xl font-bold">Tickify</span>
        </a>
        <LoginForm
          className="w-full"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
          loading={loading}
          error={error}
          isLoggedIn={session?.user !== undefined}
          user={session?.user}
        />
      </div>
    </div>
  )
}
