const axios = require('axios');
require('dotenv').config();

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

async function addSampleGames() {
    const games = [
        {
            properties: {
                name: "Animal Crossing: New Horizons"
            }
        },
        {
            properties: {
                name: "Mario Kart 8"
            }
        },
        {
            properties: {
                name: "Stardew Valley"
            }
        }
    ];

    try {
        console.log('Adding sample video games...');
        
        for (const game of games) {
            const response = await axios.post(
                'https://api.hubapi.com/crm/v3/objects/2-143904429',
                game,
                {
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log(`✓ Added game: ${game.properties.name}`);
        }
        
        console.log('\n🎉 Sample games added successfully!');
        console.log('Visit http://localhost:3001 to see them!');
        
    } catch (error) {
        console.error('❌ Error adding games:', error.response?.data || error.message);
    }
}

addSampleGames();
