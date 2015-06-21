import Ember from 'ember';
import TravisCache from './travis-cache';

export default function getTravisStatus(repo) {
  let cachedValue, url;

  return new Ember.RSVP.Promise(function(resolve, reject) {

    /* If no repo is passed, reject the promise */

    if (!repo) {
      return reject();
    }

    cachedValue = TravisCache.get(repo);

    /* Else if the value has already been retrieved and cached, return
    the value as a promise so then() will not throw an error */

    if (cachedValue) {
      return resolve(cachedValue);
    }

    url = `https://api.travis-ci.org/repos/${repo}/builds`;

    /* Else, retrieve the build from the Travis API */

    Ember.$.get(url).done(function(builds) {
      let latestBuildResult, status;

      /* If there are no builds, return */

      if (!builds.length) {
        return resolve('no build available');
      }

      /* Get the builds for the repo, grab the latest build,
      and find the result ID */

      latestBuildResult = builds[0]['result'];

      switch (latestBuildResult) {
        case 0: status = 'passing'; break;
        case 1: status = 'failing'; break;
        case null: status = 'build error'; break;
        default: status = 'unknown';
      }

      /* Cache the repo-status KVP */

      TravisCache.set(repo, status);

      /* Return the status */

      resolve(status);
    }).fail(function(data) {
      reject(data);
    });
  });
}
