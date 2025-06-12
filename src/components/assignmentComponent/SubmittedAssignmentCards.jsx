import React, { use } from 'react';

const SubmittedAssignmentCards = ({mySubmittedAssignment}) => {
    const submittedAssignments = use(mySubmittedAssignment)
    // console.log(submittedAssignments)
    return (
        <div className='py-12 px-4 sm:px-5 md:px-6 flex flex-col gap-8 max-w-[1440px] mx-auto'>
            <h2 className='text-2xl md:text-3xl font-bold text-center dark:text-gray-200'>My Submitted Assignments</h2>
            <div className='flex flex-col gap-6 w-full'>
           {
            submittedAssignments.map((submittedAssignment, index) => {
                return(
                    <div key={submittedAssignment._id} className='w-full shadow-lg shadow-gray-400 dark:shadow-[#000814] bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] text-gray-200 border-[#00b4d8] dark:border-[#03045e] p-4 sm:p-6 flex flex-col gap-2 rounded-xl'>
                        <h2 className='font-bold text-xl sm:text-2xl md:text-3xl'>{index + 1}. {submittedAssignment?.title}</h2>
                        <h2 className='text-base'><span className='font-semibold'>Total Marks: </span> {submittedAssignment?.marks}</h2>
                        <h2 className='text-base'><span className='font-semibold'>Status: </span> {submittedAssignment?.status}</h2>
                        {
                            submittedAssignment?.examinerFeedback ?
                            <div>
                                <p><span className='font-semibold'>Obtained Marks:</span> {submittedAssignment?.obtainedMarks}</p>
                                <p><span className='font-semibold'>Examiner Feedback:</span> {submittedAssignment?.examinerFeedback}</p>

                            </div>
                            : 
                            <div>
                                <h2 className='text-[#ff5151] dark:text-[#e75050]'>No marks or feedback given yet !!</h2>
                            </div>
                        }
                    </div>
                )
            })
           } 
           </div>
        </div>
    );
};

export default SubmittedAssignmentCards;