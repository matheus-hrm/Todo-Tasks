export type Todo = {
  id: string;
  title: string;
  author: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  isDone: boolean;
};

export type TodoPayload = {
  title: string;
  author: string;
  description: string;
  isDone: boolean;
};

const TodoTaskJsonSchema = {
  type: "object",
  properties: {
    task: { type: "object" },
  },
};

const schema = {
  body: TodoTaskJsonSchema,
};

export { schema };
