function MobileLayout({ children }) {

  return (

    <div className="min-h-screen bg-slate-100 flex justify-center">

      <div className="w-full max-w-md bg-white min-h-screen shadow-xl">

        {children}

      </div>

    </div>

  );

}

export default MobileLayout;