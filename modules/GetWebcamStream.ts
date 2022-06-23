import {spawn} from 'child_process';
import {Readable} from "stream";
import os from 'os';

export default function GetWebcamStream():Readable {
    let command: string[];
    switch (os.platform()) {
        case 'darwin':
            command = ['-f', 'avfoundation', '-framerate', '30', '-i', "0", '-target', 'pal-vcd', '-f', 'm4v', '-'];
            break;

        case 'linux':
            command = ['-f', 'v4l2', '-framerate', '25', '-video_size', '640x480', '-i', '/dev/video0', '-f', 'm4v', '-'];
            break;

        default:
            throw new Error(`Sorry, your platform ${os.platform()} is not supported.`);

    }
    const pc = spawn('ffmpeg', command);
    pc.stderr.pipe(process.stderr);
    return pc.stdout;
}
