import { eq } from 'drizzle-orm';
import { db } from '.';
import { entities, profiles } from './schema';
import type { NewEntity, NewProfile } from './types';

export async function getEntityById(id: string) {
  const [entity] = await db.select().from(entities).where(eq(entities.id, id)).limit(1);
  return entity;
}

export async function getProfileByWallet(walletAddress: string) {
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.walletAddress, walletAddress))
    .limit(1);
  return profile;
}

export async function createEntity(data: NewEntity) {
  const [entity] = await db.insert(entities).values(data).returning();
  return entity;
}

export async function createProfile(data: NewProfile) {
  const [profile] = await db.insert(profiles).values(data).returning();
  return profile;
}
