import React from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';
import realTimeApi from '../api/real-time-api';

function useRealTimeQuery<Data>(
    firebasePathKey: string,
    useQueryOptions: UseQueryOptions<Data> = {},
) {
    const queryClient = useQueryClient();

    React.useEffect(() => {
        const unsubscribe = realTimeApi.subscribe<Data>({
            path: firebasePathKey,
            callback: (val: any) => {
                queryClient.setQueryData(firebasePathKey, val);
            },
        });

        return () => unsubscribe();
    }, [queryClient, firebasePathKey])

    return useQuery<Data, Error>(
        firebasePathKey,
        () => new Promise<Data>(() => {}),
    );
}

export default useRealTimeQuery;