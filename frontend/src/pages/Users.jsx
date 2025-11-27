import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  //fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User from localStorage:", user);

        if (!res.ok) {
          console.log("Fetch users error:".res.status);
          return;
        }
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Fetch users error: ", error);
      }
    };
    fetchUsers();
  }, []);

  //filter users based on search input
  const filteredUsers = users.filter((u) =>
    (u.username || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen">
      <Sidebar
        handleLogout={handleLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          username={user?.username}
          setIsSidebarOpen={setIsSidebarOpen}
          title="Users"
        />
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}
        <div className="flex-1 p-10 overflow-auto bg-white">
          <input
            type="text"
            placeholder="search users..."
            className="w-full md:w-1/3 px-3 py-2 border rounded-lg mb-4 outline-none text-gray-950 bg-[#ffffff]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/*user table*/}
          <div className="overflow-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg sm:rounded-xl">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border text-[#022a66]">Name</th>
                  <th className="p-3 border text-[#022a66]">Email</th>
                  <th className="p-3 border text-[#022a66]">Role</th>
                  <th className="p-3 border text-[#022a66]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="p-3 border text-[#4e3939]">{u.username}</td>
                    <td className="p-3 border text-[#4e3939]">{u.email}</td>
                    <td className="p-3 border text-[#4e3939]">
                      {u.role || "user"}
                    </td>
                    <td className="p-3 border text-[#4e3939]">
                      <button
                        className="text-[#37378a] hover:bg-[#bcbcda] mr-3 bg-[#a0a9bb]"
                        onClick={() => {
                          setSelectedUser(u);
                          setShowView(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="text-[#37378a] hover:bg-[#bcbcda] mr-3 bg-[#a0a9bb]"
                        onClick={() => {
                          setSelectedUser(u);
                          setShowDelete(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/*view modal*/}
          {showView && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                <p>
                  <b>Name:</b> {selectedUser.username}
                </p>
                <p>
                  <b>Email:</b> {selectedUser.email}
                </p>
                <p>
                  <b>Role:</b> {selectedUser.role || "user"}
                </p>

                <button
                  className="mt-4 px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowView(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/*delete modal*/}
          {showDelete && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-semibold">
                  Are you sure you want to delete this user?
                </h2>
                <p className="mt-2 text-gray-600">{selectedUser.email}</p>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => setShowDelete(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 bg-[#c9528d] text-white rounded"
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");

                        const res = await fetch(
                          `http://localhost:8000/api/users/${selectedUser._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        if (!res.ok) {
                          console.log("Delete failed");
                          return;
                        }

                        //remove user from UI
                        setUsers((prev) =>
                          prev.filter((u) => u._id !== selectedUser._id)
                        );
                      } catch (error) {
                        console.log("Delete error", error);
                      }
                      setShowDelete(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
