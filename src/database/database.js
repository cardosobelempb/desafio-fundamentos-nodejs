import fs from "node:fs/promises";

const path = new URL("db.json", import.meta.url);

export class DataBase {
	#database = {};

	constructor() {
		fs.readFile(path, "utf8")
			.then((data) => {
				this.#database = JSON.parse(data);
			})
			.catch(() => {
				this.#persist();
			});
	}

	#persist() {
		fs.writeFile(path, JSON.stringify(this.#database));
	}

	select(table, search = null) {
		const data = this.#database[table] ?? [];

		if (!search) return data;

		return data.filter((row) =>
			Object.entries(search).some(([key, value]) =>
				row[key]?.toLowerCase().includes(value.toLowerCase()),
			),
		);
	}

	insert(table, data) {
		if (typeof data !== "object" || data === null) {
			throw new Error("Invalid data format. Expected a non-null object.");
		}

		// Garante que tenha um ID e timestamps, se aplicável
		if (!data.id) {
			data.id = crypto.randomUUID(); // ou outro gerador de ID
		}

		if (!data.created_at) {
			data.created_at = new Date();
		}

		// Inicializa a tabela se necessário
		if (Array.isArray(this.#database[table])) {
			this.#database[table].push(data);
		} else {
			this.#database[table] = [data];
		}

		this.#persist();

		return data;
	}

	find(table, id) {
		const rows = this.#database[table];
		if (!rows) {
			return null; // ou lançar um erro, se preferir
		}

		const row = rows.find((row) => row.id === id);
		return row || null; // torna o retorno de ausência explícito
	}

	delete(table, id) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id);

		if (rowIndex > -1) {
			this.#database[table].splice(rowIndex, 1);
			this.#persist();
			return true;
		}

		return false;
	}

	update(table, id, data) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id);

		if (rowIndex > -1) {
			const updatedRow = {
				...this.#database[table][rowIndex],
				...data,
				id, // Garante que o ID original não seja sobrescrito
			};

			this.#database[table][rowIndex] = updatedRow;
			this.#persist();

			return updatedRow; // <-- Retorna a tarefa atualizada
		}

		return null; // <-- Retorna null se a tarefa não for encontrada
	}
}
