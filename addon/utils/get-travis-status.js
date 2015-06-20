import Ember from 'ember';
import TravisCache from 'ember-travis-status/services/travis-cache';

export default function getTravisStatus(repo, branch) {
  const cachedValue = TravisCache[repo]; // Incase repo is not passed
  let url;

  console.log();

  if (!repo) {
    return;
  } else if (cachedValue) {
    Ember.debug(`Returning cached value for ${repo}`);

    return new Ember.RSVP.Promise(function(resolve) {
      resolve(cachedValue);
    });
  }

  url = `https://api.travis-ci.org/repos/${repo}/builds`;

  if (branch) {
    url += `?${branch}`;
  }

  return new Ember.RSVP.Promise(function(resolve, reject) {
    Ember.$.get(url).done(function(builds) {
      const latestBuildResult = builds[0]['result'];

      let status;

      Ember.debug(`Fetched new value for ${repo}`);

      switch (latestBuildResult) {
        case 0: status = 'passing'; break;
        case 1: status = 'failing'; break;
        default: status = 'Unknown';
      }

      TravisCache[repo] = status;

      resolve(status);
    }).fail(function(data) {
      reject(data);
    });
  });
}
