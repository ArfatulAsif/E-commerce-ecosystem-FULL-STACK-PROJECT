const PrimaryButton = ({title, icon, classNames}) => {
  return (
    <button className={`group flex items-center gap-3 bg-orange-500 px-4 text-md py-2 text-[#F6F6F6] rounded-md hover:bg-orange-50 border border-orange-600 hover:text-orange-500 transition-all duratoin-150 ${classNames}`}>
      <span className="group-hover:scale-105">{title}</span>
      {icon && <span className="group-hover:scale-125 group-hover:ms-1">{icon}</span>}
    </button>
  );
};

export default PrimaryButton;