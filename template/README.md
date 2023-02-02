# @<%= repoOwner %>/<%= name %>
[![Build Status][travis-img]][travis-url]
[![Dependency Status][dependency-img]][dependency-url]
[![Code Style][style-img]][style-url]

> <%= description %>
<% if (features.includes('prompts')) { %>
- version: <%= '\<%= version %\>' %>
- author: <%= '\<%= author %\>' %>
- email: <%= '\<%= email %\>' %>
- repoOwner: <%= '\<%= repoOwner %\>' %>
- features: <%= '\<%= features %\>' %>
- year: <%= '\<%= year %\>' %>
- upper: <%= '\<%= upper(name) %\>' %>
<% } %>

## Usage

Prerequisites: [Node.js](https://nodejs.org) (>= 14.14 required, >= 16.13 preferred), [npm](https://www.npmjs.com) (>= 7.x) or [yarn](https://yarnpkg.com) (>= 1.22) and [Git](https://git-scm.com).

```shell
# create <%= name %> apps by this template
$ npx emi <%= name %> my-<%= name %>

# enter generated directory
$ cd my-<%= name %>
```

Or use globally installed emi:

```shell
# Install the `emi` globally
$ npm install emi --global # or `yarn global add emi`

# create <%= name %> apps by this template
$ emi <%= name %> my-<%= name %>

# enter generated directory
$ cd my-<%= name %>
```