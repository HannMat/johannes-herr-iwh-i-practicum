const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

async function createCustomObject() {
    try {
        console.log('Step 1: Creating Custom Object Schema...');
        
        // Read the custom object schema from JSON file
        const customObjectSchema = JSON.parse(fs.readFileSync('./custom-object-schema.json', 'utf8'));

        const schemaResponse = await axios.post(
            'https://api.hubapi.com/crm/v3/schemas',
            customObjectSchema,
            {
                headers: {
                    'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✓ Custom object schema created successfully!');
        console.log('Object Type ID:', schemaResponse.data.objectTypeId);
        const objectTypeId = schemaResponse.data.objectTypeId;
        
        console.log('\nStep 2: Adding Custom Properties...');
        
        // Read the properties from JSON file
        const propertiesData = JSON.parse(fs.readFileSync('./custom-object-properties.json', 'utf8'));

        const propertiesResponse = await axios.post(
            `https://api.hubapi.com/crm/v3/properties/${objectTypeId}/batch/create`,
            propertiesData,
            {
                headers: {
                    'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✓ Custom properties added successfully!');
        console.log(`Added ${propertiesResponse.data.results.length} properties`);

        console.log('\nStep 3: Adding Sample Data...');
        
        // Add some sample records
        const sampleGames = [
            {
                properties: {
                    name: "Animal Crossing: New Horizons",
                    publisher: "Nintendo",
                    price: "60"
                }
            },
            {
                properties: {
                    name: "Mario Kart 8",
                    publisher: "Nintendo", 
                    price: "60"
                }
            },
            {
                properties: {
                    name: "Stardew Valley",
                    publisher: "ConcernedApe",
                    price: "15"
                }
            }
        ];

        for (const game of sampleGames) {
            await axios.post(
                `https://api.hubapi.com/crm/v3/objects/${objectTypeId}`,
                game,
                {
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(`✓ Added: ${game.properties.name}`);
        }

        console.log('\n🎉 Setup completed successfully!');
        console.log('\n📝 Next steps:');
        console.log(`1. Add this to your .env file:`);
        console.log(`   CUSTOM_OBJECT_TYPE=${objectTypeId}`);
        console.log('\n2. Update your README.md with this URL:');
        console.log(`   https://app.hubspot.com/contacts/146377469/objects/${objectTypeId}/views/all/list`);
        console.log('\n3. Run: node index.js');
        console.log('4. Open: http://localhost:3001');

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        
        if (error.response?.data?.message?.includes('already exists')) {
            console.log('\nℹ️  The custom object might already exist. Use helper.js to find the Object Type ID.');
        }
    }
}

createCustomObject();