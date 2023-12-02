import * as db from "./db.service.js";

export const createNewUser = async (userObj) => {
  const result = await db.query(
    "INSERT INTO users (first_name, last_name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *",
    [userObj.firstName, userObj.lastName, userObj.email, userObj.phone]
  );

  return result.rows[0];
};

// ---------------------------------------------------------------------

export const listBooksOfUser = async (userID) => {
  const result = await db.query(
    "SELECT * FROM books INNER JOIN users ON users.id = books.borrower WHERE users.id = $1",
    [userID]
  );

  return result.rows;
};

// ---------------------------------------------------------------------

export const deleteUser = async (userID) => {
  const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [
    userID,
  ]);

  return result.rows[0];
};

// ---------------------------------------------------------------------
