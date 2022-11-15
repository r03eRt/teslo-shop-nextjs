import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = | { message: string } | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch(req.method) {
        case 'GET':
            return getProducts(req, res)
        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();

    //Por defecto genero igual a all, inicilizamos filtro, si viene enla url un genero lo aplicamos a la query
    // tambien comprobamos si viene en nuestra lista de posibles generos que tenemos en una constante
    const { gender = 'all' } = req.query;
    let condition = {};
    if(gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender: gender }
    }

    const products = await Product
                            .find(condition) // query de productos
                            .select('title images price inStock slug') // Para seleccionar que campos nos devuelve y reducir tamaño de peticion
                            .lean() //.lean()

    await db.disconnect();

    return res.status(200).json( products )
}
