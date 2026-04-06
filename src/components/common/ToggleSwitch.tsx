type Props = {
  on: boolean;
  toggle?: () => void;
  tooltip?: string;
};

const ToggleSwitch = ({ on, toggle, tooltip }: Props) =>
    <div className="toggle-switch"
        onClick={(e) => {
            e.preventDefault();
            toggle && toggle();
        }}

        data-tip
        data-for={tooltip}
    >
        <label className="switch">
            <input
                type="checkbox"
                checked={on}
                onChange={e => { }}
            />
            <span className="slider"></span>
        </label>
    </div>

export default ToggleSwitch;
