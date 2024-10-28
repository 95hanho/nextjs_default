import { MongoClient, ServerApiVersion } from "mongodb";
const url = process.env.MONGODB_URI;

if (!url) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};
let connectDB = new MongoClient(url, options).connect();

if (process.env.NODE_ENV === "development") {
	console.log("development 버전");
	if (!global._mongo) {
		global._mongo = new MongoClient(url, options).connect();
	}
	connectDB = global._mongo;
} else {
	connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
