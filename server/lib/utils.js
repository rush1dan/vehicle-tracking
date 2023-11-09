const processVehiclesListData = (vehicles_list) => {
    const vehicle_data = {};
    vehicles_list.forEach(vehicle => {
        vehicle_data[vehicle._id] = vehicle;
    });

    return vehicle_data;
}

const getRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
}

module.exports = {processVehiclesListData, getRandomInRange}