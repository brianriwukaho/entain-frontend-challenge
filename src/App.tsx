import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Categories, CategoryIDs, RACES_TO_DISPLAY } from './consts';
import { getRacesByCategory, renderRaceItems } from './helpers';
import { Payload, Race } from './types';

function App() {
    const [nextRaces, setNextRaces] = useState<any>([]);
    const [nextGreyhoundRaces, setNextGreyhoundRaces] = useState<Race[]>([]);
    const [nextHarnessRaces, setNextHarnessRaces] = useState<Race[]>([]);
    const [nextHorseRaces, setNextHorseRaces] = useState<Race[]>([]);

    const [category, setCategory] = useState<string>(Categories.ALL);
    const [shiftItems, setShiftItems] = useState<boolean>(false);

    useEffect(() => {
        fetch(
            'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=45'
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(
                        `Something went wrong. Status: ${res.status}`
                    );
                }
            })
            .then((payload: Payload) => {
                const nextRaceIDs = payload.data.next_to_go_ids;
                const allRaces = payload.data.race_summaries;

                const nextGreyhoundRaces = getRacesByCategory(
                    nextRaceIDs,
                    allRaces,
                    CategoryIDs.GREYHOUND_CATEGORY_ID
                );

                const nextHarnessRaces = getRacesByCategory(
                    nextRaceIDs,
                    allRaces,
                    CategoryIDs.HARNESS_CATEGORY_ID
                );

                const nextHorseRaces = getRacesByCategory(
                    nextRaceIDs,
                    allRaces,
                    CategoryIDs.HORSE_CATEGORY_ID
                );

                const nextRaces = getRacesByCategory(
                    nextRaceIDs,
                    allRaces,
                    Categories.ALL
                );

                setNextGreyhoundRaces(nextGreyhoundRaces);
                setNextHarnessRaces(nextHarnessRaces);
                setNextHorseRaces(nextHorseRaces);
                setNextRaces(nextRaces);
            })
            .catch((error) => console.log(error));
    }, []);

    const removeExpiredRaces = useCallback(() => {
        switch (category) {
            case Categories.ALL:
                nextRaces.shift();
                setNextRaces(nextRaces);
                break;
            case Categories.HORSE:
                nextHorseRaces.shift();
                setNextHorseRaces(nextHorseRaces);
                break;
            case Categories.GREYHOUND:
                nextGreyhoundRaces.shift();
                setNextGreyhoundRaces(nextGreyhoundRaces);
                break;
            case Categories.HARNESS:
                nextHarnessRaces.shift();
                setNextHarnessRaces(nextHarnessRaces);
                break;
        }
    }, [
        category,
        nextGreyhoundRaces,
        nextHarnessRaces,
        nextHorseRaces,
        nextRaces,
    ]);

    useEffect(() => {
        if (shiftItems) {
            removeExpiredRaces();
            setShiftItems(false);
        }
    }, [removeExpiredRaces, shiftItems]);

    console.log(category);

    return (
        <div className="App">
            <div>Showing {category} Races</div>
            {category === Categories.ALL &&
                renderRaceItems(
                    nextRaces.slice(0, RACES_TO_DISPLAY),
                    setShiftItems
                )}
            {category === Categories.HORSE &&
                renderRaceItems(
                    nextHorseRaces.slice(0, RACES_TO_DISPLAY),
                    setShiftItems
                )}
            {category === Categories.HARNESS &&
                renderRaceItems(
                    nextHarnessRaces.slice(0, RACES_TO_DISPLAY),
                    setShiftItems
                )}
            {category === Categories.GREYHOUND &&
                renderRaceItems(
                    nextGreyhoundRaces.slice(0, RACES_TO_DISPLAY),
                    setShiftItems
                )}
            <button onClick={() => setCategory(Categories.ALL)}>
                All Races
            </button>
            <button onClick={() => setCategory(Categories.HORSE)}>
                Horses
            </button>
            <button onClick={() => setCategory(Categories.HARNESS)}>
                Harnesses
            </button>
            <button onClick={() => setCategory(Categories.GREYHOUND)}>
                GreyHound
            </button>
        </div>
    );
}

export default App;
