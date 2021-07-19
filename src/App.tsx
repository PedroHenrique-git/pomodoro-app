import { useEffect, useState } from 'react';
import returnTime from './utils/returnTime';

export default function App(): JSX.Element {
    const [second, setSeconds] = useState(10);
    const [work, setWork] = useState(false);

    useEffect(() => {
        let timer = 0;

        if (second === 0) setWork(false);

        if (work) {
            timer = window.setInterval(() => {
                setSeconds((prevSecond) => prevSecond - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [work, second]);

    return (
        <>
            <h1>{returnTime(second)}</h1>
            <button type="button" onClick={() => setWork(true)}>
                Work
            </button>
            <button type="button" onClick={() => setWork(false)}>
                pause
            </button>
        </>
    );
}
