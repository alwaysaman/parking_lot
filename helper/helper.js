let parkingSize = null;

let parkArray = [];
/**
 * @method splitOnLine
 * @param content
 * @description returns array of items separated by a new line character in String.
 */

let splitOnLine = (content) => {
    return content.split('\n');
}

/**
 * @method splitLine
 * @param {*} content 
 * @description returns array of items separated by space in String.
 */
let splitLine = (content) => {
    return content.split(" ");
}

/**
 * @method createParkingLot
 * @param {*} size 
 * @description It creates parking lot based on size created at create_parking_lot command
 */

let createParkingLot = (size) => {
    parkingSize = size;
    for (var i = 1; i<=parkingSize; i++) {
        parkArray.push([i])
    }
    console.log(`Created parking lot with ${size} slots`);
}

/**
 * @method parkVehicle
 * @param {*} regNumber
 * @description Inserts a new Vehicle in parking lot array. 
 */

let parkVehicle = (regNumber) => {
    if (parkingSize == null) {
        console.error("Parking not created");
        process.exit();
    } else if(parkingSize == 0){
        console.log("Sorry, parking lot is full");
    } else {
        for (let i=0; i<parkArray.length; i++){
            if (parkArray[i].length === 1){
                parkArray[i].push(regNumber);
                console.log("Allocated slot number: " + parkArray[i][0]);
                parkingSize--;
                break;
            }
        }
    }
}

/**
 * @method leaveVehicle
 * @param {*} regNumber 
 * @param {*} hours 
 * @description Removes a vehicle from parking lot
 */
let leaveVehicle = (regNumber, hours) => {
    let charge=calculateCharge(hours);

    if (parkingSize == null){
        console.log("Parking is not created")
    } else {
        for (let i =0; i<parkArray.length; i++){
            if (regNumber === parkArray[i][1]){
                parkArray[i].splice(1,1);
                parkingSize++;
                console.log(`Registration number ${regNumber} with Slot Number ${parkArray[i][0]} is free with Charge ${charge}`);
                break;
            }
        }
    }
}

/**
 * @method calculateCharge
 * @param {*} hrs 
 * @description Returns the amount to be paid at parking counter.
 *              1st 2 hours = 10$
 *              every subsequent hour additional 10$/hour
 */
let calculateCharge = (hrs) => {
    return 10 + ((hrs-2)*10);
}

/**
 * @method getStatus
 * @description Prints the status of parking lot. Displays the empty spots.
 */
let getStatus = () => {
    console.log("Slot No.    Registration No.")    
    for (let i=0; i<parkArray.length; i++){
        if (parkArray[i].length > 1){
            console.log(parkArray[i][0] + "           " + parkArray[i][1]);
        }
    } 
}

/**
 * @method loadCommands
 * @param {*} contents 
 * @description This loads the commands from input file.
 */
let loadCommands = (contents) => {
    let splitOnLineContent = splitOnLine(contents);
    for (let i = 0; i < splitOnLineContent.length; i++){
        let splitInLine = splitLine(splitOnLineContent[i]);
        switch (splitInLine[0]){
            case 'create_parking_lot':
                createParkingLot(splitInLine[1])
                break;
            case 'status': 
                getStatus();
                break;
            case 'park':
                parkVehicle(splitInLine[1]);
                break;
            case 'leave':
                leaveVehicle(splitInLine[1], splitInLine[2]);
                break;
            default :
                console.log("The command entered is not valid hence skipping the command.");
        }
    }
}

module.exports = {
    loadCommands,
    calculateCharge,
    leaveVehicle,
    parkVehicle,
    createParkingLot,
    splitOnLine,
    splitLine,
    getStatus
}