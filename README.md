# Tips Share Calculator

**Fair and transparent tip distribution for restaurant teams**

Tips Share Calculator is a mobile application designed to help restaurant managers and staff fairly distribute tips among waiters based on merit, hours worked, and performance criteria. Built with Ionic and Angular, this app ensures every team member receives their fair share of tips through a transparent, points-based calculation system.

## 📱 Available On

- **iOS App Store**: [Download Tips Share Calculator](https://apps.apple.com/gb/app/tips-share-calculator/id6532617293)
- **Android**: Coming soon

## ✨ Features

### 🧮 Smart Tip Calculation
- **Merit-based distribution**: Tips are allocated based on performance points and hours worked
- **Transparent formula**: Clear calculation showing how each waiter's share is determined
- **Customizable criteria**: Add your own point categories (serving wine, taking orders, running drinks, etc.)

### 👥 Team Management
- **Waiter profiles**: Add team members with photos and track their performance
- **Hours tracking**: Record actual hours worked for accurate calculations
- **Performance points**: Assign points based on different service criteria

### 📊 Record Keeping
- **Entry history**: Save and review past tip distributions
- **Export functionality**: Share results as Excel or XML files
- **Date tracking**: Keep records organized by date

### 🌍 Multi-language Support
- **English** and **Portuguese** language options
- Easy language switching within the app

### 🎨 Modern Design
- **Dark/Light mode**: Automatic theme switching
- **Intuitive interface**: Clean, easy-to-use design
- **Mobile-optimized**: Perfect for use on phones and tablets

## 🚀 How It Works

1. **Add Your Team**: Create profiles for each waiter with their photo
2. **Set Criteria**: Define point values for different service tasks
3. **Record Hours**: Input hours worked for each team member
4. **Enter Tips**: Add the total tips made for the day
5. **Calculate**: The app automatically calculates fair distribution
6. **Save & Share**: Keep records and share results with your team

## 🛠 Technical Stack

- **Framework**: Ionic 8 with Angular 18
- **Mobile**: Capacitor for native iOS/Android functionality
- **State Management**: NGXS for predictable state management
- **Styling**: SCSS with custom design system
- **Internationalization**: ngx-translate for multi-language support
- **Build Tools**: Angular CLI, TypeScript, ESLint

## 🏗 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages/screens
│   ├── services/           # Business logic and utilities
│   ├── store/              # NGXS state management
│   └── models/             # TypeScript interfaces and types
├── assets/                 # Images, fonts, and translations
└── theme/                  # SCSS variables and styling
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Ionic CLI
- Angular CLI

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tips-share-calculator

# Install dependencies
npm install

# Start development server
npm run start
```

### Building for Production

```bash
# Build web version
npm run build

# Build for iOS
npm run ios

# Build for Android
npm run android
```

## 📱 Mobile Development

This app uses Capacitor to provide native mobile functionality:

- **Camera access** for waiter profile photos
- **File system** for saving and sharing calculations
- **Native sharing** for exporting results
- **Keyboard handling** for better mobile UX

## 🌟 Why Tips Share Calculator?

### For Restaurant Managers
- **Eliminate disputes**: Transparent calculations prevent arguments about tip distribution
- **Save time**: Automated calculations replace manual math
- **Keep records**: Historical data for payroll and management purposes
- **Fair system**: Merit-based distribution motivates better service

### For Restaurant Staff
- **Transparency**: See exactly how tips are calculated
- **Fairness**: Hours and performance both factor into distribution
- **Motivation**: Point system encourages excellent service
- **Trust**: Open calculation builds team confidence

## 🎯 Perfect For

- **Restaurants** of all sizes
- **Cafes** and coffee shops
- **Bars** and pubs
- **Hotels** and hospitality venues
- Any service business that pools and distributes tips

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support, feature requests, or bug reports, please contact us through the App Store or visit our website.

---

**Made with ❤️ by Goiaba Ltd**

*Helping restaurants create fair and transparent workplaces, one tip at a time.*