import z from "zod";
import { EnvSchema } from "./constants";
import {
  AuthorizationRequestSchema,
  ClientGrantTypeSchema,
  ClientMetadataSchema,
  ClientRedirectURISchema,
  ClientResponseTypeSchema,
  ClientScopeSchema,
  OAuthClientSchema,
  OAuthScopeSchema,
} from "./validators";

export type Env = z.infer<typeof EnvSchema>;

/**
 * OIDC specific types
 */
export type AuthorizationRequest = z.infer<typeof AuthorizationRequestSchema>;

export type OAuthClient = z.infer<typeof OAuthClientSchema>;
export type ClientRedirectURI = z.infer<typeof ClientRedirectURISchema>;
export type OAuthScope = z.infer<typeof OAuthScopeSchema>;
export type ClientScope = z.infer<typeof ClientScopeSchema>;
export type ClientResponseType = z.infer<typeof ClientResponseTypeSchema>;
export type ClientGrantType = z.infer<typeof ClientGrantTypeSchema>;
export type ClientMetadata = z.infer<typeof ClientMetadataSchema>;
export type ClientData = {
  client: OAuthClient;
  redirectURIs: ClientRedirectURI[];
  scopes: ClientScope[];
  responseTypes: ClientResponseType[];
  grantTypes: ClientGrantType[];
};
