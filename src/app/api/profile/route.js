import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'academia_db'
};

export async function POST(req) {
  try {
    const body = await req.json();
    const connection = await mysql.createConnection(dbConfig);

    const { id, name, email, department, phone, location, avatar, profileImage, coverImage, skills, education, activities, year } = body;

    const query = `
      UPDATE users 
      SET name=?, email=?, department=?, phone=?, location=?, avatar=?, profileImage=?, coverImage=?, skills=?, education=?, activities=?, year=? 
      WHERE id=?`;

    await connection.execute(query, [
      name, email, department, phone, location, avatar, profileImage, coverImage,
      JSON.stringify(skills), JSON.stringify(education), JSON.stringify(activities), year,
      id
    ]);

    await connection.end();

    return new Response(JSON.stringify({ message: 'Profile updated successfully' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500 });
  }
}
