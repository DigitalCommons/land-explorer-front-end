import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import withRouter from "../components/common/withRouter";
import Navbar from '../components/Navbar';
import Register from "./Register";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import FourOhFour from "./FourOhFour";
import BackgroundImage from '../components/BackgroundImage';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 0,
            prevImage: 0,
        }
    }
    componentDidMount() {
        let { pathname } = this.props.router.location;
        if (pathname.includes('register')) {
            this.setState({ prevImage: 1 })
        } else if (pathname.includes('reset')) {
            this.setState({ prevImage: 2 })
        }
    }
    updateCarousel = (n) => {
        this.setState({
            image: n,
        })
    }
    render() {
        console.log("Authentication route", this.props.router.location);
        return (
            <div>
                <Navbar limited={true} />
                <BackgroundImage image={this.state.image} />
                <Routes>
                    <Route exact path="/" element={<Login updateCarousel={this.updateCarousel} />} />
                    <Route path="/register" element={<Register updateCarousel={this.updateCarousel} />} />
                    <Route path="/reset-password" element={<ResetPassword updateCarousel={this.updateCarousel} />} />
                    <Route path="/*" element={<FourOhFour />} />
                </Routes>
            </div>
        );
    }
}

Authentication.propTypes = {};

export default withRouter(Authentication);
