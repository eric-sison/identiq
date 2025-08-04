import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";

export const clientTypeEnum = pgEnum("client_type_enum", ["confidential", "public"]);
export const applicationTypeEnum = pgEnum("application_type_enum", ["web", "native", "spa"]);
export const tokenEndpointAuthMethodEnum = pgEnum("token_endpoint_auth_method_enum", [
  "client_secret_basic",
  "client_secret_post",
  "client_secret_jwt",
  "none",
]);

export const clients = pgTable("oauth_clients", {
  // Primary identification
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  secret: varchar("client_secret"), // NULL for public clients
  name: varchar("client_name").unique().notNull(),

  // Client metadata
  type: clientTypeEnum("client_type").notNull(),
  applicationType: applicationTypeEnum("application_type").notNull(),

  // Authentication method for  token endpoint
  tokenEndpointAuthMethod: tokenEndpointAuthMethodEnum("token_endpoint_auth_method").default(
    "client_secret_basic",
  ),

  // Contact and metadata
  description: text("client_description"),
  uri: varchar("client_uri", { length: 500 }),
  logoURI: varchar("logo_uri", { length: 500 }),
  tosURI: varchar("tos_uri", { length: 500 }),
  policyURI: varchar("policy_uri", { length: 500 }),

  // Administrative
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => sql`now()`),
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by"),

  // Security settings
  requirePKCE: boolean("require_pkce").default(true), // Force PKCE for this client
  allowPlainPKCE: boolean("allow_plain_pkce").default(false), // Allow plain PKCE (not recommended)

  // Token lifetime (in seconds)
  accessTokenLifetime: integer("access_token_lifetime").default(3600), // 1 hour
  refreshTokenLifetime: integer("refresh_token_lifetime").default(2592000), // 30 days
  idTokenLifetime: integer("id_token_lifetime").default(3600), // 1 hour
  authorizationCodeLifetime: integer("authorization_code_lifetime").default(600), // 10 minutes
});

export const clientRedirectUris = pgTable(
  "client_redirect_uris",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    clientId: varchar("client_id")
      .references(() => clients.id, { onDelete: "cascade" })
      .notNull(),
    redirectURI: varchar("redirect_uri", { length: 2000 }).notNull(),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [unique("unique_client_uri").on(t.clientId, t.redirectURI)],
);

export const oauthScopes = pgTable("oauth_scopes", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("scope_name", { length: 100 }).unique().notNull(),
  description: text(),
  isDefault: boolean("is_default").default(false), // Automatically granted
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const clientScopes = pgTable(
  "client_scopes",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    clientId: varchar("client_id")
      .references(() => clients.id, { onDelete: "cascade" })
      .notNull(),
    scopeId: varchar("scope_id")
      .references(() => oauthScopes.id)
      .notNull(),
    grantedAt: timestamp("granted_at", { withTimezone: true }).defaultNow(),
    grantedBy: varchar("granted_by"),
  },
  (t) => [unique("unique_client_scope").on(t.clientId, t.scopeId)],
);

export const clientResponseTypes = pgTable(
  "client_response_types",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    clientId: varchar("client_id")
      .references(() => clients.id, { onDelete: "cascade" })
      .notNull(),
    responseType: varchar("response_type", { length: 50 }).notNull(), // code, token, id_token, code_token, etc.
  },
  (t) => [unique("unique_client_response_type").on(t.clientId, t.responseType)],
);

export const clientGrantTypes = pgTable(
  "client_grant_types",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    clientId: varchar("client_id")
      .references(() => clients.id, { onDelete: "cascade" })
      .notNull(),
    grantType: varchar("grant_type", { length: 50 }).notNull(), // authorization_code, refresh_token, client_credentials
  },
  (t) => [unique().on(t.clientId, t.grantType)],
);
