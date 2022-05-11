const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
const template = require("lodash.template");

try {
  const webhook = core.getInput("webhook");
  const message = core.getInput("message");
  const embed = core.getInput("embed");

  const githubPayload = github.context.payload;

  core.info("payload: " + JSON.stringify(githubPayload));

  const content = template(message)(githubPayload);
  const embedJson = JSON.parse(template(embed)(githubPayload));

  const data = {
    content,
    embeds: [embedJson],
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
  // core.setFailed(error.message);
  core.info("Message failed");
}
