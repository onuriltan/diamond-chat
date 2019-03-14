import app from './app';
import http from 'http';
const PORT = process.env.PORT || 5000;


http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
