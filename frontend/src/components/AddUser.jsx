import { useState } from "react";
import axios from "axios";

const AddUser = ({ onAdd, showModal, setShowModal }) => {
  const [form, setForm] = useState({ name: "", totalPoints: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "totalPoints" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim() === "") return;
    try {
      await axios.post("http://localhost:5000/api/users", form);
      if (onAdd) onAdd();
      setForm({ name: "", totalPoints: 0 });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-4"
      >
        Add User
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.1)" }}>
          <div className="bg-white p-8 rounded-lg shadow-lg min-w-[320px]">
            <h2 className="text-xl font-bold mb-4 text-center">Add User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Total Points:</label>
                <input
                  type="number"
                  name="totalPoints"
                  value={form.totalPoints}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min={0}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
