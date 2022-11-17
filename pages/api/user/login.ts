// nextapi
import bcrypt from 'bcryptjs'

import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';

type Data = 
| {message: string }
| {
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
 }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
     switch(req.method) {
        case 'POST':
            return loginUser(req, res);
        default:
            return res.status(404).json({
                message: 'Bad request'
            })

     }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = ''} = req.body;

    // conectamos para ver si el usuario existe en la base de datos
    await db.connect();
    const user = await User.findOne({ email: email });
    await db.disconnect();

    // sino existe devolvemos que no está
    if (!user) {
        return res.status(400).json({ 
            message: 'correo o contraseña no validos - EMAIL'
     });
    }

    // si está comparamos la contraseña para ver si es valida
    if(!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ 
            message: 'correo o contraseña no validos - PASSWORD'
        })
    }

    const { role, name } = user;

    return res.status(200).json({
        token: '', //jwt token
        user: {
            email, role, name
        }
    })

}
