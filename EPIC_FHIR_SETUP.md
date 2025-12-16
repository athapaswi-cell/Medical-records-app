# Epic FHIR Integration Setup Guide

This guide will help you connect your application to Epic's FHIR API to fetch real doctor and hospital data.

## 🏥 Epic App Orchard Registration

### Step 1: Register Your App
1. Go to [Epic App Orchard](https://apporchard.epic.com/)
2. Click "Build Apps" → "Get Started"
3. Create a new FHIR R4 application
4. Select the following scopes:
   - `system/Patient.read`
   - `system/Practitioner.read`
   - `system/Organization.read`
   - `system/Observation.read`
   - `system/Location.read`

### Step 2: Get Your Credentials
After registration, Epic will provide:
- **Client ID**: Your unique application identifier
- **Client Secret**: Your application's secret key
- **Sandbox URL**: For testing (usually `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`)

## 🔧 Configuration

### Step 1: Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Update with your Epic credentials:

```bash
# Epic FHIR Configuration
EPIC_CLIENT_ID=your-actual-client-id-here
EPIC_CLIENT_SECRET=your-actual-client-secret-here
EPIC_ENVIRONMENT=sandbox
USE_MOCK_DATA_FALLBACK=true
```

### Step 2: Enable Epic FHIR
In `lib/fhir-client.ts`, the client is already configured to:
- Try Epic FHIR API first
- Fallback to mock data if Epic is unavailable
- Show connection status in the UI

## 🚀 Testing Epic FHIR Connection

### Current Status
The application will show one of these statuses:

- **✅ Epic FHIR Connected**: Successfully fetching real data from Epic
- **⚠️ Epic FHIR Unavailable**: Using demo data (Epic not configured)
- **❌ Epic FHIR Error**: API error, using fallback data
- **🔄 Connecting**: Attempting to connect to Epic FHIR

### Test the Connection
1. Navigate to any hospital detail page
2. Click the "Doctors" tab
3. Check the status indicator in the top-right
4. Look at browser console for detailed logs

## 📊 Epic FHIR Data Sources

### Practitioners (Doctors)
- **Endpoint**: `/Practitioner`
- **Search Parameters**:
  - `address-city`: Filter by city (e.g., "DOTHAN")
  - `address-state`: Filter by state (e.g., "AL")
  - `specialty`: Filter by medical specialty
  - `organization`: Filter by hospital/organization
  - `active`: Only active practitioners

### Organizations (Hospitals)
- **Endpoint**: `/Organization`
- **Search Parameters**:
  - `type`: Healthcare provider type
  - `address-city`: Filter by city
  - `address-state`: Filter by state
  - `active`: Only active organizations

### Example API Calls
```javascript
// Search for doctors in Dothan, AL
GET /Practitioner?address-city=DOTHAN&address-state=AL&active=true&_count=50

// Search for hospitals in Alabama
GET /Organization?address-state=AL&type=prov&active=true&_count=50

// Get specific practitioner details
GET /Practitioner/{practitioner-id}
```

## 🔒 Authentication

### OAuth 2.0 Client Credentials Flow
The application uses Epic's client credentials flow:

1. **Token Request**:
   ```
   POST https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=client_credentials
   &client_id={your-client-id}
   &client_secret={your-client-secret}
   &scope=system/Patient.read system/Practitioner.read system/Organization.read
   ```

2. **API Requests**:
   ```
   GET https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Practitioner
   Authorization: Bearer {access-token}
   Accept: application/fhir+json
   ```

## 🛠️ Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check your client ID and secret
   - Verify your app is approved in Epic App Orchard
   - Ensure correct scopes are requested

2. **403 Forbidden**
   - Your app may not have the required permissions
   - Contact Epic to verify your app status

3. **404 Not Found**
   - Check the FHIR endpoint URL
   - Verify the resource ID exists

4. **429 Rate Limited**
   - Epic has rate limits on API calls
   - Implement retry logic with exponential backoff

### Debug Mode
Enable detailed logging by checking the browser console when loading doctor data.

## 📈 Production Deployment

### Before Going Live
1. **Get Production Credentials**: Request production access from Epic
2. **Update Environment**: Change `EPIC_ENVIRONMENT=production`
3. **Test Thoroughly**: Verify all API calls work with real data
4. **Monitor Usage**: Track API usage to stay within Epic's limits

### Production Checklist
- [ ] Production Epic App Orchard approval
- [ ] Production client credentials configured
- [ ] Error handling and logging implemented
- [ ] Rate limiting and retry logic added
- [ ] HIPAA compliance measures in place
- [ ] Security audit completed

## 📚 Additional Resources

- [Epic FHIR Documentation](https://fhir.epic.com/)
- [Epic App Orchard](https://apporchard.epic.com/)
- [FHIR R4 Specification](https://hl7.org/fhir/R4/)
- [Epic Developer Community](https://galaxy.epic.com/Search/GetResults?searchQuery=FHIR)

## 🆘 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Epic App Orchard configuration
3. Review Epic's FHIR documentation
4. Contact Epic developer support if needed

The application is designed to gracefully fallback to mock data if Epic FHIR is unavailable, ensuring a smooth user experience during development and testing.