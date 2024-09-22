import React from 'react'

export default function RoleTable({ roles }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Role Name
          </th>

        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r"
            >
              {role.id}
            </th>
            <td className="px-6 py-4 border-r">{role.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
