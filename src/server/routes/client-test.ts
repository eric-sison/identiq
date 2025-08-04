import { ClientRepository } from "@/lib/repositories/client-repository";
import { ClientService } from "@/lib/services/client-service";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ClientMetadataSchema } from "@/validators";

export const clientTestHandler = new Hono()
  .basePath("clients")
  .post("/", zValidator("json", ClientMetadataSchema), async (c) => {
    const clientMetaData = c.req.valid("json");
    const clientRepository = new ClientRepository();
    const clientService = new ClientService(clientRepository);

    const res = await clientService.registerClient(clientMetaData);
    return c.json({ ...res });
  });
