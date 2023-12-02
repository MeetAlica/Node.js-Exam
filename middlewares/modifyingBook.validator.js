// Itt csak azt sikerült validálnom, hogy az adott ID valóban könyvé-e... :D

import * as db from "../services/db.service.js";

const modifyingBook = async (err, req, res, next) => {
  const book = db.query("SELECT * FROM books WHERE id = $1", [req.params.id]);

  if (book[0]) {
    next();
  } else {
    res.status(405).json({
      error: err,
      message: err.message,
    });
  }
};

export default modifyingBook;
