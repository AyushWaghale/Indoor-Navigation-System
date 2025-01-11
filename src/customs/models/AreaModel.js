class MapArea {
    constructor(id, name, colour, areaPoints, destinations) {
        this.id = id;
        this.name = name;
        this.colour = colour;
        this.areaPoints = areaPoints;  // Array of LatLng objects
        this.destinations = destinations;  // Array of DestinationModel objects
    }

    // Convert MapArea to a plain object
    toMap() {
        return {
            id: this.id,
            name: this.name,
            colour: this.colour,
            areaPoints: this.areaPoints.map(point => point.toMap()),  // Assuming LatLng has a toMap method
            destinations: this.destinations.map(destination => destination.toMap())  // Convert each destination to a plain object
        };
    }

    // Create a MapArea instance from a plain object
    static fromMap(map) {
        return new MapArea(
            map.id,
            map.name,
            map.colour,
            map.areaPoints.map(point => LatLng.fromMap(point)),  // Assuming LatLng has a fromMap method
            map.destinations.map(destination => DestinationModel.fromMap(destination))  // Convert each destination from a plain object
        );
    }
}

module.exports = MapArea;