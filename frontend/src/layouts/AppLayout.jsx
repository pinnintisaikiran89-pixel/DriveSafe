
import BottomNavigation from "../components/navigation/BottomNavigation";

function AppLayout({ children, showBottomNavigation = true }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b12] text-white">
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-[45%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative min-h-screen">
        {children}
      </div>

      {showBottomNavigation && <BottomNavigation />}
    </div>
  );
}

export default AppLayout;
