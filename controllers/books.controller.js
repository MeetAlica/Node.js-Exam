import * as services from "../services/books.services.js";

// GET /books

export const list = async (req, res) => {
  if (req.query.title) {
    const books = await services.listBooksByTitle(req.params.title);

    books
      ? res.status(200).json(books)
      : res.status(400).json({
          error: "Bad Request",
          message: "Something is wrong",
        });

    return;
  }

  if (req.query.available == "true") {
    const books = await services.listAvailableBooks();

    books
      ? res.status(200).json(books)
      : res.status(400).json({
          error: "Bad Request",
          message: "Something is wrong",
        });

    return;
  } else if (req.query.available == "false") {
    const books = await services.listNotAvailableBooks();

    books
      ? res.status(200).json(books)
      : res.status(400).json({
          error: "Bad Request",
          message: "Something is wrong",
        });

    return;
  }

  const books = await services.listBooks();

  books
    ? res.status(200).json(books)
    : res.status(400).json({
        error: "Bad Request",
        message: "Something is wrong",
      });
};

// ---------------------------------------------------------------------

// GET /books/:id

export const get = async (req, res) => {
  try {
    const book = await services.getBookByID(req.params.id);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "There is no book with that ID",
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

// PATCH /books/:id

export const modify = async (req, res) => {
  try {
    const modifyBook = await services.modifyBookAvailability(req.params.id);

    if (modifyBook) {
      res.status(200).json(modifyBook);
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "There is no book with that ID",
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
