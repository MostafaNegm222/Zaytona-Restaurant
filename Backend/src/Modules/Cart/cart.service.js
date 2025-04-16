import { CartModel } from "../../DB/Models/cart.model.js";
import { menuModel } from "../../DB/Models/menu.model.js";

export const addToCart = async (req, res, next) => {
  const { menuItemId, quantity } = req.body;

  const menuItem = await menuModel.findById(menuItemId);
  if (!menuItem) {
    return next(new Error("Menu item not found", { cause: 404 }));
  }

  let cart = await CartModel.findOne({ user: req.user._id });

  if (!cart) {
    // If cart doesn't exist, create a new one
    cart = await CartModel.create({
      user: req.user._id,
      menuItems: [{ menuItemId, quantity }],
    });
  } else {
    // Check if the item already exists in the cart
    const existingItem = cart.menuItems.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      // If exists, increase quantity
      existingItem.quantity += Number(quantity);
    } else {
      // If not exists, push new item
      cart.menuItems.push({ menuItemId, quantity });
    }

    await cart.save();
  }

  return res.status(200).json({ success: true, results: cart });
};

export const updateCart = async (req, res, next) => {
  const { menuItemId, quantity } = req.body;

  const menuItem = await menuModel.findById(menuItemId);
  if (!menuItem) {
    return next(new Error("Menu item not found", { cause: 404 }));
  }

  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id, "menuItems.menuItemId": menuItemId },
    {
      "menuItems.$.quantity": quantity,
    },
    { new: true }
  );

  return res.status(200).json({ success: true, results: cart });
};

export const getCart = async (req, res, next) => {
  if (req.user.role == "User") {
    const cart = await CartModel.findOne({ user: req.user._id });
    return res.status(200).json({ success: true, results: cart });
  }

  if (req.user.role == "Admin" && !req.body.cart)
    return next(new Error("CartId Is Required!"), { cause: 400 });
  const cart = await CartModel.findById(req.body.cartId);
  return res.status(200).json({ success: true, results: cart });
};

export const removeFromCart = async (req, res, next) => {
  const { menuItemId } = req.body;

  const menuItem = await menuModel.findById(menuItemId);
  if (!menuItem) {
    return next(new Error("Menu item not found", { cause: 404 }));
  }

  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { menuItems: { menuItemId } } },
    { new: true }
  );

  return res.status(200).json({ success: true, results: cart });
};

export const clearCart = async (req, res, next) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $set: { menuItems: [] },
    }
  );
  return res.status(200).json({ success: true, results: cart });
};
