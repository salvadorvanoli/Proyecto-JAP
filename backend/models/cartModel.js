const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "12560",
  database: "bd-proyecto-entrega-8",
  connectionLimit: 5,
});

const getCarts = async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM usuarios_productos"
      );
  
      return rows;
    } catch (error) {
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

const getCartByUser = async (username) => {
    let conn;
    try {

        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT productid FROM usuarios_productos WHERE username=?", [username]
        );
        return rows;

    } catch (error) {
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const addItem = async (username, productid) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO usuarios_productos(username, productid) VALUE (?, ?)`,
        [username, productid]
      );
  
      return { username, productid };
    } catch (error) {
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

const deleteItem = async (username, productid) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM usuarios_productos WHERE username=? AND productid=?", [username, productid]);
  
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

module.exports = {
    getCarts,
    getCartByUser,
    addItem,
    deleteItem,
}