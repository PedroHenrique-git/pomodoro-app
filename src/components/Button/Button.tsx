interface IButton {
    disabled: boolean;
    value: string;
    onClick: () => void;
}

export default function Button({
    disabled,
    value,
    onClick,
}: IButton): JSX.Element {
    return (
        <button disabled={disabled} type="button" onClick={onClick}>
            {value}
        </button>
    );
}
