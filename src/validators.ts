import z from "zod";

export const AuthorizationRequestSchema = z.object({
  response_type: z.string(),
  client_id: z.string(),
  redirect_uri: z.url(),
  scope: z.string(),
  state: z.string().optional(),
  nonce: z.string().optional(),
  code_challenge: z.string().optional(),
  code_challenge_method: z.string().optional(),
  prompt: z.string().optional(),
  max_age: z.string().optional(),
});

export const OAuthClientSchema = z.object({
  id: z.string(),
  secret: z.string().optional(),
  name: z.string(),
  type: z.enum(["confidential", "public"]),
  applicationType: z.enum(["web", "native", "spa"]),
  tokenEndpointAuthMethod: z.enum(["client_secret_basic", "client_secret_post", "client_secret_jwt", "none"]),
  description: z.string().optional(),
  uri: z.url().optional(),
  logoUri: z.url().optional(),
  tosUri: z.url().optional(),
  policyUri: z.url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  createdBy: z.string().optional(),
  requirePKCE: z.boolean().optional(),
  allowPlainPKCE: z.boolean().optional(),
  accessTokenLifetime: z.number().optional(),
  refreshTokenLifetime: z.number().optional(),
  idTokenLifetime: z.number().optional(),
  authorizationCodeLifetime: z.number().optional(),
});

export const ClientRedirectUriSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  redirectUri: z.url().optional(),
  isPrimary: z.boolean().optional(),
  createdAt: z.date().optional(),
});

export const OAuthScopeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isDefault: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.date().optional(),
});

export const ClientScopeSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  scopeId: z.string(),
  grantedAt: z.date().optional(),
  grantedBy: z.string().optional(),
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
