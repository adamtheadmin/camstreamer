import getWebcamStream from './modules/GetWebcamStream';

(async () => {
    const stream = await getWebcamStream();
    stream.pipe(process.stdout);
})();
