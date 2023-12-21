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

      const { userId, userStore, productList } = req.body;


      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $addToSet: { store: { $each: productList } } //$push
        });

      const cursor = collection.aggregate([
        {
          $match: {
            _id: new ObjectId(userId)
          }
        },
        {
          $unwind: "$store"
        },
        {
          $group: {
            _id: {
              name: "$name",
              product_name: "$store.product_name"
            },
            username: {$first: "$username"},
            email: {$first: "$email"},
            role: {$first: "$role"},
            password: {$first: "$password"},
            totalQty: {$sum: "$store.qty"},
            avgPrice: {$avg: "$store.price"}
          }
        },
        {
          $group: {
            _id: "$_id.name",
            email: {$first: "$email"},
            role: {$first: "$role"},
            store: {
              $push: {
                product_name: "$_id.name",
                qty: "$totalQty",
                price: "$avgPrice"
              }
            }
          }
        }
      ]);
      let document = {};
      for await (const doc of cursor) {
        document = doc;
      }
      const resilt = await collection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: document
        }
      );

      
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
}

/*
async function findUserById(req) {
  const { collection, client } = connectCollection ('shop', 'Users');
  try {
    return await collection.findOne({ _id: new ObjectId(req.userId)});
  }
  catch(error) {

  }
  finally {
    await client.close();
  }
}

function combineProduct(currentList, newList) {
  const combinedList = currentList.concat(newList).reduce((result, current) => {
    const existingProduct = result.find(
      product => product.name === current.name && product.price === current.price);

  if (existingProduct) {
    existingProduct.qty += current.qty;
  } else {
    result.push(current);
  }
  })
  return combinedList;
}
*/