import express from "express";

const server = express();
const port = 3000;

server.use(express.json({ limit: '1mb' }));
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.json(`API its working...`)
});

server.post('/evaluator', (req, res) => {
    try {
        const { body } = req;
        const data = Object.assign({}, body);
        console.log(body);
        if (data && data.function) {
            if (data && data.values) {
                let code = '';
                for (const key in data.values) {
                    if (Object.hasOwnProperty.call(data.values, key)) {
                        const element = data.values[key];
                        code += `var ${key} = ${data.values[key]};`;
                    }
                }
                res.json({ value: eval(code + data.function) });
            }
            return res.status(400).json({ message: `values can't be null or empty` });
        }
        return res.status(400).json({ message: `function can't be null` });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
});

server.listen(port, () => {
    console.log(`Listen on port ${port}`);
});