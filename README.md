# Guild Of Wicked
*by Mark Dolbyrev for Game Closure Code Challenge*

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
One of the trade-offs of this app is that it consists of more classes than a small prototype, which mean that it would be harder to understand and "read" (in comparison to small prototype apps).

c. 
d. Trade-offs you might have made, anything you left out, or what you might do
differently if you were to spend additional time on the project.
e. Link to to the hosted application if applicable.
