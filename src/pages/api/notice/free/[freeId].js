import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	// console.log(req.body);
	// console.log(req.query);
	const freeId = req.query?.freeId;

	if (freeId) {
		try {
			const db = (await connectDB).db("default");
			const result = await db.collection("freeNotice").updateOne(
				{
					_id: new ObjectId(freeId),
				},
				{
					$inc: {
						hit: 1,
					},
				}
			);
			// console.log(result);
			if (result && result.modifiedCount > 0) return res.status(200).json("성공");
			else return res.status(500).json("DB오류");
		} catch {
			return res.status(500).json("서버오류");
		}
	} else {
		return res.status(400).json("실패!!");
	}
}
