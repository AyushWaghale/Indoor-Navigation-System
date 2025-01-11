const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

function sendData(context) {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBlh28lGU4AT8Yd6k6hnxyhNjnjC2BlYv8",
        authDomain: "indoor-navigation-2c57a.firebaseapp.com",
        projectId: "indoor-navigation-2c57a",
        storageBucket: "indoor-navigation-2c57a.appspot.com",
        messagingSenderId: "296194414930",
        appId: "1:296194414930:web:d51356d0327843dc52828b",
        measurementId: "G-Z0DEJR91K1",
        databaseURL: "https://indoor-navigation-2c57a-default-rtdb.firebaseio.com/",
    };

    // Initialize Firebase
    console.log('Initializing Firebase with config:', firebaseConfig);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app); // Realtime Database reference
    console.log("Firebase connected successfully.");

    // Handle D3 event, if available
    if (d3.event) {
        d3.event.preventDefault();
    } else {
        console.warn("No d3.event detected.");
    }

    // Verify context and data
    console.log('Context:', context);
    if (!context.data) {
        console.error("Context does not contain 'data'.");
        return;
    }

    const content = context.data.get('map');
    const meta = context.data.get('meta');

    // Log content and meta for debugging
    console.log('Map Content:', content);
    console.log('Meta Data:', meta);

    if (!content) {
        console.error("No map content available.");
        return;
    }

    // Parse the content into GeoJSON
    let geoJSON;
    try {
        geoJSON = JSON.parse(JSON.stringify(content));
    } catch (error) {
        console.error("Error parsing content as GeoJSON:", error);
        return;
    }

    // Validate GeoJSON structure
    if (!geoJSON || !geoJSON.features || geoJSON.features.length === 0) {
        console.error("Invalid GeoJSON data:", geoJSON);
        return;
    }

    // Extract coordinates from GeoJSON
    const coordinates = [];
    geoJSON.features.forEach((feature, featureIndex) => {
        if (feature.geometry && feature.geometry.coordinates) {
            feature.geometry.coordinates.forEach((coord, coordIndex) => {
                const lat = coord[1];  // latitude
                const long = coord[0]; // longitude
                coordinates.push({ lat, long }); // Store as an object
                console.log(`Feature ${featureIndex}, Coordinate ${coordIndex}:`, { lat, long });
            });
        } else {
            console.warn(`Feature ${featureIndex} has no valid geometry or coordinates.`);
        }
    });

    if (coordinates.length === 0) {
        console.error("No coordinates extracted from GeoJSON.");
        return;
    }

    // Log the coordinates for debugging
    console.log("Extracted Coordinates:", coordinates);

    // // Send data to Firebase
    // coordinates.forEach((coordinate, index) => {
    //     const coordRef = ref(db, `coordinates/coordinate${index}`); // Use template literals
    //     console.log('Saving coordinate:', coordinate, 'at path:', `coordinates/coordinate${index}`);
        
    //     set(coordRef, coordinate)
    //         .then(() => {
    //             console.log(`Coordinate ${index} saved successfully:`, coordinate);
    //         })
    //         .catch((error) => {
    //             console.error(`Error saving coordinate ${index}:`, error);
    //         });
    // });

    // const geoJsonData = {
    //     "type": "FeatureCollection",
    //     "features": [
    //       {
    //         "type": "Feature",
    //         "properties": {},
    //         "geometry": {
    //           "coordinates": [
    //             [78.59035686764764, 20.782832123832563],
    //             [78.58962883209784, 20.78269963028322]
    //           ],
    //           "type": "LineString"
    //         }
    //       },
    //       {
    //         "type": "Feature",
    //         "properties": {},
    //         "geometry": {
    //           "coordinates": [
    //             [78.59037733300062, 20.78294288735343],
    //             [78.58981922273182, 20.782877053684132]
    //           ],
    //           "type": "LineString"
    //         }
    //       }
    //     ]
    //   };
      
      // Reference to your database collection
      // Generate a unique placeId (e.g., using a timestamp or a random UID)
      geoJsonData.features.forEach((feature, featureIndex) => {
        const featurePath = `coordinates/${placeId}/features/feature${featureIndex}`;
        const featureRef = ref(db, featurePath);
      
        // Convert coordinates from GeoJSON to a usable format
        const coordinatesArray = feature.geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
      
        // Save feature metadata along with aggregated coordinates
        set(featureRef, {
          type: feature.geometry.type,
          coordinates: coordinatesArray  // Save the full list at once
        }).then(() => {
          console.log(`Feature ${featureIndex} saved with metadata.`);
        }).catch((error) => {
          console.error(`Error saving feature ${featureIndex}:`, error);
        });
      
        // Save each coordinate individually under 'coordinates' sub-node
        coordinatesArray.forEach((coordinate, coordIndex) => {
          const coordRef = ref(db, `${featurePath}/coordinates/coordinate${coordIndex}`);
      
          set(coordRef, coordinate)  // Use set() to overwrite any existing data
            .then(() => {
              console.log(`Coordinate ${featureIndex}-${coordIndex} saved:`, coordinate);
            })
            .catch((error) => {
              console.error(`Error saving coordinate ${featureIndex}-${coordIndex}:`, error);
            });
        });
      });
      
      
      
}

// Export the function
module.exports = sendData;
