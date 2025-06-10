import React from "react";

const FrequentQuestionSection = () => {
  return (
    <div className="max-w-[1320px] mx-auto py-12 flex flex-col gap-12 p-4 sm:p-5 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-4">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            What is Study Mate?
          </div>
          <div className="collapse-content text-sm">
            Study Mate is an online group study related web application. Any
            student can join at study and enjoy learning with their friends
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Is it free to use the app?
          </div>
          <div className="collapse-content text-sm">
            Study Mate is totally free of coast. Study Mate doesn't run any paid
            subscription model
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Do I have to register on the app?
          </div>
          <div className="collapse-content text-sm">
            Yes, To get all the access of our services, you must register or log
            in to our application
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentQuestionSection;
