import z from "zod";
import { EnvSchema } from "./constants";
import { AuthorizationRequestSchema } from "./validators";

export type Env = z.infer<typeof EnvSchema>;

/**
 * OIDC specific types
 */
export type AuthorizationRequest = z.infer<typeof AuthorizationRequestSchema>;
