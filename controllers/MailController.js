var conf = require('../conf.json');
var nodemailer = require('nodemailer');

var Imap = require('imap');
var inspect = require('util').inspect;

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

MailController.prototype.openInbox = function (cb) {
    var imap = new Imap({
        user: conf.mail.auth.user,
        password: conf.mail.auth.password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    });

    imap.once('ready', function() {
        openInbox(imap, function(err, box) {
            if (err) throw err;
            var f = imap.seq.fetch('1:5', {
                bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                struct: true
            });
            f.on('message', function(msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                msg.on('body', function(stream, info) {
                    var buffer = '';
                    stream.on('data', function(chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function() {
                        console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                    });
                });
                msg.once('attributes', function(attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                msg.once('end', function() {
                    console.log(prefix + 'Finished');
                });
            });
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
                imap.end();
            });
        });
    });

    imap.once('error', function(err) {
        console.log(err);
    });

    imap.once('end', function() {
        console.log('Connection ended');
    });

    imap.connect();

}

function openInbox(imap, cb) {
    imap.openBox('INBOX', true, cb);
}


module.exports = MailController;
