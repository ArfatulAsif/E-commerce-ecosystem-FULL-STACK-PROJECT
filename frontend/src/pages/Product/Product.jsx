import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Product = () => {
  const { id } = useParams();

  const product = useState(null);

  useEffect(() => {
    axiosInstance
      .post("/product/productbyid", { productId: id })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const images = [
    {
      id: "1",
      image:
        "https://grabit-next.tigerheck.com/assets/img/product-images/4_1.jpg",
    },
    {
      id: "2",
      image:
        "https://grabit-next.tigerheck.com/assets/img/product-images/2_1.jpg",
    },
    {
      id: "3",
      image:
        "https://grabit-next.tigerheck.com/assets/img/product-images/3_1.jpg",
    },
  ];

  console.log(id);
  return (
    <div className="px-8 py-4">
      <div>
        <Carousel
          showArrows={true} // Enable previous and next arrow
          autoPlay={true} // Enables auto-sliding
          infiniteLoop={true} // Allows infinite loop sliding
          interval={3000} // Adjusts the delay between slides (in milliseconds)
          stopOnHover={true} // Pauses the slide on hover
          showStatus={false} // Current page number
        >
          {images &&
            images.map((image) => {
              return (
                <div className="rounded-lg" key={image.id}>
                  <img className="rounded-lg" src={image.image} />
                </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default Product;
