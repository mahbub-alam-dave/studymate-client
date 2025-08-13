import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Link, useLoaderData, useNavigate } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
import assignmentCreate from "../../assets/OnlineWork.json"
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
    // update data to the server using axios (patch) method
    axios
      .patch(
        `${import.meta.env.VITE_api_url}/${assignment._id}`,
        assignmentInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/assignments");
        } else if (res.data.matchedCount) {
          Swal.fire({
            position: "top-end",
            icon: "info",
            title: "Assignment updated with the previous value",
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
    <div className="py-12 flex flex-col md:flex-row">
      <div className="flex flex-col gap-8 justify-center max-w-[799px] w-full mx-auto text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl px-4 sm:px-6 py-8 shadow-xl ">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Update Assignment
        </h2>
        <form onSubmit={handleUpdateAssignmentForm}>
          <fieldset className="fieldset ">
            <label className="label mt-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={assignment.title}
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              placeholder="Assignment title"
              required
            />

            <label className="label mt-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={assignment.imageUrl}
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              placeholder="Thumbnail image url"
              required
            />

            <label className="label mt-2">Marks</label>
            <input
              type="number"
              defaultValue={assignment.marks}
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none no-spinner"
              name="marks"
              placeholder="Enter marks"
              required
            />

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Difficulty Label</label>
                <select
                  className="select w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
                  defaultValue={assignment.level}
                  name="level"
                >
                  <option className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]" disabled={true}>
                    Select difficulty label
                  </option>
                  <option className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]" value="Easy">
                    Easy
                  </option>
                  <option className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]" value="Medium">
                    Medium
                  </option>
                  <option className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]" value="Hard">
                    Hard
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Due date</label>
                {/* <input
              type="number"
              className="input w-full"
              name="dueDate"
              placeholder="Due date"
            /> */}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  name="dueDate"
                  className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
                />
              </div>
            </div>

            <label className="label mt-2">Description</label>
            <textarea
              type="text"
              defaultValue={assignment.description}
              className="textarea w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              name="description"
              placeholder="Enter assignment description"
              required
            />
            <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">{error}</span>
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-4">
              <Link to={"/assignments"}>
                <button className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary)] text-[var(--color-text-primary-dark)] shadow-none hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)]  hover:bg-transparent">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="btn bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-dark)] transition-colors hover:bg-transparent hover:text-[var(--color-text-primary)] border shadow-none dark:hover:text-[var(--color-text-primary-dark)]"
              >
                Update Assignment
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="lg:w-[50%] ">
                  <Lottie animationData={assignmentCreate} loop={true} />
                </div>
    </div>
  );
};

export default UpdateAssignment;
