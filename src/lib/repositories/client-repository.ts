import {
  clientGrantTypes,
  clientRedirectUris,
  clientResponseTypes,
  clients,
  clientScopes,
} from "@/db/schemas/clients";
import { I_ClientRespository } from "../interfaces/i-client-repository";
import { ClientData, ClientMetadata } from "@/types";
import db from "@/db/connection";

export class ClientRepository implements I_ClientRespository {
  async create(clientInfo: ClientMetadata): Promise<ClientData> {
    // Initialize transaction for multi-table insert
    return await db.transaction(async (tx) => {
      // Insert client data
      const client = await tx.insert(clients).values(clientInfo.client).returning();
      const clientId = client[0].id;

      // Insert allowed redirect uris for client
      const redirectURIs = await Promise.all(
        clientInfo.metadata.redirectURI.map(
          async (redirectURI) =>
            await tx
              .insert(clientRedirectUris)
              .values({ ...redirectURI, clientId })
              .returning(),
        ),
      );

      // Insert allowed scopes for client
      const scopes = await Promise.all(
        clientInfo.metadata.scopes.map(
          async (scope) =>
            await tx
              .insert(clientScopes)
              .values({ ...scope, clientId })
              .returning(),
        ),
      );

      // Insert allowed response types for client
      const responseTypes = await Promise.all(
        clientInfo.metadata.responseTypes.map(
          async (responseType) =>
            await tx
              .insert(clientResponseTypes)
              .values({ ...responseType, clientId })
              .returning(),
        ),
      );

      // Insert allowed grant types for client
      const grantTypes = await Promise.all(
        clientInfo.metadata.grantTypes.map(
          async (grantType) =>
            await tx
              .insert(clientGrantTypes)
              .values({ ...grantType, clientId })
              .returning(),
        ),
      );

      return {
        client: client[0],
        redirectURIs: redirectURIs.flat(),
        scopes: scopes.flat(),
        responseTypes: responseTypes.flat(),
        grantTypes: grantTypes.flat(),
      };
    });
  }
}
