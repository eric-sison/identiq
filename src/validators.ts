import z from "zod";

export const EnvSchema = z.object({
  // Add environment variables here...
  NEXT_PUBLIC_HOST: z.url(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
});

export const AuthorizationRequestSchema = z.object({
  response_type: z.string(),
  client_id: z.string(),
  redirect_uri: z.url(),
  scope: z.string(),
  state: z.string().nullish(),
  nonce: z.string().nullish(),
  code_challenge: z.string().nullish(),
  code_challenge_method: z.string().nullish(),
  prompt: z.string().nullish(),
  max_age: z.string().nullish(),
});

export const OAuthClientSchema = z.object({
  id: z.string(),
  secret: z.string().nullish(),
  name: z.string(),
  type: z.enum(["confidential", "public"]),
  applicationType: z.enum(["web", "native", "spa"]),
  tokenEndpointAuthMethod: z
    .enum(["client_secret_basic", "client_secret_post", "client_secret_jwt", "none"])
    .nullish(),
  description: z.string().nullish(),
  uri: z.url().nullish(),
  logoURI: z.url().nullish(),
  tosURI: z.url().nullish(),
  policyURI: z.url().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  isActive: z.boolean().nullish(),
  createdBy: z.string().nullish(),
  requirePKCE: z.boolean().nullish(),
  allowPlainPKCE: z.boolean().nullish(),
  accessTokenLifetime: z.number().nullish(),
  refreshTokenLifetime: z.number().nullish(),
  idTokenLifetime: z.number().nullish(),
  authorizationCodeLifetime: z.number().nullish(),
});

export const ClientRedirectURISchema = z.object({
  id: z.string(),
  clientId: z.string(),
  redirectURI: z.url(),
  isPrimary: z.boolean().nullish(),
  createdAt: z.date().nullish(),
});

export const OAuthScopeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  isDefault: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.date().nullish(),
});

export const ClientScopeSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  scopeId: z.string(),
  grantedAt: z.date().nullish(),
  grantedBy: z.string().nullish(),
});

export const ClientResponseTypeSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  responseType: z.string(),
});

export const ClientGrantTypeSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  grantType: z.string(),
});

export const ClientMetadataSchema = z.object({
  client: OAuthClientSchema.omit({
    id: true,
  }),
  metadata: z.object({
    redirectURI: z.array(
      ClientRedirectURISchema.omit({
        id: true,
        clientId: true,
        createdAt: true,
      }),
    ),
    scopes: z.array(
      ClientScopeSchema.omit({
        id: true,
        clientId: true,
      }),
    ),
    responseTypes: z.array(
      ClientResponseTypeSchema.omit({
        id: true,
        clientId: true,
      }),
    ),
    grantTypes: z.array(
      ClientGrantTypeSchema.omit({
        id: true,
        clientId: true,
      }),
    ),
  }),
});
