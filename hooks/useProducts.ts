// con fetcher lo que hacemos es cachear los datos iniciales
import useSWR, {SWRConfiguration} from "swr"
import { IProduct } from "../interfaces"


//const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())


export const useProducts = (url: string, config: SWRConfiguration = {}) => {


    // Es un arreglo de productos
    //const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config)
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config)

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}