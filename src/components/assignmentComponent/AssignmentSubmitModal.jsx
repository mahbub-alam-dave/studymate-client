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
<div className="fixed inset-0 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] flex items-center justify-center px-4 sm:px-5 md:px-5 z-50">
      <div className="bg-[var(--color-bg-card)] dark:bg-gray-900  rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">Submit Your Assignment</h2>
        <form onSubmit={handleSubmitAssignment} className="space-y-3">
          <input
            type="url"
            name="docUrl"
            placeholder="Enter doc url"
            value={submittedData.url}
            onChange={handleChange}
            className="input input-bordered w-full bg-transparent focus:outline-none border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
            required
          />
          <textarea
            name="message"
            placeholder="Enter your message"
            value={submittedData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-transparent focus:outline-none border-[var(--color-border)] dark:border-[var(--color-border-dark)] "
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-none hover:bg-[#e4e2e29a] dark:hover:bg-[#e4e2e210]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] dark:hover:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:opacity-90"
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