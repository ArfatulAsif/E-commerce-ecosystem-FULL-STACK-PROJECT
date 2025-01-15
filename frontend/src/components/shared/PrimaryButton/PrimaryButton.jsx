const PrimaryButton = ({ title, icon, classNames, loading }) => {
  return (
    <button
      disabled={loading}
      className={`group flex justify-center items-center gap-3 bg-orange-500 px-4 text-md py-2 text-[#F6F6F6] rounded-md hover:bg-orange-50 border border-orange-600 hover:text-orange-500 transition-all duration-150 ${classNames}`}
    >
      {loading && (
        <span className="loading loading-spinner text-neutral"></span>
      )}
      {!loading && <span className="group-hover:scale-105">{title}</span>}
      {!loading && icon && (
        <span className="group-hover:scale-125 group-hover:ms-1">{icon}</span>
      )}
    </button>
  );
};

export default PrimaryButton;
