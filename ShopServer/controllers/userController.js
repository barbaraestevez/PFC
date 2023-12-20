const connectCollection = require('../config/mongo')


exports.createUser = async (req, res) => {
    const { collection, client } = connectCollection('shop', 'Users');
    try {
        const resp = (await collection.insertOne(req.body)).acknowledged ?
            { msg: 'Usuario creado con éxito', success: true } :
            { msg: 'No se ha podido crear el usuario', success: false };
        res.json(resp);
    }
    catch (error) {
        switch (error.code) {
            case 11000:
                res.json({ msg: 'Ya existe una cuenta con ese email.', success: false });
                break;
            case 121:
                res.json({ msg: 'Los campos son obligatorios', success: false });
                break;
            default:
                res.json({ msg: 'Error', success: false });
                break;
        }
    }
    finally {
        await client.close()
    }
}

exports.findUserByEmail = async (req, res) => {
    const { collection, client } = connectCollection('shop', 'Users');
    try {

        const user = await collection.findOne({ email: req.body.email });

        if (user && user.password === req.body.password) {
            res.json({ msg: 'Usuario Logueado con éxito', success: true, user: user });
        }
        else {
            res.json({ msg: 'El password/email es incorrecto.', success: false });
/*             throw new Error('El password/email es incorrecto'); */
        }

    }
    catch (error) {
        res.status(403).json({ msg: error.message, success: false });
    }
    finally {
        await client.close()
    }
}

exports.addSalesByUser = async (req,res) => {
    const { collection, client } = connectCollection('shop', 'Users');
    try {
        //request.body.obj => {_id, [{product_id, stock, profit}...]};
        const user = await collection.findOne({ email: req.body.email });
        const user = await collection.updateOne();

    }
    catch (error) {
        res.status(403).json({ msg: error.message, success: false });
    }
    finally {
        await client.close()
    }
}