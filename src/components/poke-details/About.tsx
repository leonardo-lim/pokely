'use client';

import type { Pokemon } from '@/types/pokemon-type';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { convertToTitleCase } from '@/utils/text-format';

interface AboutProps {
    pokemon: Pokemon;
}

const About: React.FC<AboutProps> = ({ pokemon }) => {
    const getAbilities = () => {
        return pokemon.abilities.map((ability) => (
            convertToTitleCase(ability.ability.name)
        )).join(', ');
    };

    return (
        <VStack align="start" gap={2.5}>
            <HStack>
                <Text w={20} color="gray.500">Height</Text>
                <Text>{pokemon.height / 10} m</Text>
            </HStack>
            <HStack>
                <Text w={20} color="gray.500">Weight</Text>
                <Text>{pokemon.weight / 10} kg</Text>
            </HStack>
            <HStack>
                <Text w={20} color="gray.500">Abilities</Text>
                <Text>{getAbilities()}</Text>
            </HStack>
        </VStack>
    );
};

export default About;