# ⚡ Simple Electron

## Electron Starter

<!-- markdownlint-disable MD033 -->

> A comprehensive Electron boilerplate with pre-configured essential APIs, ready-to-use components, and best practices for desktop application development. Build your next Electron app in minutes, not hours.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/electron-33.2.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-windows%20%7C%20macos%20%7C%20linux-lightgrey.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## 🎯 Built for Developers

Skip the boilerplate setup and focus on your application logic. This toolkit provides:

### 🔥 Pre-configured APIs

- 📋 **Clipboard Operations**
  - Text/Image copy & paste
  - Multiple formats support
- 🔔 **System Integration**
  - System tray with custom menu
  - Native notifications
  - Custom dialog windows
- 📱 **Window Management**
  - Multi-window support
  - Window state persistence
  - Custom window controls
- 📊 **IPC Communication**
  - Bidirectional main-renderer communication
  - Type-safe message passing
  - Async/await support

### 🛠️ Developer Tools

- Hot reload development environment
- Pre-configured debugging setup
- Production-ready build scripts
- Cross-platform compatibility ensured

## 🚀 Quick Start

Get up and running in minutes:

```bash
# Clone the repository
git clone [repo-url]
cd SimpleElectron

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## 📚 Directory Structure

```plaintext
src/
├── app/                  # Main process
│   ├── plugins/             # Pre-configured Native APIs
│   └── mainWindow.js        # Main window orchestration
├── renderer/
│   ├── assets/         # Static assets
│   ├── scripts/
│   │   ├── modules/    # Custom modules
│   │   └── renderer.js # Renderer window script
│   └── renderer.html   # Application entry point
├── main.js             # Main process orchestration
├── preload.js          # Secure bridge script
└── ipc.js             # IPC communication handlers
```

## 🎯 Usage Examples

```javascript
// Example: Using the notification API
import { initializeApp } from './app/plugins/index.js';

class ElectronApp {
    constructor() {
        this.mainWindow = null;
        this.managers = null;
    }

    async init() {
        try {
            // Initialize the app
            this.managers = await initializeApp(this.mainWindow);
            this.managers.dialogManager.showMessageBox({
                type: 'info',
                title: 'Welcome',
                message: 'Application started successfully!'
            });
        }
    }
}

// Example: System tray implementation
// app/plugins/tray
setTrayMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => this.mainWindow.show()
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.isQuitting = true;
                app.quit();
            }
        },
        // ... Add more menu items
    ]);
}
```

## 🛡️ Built-in Security

Production-ready security configurations:

- ✅ Context Isolation enabled by default
- ✅ Strict Content Security Policy
- ✅ Secure IPC communication patterns
- ✅ Limited native API exposure
- ✅ Sanitized web preferences

## 🔧 Technical Details

### Core Dependencies

- `electron` ^33.2.0 - Framework core
- `electron-builder` ^25.1.8 - Production packaging
- `electron-reload` ^1.2.3 - Development workflow

### Cross-Platform Support

Carefully crafted for consistent behavior across:

- Windows
- macOS
- Linux

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">Built with ❤️ for the Electron community</p>
