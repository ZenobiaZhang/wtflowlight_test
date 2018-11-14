// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
require('dotenv').config()
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const remoteAuth = {
  HUE_REMOTE_AUTH_CLIENT_ID: functions.config().hue.clientid,
  HUE_REMOTE_AUTH_CLIENT_SECRET: functions.config().hue.clientsecret
}

// Include dependencies
const request = require('request');
const moment = require('moment-timezone')

// Initialize the api to send requests to lights
const Network = require('./light-network/http-network');
const network = new Network();

// Database wrapper for firebase backend
const credential = {credential: admin.credential.applicationDefault(), databaseURL: functions.config().admin.databaseurl}
admin.initializeApp(credential);
const Database = require('./database/database');
const UserAuth = require('./database/users');
const users = UserAuth.initialize(admin);
const db = Database.initialize(admin);

// Api to control lights
const LightsApi = require('./light-network/LightNetwork');
const NetworkAuthManager = require('./light-network/NetworkAuthManager');
const baseUrl = 'https://api.meethue.com';

const authManager = new NetworkAuthManager(db, network, baseUrl, remoteAuth);
const api = new LightsApi(authManager, baseUrl, network);

// Handlers
const helloWorld = require('./handlers/helloWorld');
const storeHueRemoteAuthCode = require('./handlers/storeHueRemoteAuthCode');
const refreshHueAuthTokens = require('./handlers/refreshHueAuthTokens');
const createWhitelistUser = require('./handlers/createWhitelistUser');
const generateRefreshTokens = require('./handlers/generateRefreshTokens');
const setLights = require('./handlers/setLights');
const applyLightSchedule = require('./handlers/applyLightSchedule')
const refreshLights = require('./handlers/refreshLights')
const setUserAccessLevel = require('./handlers/setUserAccessLevel')
const getUserById = require("./handlers/getUserById")
const processUserCreation = require("./handlers/processUserCreation")

exports.helloWorld = helloWorld(functions, db);
exports.storeHueRemoteAuthCode = storeHueRemoteAuthCode(db);
exports.refreshHueAuthTokens = refreshHueAuthTokens(authManager);
exports.createWhitelistUser = createWhitelistUser(functions, api);
exports.generateRefreshTokens = generateRefreshTokens(authManager);
exports.setLights = setLights(functions, api);
exports.applyLightSchedule = applyLightSchedule(functions, db, moment());
exports.refreshLights = refreshLights(db, api);
exports.setUserAccessLevel = setUserAccessLevel(functions, users, db)
exports.getUserById = getUserById(functions, users)
exports.processUserCreation = processUserCreation(functions, users, db)
