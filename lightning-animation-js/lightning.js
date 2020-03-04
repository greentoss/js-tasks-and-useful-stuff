(function(){

    const TWO_PI = 2 * Math.PI;

    let canvas             = document.createElement('canvas'),
        ctx                = canvas.getContext('2d'),                  //context
        width              = canvas.width = innerWidth,              //width of canvas
        height             = canvas.height = innerHeight,
        canvasColor        = '#232332';
        circles            = [];
        const stepLength   = 2;
        let circleCount    = 6;
        const maxLengthCharge = 500;
        const maxOffset    = 6;
        let mx             = 0,
            my             = 0,
            toggle         = 0;


        class Circle {
            constructor (x, y) {
                this.x = x || Math.random() * width;
                this.y = y || Math.random() * height;
            }

            drawCircle(x, y) {
                this.x = x || this.x;
                this.y = y || this.y;

                ctx.lineWidth    = 1.5;
                ctx.fillStyle     = 'white';
                ctx.strokeStyle  = 'red';

                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, TWO_PI);          //radius 6, first angle 0 radian, second angle TWO_PI radian
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(this.x, this.y, 10, 0, TWO_PI);
                ctx.closePath();
                ctx.stroke();

            }
        }

        function createLightning() {
            for (let a = 0; a < circles.length; a++) {
                for (let b = a + 1; b < circles.length; b++) {  //avoid duplicate checks,  a - b / b - a
                    let dist    = getDistance(circles[a], circles[b]);
                    let chance = dist/maxLengthCharge;
                    if (chance > Math.random()) continue;

                    let stepsCount = dist / stepLength;
                    let sx         = circles[a].x;
                    let sy         = circles[a].y;
                    let colorChange = chance * 255;

                    ctx.lineWidth = 2;
                    ctx.strokeStyle = `rgba(255, ${colorChange}, ${colorChange})`;
                    //ctx.strokeStyle = 'white';
                    ctx.beginPath();
                    ctx.moveTo(circles[a].x, circles[a].y);
                    for (let j = stepsCount; j > 1; j--) {
                        let pathLength = getDistance(circles[a], {x : sx, y : sy});
                        let offset     = Math.sin(pathLength / dist * Math.PI) * maxOffset;

                        sx += (circles[b].x - sx) / j + Math.random() * offset * 2 - offset;
                        sy += (circles[b].y - sy) / j + Math.random() * offset * 2 - offset;
                        ctx.lineTo(sx, sy);
                    }
                    ctx.stroke();
                }
            }
        }

        function getDistance(a, b) {
            return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        }

        canvas.onmousemove = e => {
            mx = e.x - canvas.getBoundingClientRect().x;
            my = e.y - canvas.getBoundingClientRect().y;
        };

        window.onkeydown = () => {
            toggle = circles.length - 1 ? toggle = 0 : toggle ++;
        };


        function init () {
            canvas.style.background = canvasColor;
            document.querySelector('body').appendChild(canvas);

            for (let i = 0; i < circleCount; i++) {
                circles.push(new Circle());
            }
        }

        function loop () {
            ctx.clearRect(0, 0, width, height);

            circles.map(i => { i == circles[toggle] ? i.drawCircle(mx, my) : i.drawCircle() });

            createLightning();

            requestAnimationFrame(loop);
        }

        init();
        loop();

    //     particles = [],                                 // vs particles
    //     properties = {                                  //assotiative array properties od particles
    //         bgColor         : '#232332',    //color of background
    //         particleColor   : /*'rgba(255, 40, 40, 1)'*/ 'rgba(144, 17, 226, 1)',
    //         particleRadius  : 4,
    //         particleCount   : 100,
    //         particleMaxVelosity : 2,
    //         lineLength          : 150,
    //         particleLife        : 6
    // };
    //
    // document.querySelector('body').appendChild(canvas); //dinamcally change canvas size
    // window.onresize = () => {
    //     width = canvas.width = innerWidth;
    //     height = canvas.height = innerHeight;
    // };
    //
    // class Particle {
    //     constructor() {
    //         this.x = Math.random()*width;         //placement of particles depending on width
    //         this.y = Math.random()*height;        //placement of particles depending on height
    //         this.velosityX = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
    //         this.velosityY = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
    //         this.life = Math.random()*particles.particleLife*60;
    //
    //     }
    //
    //     positon() {                              //method that refreshes position
    //         this.x + this.velosityX > width && this.velosityX > 0 || this.x + this.velosityX < 0 && this.velosityX < 0 ? this.velosityX*=-1 : this.velosityX;
    //         this.y + this.velosityY > height && this.velosityY > 0 || this.y + this.velosityY < 0 && this.velosityY < 0 ? this.velosityY*=-1 : this.velosityY;
    //         //this.x = this position in a moment
    //         //this.velosityX = this speed in a moment
    //         //change direction of particle if it tuches borders
    //         this.x += this.velosityX;
    //         this.y += this.velosityY;
    //     }
    //
    //     reDraw(){
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
    //         ctx.closePath();
    //         ctx.fillStyle = properties.particleColor;
    //         ctx.fill();
    //     }
    //
    //     reCalculateLife () {
    //         if (this.life < 1) {
    //             this.x = Math.random()*width;         //placement of particles depending on width
    //             this.y = Math.random()*height;        //placement of particles depending on height
    //             this.velosityX = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
    //             this.velosityY = Math.random()*(properties.particleMaxVelosity*2)-properties.particleMaxVelosity;
    //             this.life = Math.random()*particles.particleLife*60;
    //         }
    //         this.life --;
    //     }
    // }
    //
    // function redrawBackground() {
    //     ctx.fillStyle = properties.bgColor;
    //     ctx.fillRect(0, 0, width, height);
    // }
    //
    // function drawLines() {
    //     let x1, y1, x2, y2, length, opacity, pulse;
    //     for (let i in particles) {
    //         for (let j in particles){   //variables in this function takes positions
    //             x1 = particles[i].x;
    //             y1 = particles[i].y;
    //             x2 = particles[j].x;
    //             y2 = particles[j].y;
    //             length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    //             pulse = (Math.random()).toFixed(2);
    //
    //             if (length < properties.lineLength) {
    //                 opacity = 1 - length/properties.lineLength; //the less length the less opacity
    //                 // ctx.lineWidth = '0,5';
    //                 ctx.lineWidth = pulse;
    //                 ctx.strokeStyle = 'rgba(144, 17, 226, '+opacity+')';
    //                 //ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
    //                 ctx.beginPath();
    //                 ctx.moveTo(x1, y1);
    //                 ctx.lineTo(x2, y2);
    //                 ctx.closePath();
    //                 ctx.stroke();
    //             }
    //         }
    //     }
    // }
    //
    // function redrawParticles(){
    //     for (let i in particles) {
    //         particles[i].reCalculateLife();
    //         particles[i].positon();
    //         particles[i].reDraw();
    //     }
    // }
    //
    // function loop() {                               //recursive function
    //     redrawBackground();
    //     redrawParticles();
    //     drawLines();
    //     requestAnimationFrame(loop);                // calls function 60 times / second
    // }
    //
    // function init () {
    //     for (let i = 0; i <= properties.particleCount; i++) {
    //         particles.push(new Particle);
    //     }
    //
    //     loop ();
    // }
    //
    // init();

}());

