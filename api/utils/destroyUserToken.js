import jwt from 'jsonwebtoken'

const destroyUserToken = (res) => {
   
    const jwtToken = '';

    const cookieOptions = {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== 'production', 
        sameSite: 'strict',
        maxAge: new Date(0) 
    }
    res.cookie('userJwt', jwtToken, cookieOptions)
}

export default destroyUserToken;