"use client"

import { useState } from "react";
import { toast } from "sonner";

function useFetch<TArgs extends any[], TResult>(
    serverAction: (...args: TArgs) => Promise<TResult>
){

    const [data, setData] = useState<TResult | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const func = async (...args: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await serverAction(...args);
            setData(response);
        } catch (err: any) {
            setError(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, func, setData };
}

export default useFetch;