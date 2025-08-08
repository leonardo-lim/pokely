interface Ability {
    ability: Species;
    is_hidden: boolean;
    slot: number;
}

interface Cry {
    latest: string;
    legacy: string;
}

interface Species {
    name: string;
    url: string;
}

interface GameIndex {
    game_index: number;
    version: Species;
}

interface HeldItem {
    item: Species;
    version_details: VersionDetail[];
}

interface VersionDetail {
    rarity: number;
    version: Species;
}

interface Move {
    move: Species;
    version_group_details: VersionGroupDetail[];
}

interface PastAbility {
    abilities: Ability[];
    generation: Species;
}

interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: Species;
    version_group: Species;
}

interface GenerationV {
    'black-white': Sprites;
}

interface GenerationIv {
    'diamond-pearl': Sprites;
    'heartgold-soulsilver': Sprites;
    platinum: Sprites;
}

interface Versions {
    'generation-i': GenerationI;
    'generation-ii': GenerationIi;
    'generation-iii': GenerationIii;
    'generation-iv': GenerationIv;
    'generation-v': GenerationV;
    'generation-vi': {
        'omegaruby-alphasapphire': Home;
        'x-y': Home;
    };
    'generation-vii': GenerationVii;
    'generation-viii': GenerationViii;
}

interface Sprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: Other;
    versions?: Versions;
    animated?: Sprites;
}

interface GenerationI {
    'red-blue': RedBlue;
    yellow: RedBlue;
}

interface RedBlue {
    back_default: string | null;
    back_gray: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_gray: string | null;
    front_transparent: string | null;
}

interface GenerationIi {
    crystal: Crystal;
    gold: Gold;
    silver: Gold;
}

interface Crystal {
    back_default: string | null;
    back_shiny: string | null;
    back_shiny_transparent: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_transparent: string | null;
}

interface Gold {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_transparent?: string | null;
}

interface GenerationIii {
    emerald: Emerald;
    'firered-leafgreen': Gold;
    'ruby-sapphire': Gold;
}

interface Emerald {
    front_default: string | null;
    front_shiny: string | null;
}

interface Home {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

interface GenerationVii {
    icons: DreamWorld;
    'ultra-sun-ultra-moon': Home;
}

interface DreamWorld {
    front_default: string | null;
    front_female: string | null;
}

interface GenerationViii {
    icons: DreamWorld;
}

interface Other {
    dream_world: DreamWorld;
    home: Home;
    'official-artwork': OfficialArtwork;
}

interface OfficialArtwork {
    front_default: string | null;
    front_shiny: string | null;
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: Species;
}

interface Type {
    slot: number;
    type: Species;
}

interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: Cry;
    forms: Species[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_abilities: PastAbility[];
    past_types: [];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}

export type { Pokemon };