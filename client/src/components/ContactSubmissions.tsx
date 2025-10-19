import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
}

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('/api/contacts');

        if (res.data && Array.isArray(res.data)) {
          setContacts(res.data);
          setError(null);
        } else if (res.data && typeof res.data === 'object') {
          throw new Error("Received object instead of contact array.");
        } else {
          throw new Error("Invalid or empty response received.");
        }
      } catch (err: any) {
        console.error("Error fetching contacts:", err);
        setError(err?.message || "Failed to fetch contact submissions.");
        setContacts([]);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="bg-black text-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Contact Submissions</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-4 py-2 border-r border-gray-700">#</th>
              <th className="px-4 py-2 border-r border-gray-700">Name</th>
              <th className="px-4 py-2 border-r border-gray-700">Email</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No submissions yet.
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact.id} className="border-t border-gray-700">
                  <td className="px-4 py-2 border-r border-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 border-r border-gray-700">{contact.name}</td>
                  <td className="px-4 py-2 border-r border-gray-700">{contact.email}</td>
                  <td className="px-4 py-2">{contact.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactSubmissions;
