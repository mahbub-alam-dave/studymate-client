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
<div className="fixed inset-0 bg-gray-600 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Submit Info</h2>
        <form onSubmit={handleSubmitAssignment} className="space-y-3">
          <input
            type="url"
            name="docUrl"
            placeholder="Enter URL"
            value={submittedData.url}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Enter your message"
            value={submittedData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-[var(--color-primary)] text-white"
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