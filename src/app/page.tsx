'use client';

import type { Pokemon } from '@/types/pokemon-type';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { For, Grid, GridItem, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import axiosInstance from '@/lib/axios-instance';
import PokeCard from '@/components/PokeCard';

const LIMIT = 20;

const Home: NextPage = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPokemonDetails = async (pokemonId: number) => {
        const response = await axiosInstance.get(`/pokemon/${pokemonId}`);
        return response.data;
    };

    const getPokemons = async () => {
        const response = await axiosInstance.get(`/pokemon?offset=0&limit=${LIMIT}`);
        const results = response.data.results as Pokemon[];

        const pokemonDetails = await Promise.all(
            results.map((_, idx) => getPokemonDetails(idx + 1))
        );

        setPokemons(pokemonDetails);
        setIsLoading(false);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    return (
        <VStack gap={4} align="start" px={[10, 10, 20, 20, 40]} py={[8, 8, 8, 8, 10]}>
            <Text fontSize={[48, 48, 56, 56, 64]}>Pokédex</Text>
            {isLoading ? (
                <HStack gap={3}>
                    <Spinner />
                    <Text>Catching wild Pokémon</Text>
                </HStack>
            ) : (
                <Grid
                    gap={[6, 6, 6, 6, 8]}
                    templateColumns={[
                        'repeat(1, 1fr)',
                        'repeat(2, 1fr)',
                        'repeat(3, 1fr)',
                        'repeat(4, 1fr)',
                        'repeat(4, 1fr)',
                        'repeat(5, 1fr)'
                    ]}
                    w="100%"
                >
                    <For each={pokemons}>
                        {(pokemon, pokemonIdx) => (
                            <GridItem key={pokemonIdx}>
                                <PokeCard pokemon={pokemon} />
                            </GridItem>
                        )}
                    </For>
                </Grid>
            )}
        </VStack>
    );
};

export default Home;