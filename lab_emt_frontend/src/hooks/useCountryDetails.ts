import { useEffect, useState, useCallback } from 'react';
import countryApi from '../api/countryApi';
import type { Country } from '../api/types/country';

const useCountryDetails = (id: string) => {
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await countryApi.findById(id);
            setCountry(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { country, loading, error, fetch };
};

export default useCountryDetails;