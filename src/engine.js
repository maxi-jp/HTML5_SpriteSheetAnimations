
var canvas;
var ctx;

var targetDT = 1 / 60;
var globalDT;
var time = 0,
    FPS  = 0,
    frames    = 0,
    acumDelta = 0;

window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
    	window.mozRequestAnimationFrame    ||
    	window.webkitRequestAnimationFrame ||
    	window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDT * 1000);
    	};
}) ();

// graphic assets references
var graphics = {}

// audio assets references
var audio = {}

var linkAnimation;
var linkAnimation2;
var linkAnimation3;
var currentLink;

// window onload event
window.onload = BodyLoaded;

function BodyLoaded()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();
    SetupMouseEvents();

    LoadResources(function() {
        Start();
        Loop();
    });
}

function LoadResources(onloaded)
{
    // audio references

    // graphic references
    graphics.link = new Image();
    graphics.link.src = "assets/link.png";
    graphics.link.onload = function() 
    {
        graphics.link2 = new Image();
        graphics.link2.src = "assets/link2.png";
        graphics.link2.onload = function() 
        {
            graphics.link3 = new Image();
            graphics.link3.src = "assets/link3.png";
            graphics.link3.onload = function() 
            {
                onloaded();
            }
        }
    }
}

function Start()
{
    linkAnimation = new SSAnimation(graphics.link, 96, 104, [3, 3, 1, 3, 10, 10, 10, 10], 1 / 4);
    linkAnimation2 = new SSAnimation(graphics.link2, 24, 32, [12, 12, 12, 12, 12, 12, 12, 12], 1 / 24);
    linkAnimation2.PlayAnimationLoop(6);
    linkAnimation3 = new SSAnimation(graphics.link3, 64, 96, [8, 8, 8, 8], 1 / 12);
    linkAnimation3.PlayAnimationLoop(1);

    currentLink = linkAnimation;
}

function Loop()
{
    //deltaTime
    let now = Date.now();
    let deltaTime = now - time;
    globalDT = deltaTime;
    
    if (deltaTime > 1000)
        deltaTime = 0;
    
    time = now;

    // frames counter
    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1000)
    {
        FPS = frames;
        frames = 0;
        acumDelta -= acumDelta;
    }

    requestAnimationFrame(Loop);

    Input.Update();
    Update(deltaTime / 1000);
    Input.PostUpdate();

    Draw(ctx);
}

function Update(deltaTime)
{
    if (Input.IsKeyDown(KEY_0))
        currentLink = linkAnimation;
    if (Input.IsKeyDown(KEY_1))
        currentLink = linkAnimation2;
    if (Input.IsKeyDown(KEY_2))
        currentLink = linkAnimation3;

    
    if (Input.IsKeyDown(KEY_UP)) // play the next animation
        currentLink.PlayAnimationLoop((currentLink.actualAnimation + 1) % currentLink.frameCount.length);
    if (Input.IsKeyDown(KEY_DOWN)) // play the previous animation
        currentLink.PlayAnimationLoop((currentLink.actualAnimation + currentLink.frameCount.length - 1) % currentLink.frameCount.length);

    linkAnimation.Update(deltaTime);
    linkAnimation2.Update(deltaTime);
    linkAnimation3.Update(deltaTime);
}

function Draw(ctx)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(200, 200);
    linkAnimation.Draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(400, 200);
    linkAnimation2.Draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(500, 200);
    linkAnimation3.Draw(ctx);
    ctx.restore();

    // draw the frame counter
    ctx.fillStyle = "black";
    ctx.font = "12px Comic Sans MS";
    ctx.fillText("FPS: " + FPS, 10, 20);
    ctx.fillText("DT: " + 1000 / globalDT, 15, 34);

    ctx.fillText("Current animation sprite: " + currentLink.image.src, 10, 50);
    ctx.fillText("Current animation row: " + currentLink.actualAnimation, 10, 60);

}
