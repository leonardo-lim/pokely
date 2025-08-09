'use client';

import type { EvolutionChain, PokemonChain } from '@/types/evolution-chain-type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Flex, For, HStack, VStack, Text, Icon, Spinner } from '@chakra-ui/react';
import { AngleRight } from '@/lib/icon';
import axiosInstance from '@/lib/axios-instance';

interface EvolutionProps {
    pokemonId: number;
}

const Evolution: React.FC<EvolutionProps> = ({ pokemonId }) => {
    const [evolutionChain, setEvolutionChain] = useState<PokemonChain[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const extractChain = async (node: EvolutionChain['chain'], result: PokemonChain[] = []) => {
        const { species, evolves_to } = node;
        const parts = species.url.split('/');
        const speciesId = parts[parts.length - 2];
        const response = await axiosInstance.get(`/pokemon/${speciesId}`);

        result.push({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default
        });

        await Promise.all(evolves_to.map((next) => extractChain(next, result)));

        return result;
    };

    const getEvolutionChain = async (url: string) => {
        const parts = url.split('/');
        const evolutionId = parts[parts.length - 2];
        const response = await axiosInstance.get(`/evolution-chain/${evolutionId}`);
        const result = await extractChain(response.data.chain);

        setEvolutionChain(result);
        setIsLoading(false);
    };

    const getPokemonSpecies = async () => {
        setIsLoading(true);

        const response = await axiosInstance.get(`/pokemon-species/${pokemonId}`);
        const { url } = response.data.evolution_chain;

        getEvolutionChain(url);
    };

    useEffect(() => {
        getPokemonSpecies();
    }, []);

    return (
        <HStack align="end" justify="start" gap={4}>
            {isLoading ? (
                <HStack gap={3}>
                    <Spinner />
                    <Text>Getting evolution chain</Text>
                </HStack>
            ) : (
                <For each={evolutionChain}>
                    {(pokemon, idx) => (
                        <Flex key={idx} align="end" gap={4}>
                            <VStack gap={3}>
                                <Image
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    width={60}
                                    height={60}
                                />
                                <Text
                                    textTransform="capitalize"
                                    color="gray.700"
                                >
                                    {pokemon.name}
                                </Text>
                            </VStack>
                            {idx !== evolutionChain.length - 1 && (
                                <Icon mb={0.5}>{AngleRight}</Icon>
                            )}
                        </Flex>
                    )}
                </For>
            )}
        </HStack>
    );
};

export default Evolution;