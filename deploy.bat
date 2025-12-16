@echo off
REM Healthcare Finder App - AWS S3 Deployment Script for Windows

echo 🏥 Healthcare Finder App - AWS S3 Deployment
echo ==================================================

REM Configuration
set BUCKET_NAME=healthcare-finder-app-2024
set REGION=us-east-1

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI is not installed. Please install it first.
    pause
    exit /b 1
)

REM Check if AWS is configured
aws sts get-caller-identity >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI is not configured. Run 'aws configure' first.
    pause
    exit /b 1
)

echo 📦 Step 1: Installing dependencies...
call npm install

echo 🔨 Step 2: Building the application...
call npm run build

if not exist "out" (
    echo ❌ Build failed. 'out' directory not found.
    pause
    exit /b 1
)

echo ☁️  Step 3: Checking if S3 bucket exists...
aws s3 ls "s3://%BUCKET_NAME%" >nul 2>&1
if errorlevel 1 (
    echo 📦 Creating S3 bucket: %BUCKET_NAME%
    aws s3 mb "s3://%BUCKET_NAME%" --region %REGION%
    
    echo 🌐 Configuring static website hosting...
    aws s3 website "s3://%BUCKET_NAME%" --index-document index.html --error-document 404.html
    
    echo 🔓 Setting bucket policy for public access...
    echo {> bucket-policy.json
    echo     "Version": "2012-10-17",>> bucket-policy.json
    echo     "Statement": [>> bucket-policy.json
    echo         {>> bucket-policy.json
    echo             "Sid": "PublicReadGetObject",>> bucket-policy.json
    echo             "Effect": "Allow",>> bucket-policy.json
    echo             "Principal": "*",>> bucket-policy.json
    echo             "Action": "s3:GetObject",>> bucket-policy.json
    echo             "Resource": "arn:aws:s3:::%BUCKET_NAME%/*">> bucket-policy.json
    echo         }>> bucket-policy.json
    echo     ]>> bucket-policy.json
    echo }>> bucket-policy.json
    
    aws s3api put-bucket-policy --bucket %BUCKET_NAME% --policy file://bucket-policy.json
    del bucket-policy.json
) else (
    echo ✅ S3 bucket already exists: %BUCKET_NAME%
)

echo 📤 Step 4: Uploading files to S3...
aws s3 sync out/ "s3://%BUCKET_NAME%" --delete

echo 🎉 Deployment completed successfully!
echo.
echo 🌐 Your application is now live at:
echo http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
echo.
echo 💡 Next steps:
echo 1. Set up CloudFront for HTTPS (recommended for production)
echo 2. Configure a custom domain name
echo 3. Set up monitoring and logging
echo.
echo 📚 For detailed instructions, see DEPLOYMENT_GUIDE.md
pause