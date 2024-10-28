import { ObjectId } from "mongodb";
import DetailFreeBtn from "./DetailFreeBtn";
import ModifyFreeNotice from "./ModifyFree";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
// export const dynamic = "force-static";

export default async function detailFreeNotice({ params: { freeId: fId }, searchParams }) {
	if (!ObjectId.isValid(fId)) notFound();
	const session = await getServerSession(authOptions);
	const status = searchParams.status;
	const page = searchParams.page || "1";

	const db = (await connectDB).db("default");
	const freeNotice = await db.collection("freeNotice").findOne({ _id: new ObjectId(fId) });
	freeNotice._id = freeNotice._id.toString();

	if (freeNotice)
		return (
			<main>
				{status !== "modify" ? (
					<div style={{ padding: "0 20px" }}>
						<div className="write-table">
							<div className="write-page"></div>
							<div className="write-con row">
								<label className="form-label col-form-label col-lg-2">제목</label>
								<div className="col-lg-4">{freeNotice.title}</div>
								<label className="form-label col-form-label col-lg-2">조회수</label>
								<div className="col-lg-4">{freeNotice.hit}</div>
							</div>
							<div className="write-con row">
								<label className="form-label col-form-label col-lg-2">내용</label>
								<div className="col-lg-10" dangerouslySetInnerHTML={{ __html: freeNotice.content }}></div>
							</div>
							<div className="write-con row">
								<label className="form-label col-form-label col-lg-2">작성자</label>
								<div className="col-lg-10">{freeNotice.writer_name}</div>
							</div>
						</div>
						<div className="write-btn">
							<DetailFreeBtn freeNotice={freeNotice} userId={session?.user.id} page={page} />
						</div>
					</div>
				) : (
					<ModifyFreeNotice freeNotice={freeNotice} />
				)}
			</main>
		);
}
