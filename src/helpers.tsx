import RaceItem from './components/RaceItem';
import { Categories } from './consts';
import { Race } from './types';

export function renderRaceItems(
    races: Race[],
    shiftItemsCallback: Function
): JSX.Element[] {
    return races.map((race: Race, index) => (
        <RaceItem
            id={index + 1}
            key={race.race_id}
            race={race}
            shiftItems={shiftItemsCallback}
        />
    ));
}

export function getRacesByCategory(
    nextRaces: string[],
    allRaces: any,
    category_id: string
): Race[] {
    const items = [];
    // loop backwards so we can get time to start in ascending order
    for (let index = nextRaces.length - 1; index >= 0; index--) {
        const raceId = nextRaces[index];
        const val = allRaces[raceId];
        if (val.category_id === category_id || category_id === Categories.ALL)
            items.push(val);
    }

    return items;
}

// the start times (advertised_start) given from the api are very far off into the future
export function convertSecondsToYears(time: number): string {
    const years = Math.floor(time / (3600 * 24 * 365));
    const days = Math.floor((time % (3600 * 24 * 365)) / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return [years, days, hours, minutes, seconds]
        .map((v) => (v < 10 ? '0' + v : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
}
