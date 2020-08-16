const readline = require('readline')
const LED = require('./leds')

const leds = new LED()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const questionAsync = async (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

const setCount = async () => {
  const response = await questionAsync('Enter a count: ')
  const count = parseInt(response, 10)

  if (count && count != NaN && count >= 0) {
    leds.initialize(count)
  }
}

const performSync = () => {
  leds.sync()
}

const performClear = () => {
  leds.clear()
}

const performOff = () => {
  leds.off()
}

const performAll = async () => {
  const redResponse = questionAsync('Enter Red: ')
  const greenResponse = questionAsync('Enter Green: ')
  const blueResponse = questionAsync('Enter Blue: ')

  const red = parseInt(redResponse, 10)
  const green = parseInt(greenResponse, 10)
  const blue = parseInt(blueResponse, 10)

  if (red && red != NaN && red >= 0 && red <= 255 &&
    blue && blue != NaN && blue >= 0 && blue <= 255 &&
    green && green != NaN && green >= 0 && green <= 255) {
    leds.all(red, green, blue, 1)
  }
}

const printStatus = () => {
  rl.write(`LED count: ${leds.count}\n\n`)
}

const printMenu = async () => {
  printStatus()

  rl.write('Select an option:\n')
  rl.write('A. Set colour\n')
  rl.write('C. Clear\n')
  rl.write('N. Set count\n')
  rl.write('O. Turn off\n')
  rl.write('S. Sync\n')
  rl.write('Q. Quit\n\n')
}

const start = async () => {
  let choice = ''

  do {

    printStatus()

    printMenu()

    choice = await questionAsync('> ')

    switch (choice) {
      case 'a':
      case 'A':
        await performAll()
        break
      case 's':
      case 'S':
        performSync()
        break
      case 'o':
      case 'O':
        performOff()
        break
      case 'c':
      case 'C':
        performClear()
        break
      case 'n':
      case 'N':
        await setCount()
        break
      case 'q':
      case 'Q':
        rl.close()
        return
    }

  } while (choice !== 'q')
}

start()