import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContextValue } from "../../Contextes/AllContexts";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const CreateAssignments = () => {
  const { user } = useContext(ContextValue);
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const handleCreateAssignmentForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const assignmentInfo = Object.fromEntries(formData.entries());

    if(assignmentInfo.description.length < 20) {
      setError("Description should be at least 20 characters")
      return
    }

    const newAssignment = {
      ...assignmentInfo,
      author: user?.displayName,
      email: user?.email,
    };

    // create assignment and store to the database
    axios
      .post("http://localhost:3000/assignments", newAssignment)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment created Successfully",
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
    <div className="px-4 sm:px-6 py-12 ">
      <div className="flex flex-col gap-8 justify-center max-w-[799px] w-full mx-auto bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] border border-white dark:border-[#03045e] rounded-2xl px-4 sm:px-6 py-8 shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-200">
        Create An Assignment
      </h2>
        <form onSubmit={handleCreateAssignmentForm}>
          <fieldset className="fieldset text-white">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input w-full bg-transparent border-white dark:border-[#03045e] focus:outline-none"
              placeholder="Assignment title"
              required
            />

            <label className="label mt-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="input w-full bg-transparent border-white dark:border-[#03045e] focus:outline-none"
              placeholder="Thumbnail image url"
              required
            />

            <label className="label mt-2">Marks</label>
            <input
              type="number"
              className="input w-full bg-transparent border-white dark:border-[#03045e] focus:outline-none no-spinner"
              name="marks"
              placeholder="Enter marks"
              required
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Difficulty Label</label>
                <select className="select w-full bg-transparent text-white border-white dark:border-[#03045e] focus:outline-none" name="level">
                  <option className="bg-[#00b4d8]" disabled={true}>Select difficulty label</option>
                  <option className="bg-[#00b4d8]" value="Easy">Easy</option>
                  <option className="bg-[#00b4d8]" value='Medium'>Medium</option>
                  <option className="bg-[#00b4d8]" value="Hard">Hard</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Due date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  name="dueDate"
                  className="input w-full bg-transparent border-white dark:border-[#03045e] focus:outline-none"
                />
              </div>
            </div>

            <label className="label mt-2">Description</label>
            <textarea
              type="text"
              className="textarea w-full bg-transparent border-white dark:border-[#03045e] focus:outline-none"
              name="description"
              placeholder="Enter assignment description"
              required
            />
            <span className="text-[#FF3F33]">{error}</span>
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-4">
            <Link to={'/'}>
            <button
              
              className="btn bg-[#FF3F33] dark:bg-[#8E1616] text-white shadow-none hover:text-white hover:bg-transparent"
            >
              Go Back
            </button>
            </Link>
            <button
              type="submit"
              className="btn bg-[#00b4d8] dark:bg-[#03045e] dark:hover:bg-[rgba(3,5,94,0.3)] transition-colors hover:text-gray-50 hover:bg-transparent border shadow-none text-white"
            >
              Create Assignment
            </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignments;


// https://i.ibb.co/ymFXS70p/math.jpg
// https://i.ibb.co/7dC5dRNJ/math-image.jpg
// https://i.ibb.co/9kLdn5xN/recipe.jpg
// https://i.ibb.co/QFnM8DGV/programming.jpg
// https://i.ibb.co/vvQ54cfY/engineering.jpg
