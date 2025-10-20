import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Link, useLoaderData, useNavigate } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
import assignmentCreate from "../../assets/OnlineWork.json";
import Lottie from "lottie-react";

const UpdateAssignment = () => {
  const assignment = useLoaderData();
  const { user } = useContext(ContextValue);
  const token = user.accessToken;
  const [startDate, setStartDate] = useState(assignment?.dueDate);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleUpdateAssignmentForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const assignmentInfo = Object.fromEntries(formData.entries());

    if (assignmentInfo.description.length < 20) {
      setError("Description should be at least 20 characters");
      return;
    }

    axios
      .patch(
        `${import.meta.env.VITE_api_url}/api/assignments/${assignment._id}`,
        assignmentInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Assignment Updated Successfully",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/assignments");
        } else if (res.data.matchedCount) {
          Swal.fire({
            icon: "info",
            title: "No changes detected",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/assignments");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="py-12">
      {/* Form Section */}
      <div className="space-y-3 mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
        <h2 className="text-3xl font-bold ">✏️ Update Assignment</h2>
        <p className="text-base md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          Here you have the option to easily update your own submitted
          assignments. Just change and update
        </p>
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-6">
        <div className="flex-1 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] w-full p-8 rounded-2xl shadow-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] ">
          <form
            onSubmit={handleUpdateAssignmentForm}
            className="space-y-5 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]"
          >
            {/* Title */}
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={assignment.title}
                className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                placeholder="Assignment title"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                defaultValue={assignment.imageUrl}
                className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                placeholder="Thumbnail image url"
                required
              />
            </div>

            {/* Marks */}
            <div>
              <label className="block font-semibold mb-1">Marks</label>
              <input
                type="number"
                defaultValue={assignment.marks}
                className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none no-spinner"
                name="marks"
                placeholder="Enter marks"
                required
              />
            </div>

            {/* Difficulty & Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">
                  Difficulty Label
                </label>
                <select
                  className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                  defaultValue={assignment.level}
                  name="level"
                >
                  <option disabled>Select difficulty label</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Due Date</label>
                <div className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none">
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
                defaultValue={assignment.description}
                className="w-full p-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg bg-transparent focus:ring-1 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)] outline-none"
                name="description"
                placeholder="Enter assignment description"
                rows={4}
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Buttons */}
            {/*<div className="flex justify-between gap-4 pt-4">
            <Link to={"/assignments"} className="w-full">
              <button
                type="button"
                className="w-full py-3 bg-gray-200 dark:bg-gray-600 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] font-semibold rounded-lg transition"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white font-semibold rounded-lg transition"
            >
              Update Assignment
            </button>
          </div> */}
            {/* Buttons */}
            <div className="flex gap-3">
              <Link to="/dashboard/my-assignments">
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
                Update Assignment
              </button>
            </div>
          </form>
        </div>

        {/* Animation Section */}
        <div className="xl:w-[50%] -order-1 xl:order-1 flex-1">
          <Lottie animationData={assignmentCreate} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default UpdateAssignment;
