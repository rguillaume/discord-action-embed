# discord-action-embed

Send a message to a [Discord](https://discord.com/) webhook. Follow [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to create a webhook if you don't have one already.

## Example usage

```
name: Deploy
on: push
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
    - name: discord
      uses: sebastianpopp/discord-action@releases/v1
      with:
        webhook: ${{ secrets.DISCORD_WEBHOOK }}
        message: ${{ github.repository }} has been successfullly deployed.
        embed: '{ "title": "{{ pull_request.title }}", "description": "{{ pull_request.body }}", "url": "{{ pull_request.html_url }}", "author": { "name": "{{ pull_request.user.login }}", "icon_url": "{{ pull_request.user.avatar_url }}"} }'
```

## Input parameters

Input parameter | Description                                                                                                                                                            | Required | Default
--- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | ---
webhook | Discord webhook URL. Follow [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to create a webhook if you don't have one already. | Yes | N/A
message | Message to be sent                                                                                                                                                     | Yes | N/A
embed | Embed json content, **embed color** list can be found [here](https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812)                                       | No | N/A

## Testing / Contributing.

We suggest everyone uses a tool like https://github.com/nektos/act to test GitHub actions locally. This is the tool I use so the directory structure will reflect that. If the following command does not pass, I will not accept your PR.

install act see https://github.com/nektos/act for instructions.
cp .env.example .env paste discord commit url into .env
make sure the following command passes.
act pull_request -W tests/workflows -e tests/mock-payload.json