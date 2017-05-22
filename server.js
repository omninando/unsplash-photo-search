const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer');
const vision = require('google-vision-api-client');
const requtil = vision.requtil;
const jsonfile = './config.json';

let responseFromAPI = "";
let upload = multer({ dest: 'uploads/' });

app.prepare()
    .then(() => {
        const server = express()

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        server.post('/hook', upload.single('file'), function (request, response) {
            console.log('hook request');
            console.log(request.file);
            try {


                //Prepare your service account from trust preview certificated project
                //Initialize the api
                vision.init(jsonfile);

                //Build the request payloads
                var d = requtil.createRequests(request).addRequest(
                    requtil.createRequest(__dirname + '/' + request.file.path)
                        .withFeature('LABEL_DETECTION', 30)
                        .withFeature('IMAGE_PROPERTIES', 30)
                        .build());

                //Do query to the api server
                var promise = new Promise(function (resolve, reject) {
                    vision.query(d, function(e, r, d){
                        if(e) console.log('ERROR:', e);
                        responseFromAPI = d;
                        console.log(JSON.stringify(d));
                        resolve();
                        return response.json(responseFromAPI);
                    }.bind(this));
                }.bind(this))


            }

            catch (err) {
                console.error("Can't process request", err);

                return response.status(400).json({
                    status: {
                        code: 400,
                        errorType: err.message
                    }
                });
            }
        });

        server.listen(process.env.PORT || 8080, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:8080')
        })
    });