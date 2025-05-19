import type * as schema from './schema';

// Utility type for schema
export type Schema = typeof schema;

// Entity types
export type Entity = typeof schema.entities.$inferSelect;
export type NewEntity = typeof schema.entities.$inferInsert;

// Profile types
export type Profile = typeof schema.profiles.$inferSelect;
export type NewProfile = typeof schema.profiles.$inferInsert;
