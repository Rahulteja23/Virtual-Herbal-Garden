// =========================================================================
// YOUR MODEL URL IS PASTED HERE
// =========================================================================
const URL = "https://teachablemachine.withgoogle.com/models/vRk-m8WQb/";
// =========================================================================

const video = document.getElementById('video');
const plantName = document.getElementById('plant-name');
const statusDiv = document.getElementById('status');

let model, maxPredictions;

/**
 * Loads the Teachable Machine model you trained.
 */
async function loadModel() {
    console.log("Loading model...");
    statusDiv.innerText = "Loading Custom Model... Please Wait.";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        // tmImage is a global object from the @teachablemachine/image library
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        
        console.log("Model loaded successfully!");
        statusDiv.style.display = 'none'; // Hide the status message

        // Start the prediction loop to analyze the video stream
        window.requestAnimationFrame(predictionLoop);

    } catch (err) {
        console.error("Error loading model: ", err);
        statusDiv.innerText = "Error: Could not load the custom model.";
    }
}

/**
 * This function runs in a loop to continuously get predictions from the video feed.
 */
async function predictionLoop() {
    // This is the core prediction logic
    // It takes our existing <video> element and analyzes the current frame
    const predictions = await model.predict(video);

    // Find the prediction with the highest probability
    let bestPrediction = null;
    let highestProbability = 0;

    for (let i = 0; i < maxPredictions; i++) {
        if (predictions[i].probability > highestProbability) {
            highestProbability = predictions[i].probability;
            bestPrediction = predictions[i];
        }
    }

    // Display the best result if its confidence is above a threshold (e.g., 75%)
    if (bestPrediction && bestPrediction.probability > 0.75) {
         const probability = (bestPrediction.probability * 100).toFixed(2);
         plantName.textContent = `${bestPrediction.className} (Confidence: ${probability}%)`;
    } else {
        // If nothing is detected with high confidence, show a default message
        plantName.textContent = "Show a leaf to the camera...";
    }

    // Call this function again on the next animation frame to create a continuous loop
    window.requestAnimationFrame(predictionLoop);
}

/**
 * This is the main function that starts everything.
 * It sets up the camera first, and then loads the model.
 */
async function start() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        // The 'loadeddata' event ensures we don't try to load the model
        // until the video stream is actually ready.
        video.addEventListener('loadeddata', loadModel);
    } catch (err) {
        console.error("Error accessing the camera: ", err);
        alert("Could not access the camera. Please ensure you have given permission.");
    }
}

// Start the application when the page loads
window.addEventListener('load', start);