
"use client";

import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useNavigation } from "@refinedev/core";
import { useForm } from "react-hook-form";

import { Form, FormItem, FormLabel, FormMessage, FormField, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ChevronLeft, ListIcon } from "lucide-react";

type FormValues = { name: string; email: string; password: string; confirmPassword: string };

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`;

export default function UserCreate() {
  const { list } = useNavigation();
  const form = useForm<FormValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createUser, { loading } ] = useMutation(CREATE_USER_MUTATION);

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      if (values.password !== values.confirmPassword) {
        setSubmitError("Passwords do not match");
        return;
      }
      await createUser({ variables: { input: { name: values.name, email: values.email, password: values.password } } });
      list("users");
    } catch (e: any) {
      const message = String(e?.message || "Failed to create user");
      setSubmitError(message);
    }
  };

  return (
    <div className="mx-2 py-2">
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => list("users")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Create User</h1>
        </div>
        <div className="mt-8">
          <Button variant="outline" size="sm" onClick={() => list("users")}> 
            <ListIcon />
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-2">Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-2">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-2">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: "Confirm your password",
                validate: (value) => value === form.getValues("password") || "Passwords must match",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-2">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitError && (
              <p className="text-destructive text-sm">{submitError}</p>
            )}
            <div className="mt-4">
              <Button className="w-40" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}