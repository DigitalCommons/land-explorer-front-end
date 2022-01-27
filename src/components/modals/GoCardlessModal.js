import React from 'react';
import {
    useGoCardlessDropin
} from '@gocardless/react-dropin';

const GoCardlessModal = ({ billingRequestFlowID, setMandate, closeModal }) => {
    const config = ({
        billingRequestFlowID: billingRequestFlowID,
        environment: "sandbox", // either live or sandbox
        onSuccess: (billingRequest, billingRequestFlow) => {
            setMandate(billingRequest.mandate_request.links.mandate);
            closeModal();
        },
        onExit: (error, metadata) => {
            closeModal();
        },
    });

    const {
        open, exit, ready, error,
    } = useGoCardlessDropin(config);

    if (ready) {
        open();
    }

    return (<div>
        {error && <p>Error: {error}</p>}
    </div>)

}



export default GoCardlessModal;