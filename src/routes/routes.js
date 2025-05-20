import { parse } from "csv-parse";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { DataBase } from "../database/database.js";
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new DataBase();

export const routes = [
	{
		method: "POST",
		path: buildRoutePath("/tasks"),
		handle: (req, res) => {
			const { title, description } = req.body;
			const task = {
				id: randomUUID(),
				title,
				description,
				completed_at: null,
				created_at: new Date(),
				updated_at: new Date(),
			};
			database.insert("tasks", task);
			return res.writeHead(201).end();
		},
	},
	{
		method: "POST",
		path: buildRoutePath("/tasks/upload"),
		handle: async (req, res) => {
			const csvPath = "./src/database/tasks.csv";

			if (!fs.existsSync(csvPath)) {
				return res.writeHead(404).end("Arquivo tasks.csv não encontrado.");
			}

			const stream = fs.createReadStream(csvPath);

			const csvParse = parse({
				delimiter: ",",
				skipEmptyLines: true,
				fromLine: 2,
			});

			const linesParse = stream.pipe(csvParse);

			for await (const line of linesParse) {
				const [title, description] = line.map((item) => item.trim());

				if (!title || !description) {
					console.warn("❌ Linha ignorada por estar incompleta:", line);
					continue;
				}

				try {
					const response = await fetch("http://localhost:3333/tasks", {
						method: "POST",
						body: JSON.stringify({ title, description }),
					});

					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}

					console.log(`✅ Tarefa importada: "${title}"`);
				} catch (err) {
					console.error(`❌ Erro ao importar "${title}":`, err.message);
				}
			}

			// ✅ Finaliza a resposta corretamente após o loop
			return res.writeHead(202).end(
				JSON.stringify({
					message: "Importação concluída",
				}),
			);
		},
	},
	{
		method: "GET",
		path: buildRoutePath("/tasks"),
		handle: (req, res) => {
			const { search } = req.query;

			let tasks;

			if (search) {
				tasks = database
					.select("tasks")
					.filter(
						(task) =>
							task.title.includes(search) || task.description.includes(search),
					);
			} else {
				tasks = database.select("tasks");
			}

			return res.writeHead(200).end(JSON.stringify(tasks));
		},
	},
	{
		method: "PUT",
		path: buildRoutePath("/tasks/:taskId"),
		handle: (req, res) => {
			const { taskId } = req.params;
			const { title, description } = req.body;

			const updatedTask = database.update("tasks", taskId, {
				title,
				description,
				updated_at: new Date(),
			});

			if (!updatedTask) {
				return res
					.writeHead(404)
					.end(JSON.stringify({ error: "Task not found" }));
			}

			return res.writeHead(200).end(JSON.stringify(updatedTask));
		},
	},
	{
		method: "DELETE",
		path: buildRoutePath("/tasks/:taskId"),
		handle: (req, res) => {
			const { taskId } = req.params;

			// Verifica se a tarefa existe antes de deletar
			const task = database.find("tasks", taskId);

			if (!task) {
				return res
					.writeHead(404)
					.end(JSON.stringify({ error: "Task not found" }));
			}

			database.delete("tasks", taskId);

			return res.writeHead(204).end(); // 204: sucesso, sem conteúdo
		},
	},
	{
		method: "GET",
		path: buildRoutePath("/tasks/:taskId"),
		handle: (req, res) => {
			const { taskId } = req.params;
			const task = database.find("tasks", taskId);

			if (!task) {
				return res
					.writeHead(404)
					.end(JSON.stringify({ error: "Task not found" }));
			}

			return res.writeHead(200).end(JSON.stringify(task));
		},
	},
	{
		method: "PATCH",
		path: buildRoutePath("/tasks/:taskId/complete"),
		handle: (req, res) => {
			const { taskId } = req.params;

			const task = database.find("tasks", taskId);

			if (!task) {
				return res
					.writeHead(404)
					.end(JSON.stringify({ error: "Task not found" }));
			}

			const updatedTask = database.update("tasks", taskId, {
				completed_at: new Date(),
				updated_at: new Date(), // boa prática também atualizar o updated_at
			});

			return res.writeHead(200).end(JSON.stringify(updatedTask));
		},
	},
];
