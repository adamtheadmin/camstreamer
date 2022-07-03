import app from './modules/App';

const port = process.env.PORT || 8080;
app.listen(+port, () => console.log(`Camera ready at on port ${port}`));
