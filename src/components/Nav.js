import Link from "next/link";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function Nav() {
	let session = await getServerSession(authOptions);
	// console.log(session);

	return (
		<nav>
			<Link prefetch={false} href={"/"}>
				메인
			</Link>
			<Link prefetch={false} href={"/notice/free"}>
				자유게시판
			</Link>
			<Link prefetch={false} href={"/user/list"}>
				유저리스트
			</Link>
			<LoginBtn user={session} />
		</nav>
	);
}
