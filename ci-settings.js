const path = require('path');
const packageSpecification = require('./package.json');

const buildNumber = process.env.BUILD_NUMBER || 0;
const version = `${packageSpecification.version}.${buildNumber}`;
const packageName = `universal-react.${version}.zip`;
const packagesFolder = 'deploy-packages';

module.exports = {
  version,
  isCIBuild: !!process.env.BUILD_NUMBER,
  packageName,
  packagesFolder,
  packagePath: path.resolve(packagesFolder, packageName),
  octopus: {
    apiKey: process.env.OCTOPUS_API_KEY,
    apiEndpoint: process.env.OCTOPUS_API_ENDPOINT,
    projectId: process.env.OCTOPUS_PROJECT_ID,
    environmentId: process.env.OCTOPUS_ENVIRONMENT_ID,
    channelId: process.env.OCTOPUS_CHANNEL_ID,
    processSteps: ['Deploy']
  },
  jenkins: {
    apiURL: process.env.JENKINS_URL,
    buildURL: process.env.BUILD_URL,
    buildLog: `${process.env.BUILD_URL}/console`,
    apiUser: process.env.JENKINS_API_USER,
    apiKey: process.env.JENKINS_API_KEY
  },
  slack: {
    username: 'Deploy-bot',
    webhook: process.env.SLACK_WEBHOOK,
    channel: process.env.SLACK_CHANNEL
  }
};
