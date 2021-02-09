# Guild Of Wicked (prototype)
*by Mark Dolbyrev*

## Web App
https://deletris-static.herokuapp.com/guildofwicked/index.html

## Detailed Presentation
https://deletris-static.herokuapp.com/guildofwicked/assets/others/code-challenge-follow-up.pdf

## System Requirements

The app was built on macOS v10.15.3, Node.js v13.10.1, Npm 6.13.7. Other environments are not tested (e.g. Windows/Linux, other Node/NPM versions).

## How To

### Run Dev 
1. Download the repo
2. ``npm i``
3. ``npm run dev``

As a result the http://localhost:9000/ URL would be open with the game prototype in it.

### Prepare Prod Build
``npm run build:prod``

The prod build files would be located in the **dist/** folder.

## Key Points From The Code Challenge Instruction

### Front-end vs Back-end
The current app is focused on the implementation of the client-side app. Though a server-side emulation layer is added.

### Technical And Architectural Choices
The main reason is that I've been using the shown architectural solutions for quite some time in different commercial and pet projects. I found this architectural approach be flexible enough to develop different type of applications. The problem that it might be an overkill for the game-prototype. But I would like to be able to discuss and defend some of the programming decisions I made, instead of just using excuses like "Oh, don't look there, it's just a prototype in real apps it would be different".

### Trade-offs, Anything You Left Out, What You Might Do
One of the trade-offs of this app is that it consists of more classes than a small prototype, which means that it would be harder to understand and "read" (in comparison to small prototype apps).

The architecture uses MVC as the main approach for app components. For some people the fact that there are no strict-academic rules like "views should know nothing about models" might be a trade-off, for me it's and advantage which gives a way to be flexible when it's needed and be focused on the final product, not on the academical programming.

More information about the reasoning behind the architecture, decisions I made and trade-offs might be found in the presentation file: https://deletris-static.herokuapp.com/guildofwicked/assets/others/code-challenge-follow-up.pdf
