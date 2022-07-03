import {ChildProcessWithoutNullStreams, spawn} from 'child_process';
import os from 'os';

export default function GetWebcamStream():ChildProcessWithoutNullStreams {
    let command: string[];
    switch (os.platform()) {
        case 'darwin':
            command = ['-f', 'avfoundation', '-framerate', '30', '-i', "0", '-target', 'pal-vcd'];
            break;

        case 'linux':
            command = ['-f', 'v4l2', '-framerate', '1', '-i', '/dev/video0', '-video_size', '640x480'];
            break;

        default:
            throw new Error(`Sorry, your platform ${os.platform()} is not supported.`);

    }
    const pc = spawn('ffmpeg', [...command, '-c:v', 'libtheora', '-q:v', '7', '-c:a', 'libvorbis', '-q:a', '4', '-f', 'ogv', '-']);
    pc.stderr.pipe(process.stderr);
    return pc;
}
