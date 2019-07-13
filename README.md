# irv-algo

irv-algo is an implementation of instant-runoff-voting written in Typescript and NodeJS. It is currently in heavy development and not recommended for production use. 

## Installation

    npm install irv-algo -D

:P it's pretty easy

## Usage

For example usage, see the test.ts file. Usage is very similar with plain javascript.

Importing classes in Javascript:

    const Poll = require("irv-algo/dist/poll.js").Poll;
    const Ballot = require("irv-algo/dist/ballot.js").Ballot;

Importing classes in Typescript:

    import { Poll } from 'irv-algo/dist/poll.js';
    import { Ballot } from 'irv-algo/dist/ballot.js';
