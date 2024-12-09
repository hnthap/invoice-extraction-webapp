import e from 'express';
import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next) => {
    const {token} = req.headers

    if (!token) {
        return res.status(400).json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.userId = tokenDecode.id;
        } else {
            return res.status(400).json({ success: false, message: 'Not Authorized 1' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export default userAuth;