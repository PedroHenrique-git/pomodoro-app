/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import returnTime from '../../utils/returnTime';
import Button from '../Button/Button';
import './PomodoroApp.css';
import audioStartFile from '../../audio/sound.mp3';
import audioRestFile from '../../audio/alarm.wav';

interface IData {
    second: number;
    work: boolean;
    rest: boolean;
    timeWorked: number;
    currentClass: string;
    currentTask: string;
    pomodoroCycles: number;
}

const audioStart = new Audio(audioStartFile);
const audioRest = new Audio(audioRestFile);

const workTime = 1500; // 25 min
const restTime = 300; // 5 min

export default function PomodoroApp(): JSX.Element {
    const [second, setSeconds] = useState(workTime);
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
        setSeconds(workTime);
        setCurrentTask('Work');

        timeRef!.current!.classList.remove('rest');
        timeRef!.current!.classList.add('work');

        audioRest.play();
    };

    const activeRest = (isBigRest?: boolean) => {
        setWork(false);
        setRest(true);

        if (isBigRest) {
            setSeconds(restTime * 4);
        } else {
            setSeconds(restTime);
        }

        setCurrentTask('Rest');
        setPomodoroCycles(pomodoroCycles + 1);

        timeRef!.current!.classList.remove('work');
        timeRef!.current!.classList.add('rest');

        audioStart.play();
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

                if (work) {
                    setTimeWorked((prevSecond) => prevSecond + 1);
                }
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
