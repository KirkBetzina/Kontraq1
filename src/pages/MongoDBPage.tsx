import React from 'react';
import AppLayout from '../components/AppLayout';
import MongoDBDemo from '../components/mongodb/MongoDBDemo';

const MongoDBPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">MongoDB Integration</h1>
        <div className="mb-8">
          <p className="text-center mb-4">
            This page demonstrates how MongoDB could be integrated as a backend option for the application.
            In a production environment, you would connect to a real MongoDB instance.
          </p>
        </div>
        <MongoDBDemo />
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>The MongoDB client is implemented as a singleton to ensure a single connection instance.</li>
            <li>Models are built on a base model class that provides common CRUD operations.</li>
            <li>The application includes models for Users, Jobs, Subcontractor Profiles, and Messages.</li>
            <li>A React context provider makes MongoDB services available throughout the application.</li>
            <li>Custom hooks simplify MongoDB interactions in React components.</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default MongoDBPage;
