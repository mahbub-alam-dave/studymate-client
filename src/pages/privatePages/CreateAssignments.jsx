import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContextValue } from "../../Contextes/AllContexts";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import assignmentCreate from "../../assets/OnlineWork.json";
import Lottie from "lottie-react";

const CreateAssignments = () => {
  const { user } = useContext(ContextValue);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleCreateAssignmentForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const assignmentInfo = Object.fromEntries(formData.entries());

    if (assignmentInfo.description.length < 20) {
      setError("Description should be at least 20 characters");
      return;
    }

    const newAssignment = {
      ...assignmentInfo,
      author: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    axios
      .post(`${import.meta.env.VITE_api_url}/api/assignments`, newAssignment)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/assignments");
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="py-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
      <div className=" ">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Create an Assignment</h2>
          <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            Turn your idea into a challenge for others. Fill out the details below.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-2xl shadow-lg  p-6 md:p-8 border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
            <form onSubmit={handleCreateAssignmentForm} className="space-y-6 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              
              {/* Title */}
              <div>
                <label className="block font-semibold mb-1">Assignment Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Thumbnail image link"
                  className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                  required
                />
              </div>

              {/* Marks */}
              <div>
                <label className="block font-semibold mb-1">Marks</label>
                <input
                  type="number"
                  name="marks"
                  placeholder="Enter marks"
                  className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none no-spinner"
                  required
                />
              </div>

              {/* Difficulty & Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Difficulty</label>
                  <select
                    name="level"
                    className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                  >
                    <option disabled>Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Due Date</label>
                  <div className="w-full block rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-transparent px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    name="dueDate"
                    className="focus:outline-none"
                  />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter assignment details..."
                  className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none min-h-[120px]"
                  required
                />
                {error && <p className="text-[var(--color-primary)] mt-1">{error}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Link to="/">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    Go Back
                  </button>
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-white hover:opacity-90 transition"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>

          {/* Animation Section */}
          <div className="xl:w-[50%] flex justify-center items-center -order-1 xl:order-1">
            <Lottie animationData={assignmentCreate} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignments;
