# Epic FHIR Patient App - Healthcare Finder USA

A modern healthcare application built with Next.js that integrates with Epic's FHIR API to display hospitals, doctors, insurance plans, and bed availability information. The app replicates the design and functionality shown in the Epic FHIR Patient App screenshots.

## 🏥 Features

- **Hospital Search**: Browse and search hospitals across the US with detailed information
- **Doctor Directory**: View medical staff and physicians with specialties and contact information
- **Insurance Plans**: Check insurance coverage and accepted plans at hospitals
- **Bed Availability**: Real-time hospital bed availability and occupancy rates
- **Epic FHIR Integration**: Connect to Epic's FHIR API for real healthcare data
- **Responsive Design**: Purple gradient design matching Epic's patient app interface

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Epic FHIR API credentials (optional, uses mock data by default)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-records-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Application Structure

### Pages

- **Home (`/`)**: Landing page with navigation to all features
- **Hospitals (`/hospitals`)**: Search and browse healthcare facilities
- **Doctors (`/doctors`)**: Medical staff directory with specialties
- **Insurance (`/patients`)**: Insurance plans and coverage information  
- **Bed Availability (`/records`)**: Hospital capacity and bed status

### Components

- `OrganizationCard`: Hospital information display
- `PractitionerCard`: Doctor profile cards
- `ObservationCard`: Medical records and observations
- `PatientCard`: Patient information (used for insurance display)

## 🔧 FHIR Integration

### Mock Data Mode (Default)

The app runs with comprehensive mock data that matches the Epic FHIR screenshots:

- **Southeast Health Medical Center** and other Alabama hospitals
- **Doctors** with NPI numbers, specialties, and contact information
- **Insurance plans** including Aetna, BlueCross BlueShield, Cigna
- **Bed availability** statistics and occupancy rates

### Epic FHIR API Mode

To connect to Epic's FHIR API:

1. Update `lib/fhir-client.ts`:
```typescript
const fhirClient = new FHIRClient('https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4', false);
```

2. Set up authentication:
```typescript
await fhirClient.authenticateWithEpic(clientId, clientSecret);
```

3. The app supports Epic's FHIR R4 endpoints:
   - `/Patient` - Patient demographics
   - `/Practitioner` - Healthcare providers
   - `/Organization` - Healthcare facilities
   - `/Observation` - Medical observations and vital signs

## 🎨 Design Features

- **Purple Gradient Theme**: Matches Epic's patient app design
- **Card-Based Layout**: Clean, modern interface with hover effects
- **Responsive Grid**: Adapts to different screen sizes
- **Icon Integration**: Emoji icons for visual appeal
- **Status Indicators**: Color-coded status badges and availability indicators

## 📊 Data Models

### Hospital (Organization)
- Name, address, phone number
- Hospital type (Acute Care, etc.)
- Rating and ownership information
- Emergency services availability

### Doctor (Practitioner)
- Name with credentials (MD, DO, CRNP)
- NPI (National Provider Identifier)
- Specialties (Family Medicine, Emergency Medicine)
- Contact information and location

### Insurance Plans
- Plan names and types
- Coverage details (Medical, Hospital, Prescription)
- Acceptance status at hospitals

### Bed Availability
- Total bed capacity
- ICU beds available/occupied
- Inpatient bed usage
- Occupancy rate calculations

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **HTTP Client**: Axios for FHIR API calls
- **Date Handling**: date-fns for date formatting
- **FHIR**: HL7 FHIR R4 standard compliance

## 🔒 Security & Compliance

- FHIR OAuth 2.0 authentication support
- Client credentials flow for system-to-system access
- Secure token management
- HIPAA-compliant data handling practices

## 📈 Development

### Adding New Features

1. **New FHIR Resources**: Extend `lib/fhir-client.ts` with new resource types
2. **Additional Pages**: Create new pages in the `app/` directory
3. **Custom Components**: Add reusable components in `components/`
4. **Mock Data**: Update `lib/mock-data.ts` for testing

### Testing

```bash
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## 🌐 Epic FHIR Resources

- [Epic FHIR Documentation](https://fhir.epic.com/)
- [FHIR R4 Specification](https://hl7.org/fhir/R4/)
- [Epic App Orchard](https://apporchard.epic.com/)

## 📄 License

This project is for educational and demonstration purposes. Ensure compliance with Epic's terms of service and healthcare regulations when using with real patient data.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions about Epic FHIR integration or healthcare data standards, consult the official Epic documentation and FHIR community resources."# Medical-records-app" 
