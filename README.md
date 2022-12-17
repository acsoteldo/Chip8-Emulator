## WIP Chip8-Emulator

Shogi, also known as Japanese chess is a two-player strategy board game that is played on a board with squares arranged in a grid. Shogi is similar to Western chess in many ways, but it has a few key differences that make it a unique and challenging game.
One key difference between Shogi and Western chess is that captured pieces can be returned to the board as part of the player's own army. This allows players to bring back powerful pieces that have been captured and use them to their advantage.
Another difference is that Shogi pieces are inscribed with kanji characters, which represent their movements and powers. This makes it easy for players to quickly identify the strengths and abilities of each piece on the board.
Shogi is a popular board game in Japan and is enjoyed by players of all ages. It is considered to be a strategic and challenging game that requires a combination of skill, strategy, and tactics to master. 

Standard Shogi rules apply, you can read about them here: [shogi-rules](https://www.shogi.cz/en/rules)


A Chip-8 emulator consists of several key components, including a CPU, a memory system, a graphics system, and an input system. 

* Implement the CPU. The CPU is responsible for executing Chip-8 instructions, so this is an important part of the emulator. You'll need to write code to fetch and decode instructions, and then execute them.

* Implement the memory system. Chip-8 has a simple memory system consisting of 4096 bytes of RAM. You'll need to write code to read and write to this memory, as well as to load programs into memory.

* Implement the graphics system. Chip-8 has a simple graphics system that uses a 64x32 pixel display. You'll need to write code to draw graphics on the screen and handle basic graphics operations like clearing the screen and setting pixels.

* Implement the input system. Chip-8 has a simple input system that uses a hexadecimal keypad for input. You'll need to write code to handle input from the keypad and map it to the appropriate actions in your emulator.


### Study

https://code.austinmorlan.com/austin/2019-chip8-emulator/src/branch/master/Source/Chip8.hpp
https://github.com/ryuichiokubo/Shogi/tree/master/war
