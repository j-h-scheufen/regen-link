import { eq } from 'drizzle-orm';
import { isUndefined, omitBy } from 'lodash';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { nextAuthOptions } from '@/config/next-auth';
import { db } from '@/db';
import { entities, users } from '@/db/schema';

/**
 * Returns the User object and associated Entity of the logged-in user
 * @returns ProfileResponse containing user and entity data
 * @throws 401 if user not logged in, 404 if profile not found
 */
export async function GET() {
  const session = await getServerSession(nextAuthOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: {
      entity: true,
    },
  });

  if (!user || !user.entity) return notFound();

  return Response.json({
    user,
    entity: user.entity,
  });
}

/**
 * Updates the current user's entity data
 * @param request Contains entity update data
 * @returns Updated ProfileResponse
 */
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) return notFound();

  const body = await request.json();
  // TODO: Add validation schema
  const cleanedData = omitBy(body, isUndefined);

  try {
    const [updatedEntity] = await db
      .update(entities)
      .set({
        ...cleanedData,
        updatedAt: new Date(),
      })
      .where(eq(entities.id, user.entityId ?? ''))
      .returning();

    return Response.json({
      user,
      entity: updatedEntity,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
