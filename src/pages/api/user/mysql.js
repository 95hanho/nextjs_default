import connect from "@/util/mysqldb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			if (!req.body || !req.body.name || !req.body.id || !req.body.password) {
				console.log("빈칸 없이 입력해주세요.");
				return res.status(400).json("빈칸 없이 입력해주세요.");
			}
			const { name, id, password } = req.body;
			console.log(req.body);
			const query = `insert user(id, nickName, password, createDate) values('${id}', '${name}', '${password}', now())`;
			console.log(query);
			const result = await connect.promise().query(query);
			console.log("result", result);

			return res.status(200).json("성공");
		} catch (err) {
			return res.status(500).json("실패!");
		}
	}
}
