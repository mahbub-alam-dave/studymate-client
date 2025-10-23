import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { ContextValue } from "../../Contextes/AllContexts";

const BeATutor = () => {
  const {user} = useContext(ContextValue);
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(user.photoURL || "https://i.ibb.co.com/kYjMzH0/user-5.png");
  const { register, handleSubmit, reset, watch } = useForm();

     const watchSessionTypes = watch("sessionTypes") || [];
  const sessionTypesArray = Array.isArray(watchSessionTypes) ? watchSessionTypes : [];

  const [personalSlots, setPersonalSlots] = useState([]);
  const [batchSlots, setBatchSlots] = useState([]);
  const [personalSlotName, setPersonalSlotName] = useState("");
  const [personalSlotTime, setPersonalSlotTime] = useState("");
  const [batchSlotName, setBatchSlotName] = useState("");
  const [batchSlotTime, setBatchSlotTime] = useState("");

  // Add personal slot
  const addPersonalSlot = () => {
    if (personalSlotName && personalSlotTime) {
      const newSlot = {
        id: Date.now(),
        name: personalSlotName,
        time: personalSlotTime,
        bookedCount: 0
      };
      setPersonalSlots([...personalSlots, newSlot]);
      setPersonalSlotName("");
      setPersonalSlotTime("");
    } else {
      Swal.fire("Warning", "Please enter both slot name and time.", "warning");
    }
  };

  // Remove personal slot
  const removePersonalSlot = (id) => {
    setPersonalSlots(personalSlots.filter(slot => slot.id !== id));
  };

  // Add batch slot
  const addBatchSlot = () => {
    if (batchSlotName && batchSlotTime) {
      const newSlot = {
        id: Date.now(),
        name: batchSlotName,
        time: batchSlotTime,
        bookedCount: 0
      };
      setBatchSlots([...batchSlots, newSlot]);
      setBatchSlotName("");
      setBatchSlotTime("");
    } else {
      Swal.fire("Warning", "Please enter both batch name and time.", "warning");
    }
  };

    // Remove batch slot
  const removeBatchSlot = (id) => {
    setBatchSlots(batchSlots.filter(slot => slot.id !== id));
  };

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
         sessionTypes: formData.sessionTypes || [],
      sessions: {
        personal: {
          enabled: formData.sessionTypes?.includes("personal"),
          slots: personalSlots,
          fee: formData.personalFee || 0,
          maxStudents: 1
        },
        batch: {
          enabled: formData.sessionTypes?.includes("batch"),
          slots: batchSlots,
          fee: formData.batchFee || 0,
          maxStudents: formData.batchMaxStudents || 10
        }
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
      const res = await axios.patch(`${apiURL}/api/users/${user?.email}`, tutorData);
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

  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM"
  ];

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

        {/* Session Types */}
        <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Session Booking Configuration</h3>
          
          {/* Session Type Selection */}
          <div>
            <label className="block font-medium mb-3">Available Session Types</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value="personal"
                  {...register("sessionTypes")}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm font-medium">Personal Coaching (1-on-1)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value="batch"
                  {...register("sessionTypes")}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm font-medium">Batch Coaching (Group)</span>
              </label>
            </div>
          </div>

          {/* Personal Coaching Settings */}
          {sessionTypesArray.includes("personal") && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Personal Coaching Settings</h4>
              
              <div>
                <label className="block font-medium mb-2">Session Fee (BDT per hour)</label>
                <input
                  {...register("personalFee", { required: sessionTypesArray.includes("personal") })}
                  type="number"
                  placeholder="e.g. 500"
                  className="input input-bordered w-full bg-transparent border border-[var(--color-border)]"
                />
              </div>

              <div>
                <label className="block font-medium mb-3">Available Time Slots</label>
                
                {/* Add New Slot Form */}
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-[var(--color-border)] mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Slot Name</label>
                      <input
                        type="text"
                        value={personalSlotName}
                        onChange={(e) => setPersonalSlotName(e.target.value)}
                        placeholder="e.g. Morning Session"
                        className="input input-sm input-bordered w-full bg-transparent border border-[var(--color-border)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Time</label>
                      <input
                        type="text"
                        value={personalSlotTime}
                        onChange={(e) => setPersonalSlotTime(e.target.value)}
                        placeholder="e.g. 8:00 AM - 9:00 AM"
                        className="input input-sm input-bordered w-full bg-transparent border border-[var(--color-border)]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addPersonalSlot}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white mt-2 w-full"
                  >
                    + Add Slot
                  </button>
                </div>

                {/* Display Added Slots */}
                {personalSlots.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 border border-[var(--color-border)] rounded">
                    {personalSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="font-semibold text-sm">{slot.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({slot.time})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePersonalSlot(slot.id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic p-2">No slots added yet. Add your first slot above.</p>
                )}
              </div>
            </div>
          )}

          {/* Batch Coaching Settings */}
          {sessionTypesArray.includes("batch") && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-green-700 dark:text-green-300">Batch Coaching Settings</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Session Fee (BDT per student per hour)</label>
                  <input
                    {...register("batchFee", { required: sessionTypesArray.includes("batch") })}
                    type="number"
                    placeholder="e.g. 300"
                    className="input input-bordered w-full bg-transparent border border-[var(--color-border)]"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Max Students per Batch</label>
                  <input
                    {...register("batchMaxStudents")}
                    type="number"
                    placeholder="e.g. 10"
                    defaultValue={10}
                    className="input input-bordered w-full bg-transparent border border-[var(--color-border)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-3">Available Batches</label>
                
                {/* Add New Batch Form */}
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-[var(--color-border)] mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Batch Name</label>
                      <input
                        type="text"
                        value={batchSlotName}
                        onChange={(e) => setBatchSlotName(e.target.value)}
                        placeholder="e.g. Super-6"
                        className="input input-sm input-bordered w-full bg-transparent border border-[var(--color-border)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Time</label>
                      <input
                        type="text"
                        value={batchSlotTime}
                        onChange={(e) => setBatchSlotTime(e.target.value)}
                        placeholder="e.g. 8:00 AM - 9:00 AM"
                        className="input input-sm input-bordered w-full bg-transparent border border-[var(--color-border)]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addBatchSlot}
                    className="btn btn-sm bg-green-500 hover:bg-green-600 text-white mt-2 w-full"
                  >
                    + Add Batch
                  </button>
                </div>

                {/* Display Added Batches */}
                {batchSlots.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 border border-[var(--color-border)] rounded">
                    {batchSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="font-semibold text-sm">{slot.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({slot.time})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBatchSlot(slot.id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic p-2">No batches added yet. Add your first batch above.</p>
                )}
              </div>
            </div>
          )}

          {!sessionTypesArray.length && (
            <p className="text-sm text-gray-500 italic">Please select at least one session type to configure booking options.</p>
          )}
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
