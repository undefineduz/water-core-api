import { exec } from 'child_process';

export function setTimeZone() {
    const command = 'sudo timedatectl set-timezone Asia/Tashkent';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}