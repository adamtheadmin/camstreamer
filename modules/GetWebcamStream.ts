import os from 'os';
import {ChildProcessWithoutNullStreams, spawn} from 'child_process';

let encodingProcess: ChildProcessWithoutNullStreams[] = [];

export default function GetWebcamStream(): { stream: ChildProcessWithoutNullStreams; kill: () => void } {
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

    pc.stdout.on('unpipe', () => {
        pc.kill('SIGINT');
    });

    const kill = () => {
        pc.kill('SIGINT');
    };

    return {
        stream: pc,
        kill
    };
}

