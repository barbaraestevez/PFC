const { ObjectId } = require("mongodb");
const connectCollection = require("../config/mongo");
const authLogic = require("../utils/authLogic");

exports.createUser = async (req, res) => {
  const { collection, client } = connectCollection("shop", "Users");
  try {
    const resp = (await collection.insertOne(req.body)).acknowledged
      ? { msg: "Usuario creado con éxito", success: true }
      : { msg: "No se ha podido crear el usuario", success: false };
    res.json(resp);
  } catch (error) {
    switch (error.code) {
      case 11000:
        res.json({
          msg: "Ya existe una cuenta con ese email.",
          success: false,
        });
        break;
      case 121:
        res.json({ msg: "Los campos son obligatorios", success: false });
        break;
      default:
        res.json({ msg: "Error", success: false });
        break;
    }
  } finally {
    await client.close();
  }
};

exports.findUserByEmail = async (req, res) => {
  const { collection, client } = connectCollection("shop", "Users");
  try {
    const user = await collection.findOne({ email: req.body.email });

    if (user && user.password === req.body.password) {
      res.json({
        msg: "Usuario Logueado con éxito",
        success: true,
        user: user,
      });
    } else {
      res.json({ msg: "El password/email es incorrecto.", success: false });
      /*             throw new Error('El password/email es incorrecto'); */
    }
  } catch (error) {
    res.status(403).json({ msg: error.message, success: false });
  } finally {
    await client.close();
  }
};

exports.addSalesByUser = async (req, res) => {
  const { collection, client } = connectCollection("shop", "Users");
  try {
    if (await authLogic.checkRBAC(req, ["Seller"])) {
      const { userId, productList } = req.body;
      const filter = new ObjectId(userId);
      const update = { $addToSet: { store: { $each: productList } } };

      const user = await collection.updateOne(filter, update);
      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        res.json({ msg: "Productos añadidos a tu tienda", success: true });
      } else {
        res.json({
          msg: "El producto ya está añadido a tu carro",
          success: false,
        });
      }
    } else {
      res.json({ msg: "No tienes los permisos adecuados.", success: false });
    }
  } catch (error) {
    res.status(403).json({ msg: error.message, success: false });
  } finally {
    await client.close();
  }
};
