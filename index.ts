import * as fs from 'fs';

const FILE_NAME = 'myfile.json';
const TIME = Date.now();

interface Datum {
    count: number;
    startTime: number;
    runTime: number;
}

function ensureDataFile() {
    if (fs.existsSync(FILE_NAME)) {
      return;
    } else {
      fs.appendFileSync(FILE_NAME, `{ "count": 0, "startTime": ${TIME}, "runTime": 0 }`);
    }
}

function getDatum(): Datum {
    ensureDataFile();
    const fileContents = fs.readFileSync(FILE_NAME);
    const fileContentsStr = fileContents.toString();
    const datum = JSON.parse(fileContentsStr) as Datum;
    return datum;
}

function incrementCount(): number {
    const datum = getDatum();
    const newCount = datum.count + 1;
    
    console.log(datum.startTime);
    const newRunTime = TIME - datum.startTime;

    const newDataStr = JSON.stringify({ count: newCount, startTime: datum.startTime, runTime: newRunTime });
    fs.writeFileSync(FILE_NAME, newDataStr);
    return newCount;
  }

function doWork() {
    console.log('Doing work');
    const count = incrementCount();
    if (count > 100) {
        throw new Error('done');
    }
}

doWork();
