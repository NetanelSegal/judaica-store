import menorahImage from "../../../assets/menirah.jpg";
import siddurImage from "../../../assets/siddur.webp";
import seferTorahImage from "../../../assets/sefer-torah.jpg";
import { useEffect, useState } from "react";

const images = [menorahImage, siddurImage, seferTorahImage];

export default function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  const incrementImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      incrementImage();
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <img
      onClick={incrementImage}
      className="size-full object-cover"
      src={images[currentImage]}
      alt={`image ${currentImage}`}
    />
  );
}
