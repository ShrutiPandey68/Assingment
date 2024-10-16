import React, { useState } from 'react';
import { Box, Button, Stack } from "@chakra-ui/react"
import Navbar from './Navbar';
const PropertyList = () => {
    // Static data instead of fetching from API
    const [properties] = useState([
        {
            _id: '1',
            name: 'Luxury Apartment',
            location: 'New York City',
            price: 250000,
        },
        {
            _id: '2',
            name: 'Cozy Cottage',
            location: 'Lake Tahoe',
            price: 350000,
        },
        {
            _id: '3',
            name: 'Modern House',
            location: 'San Francisco',
            price: 850000,
        },
        {
            _id: '4',
            name: 'Beachfront Villa',
            location: 'Miami',
            price: 1500000,
        },
    ]);
    const openBookingModal = (propertyId) => {
        // Implement modal logic here
        console.log(`Open booking modal for property: ${propertyId}`);
    };
    return (
        <div>
<Navbar/>
            <h1>Available Properties</h1>
            <Stack>
            <Box>
                {properties.map(property => (
                    <li key={property._id}>
                        <h2>{property.name}</h2>
                        <p>{property.location}</p>
                        <p>Price: ${property.price.toLocaleString()}</p>
                        <Button onClick={() => openBookingModal(property._id)}>Book Tour</Button>
                        <a href={`/vr-viewer/${property._id}`}>View VR Tour</a>
                        <a href={`/property/${property._id}`}>View Details</a>
                    </li>
                ))}
            </Box>
            </Stack>
          
        </div>
    );
};

export default PropertyList;
