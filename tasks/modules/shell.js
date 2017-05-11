const spawn = require('child_process').spawn;

const processes = [];

module.exports = (fullCommand, isDetached) => {
  const options = {
    cwd: process.cwd(),
    detached: isDetached
  };
  const commandParts = fullCommand.split(/ (.+)/);
  const command = commandParts[0];
  const argument = commandParts[1];
  const shell = spawn(command, argument.split(' '), options);
  shell.stdout.setEncoding('utf8');
  shell.stderr.setEncoding('utf8');
  shell.stdout.on('data', (data) => {
    console.log(data); // eslint-disable-line no-console
  });
  shell.stderr.on('data', (data) => {
    console.log(data, true); // eslint-disable-line no-console
  });
  shell.on('close', (exitCode) => {
    if (exitCode) {
      console.log('Got exitCode: ', exitCode, ' from shell command ', command, ' with arguments: ', argument); // eslint-disable-line no-console
    }
  });

  return shell;
};

process.on('close', () => {
  processes.forEach(subProcess => subProcess.kill());
});
