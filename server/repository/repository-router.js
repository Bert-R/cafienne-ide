'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('../../config/config');
const repositoryModule = require('./repository');
const Repository = repositoryModule.Repository;
const repository = new Repository(config.repository, config.deploy);

const backend = require('./backend_rest');
const caseService = new backend.Backend(config.backendUrl);

const router = express.Router();
const xmlParser = bodyParser.text({ type: 'application/xml', limit: '50mb' });

/**
 * Returns the repository contents by name, last modified timestamp and usage information
 */
router.get('/list', function (req, res, next) {
    const list = repository.list();
    res.json(list);
});

/**
 *  Get a file from the repository.
 */
router.get('/load/*', function (req, res, next) {
    const fileName = req.params[0];
    try {
        const content = repository.load(fileName);
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('x-sent', 'true');
        res.send(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File does not exist, just return an empty string
            res.sendStatus(404);
        } else {
            console.error(err);
            res.sendStatus(500);
        }
    }
});

/**
 * Save a file to the repository
 */
router.post('/save/*', xmlParser, function (req, res, next) {
    try {
        const fileName = req.params[0];
        repository.save(fileName, req.body);

        const list = repository.list();
        res.json(list);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * Deploy a file and it's dependencies from the repository to the deployment folder
 */
router.get('/deploy/*', xmlParser, function (req, res, next) {
    const artifactToDeploy = req.params[0];
    try {
        const deployedFile = repository.deploy(artifactToDeploy);
        console.log('Deployed ' + artifactToDeploy + ' to ' + deployedFile);
        res.setHeader('Content-Type', 'application/xml');
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * Preview what the deployment of a file and it's dependencies looks like
 */
router.get('/viewCMMN/*', (req, res, next) => {
    try {
        const fileName = req.params[0];

        const definitions = repository.composeDefinitionsDocument(fileName);
        const response = definitions.deployContents;
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('x-sent', 'true');
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * Validate a potential deployment file (with it's dependencies) against a configured Backend Service
 */
router.get('/validate/*', (req, res, next) => {
    const fileName = req.params[0];
    const definitions = repository.composeDefinitionsDocument(fileName);
    if (definitions.hasErrors()) {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(definitions.getErrors());
        return;
    }
    const cmmnSource = definitions.deployContents;

    if (config.backendUrl === undefined) {
        res.status(503);
        res.send('There is no case service configured for engine based validation');
        return;
    };

    // Current protocol with backend is that it returns 200 if the content is valid, and 400 otherwise;
    //  We convert this to our own protocol with our client.
    caseService.validate(cmmnSource)
        .then(() => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send('["The model is valid"]');
        })
        .catch(err => {
            if (err.response && err.response.status == 400) {
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.send(err.response.data);
            } else {
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.send(`Cannot validate model due to failure\n\n  ${err.message}`);
            }
        });
});

router.get('/api/events/*', (req, res, next) => {
    const caseInstanceId = req.params[0];
    const from = req.query['from'];
    const to = req.query['to'];
    const token = req.header('Authorization');
    caseService.getEvents(caseInstanceId, from, to, token).then(response => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(response.data);
    }).catch(err => {
        if (err.response) {
            res.status(err.response.status);
            res.send(`Failure while retrieving events<br/>${err.response.status}: ${err.response.data}`);
        } else {
            res.status(503);
            res.setHeader('Content-Type', 'application/json');
            res.send(`Failure while retrieving events<br/>${err.message}`);
        }
    })
})

module.exports = router;
