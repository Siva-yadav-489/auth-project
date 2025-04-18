# Setup

```
    npm install
```

To install all dependencies

```
    MONGO_URL=yourMongoDBconnectionstring
    JWT_SECRET=yourJWTsecret
```

Create a .env file and add your MONGO_URL to store the data in any MongoDB tool(Mongosh, MongoDBAtlas, MongoDBCompass) and add your JWT secret.

```
    npm start
```

Start command to run the server.
(install nodemon if not having already or change the start script in package.json to `node server.js`)

# API Endpoints

| Method | Route       | Handler                    |
| ------ | ----------- | -------------------------- |
| GET    | "/"         | Home route                 |
| POST   | "/register" | Create an account          |
| POST   | "/login"    | Login                      |
| GET    | "/profile"  | Get user details           |
| PUT    | "/profile"  | Update user details        |
| DELETE | "/profile"  | Delete user details        |
| GET    | "/admin"    | Get all users data details |

# Sample test data

name: Shiva  
email: shiva@gmail.com  
password: 1235456  
role: {type: String, enum: ["user", "admin"], default: "user" }  
CreatedAt: { type: Date, default: Date.now } - already made default in schema
