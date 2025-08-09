'use client';

import type { Pokemon } from '@/types/pokemon-type';
import Image from 'next/image';
import {
    Box,
    Dialog,
    Flex,
    For,
    HStack,
    Icon,
    Portal,
    Tabs,
    Text,
    Theme,
    VStack
} from '@chakra-ui/react';
import { Times } from '@/lib/icon';
import { typeColors } from '@/lib/type-color';
import About from './About';
import BaseStats from './BaseStats';
import Evolution from './Evolution';
import Moves from './Moves';

interface PokeDetailsProps {
    pokemon: Pokemon;
    isDetailsOpen: boolean;
    setIsDetailsOpen: (open: boolean) => void;
}

const PokeDetails: React.FC<PokeDetailsProps> = ({ pokemon, isDetailsOpen, setIsDetailsOpen }) => {
    return (
        <Dialog.Root
            placement="center"
            trapFocus={false}
            open={isDetailsOpen}
            onOpenChange={(e) => setIsDetailsOpen(e.open)}
        >
            <Portal>
                <Dialog.Backdrop bg="blackAlpha.800" />
                <Dialog.Positioner>
                    <Dialog.Content bg={typeColors[pokemon.types[0].type.name]} borderRadius={24}>
                        <Dialog.Header p={8}>
                            <HStack justify="space-between" w="100%">
                                <HStack gap={3}>
                                    <Dialog.Title
                                        fontSize={[18, 18, 20, 20, 24]}
                                        textTransform="capitalize"
                                        color="white"
                                    >
                                        {pokemon.name}
                                    </Dialog.Title>
                                    <Text
                                        fontSize={[16, 16, 18, 18, 20]}
                                        color="white"
                                    >
                                        #{pokemon.id.toString().padStart(4, '0')}
                                    </Text>
                                </HStack>
                                <Dialog.CloseTrigger asChild>
                                    <Icon
                                        fontSize={28}
                                        color="whiteAlpha.900"
                                        cursor="pointer"
                                        _hover={{
                                            color: 'white'
                                        }}
                                    >
                                        {Times}
                                    </Icon>
                                </Dialog.CloseTrigger>
                            </HStack>
                        </Dialog.Header>
                        <Dialog.Body p={0} overflow="hidden">
                            <VStack align="start" px={8}>
                                <HStack gap={3}>
                                    <For each={pokemon.types}>
                                        {(type, idx) => (
                                            <Box
                                                key={idx}
                                                w="fit-content"
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
                                </HStack>
                                <Flex justify="center" w="100%" pos="relative">
                                    <Box
                                        pos="absolute"
                                        bottom={-16}
                                        right={-16}
                                        opacity={0.15}
                                    >
                                        <Image
                                            src="/images/pokeball.png"
                                            alt="Pokeball"
                                            width={250}
                                            height={250}
                                        />
                                    </Box>
                                    <Box pos="relative" mt={-6} bottom={-6}>
                                        <Image
                                            src={pokemon.sprites.other!.dream_world.front_default!}
                                            alt={pokemon.name}
                                            width={250}
                                            height={250}
                                        />
                                    </Box>
                                </Flex>
                            </VStack>
                            <Theme
                                appearance="light"
                                pt={[8, 8, 10]}
                                px={[6, 6, 8]}
                                pb={[4, 4, 6]}
                                borderRadius={16}
                            >
                                <Tabs.Root defaultValue="about">
                                    <Tabs.List mb={1}>
                                        <Tabs.Trigger value="about">About</Tabs.Trigger>
                                        <Tabs.Trigger value="base-stats">Base Stats</Tabs.Trigger>
                                        <Tabs.Trigger value="evolution">Evolution</Tabs.Trigger>
                                        <Tabs.Trigger value="moves">Moves</Tabs.Trigger>
                                    </Tabs.List>
                                    <Tabs.Content value="about" minH={200}>
                                        <About pokemon={pokemon} />
                                    </Tabs.Content>
                                    <Tabs.Content value="base-stats" minH={200}>
                                        <BaseStats pokemon={pokemon} />
                                    </Tabs.Content>
                                    <Tabs.Content value="evolution" minH={200}>
                                        <Evolution pokemonId={pokemon.id} />
                                    </Tabs.Content>
                                    <Tabs.Content value="moves" minH={200}>
                                        <Moves pokemon={pokemon} />
                                    </Tabs.Content>
                                </Tabs.Root>
                            </Theme>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default PokeDetails;