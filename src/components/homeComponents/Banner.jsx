import React from 'react';

const Banner = () => {
    return (
        <div style={{
          backgroundImage: 'linear-gradient(to top right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.0)), url("https://i.ibb.co/ym6yYLGY/group-study-photo.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className='w-full min-h-[70vh] flex justify-center items-center'>
        <div className='max-w-[1440px] w-full mx-auto px-4 sm:px-5 md:px-6 py-12 sm:py-24 md:py-32 lg:py-44 xl-py-52 flex items-start'>
            {/* <h2>STUDY WITH STUDY MATE & GRAVE YOUR POTENTIAL </h2> */}
            <div className='flex flex-col gap-5'>
            <h2 className='text-3xl lg:text-4xl xl:text-5xl font-semibold md:leading-14 text-[var(--color-text-primary-dark)]'>Worrying to study with your mates,<br /> It is easy with Edu Mate</h2>
            {/* Worried about studying alone? It’s easy with Study Mate. */}
            <p className='text-[var(--color-text-secondary-dark)]'>Edu Mate make it easier to explore, take and throw challenges, collaborate with friends and so on. Don't forget to share with your friends. Study easy with fun</p>
            {/* <div className='w-full flex gap-4 flex-col sm:flex-row items-start'>
        <button className='btn sm:-order-1 text-white bg-[var(--color-primary)] border-none outline-none shadow-none'>Invite Now</button>
             </div> */}
                <form>
    {/* <h6 className="footer-title">Newsletter</h6> */}
    <fieldset className=" max-w-[80%] sm:max-w-[60%] md:max-w-[50%]">
      {/* <label>Enter your email address</label> */}
      <div className="join w-full">
        <input
          type="text"
          placeholder="username@site.com"
          className="input w-full input-bordered join-item bg-[var(--color-text-primary-dark)] dark:bg-[var(--color-text-secondary-dark)]" />
        <button className="btn text-[var(--color-text-primary-dark)] border-none rounded-tr-sm rounded-br-sm shadow-none join-item bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]">Subscribe</button>
      </div>
    </fieldset>
  </form>
            </div>
        </div>
        </div>
    );
};

export default Banner;