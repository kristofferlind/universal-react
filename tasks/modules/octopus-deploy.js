const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const requestSync = require('request');
const settings = require('../../ci-settings.js');

const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Octopus-ApiKey': settings.octopusApiKey
};

function createRelease(version, projectId, selectedPackages) {
  const createOptions = {
    method: 'POST',
    uri: `${settings.octopusApiEndpoint}/releases`,
    json: true,
    headers: requestHeaders,
    body: {
      ProjectId: projectId,
      ReleaseNotes: '',
      Version: version,
      SelectedPackages: selectedPackages
    }
  };

  return request(createOptions)
  .catch((reason) => {
    throw new Error(`Unable to create release, details: ${JSON.stringify(reason)}`);
  });
}

function deployRelease(releaseId, environmentId) {
  const deployOptions = {
    method: 'POST',
    uri: `${settings.octopusApiEndpoint}/deployments`,
    json: true,
    headers: requestHeaders,
    body: {
      ReleaseId: releaseId,
      EnvironmentId: environmentId
    }
  };

  return request(deployOptions)
  .catch((reason) => {
    throw new Error(`Unable to trigger deploy, details: ${JSON.stringify(reason)}`);
  });
}

function getTask(taskId) {
  const taskOptions = {
    method: 'GET',
    uri: `${settings.octopusApiEndpoint}/tasks/${taskId}/details`,
    json: true,
    headers: requestHeaders
  };

  return request(taskOptions)
  .catch((reason) => {
    throw new Error(`Unable to get task information: ${JSON.stringify(reason)}`);
  });
}

function logRunningActivities(indent, parent) {
  if (parent.Status === 'Running') {
    const padding = indent > 0 ? new Array(indent * 2).join(' ') : '';
    const message = `${padding}Running: ${parent.Name}\n`;
    console.log(message); // eslint-disable-line no-console
  }

  parent.Children.forEach(child => logRunningActivities(indent + 1, child));
}

function wait(milliseconds, state) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(state);
    }, milliseconds);
  });
}

function waitForTaskComplete({ taskId, retries, pollInterval }) {
  return getTask(taskId)
    .then((task) => {
      if (task.Task.IsCompleted) {
        if (task.Task.FinishedSuccessfully) {
          return task;
        }
        throw new Error(`Task did not finish successfully: ${JSON.stringify(task)}`);
      }

      console.log(`Deployment running for ${task.Task.Duration}`);  // eslint-disable-line no-console
      task.ActivityLogs.forEach(activityLog => logRunningActivities(0, activityLog));

      const remainingTries = retries - 1;
      if (remainingTries < 0) {
        throw new Error(`timed out waiting for task to complete: ${JSON.stringify(task)}`);
      }

      return wait(pollInterval, { taskId, retries: remainingTries, pollInterval })
        .then(waitForTaskComplete);
    });
}

function uploadZipPackage(file) {
  return new Promise((resolve, reject) => {
    const endpoint = `${settings.octopus.apiEndpoint}/packages/raw?apiKey=${settings.octopus.apiKey}`;
    const formdata = {
      packagefile: {
        value: fs.createReadStream(file),
        options: {
          filename: path.basename(file),
          contentType: 'application/zip'
        }
      }
    };

    requestSync.post({ url: endpoint, formData: formdata }, (error, response, bodyRaw) => {
      if (error) {
        console.log(error); // eslint-disable-line no-console
        return reject(error);
      }

      const body = JSON.parse(bodyRaw);
      if (body.ErrorMessage) {
        console.log(bodyRaw); // eslint-disable-line no-console
        return reject(body);
      }

      console.log(bodyRaw); // eslint-disable-line no-console
      return resolve();
    });
  });
}

module.exports = {
  createRelease,
  deployRelease,
  getTask,
  uploadZipPackage,
  waitForTaskComplete
};
