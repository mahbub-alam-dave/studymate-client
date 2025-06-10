import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import AssignmentCard from '../../components/assignmentComponent/AssignmentCard';

const Assignments = () => {
    const allAssignments = useLoaderData()
    // console.log(assignments)
    const [assignments, setAssignments] = useState(allAssignments)

    useEffect(() => {
        setAssignments(allAssignments)
    }, [allAssignments])
    return (
        <div className='py-12 px-4 sm:px-6'>
                  <h2 className="text-2xl md:text-3xl font-bold text-center pb-12">
        All Assignments
      </h2>
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-5 max-w-[1320px] mx-auto'>
            {
                assignments.map(assignment => <AssignmentCard
                    key={assignment._id}
                    assignment={assignment}
                    assignments={assignments}
                    setAssignments={setAssignments}/>)
            }
            </div>
        </div>
    );
};

export default Assignments;