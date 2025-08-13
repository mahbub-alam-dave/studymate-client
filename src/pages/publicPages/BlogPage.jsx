import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const BlogPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const blogs = [
    {
      id: 1,
      title: "Mastering Time Management for Students",
      author: "Sarah Khan",
      date: "July 12, 2025",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      excerpt:
        "Learn practical tips and tools to manage your study schedule and boost productivity without burnout.",
    },
    {
      id: 2,
      title: "The Future of Online Learning",
      author: "James Parker",
      date: "June 25, 2025",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      excerpt:
        "Explore how technology is shaping the way students learn and collaborate in virtual classrooms.",
    },
    {
      id: 3,
      title: "How to Stay Motivated While Studying",
      author: "Ayesha Rahman",
      date: "May 18, 2025",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
      excerpt:
        "From setting goals to tracking progress, discover methods to keep your motivation high during the semester.",
    },
    {
      id: 4,
      title: "Building Effective Study Groups",
      author: "David Chen",
      date: "April 5, 2025",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      excerpt:
        "Collaboration can supercharge learning. Here’s how to form, manage, and benefit from study groups.",
    },
    {
      id: 5,
      title: "Balancing Work and Study Life",
      author: "Maria Lopez",
      date: "March 10, 2025",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      excerpt:
        "Working while studying? Learn how to balance both without sacrificing your health or grades.",
    },
    {
      id: 6,
      title: "Building Effective Study Groups",
      author: "David Chen",
      date: "April 5, 2025",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      excerpt:
        "Collaboration can supercharge learning. Here’s how to form, manage, and benefit from study groups.",
    },
    {
      id: 7,
      title: "The Future of Online Learning",
      author: "James Parker",
      date: "June 25, 2025",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      excerpt:
        "Explore how technology is shaping the way students learn and collaborate in virtual classrooms.",
    },
    {
      id: 8,
      title: "How to Stay Motivated While Studying",
      author: "Ayesha Rahman",
      date: "May 18, 2025",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
      excerpt:
        "From setting goals to tracking progress, discover methods to keep your motivation high during the semester.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Edumate Blogs</h2>
        <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Read the latest blogs published by the students on various study topic and enjoy reading</p>
      </div>
      {/* Blog Grid */}
      <main className=" grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition hover:scale-[1.02] duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                By {blog.author} • {blog.date}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{blog.excerpt}</p>
              <button className="mt-4 inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </main>
      </div>
    </div>
  );
};

export default BlogPage;
