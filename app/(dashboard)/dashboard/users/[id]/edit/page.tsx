"use client";

import React, { useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { useNavigation } from "@refinedev/core";
import { useForm } from "react-hook-form";

import { Form, FormItem, FormLabel, FormMessage, FormField, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type FormValues = { name: string; email: string; image?: string | null };

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`;

export default function UserEdit() {
  const { list } = useNavigation();
  const params = useParams<{ id: string }>();
  const id = useMemo(() => String(params?.id || ""), [params]);
  const { data, loading } = useQuery(GET_USER_QUERY, { variables: { id }, skip: !id });
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER_MUTATION);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: { name: "", email: "", image: "" },
    values: data?.user
      ? { name: data.user.name || "", email: data.user.email, image: data.user.image || "" }
      : undefined,
    mode: "onSubmit",
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      const input = {
        name: values.name?.trim(),
        email: values.email?.trim().toLowerCase(),
        image: values.image || null,
      };
      await updateUser({ variables: { id, input } });
      list("users");
    } catch (e: any) {
      const message = String(e?.message || "Failed to update user");
      setSubmitError(message);
    }
  };

  if (!id) return <div className="p-4 text-sm text-[#637381]">Invalid user id</div>;
  if (loading) return <div className="p-4 text-sm text-[#637381]">Loading…</div>;
  if (!data?.user) return <div className="p-4 text-sm text-[#637381]">User not found or unauthorized</div>;

  return (
    <div className="mx-2 py-2">
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => list("users")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Edit User</h1>
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-2">Image URL</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="https://example.com/avatar.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitError && <p className="text-destructive text-sm">{submitError}</p>}
            <div className="mt-4">
              <Button className="w-40" type="submit" disabled={updating}>
                {updating ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}