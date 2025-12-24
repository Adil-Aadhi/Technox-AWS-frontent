const Spinner = ({ text = "Loading orders..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-blue-500 animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-white/70 text-sm">
        {text}
      </p>
    </div>
  );
};

export default Spinner;
