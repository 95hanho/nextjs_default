"use client";

import { hitFree } from "@/api/notice";
import "moment/locale/ko";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FreeNoticeItem({ notice, nIdx, page }) {
	const router = useRouter();

	let [dupl, set_dupl] = useState(false);

	return (
		<>
			<tr
				key={"freeNotice" + nIdx}
				onClick={() => {
					if (!dupl) {
						set_dupl(true);
						hitFree(notice._id).then((res) => {
							router.refresh();
							router.push(`/notice/free/${notice._id.toString()}?page=${page}`);
							router.refresh();
							setTimeout(() => {
								set_dupl(false);
							}, 2000);
						});
					}
				}}
			>
				<td>{(page - 1) * 5 + (nIdx + 1)}</td>
				<td>{notice.title}</td>
				<td>{notice.writer_name}</td>
				<td>{moment(notice.regdate).format("YYYY-MM-DD HH:mm:ss")}</td>
				<td>{notice.hit}</td>
			</tr>
		</>
	);
}
