import React from 'react';
import { MdSwitchAccount, MdCreateNewFolder, MdDashboard  } from "react-icons/md";
// import { MdCreateNewFolder } from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const FeatureSection = () => {
    return (
        <div className='my-12 sm:my-16 flex flex-col gap-12 justify-center items-center max-w-[1320px] mx-auto p-4 sm:p-5 md:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold text-center'>Our Latest Features</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
                <div className='bg-[var(--color-primary)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3 text-[#e9e9e9]'>
                    <MdSwitchAccount size={32}/>
                    <h2 className='font-bold text-2xl'>Quick Sign Up</h2>
                    <p>Create your free Study Mate account in seconds and join a growing student community.</p>
                </div>
                <div className='bg-[var(--color-primary)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3 text-[#e9e9e9]'>
                    <SiCompilerexplorer size={32}/>
                    <h2 className='font-bold text-2xl'>Explore Study Mate</h2>
                    <p>Browse through a library of assignments, quizzes, and resources shared by fellow learners.</p>
                </div>
                <div className='bg-[var(--color-primary)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3 text-[#e9e9e9]'>
                    <GiProgression size={32}/>
                    <h2 className='font-bold text-2xl'>Participate & Progress</h2>
                    <p>Take part in assignments, test your skills, and track your learning milestones with ease.</p>
                </div>
                <div className='bg-[var(--color-primary)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3 text-[#e9e9e9]'>
                    <MdCreateNewFolder size={32}/>
                    <h2 className='font-bold text-2xl'>Create New Assignments</h2>
                    <p>Design and share assignments for your classmates or study groups to solve and learn together.</p>
                </div>
                <div className='bg-[var(--color-primary)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3 text-[#e9e9e9]'>
                    <MdDashboard size={32}/>
                    <h2 className='font-bold text-2xl'>Personalized Dashboard</h2>
                    <p>Manage your profile, monitor your progress, and keep all your study activities in one place.</p>
                </div>
                <div className='bg-[var(--color-primary)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3 text-[#e9e9e9]'>
                    <IoChatbubbleEllipsesSharp size={32}/>
                    <h2 className='font-bold text-2xl'>Group Discussions</h2>
                    <p>Connect with study partners, exchange ideas, and stay motivated through group chats.</p>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;