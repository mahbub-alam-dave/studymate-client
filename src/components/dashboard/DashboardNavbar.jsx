import { FaBars } from "react-icons/fa";

const DashboardNavbar = ({ openSidebar }) => {
  return (
    <div className="lg:hidden flex items-center gap-6 bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] p-6 border-b">
      <button onClick={openSidebar}>
        <FaBars size={22} />
      </button>
      {/* <div className="text-xl font-bold p-6 border-b border-[var(--color-border)] dark:border[var(--color-border-dark)]">StudyMate</div> */}
      <div className="">
          <h2 className="rancho text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] font-bold">
            Study <span className="text-[var(--color-text-primary-dark)]">Mate</span>
          </h2>
        </div>
      <div></div>
    </div>
  );
};

export default DashboardNavbar;
