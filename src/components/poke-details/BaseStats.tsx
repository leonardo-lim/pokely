'use client';

import type { Pokemon } from '@/types/pokemon-type';
import { For, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import { convertToTitleCase } from '@/utils/text-format';

interface BaseStatsProps {
    pokemon: Pokemon;
}

const BaseStats: React.FC<BaseStatsProps> = ({ pokemon }) => {
    const maxStats = {
        hp: 255,
        attack: 190,
        defense: 250,
        'special-attack': 194,
        'special-defense': 250,
        speed: 180
    };

    const getStatValue = (stat: Pokemon['stats'][number]) => {
        const value = (stat.base_stat / maxStats[stat.stat.name as keyof typeof maxStats]) * 100;
        return Math.min(value, 100);
    };

    const getColor = (value: number) => {
        if (value <= 33) {
            return 'red';
        } else if (value <= 66) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    return (
        <VStack align="start" gap={2.5}>
            <For each={pokemon.stats}>
                {(stat, idx) => (
                    <HStack key={idx} gap={4} w="100%">
                        <Text w={120} color="gray.500">{convertToTitleCase(stat.stat.name)}</Text>
                        <Text>{stat.base_stat}</Text>
                        <Progress.Root variant="subtle" value={getStatValue(stat)} flex={1}>
                            <Progress.Track
                                h={1.5}
                                colorPalette={getColor(getStatValue(stat))}
                                borderRadius={8}
                            >
                                <Progress.Range />
                            </Progress.Track>
                        </Progress.Root>
                    </HStack>
                )}
            </For>
        </VStack>
    );
};

export default BaseStats;