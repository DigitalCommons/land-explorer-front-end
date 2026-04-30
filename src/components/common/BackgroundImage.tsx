import { CSSProperties } from 'react';
import image0 from "../../assets/img/bg/Image1b.jpg";
import image1 from "../../assets/img/bg/Image2b.jpg";
import image2 from "../../assets/img/bg/Image3b.jpg";
import image3 from "../../assets/img/bg/Image4b.jpg";

type Props = {
  image: number;
};

const BackgroundImage = ({ image }: Props) => (
  <div
    style={{
      backgroundColor: "#222",
    }}
  >
    <div
      style={{
        ...styles.backgroundImage,
        opacity: image === 0 ? 1 : 0,
        backgroundImage: `url(${image0})`,
      }}
    />
    <div
      style={{
        ...styles.backgroundImage,
        opacity: image === 1 ? 1 : 0,
        backgroundImage: `url(${image1})`,
      }}
    />
    <div
      style={{
        ...styles.backgroundImage,
        opacity: image === 2 ? 1 : 0,
        backgroundImage: `url(${image2})`,
      }}
    />
    <div
      style={{
        ...styles.backgroundImage,
        opacity: image === 3 ? 1 : 0,
        backgroundImage: `url(${image3})`,
      }}
    />
  </div>
);

const styles: { backgroundImage: CSSProperties } = {
    backgroundImage: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: 'opacity 500ms',
    }
}

export default BackgroundImage;
