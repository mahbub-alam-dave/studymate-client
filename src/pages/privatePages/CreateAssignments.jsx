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
      .post(`${import.meta.env.VITE_api_url}/assignments`, newAssignment)
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
      <div className="flex flex-col gap-8 justify-center max-w-[799px] w-full mx-auto text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl px-4 sm:px-6 py-8 shadow-xl ">
      <h2 className="text-2xl md:text-3xl font-bold text-center ">
        Create An Assignment
      </h2>
        <form onSubmit={handleCreateAssignmentForm}>
          <fieldset className="fieldset">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              placeholder="Assignment title"
              required
            />

            <label className="label mt-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              placeholder="Thumbnail image url"
              required
            />

            <label className="label mt-2">Marks</label>
            <input
              type="number"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none no-spinner"
              name="marks"
              placeholder="Enter marks"
              required
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="label">Difficulty Label</label>
                <select className="select w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none" name="level">
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
                  className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
                />
              </div>
            </div>

            <label className="label mt-2">Description</label>
            <textarea
              type="text"
              className="textarea w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              name="description"
              placeholder="Enter assignment description"
              required
            />
            <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">{error}</span>
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-4">
            <Link to={'/'}>
            <button
              
              className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary)] text-[var(--color-text-primary-dark)] shadow-none hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)]  hover:bg-transparent"
            >
              Go Back
            </button>
            </Link>
            <button
              type="submit"
              className="btn bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-dark)] transition-colors hover:bg-transparent hover:text-[var(--color-text-primary)] border shadow-none dark:hover:text-[var(--color-text-primary-dark)]"
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
