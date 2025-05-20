import { eq } from 'drizzle-orm';

import type { UserSession } from '@/types/public';
import { db } from '.';
import * as schema from './schema';

export async function getEntityById(id: string) {
  const [entity] = await db
    .select()
    .from(schema.entities)
    .where(eq(schema.entities.id, id))
    .limit(1);
  return entity;
}

////////////////////////////////////////////////////////////
// USER
////////////////////////////////////////////////////////////

export async function getUserSessionData(walletAddress: string): Promise<UserSession | undefined> {
  if (!walletAddress) return undefined;
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.walletAddress, walletAddress),
    columns: { id: true, walletAddress: true, entityId: true },
  });
}

export async function insertUser(
  values: Pick<schema.InsertUser, 'walletAddress'>
): Promise<schema.SelectUser> {
  try {
    const [row] = await db.insert(schema.users).values(values).returning();

    if (!row) {
      throw new Error('Failed to insert user - no row returned');
    }

    return row;
  } catch (error) {
    console.error('Failed to insert user:', error);
    throw new Error('Failed to create user', { cause: error });
  }
}

////////////////////////////////////////////////////////////
// ENTITY
////////////////////////////////////////////////////////////

export async function insertEntity(
  values: Omit<schema.InsertEntity, 'id' | 'updatedAt' | 'createdAt'>
): Promise<schema.SelectEntity> {
  try {
    const [row] = await db.insert(schema.entities).values(values).returning();

    if (!row) {
      throw new Error('Failed to insert entity - no row returned');
    }

    return row;
  } catch (error) {
    console.error('Failed to insert entity:', error);
    throw new Error('Failed to create entity', { cause: error });
  }
}
