const dotstar = require('dotstar')
const SPI = require('pi-spi')
const fs = require('fs')

const spiDevice = '/dev/spidev0.0'

class LED
{
    constructor() {
        this.ledStrip = null

        this.ledCount = 0
    }

    initialize(count) {
        if (fs.existsSync(spiDevice)) {
            var spi = SPI.initialize(spiDevice)
    
            this.ledStrip = new dotstar.Dotstar(spi, {
              length: count
            })
        }
        
        this.ledCount = count
    }

    get count() {
        return this.ledCount
    }

    off() {
        if (this.ledStrip != null) {
            this.ledStrip.off()
        }
    }

    sync() {
        if (this.ledStrip != null) {
            this.ledStrip.sync()
        }
    }

    clear() {
        if (this.ledStrip != null) {
            this.ledStrip.clear()
        }
    }

    all(red, green, blue, alpha) {
        if (this.ledStrip != null) {
            this.ledStrip.all(red, green, blue, alpha)
        }
    }
}

module.exports = LED
