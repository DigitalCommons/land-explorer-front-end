type Props = {
  message: string;
};

const LoadingData = ({ message }: Props) =>
    <div className="loading-circle">
        <p className="loading-text">{message}</p>
    </div>

export default LoadingData;
