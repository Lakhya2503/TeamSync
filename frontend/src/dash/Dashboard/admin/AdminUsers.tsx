import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiMail,
  FiCalendar,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import { FaUserShield, FaUserCog, FaUser } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  lastActive: string;
  avatar?: string;
}

// --- clay tokens ---------------------------------------------------------
const clayRaised =
  "bg-[#e0e5ec] shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]";
const clayRaisedSm =
  "bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]";
const clayInset =
  "bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]";
const clayPuck =
  "flex items-center justify-center rounded-2xl bg-[#e0e5ec] shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff]";
const clayButton =
  "bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-white font-bold " +
  "shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] " +
  "transition-all duration-150 hover:from-[#6b8cf4] hover:to-[#9d7cf8] " +
  "hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] " +
  "active:shadow-[inset_4px_4px_10px_rgba(90,70,200,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.5)]";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const sampleUsers: User[] = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Admin",
          status: "Active",
          joinDate: "2024-01-15",
          lastActive: "2024-03-10",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "Manager",
          status: "Active",
          joinDate: "2024-02-01",
          lastActive: "2024-03-09",
        },
        {
          id: 3,
          name: "Robert Johnson",
          email: "robert.j@example.com",
          role: "User",
          status: "Inactive",
          joinDate: "2023-11-20",
          lastActive: "2024-02-28",
        },
        {
          id: 4,
          name: "Emily Davis",
          email: "emily.d@example.com",
          role: "User",
          status: "Pending",
          joinDate: "2024-03-01",
          lastActive: "2024-03-01",
        },
        {
          id: 5,
          name: "Michael Wilson",
          email: "michael.w@example.com",
          role: "Manager",
          status: "Active",
          joinDate: "2024-01-10",
          lastActive: "2024-03-08",
        },
        {
          id: 6,
          name: "Sarah Brown",
          email: "sarah.b@example.com",
          role: "User",
          status: "Active",
          joinDate: "2024-02-15",
          lastActive: "2024-03-07",
        },
      ];

      setUsers(sampleUsers);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "All" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <FaUserShield className="text-rose-500" />;
      case "Manager":
        return <FaUserCog className="text-indigo-500" />;
      default:
        return <FaUser className="text-[#a0aec0]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Active: {
        color: "bg-emerald-100 text-emerald-700",
        icon: <FiCheckCircle className="mr-1" />,
      },
      Inactive: {
        color: "bg-rose-100 text-rose-700",
        icon: <FiXCircle className="mr-1" />,
      },
      Pending: {
        color: "bg-amber-100 text-amber-700",
        icon: <FiClock className="mr-1" />,
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${config.color}`}
      >
        {config.icon}
        {status}
      </span>
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    setSelectedUser(id);
    console.log("Edit user:", id);
  };

  return (
    <div className="min-h-full bg-[#e0e5ec] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#4a5568] md:text-3xl">
              User Management
            </h1>
            <p className="mt-1 text-sm font-medium text-[#718096]">
              Manage and monitor all users in the system
            </p>
          </div>
          <button
            className={`mt-3 inline-flex items-center rounded-2xl px-4 py-2 md:mt-0 ${clayButton}`}
          >
            <FiPlus className="mr-2" />
            Add User
          </button>
        </div>

        {/* Filters — clay panel */}
        <div className={`mb-6 rounded-[1.75rem] p-4 ${clayRaised}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search (inset clay) */}
            <div className="relative max-w-xs flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aec0]" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border-none bg-[#e0e5ec] py-2 pl-10 pr-4 text-sm font-medium text-[#4a5568] placeholder-[#a0aec0] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0"
              />
            </div>

            {/* Selects (inset clay) + filter button */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  value: selectedRole,
                  onChange: setSelectedRole,
                  options: ["All", "Admin", "Manager", "User"],
                  allLabel: "All Roles",
                },
                {
                  value: selectedStatus,
                  onChange: setSelectedStatus,
                  options: ["All", "Active", "Inactive", "Pending"],
                  allLabel: "All Status",
                },
              ].map((sel, i) => (
                <div key={i} className="relative">
                  <select
                    value={sel.value}
                    onChange={(e) => sel.onChange(e.target.value)}
                    className="cursor-pointer appearance-none rounded-2xl border-none bg-[#e0e5ec] py-2 pl-3 pr-8 text-sm font-semibold text-[#4a5568] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0"
                  >
                    {sel.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === "All" ? sel.allLabel : opt}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a0aec0]" />
                </div>
              ))}

              <button
                className={`inline-flex items-center rounded-2xl px-3 py-2 text-sm font-bold text-[#4a5568] ${clayRaisedSm} hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}
              >
                <FiFilter className="mr-2 text-indigo-500" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users table — clay card */}
        <div className={`overflow-hidden rounded-[1.75rem] ${clayRaised}`}>
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm font-semibold text-[#a0aec0]">
                No users found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto p-3">
              <table className="w-full">
                <thead>
                  <tr>
                    {[
                      "User",
                      "Role",
                      "Status",
                      "Join Date",
                      "Last Active",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`px-3 py-2 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#a0aec0] ${
                          h === "Actions" ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="group">
                      {/* User */}
                      <td className="px-3 py-2">
                        <div
                          className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${clayRaisedSm} transition-shadow duration-150 group-hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-sm font-bold text-white shadow-[inset_2px_2px_5px_rgba(90,70,200,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.4)]">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#4a5568]">
                              {user.name}
                            </p>
                            <p className="flex items-center text-xs font-medium text-[#a0aec0]">
                              <FiMail className="mr-1 h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-3 py-2">
                        <div
                          className={`flex items-center rounded-2xl px-3 py-2 text-sm font-semibold text-[#4a5568] ${clayRaisedSm}`}
                        >
                          {getRoleIcon(user.role)}
                          <span className="ml-2">{user.role}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-2">
                        <div
                          className={`inline-flex rounded-2xl px-3 py-2 ${clayInset}`}
                        >
                          {getStatusBadge(user.status)}
                        </div>
                      </td>

                      {/* Join date */}
                      <td className="px-3 py-2">
                        <div
                          className={`flex items-center rounded-2xl px-3 py-2 text-sm font-medium text-[#718096] ${clayRaisedSm}`}
                        >
                          <FiCalendar className="mr-2 text-indigo-400" />
                          {new Date(user.joinDate).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Last active */}
                      <td className="px-3 py-2">
                        <div
                          className={`rounded-2xl px-3 py-2 text-sm font-medium text-[#a0aec0] ${clayRaisedSm}`}
                        >
                          {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Actions — clay pucks */}
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-indigo-500 ${clayRaisedSm} hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`}
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-rose-500 ${clayRaisedSm} hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`}
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                          <button
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-[#a0aec0] ${clayRaisedSm} hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`}
                          >
                            <FiMoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && filteredUsers.length > 0 && (
            <div className="border-t border-[#c3cad5]/40 px-4 py-4">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm font-medium text-[#718096]">
                  Showing{" "}
                  <span className="font-bold text-[#4a5568]">
                    {indexOfFirstItem + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-[#4a5568]">
                    {Math.min(indexOfLastItem, filteredUsers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-[#4a5568]">
                    {filteredUsers.length}
                  </span>{" "}
                  users
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[#4a5568] ${clayRaisedSm} disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`}
                  >
                    <FiChevronLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                          currentPage === page
                            ? "bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-white shadow-[inset_3px_3px_8px_rgba(90,70,200,0.3),inset_-3px_-3px_8px_rgba(255,255,255,0.4)]"
                            : `${clayRaisedSm} text-[#4a5568] hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[#4a5568] ${clayRaisedSm} disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            {
              label: "Total Users",
              value: users.length,
              icon: FaUser,
              iconColor: "text-indigo-500",
            },
            {
              label: "Active Users",
              value: users.filter((u) => u.status === "Active").length,
              icon: FiCheckCircle,
              iconColor: "text-emerald-500",
            },
            {
              label: "Pending Users",
              value: users.filter((u) => u.status === "Pending").length,
              icon: FiClock,
              iconColor: "text-amber-500",
            },
            {
              label: "Admins",
              value: users.filter((u) => u.role === "Admin").length,
              icon: FaUserShield,
              iconColor: "text-rose-500",
            },
          ].map((stat, idx) => (
            <div key={idx} className={`rounded-[1.75rem] p-4 ${clayRaised}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#718096]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-[#4a5568]">
                    {stat.value}
                  </p>
                </div>
                <div className={`h-12 w-12 ${clayPuck}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
