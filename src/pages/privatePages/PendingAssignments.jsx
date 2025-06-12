import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import PendingAssignmentCard from '../../components/assignmentComponent/PendingAssignmentCard';

const PendingAssignments = () => {
    const pendingSubmittedAssignments = useLoaderData()
    const [openModal, setOpenModal] = useState(false)
    // console.log(pendingSubmittedAssignments)

    const handlePendingAssignment = () => {
        console.log("pending assignment btn")
    }
    return (
        <div className='py-12 px-4 sm:px-5 md:px-6 flex flex-col gap-8 max-w-[1440px] mx-auto'>
            <h2 className='text-2xl lg:text-3xl font-bold text-center dark:text-gray-200'>All Pending Assignments</h2>
            <div className='flex flex-col gap-4'>
                {
                    pendingSubmittedAssignments.map((assignment, index) => {
                        return(
                            <div key={assignment._id} className='shadow border p-4 rounded-xl flex flex-col gap-2 items-start border-gray-200 dark:border-base-300  bg-[#caf0f8] dark:bg-gray-800 text-black dark:text-[#e9e9e9]'>
                                <span className='bg-[#ff7d00] p-1 rounded-[2px]'>{index +1}. </span>
                                <h2 className='text-2xl sm:text-3xl font-bold'><span className=' '></span>{assignment.title}</h2>
                                <p className='text-base sm:text-lg'><span className='font-bold'>Marks: </span> {assignment.marks}</p>
                                <p className='text-base sm:text-lg'><span className='font-bold'>Examinee Name: </span> {assignment.examineeName}</p>
                                <button onClick={()=> setOpenModal(true)} className='btn bg-[var(--color-buttonBg)] text-[var(--color-buttonText)] text-base sm:text-lg'>Evaluate </button>
                                <PendingAssignmentCard 
                                openModal={openModal}
                                closeModal={() => setOpenModal(false)}
                                assignment ={assignment}
                                handlePendingAssignment={handlePendingAssignment}
                                 />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PendingAssignments;