// nextapi
import bcrypt from 'bcryptjs'

import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

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
            return registerUser(req, res);
        default:
            return res.status(404).json({
                message: 'Bad request'
            })

     }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '', name = ''} = req.body as { email: string, password: string, name: string };



    if(password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long'
        })
    }

    if(name.length < 3) {
        return res.status(400).json({
            message: 'El nombre debe de ser de al menos 2 caracteres'
        })
    }

    // conectamos para ver si el usuario existe en la base de datos
    await db.connect();
    const user = await User.findOne({ email: email });


    const newUser = new User({
        name: name,
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client'
    })

    // comprobamos si hay alguna clase de error al guardar el usuario
    try {
        await newUser.save({
            validateBeforeSave: true
        });        
    } catch (error) {
        return res.status(400).json({
            message: 'Revisar logs del servidor'
        });
    }

    const { _id, role } = newUser;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token: token, //jwt token
        user: {
            email,
            role,
            name
        }
    })

}
