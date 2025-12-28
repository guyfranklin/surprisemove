
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Trophy, Gamepad2 } from 'lucide-react';

// GAME CONSTANTS
const FPS = 60;
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots)
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const TURN_SPEED = 360; // turn speed in degrees per second
const ASTEROID_NUM = 3; // starting number of asteroids
const ASTEROID_SIZE = 100; // starting size of asteroids in pixels
const ASTEROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ASTEROID_VERT = 10; // average number of vertices on each asteroid
const ASTEROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const LASER_MAX = 10; // max number of lasers on screen at once
const LASER_SPD = 500; // speed of lasers in pixels per second
const LASER_EXPLODE_DUR = 0.1; // duration of the lasers' explosion in seconds

interface Point {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Ship {
  x: number;
  y: number;
  a: number; // angle
  r: number; // radius
  blinkNum: number;
  blinkTime: number;
  canShoot: boolean;
  dead: boolean;
  explodeTime: number;
  lasers: Laser[];
  rot: number; // rotation speed
  thrusting: boolean;
  thrust: Velocity;
}

interface Asteroid {
  x: number;
  y: number;
  xv: number;
  yv: number;
  a: number; // angle
  r: number; // radius
  vert: number; // vertices
  offs: number[]; // offset array for jaggedness
}

interface Laser {
  x: number;
  y: number;
  xv: number;
  yv: number;
  explodeTime: number;
}

export const ArcadeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game State Refs (to avoid closure staleness in loop)
  const shipRef = useRef<Ship | null>(null);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const scoreRef = useRef(0);
  const levelRef = useRef(0);

  // Input State
  const keys = useRef({
    left: false,
    right: false,
    up: false,
    space: false
  });

  const createAsteroid = (x: number, y: number, r: number): Asteroid => {
    const lvlMult = 1 + 0.1 * levelRef.current;
    const roid: Asteroid = {
      x,
      y,
      xv: Math.random() * ASTEROID_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
      yv: Math.random() * ASTEROID_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
      a: Math.random() * Math.PI * 2,
      r,
      vert: Math.floor(Math.random() * (ASTEROID_VERT + 1) + ASTEROID_VERT / 2),
      offs: []
    };

    // Populate offsets
    for (let i = 0; i < roid.vert; i++) {
      roid.offs.push(Math.random() * ASTEROID_JAG * 2 + 1 - ASTEROID_JAG);
    }
    return roid;
  };

  const newLevel = (canvas: HTMLCanvasElement) => {
    createAsteroidBelt(canvas);
  };

  const createAsteroidBelt = (canvas: HTMLCanvasElement) => {
    asteroidsRef.current = [];
    let x, y;
    for (let i = 0; i < ASTEROID_NUM + levelRef.current; i++) {
      // random asteroid location (not touching spaceship)
      do {
        x = Math.floor(Math.random() * canvas.width);
        y = Math.floor(Math.random() * canvas.height);
      } while (distBetweenPoints(canvas.width / 2, canvas.height / 2, x, y) < ASTEROID_SIZE * 2 + SHIP_SIZE);
      
      // Start with full size asteroids
      asteroidsRef.current.push(createAsteroid(x, y, ASTEROID_SIZE));
    }
  };

  const distBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const shootLaser = (ship: Ship) => {
    if (ship.canShoot && ship.lasers.length < LASER_MAX) {
      ship.lasers.push({ // from the nose of the ship
        x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
        xv: LASER_SPD * Math.cos(ship.a) / FPS,
        yv: -LASER_SPD * Math.sin(ship.a) / FPS,
        explodeTime: 0
      });
    }
    // prevent further shooting
    ship.canShoot = false;
  };

  const resetGame = (canvas: HTMLCanvasElement) => {
    levelRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    
    shipRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      a: 90 / 180 * Math.PI, // convert to radians
      r: SHIP_SIZE / 2,
      blinkNum: 0,
      blinkTime: 0,
      canShoot: true,
      dead: false,
      explodeTime: 0,
      lasers: [],
      rot: 0,
      thrusting: false,
      thrust: {
        x: 0,
        y: 0
      }
    };

