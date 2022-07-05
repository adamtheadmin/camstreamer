import readline from 'readline';
import {promises} from 'fs';
import {execFileSync} from 'child_process';
import path from "path";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function requestInput(question: string):Promise<any> {
   return new Promise((resolve) => {
       process.stdout.write(question + ': ');
       rl.on('line', (input:any) => {
           resolve(input);
       });
   })
}

console.log("Welcome to the camstreamer install script.");

(async function begin(): Promise<any> {
    console.log('')
    try {
        await promises.access('/etc/systemd/system');
    } catch(e) {
        console.error(`Could not access the systemd dir. Are you root?`);
        process.exit(1);
    }
    const systemdScript:string = await requestInput('What should the systemd script be named?');

    if (systemdScript === '') {
        console.log(`Invalid systemD script name: ${systemdScript}`);
        return await begin();
    }

    const port:string = await requestInput('Which Port should the service run on?');

    if (isNaN(+port)) {
        console.log(`Invalid port number: ${port}`);
        return await begin();
    }

    const pathToNode = execFileSync('which', ['node']).toString().trim();
    const user = execFileSync('whoami', []).toString().trim();
    const cwd:string = path.resolve(__dirname, '../');
    const indexScript:string = path.resolve(cwd, 'index.js');

    console.log("Do these settings look ok?");
    console.log({pathToNode, user, systemdScript, port, cwd});

    if ((await requestInput('Y/N')).toLowerCase() !== 'y') {
        return await begin();
    }

    console.log('Generating Script...');
    const template = (await promises.readFile(__dirname + '/camstreamer.service'))
        .toString()
        .replace('%user%', user)
        .replace('%pathtonode%', pathToNode)
        .replace('%pathtoindex%', indexScript)
        .replace('%currentdirectory%', cwd)
        .replace('%port%', port);

   const writepath = path.resolve('/etc/systemd/system/', `${systemdScript}.service`);

   await promises.writeFile(writepath, template);
   console.log(`Systemd script created at ${writepath}!`);
   console.log("Compiling TS...");
   execFileSync('tsc', ['--noEmit', 'false']);
   console.log('Enabling Script...');
   execFileSync('systemctl', ['enable', `${systemdScript}.service`]);
   execFileSync('systemctl', ['start', `${systemdScript}.service`]);
   console.log("Script Enabled!");
   console.log(`Cam streamer running on port ${port}`);
   process.exit(0);
})()
