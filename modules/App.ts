import express, {Request, Response, NextFunction} from 'express';
import GetWebcamStream from "./GetWebcamStream";
import pug from 'pug';

const app = express();

app.get('/video.ogv', (req: Request, res: Response, next: NextFunction) => {
    res.type('ogg');
    res.set('Content-Range', 'bytes 0-99999999999999/*');
    const pc = GetWebcamStream();
    pc.stdout.pipe(res);
    req.connection.on('close', () => {
        console.log("ABORT");
        pc.kill('SIGINT');
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.type('html').end(pug.renderFile('index.pug'));
});

export default app;
