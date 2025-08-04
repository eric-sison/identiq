import { ClientMetadata } from "@/types";
import { ClientRepository } from "../repositories/client-repository";

export class ClientService {
  constructor(private readonly clientRespository: ClientRepository) {}

  async registerClient(client: ClientMetadata) {
    return await this.clientRespository.create(client);
  }
}
