import * as db from "./db.service.js";

export const listBooks = async () => {
  const result = await db.query("SELECT * FROM books");
  return result.rows;
};

export const listAvailableBooks = async () => {
  const result = await db.query(
    "SELECT * FROM books WHERE borrowing_date IS NULL"
  );

  return result.rows;
};

export const listNotAvailableBooks = async () => {
  const result = await db.query(
    "SELECT * FROM books WHERE borrowing_date IS NOT NULL"
  );

  return result.rows;
};

export const listBooksByTitle = async (title) => {
  const result = await db.query("SELECT * FROM books WHERE title = $1", [
    title,
  ]);

  return result.rows;
};

// ---------------------------------------------------------------------

export const getBookByID = async (bookID) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [bookID]);

  return result.rows[0];
};

// ---------------------------------------------------------------------

export const modifyBookAvailability = async (bookID) => {
  const book = await db.query("SELECT * FROM books WHERE id = $1", [bookID]);

  if (book.rows[0]) {
    if (book.rows[0].return_date) {
      const borrowing = await db.query(
        "UPDATE books SET return_date = NULL, borrowing_date = CURRENT_DATE WHERE id = $1 RETURNING *",
        [bookID]
      );

      return borrowing.rows[0];
    } else {
      const returning = await db.query(
        "UPDATE books SET return_date = CURRENT_DATE, borrowing_date = NULL WHERE id = $1 RETURNING *",
        [bookID]
      );

      return returning.rows[0];
    }
  } else {
    return undefined;
  }
};

// ---------------------------------------------------------------------
