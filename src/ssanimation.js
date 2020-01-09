
class SSAnimation
{
    constructor(image, frameWidth, frameHeight, frameCount, framesDuration)
    {
        this.image = image;

        this.pivot = {
            x: 32,
            y: 32
        };

        this.framesDuration = framesDuration;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.actualAnimation = 0;
        this.actualFrame = 0;
        this.actualFrameCountTime = 0;
    }
    
    Start()
    {

    }

    Update(deltaTime)
    {
        this.actualFrameCountTime += deltaTime;
        if (this.actualFrameCountTime >= this.framesDuration)
        {
            // update the animation with the new frame
            this.actualFrame = (this.actualFrame + 1) % this.frameCount[this.actualAnimation];

            this.actualFrameCountTime = 0;
        }
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, this.actualFrame * this.frameWidth, this.actualAnimation * this.frameHeight, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
    }

    PlayAnimationLoop(animationId)
    {
        this.actualAnimation = animationId;

        // reset the frame count
        this.actualFrame = 0;
        this.actualFrameCountTime = 0;
    }
}