function Navbar({ setCurrentPage, currentPage }) {

  const navItemStyle = (page) =>
    `cursor-pointer transition px-4 py-2 rounded-lg
    ${
      currentPage === page
        ? "bg-blue-600 text-white"
        : "hover:text-blue-400"
    }`;

  return (

    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">

      {/* Logo */}

      <h1
        onClick={() => setCurrentPage("home")}
        className="text-3xl font-bold text-blue-400 cursor-pointer"
      >

        DriveSafe

      </h1>

      {/* Navigation */}

      <ul className="flex gap-4 text-lg">

        <li
          onClick={() => setCurrentPage("home")}
          className={navItemStyle("home")}
        >
          Home
        </li>

        <li
          onClick={() => setCurrentPage("predict")}
          className={navItemStyle("predict")}
        >
          Predict
        </li>

        <li
          onClick={() => setCurrentPage("dashboard")}
          className={navItemStyle("dashboard")}
        >
          Dashboard
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;