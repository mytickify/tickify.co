"use client";

import { SiteBuilder } from "@/site-builder";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { generateSlug } from "@/lib/utils";
import { useState, useCallback } from "react";

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

    const id = savedPageId ? result?.data?.updatePage?.id ?? null : result?.data?.createPage?.id ?? null;
    if (id) setSavedPageId(id);
    return savedPageId ? result?.data?.updatePage : result?.data?.createPage;
  }, [createPage, updatePage, savedPageId]);

  const handlePublish = useCallback(async (page: any) => {
    let id = savedPageId;
    if (!id) {
      const created = await handleSave(page);
      id = created?.id ?? null;
      if (id) setSavedPageId(id);
    }
    if (!id) return null;
    const { data } = await publishPage({ variables: { id } });
    return data?.publishPage;
  }, [savedPageId, handleSave, publishPage]);

  return (
    <SiteBuilder onSave={handleSave} onPublish={handlePublish} />
  );
}
