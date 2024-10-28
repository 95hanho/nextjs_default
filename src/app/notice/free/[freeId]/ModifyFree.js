"use client";

import { updateFree } from "@/api/notice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModifyFreeNotice({ freeNotice }) {
	const router = useRouter();
	const pathname = usePathname();

	const [freeValues, set_freeValues] = useState({
		title: "",
		content: "",
	});

	const modifyFree_Act = (e) => {
		e.preventDefault();
		if (!freeValues.title) {
			alert("제목을 입력해주세요.");
			e.target.title.focus();
		} else if (!freeValues.content) {
			alert("내용을 입력해주세요.");
			e.target.content.focus();
		} else {
			freeValues.content = freeValues.content.replaceAll("\n", "<br />");
			updateFree(freeValues)
				.then((res) => {
					if (res.status === 200) {
						router.push(pathname);
						router.refresh();
					}
				})
				.catch((err) => {
					alert(err.response.data);
				});
		}
	};

	useEffect(() => {
		set_freeValues({
			title: freeNotice.title,
			content: freeNotice.content.replaceAll("<br />", "\n"),
			_id: freeNotice._id,
			writer_id: freeNotice.writer_id,
		});
	}, []);

	return (
		<form method="POST" onSubmit={(e) => modifyFree_Act(e)}>
			<div className="write-table">
				<div className="write-page">자유게시판 수정</div>
				<div className="write-con row">
					<label className="form-label col-form-label col-lg-2">제목</label>
					<div className="col-lg-10">
						<input
							type="text"
							name="title"
							value={freeValues.title}
							onChange={(e) => set_freeValues({ ...freeValues, title: e.target.value })}
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
							value={freeValues.content}
							onChange={(e) => set_freeValues({ ...freeValues, content: e.target.value })}
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
						router.push(pathname);
						router.refresh();
					}}
				>
					취소
				</button>
			</div>
		</form>
	);
}
