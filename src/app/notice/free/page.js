import Link from "next/link";
import FreeNoticeItem from "./FreeNoticeItem";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
// export const revalidate = 5;
// export const dynamic = "force-static";

export default async function FreeNotice({ searchParams }) {
	const page = searchParams.page ? Number(searchParams.page) : 1;

	const db = (await connectDB).db("default");
	let size = await db.collection("freeNotice").countDocuments();
	let totalPage = Math.ceil(size / 5);
	if (page > totalPage) notFound();

	console.log("size", size, "page", page, "totalPage", totalPage);

	const session = await getServerSession(authOptions);

	let freeNoticeList = await db
		.collection("freeNotice")
		.find()
		.limit(5)
		.skip((page - 1) * 5)
		.toArray();
	freeNoticeList.map((v) => (v._id = v._id.toString()));

	return (
		<main id="free" style={{ padding: "0 20px" }}>
			<h2>자유게시판 리스트</h2>
			{session && (
				<div style={{ textAlign: "right", padding: "0 10px" }}>
					<Link href={"/notice/free/write"} className="btn btn-success">
						작성하기
					</Link>
				</div>
			)}
			<div>
				<table className="table table-secondary">
					<thead>
						<tr>
							<th>No.</th>
							<th>제목</th>
							<th>작성자</th>
							<th>작성일</th>
							<th>조회</th>
						</tr>
					</thead>
					<tbody>
						{freeNoticeList.map((notice, nIdx) => (
							<FreeNoticeItem key={"freeNotice" + nIdx} notice={notice} nIdx={nIdx} page={page} />
						))}
					</tbody>
				</table>
			</div>
			<div>
				<ul className="pagination" style={{ justifyContent: "center" }}>
					<li
						className={`paginate_button page-item previous ${page == 1 && "disabled"}`}
						id="data-table-default_previous"
					>
						<Link href={`/notice/free?page=${page - 1}`} role="link" className="page-link">
							Previous
						</Link>
					</li>
					{Array.from(Array(totalPage).keys(), (i) => i + 1).map((v) => (
						<li key={"pageBtn" + v} className={`paginate_button page-item ${page == v && "active"}`}>
							<Link href={`/notice/free?page=${v}`} className="page-link">
								{v}
							</Link>
						</li>
					))}

					<li
						className={`paginate_button page-item next ${page == totalPage && "disabled"}`}
						id="data-table-default_next"
					>
						<Link href={`/notice/free?page=${page + 1}`} className="page-link">
							Next
						</Link>
					</li>
				</ul>
			</div>
		</main>
	);
}
