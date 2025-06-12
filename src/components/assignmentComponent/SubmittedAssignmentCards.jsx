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
                    <div key={submittedAssignment._id} className='w-full shadow dark:shadow-gray-50 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-200 p-4 flex flex-col gap-2 rounded-xl'>
                        <h2 className='font-bold text-xl md:text-2xl'>{index + 1}. {submittedAssignment?.title}</h2>
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
                                <h2 className='text-red-600'>No marks or feedback given yet !!</h2>
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