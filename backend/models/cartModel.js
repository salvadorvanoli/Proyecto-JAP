const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "12560",
  database: "bd-proyecto-v2",
  connectionLimit: 5,
});

// const getCarts = async () => {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const rows = await conn.query(
//         "SELECT * FROM usuarios_productos"
//       );
  
//       return rows;
//     } catch (error) {
//     } finally {
//       if (conn) conn.release(); //release to pool
//     }
//     return false;
// };

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
          "SELECT MAX(compraid) FROM compras WHERE username=?", [username]
      );
      return rows;

  } catch (error) {
  } finally {
      if (conn) conn.release();
  }
  return false;
};

const addPurchase = async (username, envio, cardnum, cardname, carddate, cardcode, transfernumb, transfername) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO compras(username, envio, cardnum, cardname, carddate, cardcode, transfernumb, transfername) VALUE (?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, envio, cardnum, cardname, carddate, cardcode, transfernumb, transfername]
      );
  
      return { username, envio, cardnum, cardname, carddate, cardcode, transfernumb, transfername };
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
      `INSERT INTO detallecompra(compraid, productid, count, price, currency) VALUE (?, ?, ?, ?, ?)`,
      [compraid, productid, count, price, currency]
    );

    return { compraid, productid, count, price, currency };
  } catch (error) {
  } finally {
    if (conn) conn.release();
  }
  return false;
};

// const addItem = async (username, productid) => {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const response = await conn.query(
//         `INSERT INTO usuarios_productos(username, productid) VALUE (?, ?)`,
//         [username, productid]
//       );
  
//       return { username, productid };
//     } catch (error) {
//     } finally {
//       if (conn) conn.release(); //release to pool
//     }
//     return false;
// };

// const deleteItem = async (username, productid) => {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       await conn.query("DELETE FROM usuarios_productos WHERE username=? AND productid=?", [username, productid]);
  
//       return true;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       if (conn) conn.release(); //release to pool
//     }
//     return false;
// };

module.exports = {
  getPurchasesByUser,
  getPurchaseDetails,
  addPurchase,
  addPurchaseDetails,
  getLastPurchase,
}