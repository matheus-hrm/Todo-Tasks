import { promises as fs } from "fs";
import { join } from "path";
import { Todo } from "./src/model";

const filePath = join(__dirname, "db.json");

async function save(tasks: Todo[]) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

async function load(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return [];
  }
}
export { save, load };
