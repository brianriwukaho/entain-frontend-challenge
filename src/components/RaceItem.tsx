import { Race } from '../types';
import Timer from './Timer';

type Props = {
    race: Race;
    shiftItems: Function;
};

function RaceItem({ race, shiftItems }: Props) {
    const { meeting_name, race_number, advertised_start } = race;

    const seconds = advertised_start.seconds;

    return (
        <div>
            {meeting_name}, {race_number},{' '}
            {<Timer seconds={seconds} shiftItems={shiftItems} />}
        </div>
    );
}

export default RaceItem;
