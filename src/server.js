import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes/routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
// import {exec} from 'child_process'

const hostName = '127.0.0.1'
const port = 3333
const url = `http://${hostName}:${port}/`

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	await json(req, res);

	const route = routes.find(
		(route) => route.method === method && route.path.test(url),
	);

	if (route) {
		const routeParams = req.url.match(route.path);

		const { query, ...params } = routeParams.groups;
		req.params = params;
		req.query = query ? extractQueryParams(query) : {};

		return route.handle(req, res);
	}

	return res.writeHead(404).end();
});

server.listen(port, hostName, () => {
	console.log(`Server run ${url}`)
});

// const open = (process.platform == 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open')

// exec(open + ' ' + url)
