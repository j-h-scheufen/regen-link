import { relations } from 'drizzle-orm';
import { boolean, json, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export type SocialLink = {
  platform: string;
  url: string;
};

// Entities table (similar to your groups table but simplified)
export const entities = pgTable('entities', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: varchar('name').notNull(),
  description: text('description'),
  logo: varchar('logo'),
  banner: varchar('banner'),
  verified: boolean('verified').notNull().default(false),
  links: json('links').$type<SocialLink[]>().notNull().default([]),
});

// Profiles table (similar to your users table but simplified)
export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: varchar('name'),
  avatar: varchar('avatar'),
  walletAddress: varchar('wallet_address').notNull().unique(),
  entityId: uuid('entity_id').references(() => entities.id, { onDelete: 'set null' }),
  isAdmin: boolean('is_admin').default(false).notNull(),
  links: json('links').$type<SocialLink[]>().notNull().default([]),
});

// Relations
export const profilesRelations = relations(profiles, ({ one }) => ({
  entity: one(entities, {
    fields: [profiles.entityId],
    references: [entities.id],
  }),
}));

export const entitiesRelations = relations(entities, ({ many }) => ({
  profiles: many(profiles),
}));

// Type inference
export type Entity = typeof entities.$inferSelect;
export type NewEntity = typeof entities.$inferInsert;

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
