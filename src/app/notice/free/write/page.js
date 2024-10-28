"use client";

import { createFree } from "@/api/notice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Write() {
	const router = useRouter();

	const [freeNotice, set_freeNotice] = useState({
		title: "",
		content: "",
	});

	const createFree_Act = (e) => {
		e.preventDefault();
		if (!freeNotice.title) {
			alert("제목을 입력해주세요.");
			e.target.title.focus();
		} else if (!freeNotice.content) {
			alert("내용을 입력해주세요.");
			e.target.content.focus();
		} else {
			freeNotice.content = freeNotice.content.replaceAll("\n", "<br />");
			createFree(freeNotice)
				.then((res) => {
					if (res.status === 200) {
						router.push("/notice/free");
						router.refresh();
					}
				})
				.catch((err) => {
					alert(err.response.data);
				});
		}
	};

	return (
		<main>
			<form method="POST" onSubmit={(e) => createFree_Act(e)}>
				<div className="write-table">
					<div className="write-page">자유게시판 작성</div>
					<div className="write-con row">
						<label className="form-label col-form-label col-lg-2">제목</label>
						<div className="col-lg-10">
							<input
								type="text"
								name="title"
								value={freeNotice.title}
								onChange={(e) => set_freeNotice({ ...freeNotice, title: e.target.value })}
								className="form-control"
								placeholder="제목을 입력해주세요."
							></input>
						</div>
					</div>
					<div className="write-con row">
						<label className="form-label col-form-label col-lg-2">내용</label>
						<div className="col-lg-10">
							<textarea
								type="text"
								name="content"
								className="form-control"
								placeholder="내용을 입력해주세요."
								value={freeNotice.content}
								onChange={(e) => set_freeNotice({ ...freeNotice, content: e.target.value })}
							></textarea>
						</div>
					</div>
				</div>
				<div className="write-btn">
					<button type="submit" className="btn btn-success">
						완료
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => {
							router.push("/notice/free");
						}}
					>
						취소
					</button>
				</div>
			</form>
		</main>
	);
}
