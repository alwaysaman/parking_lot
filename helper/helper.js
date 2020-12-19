let parkingSize = null;
let fs = require('fs');

let parkArray = [];

let splitOnLine = (content) => {
    return content.split('\n');
}
let splitLine = (content) => {
    return content.split(" ");
}

let createParkingLot = (size) => {
    parkingSize = size;
    for (var i = 1; i<=parkingSize; i++) {
        parkArray.push([i])
    }
    // console.log(parkArray);
    console.log(`Created parking lot with ${size} slots`);
}

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
        // console.log(parkArray);
    }
}

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
    // console.log(parkArray);
}

let calculateCharge = (hrs) => {
    return 10 + ((hrs-2)*10);
}

let getStatus = () => {
    console.log("Slot No.    Registration No.")    
    for (let i=0; i<parkArray.length; i++){
        if (parkArray[i].length > 1){
            console.log(parkArray[i][0] + "           " + parkArray[i][1]);
        }
    } 
}

exports.loadCommands = (contents) => {
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
        }
    }
}