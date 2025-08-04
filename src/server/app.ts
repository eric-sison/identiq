import { Hono } from "hono";
import { healthcheckHandler } from "./routes/healthcheck";
import { clientTestHandler } from "./routes/client-test";

function createApp() {
  const app = new Hono().basePath("/api");

  const routes = [healthcheckHandler, clientTestHandler] as const;

  routes.forEach((route) => app.route("/", route));

  return app;
}

const app = createApp();

export default app;
