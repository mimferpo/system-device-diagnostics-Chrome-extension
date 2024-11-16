document.getElementById("saveDataBtn").addEventListener("click", function () {
    console.log("Saving data as a .txt file...");
    saveDeviceDataAsText();
});

function saveDeviceDataAsText() {
    try {
        // Fetch the device info as a text string asynchronously
        fetchDeviceInfo().then(deviceInfoText => {
            // Create a Blob with the text content
            const blob = new Blob([deviceInfoText], { type: "text/plain" });

            // Create a link element to simulate downloading the Blob
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "deviceInfo.txt"; // Set the default file name

            // Append the link to the document, click it, and remove it afterward
            document.body.appendChild(link);  // Add the link to the body (important for Firefox)
            link.click();
            document.body.removeChild(link); // Clean up

            console.log("File saved successfully!");
        }).catch(error => {
            console.error("Error fetching device info: ", error);
        });
    } catch (error) {
        console.error("Error saving the file: ", error);
    }
}

async function fetchDeviceInfo() {
    // Collect device information and format it as text
    const data = {
        browser: navigator.userAgent,
        network: {
            downlink: navigator.connection ? navigator.connection.downlink : "N/A",
            effectiveType: navigator.connection ? navigator.connection.effectiveType : "N/A",
            rtt: navigator.connection ? navigator.connection.rtt : "N/A",
            saveData: navigator.connection ? navigator.connection.saveData : false
        },
        location: await getGeolocation(),  // Fetch geolocation data asynchronously
        hardware: {
            cpuCores: navigator.hardwareConcurrency || "N/A",
            battery: await getBatteryInfo()  // Fetch battery info asynchronously
        },
        ipInfo: await getIpInfo(),  // Fetch IP info asynchronously
        screen: {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            screenResolution: window.devicePixelRatio,
            availableWidth: screen.availWidth,
            availableHeight: screen.availHeight
        },
        os: {
            platform: navigator.platform,
            userAgent: navigator.userAgent
        },
        memory: navigator.deviceMemory || "N/A",
        connectionType: navigator.connection ? navigator.connection.effectiveType : "N/A",
        touchscreen: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        localStorageAvailable: typeof window.localStorage !== "undefined",
        cookiesEnabled: navigator.cookieEnabled
    };

    let deviceInfoText = `Device Information\n------------------\n`;
    deviceInfoText += `Browser: ${data.browser}\n`;
    deviceInfoText += `Connection Type: ${data.connectionType}\n`;
    deviceInfoText += `Touchscreen: ${data.touchscreen ? 'Yes' : 'No'}\n`;
    deviceInfoText += `Memory: ${data.memory} GB\n\n`;

    deviceInfoText += `Network Info\n------------------\n`;
    deviceInfoText += `Network Speed: ${data.network.downlink} Mbps\n`;
    deviceInfoText += `Effective Connection Type: ${data.network.effectiveType}\n`;
    deviceInfoText += `Round Trip Time: ${data.network.rtt} ms\n`;
    deviceInfoText += `Save Data Mode: ${data.network.saveData ? 'Enabled' : 'Disabled'}\n\n`;

    deviceInfoText += `IP & Location Information\n------------------\n`;
    deviceInfoText += `IP Address: ${data.ipInfo.ip || "N/A"}\n`;
    deviceInfoText += `Country: ${data.ipInfo.country || "N/A"}\n`;
    deviceInfoText += `Region: ${data.ipInfo.region || "N/A"}\n`;
    deviceInfoText += `City: ${data.ipInfo.city || "N/A"}\n`;
    deviceInfoText += `ISP: ${data.ipInfo.isp || "N/A"}\n`;
    deviceInfoText += `Location: ${data.ipInfo.loc || "N/A"}\n`;
    deviceInfoText += `Timezone: ${data.ipInfo.timezone || "N/A"}\n\n`;

    deviceInfoText += `Geolocation\n------------------\n`;
    deviceInfoText += `Latitude: ${data.location.latitude || "N/A"}\n`;
    deviceInfoText += `Longitude: ${data.location.longitude || "N/A"}\n`;
    deviceInfoText += `Accuracy: ${data.location.accuracy || "N/A"}\n\n`;

    deviceInfoText += `Hardware Information\n------------------\n`;
    deviceInfoText += `CPU Cores: ${data.hardware.cpuCores}\n`;
    deviceInfoText += `Battery Level: ${data.hardware.battery.level || "N/A"}\n`;
    deviceInfoText += `Battery Charging: ${data.hardware.battery.charging || "N/A"}\n\n`;

    deviceInfoText += `Screen Information\n------------------\n`;
    deviceInfoText += `Screen Width: ${data.screen.screenWidth}px\n`;
    deviceInfoText += `Screen Height: ${data.screen.screenHeight}px\n`;
    deviceInfoText += `Device Pixel Ratio: ${data.screen.screenResolution}\n`;
    deviceInfoText += `Available Screen Width: ${data.screen.availableWidth}px\n`;
    deviceInfoText += `Available Screen Height: ${data.screen.availableHeight}px\n\n`;

    deviceInfoText += `Operating System\n------------------\n`;
    deviceInfoText += `Platform: ${data.os.platform}\n`;
    deviceInfoText += `User Agent: ${data.os.userAgent}\n\n`;

    deviceInfoText += `Storage and Cookies\n------------------\n`;
    deviceInfoText += `Local Storage Available: ${data.localStorageAvailable ? 'Yes' : 'No'}\n`;
    deviceInfoText += `Cookies Enabled: ${data.cookiesEnabled ? 'Yes' : 'No'}\n`;

    return deviceInfoText;
}

function getGeolocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                }),
                () => resolve({})  // Fallback if geolocation is not available
            );
        } else {
            resolve({});  // If geolocation is not supported
        }
    });
}

function getBatteryInfo() {
    return new Promise((resolve, reject) => {
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                resolve({
                    level: battery.level,
                    charging: battery.charging
                });
            });
        } else {
            resolve({});  // Fallback if battery info is not available
        }
    });
}

function getIpInfo() {
    return new Promise((resolve, reject) => {
        // Using a free API to fetch IP-related info
        fetch('https://ipinfo.io/json?token=YOUR_API_TOKEN')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(() => resolve({}));  // Fallback in case of an error
    });
}
