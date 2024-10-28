import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
	let session = await getServerSession(req, res, authOptions);
	// console.log("session", session);

	const { title, content, _id, writer_id } = req.body;

	if (!session) {
		return res.status(401).json("로그인이 필요합니다.");
	} else if (!title || !content) {
		return res.status(400).json("값이 없음");
	} else {
		try {
			let result = null;
			const db = (await connectDB).db("default");
			if (req.method === "POST") {
				result = await db.collection("freeNotice").insertOne({
					title,
					content,
					regdate: new Date().toISOString(),
					hit: 0,
					writer_id: session.user.id,
					writer_name: session.user.name,
				});
			} else if (req.method === "PUT") {
				if (session.user.id === writer_id) {
					result = await db.collection("freeNotice").updateOne(
						{
							_id: new ObjectId(_id),
						},
						{
							$set: {
								title,
								content,
								regdate: new Date().toISOString(),
							},
						}
					);
				} else return res.status(401).json("수정 권한이 없습니다.");
			}
			if (result) return res.status(200).json("성공");
			else return res.status(500).json("서버오류");
		} catch {
			return res.status(500).json("서버오류");
		}
	}
}