    newLevel(canvas);
  };

  const update = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw Space
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState !== 'PLAYING') return;

    const ship = shipRef.current;
    if (!ship) return;

    // THRUST THE SHIP
    if (keys.current.up && !ship.dead) {
        ship.thrusting = true;
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
    } else {
        ship.thrusting = false;
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    // DRAW SHIP
    if (!ship.dead) {
        ctx.strokeStyle = '#ccff00';
        ctx.lineWidth = SHIP_SIZE / 20;
        ctx.beginPath();
        ctx.moveTo( // nose of the ship
            ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
            ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
        );
        ctx.lineTo( // rear left
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
        );
        ctx.lineTo( // rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.stroke();

        if (ship.thrusting) {
            ctx.fillStyle = '#ff00cc';
            ctx.beginPath();
            ctx.moveTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
            );
            ctx.lineTo( // rear center (behind the ship)
                ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
            );
            ctx.lineTo( // rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.fill();
        }
    }

    // DRAW ASTEROIDS
    const asteroids = asteroidsRef.current;
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.strokeStyle = "#fff";
    
    for (let i = 0; i < asteroids.length; i++) {
        // get the asteroid properties
        const a = asteroids[i].x;
        const b = asteroids[i].y;
        const r = asteroids[i].r;
        const a_ang = asteroids[i].a;
        const vert = asteroids[i].vert;
        const offs = asteroids[i].offs;

        // draw the path
        ctx.beginPath();
        for (let j = 0; j < vert; j++) {
            ctx.lineTo(
                a + r * offs[j] * Math.cos(a_ang + j * Math.PI * 2 / vert),
                b + r * offs[j] * Math.sin(a_ang + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        // move the asteroid
        asteroids[i].x += asteroids[i].xv;
        asteroids[i].y += asteroids[i].yv;

        // handle edge of screen
        if (asteroids[i].x < 0 - asteroids[i].r) asteroids[i].x = canvas.width + asteroids[i].r;
        else if (asteroids[i].x > canvas.width + asteroids[i].r) asteroids[i].x = 0 - asteroids[i].r;
        if (asteroids[i].y < 0 - asteroids[i].r) asteroids[i].y = canvas.height + asteroids[i].r;
        else if (asteroids[i].y > canvas.height + asteroids[i].r) asteroids[i].y = 0 - asteroids[i].r;
    }

    // DRAW LASERS
    for (let i = 0; i < ship.lasers.length; i++) {
        if (ship.lasers[i].explodeTime === 0) {
            ctx.fillStyle = "#ccff00";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
            ctx.fill();
        } else {
            // draw the explosion
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "#ff00cc";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
            ctx.fill();
        }

        // move the laser
        ship.lasers[i].x += ship.lasers[i].xv;
        ship.lasers[i].y += ship.lasers[i].yv;

        // handle edge of screen - DESTROY LASER IF OUT OF BOUNDS
        if (ship.lasers[i].x < 0 || ship.lasers[i].x > canvas.width || ship.lasers[i].y < 0 || ship.lasers[i].y > canvas.height) {
            ship.lasers.splice(i, 1);
            i--; // Decrement index since we removed an element
            continue;
        }

        // handle explosion
        if (ship.lasers[i].explodeTime > 0) {
            ship.lasers[i].explodeTime--;
            if (ship.lasers[i].explodeTime === 0) {
                ship.lasers.splice(i, 1);
                i--; // Decrement index
                continue;
            }
        }
    }

    // DETECT LASER HITS ON ASTEROIDS
    let ax, ay, ar, lx, ly;
    for (let i = asteroids.length - 1; i >= 0; i--) {
        ax = asteroids[i].x;
        ay = asteroids[i].y;
        ar = asteroids[i].r;

        for (let j = ship.lasers.length - 1; j >= 0; j--) {
            lx = ship.lasers[j].x;
            ly = ship.lasers[j].y;

            // detect hit
            if (ship.lasers[j].explodeTime === 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {
                // destroy asteroid and activate laser explosion
                ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLODE_DUR * FPS);
                
                // split asteroid if it's large enough (down to 25px)
                if (ar > Math.ceil(ASTEROID_SIZE / 4)) {
                   const newSize = Math.ceil(ar / 2);
                   const r1 = createAsteroid(ax, ay, newSize);
                   const r2 = createAsteroid(ax, ay, newSize);
                   // Give them a velocity boost so the split is obvious
                   r1.xv *= 1.5; r1.yv *= 1.5;
                   r2.xv *= 1.5; r2.yv *= 1.5;
                   asteroids.push(r1);
                   asteroids.push(r2);
                }

                asteroids.splice(i, 1);
                
                // Add Score
                scoreRef.current += 100;
                setScore(scoreRef.current);
                break;
            }
        }
    }

    // CHECK FOR LEVEL COMPLETE
    if (asteroids.length === 0) {
        levelRef.current++;
        newLevel(canvas);
    }

    // MOVE SHIP
    if (!ship.dead) {
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;

        // handle edge of screen
        if (ship.x < 0 - ship.r) ship.x = canvas.width + ship.r;
        else if (ship.x > canvas.width + ship.r) ship.x = 0 - ship.r;
        if (ship.y < 0 - ship.r) ship.y = canvas.height + ship.r;
        else if (ship.y > canvas.height + ship.r) ship.y = 0 - ship.r;

        // rotate ship
        ship.a += ship.rot;
    }

    // SHIP COLLISION
    if (!ship.dead) {
        for (let i = 0; i < asteroids.length; i++) {
            if (distBetweenPoints(ship.x, ship.y, asteroids[i].x, asteroids[i].y) < ship.r + asteroids[i].r) {
                setGameState('GAMEOVER');
                setHighScore(prev => Math.max(prev, scoreRef.current));
                ship.dead = true;
            }
        }
    }

    // ROTATE SHIP INPUT
    if (keys.current.left) ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
    else if (keys.current.right) ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
    else ship.rot = 0;

    // SHOOT INPUT
    if (keys.current.space) shootLaser(ship);
    else ship.canShoot = true;

  }, [gameState]);

  // Game Loop
  useEffect(() => {
    let animationId: number;
    const loop = () => {
      update();
      animationId = window.requestAnimationFrame(loop);
    };
    loop();
    return () => window.cancelAnimationFrame(animationId);
  }, [update]);

  // Key Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow user to type in inputs/textareas without triggering game controls
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea, select')) {
        return;
      }

      // Aggressively prevent default scrolling only for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', ' '].includes(e.key) || 
          ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'ArrowLeft': keys.current.left = true; break;
        case 'ArrowRight': keys.current.right = true; break;
        case 'ArrowUp': keys.current.up = true; break;
        case 'Space': keys.current.space = true; break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Still clear keys even if in input (prevents stuck keys)
      switch (e.code) {
        case 'ArrowLeft': keys.current.left = false; break;
        case 'ArrowRight': keys.current.right = false; break;
        case 'ArrowUp': keys.current.up = false; break;
        case 'Space': keys.current.space = false; break;
      }
    };

    // Use passive: false to ensure preventDefault works
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = () => {
    if (canvasRef.current) {
      resetGame(canvasRef.current);
      setGameState('PLAYING');
      // Focus container to help capture inputs
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <div 
        ref={containerRef}
        className="relative border-4 border-gray-700 bg-black rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden focus:outline-none focus:ring-4 focus:ring-acid-green"
        tabIndex={0}
      >
        
        {/* Arcade Cabinet Header */}
        <div className="bg-gray-800 p-2 border-b-4 border-gray-900 flex justify-between items-center text-gray-400 font-mono text-sm">
           <div className="flex items-center gap-2">
             <Gamepad2 size={16} />
             <span>ASTRO-THRASHER.ROM</span>
           </div>
           <div className="flex gap-4">
             <span className="text-acid-green">SCORE: {score}</span>
             <span className="text-shock-pink">HIGH: {highScore}</span>
           </div>
        </div>

        {/* CRT Container */}
        <div className="relative aspect-[4/3] bg-black border-8 border-gray-900 shadow-inner">
           
           {/* Screen Overlay Effects */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 pointer-events-none opacity-20"></div>
           <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>

           <canvas 
             ref={canvasRef} 
             className="block w-full h-full"
             width={800}
             height={600}
           />

           {/* START SCREEN */}
           {gameState === 'START' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/60">
                <h2 className="text-6xl font-sans text-acid-green mb-4 glitch-text">ASTRO THRASHER</h2>
                <p className="font-mono text-white mb-8 text-center max-w-md">
                  USE ARROW KEYS TO THRUST & TURN<br/>SPACEBAR TO SHOOT<br/>DESTROY ALL CORPORATE ASSETS
                </p>
                <button 
                  onClick={startGame}
                  className="bg-shock-pink text-white font-bold font-mono px-8 py-3 text-xl border-4 border-white hover:bg-white hover:text-black animate-pulse flex items-center gap-2"
                >
                  <Play size={24} fill="currentColor" /> INSERT COIN
                </button>
             </div>
           )}

           {/* GAME OVER SCREEN */}
           {gameState === 'GAMEOVER' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/80">
                <Trophy size={64} className="text-yellow-500 mb-4" />
                <h2 className="text-6xl font-sans text-red-500 mb-2">WIPEOUT</h2>
                <p className="font-mono text-2xl text-white mb-8">FINAL SCORE: {score}</p>
                <button 
                  onClick={startGame}
                  className="bg-acid-green text-black font-bold font-mono px-8 py-3 text-xl border-4 border-black hover:bg-white flex items-center gap-2"
                >
                  <RotateCcw size={24} /> TRY AGAIN
                </button>
             </div>
           )}

        </div>

        {/* Controls Hint */}
        <div className="bg-gray-900 p-2 text-center font-mono text-xs text-gray-500 border-t-4 border-gray-900">
          ARROWS = MOVE // SPACE = FIRE
        </div>
      </div>
    </div>
  );
};
