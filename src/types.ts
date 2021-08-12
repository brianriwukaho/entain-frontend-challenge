export type Race = {
    race_id: string;
    advertised_start: {
        seconds: number;
    };
    meeting_name: string;
    race_number: number;
    category_id: string;
};

export type Payload = {
    data: {
        next_to_go_ids: string[];
        race_summaries: { [race_id: string]: Race };
    };
    message: string;
    status: number;
};
