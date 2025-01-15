import { Link } from "react-router-dom";

const HomepageCard = ({
  color,
  tagColor,
  title,
  subTitle,
  img,
  tags,
  link,
}) => {
  return (
    <Link to={link} className="group h-full">
      <div
        className="h-full group-hover:scale-[1.05] transition-all duration-200 text-center rounded-md p-8 flex flex-col gap-3"
        style={{
          backgroundColor: color,
        }}
      >
        <h3 className="text-lg font-semibold">{subTitle}</h3>
        <h2 className="text-3xl font-semibold">{title}</h2>

        <img className="w-[90%] h-auto mx-auto" src={img} />

        <div className="flex gap-4 flex-wrap justify-center mb-12">
          {tags &&
            tags.length > 0 &&
            tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-md"
                style={{ backgroundColor: tagColor }}
              >
                {tag}
              </div>
            ))}
        </div>
      </div>
    </Link>
  );
};

export default HomepageCard;
