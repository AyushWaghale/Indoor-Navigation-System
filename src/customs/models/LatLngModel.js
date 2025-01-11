class LatLng {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Convert LatLng instance to a plain object
    toMap() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    // Create a LatLng instance from a plain object
    static fromMap(map) {
        return new LatLng(
            map.latitude,
            map.longitude
        );
    }
}

module.exports = LatLng;