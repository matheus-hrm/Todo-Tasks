# Gerenciador de Tarefas

Este é um projeto de API para gerenciar tarefas, desenvolvido com Fastify e TypeScript.

## Funcionalidades

- Criar uma nova tarefa
- Listar todas as tarefas
- Obter uma tarefa por ID
- Atualizar uma tarefa
- Marcar uma tarefa como concluída
- Marcar uma tarefa como não concluída
- Excluir uma tarefa
- Obter estatísticas das tarefas

## Tecnologias Utilizadas

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [fastify-formbody](https://github.com/fastify/fastify-formbody)
- [fastify-cors](https://github.com/fastify/fastify-cors)
- [fastify-swagger](https://github.com/fastify/fastify-swagger)
- [fastify-swagger-ui](https://github.com/fastify/fastify-swagger-ui)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheus-hrm/Todo-Tasks.git
   cd Todo-Tasks
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a documentação da API:
   Abra o navegador e vá para [http://localhost:3000/docs](http://localhost:3000/docs)

## Estrutura do Projeto

```plaintext
.
├── dist
├── node_modules
├── src
│   ├── index.ts
│   ├── model.ts
│   └── routes.ts
├── db.ts
├── schemas.ts
├── .gitignore
├── db.json
├── package.json
├── tsconfig.json
└── README.md
```

## Endpoints da API

### Criar uma nova tarefa

- **URL:** `/task`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "task": {
      "title": "Título da Tarefa",
      "author": "Autor",
      "description": "Descrição da Tarefa",
      "isDone": false
    }
  }
  ```

### Listar todas as tarefas

- **URL:** `/tasks`
- **Método:** `GET`

### Obter uma tarefa por ID

- **URL:** `/task/:id`
- **Método:** `GET`

### Atualizar uma tarefa

- **URL:** `/task/:id`
- **Método:** `PUT`
- **Body:**
  ```json
  {
    "task": {
      "title": "Novo Título",
      "author": "Novo Autor",
      "description": "Nova Descrição",
      "isDone": true
    }
  }
  ```

### Marcar uma tarefa como concluída

- **URL:** `/task/:id/done`
- **Método:** `PUT`

### Marcar uma tarefa como não concluída

- **URL:** `/task/:id/undone`
- **Método:** `PUT`

### Excluir uma tarefa

- **URL:** `/task/:id`
- **Método:** `DELETE`

### Obter estatísticas das tarefas

- **URL:** `/tasks/stats`
- **Método:** `GET`

---
