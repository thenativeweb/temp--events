import path from 'node:path';
import type { Handler } from 'express';

const openApiFile = path.join(__dirname, 'open-api.yaml');

const getOpenApi = (): Handler => {
	return (_req, res) => {
		res.sendFile(openApiFile);
	};
};

export { getOpenApi };
