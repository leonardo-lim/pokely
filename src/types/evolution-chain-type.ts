interface EvolutionDetail {
    gender: number | null;
    held_item: Species | null;
    item: Species | null;
    known_move: Species | null;
    known_move_type: Species | null;
    location: Species | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: Species | null;
    party_type: Species | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: Species | null;
    trigger: Species;
    turn_upside_down: boolean;
}

interface ChainLink {
    evolution_details: EvolutionDetail[];
    evolves_to: ChainLink[];
    is_baby: boolean;
    species: Species;
}

interface Species {
    name: string;
    url: string;
}

interface EvolutionChain {
    id: number;
    baby_trigger_item: Species | null;
    chain: ChainLink;
}

interface PokemonChain {
    name: string;
    image: string;
}

export type { EvolutionChain, PokemonChain };