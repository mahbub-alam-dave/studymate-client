import React from "react";

const FrequentQuestionSection = () => {
  return (
    <div className="px-4 sm:px-5 md:px-6">
    <div className="max-w-[1440px] w-full mx-auto pb-12 flex flex-col gap-12 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
      <div className="space-y-4">
        <h2 className=" text-2xl md:text-3xl font-bold text-center ">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-center text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Here are some questions what we frequently getting asked by our new users</p>
      </div>
      <div className="flex flex-col gap-6 pb-6">
        <div className="collapse collapse-arrow bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]">
          {/* border border-[var(--color-border)] dark:border-[var(--color-border-dark)] */}
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold text-xl">
            {/* #F1F5F9;#0A0A23 */}
            {/* #4a5565;#CBD5E0 */}
            What is Study Mate?
          </div>
          <div className="collapse-content text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            Study Mate is an online group study related web application. Any
            student can join at study and enjoy learning with their friends
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-xl ">
            Is it free to use the app?
          </div>
          <div className="collapse-content text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            Study Mate is totally free of coast. Study Mate doesn't run any paid
            subscription model
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] ">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-xl ">
            Do I have to register on the app?
          </div>
          <div className="collapse-content text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            Yes, To get all the access of our services, you must register or log
            in to our application
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-xl">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-xl ">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FrequentQuestionSection;
