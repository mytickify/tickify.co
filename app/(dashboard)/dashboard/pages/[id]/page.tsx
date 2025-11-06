"use client";

import { SiteBuilder } from "@/site-builder";
import { useMutation, useQuery } from "@apollo/client/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Route } from "next";

import { GET_PAGE_QUERY, PUBLISH_PAGE, UPDATE_PAGE } from "@/app/actions/graphql-pages";
import { GetPageQuery, PublishPageMutation, UpdatePageMutation } from "@/app/gql/graphql";

export default function EditPage() {
  const params = useParams<{ id: string }>();
  const pageId = useMemo(() => String(params?.id || ""), [params]);

  const { data, loading } = useQuery<GetPageQuery>(GET_PAGE_QUERY, { variables: { id: pageId }, skip: !pageId });
  const [publishPage] = useMutation<PublishPageMutation>(PUBLISH_PAGE);
  const [updatePage] = useMutation<UpdatePageMutation>(UPDATE_PAGE);
  const [savedPageId, setSavedPageId] = useState<string | null>(pageId || null);

  const buildSectionData = (page: any) => {
    try {
      return (page.sections || []).reduce((acc: Record<string, any>, s: any) => {
        acc[s.id] = s.data;
        return acc;
      }, {});
    } catch {
      return {};
    }
  };

  // Preload builder state via localStorage so SiteBuilder picks it up
  useEffect(() => {
    const p = (data as any)?.page;
    if (!p || !p.id) return;
    try {
      const pageConfig = {
        id: p.id,
        name: p.name || p.slug,
        metadata: p.metadata || {},
        sections: (p.sections || []).map((s: any) => ({
          id: s.builderId || s.id,
          type: String(s.type || "HERO").toLowerCase(),
          order: typeof s.order === "number" ? s.order : 0,
          data: s.data || {},
        })),
        createdAt: new Date(p.createdAt).toISOString(),
        updatedAt: new Date(p.updatedAt).toISOString(),
      };
      localStorage.setItem(`site-builder-${p.id}`, JSON.stringify(pageConfig));
    } catch (err) {
      console.error("Failed to preload builder state:", err);
    }
  }, [data]);

  const handleSave = useCallback(async (page: any) => {
    const sections = Array.isArray(page?.sections)
      ? page.sections.map((s: any, idx: number) => ({
          builderId: s.id,
          type: String(s.type || "hero").toUpperCase(),
          order: typeof s.order === "number" ? s.order : idx,
          data: s.data ?? {},
        }))
      : [];

    const input = {
      name: page?.name || data?.page?.name || "Page",
      slug: (page?.name || data?.page?.slug || "page").toString().toLowerCase().replace(/\s+/g, "-"),
      metadata: page?.metadata ?? {},
      sectionData: buildSectionData(page),
      template: undefined,
      sections,
    };

    const id = savedPageId || pageId;
    const result = await updatePage({ variables: { id, input } });
    const updated: any = result?.data?.updatePage ?? null;
    if (updated?.id) setSavedPageId(updated.id);
    return updated;
  }, [updatePage, savedPageId, pageId, data]);

  const handlePublish = useCallback(async (page: any) => {
    let id = savedPageId || pageId;
    if (!id) {
      const updated = await handleSave(page);
      id = updated?.id ?? null;
      if (id) setSavedPageId(id);
    }
    if (!id) return null;
    const res = await publishPage({ variables: { id } });
    return (res as any)?.data?.publishPage ?? null;
  }, [savedPageId, pageId, publishPage, handleSave]);

  if (!pageId) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Invalid page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No page id provided.</p>
            <Button asChild className="mt-4">
              <Link href={("/dashboard/pages" as Route)}>Back to Pages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return <div className="container mx-auto max-w-2xl p-6 text-sm text-[#637381]">Loading page…</div>;
  }

  if (!data?.page) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Page not found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#637381]">We couldn’t find that page. It may have been deleted.</p>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="secondary">
                <Link href={("/dashboard/pages" as Route)}>Back to Pages</Link>
              </Button>
              <Button asChild>
                <Link href={("/page/create" as Route)}>Create New Page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <SiteBuilder initialPageId={pageId} onSave={handleSave} onPublish={handlePublish} />;
}