# AWS S3 Deployment Guide for Healthcare Finder App

## Prerequisites

1. **AWS Account**: You need an active AWS account
2. **AWS CLI**: Install and configure AWS CLI on your machine
3. **Node.js**: Ensure Node.js is installed (version 18 or higher)

## Step 1: Install AWS CLI

### Windows:
```bash
# Download and install from: https://aws.amazon.com/cli/
# Or use chocolatey:
choco install awscli
```

### Configure AWS CLI:
```bash
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key  
# - Default region (e.g., us-east-1)
# - Default output format (json)
```

## Step 2: Build the Application

```bash
# Install dependencies
npm install

# Build the static export
npm run build
```

This will create an `out` folder with all static files.

## Step 3: Create S3 Bucket

### Option A: Using AWS Console
1. Go to AWS S3 Console
2. Click "Create bucket"
3. Choose a unique bucket name (e.g., `healthcare-finder-app-2024`)
4. Select your preferred region
5. Uncheck "Block all public access" 
6. Acknowledge the warning about public access
7. Click "Create bucket"

### Option B: Using AWS CLI
```bash
# Replace 'your-bucket-name' with your desired bucket name
aws s3 mb s3://healthcare-finder-app-2024 --region us-east-1
```

## Step 4: Configure Bucket for Static Website Hosting

### Using AWS Console:
1. Go to your bucket
2. Click "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Enable static website hosting
6. Set index document: `index.html`
7. Set error document: `404.html`
8. Save changes

### Using AWS CLI:
```bash
aws s3 website s3://healthcare-finder-app-2024 --index-document index.html --error-document 404.html
```

## Step 5: Set Bucket Policy for Public Access

Create a bucket policy to allow public read access:

### Using AWS Console:
1. Go to "Permissions" tab
2. Click "Bucket Policy"
3. Add this policy (replace bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::healthcare-finder-app-2024/*"
        }
    ]
}
```

### Using AWS CLI:
```bash
# Create policy.json file with the above content, then:
aws s3api put-bucket-policy --bucket healthcare-finder-app-2024 --policy file://policy.json
```

## Step 6: Upload Files to S3

```bash
# Navigate to your project directory
cd /path/to/your/project

# Upload the built files
aws s3 sync out/ s3://healthcare-finder-app-2024 --delete

# Or with specific cache settings:
aws s3 sync out/ s3://healthcare-finder-app-2024 --delete --cache-control "max-age=31536000" --exclude "*.html" --exclude "*.json"
aws s3 sync out/ s3://healthcare-finder-app-2024 --delete --cache-control "max-age=0" --include "*.html" --include "*.json"
```

## Step 7: Access Your Application

Your application will be available at:
```
http://healthcare-finder-app-2024.s3-website-us-east-1.amazonaws.com
```

Replace with your actual bucket name and region.

## Step 8: (Optional) Set up CloudFront for HTTPS

### Create CloudFront Distribution:
1. Go to CloudFront Console
2. Click "Create Distribution"
3. Set Origin Domain to your S3 website endpoint
4. Configure settings:
   - Viewer Protocol Policy: "Redirect HTTP to HTTPS"
   - Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - Cache Policy: "Managed-CachingOptimized"
5. Create distribution

### Custom Domain (Optional):
1. Register domain in Route 53 or use existing domain
2. Create SSL certificate in AWS Certificate Manager
3. Configure CloudFront to use custom domain and certificate
4. Update DNS records to point to CloudFront distribution

## Step 9: Automated Deployment Script

Create a deployment script `deploy.sh`:

```bash
#!/bin/bash

# Build the application
echo "Building application..."
npm run build

# Upload to S3
echo "Uploading to S3..."
aws s3 sync out/ s3://healthcare-finder-app-2024 --delete

# Invalidate CloudFront cache (if using CloudFront)
# aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "Visit: http://healthcare-finder-app-2024.s3-website-us-east-1.amazonaws.com"
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**: Check bucket policy and public access settings
2. **404 Not Found**: Ensure index.html exists and static website hosting is enabled
3. **Routing Issues**: Next.js dynamic routes may not work with S3 static hosting
4. **CORS Issues**: Configure CORS policy if needed for API calls

### CORS Configuration (if needed):
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

## Security Considerations

1. **Environment Variables**: Don't include sensitive data in the build
2. **API Keys**: Use environment-specific configurations
3. **HTTPS**: Always use CloudFront for HTTPS in production
4. **Access Logs**: Enable S3 access logging for monitoring

## Cost Optimization

1. **S3 Storage Class**: Use Standard-IA for infrequently accessed files
2. **CloudFront**: Reduces S3 data transfer costs
3. **Lifecycle Policies**: Automatically transition old files to cheaper storage classes

## Monitoring

1. **CloudWatch**: Monitor S3 and CloudFront metrics
2. **AWS Cost Explorer**: Track deployment costs
3. **S3 Access Logs**: Monitor website traffic

Your healthcare application is now deployed and accessible via AWS S3!