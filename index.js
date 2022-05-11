const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
const template = require("lodash.template");

try {
  const webhook = core.getInput("webhook");
  const message = core.getInput("message");
  const embed = core.getInput("embed");

  const githubPayload = github.context.payload;

  const content = template(message)(githubPayload);
  const embedJson = !!embed
    ? JSON.parse(template(embed)(githubPayload))
    : undefined;

  const data = {
    content,
    embeds: !!embed ? [embedJson] : [],
  };

  const options = {
    method: "POST",
    url: webhook,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  axios.request(options).then(() => {
    core.info("Message was sent successfully");
  });
} catch (error) {
  core.setFailed(error.message);
  // core.info("Message failed");
}
