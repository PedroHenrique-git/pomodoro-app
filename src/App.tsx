import { useEffect, useState } from 'react';
import returnTime from './utils/returnTime';

export default function App(): JSX.Element {
    const [second, setSeconds] = useState(10);
    const [work, setWork] = useState(false);
    const [rest, setRest] = useState(false);
    const [pause, setPause] = useState(false);

    const handleClickWork = () => setWork(true);

    const handleClickRest = () => {
        setRest(true);
        setSeconds(5);
    };

    const handleClickPause = () => {
        setPause(!pause);
        setWork(false);
        setRest(false);
    };

    useEffect(() => {
        let timer = 0;

        if (work && second === 0) {
            setWork(false);
            setRest(true);
            setSeconds(5);
        }

        if (rest && second === 0) {
            setRest(false);
            setWork(true);
            setSeconds(10);
        }

        if (work || rest) {
            timer = window.setInterval(() => {
                setSeconds((prevSecond) => prevSecond - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [work, second, rest]);

    return (
        <>
            <h1>{returnTime(second)}</h1>
            <button
                disabled={pause}
                type="button"
                onClick={() => handleClickWork()}
            >
                Work
            </button>
            <button
                disabled={pause}
                type="button"
                onClick={() => handleClickRest()}
            >
                rest
            </button>
            <button type="button" onClick={() => handleClickPause()}>
                pause
            </button>
        </>
    );
}
