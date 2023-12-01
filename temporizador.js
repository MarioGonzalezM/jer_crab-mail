
tiempoJuego;
tiempoTranscurrido;
texto;


//EN LA FUNCION CREATE
this.tiempoJuego = 180; //tiempo de partida en segundos
this.tiempoTranscurrido = 0;   
//Crea un evento que se ejecutará cada segundo
this.time.addEvent({
    delay: 100,
    callback: function () {
        if (this.tiempoTranscurrido >= this.tiempoJuego) {
            this.texto.setText('Tiempo Restante: 0:00');
            //final del juego
        } else {
            var minuto = Math.floor((this.tiempoJuego - this.tiempoTranscurrido) / 60);
            var segundo = this.tiempoJuego - 60 * minuto - this.tiempoTranscurrido;
            var cero = (segundo >= 10) ? '' : '0';
            this.texto.setText('Tiempo Restante: ' + minuto + ":" + cero + segundo);
            this.tiempoTranscurrido += 1;
        }
    },
    callbackScope: this,
    loop: true 
});

this.texto = this.add.text(16, 16, 'Tiempo Restante: 3:00', { fontSize: '67px', fill: '#fff' });