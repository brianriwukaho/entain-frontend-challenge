import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import App from './App';
import { CategoryIDs } from './consts';

describe('application test suite', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    test('User can see four selectable categories', () => {
        render(<App />);
        const allRacesButton = screen.getByText('All Races', { exact: true });
        expect(allRacesButton).toBeInTheDocument();

        const horseRacesButton = screen.getByText('Horses');
        expect(horseRacesButton).toBeInTheDocument();

        const harnessRacesButton = screen.getByText('Harnesses');
        expect(harnessRacesButton).toBeInTheDocument();

        const greyhoundRacesButton = screen.getByText('Greyhounds');
        expect(greyhoundRacesButton).toBeInTheDocument();
    });

    test('User can change title when changing category', () => {
        render(<App />);
        const title = screen.getByText('Showing All Races');

        const horseRacesButton = screen.getByText('Horses');
        horseRacesButton.click();
        expect(title.innerHTML).toEqual('Showing Horse Races');

        const harnessRacesButton = screen.getByText('Harnesses');
        harnessRacesButton.click();
        expect(title.innerHTML).toEqual('Showing Harness Races');

        const greyhoundRacesButton = screen.getByText('Greyhounds');
        greyhoundRacesButton.click();
        expect(title.innerHTML).toEqual('Showing Greyhound Races');
    });

    // couldn't get this test to work in time but the idea is there :)
    test('User can see 5 races at all times even when race expires', () => {
        fetch.mockResponseOnce(
            JSON.stringify({
                data: {
                    next_to_go_ids: [1, 2, 3, 4, 5, 6],
                    // this first race will disappear in 10 seconds
                    race_summaries: {
                        1: {
                            race_id: 1,
                            advertised_start: {
                                seconds: -50,
                            },
                            meeting_name: 'race 1',
                            race_number: '1',
                            category_id: CategoryIDs.HORSE_CATEGORY_ID,
                        },
                        2: {
                            race_id: 2,
                            advertised_start: {
                                seconds: 1000,
                            },
                            meeting_name: 'race 2',
                            race_number: '2',
                            category_id: CategoryIDs.HORSE_CATEGORY_ID,
                        },
                        3: {
                            race_id: 3,
                            advertised_start: {
                                seconds: 2000,
                            },
                            meeting_name: 'race 3',
                            race_number: '3',
                            category_id: CategoryIDs.HORSE_CATEGORY_ID,
                        },
                        4: {
                            race_id: 4,
                            advertised_start: {
                                seconds: 3000,
                            },
                            meeting_name: 'race 4',
                            race_number: '4',
                            category_id: CategoryIDs.HORSE_CATEGORY_ID,
                        },
                        5: {
                            race_id: 5,
                            advertised_start: {
                                seconds: 4000,
                            },
                            meeting_name: 'race 5',
                            race_number: '5',
                            category_id: CategoryIDs.HORSE_CATEGORY_ID,
                        },
                        6: {
                            race_id: 6,
                            advertised_start: {
                                seconds: 5000,
                            },
                            meeting_name: 'race 6',
                            race_number: '6',
                            category_id: CategoryIDs.HORSE_CATEGORY_ID,
                        },
                    },
                },
                message: 'mock api call',
                status: 200,
            })
        );

        render(<App />);

        setTimeout(() => {}, 1000);

        const firstRace = screen.getByText('race 1');
        expect(firstRace).toBeInTheDocument();

        setTimeout(() => {}, 11000);
        expect(firstRace).not.toBeInTheDocument();

        const sixthRace = screen.getByText('race 6');
        expect(firstRace).toBeInTheDocument();
    });
});
