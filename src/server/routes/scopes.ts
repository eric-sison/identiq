import { Hono } from "hono";

export const scopesHandler = new Hono().basePath("/scopes").get("/", async (c) => {});
