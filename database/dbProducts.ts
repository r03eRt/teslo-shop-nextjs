import { db } from "."
import { IProduct } from "../interfaces";
import { Product } from "../models";

// Funcion que se ejecuta en el serversiderenderingprops del tempalte por nextjs, normamente esta logica se hace en la plantilla, con axios a la api
export const getProductBySlug = async(slug: string): Promise<IProduct | null> => {
    await db.connect();

    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
        return null;
    }

    return JSON.parse(JSON.stringify(product));
}