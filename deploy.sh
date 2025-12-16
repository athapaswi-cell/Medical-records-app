#!/bin/bash

# Healthcare Finder App - AWS S3 Deployment Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="healthcare-finder-app-2024"
REGION="us-east-1"

echo -e "${BLUE}🏥 Healthcare Finder App - AWS S3 Deployment${NC}"
echo "=================================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not configured. Run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Step 1: Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}🔨 Step 2: Building the application...${NC}"
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}❌ Build failed. 'out' directory not found.${NC}"
    exit 1
fi

echo -e "${YELLOW}☁️  Step 3: Checking if S3 bucket exists...${NC}"
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    echo -e "${YELLOW}📦 Creating S3 bucket: $BUCKET_NAME${NC}"
    aws s3 mb "s3://$BUCKET_NAME" --region $REGION
    
    echo -e "${YELLOW}🌐 Configuring static website hosting...${NC}"
    aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document 404.html
    
    echo -e "${YELLOW}🔓 Setting bucket policy for public access...${NC}"
    cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF
    
    aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json
    rm bucket-policy.json
else
    echo -e "${GREEN}✅ S3 bucket already exists: $BUCKET_NAME${NC}"
fi

echo -e "${YELLOW}📤 Step 4: Uploading files to S3...${NC}"
aws s3 sync out/ "s3://$BUCKET_NAME" --delete

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}🌐 Your application is now live at:${NC}"
echo -e "${GREEN}http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com${NC}"
echo ""
echo -e "${YELLOW}💡 Next steps:${NC}"
echo "1. Set up CloudFront for HTTPS (recommended for production)"
echo "2. Configure a custom domain name"
echo "3. Set up monitoring and logging"
echo ""
echo -e "${BLUE}📚 For detailed instructions, see DEPLOYMENT_GUIDE.md${NC}"