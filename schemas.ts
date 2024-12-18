export const getTasksSchema = {
  tags: ["task"],
  description: "Get all tasks",
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          author: { type: "string" },
          isDone: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time", nullable: true },
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
};

export const getTaskSchema = {
  tags: ["task"],
  description: "Get a task by ID",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        author: { type: "string" },
        isDone: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
      },
    },
    404: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

export const createTaskSchema = {
  tags: ["task"],
  description: "Create a new task",
  body: {
    type: "object",
    required: ["task"],
    properties: {
      task: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          author: { type: "string" },
          isDone: { type: "boolean", default: false },
        },
      },
    },
  },
  response: {
    201: {
      description: "Task created",
    },
    400: {
      description: "Invalid request body",
    },
  },
};

export const deleteTaskSchema = {
  tags: ["task"],
  description: "Delete a task",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    204: {
      description: "Task deleted",
    },
    400: {
      description: "Invalid id",
    },
  },
};

export const updateTaskSchema = {
  tags: ["task"],
  description: "Update a task",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["task"],
    properties: {
      task: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          author: { type: "string" },
          isDone: { type: "boolean" },
        },
      },
    },
  },
  response: {
    204: {
      description: "Task updated",
    },
    400: {
      description: "Invalid request body",
    },
  },
};
