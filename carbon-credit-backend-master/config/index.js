// Load environment variables from .env
import 'dotenv/config';

// Import database setup and express app
import SetupDataBaseConnection from './database.js';
import app from './express.js';

// Connect to MongoDB
SetupDataBaseConnection();

// Export the express app
export default app;
