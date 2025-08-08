'use client';

import type { Pokemon } from '@/types/pokemon-type';
import Image from 'next/image';
import { Box, For, Text, VStack } from '@chakra-ui/react';
import { typeColors } from '@/lib/type-color';

interface PokeCardProps {
    pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
    return (
        <VStack
            align="start"
            minH={160}
            p={6}
            bg={typeColors[pokemon.types[0].type.name]}
            pos="relative"
            borderRadius={24}
            boxShadow="3px 3px 6px 2px rgba(0, 0, 0, 0.1)"
            overflow="hidden"
        >
            <Text
                fontSize={[18, 18, 20, 20, 24]}
                fontWeight="semibold"
                textTransform="capitalize"
                color="white"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {pokemon.name}
            </Text>
            <For each={pokemon.types}>
                {(type, idx) => (
                    <Box
                        key={idx}
                        px={3}
                        py={1.5}
                        bg="rgba(255, 255, 255, 0.2)"
                        borderRadius={12}
                    >
                        <Text
                            fontSize={12}
                            fontWeight="medium"
                            textTransform="capitalize"
                            color="white"
                        >
                            {type.type.name}
                        </Text>
                    </Box>
                )}
            </For>
            <Box pos="absolute" bottom={-4} right={-4} opacity={0.15}>
                <Image
                    src="/images/pokeball.png"
                    alt="Pokeball"
                    width={150}
                    height={150}
                />
            </Box>
            <Box pos="absolute" bottom={5} right={5}>
                <Image
                    src={pokemon.sprites.other!.dream_world.front_default!}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                />
            </Box>
        </VStack>
    );
};

export default PokeCard;