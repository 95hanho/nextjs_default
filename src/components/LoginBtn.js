"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginBtn({ user }) {
	return (
		<>
			{!user ? (
				<>
					<button className="btn btn-success" onClick={signIn}>
						로그인
					</button>
					&nbsp;
					<Link href={"/user"} className="btn btn-info">
						회원가입
					</Link>
				</>
			) : (
				<button className="btn btn-danger" onClick={signOut}>
					로그아웃
				</button>
			)}
		</>
	);
}
