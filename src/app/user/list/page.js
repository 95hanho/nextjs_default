import { getUser } from "@/api/user";

export const dynamic = "force-dynamic";

export default async function UserList() {
	const userList = await getUser();

	return (
		<main>
			<h2>유저리스트</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th>No. </th>
							<th>아이디</th>
							<th>닉네임</th>
							<th>패스워드</th>
							<th>만든 날짜</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user, i) => (
							<tr key={user.id}>
								<td>{i + 1}</td>
								<td>{user.id}</td>
								<td>{user.nickName}</td>
								<td>{user.password}</td>
								<td>{user.createDate}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
