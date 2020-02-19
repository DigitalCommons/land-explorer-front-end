import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router';
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
        let { pathname } = this.props.location;
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
        console.log("Authentication route", this.props.location);
        return (
            <div>
                <Navbar limited={true} />
                <BackgroundImage image={this.state.image}/>
                <Switch>
                    <Route exact path="/auth" render={() => <Login updateCarousel={this.updateCarousel}/>} />
                    <Route path="/auth/register" render={() => <Register updateCarousel={this.updateCarousel}/>} />
                    <Route path="/auth/reset-password" render={() => <ResetPassword updateCarousel={this.updateCarousel}/>} />
                    <Route path="/" component={FourOhFour}/>
                </Switch>
            </div>
        );
    }
}

Authentication.propTypes = {};

export default withRouter(Authentication);
