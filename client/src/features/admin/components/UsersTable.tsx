"use client"
import Avatar from "@/src/shared/ui/Avatar";
import UserSearch from "./UserSearch";
import UserActionsButton from "./UserActionsButton";
import { useGetAdminUsers } from "../useAdmin";
import { useEffect, useState } from "react";



const roleBadge = {
  USER: "bg-blue-100 text-blue-700",
  ADMIN: "bg-purple-100 text-purple-700",
  SUPERADMIN: "bg-red-100 text-red-700",
}
function UsersTable() {
  const [search, setSearch] = useState("")
  const [debounceSearch, setDebounceSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])
  const { data: users } = useGetAdminUsers({ search: debounceSearch })

  return (
    <div className='w-full h-full overflow-y-scroll feed-scroll py-5 px-8 text-(--text)'>
      <UserSearch search={search} onSetSearch={setSearch} />

      <div className="h-full w-full">
        {/* Table */}
        <div className="bg-(--card) rounded-2xl shadow-sm border border-(--text-20) overflow-hidden">
          <div className="overflow-x-auto ">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-(--surface) border-b border-(--text-20) text-left text-(--text) syne uppercase text-xs tracking-wider">
                  <th className="px-5 py-4 font-medium">User</th>
                  <th className="px-5 py-4 font-medium">Profession</th>
                  <th className="px-5 py-4 font-medium">Tech Stack</th>
                  <th className="px-5 py-4 font-medium">Role</th>
                  <th className="px-5 py-4 font-medium text-center">Followers</th>
                  <th className="px-5 py-4 font-medium text-center">Following</th>
                  <th className="px-5 py-4 font-medium text-center">Portfolio</th>
                  <th className="px-5 py-4 font-medium text-center">Roasts</th>
                  <th className="px-5 py-4 font-medium text-center">Status</th>
                  <th className="px-5 py-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {
                  users?.data.map((user) => (
                    <tr key={user.id} className="hover:bg-(--surface) transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.username} role={user.role} />
                          <div>
                            <p className="font-semibold text-(--text) syne">
                              @{user.username}
                            </p>
                            <p className="text-(--text-50) syne text-xs">{user.name} {user.secondname}</p>
                            <p className="text-(--text-50) syne text-xs">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Profession */}
                      <td className="px-5 py-4 text-(--text) syne">{user.profession}</td>

                      {/* Tech stack */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-45">
                          {user.techstack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="bg-(--bg) text-(--text) text-xs syne px-2.5 py-0.5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {user.techstack.length > 3 && (
                            <span className="text-gray-400 text-xs px-1">
                              +{["asd", "asdf", "adasd", "asdasd", "Asdasd"].length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadge[user.role]}`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Counts */}
                      <td className="px-5 py-4 text-center text-(--text) font-medium">{user.followerCount}</td>
                      <td className="px-5 py-4 text-center text-(--text) font-medium">{user.followingCount}</td>
                      <td className="px-5 py-4 text-center text-(--text) font-medium">{user.portfolioCount}</td>
                      <td className="px-5 py-4 text-center text-(--text) font-medium">{user.roastCount}</td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        {user.isBanned ? (
                          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                            Banned
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </td>

                      <td>
                        <UserActionsButton userId={5} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-gray-500 mt-1 syne text-xl text-right py-3 px-5">{users?.data.length} ta foydalanuvchi</p>
      </div>
    </div>
  );
}

export default UsersTable;