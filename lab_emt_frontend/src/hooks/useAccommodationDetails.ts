import { useEffect, useState, useCallback } from 'react';
import accommodationApi from '../api/accommodationApi';
import type { Accommodation } from '../api/types/accommodation';

const useAccommodationDetails = (id: string) => {
    const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await accommodationApi.findById(id);
            setAccommodation(response.data);
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

    return { accommodation, loading, error, fetch };
};

export default useAccommodationDetails;