new Vue({
    el: '#pomodoro',
    data: {
        timeTxt: '25:00',
        time: 25 * 60,
        counterTime: 25 * 60,
        messageButtom: 'Go',
        timer: false,
        width: 324,
        height: 324,
        finish: false
    },
    methods: {
        startAndStop : function (event) {
            if(!this.timer) {
                this.start();
            }
            else {
                this.stop('Go');
                this.timeTxt = '25:00';
            }
        },

        start : function () {
            this.timer = setInterval(() => {
                this.time--;
                if(this.time >= 0) {
                    var min = Math.floor(this.time / 60),
                        sec = (this.time - min * 60);
                    this.timeTxt = min + ':' + (sec < 10 ? '0' : '') + sec;
                    this.drawCircle(Math.round(100 - (100 * this.time / this.counterTime)));
                }
                else {
                    this.stop("C'est l'heure de la pause");
                    this.finish = true;
                }
            }, 1000);

            this.messageButtom = 'Stop';
        },

        stop : function (message) {
            clearInterval(this.timer);
            this.drawCircle(false);
            this.timer = false;
            this.time = this.counterTime;
            this.messageButtom = message;
        },

        drawCircle : function (percent) {
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;

            var circle = document.getElementById('circle').getContext('2d');

            circle.clearRect(0, 0, this.width, this.height);
            if(!percent) return;
            
            circle.beginPath();
            circle.strokeStyle = '#5e2339';
            circle.lineCap = 'square';
            circle.closePath();
            circle.fill();
            circle.lineWidth = 2.0;
            circle.arc(this.width/2, this.height/2, this.width/2 - 2, - (quart), ((circ) * (percent/100)) - quart, false);
            circle.stroke();
        }
    }
});