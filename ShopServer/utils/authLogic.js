const connectCollection = require('../config/mongo');

exports.checkRBAC = async (req, allowedRoles) => {
    const { collection, client } = connectCollection('shop', 'Users');
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new Error('Credenciales no proporcionadas o formato incorrecto.');
        }
        const encodedCredentials = authHeader.substring('Basic '.length);
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [email, password] = decodedCredentials.split(':');

        const user = await collection.findOne({ email: email, password: password });

        return user && allowedRoles.includes(user.role);
    }
    finally {
        await client.close();
    }
}