const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const CUSTOM_OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE || '2-8574457';

// Homepage route - Display custom objects
app.get('/', async (req, res) => {
    try {
        const hubspotResponse = await axios.get(
            `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
            {
                headers: {
                    'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    properties: 'name,publisher,price'
                }
            }
        );

        const customObjects = hubspotResponse.data.results;
        
        res.render('homepage', {
            title: 'Custom Object Table',
            customObjects: customObjects
        });
    } catch (error) {
        console.error('Error fetching custom objects:', error.response?.data || error.message);
        res.render('homepage', {
            title: 'Custom Object Table',
            customObjects: [],
            error: 'Failed to fetch custom objects'
        });
    }
});

// Form route - Display update form
app.get('/update-cobj', (req, res) => {
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
    });
});

// Form submission route - Create new custom object
app.post('/update-cobj', async (req, res) => {
    try {
        const { name, publisher, price } = req.body;

        const newCustomObject = {
            properties: {
                name: name,
                publisher: publisher,
                price: price
            }
        };

        await axios.post(
            `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
            newCustomObject,
            {
                headers: {
                    'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.redirect('/');
    } catch (error) {
        console.error('Error creating custom object:', error.response?.data || error.message);
        res.status(500).send('Error creating custom object');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
