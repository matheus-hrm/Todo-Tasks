import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { TodoPayload } from "./model";
import { load, save } from "../db";
import { randomUUID } from "crypto";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskSchema,
} from "../schemas";

export async function routes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  app.get(
    "/tasks",
    {
      schema: getTasksSchema,
    },
    async (_, reply) => {
      try {
        const tasks = await load();
        return reply.status(200).send(tasks);
      } catch (err) {
        return reply.code(500).send({
          error: "Internal server error",
          message: err,
        });
      }
    }
  );

  app.get(
    "/task/:id",
    {
      schema: getTaskSchema,
    },
    async (request, reply) => {
      try {
        const tasks = await load();
        const { id } = request.params as { id: string };
        if (!id) {
          return reply.code(400).send({ error: "Invalid id" });
        }
        const task = tasks.find((task) => task.id === id);
        if (!task) {
          return reply.code(404).send({ error: "Task not found" });
        }
        return reply.code(200).send(task);
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
          message: error,
        });
      }
    }
  );

  app.get(
    "/tasks/stats",
    {
      schema: {},
    },
    async (_, reply) => {
      try {
        const tasks = await load();
        const total = tasks.length;
        const done = tasks.filter((task) => task.isDone).length;
        const undone = total - done;
        return reply.code(200).send({ total, done, undone });
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
          message: error,
        });
      }
    }
  );

  app.post(
    "/task",
    {
      schema: createTaskSchema,
    },
    async (request, reply) => {
      try {
        const tasks = await load();
        const { task } = request.body as { task: TodoPayload };
        if (!task) {
          return reply.code(400).send({ error: "Invalid request body" });
        }
        const createdAt = new Date();
        const id = randomUUID();
        tasks.push({ id, createdAt, ...task });
        await save(tasks);
        return reply.status(201).send({ task });
      } catch (error) {
        return reply.code(400).send({
          error: "Invalid request body",
          message: error,
        });
      }
    }
  );

  app.delete(
    "/task/:id",
    {
      schema: deleteTaskSchema,
    },
    async (request, reply) => {
      try {
        const tasks = await load();
        const { id } = request.params as { id: string };
        if (!id) {
          return reply.code(400).send({ error: "Invalid id" });
        }
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) {
          return reply.code(404).send({ error: "Task not found" });
        }
        tasks.splice(index, 1);
        await save(tasks);
        return reply.code(204).send();
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
          message: error,
        });
      }
    }
  );

  app.put(
    "/task/:id",
    {
      schema: updateTaskSchema,
    },
    async (request, reply) => {
      try {
        const tasks = await load();
        const { id } = request.params as { id: string };
        const { task } = request.body as { task: TodoPayload };
        if (!id) {
          return reply.code(400).send({ error: "Invalid request" });
        }
        if (!task) {
          return reply.code(400).send({ error: "Invalid request body" });
        }
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) {
          return reply.code(404).send({ error: "Task not found" });
        }
        const date = new Date();
        tasks[index] = {
          ...tasks[index],
          ...task,
          updatedAt: date,
        };
        await save(tasks);
        return reply.code(204).send();
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
          message: error,
        });
      }
    }
  );

  app.put(
    "/task/:id/done",
    {
      schema: {},
    },
    async (request, reply) => {
      try {
        const tasks = await load();
        const { id } = request.params as { id: string };
        if (!id) {
          return reply.code(400).send({ error: "Invalid request" });
        }
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) {
          return reply.code(404).send({ error: "Task not found" });
        }
        tasks[index].isDone = true;
        await save(tasks);
        return reply.code(204).send();
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
          message: error,
        });
      }
    }
  );

  app.put(
    "/task/:id/undone",
    {
      schema: {},
    },
    async (request, reply) => {
      try {
        const tasks = await load();
        const { id } = request.params as { id: string };
        if (!id) {
          return reply.code(400).send({ error: "Invalid request" });
        }
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) {
          return reply.code(404).send({ error: "Task not found" });
        }
        tasks[index].isDone = false;
        await save(tasks);
        return reply.code(204).send();
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
          message: error,
        });
      }
    }
  );
}
