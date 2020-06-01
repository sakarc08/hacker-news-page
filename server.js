import app from './index'
import config from './config/config';

app.listen(config.port, () => {
    console.log(`App running at ${config.port}`);
})