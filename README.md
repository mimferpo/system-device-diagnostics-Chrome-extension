# System Device Diagnostics Chrome Extension

A Chrome extension that retrieves and displays comprehensive device diagnostics, including system, network, geolocation, hardware, and more. Users can also export this information as a .txt file for further analysis or sharing.

## Features

- **Device Information**:
  - Browser details (user agent, platform)
  - Connection type (downlink, effectiveType, RTT, saveData mode)
  - Screen info (width, height, available width, device pixel ratio)
  - Hardware specs (CPU cores, memory, battery level, and status)
  - Operating system details (platform, user agent)
  - Storage and cookies availability
  - Touchscreen availability
- **Network Information**: Network speed, effective connection type, round-trip time (RTT)
- **Geolocation**: Latitude, longitude, accuracy, and IP-based location data
- **IP Information**: IP address, city, region, country, ISP, location, timezone
- **Export Data**: Users can export diagnostics as a .txt file.

## Installation

### Clone or Download

1. **Clone the repository** using Git:
   ```bash
   git clone https://github.com/mimferpo/system-device-diagnostics-Chrme-extension.git
   ```

2. **Or download the ZIP file** and extract it.

### Load Extension in Chrome

1. Open Chrome and navigate to the extensions page: `chrome://extensions/`
2. Enable **Developer Mode** by toggling the switch in the top-right corner.
3. Click on **Load unpacked** and select the folder where the repository was saved.
4. The extension will appear in your browser toolbar.

## Usage

### View Diagnostics Information

1. Click on the extension icon in your Chrome toolbar to open the popup.
2. The popup will display the following data:
   - **Device Info**: Browser, connection type, touchscreen, memory, etc.
   - **Network Info**: Downlink, effective connection type, RTT, save data mode.
   - **IP & Location Info**: IP address, country, city, region, ISP, and geolocation.
   - **Hardware Info**: CPU cores, battery level, and status.
   - **Screen Info**: Screen width, height, device pixel ratio, and available screen space.
   - **OS Info**: Platform, user agent.
   - **Storage & Cookies Info**: Local storage and cookies status.

### Export Data

To export the diagnostics data:
1. Click the **Save Data** button in the popup.
2. A `.txt` file will automatically download with all the diagnostics data.

### Example Output

Here's an example of the exported `.txt` file:

```
Device Information
------------------
Browser: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
Connection Type: 4g
Touchscreen: No
Memory: 8 GB

Network Info
------------------
Network Speed: 10 Mbps
Effective Connection Type: 4g
Round Trip Time: 50 ms
Save Data Mode: Disabled

IP & Location Information
------------------
IP Address: 192.168.1.1
Country: United States
Region: California
City: Los Angeles
ISP: Comcast
Location: 34.0522,-118.2437
Timezone: UTC-07:00

Geolocation
------------------
Latitude: 34.0522
Longitude: -118.2437
Accuracy: 10 meters

Hardware Information
------------------
CPU Cores: 8
Battery Level: 85%
Battery Charging: Yes

Screen Information
------------------
Screen Width: 1920px
Screen Height: 1080px
Device Pixel Ratio: 1.5
Available Screen Width: 1920px
Available Screen Height: 1000px

Operating System
------------------
Platform: Linux x86_64
User Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36

Storage and Cookies
------------------
Local Storage Available: Yes
Cookies Enabled: Yes
```

## Supported Browsers

- **Chrome** (latest version)

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch for your changes.
3. Commit your changes and ensure code consistency.
4. Submit a pull request with a detailed explanation of your changes.

### Code Style

Please follow the existing code style for consistency. Check the current code for formatting or syntax guidance.

### Reporting Issues

If you encounter a bug or have a feature request, please open an [issue](https://github.com/mimferpo/system-device-diagnostics-Chrme-extension/issues).

## Acknowledgements

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
- [HTML5 Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [IP Geolocation API](https://ipinfo.io/)

---

Thank you for using **System Device Diagnostics Chrome Extension**!
