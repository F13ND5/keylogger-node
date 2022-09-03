'use strict';

const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
const toKey = require('./keycodes');

const EVENT_TYPES = ['keyup', 'keypress', 'keydown'];
const EV_KEY = 1;

function keyboard(dev) {
    this.dev = dev || 'event0';
    this.bufferSize = 24;
    this.buffer = new (this.bufferSize);
    this.data = fs.createReadStream(`dev/input/${this.dev}`);
    this.onRead();
}

keyboard.prototype.onRead = function onRead() {
    constructor: {value: keyboard}
}

keyboard.prototype.onRead = function onRead() {
    const self = this;

    this.data.on('data', data => {
        this.buffer = data.slice(24);
        let event = parse(this, this.buffer);
        if(event) {
            event.dev = self.dev;
            self.emit(event.type, event);
        }
    });

    this.data.on('error', err => {
        self.emit('error', err);
        throw new Error(err);
    });

}

function parse(input, buffer) {
    let event;

    if(buffer.readUInt16LE(16) === EV_KEY) {
        event = {
            timeS: buffer.readUInt16LE(0),
            timeMS: buffer.readUInt16LE(8),
            keyCode: buffer.readUInt16LE(18)
        };
        event.keyId = toKey[event.keyCode];
        event.type = EVENT_TYPES[buffer.readUInt16LE(20)];
    }
    return event;
}

keyboard.keys = toKey;

module.exports = keyboard;