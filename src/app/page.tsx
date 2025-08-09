'use client';

import type { Pokemon } from '@/types/pokemon-type';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { For, Grid, GridItem, HStack, IconButton, Spinner, Text, VStack } from '@chakra-ui/react';
import { AngleLeft, AngleRight } from '@/lib/icon';
import axiosInstance from '@/lib/axios-instance';
import PokeCard from '@/components/PokeCard';

const LIMIT = 20;

const Home: NextPage = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const pokemonTotal = useRef(0);

    const getPokemonDetails = async (pokemonId: number) => {
        const response = await axiosInstance.get(`/pokemon/${pokemonId}`);
        return response.data;
    };

    const getPokemons = async () => {
        setIsLoading(true);

        const response = await axiosInstance.get(`/pokemon?offset=${offset}&limit=${LIMIT}`);
        const results = response.data.results as Pokemon[];
        pokemonTotal.current = response.data.count;

        const pokemonDetails = await Promise.all(
            results.map((_, idx) => getPokemonDetails(offset + idx + 1))
        );

        setPokemons(pokemonDetails);
        setIsLoading(false);
    };

    const handlePreviousPokemons = () => {
        if (offset > 0) {
            setOffset(offset - LIMIT);
        }
    };

    const handleNextPokemons = () => {
        if (offset + LIMIT < pokemonTotal.current) {
            setOffset(offset + LIMIT);
        }
    };

    useEffect(() => {
        getPokemons();
    }, [offset]);

    return (
        <VStack gap={4} align="start" px={[10, 10, 20, 20, 40]} py={[8, 8, 8, 8, 10]}>
            <Text fontSize={[48, 48, 56, 56, 64]}>Pokédex</Text>
            {isLoading ? (
                <HStack gap={3}>
                    <Spinner />
                    <Text>Catching wild Pokémon</Text>
                </HStack>
            ) : (
                <VStack gap={5} w="100%">
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
                    <HStack>
                        <IconButton
                            variant="plain"
                            borderRadius={12}
                            onClick={handlePreviousPokemons}
                            disabled={offset === 0}
                            _icon={{
                                w: ['16px', '16px', '18px'],
                                h: ['16px', '16px', '18px']
                            }}
                        >
                            {AngleLeft}
                        </IconButton>
                        <Text>{offset + 1} - {offset + LIMIT} of {pokemonTotal.current}</Text>
                        <IconButton
                            variant="plain"
                            borderRadius={12}
                            onClick={handleNextPokemons}
                            disabled={offset + LIMIT >= pokemonTotal.current}
                            _icon={{
                                w: ['16px', '16px', '18px'],
                                h: ['16px', '16px', '18px']
                            }}
                        >
                            {AngleRight}
                        </IconButton>
                    </HStack>
                </VStack>
            )}
        </VStack>
    );
};

export default Home;