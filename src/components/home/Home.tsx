import React, { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import ImgSlider from "./ImgSlider";
export const Home: FC = () => {
  const user = useSelector(userSelector);

  return (
    <div style={{ color: "rgb(76 91 102)", textAlign: "center" }}>
      {!!user && (
        <h2>
          Hi {user.firstName} {user.lastName}
        </h2>
      )}
      <h2>Welcome to our Website! </h2>
      <h3>
        Get ready to shop 'til you drop with us! Explore our awesome collection
        of fashion, accessories, and home decor. Enjoy easy browsing and secure
        checkout. We're here to make your shopping experience smooth and
        satisfying. Start exploring now!
      </h3>
      <ImgSlider />
    </div>
  );
};
