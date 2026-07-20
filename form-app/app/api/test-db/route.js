import sequelize from '@/lib/db';

export async function GET() {
  try {
    await sequelize.authenticate();
    console.log("Connection establsiehed");
    return Response.json({ status: 'Connected to Neon successfully!' });
  } catch (error) {
    return Response.json({ status: 'Connection failed', error: error.message }, { status: 500 });
  }
}