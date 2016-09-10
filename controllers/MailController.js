var conf = require('../conf.json');
var nodemailer = require('nodemailer');

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

var DevLoggingController = require('./DevLoggingController');
var logger = new DevLoggingController();

var MailController = function () {
};

MailController.prototype.sendEmail = function (req, res, mailOptions, message, redirect, hasRedirect) {

    var transporter = nodemailer.createTransport({
        service: conf.mail.service,
        auth: {
            user: conf.mail.auth.user, // Your email id
            pass: conf.mail.auth.password // Your password
        }
    });

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
        } else {
            if (req != null) {
                req.session.message = message;
            }
            if (hasRedirect && res != null) {
                res.redirect(redirect);
            }
        }
    });
}

MailController.prototype.createRequestDate = function () {
    var date = new Date();
    return date;
}

MailController.prototype.createAuthenticationcode = function () {
    var text = "";
    var possible = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

MailController.prototype.openInbox = function (initialCb) {
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Gmail API.
        authorize(JSON.parse(content), initialCb, listThreads);
    });

}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, initialCb, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, initialCb, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client, initialCb);
        }
    });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, initialCb, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client, initialCb);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Retrieve Threads in the user's mailbox matching query.
 *
 * @param  authClient
 */
function listThreads(authClient, initialCb) {

    var gmail = google.gmail({ auth: authClient, version: 'v1' });

    var messages = [];
    var emails = gmail.users.threads.list({
        includeSpamTrash: false,
        q: 'to:lulilucullusgourmet',
        userId: conf.mail.auth.user
    }, function (err, results) {
        if(err !== null){
            console.log("error: " + err);
        }
        else if(results === undefined){
            console.log("retry1");
            listThreads(authClient, initialCb);
        }
        else{
            for (var i = 0; i < results.threads.length; i++) {
                var message = gmail.users.threads.get({
                    'userId': conf.mail.auth.user,
                    'id': results.threads[i].id,
                    'fields': 'messages(payload/headers,snippet)'
                }, function (err, result) {
                    if(err !== null){
                        console.log("error: " + err);
                    }
                    else if(result === undefined){
                        console.log("retry2");
                        listThreads(authClient, initialCb);
                    }
                    else{
                        messages.push(result);
                    }
                });
            }
            setTimeout(function () {
                if (messages.length === results.threads.length) {
                    initialCb(messages);
                }
                else{
                    console.log("retry3");
                    listThreads(authClient,initialCb);
                }
            },2000);
        }
    });
}
module.exports = MailController;
