import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',       // XAMPP এ সাধারণত localhost
  user: 'root',            // XAMPP default
  password: '',            // যদি password থাকে সেটা দিবে
  database: 'academia_db'  // তোমার database name
});
