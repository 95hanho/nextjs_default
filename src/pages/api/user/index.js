import connect from "@/util/mysqldb";

export default async function handler(req, res) {
	// console.log(req, res);

	if (req.method === "GET") {
		// const data = await executeQuery(sql, "");
		try {
			// const db = await connect.getConnection();
			const query = "select * from user";
			// const [rows] = await db.execute(query);
			const [rows] = await connect.promise().query(query);
			// console.log(rows);
			// db.release();

			return res.status(200).json(rows);
		} catch (err) {
			return res.status(500).json("실패!");
		}
	}
	if (req.method === "POST") {
		let db = (await connectDB).db("default");

		if (!req.body || !req.body.name || !req.body.id || !req.body.password) {
			console.log("빈칸 없이 입력해주세요.");
			return res.status(400).json("빈칸 없이 입력해주세요.");
		}
		let user = await db.collection("user_cred").findOne({ id: req.body.id });
		if (user) {
			return res.status(400).json("중복된 아이디가 존재합니다.");
		} else {
			try {
				let hash = await bcrypt.hash(req.body.password, 10);
				req.body.password = hash;
				await db.collection("user_cred").insertOne({
					...req.body,
					regdate: new Date().toISOString(),
					role: "user",
				});
				return res.status(200).json("가입성공");
			} catch {
				return res.status(500).json("서버오류");
			}
		}
	}
}
