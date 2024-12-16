"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
// game parameters
var DEBUG = true;
var SCREEN_RATIO = 16 / 9;
var BALL_SIZE = 1 / 50; // ball size ratio from canvas width
var BALL_SPD = 0.6; // starting ball speed fraction of screen width per second
var BALL_MIN_ANGLE = Math.PI / 6; // MIN_ANGLE < angle < PI - MIN_ANGLE
var PADDLE_H = 1 / 50; // paddle height from canvas width
var PADDLE_W = 8; // ratio of paddle width to height
var PADDLE_SPEED = 0.7; //pxl per sec
var PADDLE_STARVE_TIME = 12.5;
var LAMARCK_SPD = 0.2; // starting ball speed fraction of screen width per second
var BRICKS_PER_ROW = 7;
var MAX_ROWS = 15;
var BRICK_GAP = 1 / 100;
var LOWEST_ROW = 0.45;
var max_paddles = 4;
var paddleReproduceChance = 0.2;
var max_balls = 10;
var ballReproduceChance = 0.3;
var ballReproduceChanceScalar = 0.8;
var brickReproduceChance = 0.4;
// derived dimensions
var height, width;
var mutationStdScalar = 1;
// colours
var COLOUR_BACKGROUND = "black";
var COLOUR_WALL = "grey";
var COLOUR_BALL = "white";
var PADDLE_HEALTHY_EXP = 0.5;
var PADDLE_UNHEALTHY_EXP = -0.5;
var canv = document.createElement("canvas");
document.body.appendChild(canv);
var ctx = canv.getContext("2d");
var NORMAL_MUSIC = new Audio('sounds/breakoutMusic.mp3');
NORMAL_MUSIC.loop = true;
var BOSS_MUSIC = new Audio('sounds/bossMusic.mp3');
BOSS_MUSIC.loop = true;
var SIREN_MUSIC = new Audio('sounds/siren.mp3');
SIREN_MUSIC.loop = true;
var ESCAPE_MUSIC = new Audio('sounds/escapeMusic.mp3');
ESCAPE_MUSIC.loop = true;
var OUTRO_MUSIC = new Audio('sounds/outroMusic.mp3');
OUTRO_MUSIC.loop = true;
var WIN_SFX = new Audio("sounds/winSfx.mp3");
var FAIL_SFX = new Audio("sounds/fail.mp3");
var CLICK_SFX = new Audio("sounds/click.mp3");
var WHOOSH_SFX = new Audio("sounds/whoosh.mp3");
var SPAWN_BLOCKS_SFX = new Audio("sounds/smw_yoshi_spit.wav");
var LAMARCK_INTRO_VOICE = new Audio("sounds/voice/LamarckIntro.wav");
var HADOUKEN_SFX = new Audio("sounds/hadouken.mp3");
var HADOUKEN_HIT_SFX = new Audio("sounds/smw_bowser_fire.wav");
var LAMARCK_TAUNTS = [
    new Audio("sounds/voice/taunts/taunt_adapt.wav"),
    new Audio("sounds/voice/taunts/taunt_phylotree.wav"),
    new Audio("sounds/voice/taunts/taunt_culdesac.wav"),
    new Audio("sounds/voice/taunts/taunt_mutation.wav"),
];
var LAMARCK_DEATH_TAUNTS = [
    new Audio("sounds/voice/taunts/death_maladaptation.wav"),
    new Audio("sounds/voice/taunts/death_fittest.wav"),
    new Audio("sounds/voice/taunts/death_overestimated.wav"),
    new Audio("sounds/voice/taunts/death_nitwits.wav"),
    new Audio("sounds/voice/taunts/death_shenglong.wav"),
];
var notes = [new Audio('sounds/notes/note1.mp3'),
    new Audio('sounds/notes/note2.mp3'),
    new Audio('sounds/notes/note3.mp3'),
    new Audio('sounds/notes/note4.mp3'),
    new Audio('sounds/notes/note5.mp3'),
    new Audio('sounds/notes/note6.mp3')
];
var LAMARCK_NORMAL_IMG = new Image();
LAMARCK_NORMAL_IMG.src = "images/lamarck_normal.png";
var LAMARCK_ASPECT_RATIO = 711 / 860;
var LAMARCK_ANGRY_IMG = new Image();
LAMARCK_ANGRY_IMG.src = "images/lamarck_angry.png";
var HADOUKEN_IMG = new Image();
HADOUKEN_IMG.src = "images/hadouken.png";
var EXPLOSION_FRAME1 = new Image();
EXPLOSION_FRAME1.src = "images/explosionF1.png";
var EXPLOSION_FRAME2 = new Image();
EXPLOSION_FRAME2.src = "images/explosionF2.png";
var EXPLOSION_FRAME3 = new Image();
EXPLOSION_FRAME3.src = "images/explosionF3.png";
var ESCAPE_BG_IMG = new Image();
ESCAPE_BG_IMG.src = "images/mtrd_bg.png";
var ZEBES_IMG = new Image();
ZEBES_IMG.src = "images/zebes.png";
var ZEBESNT_IMG = new Image();
ZEBESNT_IMG.src = "images/zebesnt.png";
var ZEBES_HEIGHT2WIDTH = 1022 / 894;
var bgFlashingStart = -1;
var BG_FLASH_RATE = 1.25;
var Gravity = 0;
var bg1Top = 0;
var bg2Top = 0;
var BG_RATIO = 1007 / 196;
var coolMode = false;
var waitingForCredits = false;
var fade2black = 0;
var paddleOnTop = false;
var passwordInput;
var checkPasswordButton;
document.addEventListener("DOMContentLoaded", function () {
    passwordInput = document.getElementById("passwordInput");
    checkPasswordButton = document.getElementById("checkPasswordButton");
    checkPasswordButton.addEventListener("click", function () {
        checkPassword();
    });
});
// definitions
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["STOP"] = 2] = "STOP";
})(Direction || (Direction = {}));
var BounceType;
(function (BounceType) {
    BounceType[BounceType["NO_HIT"] = 0] = "NO_HIT";
    BounceType[BounceType["TOP_BOTTOM"] = 1] = "TOP_BOTTOM";
    BounceType[BounceType["LEFT_RIGHT"] = 2] = "LEFT_RIGHT";
})(BounceType || (BounceType = {}));
var FixedSizeQueue = /** @class */ (function () {
    function FixedSizeQueue(maxSize) {
        this.items = [];
        this.maxSize = maxSize;
    }
    FixedSizeQueue.prototype.enqueue = function (item) {
        // Add the new item to the end of the queue
        this.items.push(item);
        // Remove the oldest item if the queue exceeds the maximum size
        if (this.items.length > this.maxSize) {
            this.items.shift(); // Remove the first (oldest) item
        }
    };
    FixedSizeQueue.prototype.clear = function () {
        this.items = [];
    };
    Object.defineProperty(FixedSizeQueue.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    // Make the queue iterable from oldest to newest
    FixedSizeQueue.prototype[Symbol.iterator] = function () {
        var index = 0;
        var items = this.items;
        return {
            next: function () {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
    };
    return FixedSizeQueue;
}());
var TimeLord = /** @class */ (function () {
    function TimeLord() {
    }
    TimeLord.update = function (timeDelta) {
        TimeLord._time = (TimeLord._time + timeDelta);
    };
    TimeLord.now = function () {
        return TimeLord._time;
    };
    TimeLord.reset = function () {
        TimeLord._time = 0;
    };
    TimeLord._time = 0;
    return TimeLord;
}());
var Tween = /** @class */ (function () {
    function Tween(start_val, end_val, duration, setter, onEnd, haltCheck) {
        if (onEnd === void 0) { onEnd = null; }
        if (haltCheck === void 0) { haltCheck = null; }
        this.start_val = start_val;
        this.end_val = end_val;
        this.duration = duration;
        this.setter = setter;
        this.onEnd = onEnd;
        this.haltCheck = haltCheck;
        Tween.all_tweens.push(this);
        this.start_time = TimeLord.now();
        this.end_time = this.start_time + duration;
        debugLog("new tween: " + start_val + "->" + end_val);
        debugLog("times: " + this.start_time + "->" + this.end_time);
    }
    Tween.updateAll = function () {
        this.all_tweens.forEach(function (t) { return t.update(); });
    };
    Tween.prototype.update = function () {
        if (this.haltCheck !== null && this.haltCheck()) {
            this.killTween();
        }
        if (typeof (this.start_val) == "number" && typeof (this.end_val) == "number") {
            this.updateVal(this.start_val, this.end_val);
        }
        else {
            this.updateArray(this.start_val, this.end_val);
        }
    };
    Tween.prototype.updateVal = function (startVal, endVal) {
        var t = TimeLord.now();
        if (t < this.end_time) {
            var pct = (t - this.start_time) / (this.duration);
            var val = pct * (endVal - startVal) + startVal;
            this.setter(val);
        }
        else {
            this.setter(this.end_val);
            this.killTween();
        }
    };
    Tween.prototype.updateArray = function (startVal, endVal) {
        var t = TimeLord.now();
        if (t < this.end_time) {
            var arr = [];
            var pct = (t - this.start_time) / (this.duration);
            for (var i = 0; i < startVal.length; i++) {
                arr.push(pct * (endVal[i] - startVal[i]) + startVal[i]);
            }
            this.setter(arr);
        }
        else {
            this.setter(endVal);
            this.killTween();
        }
    };
    Tween.killAll = function (noEnd) {
        if (noEnd === void 0) { noEnd = false; }
        this.all_tweens.forEach(function (t) { return t.killTween(noEnd); });
    };
    Tween.prototype.killTween = function (noEnd) {
        if (noEnd === void 0) { noEnd = false; }
        if (this.onEnd !== null && !noEnd) {
            this.onEnd();
        }
        ;
        remove(this, Tween.all_tweens);
    };
    Tween.Waiter = function (waitFor, onEnd) {
        return new Tween(0, 0, waitFor, function (_) { }, onEnd);
    };
    Tween.all_tweens = [];
    return Tween;
}());
var Walls;
(function (Walls) {
    Walls.open = false;
    Walls.openFraction = 0;
    var FULL_OPEN = 0.2; // frac of canvas height
    function draw() {
        var hWall = Walls.wall * 0.5;
        ctx.strokeStyle = COLOUR_WALL;
        ctx.lineWidth = Walls.wall;
        ctx.beginPath();
        ctx.moveTo(hWall, height); //lower left
        ctx.lineTo(hWall, hWall); //top left
        if (Level.currentLevelNum != Level.levels.length - 1)
            ctx.lineTo(width - hWall, hWall); //top right
        else {
            ctx.lineTo(hWall, 0); //top left
            ctx.moveTo(width - hWall, 0); //top right
        }
        ctx.lineTo(width - hWall, height); //top right
        ctx.stroke();
        if (Walls.openFraction > 0)
            drawOpening();
    }
    Walls.draw = draw;
    function drawOpening() {
        var hWall = Walls.wall * 0.5;
        var opening = FULL_OPEN * height * Walls.openFraction;
        ctx.strokeStyle = COLOUR_BACKGROUND;
        ctx.lineWidth = Walls.wall * 1.5;
        ctx.beginPath();
        ctx.moveTo(width - hWall * 1.25, height); //lower right
        ctx.lineTo(width - hWall * 1.25, height - hWall - opening); //top of opening
        ctx.stroke();
    }
    function startOpen() {
        playSfx(WHOOSH_SFX, 0.4);
        new Tween(0, 1, 1, function (v) { Walls.openFraction = v; }, function () { return Walls.open = true; });
    }
    Walls.startOpen = startOpen;
})(Walls || (Walls = {}));
var Paddle = /** @class */ (function () {
    //#endregion
    function Paddle(canv, row, w, h, paddleSpeed, colour) {
        if (w === void 0) { w = null; }
        if (h === void 0) { h = null; }
        if (paddleSpeed === void 0) { paddleSpeed = null; }
        if (colour === void 0) { colour = null; }
        this.active = false;
        this.hunger = 0;
        this.speed_modifier = 1;
        this.length_modifier = 1;
        this.abilities = [];
        this.immune = false;
        this.canv = canv;
        this.h = h !== null && h !== void 0 ? h : PADDLE_H * canv.width;
        w = w !== null && w !== void 0 ? w : PADDLE_W * PADDLE_H * canv.width;
        this.w = w * this.length_modifier; // stores _w without length mod
        this.row = row;
        if (!Paddle.freeRows.delete(row))
            throw new Error("chosen row not in freeRows");
        this._y = (this.canv.height - this.h * (3 + this.row)) / this.canv.width;
        this._x = 0.5;
        this.spd = paddleSpeed !== null && paddleSpeed !== void 0 ? paddleSpeed : PADDLE_SPEED * canv.width; // (pxl per second)
        this.xv = 0;
        this.colour = colour !== null && colour !== void 0 ? colour : Math.random();
        Paddle.paddles.push(this);
    }
    Object.defineProperty(Paddle.prototype, "spd", {
        get: function () {
            return this._spd * this.canv.width;
        },
        //#region getters n setters
        set: function (value) {
            this._spd = value / this.canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "h", {
        get: function () {
            return this._h * canv.width;
        },
        set: function (val) {
            this._h = val / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "w", {
        get: function () {
            return this._w * canv.width * this.length_modifier;
        },
        set: function (val) {
            this._w = val / (canv.width * this.length_modifier);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "x", {
        get: function () {
            return this._x * canv.width;
        },
        set: function (value) {
            this._x = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "y", {
        get: function () {
            return this._y * canv.width;
        },
        set: function (value) {
            this._y = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "xv", {
        get: function () {
            return this._xv * canv.width;
        },
        set: function (value) {
            this._xv = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    //#endregion
    Paddle.flush = function () {
        Paddle.paddles = [];
        Paddle.freeRows = new Set(range(max_paddles));
    };
    Paddle.prototype.move = function (direction) {
        switch (direction) {
            case Direction.LEFT:
                this._xv = -this._spd;
                break;
            case Direction.RIGHT:
                this._xv = this._spd;
                break;
            case Direction.STOP:
                this._xv = 0;
                break;
        }
    };
    Paddle.prototype.moveTowards = function (x, delta) {
        var wiggleRoom = 1.01;
        if (DEBUG)
            console.log("spd=" + this.spd * delta);
        if (DEBUG)
            console.log("diff=" + (this.x - x));
        if (this.x < x - this.spd * delta * wiggleRoom) {
            this.move(Direction.RIGHT);
        }
        else if (this.x > x + this.spd * delta * wiggleRoom) {
            this.move(Direction.LEFT);
        }
        else {
            this.move(Direction.STOP);
        }
    };
    Paddle.prototype.update = function (delta) {
        var _a;
        if (!this.active)
            return;
        if (((_a = Ball.balls[0]) === null || _a === void 0 ? void 0 : _a.isServed) && !this.immune) // don't start starving until ball served or if no balls
            this.hunger += delta;
        else
            this.hunger = 0;
        if (this.hunger > PADDLE_STARVE_TIME / this.length_modifier)
            return this.die();
        if (touchTargetX !== null) {
            this.moveTowards(touchTargetX, delta);
        }
        else {
            this.move(keyboardMoving[keyboardMoving.length - 1]);
        }
        this.x += this.xv * delta * this.speed_modifier;
        // stop paddle at walls
        var wall = Walls.wall;
        if (this.x < wall + this.w * 0.5) {
            this.x = wall + this.w * 0.5;
        }
        else if (this.x > canv.width - wall - this.w * 0.5 && !Walls.open) { //allow exceed canv width when wall open
            this.x = canv.width - wall - this.w * 0.5;
        }
        if (this.x - this.w * 0.5 > width)
            Level.doorEnter();
    };
    Paddle.prototype.draw = function () {
        var exposure = PADDLE_HEALTHY_EXP;
        if (this.hunger > 0.666 * PADDLE_STARVE_TIME / this.length_modifier)
            exposure = PADDLE_UNHEALTHY_EXP;
        else if (this.hunger > 0.333 * PADDLE_STARVE_TIME / this.length_modifier)
            exposure = 0;
        ctx.fillStyle = colourMap(this.colour, exposure);
        ctx.fillRect(this.x - this.w * 0.5, this.y - this.h * 0.5, this.w, this.h);
    };
    Paddle.prototype.die = function () {
        if (this.immune)
            return;
        Paddle.freeRows.add(this.row);
        remove(this, Paddle.paddles);
        if (Paddle.paddles.length < 1)
            Level.lose();
    };
    Paddle.prototype.mutate = function () {
        this.colour = mutateColour(this.colour);
        this.abilities.forEach(function (a) { return a.mutate(); });
    };
    Paddle.prototype.copyAbilities = function (newMyObject) {
        if (newMyObject === void 0) { newMyObject = null; }
        if (newMyObject !== null) {
            return this.abilities.map(function (item) { return item.copy(newMyObject); });
        }
        return this.abilities.map(function (item) { return item.copy(); });
    };
    Paddle.prototype.copy = function (row) {
        var kid = new Paddle(this.canv, row, this.w / this.length_modifier, this.h, this.spd);
        kid.abilities = this.copyAbilities(kid);
        return kid;
    };
    Paddle.prototype.klone = function () {
        var kid = this.copy(popClosest(Paddle.freeRows, this.row, false));
        kid.mutate();
        kid.onAlive();
        var sign = this._x > 0 ? 1 : -1;
        kid._x = this._x + sign * (0.5 * kid._w + 0.5 * this._w); // offset so they don't overlap and shunt toward the centre
        new Tween([this.x, this.y, this.w * 0.3, this.h * 0.3, this.colour], [kid.x, kid.y, kid.w, kid.h, kid.colour], 0.3, function (_a) {
            var x = _a[0], y = _a[1], w = _a[2], h = _a[3], c = _a[4];
            kid.x = x;
            kid.y = y;
            kid.w = w;
            kid.h = h;
            kid.colour = c;
        }, function () { kid.active = true; });
        // set start val to stop wrong place on first draw
        kid._x = this._x;
        kid._y = this._y;
        kid.w = this.w * 0.3;
        kid.h = this.h * 0.3;
    };
    Paddle.prototype.hitBall = function () {
        this.hunger = 0;
        this.tryReproduce();
    };
    Paddle.prototype.tryReproduce = function () {
        if (Paddle.freeRows.size < 1 || Math.random() > paddleReproduceChance)
            return;
        var kid = this.klone();
    };
    Paddle.prototype.onAlive = function () {
        this.abilities.forEach(function (abl) { return abl.onAlive(); });
    };
    return Paddle;
}());
var Lamarck = /** @class */ (function () {
    //#endregion
    function Lamarck(canv, x, y, w, h) {
        var _this = this;
        this.size_modifier = 1;
        this.bricks = [];
        this.radiusScalar = 0;
        this.phase = 0;
        this.isRunning = false;
        this.isSpeaking = false;
        this.hadoukens = [];
        this.nextHadoukenTime = -1;
        this.hadoukenGap = -1;
        this.alpha = 1;
        this.visible = false;
        this.canv = canv;
        this._w = w;
        this._h = h;
        this._x = x;
        this._y = y;
        this._spd = LAMARCK_SPD;
        this.applySpeed(randRange(0, 2 * Math.PI));
        Lamarck.obj = this;
        new Tween(-this.h, this.y, 10, function (val) { _this.y = val; }, function () {
            _this.speak(LAMARCK_INTRO_VOICE, function () { return _this.isRunning = true; });
        });
        this.y = -3 * this.h;
        this.visible = true;
    }
    Object.defineProperty(Lamarck.prototype, "h", {
        //#region getters n setters
        get: function () {
            return this._h * canv.width * this.size_modifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lamarck.prototype, "w", {
        get: function () {
            return this._w * canv.width * this.size_modifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lamarck.prototype, "spd", {
        get: function () {
            return this._spd * this.canv.width;
        },
        set: function (value) {
            this._spd = value / this.canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lamarck.prototype, "x", {
        get: function () {
            return this._x * canv.width;
        },
        set: function (value) {
            this._x = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lamarck.prototype, "y", {
        get: function () {
            return this._y * canv.width;
        },
        set: function (value) {
            this._y = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lamarck.prototype, "xv", {
        get: function () {
            return this._xv * canv.width;
        },
        set: function (value) {
            this._xv = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lamarck.prototype, "yv", {
        get: function () {
            return this._yv * canv.width;
        },
        set: function (value) {
            this._yv = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    //#endregion
    Lamarck.prototype.applySpeed = function (angle) {
        // update xv yv
        this._xv = this._spd * Math.cos(angle);
        this._yv = -this._spd * Math.sin(angle);
    };
    Object.defineProperty(Lamarck.prototype, "angle", {
        get: function () {
            return Math.atan2(-this.yv, this.xv);
        },
        enumerable: false,
        configurable: true
    });
    Lamarck.prototype.speak = function (sfx, onEnd) {
        var _this = this;
        if (!this.isSpeaking) {
            this.doSpeak(sfx, onEnd);
        }
        else {
            Tween.Waiter(5, function () { return _this.doSpeak(sfx, onEnd); });
        }
    };
    Lamarck.prototype.doSpeak = function (sfx, onEnd) {
        var _this = this;
        this.isSpeaking = true;
        Level.currentLevel.bgMusic.volume = 0.3;
        var dur = playSfx(sfx);
        Tween.Waiter(dur, function () { _this.isSpeaking = false; Level.currentLevel.bgMusic.volume = 1; onEnd(); });
    };
    Lamarck.prototype.update = function (delta) {
        this.hadoukens.forEach(function (h) { return h.update(); });
        if ((!this.isRunning) || this.isSpeaking)
            return;
        this.x += this.xv * delta;
        this.y += this.yv * delta;
        if (this.phase >= 0 && this.bricks.length == 0) {
            this.nextPhase();
        }
        this.updateBricks(delta);
        this.tryHadouken();
        //bounce off wall
        var low = null;
        var high = null;
        var offset = 0.1 * Math.PI;
        // const wall = Walls.wall;
        if (this.x < this.w * 0.5) { //left side
            this.x = this.w * 0.5;
            low = -0.5 * Math.PI;
            high = 0.5 * Math.PI;
        }
        else if (this.x > width - this.w * 0.5) { // right side 
            this.x = width - this.w * 0.5;
            low = 0.5 * Math.PI;
            high = 1.5 * Math.PI;
        }
        else if (this.y < this.h * 0.5) { // top
            this.y = this.h * 0.5;
            low = Math.PI;
            high = 2 * Math.PI;
        }
        else if (this.y > height * 0.666 - this.h * 0.5) { // bottom
            this.y = height * 0.666 - this.h * 0.5;
            low = 0;
            high = Math.PI;
        }
        if (low !== null && high !== null) { //do rand bounce
            var angle = randRange(low + offset, high - offset);
            this.applySpeed(angle);
        }
    };
    Object.defineProperty(Lamarck.prototype, "r", {
        get: function () {
            var freq = this.xv == 0 ? 0 : 0.3 / this._xv;
            return (TimeLord.now() % freq) / freq * Math.PI * 2;
        },
        enumerable: false,
        configurable: true
    });
    Lamarck.prototype.draw = function () {
        if (!this.visible)
            return;
        // debugLog("x" + this.x + ", y" + this.y + ",w" + this.w + ",h" + this.h);
        var img = this.isSpeaking && (TimeLord.now() % 0.5 < 0.25) ? LAMARCK_ANGRY_IMG : LAMARCK_NORMAL_IMG;
        drawImageOnCanvas(img, this.x, this.y, this.w, this.h, true, this.alpha);
        this.bricks.forEach(function (b) { return b.draw(); });
        this.hadoukens.forEach(function (h) { return h.draw(); });
    };
    Lamarck.prototype.taunt = function (onEnd) {
        this.speak(LAMARCK_TAUNTS[Lamarck.taunt_idx], onEnd);
        Lamarck.taunt_idx = (Lamarck.taunt_idx + 1) % LAMARCK_TAUNTS.length;
    };
    Lamarck.prototype.deathTaunt = function (onEnd) {
        this.speak(LAMARCK_DEATH_TAUNTS[Lamarck.death_taunt_idx], onEnd);
        Lamarck.death_taunt_idx = (Lamarck.death_taunt_idx + 1) % LAMARCK_DEATH_TAUNTS.length;
    };
    Lamarck.prototype.tryHadouken = function () {
        if (this.hadoukenGap <= 0) {
            return;
        }
        if (this.nextHadoukenTime == -1) {
            this.nextHadoukenTime = TimeLord.now() + this.hadoukenGap;
        }
        if (TimeLord.now() > this.nextHadoukenTime) {
            this.nextHadoukenTime = TimeLord.now() + this.hadoukenGap;
            if (this.phase < 4)
                new Hadouken(this);
            else {
                new HadoukenL2(this, 0);
                new HadoukenL2(this, 1);
            }
        }
    };
    Lamarck.prototype.modifyAngle = function (theta) {
        this.applySpeed((this.angle + theta) % (2 * Math.PI));
    };
    Lamarck.prototype.updateBricks = function (timeDelta) {
        var _this = this;
        this.bricks.forEach(function (b, i) {
            var r = _this.brickRadius[i] * canv.width * _this.radiusScalar;
            _this.brickAngle[i] = (_this.brickAngle[i] + 0.01 * timeDelta * r) % (2 * Math.PI);
            var angle = _this.brickAngle[i];
            var x = _this.x + r * Math.cos(angle); // Calculate x position
            var y = _this.y + r * Math.sin(angle); // Calculate y position
            b.x = x;
            b.y = y;
        });
    };
    Lamarck.prototype.victory = function () {
        var _this = this;
        this.isRunning = false;
        Paddle.paddles[0].immune = true;
        stopBGMusic();
        Level.currentLevelNum += 1;
        ExplosionRect.activate(this.x, this.y, this.w, this.h, 0.2);
        var deathDur = 7;
        new Tween(this._y, this._y + 0.3, deathDur, function (y) { _this._y = y; });
        new Tween(1, 0, deathDur, function (a) { _this.alpha = a; });
        new Tween(1, 0, deathDur, function (a) { ExplosionRect.setY(_this.y); }, function () {
            ExplosionRect.deactivate();
            startBGMusic();
        });
        Tween.Waiter(deathDur + 4, function () { return Level.win(); });
    };
    Lamarck.prototype.nextPhase = function () {
        var _this = this;
        this.phase += 1;
        mutationStdScalar += 0.1;
        this.nextHadoukenTime = -1;
        if (this.phase == 1) {
            this.spawnBricks([10, 7], [1.2 * this._w, 0.7 * this._w]);
            this.hadoukenGap = -1;
            return;
        }
        this._spd *= 1.1;
        if (this.phase > 5) {
            this.victory();
            return;
        }
        this.taunt(function () {
            switch (_this.phase) {
                case 2:
                    _this.spawnBricks([2, 4, 8], [1.2 * _this._w, 0.9 * _this._w, 0.5 * _this._w]);
                    _this.hadoukenGap = 10;
                    break;
                case 3:
                    _this.spawnBricks([3, 4, 5, 6], [1 * _this._w, 0.85 * _this._w, 0.55 * _this._w, 0.45 * _this._w]);
                    _this.hadoukenGap = 5;
                    break;
                case 4:
                    _this.spawnBricks([10, 20], [0.5 * _this._w, 0.85 * _this._w]);
                    _this.hadoukenGap = 3;
                    break;
                case 5:
                    _this.spawnBricks([12, 12, 12], [0.3 * _this._w, 0.5 * _this._w, 1.2 * _this._w]);
                    _this.hadoukenGap = 4;
                    break;
            }
        });
    };
    Lamarck.prototype.spawnBricks = function (bricksPerRing, ringRadius) {
        var _this = this;
        this.bricks = [];
        this.brickRadius = [];
        this.brickAngle = [];
        bricksPerRing.forEach(function (e, ringIndex) {
            var angle = 0;
            var angleIncrement = 2 * Math.PI / e;
            for (var i = 0; i < e; i++) {
                var lb = new LamarckBrick(canv, ringIndex / 8);
                lb.isDead = true;
                for (var _i = 0, _a = Level.levels[Level.levels.length - 3].brickAbilities; _i < _a.length; _i++) {
                    var abilityFactory = _a[_i];
                    lb.abilities.push(abilityFactory(lb));
                }
                _this.bricks.push(lb);
                _this.brickRadius.push(ringRadius[ringIndex]);
                _this.brickAngle.push(angle);
                angle += angleIncrement;
            }
        });
        playSfx(SPAWN_BLOCKS_SFX);
        this.radiusScalar = 0;
        new Tween(0, 1, 0.7, function (val) { _this.radiusScalar = val; }, function () {
            _this.bricks.forEach(function (b) {
                b.isDead = false;
                b.onAlive();
            });
        });
    };
    Lamarck.prototype.mutateBricks = function () {
        this.bricks.forEach(function (b) {
            b.mutate();
            b.onAlive();
        });
    };
    Lamarck.obj = null;
    Lamarck.taunt_idx = 0;
    Lamarck.death_taunt_idx = 0;
    return Lamarck;
}());
var Ball = /** @class */ (function () {
    //#endregion
    function Ball(canv, ballSize, colour) {
        if (ballSize === void 0) { ballSize = null; }
        if (colour === void 0) { colour = null; }
        this.speed_modifier = 1;
        this.size_modifier = 1;
        this.ghostMode = false;
        this.streak = 0;
        this.isServed = false;
        this.abilities = [];
        this.canv = canv;
        this._w = ballSize !== null ? ballSize : BALL_SIZE;
        this._h = this._w;
        this.colour = colour !== null ? colour : Math.random();
        this.x = Paddle.paddles[0].x;
        this.y = Paddle.paddles[0].y - Paddle.paddles[0].h / 2 - this.h / 2;
        this._spd = BALL_SPD;
        this.xv = 0;
        this.yv = 0;
        Ball.balls.push(this);
    }
    Object.defineProperty(Ball.prototype, "h", {
        //#region getters n setters
        get: function () {
            return this._h * canv.width * this.size_modifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "w", {
        get: function () {
            return this._w * canv.width * this.size_modifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "spd", {
        get: function () {
            return this._spd * this.canv.width;
        },
        set: function (value) {
            this._spd = value / this.canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "x", {
        get: function () {
            return this._x * canv.width;
        },
        set: function (value) {
            this._x = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "y", {
        get: function () {
            return this._y * canv.width;
        },
        set: function (value) {
            this._y = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "xv", {
        get: function () {
            return this._xv * canv.width;
        },
        set: function (value) {
            this._xv = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "yv", {
        get: function () {
            return this._yv * canv.width;
        },
        set: function (value) {
            this._yv = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    //#endregion
    Ball.flush = function () {
        Ball.balls = [];
    };
    Ball.prototype.bounce = function (bounceType) {
        if (bounceType == BounceType.NO_HIT)
            return;
        if (bounceType == BounceType.LEFT_RIGHT) {
            this._xv = -this._xv;
        }
        else if (bounceType == BounceType.TOP_BOTTOM) {
            this._yv = -this._yv;
        }
    };
    Ball.prototype.applySpeed = function (angle) {
        // if (DEBUG) console.log("intendedAngle=" + (angle / Math.PI * 180))
        // keep angle between 15 and 180-15 deg
        angle = clip(angle, BALL_MIN_ANGLE, Math.PI - BALL_MIN_ANGLE);
        // if (DEBUG) console.log("outputAngle=" + (angle / Math.PI * 180))
        // update xv yv
        this._xv = this._spd * Math.cos(angle) * this.speed_modifier;
        this._yv = -this._spd * Math.sin(angle) * this.speed_modifier;
    };
    Object.defineProperty(Ball.prototype, "angle", {
        get: function () {
            return Math.atan2(-this.yv, this.xv);
        },
        enumerable: false,
        configurable: true
    });
    Ball.prototype.update = function (delta) {
        this.x += this.xv * delta;
        this.y += this.yv * delta;
        this.abilities.forEach(function (abl) { return abl.update(delta); });
        //bounce off wall
        var wall = Walls.wall;
        if (this.x < wall + this.w * 0.5) {
            this.x = wall + this.w * 0.5;
            this.bounce(BounceType.LEFT_RIGHT);
        }
        else if (this.x > canv.width - wall - this.w * 0.5) {
            this.x = canv.width - wall - this.w * 0.5;
            this.bounce(BounceType.LEFT_RIGHT);
            ;
        }
        else if (this.y < wall + this.h * 0.5) {
            this.y = wall + this.h * 0.5;
            this.bounce(BounceType.TOP_BOTTOM);
            ;
        }
        // bounce off the paddle
        for (var _i = 0, _a = Paddle.paddles; _i < _a.length; _i++) {
            var paddle = _a[_i];
            if (this.checkPaddleBounce(paddle))
                break;
        }
        // handle out of bounds
        if (this.y > canv.height) {
            this.outOfBounds();
        }
        // move stationary ball with paddle
        if (!this.isServed) {
            this.x = Paddle.paddles[0].x;
            this.y = Paddle.paddles[0].y - Paddle.paddles[0].h / 2 - this.h / 2;
        }
    };
    Ball.prototype.checkPaddleBounce = function (paddle) {
        if (this.yv < 0)
            return false; // don't bounce off paddle if moving upwards or still
        if (!paddle.active)
            return false;
        if (this.y > paddle.y - paddle.h * 0.5 - this.h * 0.5
            && this.y < paddle.y + paddle.h * 0.5
            && this.x > paddle.x - paddle.w * 0.5 - this.w * 0.5
            && this.x < paddle.x + paddle.w * 0.5 + this.w * 0.5) {
            this.y = paddle.y - paddle.h * 0.5 - this.h * 0.5;
            //this.yv *= -1;
            // angle modification based on distance to centre of paddle
            // Step 1: Get the current angle of the ball using the angle getter
            this.bounce(BounceType.TOP_BOTTOM);
            var angle = this.angle;
            // skip this now we call bounce
            // Step 2: Reflect the ball's vertical movement (invert the angle)
            // angle = -angle; // Invert the angle to simulate the vertical bounce 
            // Step 3: Calculate the relative hit position on the paddle (-1 for left, 0 for center, 1 for right)
            var dist_1 = (this.x - paddle.x) / (paddle.w * 0.5);
            // Step 4: Modify the angle based on where it hit the paddle
            angle -= dist_1 * (Math.PI / 3); // Adjust angle based on hit position, up to ±45°
            // Step 5: Clamp the angle between 30° and 150°
            var minAngle = Math.PI / 6; // 30 degrees
            var maxAngle = 5 * Math.PI / 6; // 150 degrees
            angle = Math.max(minAngle, Math.min(maxAngle, angle));
            // Step 6: Apply the new speed and direction to the ball
            this.applySpeed(angle);
            this.streak = 0;
            // alert paddle 
            paddle.hitBall();
            return true;
        }
        return false;
    };
    Object.defineProperty(Ball.prototype, "r", {
        get: function () {
            var freq = this.xv == 0 ? 0 : 0.3 / this._xv;
            return (TimeLord.now() % freq) / freq * Math.PI * 2;
        },
        enumerable: false,
        configurable: true
    });
    Ball.prototype.draw = function () {
        ctx.fillStyle = colourMap(this.colour);
        // ctx.fillRect(this.x - this.w * 0.5, this.y - this.h * 0.5, this.w, this.h);
        // ctx.fillRect(this.x - this.w * 0.5, this.y - this.h * 0.5, this.w, this.h);
        var angle = this.r; // Full rotation every freq seconds
        drawRotatedRect(ctx, this.x - this.w * 0.5, this.y - this.h * 0.5, this.w, this.h, angle);
        this.abilities.forEach(function (abl) {
            abl.draw();
        });
    };
    Ball.prototype.onAlive = function () {
        this.abilities.forEach(function (abl) { return abl.onAlive(); });
    };
    Ball.prototype.serve = function (angle) {
        if (angle === void 0) { angle = null; }
        // ball already in motion
        if (this.isServed) {
            return;
        }
        // random angle [45, 135]
        angle = (angle !== null ? angle : Math.random() * Math.PI / 2 + Math.PI / 4);
        this.applySpeed(angle);
        this.isServed = true;
    };
    Ball.prototype.modifyAngle = function (theta) {
        this.applySpeed((this.angle + theta) % (2 * Math.PI));
    };
    Ball.prototype.die = function () {
        remove(this, Ball.balls);
        if (Ball.balls.length < 1) {
            if (!Paddle.paddles[0].immune) {
                Level.lose();
            }
            else {
                new Ball(canv);
            }
        }
    };
    Ball.prototype.outOfBounds = function () {
        //TODO out of bounds
        this.die();
    };
    Ball.prototype.klone = function () {
        if (Ball.balls.length >= max_balls)
            return;
        var child = this.copy();
        child.mutate();
        child.onAlive();
        var delta = Math.PI / 4;
        child.modifyAngle(Math.random() * delta - delta / 2);
    };
    Ball.prototype.copyAbilities = function (newMyObject) {
        if (newMyObject === void 0) { newMyObject = null; }
        if (newMyObject !== null) {
            return this.abilities.map(function (item) { return item.copy(newMyObject); });
        }
        return this.abilities.map(function (item) { return item.copy(); });
    };
    Ball.prototype.copy = function () {
        var ball = new Ball(this.canv, this.h, this.colour);
        ball._w = this._w;
        ball._h = this._h;
        ball._x = this._x;
        ball._y = this._y;
        ball._spd = this._spd;
        ball._xv = this._xv;
        ball._yv = this.yv;
        ball.isServed = true;
        ball.abilities = this.copyAbilities(ball);
        return ball;
    };
    Ball.prototype.mutate = function () {
        this.colour = mutateColour(this.colour);
        this.abilities.forEach(function (a) { return a.mutate(); });
    };
    Ball.prototype.tryReproduce = function () {
        if (Math.random() < (ballReproduceChance * Math.pow(ballReproduceChanceScalar, Ball.balls.length))) {
            this.klone();
        }
    };
    Ball.balls = [];
    return Ball;
}());
var Brick = /** @class */ (function () {
    function Brick(canv, colour, left, top, w, h, canReproduce) {
        if (canReproduce === void 0) { canReproduce = true; }
        this.abilities = [];
        this.sizeScalar = 1;
        this.lives = 1;
        this.neighbours = [];
        this._xOffset = 0;
        this._yOffset = 0;
        this.canReproduce = true;
        this.canv = canv;
        this.id = Brick.nextId++;
        this.colour = colour;
        this._left = left / canv.width;
        this._top = top / canv.width;
        this._w = w / canv.width;
        this._h = h / canv.width;
        this.isDead = false;
        this.isVisible = true;
        this.canReproduce = canReproduce;
        Brick.id2Brick.set(this.id, this);
        Brick.aliveBricks.push(this.id);
    }
    Object.defineProperty(Brick.prototype, "left", {
        //#region getters n setters
        get: function () {
            return (this._left + this.xOffset) * canv.width;
        },
        set: function (value) {
            this._left = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "top", {
        get: function () {
            return (this._top + this.yOffset) * canv.width;
        },
        set: function (value) {
            this._top = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "w", {
        get: function () {
            return this._w * canv.width;
        },
        set: function (value) {
            this._w = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "h", {
        get: function () {
            return this._h * canv.width;
        },
        set: function (value) {
            this._h = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "xOffset", {
        get: function () {
            return this._xOffset;
        },
        //#endregion
        set: function (value) {
            if (this.isDead && value != 0) {
                throw new Error("setting offset when dead");
            }
            this._xOffset = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "yOffset", {
        get: function () {
            return this._yOffset;
        },
        set: function (value) {
            if (this.isDead && value != 0) {
                throw new Error("setting offset when dead");
            }
            this._yOffset = value;
        },
        enumerable: false,
        configurable: true
    });
    Brick.B = function (id) {
        var brick = this.id2Brick.get(id);
        if (!brick) {
            throw new Error("Brick with ID ".concat(id, " does not exist."));
        }
        return brick;
    };
    Brick.draw_all = function () {
        var _this = this;
        this.deadBricks.forEach(function (id) { return _this.B(id).draw(); });
        this.aliveBricks.forEach(function (id) { return _this.B(id).draw(); });
        this.revivingBricks.forEach(function (id) { return _this.B(id).draw(); });
    };
    Brick.prototype.draw = function (overrideColour) {
        if (overrideColour === void 0) { overrideColour = null; }
        if (!this.isVisible)
            return;
        ctx.fillStyle = overrideColour !== null && overrideColour !== void 0 ? overrideColour : colourMap(this.colour);
        ctx.fillRect(this.left, this.top, this.w * this.sizeScalar, this.h * this.sizeScalar);
        this.abilities.forEach(function (abl) {
            abl.draw();
        });
    };
    Brick.prototype.overlaps = function (ball) {
        var bx = ball.x, by = ball.y, hbh = 0.5 * ball.h, hbw = 0.5 * ball.w;
        var t = this.top, l = this.left, w = this.w, h = this.h;
        var r = l + w, b = t + h;
        // return by - hbh < b && by + hbh > t && bx - hbw < r && bx + hbw > l;
        return l < bx + hbw && r > bx - hbw && t < by + hbh && b > by - hbh; // rearranged to match order of other stuff
    };
    Brick.prototype.closestEdge = function (ball) {
        var bx = ball.x, by = ball.y, hbh = 0.5 * ball.h, hbw = 0.5 * ball.w;
        var t = this.top, l = this.left, w = this.w, h = this.h;
        var r = l + w, b = t + h;
        var i = argMin([bx + hbw - l, r - (bx - hbw), by + hbh - t, b - (by - hbh)]);
        return Brick.nearestEdge2Bounce[i];
    };
    Brick.prototype.checkCollision = function (ball) {
        if (!this.overlaps(ball))
            return false;
        var bounceType = this.closestEdge(ball);
        this.lives--;
        if (!ball.ghostMode)
            ball.bounce(bounceType);
        if (this.lives < 1) {
            this.die();
            ball.streak += 1;
            if (ball.streak >= notes.length)
                ball.streak = 0;
            playSfx(notes[ball.streak]);
            if (Brick.aliveBricks.length < 1 && Brick.revivingBricks.length < 1)
                Level.win();
            else
                ball.tryReproduce();
        }
        else
            playSfx(CLICK_SFX);
        return true;
    };
    Brick.prototype.die = function () {
        this.isDead = true;
        this.isVisible = false;
        this.xOffset = 0;
        this.yOffset = 0;
        remove(this.id, Brick.aliveBricks);
        Brick.deadBricks.push(this.id);
        if (this.canReproduce)
            Brick.tryReproduce();
    };
    Brick.update_all = function (timeDelta) {
        var _this = this;
        this.revivingBricks.forEach(function (id) { return _this.B(id).update(timeDelta); });
        this.aliveBricks.forEach(function (id) { return _this.B(id).update(timeDelta); });
        this.deadBricks.forEach(function (id) { return _this.B(id).update(timeDelta); });
    };
    Brick.prototype.update = function (timeDelta) {
        this._top += timeDelta * Gravity;
        if (!this.isDead) {
            this.abilityUpdate(timeDelta); // do this before checkCollision as ball can die in that!
            LOOP: for (var _i = 0, _a = Ball.balls; _i < _a.length; _i++) {
                var ball = _a[_i];
                if (this.checkCollision(ball))
                    break LOOP;
            }
        }
        for (var _b = 0, _c = this.abilities; _b < _c.length; _b++) {
            var a = _c[_b];
            if (a.myObject !== this) {
                throw new Error("this ain't mine");
            }
        }
    };
    Brick.prototype.abilityUpdate = function (timeDelta) {
        // set offsets to 0, abilities may += to it
        this.xOffset = 0;
        this.yOffset = 0;
        this.abilities.forEach(function (a) { return a.update(timeDelta); });
    };
    Brick.prototype.revive = function () {
        this.isDead = false;
        this.xOffset = 0;
        this.yOffset = 0;
        remove(this.id, Brick.revivingBricks);
        Brick.aliveBricks.push(this.id);
        this.onAlive();
    };
    Brick.prototype.onAlive = function () {
        this.abilities.forEach(function (abl) { return abl.onAlive(); });
    };
    Brick.prototype.copyAbilities = function (newMyObject) {
        if (newMyObject === void 0) { newMyObject = null; }
        if (newMyObject !== null) {
            return this.abilities.map(function (item) { return item.copy(newMyObject); });
        }
        return this.abilities.map(function (item) { return item.copy(); });
    };
    Brick.prototype.kloneInto = function (child) {
        child.colour = this.colour;
        child.abilities = this.copyAbilities(child);
        child.mutate();
        // debugLog("make tweens child: " + child.id + ", parent:" + this.id);
        var dur = 2 * sqrt(sqr((this._top - child._top)) + sqr(this._left - child._left));
        new Tween(this.getPos(), child.getPos(), dur, function (arr) { return child.setPos(arr); }, function () { return child.revive(); });
        new Tween(0.2, 1, dur, function (v) { return child.sizeScalar = v; });
        child.setPos(this.getPos());
        child.isVisible = true;
        remove(child.id, Brick.deadBricks); // remove from deadpool so another does not attempt to clone into while still reviving
        Brick.revivingBricks.push(child.id);
    };
    Brick.prototype.mutate = function () {
        this.colour = mutateColour(this.colour);
        this.abilities.forEach(function (a) { return a.mutate(); });
    };
    Brick.PickParentAndChild = function () {
        var _this = this;
        shuffleArray(this.aliveBricks);
        for (var _i = 0, _a = this.aliveBricks; _i < _a.length; _i++) {
            var parentId = _a[_i];
            var deadNeighbours = this.B(parentId).neighbours.filter(function (id) { return _this.deadBricks.includes(id); });
            if (deadNeighbours.length > 0) {
                return [this.B(parentId), this.B(choose(deadNeighbours))];
            }
        }
        throw new Error("no viable parents");
    };
    Brick.tryReproduce = function () {
        // if (this.revivingBricks.length > 0) return; // do one at a time for debugging
        if (this.aliveBricks.length < 1 || this.deadBricks.length < 1 || Math.random() > brickReproduceChance)
            return;
        var _a = this.PickParentAndChild(), parent = _a[0], child = _a[1];
        if (child.xOffset != 0 || child.yOffset != 0) {
            throw new Error("offset on child");
        }
        parent.kloneInto(child);
    };
    Brick.resetClass = function () {
        this.deadBricks = [];
        this.revivingBricks = [];
        this.aliveBricks = [];
        this.nextId = 0;
        this.id2Brick.clear();
    };
    Brick.neighbourPositions = function (row, col, maxRow, maxCol) {
        var potentialNeighbors = [
            [row, col + 1], // right
            [row + 1, col], // down
            [row, col - 1], // left
            [row - 1, col] // up
        ];
        // Filter out neighbors that are out of bounds
        return potentialNeighbors.filter(function (_a) {
            var nRow = _a[0], nCol = _a[1];
            return nRow >= 0 && nRow < maxRow && nCol >= 0 && nCol < maxCol;
        });
    };
    Brick.prototype.getPos = function () {
        return [this.x, this.y];
    };
    Brick.prototype.setPos = function (pos) {
        if (this.xOffset != 0 || this.yOffset != 0) {
            throw new Error("setting position when offsets are non-zero");
        }
        this.x = pos[0];
        this.y = pos[1];
        debugLog("setting pos" + pos[0] + ", " + pos[1]);
    };
    Object.defineProperty(Brick.prototype, "y", {
        get: function () {
            return this.top + this.h * 0.5;
        },
        set: function (val) {
            this.top = val - this.h * 0.5;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "x", {
        get: function () {
            return this.left + this.w * 0.5;
        },
        set: function (val) {
            this.left = val - this.w * 0.5;
        },
        enumerable: false,
        configurable: true
    });
    Brick.nextId = 0;
    Brick.nearestEdge2Bounce = [BounceType.LEFT_RIGHT, BounceType.LEFT_RIGHT, BounceType.TOP_BOTTOM, BounceType.TOP_BOTTOM];
    Brick.id2Brick = new Map();
    Brick.deadBricks = [];
    Brick.aliveBricks = [];
    Brick.revivingBricks = [];
    return Brick;
}());
var LamarckBrick = /** @class */ (function (_super) {
    __extends(LamarckBrick, _super);
    function LamarckBrick(canv, colour) {
        var gap = BRICK_GAP * canv.width;
        var wall = Walls.wall;
        var w = (width - 2 * wall - gap * (BRICKS_PER_ROW + 1)) / BRICKS_PER_ROW;
        var h = (height - height * LOWEST_ROW - 2 * wall - gap * (MAX_ROWS + 1)) / MAX_ROWS;
        return _super.call(this, canv, colour, -100, -100, w, h) || this;
    }
    LamarckBrick.prototype.die = function () {
        this.isDead = true;
        this.isVisible = false;
        this.xOffset = 0;
        this.yOffset = 0;
        if (Lamarck.obj) {
            var idx = Lamarck.obj.bricks.indexOf(this);
            Lamarck.obj.bricks.splice(idx, 1);
            Lamarck.obj.brickRadius.splice(idx, 1);
            Lamarck.obj.brickAngle.splice(idx, 1);
            Lamarck.obj.mutateBricks();
        }
    };
    LamarckBrick.resetClass = function () {
        this.deadBricks = [];
        this.aliveBricks = [];
        this.revivingBricks = [];
        _super.resetClass.call(this);
    };
    LamarckBrick.id2Brick = new Map();
    LamarckBrick.deadBricks = [];
    LamarckBrick.aliveBricks = [];
    LamarckBrick.revivingBricks = [];
    return LamarckBrick;
}(Brick));
var Hadouken = /** @class */ (function () {
    function Hadouken(lamarck) {
        this.ratio = 148 / 106;
        this.speed = 0.01;
        this.lamarck = lamarck;
        this.x = lamarck.x;
        this.y = lamarck.y;
        this.w = lamarck.w / 3;
        this._h = this._w * this.ratio;
        lamarck.hadoukens.push(this);
        playSfx(HADOUKEN_SFX);
    }
    Hadouken.prototype.draw = function () {
        var alpha = (TimeLord.now() % 0.25 < 0.125) ? 1 : 0.75;
        drawImageOnCanvas(HADOUKEN_IMG, this.x, this.y, this.w, this.h, true, alpha);
    };
    Hadouken.prototype.update = function () {
        this._y += this.speed;
        if (this.y > canv.height + this.h) {
            remove(this, this.lamarck.hadoukens);
            return;
        }
        this.checkCollision();
    };
    Hadouken.prototype.checkCollision = function () {
        var _this = this;
        Paddle.paddles.forEach(function (paddle) {
            if (_this.overlaps(paddle)) {
                playSfx(HADOUKEN_HIT_SFX);
                paddle.die();
            }
        });
    };
    Hadouken.prototype.overlaps = function (paddle) {
        var bx = paddle.x, by = paddle.y, hbh = 0.5 * paddle.h, hbw = 0.5 * paddle.w;
        var w = this.w * 0.8, h = this.h * 0.8; // reduced hit box a bit because not rectangle
        var t = this.y - h / 2, l = this.x - w / 2;
        var r = l + w, b = t + h;
        // return by - hbh < b && by + hbh > t && bx - hbw < r && bx + hbw > l;
        return l < bx + hbw && r > bx - hbw && t < by + hbh && b > by - hbh; // rearranged to match order of other stuff
    };
    Object.defineProperty(Hadouken.prototype, "h", {
        get: function () {
            return this._h * canv.width;
        },
        set: function (val) {
            this._h = val / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hadouken.prototype, "w", {
        get: function () {
            return this._w * canv.width;
        },
        set: function (val) {
            this._w = val / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hadouken.prototype, "x", {
        get: function () {
            return this._x * canv.width;
        },
        set: function (value) {
            this._x = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hadouken.prototype, "y", {
        get: function () {
            return this._y * canv.width;
        },
        set: function (value) {
            this._y = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    return Hadouken;
}());
var HadoukenL2 = /** @class */ (function (_super) {
    __extends(HadoukenL2, _super);
    function HadoukenL2(lamarck, id) {
        var _this = _super.call(this, lamarck) || this;
        _this.rot = -Math.PI / 4;
        _this.dir = -1;
        if (id == 1) {
            _this._x += _this._w / 2;
            _this._y += _this._h / 2;
        }
        return _this;
    }
    HadoukenL2.prototype.draw = function () {
        var alpha = (TimeLord.now() % 0.25 < 0.125) ? 1 : 0.75;
        drawImageOnCanvas(HADOUKEN_IMG, this.x, this.y, this.w, this.h, true, alpha, this.rot * this.dir);
    };
    HadoukenL2.prototype.update = function () {
        _super.prototype.update.call(this);
        this._x += this.speed * this.dir;
        if (this.x - this.w / 2 < 0) {
            this.dir = 1;
        }
        else if (this.x + this.w / 2 > canv.width) {
            this.dir = -1;
        }
    };
    return HadoukenL2;
}(Hadouken));
var Explosion = /** @class */ (function () {
    function Explosion(x, y) {
        this._w = 0.1;
        this._h = 0.1;
        this.frameTime = 0.3;
        this.x = x;
        this.y = y;
        var size_scale = randRange(0.75, 1.25);
        this._w *= size_scale;
        this._h *= size_scale;
        this.rot = randRange(0, 2 * Math.PI);
        this.birthTime = TimeLord.now();
        Explosion.explosions.push(this);
    }
    Explosion.prototype.draw = function () {
        var age = TimeLord.now() - this.birthTime;
        var img = EXPLOSION_FRAME3;
        if (age < this.frameTime) {
            img = EXPLOSION_FRAME1;
        }
        else if (age < 2 * this.frameTime) {
            img = EXPLOSION_FRAME2;
        }
        else if (age > 3 * this.frameTime) {
            remove(this, Explosion.explosions);
            return;
        }
        drawImageOnCanvas(img, this.x, this.y, this.w, this.h, true, 1, this.rot);
    };
    Explosion.prototype.update = function (timeDelta) {
        this._y += timeDelta * Gravity;
    };
    Explosion.prototype.scale = function (val) {
        this._w *= val;
        this._h *= val;
    };
    Explosion.drawAll = function () {
        this.explosions.forEach(function (e) { return e.draw(); });
    };
    Explosion.updateAll = function (timeDelta) {
        this.explosions.forEach(function (e) { return e.update(timeDelta); });
    };
    Object.defineProperty(Explosion.prototype, "h", {
        get: function () {
            return this._h * canv.width;
        },
        set: function (val) {
            this._h = val / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Explosion.prototype, "w", {
        get: function () {
            return this._w * canv.width;
        },
        set: function (val) {
            this._w = val / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Explosion.prototype, "x", {
        get: function () {
            return this._x * canv.width;
        },
        set: function (value) {
            this._x = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Explosion.prototype, "y", {
        get: function () {
            return this._y * canv.width;
        },
        set: function (value) {
            this._y = value / canv.width;
        },
        enumerable: false,
        configurable: true
    });
    Explosion.explosions = [];
    return Explosion;
}());
var ExplosionRect = /** @class */ (function () {
    function ExplosionRect() {
    }
    ExplosionRect.activate = function (x, y, w, h, freq) {
        this._x = x / canv.width;
        this._y = y / canv.width;
        this._w = w / canv.width;
        this._h = h / canv.width;
        this.freq = freq;
        this.nextSpawnTime = 0;
        this.active = true;
    };
    ExplosionRect.deactivate = function () {
        this.active = false;
    };
    ExplosionRect.update = function () {
        var t = TimeLord.now();
        if (!this.active || t < this.nextSpawnTime) {
            return;
        }
        this.nextSpawnTime = t + this.freq;
        var x = randRange(this._x - this._w * 0.5, this._x + this._w * 0.5) * canv.width;
        var y = randRange(this._y - this._h * 0.5, this._y + this._h * 0.5) * canv.width;
        new Explosion(x, y);
    };
    ExplosionRect.setY = function (y) {
        this._y = y / canv.width;
    };
    ExplosionRect.active = false;
    return ExplosionRect;
}());
var Star = /** @class */ (function () {
    function Star(x, y) {
        this._w = 0.3;
        this._h = 0.3;
        this.spd = 0.15;
        this.lifetime = 0;
        this._x = x / canv.width;
        this._y = y / canv.width;
        var dx = x - canv.width * 0.5;
        var dy = y - canv.height * 0.7;
        var angle = Math.atan2(dy, dx);
        this._xv = this.spd * Math.cos(angle);
        this._yv = this.spd * Math.sin(angle);
        this.color = (randRange(-0.1, 0.1) + Star.colorMatch) % 1;
        Star.stars.push(this);
    }
    Star.prototype.update = function (timeDelta) {
        this._x += this._xv * timeDelta;
        this._y += this._yv * timeDelta;
        this.lifetime += timeDelta;
        if (this.lifetime > 5) {
            remove(this, Star.stars);
        }
    };
    Star.prototype.draw = function () {
        ctx.globalAlpha = clip(this.lifetime, 0.2, 1);
        ctx.fillStyle = colourMap(this.color, 0.3);
        var size = 0.007 * this.lifetime * canv.width;
        ctx.fillRect(this._x * canv.width, this._y * canv.width, size, size);
        ctx.globalAlpha = 1;
    };
    Star.update_all = function (timeDelta) {
        this.stars.forEach(function (s) { return s.update(timeDelta); });
        if (this.active && this.stars.length < this.MAX_STARS && TimeLord.now() > this.lastStarBornTime + 0.1) {
            new Star(randRange(0.1 * canv.width, 0.9 * canv.width), randRange(0.1 * canv.height, 0.9 * canv.height));
            this.lastStarBornTime = TimeLord.now();
        }
        if (this.active) {
            this.colorMatch = (this.colorMatch + timeDelta / 20) % 1;
            Paddle.paddles[0].colour = this.colorMatch;
        }
    };
    Star.draw_all = function () {
        if (!this.active)
            return;
        this.stars.forEach(function (s) { return s.draw(); });
    };
    Star.activate = function () {
        this.active = true;
        this.colorMatch = Paddle.paddles[0].colour;
    };
    Star.deactivate = function () {
        this.active = false;
        this.stars = [];
    };
    Star.MAX_STARS = 75;
    Star.lastStarBornTime = 0;
    Star.stars = [];
    Star.active = false;
    Star.colorMatch = 0;
    return Star;
}());
var TextObj = /** @class */ (function () {
    function TextObj(text, x, y, color, size) {
        if (size === void 0) { size = 14; }
        this.text = text;
        this._x = x / canv.width;
        this._y = y / canv.width;
        this.color = color;
        this.size = size;
        TextObj.texts.push(this);
    }
    TextObj.prototype.update = function (timeDelta) {
        this._y += timeDelta * Gravity;
        if (this._y > 3)
            remove(this, TextObj.texts);
    };
    TextObj.prototype.draw = function () {
        drawTextOnCanvas(this.text, this._x * canv.width, this._y * canv.width, this.color, this.size);
    };
    TextObj.updateAll = function (timeDelta) {
        this.texts.forEach(function (t) { return t.update(timeDelta); });
    };
    TextObj.drawAll = function () {
        this.texts.forEach(function (t) { return t.draw(); });
    };
    TextObj.reset = function () {
        this.texts = [];
    };
    TextObj.texts = [];
    return TextObj;
}());
var Ability = /** @class */ (function () {
    function Ability(myObject, startingValues, params) {
        if (startingValues === void 0) { startingValues = null; }
        var _this = this;
        this.params = params;
        this.myObject = myObject;
        if (startingValues !== null) {
            Object.entries(startingValues).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.params[key].val = value;
            });
        }
    }
    ;
    Ability.prototype.onAlive = function () { };
    ;
    Ability.prototype.update = function (timeDelta) { };
    ;
    Ability.prototype.draw = function () { };
    ;
    Ability.prototype.mutate = function () {
        Object.values(this.params).forEach(function (value) { return value.mutate(); });
    };
    Ability.prototype.copy = function (newMyObject) {
        if (newMyObject === void 0) { newMyObject = null; }
        var copyObj = this.doConstructor();
        if (newMyObject !== null) {
            copyObj.myObject = newMyObject;
        }
        copyObj.params = this.copyParams();
        copyObj.reset();
        return copyObj;
    };
    Ability.prototype.copyParams = function () {
        var newParams = {};
        Object.entries(this.params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            newParams[key] = value.copy();
        });
        return newParams;
    };
    return Ability;
}());
var SpeedPaddleAbility = /** @class */ (function (_super) {
    __extends(SpeedPaddleAbility, _super);
    function SpeedPaddleAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        return _super.call(this, myObject, startingValues, {
            speed: new MutatableParam(SpeedBallAbility.SPEED_MIN, SpeedBallAbility.SPEED_MAX),
        }) || this;
    }
    SpeedPaddleAbility.prototype.doConstructor = function () {
        return new SpeedPaddleAbility(this.myObject);
    };
    SpeedPaddleAbility.prototype.onAlive = function () {
        this.myObject.speed_modifier = this.params.speed.val;
    };
    SpeedPaddleAbility.prototype.reset = function () { };
    SpeedPaddleAbility.SPEED_MAX = 1.5;
    SpeedPaddleAbility.SPEED_MIN = 0.5;
    return SpeedPaddleAbility;
}(Ability));
var LengthPaddleAbility = /** @class */ (function (_super) {
    __extends(LengthPaddleAbility, _super);
    function LengthPaddleAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        return _super.call(this, myObject, startingValues, {
            length: new MutatableParam(LengthPaddleAbility.LENGTH_MIN, LengthPaddleAbility.LENGTH_MAX),
        }) || this;
    }
    LengthPaddleAbility.prototype.doConstructor = function () {
        return new LengthPaddleAbility(this.myObject);
    };
    LengthPaddleAbility.prototype.onAlive = function () {
        this.myObject.length_modifier = this.params.length.val;
    };
    LengthPaddleAbility.prototype.reset = function () { };
    LengthPaddleAbility.LENGTH_MAX = 1.5;
    LengthPaddleAbility.LENGTH_MIN = 0.5;
    return LengthPaddleAbility;
}(Ability));
var SpeedBallAbility = /** @class */ (function (_super) {
    __extends(SpeedBallAbility, _super);
    function SpeedBallAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        return _super.call(this, myObject, startingValues, {
            speed: new MutatableParam(SpeedBallAbility.SPEED_MIN, SpeedBallAbility.SPEED_MAX),
        }) || this;
    }
    SpeedBallAbility.prototype.doConstructor = function () {
        return new SpeedBallAbility(this.myObject);
    };
    SpeedBallAbility.prototype.onAlive = function () {
        this.myObject.speed_modifier = this.params.speed.val;
    };
    SpeedBallAbility.prototype.reset = function () { };
    SpeedBallAbility.SPEED_MAX = 1.5;
    SpeedBallAbility.SPEED_MIN = 0.5;
    return SpeedBallAbility;
}(Ability));
var SizeBallAbility = /** @class */ (function (_super) {
    __extends(SizeBallAbility, _super);
    function SizeBallAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        return _super.call(this, myObject, startingValues, {
            size: new MutatableParam(SizeBallAbility.SIZE_MIN, SizeBallAbility.SIZE_MAX),
        }) || this;
    }
    SizeBallAbility.prototype.doConstructor = function () {
        return new SizeBallAbility(this.myObject);
    };
    SizeBallAbility.prototype.onAlive = function () {
        this.myObject.size_modifier = this.params.size.val;
    };
    SizeBallAbility.prototype.reset = function () { };
    SizeBallAbility.SIZE_MAX = 2.5;
    SizeBallAbility.SIZE_MIN = 0.5;
    return SizeBallAbility;
}(Ability));
var TrailBallAbility = /** @class */ (function (_super) {
    __extends(TrailBallAbility, _super);
    function TrailBallAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        var _this = _super.call(this, myObject, startingValues, {
            time_on: new MutatableParam(-2, 4),
            time_off: new MutatableParam(1, 4),
        }) || this;
        _this.swapTime = -1;
        _this.trailRecTime = -1;
        _this.ghosting = false;
        _this.history = new FixedSizeQueue(TrailBallAbility.TRAIL_LEN);
        return _this;
    }
    TrailBallAbility.prototype.doConstructor = function () {
        return new TrailBallAbility(this.myObject);
    };
    TrailBallAbility.prototype.update = function (timeDelta) {
        if (!this.myObject.isServed)
            return;
        if (this.swapTime < 0) //start off
            this.swapTime = TimeLord.now() + this.params.time_off.val;
        else {
            if (TimeLord.now() > this.swapTime) {
                this.ghosting = !this.ghosting;
                this.myObject.ghostMode = this.ghosting;
                this.history.clear();
                this.swapTime = TimeLord.now() + (this.ghosting ? this.params.time_on.val : this.params.time_off.val);
            }
        }
        if (this.trailRecTime < 0 || TimeLord.now() > this.trailRecTime) {
            this.trailRecTime = TimeLord.now() + TrailBallAbility.TRAIL_INTERVAL;
            this.history.enqueue({ x: this.myObject.x, y: this.myObject.y, r: this.myObject.r });
        }
    };
    TrailBallAbility.prototype.draw = function () {
        if (!this.ghosting)
            return;
        var w = this.myObject.w;
        var h = this.myObject.h;
        var k = 0.5;
        var step = 0.5 / TrailBallAbility.TRAIL_LEN;
        var missing = TrailBallAbility.TRAIL_LEN - this.history.length;
        k += step * missing;
        for (var _i = 0, _a = Array.from(this.history); _i < _a.length; _i++) {
            var past = _a[_i];
            var wk = w * k;
            var hk = h * k;
            ctx.fillStyle = colourMap(this.myObject.colour, k - 1.5);
            drawRotatedRect(ctx, past.x - wk * 0.5, past.y - hk * 0.5, wk, hk, past.r);
            k += step;
        }
        ctx.fillStyle = colourMap(this.myObject.colour);
        drawRotatedRect(ctx, this.myObject.x - this.myObject.w * 0.5, this.myObject.y - this.myObject.h * 0.5, this.myObject.w, this.myObject.h, this.myObject.r);
    };
    TrailBallAbility.prototype.reset = function () { };
    TrailBallAbility.TRAIL_INTERVAL = 0.005;
    TrailBallAbility.TRAIL_LEN = 20;
    return TrailBallAbility;
}(Ability));
var LivesBrickAbility = /** @class */ (function (_super) {
    __extends(LivesBrickAbility, _super);
    function LivesBrickAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        return _super.call(this, myObject, startingValues, {
            lives: new MutatableParam(0, 3),
        }) || this;
    }
    LivesBrickAbility.prototype.doConstructor = function () {
        return new LivesBrickAbility(this.myObject);
    };
    LivesBrickAbility.prototype.onAlive = function () {
        this.myObject.lives = clip(Math.trunc(this.params["lives"].val) + 1, 1, 3);
    };
    LivesBrickAbility.prototype.reset = function () { };
    LivesBrickAbility.prototype.draw = function () {
        if (this.myObject.lives < 2)
            return;
        var obj = this.myObject;
        var outerColour = colourMap(obj.colour, -0.4);
        var innerColour = colourMap(obj.colour, -0.6);
        // draw vertical
        ctx.fillStyle = outerColour;
        var w = obj.w / 6;
        ctx.fillRect(obj.x - w / 2, obj.top, w * obj.sizeScalar, obj.h * obj.sizeScalar);
        if (this.myObject.lives < 3) {
            ctx.fillStyle = innerColour;
            ctx.fillRect(obj.x - w / 8, obj.top, w / 4 * obj.sizeScalar, obj.h * obj.sizeScalar);
            return;
        }
        // draw horizontal
        ctx.fillStyle = outerColour;
        var h = w;
        ctx.fillRect(obj.left, obj.y - h / 2, obj.w * obj.sizeScalar, h * obj.sizeScalar);
        ctx.fillStyle = innerColour;
        ctx.fillRect(obj.left, obj.y - h / 8, obj.w * obj.sizeScalar, h / 4 * obj.sizeScalar);
        //redo vert inner
        ctx.fillRect(obj.x - w / 8, obj.top, w / 4 * obj.sizeScalar, obj.h * obj.sizeScalar);
    };
    return LivesBrickAbility;
}(Ability));
var DodgeBrickAbility = /** @class */ (function (_super) {
    __extends(DodgeBrickAbility, _super);
    function DodgeBrickAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        var _this = _super.call(this, myObject, startingValues, {
            sense_radius: new MutatableParam(-0.5, 0.5),
            speed: new MutatableParam(0, 0.5),
            dist: new MutatableParam(0, 0.3),
        }) || this;
        _this.isRunning = false;
        _this.goalX = 0;
        _this.goalY = 0;
        _this.xOffset = 0;
        _this.yOffset = 0;
        return _this;
    }
    DodgeBrickAbility.prototype.doConstructor = function () {
        return new DodgeBrickAbility(this.myObject);
    };
    DodgeBrickAbility.prototype.reset = function () {
        this.isRunning = false;
        this.goalX = 0;
        this.goalY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
    };
    DodgeBrickAbility.prototype.update = function (timeDelta) {
        var _a;
        if (this.isRunning) {
            _a = moveTowards(this.xOffset, this.yOffset, this.goalX, this.goalY, this.params.speed.val * timeDelta), this.xOffset = _a[0], this.yOffset = _a[1];
            if (this.xOffset == this.goalX && this.yOffset == this.goalY) {
                // reached goal
                if (this.goalX == 0 && this.goalY == 0) {
                    // if goal is zero go back to sensing
                    this.isRunning = false;
                }
                else {
                    // else set goal to return to zero
                    this.goalX = 0;
                    this.goalY = 0;
                }
            }
            if (!this.myObject.abilities.includes(this)) {
                throw new Error("not my object");
            }
            this.myObject.xOffset += this.xOffset;
            this.myObject.yOffset += this.yOffset;
        }
        else if (this.params.sense_radius.val > 0) {
            var ball = this.getBallInRadius();
            if (ball !== null) {
                this.runFrom(ball);
            }
        }
    };
    DodgeBrickAbility.prototype.getBallInRadius = function () {
        // if any balls in range return one else return null
        for (var _i = 0, _a = Ball.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            if (dist(this.myObject, ball) <= this.params.sense_radius.val * this.myObject.canv.width) {
                return ball;
            }
        }
        return null;
    };
    DodgeBrickAbility.prototype.runFrom = function (ball) {
        var _a;
        // set goal and set isRunning
        _a = movePerpendicularBasedOnVelocity(this.myObject.x, this.myObject.y, ball.x, ball.y, ball.xv, ball.yv, this.params["dist"].val), this.goalX = _a[0], this.goalY = _a[1];
        this.isRunning = true;
    };
    return DodgeBrickAbility;
}(Ability));
var MoveBrickAbility = /** @class */ (function (_super) {
    __extends(MoveBrickAbility, _super);
    function MoveBrickAbility(myObject, startingValues) {
        if (startingValues === void 0) { startingValues = null; }
        var _this = _super.call(this, myObject, startingValues, {
            distX: new MutatableParam(0, 1.5),
            distY: new MutatableParam(0, 1.5),
            freqX: new MutatableParam(0.5, 1.5),
            freqY: new MutatableParam(0.5, 1.5)
        }) || this;
        _this.timeOffset = 0;
        return _this;
    }
    MoveBrickAbility.prototype.doConstructor = function () {
        return new MoveBrickAbility(this.myObject);
    };
    MoveBrickAbility.prototype.reset = function () { this.timeOffset = 0; };
    MoveBrickAbility.prototype.onAlive = function () {
        this.timeOffset = TimeLord.now();
    };
    MoveBrickAbility.prototype.update = function (timeDelta) {
        var time = TimeLord.now() - this.timeOffset
            + this.myObject.x / canv.width + this.myObject.y / canv.width;
        if (this.params.distX.val >= 0.5) {
            var offset = (this.params.distX.val - 0.5) / 8
                * Math.sin(this.params.freqX.val * time / 1);
            this.myObject.xOffset += offset;
        }
        if (this.params.distY.val >= 0.5) {
            var offset = (this.params.distY.val - 0.5) / 8
                * Math.sin(this.params.freqY.val * time / 1);
            this.myObject.yOffset += offset;
        }
    };
    return MoveBrickAbility;
}(Ability));
var Level = /** @class */ (function () {
    function Level(nRows, brickAbilities, ballAbilities, paddleAbilities, bgMusic) {
        if (nRows === void 0) { nRows = null; }
        if (brickAbilities === void 0) { brickAbilities = null; }
        if (ballAbilities === void 0) { ballAbilities = null; }
        if (paddleAbilities === void 0) { paddleAbilities = null; }
        if (bgMusic === void 0) { bgMusic = null; }
        this.nRows = nRows !== null && nRows !== void 0 ? nRows : 4;
        this.brickAbilities = brickAbilities !== null && brickAbilities !== void 0 ? brickAbilities : [];
        this.ballAbilities = ballAbilities !== null && ballAbilities !== void 0 ? ballAbilities : [];
        this.paddleAbilities = paddleAbilities !== null && paddleAbilities !== void 0 ? paddleAbilities : [];
        this.bgMusic = bgMusic !== null && bgMusic !== void 0 ? bgMusic : NORMAL_MUSIC;
    }
    Level.makeBossLevel = function () {
        new Lamarck(canv, 0.5, 0.8, 0.4, 0.4 * 2);
    };
    Level.makeCreditBlock = function (minY, text) {
        var gap = BRICK_GAP * canv.width;
        var wall = Walls.wall;
        var n_cols = 10;
        var w = (width - 2 * wall - gap * (n_cols + 1)) / n_cols;
        var h = (height - height * LOWEST_ROW - 2 * wall - gap * (MAX_ROWS + 1)) / MAX_ROWS;
        var y = minY + gap + wall, x = gap + wall;
        var n_rows = 5;
        var middleRow = Math.floor(n_rows / 2);
        var colour = randRange(0, 0.9);
        var middleY = 0;
        for (var row = 0; row < n_rows; row++) {
            for (var col = 0; col < n_cols; col++) {
                if (row != 0 && row != n_rows - 1 && col != 0 && col != n_cols - 1) {
                    x += gap + w;
                    continue;
                }
                if (row == middleRow)
                    middleY = y;
                new Brick(canv, colour + 0.03 * row + 0.01 * col, x, y, w, h, false);
                x += gap + w;
            }
            x = gap + Walls.wall;
            y += gap + h;
        }
        new TextObj(text, canv.width / 2, middleY, colourMap(colour, -0.1));
    };
    Level.makeEscapeLevel = function () {
        Brick.resetClass();
        Paddle.paddles[0].immune = true;
        Gravity = 0.1;
        // Gravity = 0.7;
        bg1Top = 0;
        bg2Top = bg1Top - canv.width * BG_RATIO;
        this.makeCreditBlock(-1 * canv.width, "LEAD DEVELOPER : ARTHUR PENTY");
        this.makeCreditBlock(-2 * canv.width, "GAME DESIGN : ARTHUR PENTY");
        this.makeCreditBlock(-3 * canv.width, "Art DIRECTOR : ARTHUR PENTY");
        this.makeCreditBlock(-4 * canv.width, "UI/UX DESIGN  : ARTHUR PENTY");
        this.makeCreditBlock(-5 * canv.width, "Evolutionary Consultant : ARTHUR PENTY");
        this.makeCreditBlock(-6 * canv.width, "SOUND DESIGN : ARTHUR PENTY");
        this.makeCreditBlock(-7 * canv.width, "ADAPTIVE SYSTEMS ENGINEER : ARTHUR PENTY");
        this.makeCreditBlock(-8 * canv.width, "LEAD MUTATOR : ARTHUR PENTY");
        this.makeCreditBlock(-9 * canv.width, "PRODUCED BY : ARTHUR PENTY");
        waitingForCredits = true;
        this.numCredBlocks = Brick.aliveBricks.length;
    };
    Level.finalScore = function () {
        var score = Brick.aliveBricks.length / this.numCredBlocks;
        Brick.resetClass();
        score = Math.floor(100 - score * 25);
        return score + "%";
    };
    Level.endOfCredits = function () {
        waitingForCredits = false;
        Gravity = 0;
        Ball.balls = [];
        var p = Paddle.paddles[0];
        Paddle.paddles = [p];
        p.active = false;
        playSfx(WHOOSH_SFX);
        new Tween(p.y, -p.h, 2, function (y) { return p.y = y; }, function () {
            new Tween(0, 2, 6, function (v) { return fade2black = v; }, function () {
                stopBGMusic();
                setDimensions2(1 / ZEBES_HEIGHT2WIDTH);
                new Explosion(0.5 * canv.width, 0.5 * canv.height).scale(10);
                Tween.Waiter(0.61, function () {
                    fade2black = 3;
                    p.x = canv.width / 2;
                    p.y = canv.height / 2;
                    p.h = 0;
                    p.w = 0;
                    paddleOnTop = true;
                    playSfx(WHOOSH_SFX);
                    Level.currentLevel.bgMusic = OUTRO_MUSIC;
                    startBGMusic();
                    var dur = 5;
                    new Tween(0, 0.1, dur, function (h) { return p._h = h; });
                    new Tween(0, 0.5, dur, function (w) { return p._w = w; });
                    new Tween(0, 0.75 * canv.height, dur, function (y) { return p.y = y; }, function () {
                        Star.activate();
                        Paddle.paddles[0].active = true;
                        new TextObj("THANKS FOR PLAYING", canv.width / 2, 0.2 * canv.height, "white", 20);
                        Tween.Waiter(3, function () {
                            new TextObj("SCORE:", canv.width / 2, 0.4 * canv.height, "white", 20);
                            Tween.Waiter(2, function () {
                                new TextObj(Level.finalScore(), canv.width / 2, 0.6 * canv.height, "white", 30);
                            });
                        });
                    });
                });
            });
        });
    };
    Level.makeLevel = function (level_num) {
        if (level_num === void 0) { level_num = 0; }
        Ball.flush();
        Paddle.flush();
        Walls.open = false;
        Walls.openFraction = 0;
        startBGMusic();
        var paddle = new Paddle(canv, 0);
        for (var _i = 0, _a = Level.levels[level_num].paddleAbilities; _i < _a.length; _i++) {
            var abilityFactory = _a[_i];
            paddle.abilities.push(abilityFactory(paddle));
        }
        paddle.active = true;
        paddle.onAlive();
        var ball = new Ball(canv);
        for (var _b = 0, _c = Level.levels[level_num].ballAbilities; _b < _c.length; _b++) {
            var abilityFactory = _c[_b];
            ball.abilities.push(abilityFactory(ball));
        }
        ball.onAlive();
        Level.setupBricks(level_num);
        if (this.currentLevelNum == Level.levels.length - 3)
            this.makeBossLevel();
        if (this.currentLevelNum == Level.levels.length - 1)
            this.makeEscapeLevel();
    };
    Level.setupBricks = function (level_num) {
        var level = Level.levels[level_num];
        var n_rows = level.nRows;
        var n_cols = BRICKS_PER_ROW;
        var max_colour_val = n_rows + BRICKS_PER_ROW;
        var gap = BRICK_GAP * canv.width;
        var wall = Walls.wall;
        var w = (width - 2 * wall - gap * (BRICKS_PER_ROW + 1)) / BRICKS_PER_ROW;
        var h = (height - height * LOWEST_ROW - 2 * wall - gap * (MAX_ROWS + 1)) / MAX_ROWS;
        var y = gap + wall, x = gap + wall;
        Brick.resetClass();
        for (var row = 0; row < n_rows; row++) {
            var _loop_1 = function (col) {
                var b = new Brick(canv, (row + col) / max_colour_val, x, y, w, h);
                Brick.neighbourPositions(row, col, n_rows, n_cols)
                    .map(function (_a) {
                    var nRow = _a[0], nCol = _a[1];
                    return nRow * n_cols + nCol;
                }) // Calculate neighbourIndex directly (assumes start at id 0 and increment row,col)
                    .forEach(function (neighbourId) {
                    b.neighbours.push(neighbourId); // Push the neighbour ID into the brick's neighbors array
                });
                for (var _i = 0, _a = level.brickAbilities; _i < _a.length; _i++) {
                    var abilityFactory = _a[_i];
                    b.abilities.push(abilityFactory(b));
                }
                b.onAlive();
                x += gap + w;
            };
            for (var col = 0; col < n_cols; col++) {
                _loop_1(col);
            }
            x = gap + Walls.wall;
            y += gap + h;
        }
    };
    Object.defineProperty(Level, "currentLevel", {
        get: function () {
            return Level.levels[Level.currentLevelNum];
        },
        enumerable: false,
        configurable: true
    });
    Level.win = function () {
        playSfx(WIN_SFX);
        Ball.balls = [];
        Paddle.paddles = [Paddle.paddles[0]];
        Tween.Waiter(3, function () { Walls.startOpen(); });
        if (Level.currentLevelNum < revealPass.length) {
            Tween.Waiter(3.5, function () {
                new TextObj("password:\n" + printLvlPass(Level.currentLevelNum + 1), canv.width / 2, canv.height / 2, "white", 30);
            });
        }
    };
    Level.doorEnter = function () {
        if (this.currentLevelNum < Level.levels.length - 1)
            this.nextLevel();
        else
            this.restart();
    };
    Level.goToLevel = function (levelNum) {
        stopBGMusic();
        this.reset_all();
        new Paddle(canv, 0).active = true;
        this.currentLevelNum = levelNum - 1;
        Walls.startOpen();
    };
    Level.nextLevel = function () {
        stopBGMusic();
        this.reset_all();
        this.makeLevel(++this.currentLevelNum);
    };
    Level.reset_all = function () {
        Lamarck.obj = null;
        LamarckBrick.resetClass();
        Star.deactivate();
        TextObj.reset();
        Brick.resetClass();
        Ball.flush();
        Paddle.flush();
        mutationStdScalar = 1;
        bgFlashingStart = -1;
        Gravity = 0;
        waitingForCredits = false;
        fade2black = 0;
        paddleOnTop = false;
        Tween.killAll(true);
    };
    Level.restart = function () {
        this.reset_all();
        stopBGMusic();
        this.makeLevel(this.currentLevelNum);
    };
    Level.lose = function () {
        var _this = this;
        Ball.balls = [];
        stopBGMusic();
        playSfx(FAIL_SFX);
        if (Lamarck.obj) {
            Tween.Waiter(2, function () {
                var _a;
                (_a = Lamarck.obj) === null || _a === void 0 ? void 0 : _a.deathTaunt(function () { _this.restart(); });
            });
        }
        else {
            Tween.Waiter(2, function () { return _this.restart(); });
        }
    };
    Level.currentLevelNum = 0;
    Level.levels = [
        // Level 0
        new Level(5, [
            function (b) { return new LivesBrickAbility(b, { "lives": 0.5 }); },
        ], [
            function (b) { return new SizeBallAbility(b, { size: 1 }); },
            function (b) { return new SpeedBallAbility(b, { speed: 1 }); },
        ], [
            function (b) { return new SpeedPaddleAbility(b, { speed: 1 }); },
            function (b) { return new LengthPaddleAbility(b, { length: 1 }); },
        ]),
        // Level 1
        new Level(7, [
            function (b) { return new LivesBrickAbility(b, { "lives": 0.5 }); },
            function (b) { return new DodgeBrickAbility(b, { "sense_radius": 0.32, "speed": 0.17, "dist": 0.25, }); }
        ], [
            function (b) { return new SizeBallAbility(b, { size: 1 }); },
            function (b) { return new SpeedBallAbility(b, { speed: 1 }); },
        ], [
            function (b) { return new SpeedPaddleAbility(b, { speed: 1 }); },
            function (b) { return new LengthPaddleAbility(b, { length: 1 }); },
        ]),
        // Level 2
        new Level(7, [
            function (b) { return new LivesBrickAbility(b, { "lives": 0.5 }); },
            function (b) { return new DodgeBrickAbility(b, { "sense_radius": -0.5, "speed": 0.5, "dist": 0.15 }); },
            function (b) { return new MoveBrickAbility(b, { distX: 1.5, distY: 1.5, freqX: 1.5, freqY: 1.5 }); }
        ], [
            function (b) { return new SizeBallAbility(b, { size: 1 }); },
            function (b) { return new SpeedBallAbility(b, { speed: 1 }); },
        ], [
            function (b) { return new SpeedPaddleAbility(b, { speed: 1 }); },
            function (b) { return new LengthPaddleAbility(b, { length: 1 }); },
        ]),
        // Level 3
        new Level(10, [
            function (b) { return new LivesBrickAbility(b, { "lives": 0.5 }); },
            function (b) { return new DodgeBrickAbility(b, { "sense_radius": -0.5, "speed": 0.5, "dist": 0.15 }); },
            function (b) { return new MoveBrickAbility(b, { distX: 0, distY: 0, freqX: 0, freqY: 0 }); }
        ], [
            function (b) { return new SizeBallAbility(b, { size: 1 }); },
            function (b) { return new SpeedBallAbility(b, { speed: 1 }); },
            function (b) { return new TrailBallAbility(b, { time_on: -2, time_off: 2 }); },
        ], [
            function (b) { return new SpeedPaddleAbility(b, { speed: 1 }); },
            function (b) { return new LengthPaddleAbility(b, { length: 1 }); },
        ]),
        // Level Boss
        new Level(0, [
            function (b) { return new LivesBrickAbility(b, { "lives": 0.5 }); },
            function (b) { return new DodgeBrickAbility(b, { "sense_radius": -0.5, "speed": 0.5, "dist": 0.15 }); },
            function (b) { return new MoveBrickAbility(b, { distX: 0, distY: 0, freqX: 0, freqY: 0 }); }
        ], [
            function (b) { return new SizeBallAbility(b, { size: 1 }); },
            function (b) { return new SpeedBallAbility(b, { speed: 1 }); },
            function (b) { return new TrailBallAbility(b, { time_on: -2, time_off: 2 }); },
        ], [
            function (b) { return new SpeedPaddleAbility(b, { speed: 1 }); },
            function (b) { return new LengthPaddleAbility(b, { length: 1 }); },
        ], BOSS_MUSIC),
        new Level(0, [], [], [], SIREN_MUSIC), // dummy level for siren
        new Level(0, [], [], [], ESCAPE_MUSIC), // dummy level for escape
    ];
    return Level;
}());
function movePerpendicularBasedOnVelocity(brickX, brickY, ballX, ballY, ballVX, ballVY, dist) {
    // Calculate the direction vector from brick to ball
    var dx = ballX - brickX;
    var dy = ballY - brickY;
    // Find the length of the direction vector (Euclidean distance)
    var length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) {
        throw new Error("Ball and brick positions are the same. Cannot move perpendicular.");
    }
    // Normalize the direction vector
    var unitDx = dx / length;
    var unitDy = dy / length;
    // Calculate the perpendicular vectors
    var perpClockwiseX = -unitDy;
    var perpClockwiseY = unitDx;
    var perpCounterClockwiseX = unitDy;
    var perpCounterClockwiseY = -unitDx;
    // Dot product of ball's velocity with the clockwise perpendicular vector
    var dotClockwise = ballVX * perpClockwiseX + ballVY * perpClockwiseY;
    // Dot product of ball's velocity with the counter clockwise perpendicular vector
    var dotCounterClockwise = ballVX * perpCounterClockwiseX + ballVY * perpCounterClockwiseY;
    // Choose the perpendicular direction that moves away from the ball's path
    var perpX, perpY;
    if (dotClockwise < dotCounterClockwise) {
        // Move clockwise (away from the ball's velocity)
        perpX = perpClockwiseX;
        perpY = perpClockwiseY;
    }
    else {
        // Move counter clockwise (away from the ball's velocity)
        perpX = perpCounterClockwiseX;
        perpY = perpCounterClockwiseY;
    }
    // Move in the chosen perpendicular direction by the given distance
    var newX = perpX * dist;
    var newY = perpY * dist;
    return [newX, newY];
}
function moveTowards(x, y, targetX, targetY, dist) {
    // Calculate the distance to the target point
    var dx = targetX - x;
    var dy = targetY - y;
    // Calculate the current distance to the target
    var distanceToTarget = Math.sqrt(dx * dx + dy * dy);
    // If the distance to the target is less than or equal to dist, return the target position
    if (distanceToTarget <= dist) {
        return [targetX, targetY];
    }
    // Normalize the direction vector (dx, dy) and scale it by dist
    var ratio = dist / distanceToTarget;
    var newX = x + dx * ratio;
    var newY = y + dy * ratio;
    return [newX, newY];
}
// function drawImageOnCanvas(image: HTMLImageElement, x: number, y: number, w: number, h: number, centreAnchor = false, alpha = 1) {
//     const xx = !centreAnchor ? x : x - 0.5 * w;
//     const yy = !centreAnchor ? y : y - 0.5 * h;
//     ctx.globalAlpha = alpha;
//     ctx.drawImage(image, xx, yy, w, h);
//     ctx.globalAlpha = 1;
// }
function drawImageOnCanvas(image, x, y, w, h, centreAnchor, alpha, rotation // Rotation angle in radians
) {
    if (centreAnchor === void 0) { centreAnchor = false; }
    if (alpha === void 0) { alpha = 1; }
    if (rotation === void 0) { rotation = 0; }
    ctx.save();
    var xx = !centreAnchor ? x + 0.5 * w : x;
    var yy = !centreAnchor ? y + 0.5 * h : y;
    ctx.translate(xx, yy);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, -0.5 * w, -0.5 * h, w, h);
    ctx.restore();
}
var levelPasswords = (_a = {},
    _a["ocqk9o"] = 0,
    _a["68rsvv"] = 1,
    _a["-ona6tj"] = 2,
    _a["7fwoik"] = 3,
    _a["-bkvikt"] = 4,
    _a);
var revealPass = [
    [['x868v', 1], ['MQ4zV', 2], ['M8RKT', 3], ['Km7B0', 6], ['lRk2i', 1], ['lRk2i', 5]],
    [['0eG1h', 3], ['vZfgA', 3], ['0OXzF', 2], ['MQ4zV', 2], ['MQ4zV', 5], ['MQ4zV', 3], ['syN5o', 2], ['qxCoY', 2]],
    [['8OSJE', 1], ['oCOSn', 2], ['C4tXA', 1], ['3ruQ3', 4], ['8tt7M', 1], ['a5ZND', 6], ['knd10', 1], ['a5ZND', 1], ['iAQKC', 4]],
    [['4qwJm', 1], ['tcmuJ', 5], ['CToe4', 4], ['qxCoY', 6], ['Dtkwl', 3], ['9AMvX', 0], ['8OSJE', 1]],
    [['sFE6G', 3], ['L4BIZ', 3], ['L4BIZ', 4], ['pxZL7', 6], ['aZJbi', 4], ['UX9eD', 5]]
];
function printLvlPass(lvlNum) {
    var res = "";
    revealPass[lvlNum].forEach(function (_a) {
        var s = _a[0], i = _a[1];
        res += hashPass(s)[i];
    });
    return res;
}
function checkPassword() {
    var password = hashPass(passwordInput.value.trim().toLowerCase());
    console.log("hashed pass:".concat(password, "."));
    if (levelPasswords[password] !== undefined) {
        var level_1 = levelPasswords[password];
        passwordInput.style.backgroundColor = "green";
        if (level_1 > 0) {
            console.log("Password accepted! Skipping to level ".concat(level_1, "."));
            Level.goToLevel(level_1);
        }
        else {
            coolMode = true;
        }
    }
    else {
        console.log("Invalid password.");
        passwordInput.style.backgroundColor = "red";
    }
    Tween.Waiter(3, function () { return passwordInput.style.backgroundColor = "white"; });
    passwordInput.value = ""; // Clear the input field
    canv.focus();
}
var MutatableParam = /** @class */ (function () {
    function MutatableParam(min, max, val, std) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        if (val === void 0) { val = null; }
        if (std === void 0) { std = null; }
        this.min = min;
        this.max = max;
        this.val = val !== null && val !== void 0 ? val : randRange(min, max);
        this.std = std !== null && std !== void 0 ? std : (max - min) / 5;
    }
    MutatableParam.prototype.copy = function () {
        return new MutatableParam(this.min, this.max, this.val);
    };
    MutatableParam.prototype.mutate = function () {
        this.val = clip(randomGaussian(this.val, this.std * mutationStdScalar), this.min, this.max);
    };
    return MutatableParam;
}());
// set up the game canvas
setDimensions();
// setup context
// game variables
var paused = false;
var debugDrawObjects = {};
var touchTargetX = null;
var keyboardMoving = [Direction.STOP]; // check the last element to see which way to move (most recently added)
var level;
canv.focus();
// start new game
// Level.restart();
Level.currentLevelNum = 0; //start
// Level.currentLevelNum = 4; // boss
// Level.currentLevelNum = 6; // esc
Level.restart();
// new Tween([0,0], [600,600], 3, p => addDebugGraphic("test","red",p[0],p[1])); 
// var brick1 = new Brick(canv, 0.2, 100, 250, 100, 20);
// var brick2 = new Brick(canv, 0.6, 300, 400, 100, 20);
// bricks.push(brick1)
// bricks.push(brick2)
// // brick2.die()
// new Tween(brick1.getPos(), brick2.getPos(), 2, arr => brick2.setPos(arr), () => brick2.colour=0.9);
// brick1.kloneInto(brick2);
// event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
window.addEventListener("resize", setDimensions);
canv.addEventListener("touchcancel", touchCancel);
canv.addEventListener("touchend", touchEnd);
canv.addEventListener("touchmove", touchMove);
canv.addEventListener("touchstart", touchStart);
//#region game loop
// setup game loop
var timeDelta, timeLast;
var currentLoop = gameLoop;
requestAnimationFrame(loop);
function loop(timeNow) {
    if (!timeLast) {
        timeLast = timeNow;
    }
    // calculate time difference 
    timeDelta = (timeNow - timeLast) / 1000; //seconds
    timeLast = timeNow;
    if (!paused) {
        currentLoop(timeDelta);
    }
    // call the next loop
    requestAnimationFrame(loop);
}
function gameLoop(timeDelta) {
    var _a, _b;
    // update
    TimeLord.update(timeDelta);
    Tween.updateAll();
    Paddle.paddles.forEach(function (b) { return b.update(timeDelta); });
    Ball.balls.forEach(function (b) { return b.update(timeDelta); });
    Brick.update_all(timeDelta);
    (_a = Lamarck.obj) === null || _a === void 0 ? void 0 : _a.update(timeDelta);
    Explosion.updateAll(timeDelta);
    TextObj.updateAll(timeDelta);
    updateEscapeBG(timeDelta);
    Star.update_all(timeDelta);
    // draw
    drawBackground();
    Walls.draw();
    Paddle.paddles.forEach(function (b) { return b.draw(); });
    Brick.draw_all();
    (_b = Lamarck.obj) === null || _b === void 0 ? void 0 : _b.draw();
    ExplosionRect.update();
    Ball.balls.forEach(function (b) { return b.draw(); });
    drawDebugGraphics();
    drawBlack();
    Star.draw_all();
    Explosion.drawAll();
    TextObj.drawAll();
    if (paddleOnTop)
        Paddle.paddles.forEach(function (b) { return b.draw(); });
    if (waitingForCredits && TextObj.texts.length == 0)
        Level.endOfCredits();
}
//#endregion
function setDimensions() {
    height = Math.max(window.innerHeight * 14 / 16, 10); // pixels
    width = height / SCREEN_RATIO;
    if (width > window.innerWidth) {
        width = Math.max(window.innerHeight, 10);
        height = width * SCREEN_RATIO;
    }
    Walls.wall = width / 50;
    canv.width = width;
    canv.height = height;
}
function setDimensions2(ratio) {
    if (ratio === void 0) { ratio = null; }
    height = Math.max(window.innerHeight * 14 / 16, 10); // pixels
    ratio = ratio !== null && ratio !== void 0 ? ratio : SCREEN_RATIO;
    width = height / ratio;
    if (width > window.innerWidth) {
        width = Math.max(window.innerHeight, 10);
        height = width * SCREEN_RATIO;
    }
    Walls.wall = width / 50;
    canv.width = width;
    canv.height = height;
}
function drawBackground() {
    if (Level.currentLevelNum == Level.levels.length - 1)
        return drawEscapeBackground();
    if (bgFlashingStart < 0)
        ctx.fillStyle = COLOUR_BACKGROUND;
    else {
        var phi = bgFlashingStart * Math.PI / 1.25;
        var val = Math.abs(Math.sin(TimeLord.now() * Math.PI / 1.25 - phi)) * 0.3;
        ctx.fillStyle = colourMap(0, val - 1);
    }
    ctx.fillRect(0, 0, canv.width, canv.height);
}
function drawBlack() {
    if (!fade2black)
        return;
    ctx.fillStyle = colourMap(0, -1);
    ctx.globalAlpha = Math.min(fade2black, 1);
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.globalAlpha = 1;
    if (fade2black > 1) {
        if (fade2black <= 2)
            drawImageOnCanvas(ZEBES_IMG, canv.width / 2, canv.height / 2, canv.height * ZEBES_HEIGHT2WIDTH, canv.height, true, fade2black - 1);
        else {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canv.width, canv.height);
        }
    }
}
function drawEscapeBackground() {
    drawImageOnCanvas(ESCAPE_BG_IMG, 0, bg1Top, canv.width, BG_RATIO * canv.width);
    drawImageOnCanvas(ESCAPE_BG_IMG, 0, bg2Top, canv.width, BG_RATIO * canv.width);
    var phi = bgFlashingStart * Math.PI / 1.25;
    var val = Math.abs(Math.sin(TimeLord.now() * Math.PI / 1.25 - phi)) * 0.3;
    ctx.fillStyle = colourMap(0);
    ctx.globalAlpha = val;
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.globalAlpha = 1;
}
function updateEscapeBG(timeDelta) {
    if (Level.currentLevelNum != Level.levels.length - 1)
        return;
    bg1Top += Gravity * timeDelta * canv.width;
    bg2Top += Gravity * timeDelta * canv.width;
    if (bg1Top > canv.height)
        bg1Top = bg2Top - canv.width * BG_RATIO;
    else if (bg2Top > canv.height)
        bg2Top = bg1Top - canv.width * BG_RATIO;
}
function startBGMusic() {
    var music = Level.currentLevel.bgMusic;
    if (music.paused) {
        music.currentTime = 0;
        music.play().catch(function (e) {
            if (e.name !== 'NotAllowedError') {
                throw e; // Re-throw if it's not NotAllowedError
            }
        });
        if (music == SIREN_MUSIC || music == ESCAPE_MUSIC) {
            bgFlashingStart = TimeLord.now();
        }
    }
}
function stopBGMusic() {
    var music = Level.currentLevel.bgMusic;
    music.pause();
    music.currentTime = 0;
}
function pause() {
    paused = !paused;
}
function colourMap(val, exposure) {
    if (exposure === void 0) { exposure = 0; }
    // r - > g -> b -> r
    var r, g, b;
    var SIXTH = 1 / 6;
    if (val < SIXTH) {
        b = 0;
        r = 1;
        g = (val) / SIXTH;
    }
    else if (val < 2 * SIXTH) {
        b = 0;
        g = 1;
        r = 1 - ((val - SIXTH) / SIXTH);
    }
    else if (val < 3 * SIXTH) {
        r = 0;
        g = 1;
        b = ((val - 2 * SIXTH) / SIXTH);
    }
    else if (val < 4 * SIXTH) {
        r = 0;
        b = 1;
        g = 1 - ((val - 3 * SIXTH) / SIXTH);
    }
    else if (val < 5 * SIXTH) {
        g = 0;
        b = 1;
        r = (val - 4 * SIXTH) / SIXTH;
    }
    else {
        g = 0;
        r = 1;
        b = Math.max(1 - ((val - 5 * SIXTH) / SIXTH), 0);
    }
    if (exposure != 0) {
        r = clip(r + exposure, 0, 1);
        g = clip(g + exposure, 0, 1);
        b = clip(b + exposure, 0, 1);
    }
    return rgbColourString(r, g, b);
}
function rgbColourString(r, g, b) {
    return "rgb(" + r * 255 + " " + g * 255 + " " + b * 255 + ")";
}
function choose(arr) {
    return arr[Math.trunc(Math.random() * arr.length)];
}
function clip(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
function popClosest(set, val, remove) {
    if (remove === void 0) { remove = true; }
    if (set.size === 0) {
        throw new Error("Cannot pop from an empty set");
    }
    var closestValue;
    var smallestDiff = Infinity;
    // Iterate through the set to find the closest value
    set.forEach(function (num) {
        var diff = Math.abs(num - val);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closestValue = num;
        }
    });
    if (remove)
        set.delete(closestValue);
    return closestValue;
}
function range(n) {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i <= n)) return [3 /*break*/, 4];
                return [4 /*yield*/, i];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
function playSfx(sfx, t) {
    if (t === void 0) { t = 0; }
    sfx.currentTime = t;
    if (sfx.paused) {
        sfx.play();
    }
    return sfx.duration;
}
function randRange(low, high) {
    if (low === void 0) { low = 0; }
    if (high === void 0) { high = 1; }
    return Math.random() * (high - low) + low;
}
function randomGaussian(mean, stdDev) {
    if (mean === void 0) { mean = 0; }
    if (stdDev === void 0) { stdDev = 1; }
    // Generate two uniform random numbers between 0 and 1
    var u1 = Math.random();
    var u2 = Math.random();
    // Use Box-Muller transform to generate two standard normal variables
    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    // const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2); // If you need another sample
    // Scale and shift to get the desired mean and standard deviation
    return z0 * stdDev + mean;
}
function mutateColour(colour) {
    return (colour + (Math.random() * 0.2 - 0.1)) % 1;
}
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // Generate a random index
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1]; // Swap elements at i and j
    }
}
function argMin(array) {
    return array.map(function (x, i) { return [x, i]; }).reduce(function (r, a) { return (a[0] < r[0] ? a : r); })[1];
}
function sqr(x) {
    return Math.pow(x, 2);
}
function sqrt(x) {
    return Math.sqrt(x);
}
function product(numbers) {
    if (numbers.length === 0) {
        throw new Error("The array must not be empty.");
    }
    return numbers.reduce(function (product, num) { return product * num; }, 1);
}
function dist(obj1, obj2) {
    return sqrt(sqr(obj1.x - obj2.x) + sqr(obj1.y - obj2.y));
}
function hashPass(password) {
    var hash = 0;
    for (var i = 0; i < password.length; i++) {
        hash += password.charCodeAt(i);
        hash = (hash << 5) - hash + (i + 1);
        hash = hash & hash;
    }
    return hash.toString(36);
}
function debugLog(msg) {
    if (DEBUG)
        console.log(msg);
}
function drawDebugGraphics() {
    // debugDrawObjects[id] = [x,y,w,h,color];
    for (var id in debugDrawObjects) {
        var d = debugDrawObjects[id];
        ctx.fillStyle = d[4];
        ctx.fillRect(d[0] - d[2] * 0.5, d[1] - d[3] * 0.5, d[2], d[3]);
    }
}
function addDebugGraphic(id, color, x, y, w, h) {
    if (color === void 0) { color = "red"; }
    if (x === void 0) { x = null; }
    if (y === void 0) { y = null; }
    if (w === void 0) { w = null; }
    if (h === void 0) { h = null; }
    x = x !== null && x !== void 0 ? x : canv.width / 2;
    y = y !== null && y !== void 0 ? y : canv.height / 2;
    w = w !== null && w !== void 0 ? w : Walls.wall;
    h = h !== null && h !== void 0 ? h : Walls.wall;
    debugDrawObjects[id] = [x, y, w, h, color];
}
function drawRotatedRect(ctx, x, y, w, h, angle) {
    // Save the current state
    ctx.save();
    // Translate to the center of the rectangle
    ctx.translate(x + w * 0.5, y + h * 0.5);
    // Rotate by the specified angle
    ctx.rotate(angle);
    // Draw the rectangle centered at (0, 0)
    ctx.fillRect(-w * 0.5, -h * 0.5, w, h);
    // Restore the state
    ctx.restore();
}
function remove(val, arr) {
    var idx = arr.indexOf(val);
    if (idx == -1)
        return false;
    arr.splice(idx, 1);
    return true;
}
function pushMove(dir) {
    var idx = keyboardMoving.indexOf(dir);
    if (idx == keyboardMoving.length - 1)
        return; //if already last do nothing
    if (idx > -1)
        popMove(dir); // if already in list remove
    keyboardMoving.push(dir); // add to end
}
function popMove(dir) {
    keyboardMoving.splice(keyboardMoving.indexOf(dir), 1);
}
function keyDown(ev) {
    switch (ev.code) {
        case " ": // space bar
        case "Spacebar": // space bar
        case "Space": // space bar
            if (document.activeElement === passwordInput)
                return;
            startBGMusic();
            Ball.balls.forEach(function (b) { return b.serve(1 / 2 * Math.PI); });
            break;
        case "ArrowLeft": // left arrow key
            pushMove(Direction.LEFT);
            // debugLog("L key down")
            break;
        case "ArrowRight": // right arrow key
            pushMove(Direction.RIGHT);
            // debugLog("R key down")
            break;
    }
}
function keyUp(ev) {
    switch (ev.code) {
        case "ArrowLeft": // left arrow key;
            popMove(Direction.LEFT);
            debugLog("L key up");
            break;
        case "ArrowRight": // right arrow key
            popMove(Direction.RIGHT);
            debugLog("R key up");
            break;
    }
    // if (DEBUG) console.log("kbm="+keyboardMoving)
}
function touch(x) {
    touchTargetX = x;
}
function touchCancel(ev) {
    ev.preventDefault();
    touch(null);
}
function touchEnd(ev) {
    Ball.balls.forEach(function (b) { return b.serve(); });
    ev.preventDefault();
    touch(null);
}
function touchMove(ev) {
    ev.preventDefault();
    touch(ev.touches[0].clientX - canv.getBoundingClientRect().left);
}
function touchStart(ev) {
    ev.preventDefault();
    touch(ev.touches[0].clientX - canv.getBoundingClientRect().left);
}
function rad2deg(angle) {
    return (angle / Math.PI * 180);
}
function drawTextOnCanvas(text, x, y, color, fontSize, fontFamily) {
    if (color === void 0) { color = "white"; }
    if (fontSize === void 0) { fontSize = 14; }
    if (fontFamily === void 0) { fontFamily = "Arial"; }
    ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
    ctx.fillStyle = color;
    var textWidth = ctx.measureText(text).width;
    var centeredX = x - textWidth / 2;
    ctx.fillText(text, centeredX, y);
}
