import { eq } from 'drizzle-orm';

import { db } from '.';
import { entities } from './schema';

export async function getEntityById(id: string) {
  const [entity] = await db.select().from(entities).where(eq(entities.id, id)).limit(1);
  return entity;
}
