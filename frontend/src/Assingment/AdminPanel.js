import React, { useEffect, useState } from 'react';
import PropertyModal from './PropertyModal'; // Import the modal component

const AdminPanel = () => {
    // Static data for properties
    const [properties, setProperties] = useState([
        {
            _id: '1',
            name: 'Luxury Apartment',
            location: 'New York City',
            price: 250000,
            modelPath: '/models/luxury_apartment.glb', // Path to your model
        },
        {
            _id: '2',
            name: 'Cozy Cottage',
            location: 'Lake Tahoe',
            price: 350000,
            modelPath: '/models/cozy_cottage.glb', // Path to your model
        },
        {
            _id: '3',
            name: 'Modern House',
            location: 'San Francisco',
            price: 850000,
            modelPath: '/models/modern_house.glb', // Path to your model
        },
        {
            _id: '4',
            name: 'Beachfront Villa',
            location: 'Miami',
            price: 1500000,
            modelPath: '/models/beachfront_villa.glb', // Path to your model
        },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: 0,
        amenities: '',
    });

    const [modalShow, setModalShow] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate adding a property
        const newProperty = {
            _id: (properties.length + 1).toString(), // Simulate unique ID
            ...formData,
            amenities: formData.amenities.split(',').map(item => item.trim()), // Split amenities
            modelPath: '/models/new_property.glb', // Add a model path for the new property
        };
        setProperties([...properties, newProperty]); // Add new property
        setFormData({ name: '', location: '', price: 0, amenities: '' }); // Reset form data
        alert('Property added successfully!'); // Confirmation message
    };

    const handleShowModal = (property) => {
        setSelectedProperty(property);
        setModalShow(true);
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Property Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Amenities (comma separated)"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                />
                <button type="submit">Add Property</button>
            </form>

            <h2>Your Properties</h2>
            <ul>
                {properties.map(property => (
                    <li key={property._id}>
                        <h3>{property.name}</h3>
                        <p>{property.location}</p>
                        <p>Price: ${property.price.toLocaleString()}</p>
                        <button onClick={() => handleShowModal(property)}>View Tour</button>
                    </li>
                ))}
            </ul>

            {/* Modal for showing property tour */}
            {selectedProperty && (
                <PropertyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    property={selectedProperty}
                />
            )}
        </div>
    );
};

export default AdminPanel;
