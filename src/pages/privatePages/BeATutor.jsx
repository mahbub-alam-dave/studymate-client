import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { ContextValue } from "../../Contextes/AllContexts";

const BeATutor = () => {
  const {user} = useContext(ContextValue);
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(user.photoURL || "https://i.ibb.co.com/kYjMzH0/user-5.png");
  const { register, handleSubmit, reset } = useForm();

  const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;
  const apiURL = import.meta.env.VITE_api_url; // e.g. http://localhost:5000/api

  // ✅ Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setPhotoURL(data.data.display_url);
        Swal.fire("Success", "Image uploaded successfully!", "success");
      } else {
        Swal.fire("Error", "Image upload failed.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle form submit
  const onSubmit = async (formData) => {
    if (!photoURL) {
      Swal.fire("Warning", "Please upload a profile photo first.", "warning");
      return;
    }

    const tutorData = {
      name: formData.name,
      email: user?.email,
      photo: photoURL,
      qualification: formData.qualification,
      expertise: formData.expertise,
      fee: formData.fee,
      description: formData.description,
      experience: formData.experience,
      availability: {
        weekdays: formData.weekdays,
        weekdayStartTime: formData.weekdayStartTime,
        weekdayEndTime: formData.weekdayEndTime,
        weekends: formData.weekends
      },
      role: "tutor",
      createdAt: new Date(),
    };

    const confirmed = await Swal.fire({
      title: "Confirm Submission",
      text: "Do you want to become a tutor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      const res = await axios.patch(`${apiURL}/users/${user?.email}`, tutorData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Your tutor profile has been created!", "success");
        reset();
        setPhotoURL(null);
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (error) {
      console.error("Error updating tutor profile:", error);
      Swal.fire("Error", "Failed to update tutor profile.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] shadow-md rounded-2xl p-8 xl:p-12 my-10">
      <h2 className="text-2xl font-bold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-6">Become a Tutor</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Photo Upload */}
        <div>
        {photoURL && (
            <img
              src={photoURL}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2 border border-[var(--color-border)]"
            />
          )}
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full mt-1 bg-transparent border border-[var(--color-border)]"
          />
          {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
          
        </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full mt-1 bg-transparent border border-[var(--color-border)]"
          />
        </div>

        {/* Email (auto-filled) */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full mt-1 bg-gray-100 dark:bg-gray-400"
          />
        </div>
        </div>

        {/* Educational Qualification */}
        <div>
          <label className="block font-medium">Educational Qualification</label>
          <input
            {...register("qualification", { required: true })}
            type="text"
            placeholder="e.g. BSc in Computer Science"
            className="input input-bordered w-full mt-1 bg-transparent border border-[var(--color-border)]"
          />
        </div>

        {/* Expertise (multiple) */}
<div>
  <label className="block font-medium mb-2">Expertise (Select one or more)</label>
  <div className="grid grid-cols-2 gap-3">
    {[
      "English",
      "Mathematics",
      "Web Development",
      "Literature",
      "Science",
      "Programming",
      "Physics"
    ].map((subject) => (
      <label key={subject} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          value={subject}
          {...register("expertise", { 
            required: "Please select at least one area of expertise" 
          })}
          className="checkbox checkbox-primary"
        />
        <span className="text-sm">{subject}</span>
      </label>
    ))}
  </div>
{/*   {errors.expertise && (
    <p className="text-sm text-error mt-1">{errors.expertise.message}</p>
  )} */}
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Fee */}
        <div>
          <label className="block font-medium">Monthly Fee (BDT)</label>
          <input
            {...register("fee", { required: true })}
            type="number"
            placeholder="e.g. 3000"
            className="input input-bordered w-full mt-1 bg-transparent border border-[var(--color-border)]"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium">Teaching Experience</label>
          <input
            {...register("experience")}
            type="text"
            placeholder="e.g. 2 years tutoring experience"
            className="input input-bordered w-full mt-1 bg-transparent border border-[var(--color-border)]"
          />
        </div>
</div>

        {/* Availability */}
<div className="space-y-4">
  <div>
    <label className="block font-medium mb-3">Availability</label>
    
    {/* Weekday Availability */}
    <div className="border border-base-300 rounded-lg p-4 mb-3">
      <h3 className="font-medium text-sm mb-3">Weekdays</h3>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {["Saturday", "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <label key={day} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={day}
                {...register("weekdays")}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">From</label>
            <input
              type="time"
              {...register("weekdayStartTime")}
              className="input input-sm input-bordered w-full bg-transparent border border-[var(--color-border)]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">To</label>
            <input
              type="time"
              {...register("weekdayEndTime")}
              className="input input-sm input-bordered w-full bg-transparent border border-[var(--color-border)]"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Weekend Availability */}
    <div className="border border-base-300 rounded-lg p-4">
      <h3 className="font-medium text-sm mb-3">Weekends</h3>
      <div className="space-y-3">
        <div className="flex gap-4">
          {["Saturday", "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <label key={day} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={day}
                {...register("weekends")}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description / Bio</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Tell students about your teaching style, achievements, etc."
            rows="4"
            className="textarea textarea-bordered w-full mt-1 bg-transparent border border-[var(--color-border)]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-gray-100 w-full mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeATutor;
