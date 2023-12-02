import * as services from "../services/users.services.js";

// POST /users

export const create = async (req, res) => {
  try {
    const newUser = await services.createNewUser(req.body);
    res.status(201).json({
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
      phone: newUser.phone,
      id: newUser.id,
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad Request",
      message: err.message,
    });
  }
};

// ---------------------------------------------------------------------

// GET /users/:id/books

export const list = async (req, res) => {
  try {
    const books = await services.listBooksOfUser(req.params.id);

    if (books[0]) {
      res.status(200).json(books);
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "There is no user with that ID",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Bad Request",
      message: err.message,
    });
  }
};

// ---------------------------------------------------------------------

// DELETE /users/:id

export const destroy = async (req, res) => {
  try {
    const deletedUser = await services.deleteUser(req.params.id);

    if (deletedUser) {
      res.status(201).json({
        firstName: deletedUser.first_name,
        lastName: deletedUser.last_name,
        email: deletedUser.email,
        phone: deletedUser.phone,
        id: deletedUser.id,
      });
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "There is no user with that ID",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Bad Request",
      message: err.message,
    });
  }
};

// ---------------------------------------------------------------------