/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import returnTime from '../../utils/returnTime';
import Button from '../Button/Button';
import './PomodoroApp.css';
import audio from '../../audio/sound.mp3';

interface IData {
    second: number;
    work: boolean;
    rest: boolean;
    timeWorked: number;
    currentClass: string;
    currentTask: string;
    pomodoroCycles: number;
}

const audioTag = new Audio(audio);

export default function PomodoroApp(): JSX.Element {
    const [second, setSeconds] = useState(10);
    const [work, setWork] = useState(false);
    const [rest, setRest] = useState(false);
    const [pause, setPause] = useState(false);
    const [timeWorked, setTimeWorked] = useState(0);
    const [pomodoroCycles, setPomodoroCycles] = useState(0);
    const [currentTask, setCurrentTask] = useState('doing nothing');
    const timeRef = useRef<HTMLHeadingElement>(null);

    const activeWork = () => {
        setRest(false);
        setWork(true);
        setSeconds(10);
        setCurrentTask('Work');

        timeRef!.current!.classList.remove('rest');
        timeRef!.current!.classList.add('work');
    };

    const activeRest = (isBigRest?: boolean) => {
        setWork(false);
        setRest(true);

        if (isBigRest) {
            setSeconds(5 * 4);
            audioTag.play();
        } else {
            setSeconds(5);
        }

        setCurrentTask('Rest');
        setPomodoroCycles(pomodoroCycles + 1);

        timeRef!.current!.classList.remove('work');
        timeRef!.current!.classList.add('rest');
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
            setSeconds(data.second);
            setTimeWorked(data.timeWorked);
            setCurrentTask(data.currentTask);
            setPomodoroCycles(data.pomodoroCycles);

            if (data.currentClass) {
                timeRef!.current!.classList.add(data.currentClass);
            }
        }
    }, []);

    useEffect(() => {
        let timer = 0;

        const conditional = pomodoroCycles !== 0 && pomodoroCycles % 4 === 0;

        if (work && second === 0) activeRest(conditional);

        if (rest && second === 0) activeWork();

        const pomodoroData: IData = {
            work,
            rest,
            second,
            timeWorked,
            currentTask,
            pomodoroCycles,
            currentClass: timeRef!.current!.className,
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
    }, [work, second, rest, pause, pomodoroCycles]);

    return (
        <main>
            <section className="conteudo">
                <h1>You are: {currentTask}</h1>
                <h1 ref={timeRef}>{returnTime(second)}</h1>
                <h1>time worked: {returnTime(timeWorked)}</h1>
                <h1>pomodoro cycles: {pomodoroCycles}</h1>
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
            </section>
        </main>
    );
}
