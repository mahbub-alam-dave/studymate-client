import React from 'react';
import { MdSwitchAccount, MdCreateNewFolder, MdDashboard  } from "react-icons/md";
// import { MdCreateNewFolder } from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { motion } from "motion/react"
import { Fade } from 'react-awesome-reveal';

// bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8]

const FeatureSection = () => {
    return (
        <div className='my-12 sm:my-16 flex flex-col gap-12 justify-center items-center max-w-[1440px] w-full mx-auto p-4 sm:p-5 md:p-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]'>
            <div className='space-y-3'>
                <h2 className='text-2xl md:text-3xl font-bold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]'>Our Latest Features</h2>
                <p className='text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Explore our latest features, enjoy learning with zero percent of distractions</p>

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
                <motion.div
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 100 }}
                className='bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3'>
                    <MdSwitchAccount size={32} />
                    <h2 className='font-bold text-2xl'>Quick Sign Up</h2>
                    <p className='text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Create your free Study Mate account in seconds and join a growing student community.</p>
                </motion.div>
                <motion.div
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 100 }}
                className='bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3'>
                    <SiCompilerexplorer size={32}/>
                    <h2 className='font-bold text-2xl'>Explore Study Mate</h2>
                    <p className='text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Browse through a library of assignments, quizzes, and resources shared by fellow learners.</p>
                </motion.div>
                <motion.div
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 100 }}
                className='bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3'>
                    <GiProgression size={32}/>
                    <h2 className='font-bold text-2xl'>Participate & Progress</h2>
                    <p className='text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Take part in assignments, test your skills, and track your learning milestones with ease.</p>
                </motion.div>
                <motion.div
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 100 }}
                className='bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3'>
                    <MdCreateNewFolder size={32}/>
                    <h2 className='font-bold text-2xl'>Create New Assignments</h2>
                    <p className='text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Design and share assignments for your classmates or study groups to solve and learn together.</p>
                </motion.div>
                <motion.div
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 100 }}
                className='bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3'>
                    <MdDashboard size={32}/>
                    <h2 className='font-bold text-2xl'>Personalized Dashboard</h2>
                    <p className='text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Manage your profile, monitor your progress, and keep all your study activities in one place.</p>
                </motion.div>

                <motion.div
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 100 }}
                className='bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] p-4 lg:p-5 xl:p-6 rounded-2xl flex flex-col gap-3'>
                    <IoChatbubbleEllipsesSharp size={32}/>
                    <h2 className='font-bold text-2xl'>Group Discussions</h2>
                    <p className='text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Connect with study partners, exchange ideas, and stay motivated through group chats.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default FeatureSection;