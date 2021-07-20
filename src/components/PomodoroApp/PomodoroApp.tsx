import { useEffect, useState } from 'react';
import returnTime from '../../utils/returnTime';
import Button from '../Button/Button';
import './PomodoroApp.css';

interface IData {
    second: number;
    work: boolean;
    rest: boolean;
    timeWorked: number;
}

export default function PomodoroApp(): JSX.Element {
    const [second, setSeconds] = useState(10);
    const [work, setWork] = useState(false);
    const [rest, setRest] = useState(false);
    const [pause, setPause] = useState(false);
    const [timeWorked, setTimeWorked] = useState(0);

    const activeWork = () => {
        setRest(false);
        setWork(true);
        setSeconds(10);
    };

    const activeRest = () => {
        setWork(false);
        setRest(true);
        setSeconds(5);
    };

    const handleClickWork = () => activeWork();

    const handleClickRest = () => activeRest();

    const handleClickPause = () => setPause(!pause);

    useEffect(() => {
        const pomodoroData = localStorage.getItem('pomodoroData');

        if (pomodoroData) {
            const data: IData = JSON.parse(pomodoroData);
            setWork(data.work);
            setRest(data.rest);
            setPause(true);
            setTimeWorked(data.timeWorked);
        }
    }, []);

    useEffect(() => {
        let timer = 0;

        if (work && second === 0) activeRest();

        if (rest && second === 0) activeWork();

        const pomodoroData: IData = {
            work,
            rest,
            second,
            timeWorked,
        };

        localStorage.setItem('pomodoroData', JSON.stringify(pomodoroData));

        if ((work || rest) && !pause) {
            timer = window.setInterval(() => {
                setSeconds((prevSecond) => prevSecond - 1);
                setTimeWorked((prevSecond) => prevSecond + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [work, second, rest, pause]);

    return (
        <main>
            <h1>{returnTime(second)}</h1>
            <h1>time worked: {returnTime(timeWorked)}</h1>
            <div className="controls_container">
                <Button
                    disabled={pause}
                    onClick={() => handleClickWork()}
                    value="Work"
                />
                <Button
                    disabled={pause}
                    onClick={() => handleClickRest()}
                    value="Rest"
                />
                <Button
                    disabled={false}
                    onClick={() => handleClickPause()}
                    value={!pause ? 'Pause' : 'Continue'}
                />
            </div>
        </main>
    );
}
