const {LatLng} = require("./LatLngModel");
class DestinationModel {
    constructor(id, name, color, areaPoints , doorPoint) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.areaPoints = areaPoints;  // Array of LatLng objects
        this.doorPoint = doorPoint;  // LatLng object
    }
    // Convert DestinationModel instance to a plain object
    toMap() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            areaPoints: this.areaPoints.map(point => point.toMap()),  // Assuming LatLng has a toMap method
            doorPoint: this.doorPoint.toMap()  // Assuming LatLng has a toMap method
        };
    }

    // Create a DestinationModel instance from a plain object
    static fromMap(map) {
        return new DestinationModel(
            map.id,
            map.name,
            map.color,
            map.areaPoints.map(point => LatLng.fromMap(point)),  // Assuming LatLng has a fromMap method
            LatLng.fromMap(map.doorPoint)  // Assuming LatLng has a fromMap method
        );
    }
}

module.exports = DestinationModel;