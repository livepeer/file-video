// @ts-nocheck

let rgbString = 'rgba(0,235,136,'; //partial string for color which will be completed by appending alpha value.
let sphereRad = 280;
let radius_sp = 1;
const wait = 1;
const numToAddEachFrame = 7;
const particleAlpha = 1;
const fLen = 320; //represents the distance from the viewer to z=0 depth.
const zMax = fLen - 2; //we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).

function getProjCenterX(displayWidth: number) {
  // Some brekpoints
  if (displayWidth < 1280) return Math.round(displayWidth / 2);
  return Math.round(displayWidth * 0.7);
}

const canvasEffect = () => {
  const canvas = document.querySelector('#particles-canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d', { alpha: false });

  let displayWidth = canvas.width;
  let displayHeight = canvas.height;
  //projection center coordinates sets location of origin
  let projCenterX = getProjCenterX(displayWidth);
  let projCenterY = displayHeight / 2;

  const timers = [];
  let direction = 'top';
  let count: number;
  let particleList: { first?: any };
  let recycleBin: { first?: any };
  let m: number;
  let turnAngle: number;
  let turnSpeed: number;
  let sphereCenterX: number, sphereCenterY: number, sphereCenterZ: number;
  let particleRad: number;
  let zeroAlphaDepth: number;
  let randAccelX: number, randAccelY: number, randAccelZ: number;
  let gravity: number;
  //we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
  let p: {
    next: any;
    age?: any;
    stuckTime?: any;
    velX?: any;
    accelX?: any;
    velY?: any;
    accelY?: any;
    velZ?: any;
    accelZ?: any;
    x?: any;
    y?: any;
    z?: any;
    projX?: any;
    projY?: any;
    attack?: any;
    hold?: any;
    decay?: any;
    alpha?: any;
    holdValue?: any;
    initValue?: any;
    lastValue?: any;
    dead?: any;
  };
  let outsideTest: boolean;
  let nextParticle: any;
  let sinAngle: number;
  let cosAngle: number;
  let rotX: number, rotZ: number;
  let depthAlphaFactor: number;
  let i: number;
  let theta: number, phi: number;
  let x0: number, y0: number, z0: number;

  const requestAnimFrame = (() => {
    return (
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  const requestInterval = (fn: { (): void; (): void; call?: any }, delay: number) => {
    var start = new Date().getTime(),
      handle = {};
    function loop() {
      // @ts-ignore
      handle.value = requestAnimFrame(loop);
      var current = new Date().getTime(),
        delta = current - start;
      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }
    }
    // @ts-ignore
    handle.value = requestAnimFrame(loop);
    return handle;
  };

  const handleDirection = () => {
    if (direction === 'top') {
      sphereRad += 5;
      if (sphereRad > 600) direction = 'bottom';
    } else {
      sphereRad -= 5;
      if (sphereRad < 50) direction = 'top';
    }
  };

  const loop = (p) => {
    //before list is altered record next particle
    nextParticle = p.next;

    //update age
    p.age++;

    //if the particle is past its "stuck" time, it will begin to move.
    if (p.age > p.stuckTime) {
      p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
      p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
      p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

      p.x += p.velX;
      p.y += p.velY;
      p.z += p.velZ;
    }

    /*
  We are doing two things here to calculate display coordinates.
  The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
  x and z (but the y coordinate will not change).
  Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
  */
    rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
    rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
    m = (radius_sp * fLen) / (fLen - rotZ);
    p.projX = rotX * m + projCenterX;
    p.projY = p.y * m + projCenterY;

    //update alpha according to envelope parameters.
    if (p.age < p.attack + p.hold + p.decay) {
      if (p.age < p.attack) {
        p.alpha = ((p.holdValue - p.initValue) / p.attack) * p.age + p.initValue;
      } else if (p.age < p.attack + p.hold) {
        p.alpha = p.holdValue;
      } else if (p.age < p.attack + p.hold + p.decay) {
        p.alpha = ((p.lastValue - p.holdValue) / p.decay) * (p.age - p.attack - p.hold) + p.holdValue;
      }
    } else {
      p.dead = true;
    }

    //see if the particle is still within the viewable range.
    if (p.projX > displayWidth || p.projX < 0 || p.projY < 0 || p.projY > displayHeight || rotZ > zMax) {
      outsideTest = true;
    } else {
      outsideTest = false;
    }

    if (outsideTest || p.dead) {
      recycle(p);
      p = null;
    } else {
      //depth-dependent darkening
      depthAlphaFactor = 1 - rotZ / zeroAlphaDepth;
      depthAlphaFactor = depthAlphaFactor > 1 ? 1 : depthAlphaFactor < 0 ? 0 : depthAlphaFactor;
      context.fillStyle = rgbString + depthAlphaFactor * p.alpha + ')';

      //draw
      context.beginPath();
      context.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false);
      context.closePath();
      context.fill();
    }

    return (p = nextParticle);
  };

  const tick = () => {
    //if enough time has elapsed, we will add new particles.
    count++;
    if (count >= wait) {
      count = 0;
      for (i = 0; i < numToAddEachFrame; i++) {
        theta = Math.random() * 2 * Math.PI;
        phi = Math.acos(Math.random() * 2 - 1);
        x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
        y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
        z0 = sphereRad * Math.cos(phi);

        //We use the addParticle function to add a new particle. The parameters set the position and velocity components.
        //Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
        //it becomes unstuck).
        var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);

        //we set some "envelope" parameters which will control the evolving alpha of the particles.
        p.attack = 50;
        p.hold = 50;
        p.decay = 100;
        p.initValue = 0;
        p.holdValue = particleAlpha;
        p.lastValue = 0;

        //the particle will be stuck in one place until this time has elapsed:
        p.stuckTime = 90 + Math.random() * 20;

        p.accelX = 0;
        p.accelY = gravity;
        p.accelZ = 0;
      }
    }

    //update viewing angle
    turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
    sinAngle = Math.sin(turnAngle);
    cosAngle = Math.cos(turnAngle);

    //background fill
    context.fillStyle = '#000000';
    context.fillRect(0, 0, displayWidth, displayHeight);

    //update and draw particles
    p = particleList.first;

    while (p != null) {
      p = loop(p);
    }
  };

  const addParticle = (x0: any, y0: any, z0: any, vx0: number, vy0: number, vz0: number) => {
    var newParticle: { next?: any; prev?: any; x?: any; y?: any; z?: any; velX?: any; velY?: any; velZ?: any; age?: any; dead?: any; right?: any };
    var color: any;

    //check recycle bin for available drop:
    if (recycleBin.first != null) {
      newParticle = recycleBin.first;
      //remove from bin
      if (newParticle.next != null) {
        recycleBin.first = newParticle.next;
        newParticle.next.prev = null;
      } else {
        recycleBin.first = null;
      }
    }
    //if the recycle bin is empty, create a new particle (a new ampty object):
    else {
      newParticle = {};
    }

    //add to beginning of particle list
    if (particleList.first == null) {
      particleList.first = newParticle;
      newParticle.prev = null;
      newParticle.next = null;
    } else {
      newParticle.next = particleList.first;
      particleList.first.prev = newParticle;
      particleList.first = newParticle;
      newParticle.prev = null;
    }

    //initialize
    newParticle.x = x0;
    newParticle.y = y0;
    newParticle.z = z0;
    newParticle.velX = vx0;
    newParticle.velY = vy0;
    newParticle.velZ = vz0;
    newParticle.age = 0;
    newParticle.dead = false;
    if (Math.random() < 0.5) {
      newParticle.right = true;
    } else {
      newParticle.right = false;
    }
    return newParticle;
  };

  const recycle = (p: { next: { prev: any }; prev: { next: any } }) => {
    //remove from particleList
    if (particleList.first == p) {
      if (p.next != null) {
        p.next.prev = null;
        particleList.first = p.next;
      } else {
        particleList.first = null;
      }
    } else {
      if (p.next == null) {
        p.prev.next = null;
      } else {
        p.prev.next = p.next;
        p.next.prev = p.prev;
      }
    }
    //add to recycle bin
    if (recycleBin.first == null) {
      recycleBin.first = p;
      p.prev = null;
      p.next = null;
    } else {
      p.next = recycleBin.first;
      recycleBin.first.prev = p;
      recycleBin.first = p;
      p.prev = null;
    }
  };

  const setError = () => {
    rgbString = 'rgba(255,0,0,';
  };

  const clearError = () => {
    rgbString = 'rgba(0,235,136,';
  };

  const onUnmount = () => {
    timers.forEach((timer) => window.clearInterval(timer));
  };

  const onResize = () => {
    displayWidth = canvas.width;
    displayHeight = canvas.height;
    projCenterY = displayHeight / 2;
    projCenterX = getProjCenterX(displayWidth);
  };

  const init = () => {
    count = wait - 1;

    particleList = {};
    recycleBin = {};

    //random acceleration factors - causes some random motion
    randAccelX = 0.1;
    randAccelY = 0.1;
    randAccelZ = 0.1;

    gravity = -0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

    particleRad = 2.5;

    sphereCenterX = 0;
    sphereCenterY = 0;
    sphereCenterZ = -3 - sphereRad;

    //alpha values will lessen as particles move further back, causing depth-based darkening:
    zeroAlphaDepth = -750;

    turnSpeed = (2 * Math.PI) / 1200; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
    turnAngle = 0; //initial angle
  };

  init();
  requestInterval(tick, 10 / 24);
  requestInterval(handleDirection, 500);

  return { setError, clearError, onUnmount, onResize };
};

export default canvasEffect;
