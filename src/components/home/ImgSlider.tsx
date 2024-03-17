import React, { FC } from "react";
import { Carousel, Image } from "react-bootstrap";

const ImgSlider: FC = () => {
  return (
    <Carousel
      controls={false}
      style={{ margin: "auto", marginTop: "50px", width: "50%" }}
    >
      <Carousel.Item>
        <Image
          src="https://tree-stores.com/wp-content/uploads/2023/10/cover-slider-3.jpg"
          height={400}
          width={700}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src="https://png.pngtree.com/background/20210711/original/pngtree-taobao-vector-creative-technology-online-shopping-illustration-computer-finger-poster-picture-image_1110799.jpg"
          height={400}
          width={700}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src="https://png.pngtree.com/background/20210710/original/pngtree-shopping-mall-supermarket-selection-merchandise-poster-background-material-picture-image_1048684.jpg"
          height={400}
          width={700}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImgSlider;
