import React, { useState } from "react";
import { Route, Routes } from 'react-router';
import TopBar from '../components/top-bar/TopBar';
import Register from "./Register";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import FourOhFour from "./FourOhFour";
import BackgroundImage from '../components/common/BackgroundImage';

const Authentication = () => {
    const [image, setImage] = useState(0);

    const updateBgImage = (n) => {
        setImage(n);
    }

    return (
        <div>
            <TopBar limited={true} />
            <BackgroundImage image={image} />
            <Routes>
                <Route path="/" element={<Login updateBgImage={updateBgImage} />} />
                <Route path="/register" element={<Register updateBgImage={updateBgImage} />} />
                <Route path="/reset-password" element={<ResetPassword updateBgImage={updateBgImage} />} />
                <Route path="/*" element={<FourOhFour />} />
            </Routes>
        </div>
    );
}

export default Authentication;
