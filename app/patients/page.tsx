'use client';

import { useState, useEffect } from 'react';
import { Patient, Bundle } from '@/lib/fhir-client';
import { mockPatientsBundle } from '@/lib/mock-data';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, using mock data
      // In production, you would use: const bundle = await fhirClient.getPatients();
      const bundle: Bundle = mockPatientsBundle;
      
      const patientResources = bundle.entry?.map((entry: any) => entry.resource as Patient) || [];
      setPatients(patientResources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  // Filter patients based on search term
  // const filteredPatients = patients.filter(patient => {
  //   if (!searchTerm) return true;
  //   const name = patient.name?.[0];
  //   const fullName = `${name?.given?.join(' ') || ''} ${name?.family || ''}`.toLowerCase();
  //   const mrn = patient.identifier?.find((id: any) => id.system?.includes('patients'))?.value?.toLowerCase() || '';
  //   return fullName.includes(searchTerm.toLowerCase()) || mrn.includes(searchTerm.toLowerCase());
  // });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={loadPatients} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <button className="bg-purple-700 text-white px-4 py-2 rounded mb-4 hover:bg-purple-800 transition-colors">
            ← Back to Hospitals
          </button>
          
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-lg p-6 text-white shadow-lg">
            <h1 className="text-2xl font-bold mb-2">📋 Insurance Information Available at SOUTHEAST HEALTH MEDICAL CENTER</h1>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400 text-lg">ℹ️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Insurance plans accepted at this hospital. Contact hospital to verify your specific plan coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search insurance plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Insurance Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Insurance Plans */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <span className="text-blue-600 text-lg mr-2">🏥</span>
                <h3 className="text-lg font-bold text-blue-600">Acme Insurance Co</h3>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-center font-medium mb-3">
                Acme Insurance Co
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Plan Type:</span> Medical</div>
                <div><span className="font-medium">Coverage:</span> Medical, Hospital, Prescription Drug</div>
              </div>
              <div className="mt-3 text-green-600 text-sm">✓ Accepted at this hospital</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <span className="text-blue-600 text-lg mr-2">🏥</span>
                <h3 className="text-lg font-bold text-blue-600">Acme Insurance Organization 7</h3>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-center font-medium mb-3">
                Acme Insurance Organization 7
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Coverage:</span> Medical, Primary Care</div>
              </div>
              <div className="mt-3 text-green-600 text-sm">✓ Accepted at this hospital</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <span className="text-blue-600 text-lg mr-2">🏥</span>
                <h3 className="text-lg font-bold text-blue-600">Aetna</h3>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-center font-medium mb-3">
                Aetna
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Plan Type:</span> Medical</div>
                <div><span className="font-medium">Coverage:</span> Medical, Hospital, Prescription Drug</div>
              </div>
              <div className="mt-3 text-green-600 text-sm">✓ Accepted at this hospital</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <span className="text-blue-600 text-lg mr-2">🏥</span>
                <h3 className="text-lg font-bold text-blue-600">BlueCross BlueShield</h3>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-center font-medium mb-3">
                BlueCross BlueShield
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Plan Type:</span> Medical</div>
                <div><span className="font-medium">Coverage:</span> Medical, Hospital, Prescription Drug</div>
              </div>
              <div className="mt-3 text-green-600 text-sm">✓ Accepted at this hospital</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <span className="text-blue-600 text-lg mr-2">🏥</span>
                <h3 className="text-lg font-bold text-blue-600">Cigna</h3>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-center font-medium mb-3">
                Cigna
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Plan Type:</span> Medical</div>
                <div><span className="font-medium">Coverage:</span> Medical, Hospital, Prescription Drug</div>
              </div>
              <div className="mt-3 text-green-600 text-sm">✓ Accepted at this hospital</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <span className="text-blue-600 text-lg mr-2">🏥</span>
                <h3 className="text-lg font-bold text-blue-600">Great Health Plan</h3>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-center font-medium mb-3">
                Great Health Plan
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Plan Type:</span> Medical</div>
                <div><span className="font-medium">Coverage:</span> Medical, Hospital, Prescription Drug</div>
              </div>
              <div className="mt-3 text-green-600 text-sm">✓ Accepted at this hospital</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

