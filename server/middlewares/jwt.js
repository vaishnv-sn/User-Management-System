const jwt = require('jsonwebtoken')

module.exports = {

    authorizeRole: (requiredRole) => (req, res, next) => {
        const BearerToken = req.headers.authorization;

        if (!BearerToken) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        const tokenParts = BearerToken.split(' ');
        const token = tokenParts[1];

        if (!token) {
            return res.status(401).json({ message: 'Invalid Token Format' })
        }

        const jwtKey = process.env.JWT_SECRET;

        jwt.verify(token, jwtKey, (err, decodedToken) => {

            if (err) {
                return res.status(401).json({ message: err.message });
            }

            const { role } = decodedToken;

            if (!role || role !== requiredRole) {
                return res.status(403).json({ message: 'Insufficient permissions.' });
            }

            next();
        });
    },

    signUser: (user) => {
        return new Promise((resolve, reject) => {
            const jwtKey = process.env.JWT_SECRET;
            const payload = {
                user: user.name,
                role: 'user'
            }
            jwt.sign(payload, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            })
        })

    },

    signAdmin: (admin, res) => {
        return new Promise((resolve, reject) => {
            const jwtKey = process.env.JWT_SECRET;
            const payload = {
                admin,
                role: 'admin'
            }
            jwt.sign(payload, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            })
        })

    }
}