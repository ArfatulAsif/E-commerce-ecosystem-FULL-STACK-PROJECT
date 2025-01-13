const PrimaryButton = ({title}) => {
  return (
    <button className="bg-orange-500 px-4 py-2 text-[#F6F6F6] rounded-md hover:bg-orange-50 border border-orange-600 hover:text-orange-500 transition-all duratoin-150">
      {title}
    </button>
  );
};

export default PrimaryButton;