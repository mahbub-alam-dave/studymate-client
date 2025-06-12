import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContextValue } from "../../Contextes/AllContexts";
import Swal from "sweetalert2";

const CreateAssignments = () => {
  const { user } = useContext(ContextValue);

  const [startDate, setStartDate] = useState(new Date());
  const handleCreateAssignmentForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const assignmentInfo = Object.fromEntries(formData.entries());

    const newAssignment = {
      ...assignmentInfo,
      status: "pending",
      author: user?.displayName,
      email: user?.email,
    };
    console.log(newAssignment);

    // create assignment and store to the database
    axios
      .post("http://localhost:3000/assignments", newAssignment)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: {error},
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="px-4 sm:px-6 py-12 ">
      <div className="flex flex-col gap-8 justify-center max-w-[799px] w-full mx-auto bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] border border-[#00b4d8] dark:border-[#03045e] rounded-2xl px-4 sm:px-6 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-200 ">
        Create An Assignment
      </h2>
        <form onSubmit={handleCreateAssignmentForm}>
          <fieldset className="fieldset text-gray-200 ">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              placeholder="Assignment title"
            />

            <label className="label mt-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              placeholder="Thumbnail image url"
            />

            <label className="label mt-2">Marks</label>
            <input
              type="number"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              name="marks"
              placeholder="Enter marks"
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Difficulty Label</label>
                <select className="select w-full bg-transparent text-gray-500 border-[#00b4d8] dark:border-[#03045e] focus:outline-none" name="level">
                  <option disabled={true}>Select difficulty label</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Due date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  name="dueDate"
                  className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
                />
              </div>
            </div>

            <label className="label mt-2">Description</label>
            <textarea
              type="number"
              className="textarea w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              name="description"
              placeholder="Enter assignment description"
            />
            <button
              type="submit"
              className="btn hover:bg-[rgba(0,180,216,0.31)] dark:hover:bg-[rgba(3,5,94,0.3)] transition-colors hover:text-gray-50 bg-transparent mt-4 border-[#00b4d8] dark:border-[#03045e] shadow-none text-gray-200"
            >
              Submit Assignment
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignments;
