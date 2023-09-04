import express, {Request, Response, NextFunction} from 'express';
import GetWebcamStream from "./GetWebcamStream";
import pug from 'pug';

const app = express();

app.get('/video.ogv', (req: Request, res: Response, next: NextFunction) => {
    res.type('ogg');
    res.set('Content-Range', 'bytes 0-99999999999999/*');
    const { stream, kill } = GetWebcamStream();
    stream.stdout.pipe(res);
    req.connection.on('close', () => {
        stream.stdout.unpipe(res);
        kill();
    });
});


app.use((req: Request, res: Response, next: NextFunction) => {
    res.type('html').end(pug.renderFile('index.pug'));
});

export default app;
