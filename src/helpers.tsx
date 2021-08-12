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
    for (const raceId of nextRaces) {
        const val = allRaces[raceId];
        if (val.category_id === category_id || category_id === Categories.ALL)
            items.push(val);
    }

    return items;
}
