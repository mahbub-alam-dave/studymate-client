import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContextValue } from "../../Contextes/AllContexts";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";

const UpdateAssignment = () => {
  const assignment = useLoaderData();
  // console.log(assignment)
  const { user } = useContext(ContextValue);
  const [startDate, setStartDate] = useState(assignment.dueDate);
  const navigate = useNavigate()

  const handleUpdateAssignmentForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const assignmentInfo = Object.fromEntries(formData.entries());
    // console.log(assignmentInfo);
    // assignmentInfo.dueDate = startDate
    // update data to the server using axios (patch) method
    axios
      .patch(
        `http://localhost:3000/assignments/${assignment._id}`,
        assignmentInfo
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
          navigate('/assignments')
        }
       else if(res.data.matchedCount) {
                    Swal.fire({
            position: "top-end",
            icon: "info",
            title: "Assignment updated with the previous value",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/assignments')
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
    <div className="px-4 sm:px-6 py-12 flex flex-col gap-8 justify-center ">
      <h2 className="text-2xl md:text-3xl font-bold text-center dark:text-gray-200">
        Create An Assignment
      </h2>
      <div className="max-w-[799px] w-full mx-auto">
        <form onSubmit={handleUpdateAssignmentForm}>
          <fieldset className="fieldset bg-base-200 border-base-300 dark:bg-gray-800 dark:text-gray-200 rounded-box  border p-4 sm:p-6">
            <label className="label mt-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={assignment.title}
              className="input w-full dark:bg-gray-500"
              placeholder="Assignment title"
            />

            <label className="label mt-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={assignment.imageUrl}
              className="input w-full dark:bg-gray-500"
              placeholder="Thumbnail image url"
            />

            <label className="label mt-2">Marks</label>
            <input
              type="number"
              defaultValue={assignment.marks}
              className="input w-full dark:bg-gray-500"
              name="marks"
              placeholder="Enter marks"
            />

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Difficulty Label</label>
                <select
                  className="select w-full dark:bg-gray-500"
                  defaultValue={assignment.level}
                  name="level"
                >
                  <option disabled={true}>Select difficulty label</option>
                  <option value="Easy">Easy</option>
                  <option value='Medium'>Medium</option>
                  <option value="Hard">Hard</option>
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
                  className="input w-full dark:bg-gray-500"
                />
              </div>
            </div>

            <label className="label mt-2">Description</label>
            <textarea
              type="number"
              defaultValue={assignment.description}
              className="textarea w-full dark:bg-gray-500"
              name="description"
              placeholder="Enter assignment description"
            />
            <button
              type="submit"
              className="btn bg-[#00b4d8] dark:bg-[#03045e] text-[#e9e9e9] mt-4"
            >
              Submit Assignment
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;
