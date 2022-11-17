import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
    if(!process.env.NEXT_PUBLIC_JWT_SECRET_SEED) {
        throw new Error('Missing NEXT_PUBLIC_JWT_SECRET_SEED')
    }

    console.log(process.env.NEXT_PUBLIC_JWT_SECRET_SEED);

    // reorna esta funcion un token valido
    return jwt.sign(
        {_id, email },
        process.env.NEXT_PUBLIC_JWT_SECRET_SEED,
        { expiresIn: '30d'}
    );
}