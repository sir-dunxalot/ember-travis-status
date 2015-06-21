Ember-travis-status [![Build Status](https://travis-ci.org/sir-dunxalot/ember-travis-status.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-travis-status)
======

This Ember addon provides you with utilities for retrieving the build status of any **public** Travis CI repo and components to show dynamic content based on the returned status.

Build statuses are cached in the app session to avoid unnecessary API calls.

## Contents

- [Installation](#installation)
- [Utilities](#utilities)
  - [`getTravisStatus()`](#gettravisstatus)
- [Components](#components)
  - [`{{travis-badge}}`](#travis-badge)
  - [`{{travis-status}}`](#travis-status)

## Installation

```sh
ember install ember-travis-status
```

## Utilities

All components in this addon call a single utility, which can be used independently: `getTravisStatus()`.

### getTravisStatus

`getTravisStatus()` expects a single param, `repo`, which is the `username/repo-name` combo Travis uses to identify repos.

It returns a string of the build status of any **public** repo. Current values returned are:

- `'passing'` - The latest build is passing
- `'failing'` - The latest build is failing
- `'error'` - The latest build could not complete due to an error
- `'no build available'` - There were no builds returned by the Travis API
- `'unknown'` - There was an issue with the Travis API response or some other error

```js
import getTravisStatus from 'ember-travis-status/utils/get-travis-status';

getTravisStatus('sir-dunxalot/ember-modals'); // 'passing'
// or
getTravisStatus('emberjs/emberjs-build'); // 'passing'
// or
getTravisStatus('sir-dunxalot/some-fake-repo'); // 'no build available'
```

|         | Name            | Type   | Description                                                                                                                            |   |
|---------|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|---|
| Method  | getTravisStatus | N/A    | A utility to get the travis status of the latest build for any public Travis CI repo                                                   |   |
| Param   | repo            | String | The username/repo-name that identifies the public Travis CI repo                                                                       |   |
| Returns | status          | String | The latest build status for the repo. Currently supported values are `'passing'`, `'failing'`, `'error'` (build error), `'no build available'` (no builds returned by the Travis API), or `'unknown'` |   |

## Components

### Travis Badge

This component displays the common Travis badge for any repo. An example is shown at the top of this README. The SVG badge is loaded inside an HTML `<object>`.

You may pass the component `repo` and `branch` attributes:

```hbs
{{travis-badge repo='sir-dunxalot/ember-modals'}}
{{!--Or--}}
{{travis-badge repo='sir-dunxalot/ember-modals' branch='develop'}}
```

### Travis Status

This component works in a similar way to the `{{travis-badge}}` component but will show custom HTML based on the build status retrieved by `getTravisStatus()`.

First, setup up your template and component:

```js
// app-name/components/travis-status.js

import TravisStatusComponent from 'ember-travis-status/components/travis-status';

export default TravisStatusComponent.extend({
  tagName: 'dl',
});
```

```hbs
{{!--app-name/templates/components/travis-status.hbs--}}

<dt class="hidden">Build Status for {{repo}}</dt>
<dd>
  <span class="text">{{status}}</span>

  {{#if isPassing}}
    <span class="icon-success"></span>
  {{/if}}

  {{#if isFailing}}
    <span class="icon-error"></span>
  {{/if}}
</dd>
```

You can see the full list of properties available [inside the component here](https://github.com/sir-dunxalot/ember-travis-status/blob/master/addon/components/travis-status.js).

Then place the `{{travis-status` somewhere in your templates:

```hbs
{{travis-status repo='sir-dunxalot/ember-modals'}}
```

## Development

- `git clone https://github.com/sir-dunxalot/ember-travis-status.git`
- `ember s`
- `ember test` or navigate to the `/tests` route
