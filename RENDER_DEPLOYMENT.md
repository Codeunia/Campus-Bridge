# Deploying Campus Bridge LMS to Render

This guide will help you deploy the full Campus Bridge LMS application to Render, which supports both the frontend and backend components.

## Prerequisites

1. A [Render](https://render.com) account (free)
2. A GitHub account
3. This repository forked or cloned

## Deployment Steps

### 1. Prepare Your Application

The application has already been configured to work with Render's environment variables. The key changes made:

1. **Database configuration** in [db.js](file:///Users/madanthambisetty/Downloads/Campus-Bridge/db.js) now uses environment variables
2. **Server configuration** in [server.js](file:///Users/madanthambisetty/Downloads/Campus-Bridge/server.js) listens on Render's PORT
3. **Email verification links** use APP_URL environment variable

### 2. Create a Render Account

1. Go to [https://render.com](https://render.com)
2. Sign up for a free account
3. Connect your GitHub account

### 3. Deploy the Web Service

1. Click "New +" and select "Web Service"
2. Connect to your GitHub repository
3. Configure the settings:
   - **Name**: campus-bridge-lms
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. Add environment variables in the "Advanced" section:
   - `MYSQL_HOST`: Your database host
   - `MYSQL_USER`: Your database username
   - `MYSQL_PASSWORD`: Your database password
   - `MYSQL_DATABASE`: lms
   - `EMAIL_SERVICE`: gmail (or your email service)
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASS`: your-app-password
   - `EMAIL_FROM`: your-email@gmail.com
   - `APP_URL`: https://your-app-name.onrender.com (your Render app URL)

### 4. Set Up Database

Render offers free PostgreSQL databases. To use it:

1. Click "New +" and select "PostgreSQL"
2. Choose the free tier
3. Once created, you'll get connection details

Since Campus Bridge uses MySQL, you have two options:
1. Modify the application to use PostgreSQL instead (see migration guide below)
2. Use an external MySQL provider like PlanetScale (has a free tier)

### 5. Alternative: Using PlanetScale for Database

PlanetScale offers a free MySQL-compatible database:

1. Go to [https://planetscale.com](https://planetscale.com)
2. Sign up for a free account
3. Create a new database
4. Get the connection details and use them as environment variables

### 6. Environment Variables

In Render, set these environment variables:

```
PORT=3000
MYSQL_HOST=your-db-host
MYSQL_PORT=3306
MYSQL_USER=your-db-username
MYSQL_PASSWORD=your-db-password
MYSQL_DATABASE=lms
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
APP_URL=https://your-app-name.onrender.com
```

## Render Free Tier Limitations

1. **Sleep Mode**: Web services fall asleep after 15 minutes of inactivity
2. **500 Build Minutes**: Per month
3. **CPU Time**: 500 hours per month
4. **Bandwidth**: 100GB per month

## Migration from MySQL to PostgreSQL (Optional)

If you want to use Render's free PostgreSQL database, you'll need to modify the database queries slightly:

1. Update [db.js](file:///Users/madanthambisetty/Downloads/Campus-Bridge/db.js):
```javascript
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;
```

2. Update query syntax in server.js and other files to be PostgreSQL compatible.

## Support

For questions about deployment or to report issues, contact:
**connect@campusbridge.io**

For the complete GitHub repository:
**https://github.com/Codeunia/Campus-Bridge**