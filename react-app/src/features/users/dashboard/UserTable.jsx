import React from "react";

export default function UserTable({ users }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            First Name
          </th>
          <th scope="col" className="px-6 py-3">
            Username
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r"
            >
              {user.id}
            </th>
            <td className="px-6 py-4 border-r">{user.firstName}</td>
            <td className="px-6 py-4 border-r">{user.userName}</td>
            <td className="px-6 py-4 border-r">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
