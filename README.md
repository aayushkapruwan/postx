# postx

A full-featured social media platform clone built with React, featuring user authentication, real-time posts, rich text editing, and interactive animations. Designed to mimic the core functionalities of popular social media platforms.

## Features

- **User Authentication**: Secure login and signup using Appwrite backend
- **Post Management**: Create, edit, delete, and view posts
- **Rich Text Editor**: Advanced text editing with TinyMCE integration
- **Interactive UI**: Smooth animations with Framer Motion
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Efficient state handling with Redux Toolkit
- **Routing**: Client-side routing with React Router
- **Backend Integration**: Cloud database and file storage with Appwrite

## Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit, React Redux
- **Backend**: Appwrite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Text Editor**: TinyMCE
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Appwrite account and project setup

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minitwitter.git
   ```

2. Navigate to the project directory:
   ```bash
   cd minitwitter
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.sample` to `.env`
   - Configure your Appwrite credentials

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. Sign up or log in to start posting

## Build

To build the project for production:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
