export function withDefaultsForTicketTiers(tiers?: any[] | null) {
    if (!tiers) return undefined;
    return tiers.map((t) => ({
        ...t,
        soldCount: t.soldCount ?? 0,
        available: t.available ?? (typeof t.quantity === 'number' ? t.quantity > 0 : true),
        id: t.id ?? undefined,
    }));
}
