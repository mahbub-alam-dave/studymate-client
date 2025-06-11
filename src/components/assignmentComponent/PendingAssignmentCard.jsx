import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const PendingAssignmentCard = ({
  openModal,
  assignment,
  closeModal,
  handlePendingAssignment,
}) => {
  const handleSubmitMarks = (e) => {
    e.preventDefault();

    const marks = e.target.marks.value;
    const feedback = e.target.feedback.value;
    const evaluatedAssignment = { marks, feedback, status: "completed" };

    console.log(evaluatedAssignment);
    // update submitted assignment to the database
    axios
      .patch(
        `http://localhost:3000/my-submitted-assignments/${assignment._id}`,
        evaluatedAssignment
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Evaluated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
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
  if (!openModal) return null;
  return (
    <div className="fixed inset-0 px-4 md:px-6 bg-[var(--color-secondary)] flex pt-12 md:p-16 flex-col gap-8 items-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Assignment Evaluation Form
      </h2>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-8 ">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-lg break-all">
            Examinee's Submission
          </span>
          <span>
            <span className="font-semibold">Doc link:</span>{" "}
            <a
              href={assignment.docUrl}
              className="break-words break-all underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {assignment.docUrl}
            </a>
          </span>
          <p>
            <span className="font-semibold">Message: </span>
            {assignment.message}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="font-semibold text-lg break-all">
            Examiner's Feedback Form
          </span>
          <form onSubmit={handleSubmitMarks}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Marks</label>
              <input
                type="number"
                name="marks"
                className="input w-full"
                placeholder="Enter marks here"
                required
              />
              <label className="label">Feedback</label>
              <textarea
                type="text"
                name="feedback"
                className="textarea w-full"
                placeholder="Enter feedback here"
                required
              />
              <div className="flex gap-2 items-center mt-2">
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" btn text-[#e9e9e9] bg-[var(--color-primary)]"
                >
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PendingAssignmentCard;
