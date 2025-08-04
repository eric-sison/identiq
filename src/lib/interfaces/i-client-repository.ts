import { ClientData, ClientMetadata, ClientRedirectURI, OAuthClient } from "@/types";

export interface I_ClientRespository {
  create(client: ClientMetadata): Promise<ClientData>;
}
