import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const PendingAssignmentCard = ({
  openModal,
  assignment,
  closeModal,
  setPendingAssignments,
  pendingAssignments
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
        const remainingAssignments = pendingAssignments.filter(pendingAssignment => pendingAssignment._id !== assignment._id)
        setPendingAssignments(remainingAssignments)
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Evaluated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          closeModal()
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
    <div className="fixed inset-0 bg-gradient-to-t from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] text-white flex justify-center flex-col gap-8 items-center z-50">
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
            <span className="font-semibold">Examiner's Message: </span>
            {assignment.message}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="font-semibold text-lg break-all">
            Examiner's Feedback Form
          </span>
          <form onSubmit={handleSubmitMarks}>
            <fieldset className="fieldset bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] border-gray-200 dark:border-[#03045e] shadow-xl rounded-box border p-4">
              <label className="label">Marks</label>
              <input
                type="number"
                name="marks"
                className="input w-full bg-transparent border-gray-200 dark:border-[#03045e] focus:outline-none "
                placeholder="Enter marks here"
                required
              />
              <label className="label">Feedback</label>
              <textarea
                type="text"
                name="feedback"
                className="textarea w-full bg-transparent border-gray-200 dark:border-[#03045e] focus:outline-none"
                placeholder="Enter feedback here"
                required
              />
              <div className="flex gap-2 items-center mt-2">
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="btn bg-[#FF3F33] dark:bg-[#8E1616] text-white shadow-none hover:text-white hover:bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" btn bg-[#4ED7F1] dark:bg-[#03045e] shadow-none text-white hover:text-white hover:bg-transparent"
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
