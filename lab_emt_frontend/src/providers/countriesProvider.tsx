import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import countryApi, { type CountryCreateRequest } from '../api/countryApi';
import type { Country } from '../api/types/country';
import CountriesContext from '../contexts/countriesContext';
import useSnackbar from '../hooks/useSnackbar';

const CountriesProvider = ({ children }: { children: React.ReactNode }) => {
    const { showSnackbar } = useSnackbar();

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await countryApi.findAll();
            setCountries(response.data);
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to load countries.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    const onAdd = useCallback(async (data: CountryCreateRequest) => {
        try {
            await countryApi.create(data);
            showSnackbar('Country created successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to add country.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    const onEdit = useCallback(async (id: number, data: CountryCreateRequest) => {
        try {
            await countryApi.update(id, data);
            showSnackbar('Country updated successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to edit country.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await countryApi.delete(id);
            showSnackbar('Country deleted successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to delete country.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    const value = useMemo(
        () => ({ countries, loading, onAdd, onEdit, onDelete }),
        [countries, loading, onAdd, onEdit, onDelete]
    );

    return <CountriesContext value={value}>{children}</CountriesContext>;
};

export default CountriesProvider;