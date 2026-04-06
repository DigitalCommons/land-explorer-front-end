import { ComponentType } from 'react';
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

const withRouter = <P extends object>(Component: ComponentType<P>) => {
    function ComponentWithRouterProp(props: P) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;
