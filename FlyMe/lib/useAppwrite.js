import { useEffect, useState } from "react";

const useAppWrite = (fn) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn();
          setData(response);
        } catch (error) {
          console.error(error);
        }
        finally {
          setIsLoading(false);
        }
}    
    useEffect(() => {
        fetchData()
    }, [])
    const refetch = () => fetchData();
    return {data, isLoading, refetch}
}

export default useAppWrite