const launches = require('./launches.schema');
const planets = require('./planets.schema');

//const launches = new Map();
const defaultFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 5, 2030'),
    target: "Kepler-442 b",
    upcoming: true,
    success: true,
}
saveLaunch(launch);

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true,
    });
}

async function existsLaunchWithId(launchId) {
    return await launches.findOne({
        flightNumber: launchId
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return defaultFlightNumber;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launches.find({}, { '_id': 0, '__v': 0 });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        customers: ["Zero To Mastery", "NASA"],
        upcoming: true,
        success: true,
    });
    await saveLaunch(newLaunch);
}

function addNewLaunch(launch) {
    defaultFlightNumber++;
    launches.set(defaultFlightNumber, Object.assign(launch, {
        flightNumber: defaultFlightNumber,
        customers: ["Zero To Mastery", "NASA"],
        upcoming: true,
        success: true,
    }));
}

async function abortLaunchById(launchId) {
    const aborted = await launches.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    scheduleNewLaunch,
    abortLaunchById,
}