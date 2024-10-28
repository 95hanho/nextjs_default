"use client";

import { useRouter } from "next/navigation";

export default function DetailFreeBtn({ freeNotice, userId, page }) {
	const router = useRouter();

	return (
		<>
			{freeNotice.writer_id === userId && (
				<button
					type="button"
					className="btn btn-warning"
					onClick={() => router.push(`/notice/free/${freeNotice._id}?status=modify`)}
				>
					수정
				</button>
			)}
			<button
				type="button"
				className="btn btn-danger"
				onClick={() => {
					router.push(`/notice/free?page=${page}`);
					router.refresh();
				}}
			>
				취소
			</button>
		</>
	);
}
