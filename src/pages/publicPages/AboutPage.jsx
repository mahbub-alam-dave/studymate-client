import React from "react";
import { FaUsers, FaChalkboardTeacher, FaTasks, FaGlobe } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="w-full text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
      {/* Hero Section */}
      <section className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] py-16 text-center px-4 sm:px-5 md:px-6 ">
        <h1 className="text-3xl font-bold mb-4">About <span className="text-[var(--color-primary)]">Edumate</span></h1>
        <p className="max-w-2xl mx-auto text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          Your digital companion for learning, collaboration, and growth.  
          At Edumate, we connect students, educators, and opportunities in one seamless platform.
        </p>
      </section>

      {/* Mission & Vision */}
      <div className="px-4 sm:px-5 md:px-6">
      <section className="py-16 grid gap-10 md:grid-cols-2 max-w-[1440px] mx-auto">
        <div className="p-6 border rounded-2xl bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] shadow">
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            To make education accessible, engaging, and personalized for every learner —  
            no matter where they are. Edumate empowers students to stay on top of assignments,  
            collaborate effectively, and achieve their academic goals.
          </p>
        </div>
        <div className="p-6 border rounded-2xl bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] shadow">
          <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            To become the go-to platform for students worldwide,  
            bridging the gap between traditional classrooms and the modern digital world.
          </p>
        </div>
      </section>
      </div>

      {/* Features */}
      <section className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] py-16 px-4 sm:px-5 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Edumate?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            { icon: <FaTasks size={30} />, title: "Assignment Tracking", desc: "Stay updated on pending, submitted, and graded assignments." },
            { icon: <FaChalkboardTeacher size={30} />, title: "Collaboration Tools", desc: "Work with peers and get feedback from educators easily." },
            { icon: <FaUsers size={30} />, title: "Student Community", desc: "Connect with learners worldwide and grow together." },
            { icon: <FaGlobe size={30} />, title: "Learn Anywhere", desc: "Access your study materials anytime, on any device." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 text-center border rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4 text-[var(--color-primary)]">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <div className="px-4 sm:px-5 md:px-6 w-full">
      <section className="py-16 max-w-[1440px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            { name: "Mahbub Alam", role: "Founder & Lead Developer", img: "https://i.ibb.co/FLrrTVtL/man.png" },
            { name: "Jane Doe", role: "UI/UX Designer", img: "https://i.ibb.co/FLrrTVtL/man.png" },
            { name: "John Smith", role: "Backend Engineer", img: "https://i.ibb.co/FLrrTVtL/man.png" }
          ].map((member, idx) => (
            <div key={idx} className="text-center p-6 border rounded-xl bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] shadow">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* Call To Action */}
      <section className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] py-12 text-center text-[var(--color-text-primary-dark)]">
        <h2 className="text-3xl font-bold mb-4">Join Edumate Today</h2>
        <p className="mb-6">Be part of a growing community that learns, collaborates, and succeeds together.</p>
        <a
          href="/register"
          className="px-6 py-3 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] rounded-lg font-medium shadow hover:shadow-lg transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
