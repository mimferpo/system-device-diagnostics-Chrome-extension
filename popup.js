document.getElementById("getDataBtn").addEventListener("click", function () {
    console.log("Button clicked, fetching data...");
    fetchDeviceData();
});

function fetchDeviceData() {
    console.log("Fetching device data...");

    const deviceInfo = {
        browser: navigator.userAgent,
        network: {
            downlink: navigator.connection ? navigator.connection.downlink : "N/A",
            effectiveType: navigator.connection ? navigator.connection.effectiveType : "N/A",
            rtt: navigator.connection ? navigator.connection.rtt : "N/A",
            saveData: navigator.connection ? navigator.connection.saveData : false
        },
        location: {},
        hardware: {
            cpuCores: navigator.hardwareConcurrency || "N/A",
            battery: "N/A"
        },
        geolocation: {},
        ipInfo: {},
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

    console.log("Initial deviceInfo:", deviceInfo);

    // Fetch IP and Location Info from IPInfo API
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched IP data:", data);
            deviceInfo.ipInfo = {
                ip: data.ip,
                country: data.country,
                region: data.region,
                city: data.city,
                isp: data.org,
                loc: data.loc,
                timezone: data.timezone
            };
            updatePopup(deviceInfo);
        })
        .catch(err => {
            console.error("Error fetching IP info: ", err);
            deviceInfo.ipInfo = { error: "Unable to fetch IP info." };
            updatePopup(deviceInfo);
        });

    // Get Geolocation Data
    if (navigator.geolocation) {
        console.log("Fetching geolocation...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Fetched geolocation data:", position);
                deviceInfo.geolocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                updatePopup(deviceInfo);
            },
            (error) => {
                console.error("Geolocation error:", error);
                deviceInfo.geolocation = { error: "Unable to fetch geolocation data." };
                updatePopup(deviceInfo);
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        deviceInfo.geolocation = { error: "Geolocation not supported" };
        updatePopup(deviceInfo);
    }

    // Get Battery Status
    if (navigator.getBattery) {
        console.log("Fetching battery status...");
        navigator.getBattery().then(function (battery) {
            console.log("Fetched battery status:", battery);
            deviceInfo.hardware.battery = {
                level: battery.level * 100 + "%",
                charging: battery.charging ? "Yes" : "No",
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
            updatePopup(deviceInfo);
        }).catch(err => {
            console.error("Battery API error: ", err);
            deviceInfo.hardware.battery = { error: "Unable to fetch battery info." };
            updatePopup(deviceInfo);
        });
    }

    // If all data is collected (and in case some data is unavailable), update the popup
    setTimeout(() => updatePopup(deviceInfo), 500); // Delay to ensure final updates.
}

function updatePopup(data) {
    console.log("Updating popup with data:", data);  // Debug: check if data is ready

    let outputHTML = `
        <div class="section">
            <h2>Device Information</h2>
            <ul>
                <li><strong>Browser:</strong> ${data.browser}</li>
                <li><strong>Connection Type:</strong> ${data.connectionType}</li>
                <li><strong>Touchscreen:</strong> ${data.touchscreen ? 'Yes' : 'No'}</li>
                <li><strong>Memory:</strong> ${data.memory} GB</li>
            </ul>
        </div>
        <div class="section">
            <h2>Network Info</h2>
            <ul>
                <li><strong>Network Speed:</strong> ${data.network.downlink} Mbps</li>
                <li><strong>Effective Connection Type:</strong> ${data.network.effectiveType}</li>
                <li><strong>Round Trip Time:</strong> ${data.network.rtt} ms</li>
                <li><strong>Save Data Mode:</strong> ${data.network.saveData ? 'Enabled' : 'Disabled'}</li>
            </ul>
        </div>
        <div class="section">
            <h2>IP & Location Information</h2>
            <ul>
                <li><strong>IP Address:</strong> ${data.ipInfo.ip || "N/A"}</li>
                <li><strong>Country:</strong> ${data.ipInfo.country || "N/A"}</li>
                <li><strong>Region:</strong> ${data.ipInfo.region || "N/A"}</li>
                <li><strong>City:</strong> ${data.ipInfo.city || "N/A"}</li>
                <li><strong>ISP:</strong> ${data.ipInfo.isp || "N/A"}</li>
                <li><strong>Location:</strong> ${data.ipInfo.loc || "N/A"}</li>
                <li><strong>Timezone:</strong> ${data.ipInfo.timezone || "N/A"}</li>
            </ul>
        </div>
        <div class="section">
            <h2>Geolocation</h2>
            <ul>
                <li><strong>Latitude:</strong> ${data.geolocation.latitude || "N/A"}</li>
                <li><strong>Longitude:</strong> ${data.geolocation.longitude || "N/A"}</li>
                <li><strong>Accuracy:</strong> ${data.geolocation.accuracy || "N/A"}</li>
                <li><strong>Error:</strong> ${data.geolocation.error || "N/A"}</li>
            </ul>
        </div>
        <div class="section">
            <h2>Hardware Information</h2>
            <ul>
                <li><strong>CPU Cores:</strong> ${data.hardware.cpuCores}</li>
                <li><strong>Battery Level:</strong> ${data.hardware.battery.level || "N/A"}</li>
                <li><strong>Battery Charging:</strong> ${data.hardware.battery.charging || "N/A"}</li>
            </ul>
        </div>
        <div class="section">
            <h2>Screen Information</h2>
            <ul>
                <li><strong>Screen Width:</strong> ${data.screen.screenWidth}px</li>
                <li><strong>Screen Height:</strong> ${data.screen.screenHeight}px</li>
                <li><strong>Device Pixel Ratio:</strong> ${data.screen.screenResolution}</li>
                <li><strong>Available Screen Width:</strong> ${data.screen.availableWidth}px</li>
                <li><strong>Available Screen Height:</strong> ${data.screen.availableHeight}px</li>
            </ul>
        </div>
        <div class="section">
            <h2>Operating System</h2>
            <ul>
                <li><strong>Platform:</strong> ${data.os.platform}</li>
                <li><strong>User Agent:</strong> ${data.os.userAgent}</li>
            </ul>
        </div>
        <div class="section">
            <h2>Storage and Cookies</h2>
            <ul>
                <li><strong>Local Storage Available:</strong> ${data.localStorageAvailable ? 'Yes' : 'No'}</li>
                <li><strong>Cookies Enabled:</strong> ${data.cookiesEnabled ? 'Yes' : 'No'}</li>
            </ul>
        </div>
    `;
    document.getElementById("device-info").innerHTML = outputHTML;
} 
    