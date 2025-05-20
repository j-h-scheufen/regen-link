import { relations } from 'drizzle-orm';
import {
  json,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { entityTypes, linkTypes } from '@/config/constants';
import type { SocialLink } from '@/types/public';

export const entityTypeEnum = pgEnum('entity_type', entityTypes);
export const linkTypeEnum = pgEnum('link_type', linkTypes);

export const entities = pgTable('entities', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: varchar('name').notNull(),
  type: entityTypeEnum('type').notNull(),
  description: text('description'),
  location: json('location'),
  logo: varchar('logo'),
  links: json('links').$type<SocialLink[]>().notNull().default([]),
  email: varchar('email'),
  phone: varchar('phone'),
  avatar: varchar('avatar'),
  banner: varchar('banner'),
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  walletAddress: varchar('wallet_address').unique().notNull(),
  entityId: uuid('entity_id').references(() => entities.id, { onDelete: 'set null' }),
});

// Table to track which user created which entity
export const entityCreators = pgTable(
  'entity_creators',
  {
    entityId: uuid('entity_id')
      .references(() => entities.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.entityId, table.userId] }),
    };
  }
);

// Define relations
export const userRelations = relations(users, ({ one, many }) => ({
  entity: one(entities, {
    fields: [users.entityId],
    references: [entities.id],
  }),
  createdEntities: many(entityCreators),
}));

export const entityRelations = relations(entities, ({ many }) => ({
  users: many(users),
  creators: many(entityCreators),
}));

export const entityCreatorRelations = relations(entityCreators, ({ one }) => ({
  entity: one(entities, {
    fields: [entityCreators.entityId],
    references: [entities.id],
  }),
  user: one(users, {
    fields: [entityCreators.userId],
    references: [users.id],
  }),
}));

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectEntity = typeof entities.$inferSelect;
export type InsertEntity = typeof entities.$inferInsert;

export type SelectEntityCreator = typeof entityCreators.$inferSelect;
export type InsertEntityCreator = typeof entityCreators.$inferInsert;
