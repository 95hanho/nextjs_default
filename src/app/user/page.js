"use client";

import { joinUser, joinUser2 } from "@/api/user";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserJoin() {
	const router = useRouter();

	const [user, set_user] = useState({
		name: "",
		id: "",
		password: "",
	});

	const userCheck = () => {
		let result = false;
		if (!user.name) {
			alert("이름을 입력해주세요.");
			e.target.name.focus();
		} else if (!user.id) {
			alert("아이디를 입력해주세요.");
			e.target.id.focus();
		} else if (!user.password) {
			alert("비밀번호를 입력해주세요.");
			e.target.password.focus();
		} else result = true;
		return result;
	};

	// joinUser
	const joinUser_before = (e) => {
		e.preventDefault();
		if (!userCheck()) return;
		else {
			joinUser(user)
				.then((res) => {
					router.push("/");
					signIn();
				})
				.catch((err) => {
					console.log(err.response.data);
					alert(err.response.data);
				});
		}
	};
	const joinUser_before2 = () => {
		if (!userCheck()) return;
		else {
			joinUser2(user)
				.then(() => {
					router.push("/user/list");
					// signIn();
				})
				.catch((err) => {
					console.log(err.response.data);
					alert(err.response.data);
				});
		}
	};

	return (
		<main id="userJoin">
			<div>
				<h3>회원가입</h3>
				<form onSubmit={joinUser_before}>
					<h5>이름</h5>
					<div>
						<input
							type="text"
							name="name"
							value={user.name}
							onChange={(e) => set_user({ ...user, name: e.target.value })}
						></input>
					</div>
					<h5>아이디</h5>
					<div>
						<input
							type="text"
							name="id"
							value={user.id}
							onChange={(e) => set_user({ ...user, id: e.target.value })}
						></input>
					</div>
					<h5>비밀번호</h5>
					<div>
						<input
							type="password"
							name="password"
							value={user.password}
							onChange={(e) => set_user({ ...user, password: e.target.value })}
						></input>
					</div>
					<div>
						<button type="submit" className="btn btn-dark">
							몽고회원가입
						</button>
						<button type="button" className="btn btn-info" onClick={joinUser_before2}>
							MySql회원가입
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
