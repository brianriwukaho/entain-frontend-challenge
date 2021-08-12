import { useEffect, useState } from 'react';
import { convertSecondsToYears } from '../helpers';

type Props = {
    seconds: number;
    shiftItems: Function;
};

const Timer = ({ shiftItems, seconds }: Props) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft < -60) {
            console.log(timeLeft * 1000);
            shiftItems(true);
        }
    }, [shiftItems, timeLeft]);

    const formattedTime = convertSecondsToYears(timeLeft);

    return <span>{formattedTime}</span>;
};

export default Timer;
