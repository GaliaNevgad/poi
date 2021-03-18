const words = ['mathematic', 'computer', 'scanner']

function firstLetter(array) {
    array[0].substr(1,1)
    const letter = String.fromCharCode(array[0].substr(1,1).charCodeAt(0) + 1)
    return letter !== 'z' ? letter : 'a'
}

function secondLetter(array) {
    const letter = String.fromCharCode(array[1].substr(-2, 1).charCodeAt(0) - 1)
    return letter !== 'a' ? letter : 'z'
}

function thirdLetter(array) {
    const length = Math.round(array[2].length / 2)
    const middle = array[2].substr(length, 1).charCodeAt(0)
    const letterAfter = String.fromCharCode(middle + 1)
    const letterBefore = String.fromCharCode(middle - 1)

    if (length / 2) {
        return middle !== 'a' ? letterBefore : 'z'
    } else return middle !== 'a' ? letterAfter : 'z'
}

function forthLetter(array) {
    const sum = array[0].length + array[2].length
    const remainder = Math.round(sum / 26)

    return sum > 26 ? String.fromCharCode(96 + remainder) : String.fromCharCode(96 + sum)
}

const result = `${firstLetter(words)}${secondLetter(words)}${thirdLetter(words)}${forthLetter(words)}`
console.log(result)

const askPassword = (callback) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.stdoutMuted = true;

    readline.question('Password: ', pwd => {
        callback(pwd, () => readline.close())
    })

    readline._writeToOutput = (stringToWrite) => {
        if (readline.stdoutMuted)
            readline.output.write("*");
        else
            readline.output.write(stringToWrite);
    };
}

// indirect callback recursion ))0))
const checkPassword = () => {
    const check = (password, close) => {
        if (password === result) {
            console.log('\nWelcome')
            close()
        } else {
            console.log("\nFail")
            close()
            askPassword(check)
        }
    }

    askPassword(check);
}

checkPassword()

