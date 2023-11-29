import React, { useEffect, useState } from "react";
import {
  ReplaceUserStatus,
  deleteUser,
  getAllUsers,
} from "../services/usersService";

import "../components/styls/sandBox.css";

const SandBox = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        // console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangeStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Regular" ? "Business" : "Regular";
    ReplaceUserStatus(id, newStatus).then(() => {
      setUsers(
        users.map((user) => {
          if (user._id === id) {
            return {
              ...user,
              isBusiness: newStatus === "Business",
              isAdmin: user.isAdmin,
            };
          }
          return user;
        })
      );
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  const formatName = (nameObj) => {
    return `${nameObj.first} ${nameObj.middle ? nameObj.middle + " " : ""}${
      nameObj.last
    }`;
  };

  const getStatus = (user) => {
    if (user.isAdmin) {
      return "Admin";
    } else if (user.isBusiness) {
      return "Business";
    } else {
      return "Regular";
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <h4 className="text-danger mb-5 mt-1">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Note Only non-admin users can be changed or deleted
      </h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{formatName(user.name)}</td>
              <td>{getStatus(user)}</td>
              <td>
                {!user.isAdmin && (
                  <>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        handleChangeStatus(user._id, getStatus(user))
                      }
                    >
                      Change Status
                    </button>

                    <button
                      className="btn btn-danger ms-3 btn-sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SandBox;
