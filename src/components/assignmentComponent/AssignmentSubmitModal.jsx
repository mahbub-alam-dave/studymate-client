import React, { useState } from 'react';

const AssignmentSubmitModal = ({closeModal, openModal, submitAssignment}) => {

  const [submittedData, setSubmittedData] = useState({
    docUrl: "",
    message: ""
  });

      const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmittedData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmitAssignment = e => {
    e.preventDefault()
    submitAssignment(submittedData);
    closeModal();
    setSubmittedData({ docUrl: "", message: "" });
  }

  if (!openModal) return null;

    return (
<div className="w-full bg-gradient-to-br from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] flex items-center justify-center  z-50">
      <div className="bg-gradient-to-br from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] border border-gray-200 dark:border-[#03045e] rounded-xl p-6 w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white">Submit Your Assignment</h2>
        <form onSubmit={handleSubmitAssignment} className="space-y-3">
          <input
            type="url"
            name="docUrl"
            placeholder="Enter doc url"
            value={submittedData.url}
            onChange={handleChange}
            className="input input-bordered w-full bg-transparent focus:outline-none border-gray-200 dark:border-[#03045e]"
            required
          />
          <textarea
            name="message"
            placeholder="Enter your message"
            value={submittedData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-transparent focus:outline-none border-gray-200 dark:border-[#03045e]"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline bg-[#FF3F33] dark:bg-[#8E1616] text-white  shadow-none hover:bg-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-[#4ED7F1] dark:bg-[#03045e] shadow-none text-white hover:text-white hover:bg-transparent"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default AssignmentSubmitModal;