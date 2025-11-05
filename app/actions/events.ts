"use server";

import { eventStore } from '@/lib/store';

export async function getAll() {
  return eventStore.getAll();
}