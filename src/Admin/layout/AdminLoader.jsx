const AdminLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
      

      <div className="flex flex-col items-center">
        

        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full bg-white/40 backdrop-blur-lg shadow-lg"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/50 border-t-orange-500 animate-spin shadow-[0_0_12px_rgba(249,115,22,0.6)]"></div>
        </div>

        <p className="mt-4 text-xs text-gray-500 tracking-wide">
          Loading…
        </p>

      </div>
    </div>
  );
};

export default AdminLoader;
