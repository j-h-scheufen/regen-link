import type * as schema from './schema';

// Utility type for schema
export type Schema = typeof schema;

// Entity types
export type Entity = typeof schema.entities.$inferSelect;
export type NewEntity = typeof schema.entities.$inferInsert;

// User types (renamed from Profile)
export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;

// Entity Creator types
export type EntityCreator = typeof schema.entityCreators.$inferSelect;
export type NewEntityCreator = typeof schema.entityCreators.$inferInsert;
