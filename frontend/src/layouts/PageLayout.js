
import AppLayout from "./AppLayout";

function PageLayout({ children, showBottomNavigation = true }) {
  return (
    <AppLayout showBottomNavigation={showBottomNavigation}>
      <main className="mx-auto min-h-screen w-full max-w-lg px-4 pb-32 pt-6 sm:px-6">
        {children}
      </main>
    </AppLayout>
  );
}

export default PageLayout;
