import { useEffect } from "react";

export default function useAutoClearError(
    error,
    setError,
    delay = 3000
) {
    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError("");
        }, delay);

        return () => clearTimeout(timer);
    }, [error, setError, delay]);
}