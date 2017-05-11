const settings = require('../ci-settings');
const slack = require('./modules/slack')(settings.slack);
const octopus = require('./modules/octopus-deploy-info')(settings.octopus);
const gulp = require('gulp');
const jenkins = require('./modules/jenkins')(settings.jenkins);

gulp.task('notify', () => jenkins.getBuildInfo()
    .then(buildInfo => octopus.getDeployInfo().then((deployInfo) => {
      let outcome = '@channel Failed';
      let color = 'ff0000';
      let icon = ':x:';
      console.log('BUILD INFO: ', JSON.stringify(buildInfo, null, 2));  // eslint-disable-line no-console
      console.log('DEPLOY INFO: ', JSON.stringify(deployInfo, null, 2));  // eslint-disable-line no-console
      const isBuildSuccess = (buildInfo.status === 'SUCCESS' || buildInfo.result === 'SUCCESS');
      const isDeploySuccess = deployInfo.Task.State === 'Success';
      if (isBuildSuccess && isDeploySuccess) {
        outcome = 'Success';
        color = '00dd00';
        icon = ':white_check_mark:';
      }
      const attachments = [{
        pretext: 'Changes:',
        text: buildInfo.changeSets.map(changeSet =>
          (changeSet.items && changeSet.items.map(change =>
            `${change.author.fullName} -> ${change.comment} (${change.date})`).join('\n'))
          || 'No changes'
        ).join('\n'),
        color
      }];
      slack.sendMessage(
        `${outcome} deploying ${settings.version}. <${settings.jenkins.buildLog}|Build log>`,
        attachments,
        icon
      );
    })
  ));
