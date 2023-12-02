import * as services from "../services/users.services.js";

const deleteUserValidator = async (_, req, res, next) => {
  const books = await services.listBooksOfUser(req.params.id);

  if (books[0]) {
    res.status(400).json({
      error: "Bad Request",
      message: "The user have borrowed books",
    });
  } else {
    next();
  }
};

export default deleteUserValidator;
