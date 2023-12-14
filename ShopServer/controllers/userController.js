const connectCollection = require("../config/mongo");

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
        console.log(error);
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
        msg: "Usuario logueado con éxito",
        success: true,
        user: user,
      });
    } else {
      res.json({ msg: "El email/password es incorrecto.", success: false });
    }

    //  res.json(user);
  } catch (error) {
    res.json(error);
    /* switch (error.code) {
            case 11000:
                res.json({ msg: 'Ya existe una cuenta con ese email.', success: false });
                break;
                case 121:
                    res.json({ msg: 'Los campos son obligatorios', success: false });
                    break;
                    default:
                        console.log(error);
                        res.json({ msg: 'Error', success: false });
                        break;
        } */
  } finally {
    await client.close();
  }
};
