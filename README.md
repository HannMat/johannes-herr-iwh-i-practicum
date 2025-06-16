# HubSpot Video Games CRM Integration

A Node.js web application that integrates with HubSpot's CRM API to manage video game records using custom objects.

## Custom Object Link
https://app-eu1.hubspot.com/contacts/146377469/objects/2-143904429/views/all/list

## Overview

This application demonstrates the HubSpot "Integrating With HubSpot I: Foundations" practicum requirements by providing a complete CRUD interface for managing video game data through HubSpot's custom objects.

## Features

- **Custom Object Management**: Full integration with HubSpot custom objects
- **Interactive Web Interface**: Clean, responsive web application
- **Complete CRUD Operations**: Create and read video game records
- **HubSpot API Integration**: Uses HubSpot v3 CRM API with secure authentication

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Pug templating engine with custom CSS
- **API**: HubSpot CRM API v3
- **Authentication**: HubSpot Private App tokens

## Project Structure

```
├── index.js                    # Main Express server
├── views/
│   ├── homepage.pug           # Homepage displaying video games table
│   └── updates.pug            # Form for adding new video games
├── public/css/
│   └── style.css              # Application styling
├── setup-custom-object.js     # Custom object setup script
├── add-sample-data.js         # Sample data population script
└── package.json               # Project dependencies
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- HubSpot Developer Account with Custom Objects access
- HubSpot Private App with CRM permissions

### Installation Steps

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create `.env` file with your HubSpot credentials:
   ```
   HUBSPOT_ACCESS_TOKEN=your_private_app_token
   HUBSPOT_ACCOUNT_ID=your_account_id
   CUSTOM_OBJECT_TYPE=your_custom_object_id
   ```

3. **Create Custom Object**
   ```bash
   node setup-custom-object.js
   ```

4. **Add Sample Data (Optional)**
   ```bash
   node add-sample-data.js [custom-object-id]
   ```

5. **Start Application**
   ```bash
   npm start
   ```

6. **Access Application**
   - View Games: http://localhost:3001/
   - Add Games: http://localhost:3001/update-cobj

## Custom Object Schema

**Object Type**: Video Games
**Properties**:
- `name` (string) - Game title
- `publisher` (string) - Publishing company
- `price` (number) - Game price

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Display all video games in table format |
| GET | `/update-cobj` | Show form for adding new video game |
| POST | `/update-cobj` | Create new video game record |

## Development Notes

- Uses HubSpot's latest v3 CRM API endpoints
- Implements proper error handling and user feedback
- Responsive design compatible with modern browsers
- Follows HubSpot API best practices for authentication and data handling

## License

This project is created for educational purposes as part of the HubSpot Developer Certification program.

## Dependencies
- Express.js for web server
- Pug for templating
- Axios for HTTP requests
- dotenv for environment variables
