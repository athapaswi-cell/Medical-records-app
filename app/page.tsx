'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

// Define Organization type locally to avoid import issues
interface Organization {
  resourceType: 'Organization';
  id?: string;
  name?: string;
  address?: Array<{
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
  }>;
  type?: Array<{
    coding?: Array<{
      display?: string;
    }>;
  }>;
}

export default function HomePage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use hardcoded real hospital data (our FHIR client is focused on patients)
      console.log('🔄 Loading real hospitals from known sources...');
      
      const realHospitals: Organization[] = [
          {
            resourceType: 'Organization',
            id: 'southeast-health',
            name: 'SOUTHEAST HEALTH MEDICAL CENTER',
            address: [{
              line: ['1108 ROSS CLARK CIRCLE'],
              city: 'DOTHAN',
              state: 'AL',
              postalCode: '36301'
            }],
            telecom: [{
              system: 'phone',
              value: '(334) 793-8701'
            }],
            type: [{
              coding: [{
                display: 'Acute Care Hospitals'
              }]
            }]
          },
          {
            resourceType: 'Organization',
            id: 'mizell-memorial',
            name: 'MIZELL MEMORIAL HOSPITAL',
            address: [{
              line: ['702 MAIN STREET'],
              city: 'OPP',
              state: 'AL',
              postalCode: '36467'
            }],
            telecom: [{
              system: 'phone',
              value: '(334) 493-3541'
            }],
            type: [{
              coding: [{
                display: 'Acute Care Hospitals'
              }]
            }]
          },
          {
            resourceType: 'Organization',
            id: 'crenshaw-community',
            name: 'CRENSHAW COMMUNITY HOSPITAL',
            address: [{
              line: ['101 HOSPITAL CIRCLE'],
              city: 'LUVERNE',
              state: 'AL',
              postalCode: '36049'
            }],
            telecom: [{
              system: 'phone',
              value: '(334) 335-3374'
            }],
            type: [{
              coding: [{
                display: 'Acute Care Hospitals'
              }]
            }]
          },
          {
            resourceType: 'Organization',
            id: 'marshall-medical',
            name: 'MARSHALL MEDICAL CENTERS',
            address: [{
              line: ['2505 U S HIGHWAY 431 NORTH'],
              city: 'BOAZ',
              state: 'AL',
              postalCode: '35957'
            }],
            telecom: [{
              system: 'phone',
              value: '(256) 593-8310'
            }],
            type: [{
              coding: [{
                display: 'Acute Care Hospitals'
              }]
            }]
          },
          {
            resourceType: 'Organization',
            id: 'north-alabama',
            name: 'NORTH ALABAMA MEDICAL CENTER',
            address: [{
              line: ['1701 VETERANS DRIVE'],
              city: 'FLORENCE',
              state: 'AL',
              postalCode: '35630'
            }],
            telecom: [{
              system: 'phone',
              value: '(256) 768-9400'
            }],
            type: [{
              coding: [{
                display: 'Acute Care Hospitals'
              }]
            }]
          }
        ];
        

        setOrganizations(realHospitals);
      
    } catch (err) {
      console.error('Failed to load hospitals:', err);
      setError('Unable to load hospital data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={loadOrganizations} />;

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg mr-3">
              <span className="text-white text-xl">🏥</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Healthcare Finder USA - Demo</h1>
          </div>
          <div className="text-center">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              🔧 Demo Mode - Sample Hospital Data
            </span>
          </div>

        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input 
                type="text" 
                value="United States" 
                disabled 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select State</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All States</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg mr-3">
              <span className="text-white text-lg">🏥</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Hospitals</h2>
          </div>
          <p className="text-gray-600 mb-6 text-sm">Click on any hospital to view doctors, insurance plans, and bed availability</p>
          
          <div className="flex flex-wrap gap-12 justify-center">
            {organizations.map((organization) => {
              // Create a safe hospital ID for routing
              const hospitalId = organization.id || organization.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'unknown';

              
              // Get address information
              const address = organization.address?.[0];
              const addressStr = address 
                ? `${address.line?.join(', ') || ''}, ${address.city || ''}, ${address.state || ''} ${address.postalCode || ''}`.trim()
                : 'Address not available';
              
              // Get phone information
              const phone = organization.telecom?.find(t => t.system === 'phone')?.value || 'Phone not available';
              
              // Get hospital type
              const hospitalType = organization.type?.[0]?.coding?.[0]?.display || 'Healthcare Facility';
              
              return (
                <div key={organization.id} className="border border-gray-200 rounded-lg p-4 shadow-sm w-80 h-96 flex-shrink-0 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase">
                    {organization.name || 'UNNAMED HOSPITAL'}
                  </h3>
                  
                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2 mt-0.5">📍</span>
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Address:</span>
                        <span className="text-sm text-gray-600 ml-1">{addressStr}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">📞</span>
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Phone:</span>
                        <span className="text-sm text-gray-600 ml-1">{phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-2">🏥</span>
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Type:</span>
                        <span className="text-sm text-gray-600 ml-1">{hospitalType}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-2">⭐</span>
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Rating:</span>
                        <span className="text-sm text-gray-600 ml-1">4/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Emergency Services
                    </span>
                  </div>
                  
                  <a href={`/hospital/${hospitalId}`} className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm font-medium no-underline">
                    <span className="mr-2">👁️</span>
                    View Details 
                  </a>
                </div>
              );
            })}
            
            {/* Show message if no hospitals loaded */}
            {organizations.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">Loading real hospitals from Epic FHIR...</p>
                  <p className="text-gray-500 text-sm mt-2">Connecting to healthcare database</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}