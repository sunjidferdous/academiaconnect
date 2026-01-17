import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'academia_db'
};

// GET profile by id
export async function GET(req, { params }) {
  const { id } = params;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
  await conn.end();

  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const user = rows[0];
  user.skills = JSON.parse(user.skills || '[]');
  user.education = JSON.parse(user.education || '{}');
  user.activities = JSON.parse(user.activities || '[]');

  return new Response(JSON.stringify(user), { status: 200 });
}

// POST update profile
export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const conn = await mysql.createConnection(dbConfig);
  const query = `
    UPDATE users 
    SET name=?, email=?, department=?, phone=?, location=?, avatar=?, profileImage=?, coverImage=?, skills=?, education=?, activities=?, year=?
    WHERE id=?`;

  await conn.execute(query, [
    body.name, body.email, body.department, body.phone, body.location, body.avatar,
    body.profileImage, body.coverImage,
    JSON.stringify(body.skills), JSON.stringify(body.education), JSON.stringify(body.activities),
    body.year, id
  ]);

  await conn.end();

  return new Response(JSON.stringify({ message: 'Profile updated successfully' }), { status: 200 });
}
