import type { DataProvider, CrudFilters, CrudSorting } from "@refinedev/core";
import client from "@/lib/apollo-client";
import { DocumentNode } from "graphql";

type GetListMeta = { gqlQuery: DocumentNode };
type MutationMeta = { gqlMutation: DocumentNode };

function mapUsersVariables({ pagination, sorters, filters }: { pagination?: { current?: number; pageSize?: number }, sorters?: CrudSorting, filters?: CrudFilters }) {
  const current = Math.max(pagination?.current ?? 1, 1);
  const pageSize = Math.min(Math.max(pagination?.pageSize ?? 20, 1), 100);
  const offset = (current - 1) * pageSize;
  const limit = pageSize;

  const fieldMap: Record<string, string> = { createdAt: "CREATED_AT", name: "NAME", email: "EMAIL" };
  const orderBy = (Array.isArray(sorters) ? sorters : []).map((s) => ({
    field: fieldMap[String((s as any).field)] ?? "CREATED_AT",
    direction: String((s as any).order ?? "desc").toUpperCase() === "ASC" ? "ASC" : "DESC",
  }));

  const f: any = {};
  (Array.isArray(filters) ? filters : []).forEach((fl: any) => {
    if (!fl) return;
    const field = String(fl.field);
    if (field === "searchTerm") {
      f.searchTerm = fl.value ?? undefined;
    } else if (["name", "email"].includes(field)) {
      f[field] = fl.value ?? undefined;
    }
  });

  return { filter: Object.keys(f).length ? f : undefined, pagination: { limit, offset }, orderBy };
}

export const apolloDataProvider: DataProvider = {
  getApiUrl: () => "/graphql",

  async getList({ resource, pagination, sorters, filters, meta }) {
    const m = (meta ?? {}) as GetListMeta;
    if (!m.gqlQuery) throw new Error("getList requires meta.gqlQuery (GraphQL DocumentNode)");

    let variables: any = {};
    if (resource === "users") {
      variables = mapUsersVariables({ pagination, sorters, filters });
    }

    const res = await client.query({ query: m.gqlQuery, variables, fetchPolicy: "cache-first" });
    const data = (res.data as any)?.[resource] ?? [];
    const totalField = `${resource}Count`;
    const total = Number((res.data as any)?.[totalField] ?? Array.isArray(data) ? data.length : 0);
    return { data, total } as any;
  },

  async getOne({ resource, id, meta }) {
    const m = (meta ?? {}) as GetListMeta;
    if (!m.gqlQuery) throw new Error("getOne requires meta.gqlQuery");
    const res = await client.query({ query: m.gqlQuery, variables: { id } });
    const data = (res.data as any)?.[resource] ?? null;
    return { data } as any;
  },

  async create({ resource, variables, meta }) {
    const m = (meta ?? {}) as MutationMeta;
    if (!m.gqlMutation) throw new Error("create requires meta.gqlMutation");
    const res = await client.mutate({ mutation: m.gqlMutation, variables: variables as any });
    const key = `create${resource.slice(0, 1).toUpperCase()}${resource.slice(1, resource.length)}`;
    const data = (res.data as any)?.[key] ?? null;
    return { data } as any;
  },

  async update({ resource, id, variables, meta }) {
    const m = (meta ?? {}) as MutationMeta;
    if (!m.gqlMutation) throw new Error("update requires meta.gqlMutation");
    const res = await client.mutate({ mutation: m.gqlMutation, variables: { id, input: variables } as any });
    const key = `update${resource.slice(0, 1).toUpperCase()}${resource.slice(1, resource.length)}`;
    const data = (res.data as any)?.[key] ?? null;
    return { data } as any;
  },

  async deleteOne({ resource, id, meta }) {
    const m = (meta ?? {}) as MutationMeta;
    if (!m.gqlMutation) throw new Error("deleteOne requires meta.gqlMutation");
    const res = await client.mutate({ mutation: m.gqlMutation, variables: { id } as any });
    const key = `delete${resource.slice(0, 1).toUpperCase()}${resource.slice(1, resource.length)}`;
    const data = (res.data as any)?.[key] ?? null;
    return { data } as any;
  },

  // Optional methods implemented as pass-throughs
  async getMany({ resource, ids, meta }) {
    const m = (meta ?? {}) as GetListMeta;
    if (!m.gqlQuery) throw new Error("getMany requires meta.gqlQuery");
    const res = await client.query({ query: m.gqlQuery, variables: { ids } });
    const data = (res.data as any)?.[resource] ?? [];
    return { data } as any;
  },

  async custom() {
    throw new Error("custom not implemented");
  },
  async createMany() {
    throw new Error("createMany not implemented");
  },
  async updateMany() {
    throw new Error("updateMany not implemented");
  },
  async deleteMany() {
    throw new Error("deleteMany not implemented");
  },
};

export default apolloDataProvider;