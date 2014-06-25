var Cylon = require('cylon');
var arDrone = require('ar-drone');

var Cylon = require('cylon');

    Cylon.api({
        host: '192.168.1.2',
        port: '7000',
        ssl:   false
    });

    Cylon.robot({
        name: 'everything_is_awesome',
        connections: [
            { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' },
            { name: 'pebble', adaptor: 'pebble' }
        ],
        devices: [
            { name: 'drone', driver: 'ardrone' },
            { name: 'pebble', driver: 'pebble' }
        ],
        work: function(my) {
            my.pebble.pending_message("Starting Drone Awesomeness");
            my.pebble.on('button', function(data) { 
                console.log("Button pushed: " + data);
                if(data.localeCompare('up')===0) {
                    my.drone.animateLeds('blinkGreenRed');
                    my.drone.takeoff();
                    return;
                }
                my.drone.animateLeds('fire', 5, 2);
                my.drone.land();
                my.drone.stop();
                return;
            });

            my.pebble.on('tap', function() {
                console.log("Tap event detected");
            });
        }
    }).start();


