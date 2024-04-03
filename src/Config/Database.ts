import sql, { ConnectionPool } from 'mssql';

let pool: ConnectionPool;

async function conectarDB() {
  try {
    const CONFIG_SQL = {
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        server: process.env.DB_SERVER || '',
        database: process.env.DB_DATABASE || '',
        options: {
            trustServerCertificate: true, 
            encrypt:false
        }
    };

    pool = await sql.connect(CONFIG_SQL);
    console.log('Conexión establecida correctamente');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

async function desconectarDB() {
  if (pool) {
    await pool.close();
    console.log('Conexión cerrada correctamente');
  }
}

export { conectarDB, desconectarDB , pool  };