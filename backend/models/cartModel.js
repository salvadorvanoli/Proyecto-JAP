const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "12560",
  database: "bd-proyecto-v2",
  connectionLimit: 5,
});

const getPurchasesByUser = async (username) => {
    let conn;
    try {

        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT * FROM compras WHERE username=?", [username]
        );
        return rows;

    } catch (error) {
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const getPurchaseDetails = async (compraid) => {
  let conn;
  try {

      conn = await pool.getConnection();
      const rows = await conn.query(
          "SELECT * FROM detallecompra WHERE compraid=?", [compraid]
      );
      return rows;

  } catch (error) {
  } finally {
      if (conn) conn.release();
  }
  return false;
};

const getLastPurchase = async (username) => {
  let conn;
  try {

      conn = await pool.getConnection();
      const rows = await conn.query(
          "SELECT MAX(compraid) AS compraid FROM compras WHERE username=?", [username]
      );
      return rows;

  } catch (error) {
  } finally {
      if (conn) conn.release();
  }
  return false;
};

const addPurchase = async (username, fullname, sendtype, cardnum, cardname, carddate, cardcode, transfernumb, transfername, street, streetnumber, placereferences) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO compras(username, fullname, sendtype, cardnum, cardname, carddate, cardcode, transfernumb, transfername, street, streetnumber, placereferences) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, fullname, sendtype, cardnum, cardname, carddate, cardcode, transfernumb, transfername, street, streetnumber, placereferences]
      );
  
      return { username, fullname, sendtype, cardnum, cardname, carddate, cardcode, transfernumb, transfername, street, streetnumber, placereferences };
    } catch (error) {
    } finally {
      if (conn) conn.release();
    }
    return false;
};

const addPurchaseDetails = async (compraid, productid, count, price, currency) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO detallecompra(compraid, productid, count, price, currency) VALUE(?, ?, ?, ?, ?)`,
      [compraid, productid, count, price, currency]
    );

    return { compraid, productid, count, price, currency };
  } catch (error) {
  } finally {
    if (conn) conn.release();
  }
  return false;
};

module.exports = {
  getPurchasesByUser,
  getPurchaseDetails,
  addPurchase,
  addPurchaseDetails,
  getLastPurchase,
}