import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const settings = {
  className: "screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  swipeToSlider: true,
};

export default function Screenshots(props) {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const openImage = (url) => {
    setImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={title}
            onClick={() => openImage(screenshot.url)}
          />
        ))}
      </Slider>

      <Modal size="large" open={showModal} onClose={() => setShowModal(false)}>
        <Image src={image} alt={title} />
      </Modal>
    </>
  );
}
