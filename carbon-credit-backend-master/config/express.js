import express from 'express';

import ApplyMiddlewares from '../middlewares';
import router from '../routes';

const PORT = process.env.PORT || 3000;

const app = express();
ApplyMiddlewares(app);
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

export default app;
