'use client';

import type { Pokemon } from '@/types/pokemon-type';
import { Box, Flex, For, Text } from '@chakra-ui/react';
import { typeColors } from '@/lib/type-color';
import { convertToTitleCase } from '@/utils/text-format';

interface MovesProps {
    pokemon: Pokemon;
}

const Moves: React.FC<MovesProps> = ({ pokemon }) => {
    return (
        <Flex align="start" gap={2} flexWrap="wrap" maxH={180} overflow="auto">
            <For each={pokemon.moves}>
                {(move, idx) => (
                    <Box
                        key={idx}
                        px={3}
                        py={1.5}
                        bg={typeColors[pokemon.types[0].type.name]}
                        borderRadius={12}
                    >
                        <Text
                            fontSize={12}
                            fontWeight="medium"
                            textTransform="capitalize"
                            color="white"
                        >
                            {convertToTitleCase(move.move.name)}
                        </Text>
                    </Box>
                )}
            </For>
        </Flex>
    );
};

export default Moves;