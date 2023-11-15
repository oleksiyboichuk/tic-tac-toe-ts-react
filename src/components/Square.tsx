type Props = {
    index: number;
    onClick(event: any): void;
    player?: string;
};

function Square({ index, onClick, player }: Props) {
    const scale = player ? "scale-100" : "scale-0";
    const textColor = player === "X" ? "text-amber-400" : "text-purple-400";
    const hoverStyle = "transition duration-500 hover:scale-105 transform";

    return (
        <div
            data-cell-index={index}
            className={`rounded-xl bg-gradient-to-b from-redyan-400 to-redyan-300 h-36 border-solid border-4 border-redyan-300 font-display text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
            {...{ onClick }}
        >
            <span
                data-cell-index={index}
                className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}
            >
                {player}
            </span>
        </div>
    );
}

export default Square;
