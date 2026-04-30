type Props = {
  className?: string;
};

const Spinner = ({ className = "spinner" }: Props) =>
    <div className={className}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>

export default Spinner;
