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
        <div className='py-12 px-4 sm:px-5 md:px-6 flex flex-col gap-8 max-w-[880px] mx-auto'>
            <h2 className='text-2xl lg:text-3xl font-bold text-center'>All Pending Assignments</h2>
            <div className='flex flex-col gap-4'>
                {
                    pendingSubmittedAssignments.map((assignment, index) => {
                        return(
                            <div key={assignment._id} className='border p-4 rounded-2xl flex flex-col gap-2 items-start'>
                                <span className='bg-green-500 p-1 rounded-[2px]'>{index +1}. </span>
                                <h2><span className='font-bold'> Assignment Title: </span>{assignment.title}</h2>
                                <p><span className='font-bold'>Marks: </span> {assignment.marks}</p>
                                <p><span className='font-bold'>Examinee: </span> {assignment.examineeName}</p>
                                <button onClick={()=> setOpenModal(true)} className='btn'>Give Mark</button>
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