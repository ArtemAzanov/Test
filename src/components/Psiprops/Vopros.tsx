interface VoprosProps {
    onAnswer: (answer: 'yes' | 'no' | 'unknown') => void;
};

const Vopros = ({ onAnswer }: VoprosProps) => {
    return (
        <div>
            <button onClick={() => onAnswer("yes")}>Да</button>
            <button onClick={() => onAnswer("no")}>Нет</button>
            <button onClick={() => onAnswer("unknown")}>Не знаю</button>
        </div>
    );


};
export default Vopros;