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
        <button
            style={
                disabled
                    ? { borderColor: '#ff4544' }
                    : { borderColor: '#e7e7e7' }
            }
            disabled={disabled}
            type="button"
            onClick={onClick}
        >
            {value}
        </button>
    );
}
