import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [url]);

    return data;
}
