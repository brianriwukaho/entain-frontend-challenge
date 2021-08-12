import { useEffect, useState } from 'react';

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

    const formattedTime = new Date(timeLeft * 1000).toISOString().substr(11, 8);

    return <span>{formattedTime}</span>;
};

export default Timer;
