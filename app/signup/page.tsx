"use client";

import { Suspense, useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { useSession, signUp } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import type { Route } from "next";
import { SignupForm } from "@/components/signup-form";

function SignupFormContainer() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextParam = (() => {
    const raw = searchParams.get("next") || "/dashboard";
    return raw.startsWith("/") ? raw : "/dashboard";
  })();

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setLoading(false);
      setError("Password must be at least 8 characters long");
      return;
    }
    const { error } = await signUp.email({
      email,
      name: name || email.split("@")[0],
      password,
      callbackURL: nextParam,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Sign up failed");
    } else {
      router.replace(nextParam as Route);
    }
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
        <SignupForm
          className="w-full"
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSignUp={handleSignUp}
          loading={loading}
          error={error}
          isLoggedIn={session?.user !== undefined}
          user={session?.user}
        />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-md p-6">Loading...</div>}>
      <SignupFormContainer />
    </Suspense>
  );
}
