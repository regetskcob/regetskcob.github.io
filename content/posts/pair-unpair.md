---
title: "Magic Keyboard and Trackpad on Multiple Macs"
date: "2025-09-08"
summary: "Not havint to manually unpair your devices from one Mac to another."
description: "Using a Magic Keyboard and Trackpad on multiple Macs"
toc: false
readTime: true
autonumber: false
math: false
tags: ["", "mac"]
showTags: false
---

The problem of using a Magic Keyboard and Trackpad on multiple Macs seems to be a recurring issue. 
You basically struggle to switch focus from one Mac to another if those devices are paired to both.

There are some paid apps that promise to fix this, for only **$14.99**! 
But you only need ten free lines of code to make this work (most of the times).

## Requirements

Start by installing [blueutil](https://github.com/toy/blueutil), a CLI for bluetooth on MacOS:

```
brew install blueutil
```

You'll then need to get IDs of your devices as follows:

```
> blueutil --paired
address: <your-keyboard-id>, connected, ... , name: "Magic Keyboard", ...
address: <your-trackpad-id>, connected, ... , name: "Magic Trackpad", ...
```

## Pairing and Unpairing from Terminal

We can use blueutil to pair, unpair, connect and disconnect devices.
To make this easier, I wrote two functions that give you convenient `pair` and `unpair` commands from the terminal, you can simply put them in your `~/.zshrc`:

```sh
MAGIC_KEYBOARD="<your-keyboard-id>"
MAGIC_TRACKPAD="<your-trackpad-id>"

function pair() {
  blueutil --pair $MAGIC_KEYBOARD
  blueutil --pair $MAGIC_TRACKPAD
  blueutil --connect $MAGIC_KEYBOARD
  blueutil --connect $MAGIC_TRACKPAD
}

function unpair() {
  blueutil --disconnect $MAGIC_KEYBOARD
  blueutil --disconnect $MAGIC_TRACKPAD
  blueutil --unpair $MAGIC_KEYBOARD
  blueutil --unpair $MAGIC_TRACKPAD
}
```

Boom you're done. Add these helpers on every Mac, run unpair on one before pairing on the other, 
you might need to turn off and on the keyboard and trackpad before pairing. 