import dotenv from 'dotenv';
import { setPool } from './Services/CustomServices';
import { conectarDB , pool  } from './Config/Database';
import router from './Routes/Routes';
import server from './Server/Server'

dotenv.config();
(async () => {
  try {
    await conectarDB();
    setPool(pool);

    const { app,start} = server({ port:81 , publicPath:""})
    app.use('/api', router);

    start()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})();