"use client";

import { Editor as SiteBuilder } from "@/editor";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { generateSlug } from "@/lib/utils";
import { useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const CREATE_PAGE = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      id
      slug
      name
      published
      sections { id builderId type order }
    }
  }
`;

const PUBLISH_PAGE = gql`
  mutation PublishPage($id: ID!) {
    publishPage(id: $id) { id slug published publishedAt }
  }
`;

const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $input: UpdatePageInput!) {
    updatePage(id: $id, input: $input) {
      id
      slug
      name
      published
      sections { id builderId type order }
    }
  }
`;

export default function CreatePage() {
  const { data: session, isPending } = useSession();
  const [savedPageId, setSavedPageId] = useState<string | null>(null);

  const [createPage] = useMutation(CREATE_PAGE);
  const [publishPage] = useMutation(PUBLISH_PAGE);
  const [updatePage] = useMutation(UPDATE_PAGE);

  const buildSectionData = (page: any) => {
    try {
      return page.sections.reduce((acc: Record<string, any>, s: any) => {
        acc[s.id] = s.data;
        return acc;
      }, {});
    } catch {
      return {};
    }
  };

  const handleSave = useCallback(async (page: any) => {
    const slug = generateSlug(page?.name || "page");
    const sections = Array.isArray(page?.sections)
      ? page.sections.map((s: any, idx: number) => ({
          builderId: s.id,
          type: String(s.type || "hero").toUpperCase(),
          order: typeof s.order === "number" ? s.order : idx,
          data: s.data ?? {},
        }))
      : [];

    const input = {
      name: page?.name || slug,
      slug,
      metadata: page?.metadata ?? {},
      sectionData: buildSectionData(page),
      template: undefined,
      sections,
    };

    const result = savedPageId
      ? await updatePage({ variables: { id: savedPageId, input } })
      : await createPage({ variables: { input } });

    const data: any = result?.data ?? {};
    const id = savedPageId ? data?.updatePage?.id ?? null : data?.createPage?.id ?? null;
    if (id) setSavedPageId(id);
    return savedPageId ? data?.updatePage : data?.createPage;
  }, [createPage, updatePage, savedPageId]);

  const handlePublish = useCallback(async (page: any) => {
    let id = savedPageId;
    if (!id) {
      const created = await handleSave(page);
      id = created?.id ?? null;
      if (id) setSavedPageId(id);
    }
    if (!id) return null;
    const res = await publishPage({ variables: { id } });
    const data: any = res?.data ?? {};
    return data?.publishPage;
  }, [savedPageId, handleSave, publishPage]);

  if (isPending) {
    return (
      <div className="container mx-auto max-w-2xl p-6 flex gap-1">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />  
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              You must be signed in to create and publish pages.
            </p>
            <Button asChild>
              <Link href="/login">Go to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <SiteBuilder onSave={handleSave} onPublish={handlePublish} />;
}
