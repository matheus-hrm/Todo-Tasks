import { fastify } from "fastify";
import { routes } from "./routes";
import { fastifyFormbody } from "@fastify/formbody";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const app = fastify();

app.register(fastifyFormbody);
app.register(fastifyCors, { origin: "*" });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Task API",
      version: "1.0.0",
    },
  },
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
app.register(routes);

const start = async () => {
  try {
    await app.listen({ port: 3000 }).then(() => {
      console.log(`Server running !`);
    });
  } catch (err) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
};

start();
