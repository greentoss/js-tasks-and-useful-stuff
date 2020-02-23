let pulse = (Math.random()*10).toFixed(2);
console.log(pulse);

(function(){
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),                  //context
        width = canvas.width = innerWidth,              //width of canvas
        height = canvas.height = innerHeight,           //height of canvas
        particles = [],                                 // vs particles
        properties = {                                  //assotiative array properties od particles
            bgColor         : 'rgba(17, 17, 19, 1)',    //color of background
            particleColor   : /*'rgba(255, 40, 40, 1)'*/ 'rgba(144, 17, 226, 1)',
            particleRadius  : 4,
            particleCount   : 100,
            particleMaxVelosity : 2,
            lineLength          : 150,
            particleLife        : 6
    };

    document.querySelector('body').appendChild(canvas); //dinamcally change canvas size
    window.onresize = () => {
        width = canvas.width = innerWidth;
        height = canvas.height = innerHeight;
    };

    class Particle {
        constructor() {
            this.x = Math.random()*width;         //placement of particles depending on width
            this.y = Math.random()*height;        //placement of particles depending on height
            this.velosityX = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
            this.velosityY = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
            this.life = Math.random()*particles.particleLife*60;

        }

        positon() {                              //method that refreshes position
            this.x + this.velosityX > width && this.velosityX > 0 || this.x + this.velosityX < 0 && this.velosityX < 0 ? this.velosityX*=-1 : this.velosityX;
            this.y + this.velosityY > height && this.velosityY > 0 || this.y + this.velosityY < 0 && this.velosityY < 0 ? this.velosityY*=-1 : this.velosityY;
            //this.x = this position in a moment
            //this.velosityX = this speed in a moment
            //change direction of particle if it tuches borders
            this.x += this.velosityX;
            this.y += this.velosityY;
        }

        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }

        reCalculateLife () {
            if (this.life < 1) {
                this.x = Math.random()*width;         //placement of particles depending on width
                this.y = Math.random()*height;        //placement of particles depending on height
                this.velosityX = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
                this.velosityY = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
                this.life = Math.random()*particles.particleLife*60;
            }
            this.life --;
        }
    }

    function redrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, width, height);
    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity, pulse;
        for (let i in particles) {
            for (let j in particles){   //variables in this function takes positions
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                pulse = (Math.random()).toFixed(2);

                if (length < properties.lineLength) {
                    opacity = 1 - length/properties.lineLength; //the less length the less opacity
                    // ctx.lineWidth = '0,5';
                    ctx.lineWidth = pulse;
                    ctx.strokeStyle = 'rgba(144, 17, 226, '+opacity+')';
                    //ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function redrawParticles(){
        for (let i in particles) {
            particles[i].reCalculateLife();
            particles[i].positon();
            particles[i].reDraw();
        }
    }

    function loop() {                               //recursive function
        redrawBackground();
        redrawParticles();
        drawLines();
        requestAnimationFrame(loop);                // calls function 60 times / second
    }

    function init () {
        for (let i = 0; i <= properties.particleCount; i++) {
            particles.push(new Particle);
        }

        loop ();
    }

    init();

}());

