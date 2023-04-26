import React, { useState } from "react";
import { Route, Routes } from 'react-router';
import Navbar from '../components/Navbar';
import Register from "./Register";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import FourOhFour from "./FourOhFour";
import BackgroundImage from '../components/BackgroundImage';

const Authentication = () => {
    const [image, setImage] = useState(0);

    const updateCarousel = (n) => {
        setImage(n);
    }

    return (
        <div>
            <Navbar limited={true} />
            <BackgroundImage image={image} />
            <Routes>
                <Route path="/" element={<Login updateCarousel={updateCarousel} />} />
                <Route path="/register" element={<Register updateCarousel={updateCarousel} />} />
                <Route path="/reset-password" element={<ResetPassword updateCarousel={updateCarousel} />} />
                <Route path="/*" element={<FourOhFour />} />
            </Routes>
        </div>
    );
}

export default Authentication;
