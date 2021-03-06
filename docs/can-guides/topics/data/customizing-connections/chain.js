import { connect, QueryLogic } from "//unpkg.com/can@6/core.mjs";

const connectionOptions = {
	url: 'https://jsonplaceholder.typicode.com/todos/{id}',
	queryLogic: new QueryLogic({ identity: ["id"] }),
};

const baseInstance = connect.base(connectionOptions);
const dataUrlInstance = connect.dataUrl(base);
const connection = connect.dataCombineRequests(dataUrl);
connection.init();

// connection prototype chain is made up of the behavior instances
console.log(
	`First proto: ${connection.__proto__ === dataUrlInstance}`
);
console.log(
	`Second proto: ${connection.__proto__.__proto__ === baseInstance}`
);
console.log(
	`Third proto: ${connection.__proto__.__proto__.__proto__ === connectionOptions}`
);

connection.getData({id: 5}).then((result) => {
	console.log(`Fetched Todo JSON: `, result);
});
