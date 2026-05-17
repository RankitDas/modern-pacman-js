# Pac-Man Game

A modern browser-based Pac-Man game built with HTML5 Canvas and vanilla JavaScript.

## Features

- **Classic Gameplay**: Move through mazes, collect pellets, and avoid ghosts
- **Smooth Controls**: Arrow keys or WASD for movement
- **Ghost AI**: Four ghosts with chase and random movement behavior
- **Score System**: Points for pellets collected
- **Lives System**: 3 lives to complete the level
- **Audio**: Web Audio API sound effects
- **Modern UI**: Dark theme with responsive design
- **Pause/Resume**: Press P to pause the game
- **Mute Toggle**: Press M to mute sounds

## How to Play

1. Open `index.html` in a modern web browser
2. Click "START GAME" to begin
3. Use **Arrow Keys** or **WASD** to move Pac-Man
4. Collect all pellets to win
5. Avoid the ghosts or lose a life
6. Press **P** to pause/resume
7. Press **M** to mute/unmute sounds

## Game Rules

- Collect all pellets to win the level
- Avoid colliding with ghosts
- You have 3 lives
- Each pellet collected = 10 points
- Winning a level = 100 bonus points

## Technical Details

- **Canvas**: 800x600 pixels
- **Grid**: 20x15 tiles (40px per tile)
- **Architecture**: Modular ES6 classes
- **No Dependencies**: Pure JavaScript with Canvas API
- **Optimized**: Efficient collision detection and rendering

## File Structure

```
pacman_game/
├── index.html          # Main HTML file
├── style.css           # Styling
├── README.md           # This file
└── js/
    ├── main.js         # Entry point
    ├── game.js         # Game engine & loop
    ├── player.js       # Player class
    ├── ghost.js        # Ghost class with AI
    ├── maze.js         # Maze generation
    ├── collision.js    # Collision detection
    ├── input.js        # Input handling
    ├── ui.js           # UI management
    ├── audio.js        # Sound effects
    └── utils.js        # Constants & helpers
```

## Browser Support

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 Modules
- Web Audio API (optional for sound)

## Performance

- 60 FPS gameplay
- Efficient collision detection
- Optimized rendering pipeline
- Delta time support for frame-rate independence

Enjoy!
