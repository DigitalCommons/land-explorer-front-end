import { useGoCardlessDropin } from '@gocardless/react-dropin';

type Props = {
    billingRequestFlowID: string;
    setMandate: (mandate: string) => void;
    closeModal: () => void;
};

const GoCardlessModal = ({ billingRequestFlowID, setMandate, closeModal }: Props) => {
    const config = ({
        billingRequestFlowID: billingRequestFlowID,
        environment: "sandbox", // either live or sandbox
        onSuccess: (billingRequest: any, billingRequestFlow: any) => {
            setMandate(billingRequest.mandate_request.links.mandate);
            closeModal();
        },
        onExit: (error: any, metadata: any) => {
            closeModal();
        },
    });

    const {
        open, exit, ready, error,
    } = useGoCardlessDropin(config);

    if (ready) {
        open();
    }

    return <div>{error && <p>Error: {error.message}</p>}</div>;

}



export default GoCardlessModal;
