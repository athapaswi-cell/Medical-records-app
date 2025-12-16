# 🚀 Deploy Healthcare App to AWS EC2 using WinSCP & PuTTY

## Overview
This guide will help you deploy your Next.js healthcare application to an AWS EC2 instance using:
- **AWS EC2** - Virtual server
- **PuTTY** - SSH client for Windows
- **WinSCP** - File transfer client for Windows

---

## 📋 Prerequisites

### Software to Download:
1. **PuTTY** - https://www.putty.org/
2. **WinSCP** - https://winscp.net/eng/download.php
3. **PuTTYgen** (comes with PuTTY) - For key conversion

### AWS Account Requirements:
- Active AWS account
- Basic understanding of AWS console

---

## 🖥️ Step 1: Create AWS EC2 Instance

### 1.1 Launch EC2 Instance
1. Go to **AWS Console** → **EC2** → **Launch Instance**
2. **Name**: `healthcare-app-server`
3. **AMI**: Select **Ubuntu Server 22.04 LTS** (Free tier eligible)
4. **Instance Type**: `t2.micro` (Free tier)
5. **Key Pair**: 
   - Click **"Create new key pair"**
   - Name: `healthcare-app-key`
   - Type: **RSA**
   - Format: **.pem** (we'll convert this for PuTTY)
   - Download and save the `.pem` file

### 1.2 Configure Security Group
1. **Security Group Name**: `healthcare-app-sg`
2. **Add Rules**:
   ```
   Type: SSH          | Port: 22   | Source: My IP
   Type: HTTP         | Port: 80   | Source: Anywhere
   Type: HTTPS        | Port: 443  | Source: Anywhere
   Type: Custom TCP   | Port: 3000 | Source: Anywhere (for testing)
   ```
3. **Launch Instance**

### 1.3 Note Your Instance Details
- **Public IP Address**: (e.g., 54.123.45.67)
- **Public DNS**: (e.g., ec2-54-123-45-67.compute-1.amazonaws.com)

---

## 🔑 Step 2: Convert PEM Key for PuTTY

### 2.1 Open PuTTYgen
1. Start **PuTTYgen**
2. Click **"Load"**
3. Change file type to **"All Files (*.*)"**
4. Select your downloaded `.pem` file
5. Click **"Open"**

### 2.2 Convert and Save
1. Click **"Save private key"**
2. Choose **"Yes"** (save without passphrase)
3. Save as `healthcare-app-key.ppk`
4. Close PuTTYgen

---

## 🔌 Step 3: Connect to EC2 using PuTTY

### 3.1 Configure PuTTY Session
1. Open **PuTTY**
2. **Host Name**: `ubuntu@YOUR_PUBLIC_IP` (e.g., ubuntu@54.123.45.67)
3. **Port**: `22`
4. **Connection Type**: `SSH`

### 3.2 Configure SSH Key
1. In left panel: **Connection** → **SSH** → **Auth** → **Credentials**
2. **Private key file**: Browse and select `healthcare-app-key.ppk`

### 3.3 Save Session
1. Go back to **Session**
2. **Saved Sessions**: `healthcare-app-server`
3. Click **"Save"**
4. Click **"Open"** to connect

### 3.4 First Connection
- Accept the security alert
- You should see: `ubuntu@ip-xxx-xxx-xxx-xxx:~$`

---

## ⚙️ Step 4: Setup Server Environment

### 4.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 4.2 Install Node.js and npm
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 4.3 Install Nginx (Web Server)
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Check if running
sudo systemctl status nginx
```

### 4.4 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 4.5 Create Application Directory
```bash
sudo mkdir -p /var/www/healthcare-app
sudo chown -R ubuntu:ubuntu /var/www/healthcare-app
cd /var/www/healthcare-app
```

---

## 📁 Step 5: Build and Transfer Files using WinSCP

### 5.1 Build Your Application Locally
On your local Windows machine:
```cmd
# Navigate to your project
cd C:\path\to\your\healthcare-app

# Install dependencies
npm install

# Build the application
npm run build
```

### 5.2 Configure WinSCP
1. Open **WinSCP**
2. **File Protocol**: `SFTP`
3. **Host Name**: Your EC2 public IP
4. **Port**: `22`
5. **User Name**: `ubuntu`
6. **Private Key**: Browse and select `healthcare-app-key.ppk`
7. Click **"Save"** and **"Login"**

### 5.3 Transfer Files
1. **Local Directory** (left): Navigate to your project folder
2. **Remote Directory** (right): Navigate to `/var/www/healthcare-app`
3. **Transfer these folders/files**:
   - `out/` folder (built static files)
   - `package.json`
   - `package-lock.json`
   - `.env.local` (if needed)

**Alternative: Transfer entire project**
- Select all project files and drag to `/var/www/healthcare-app`

---

## 🌐 Step 6: Configure Nginx

### 6.1 Create Nginx Configuration
In PuTTY terminal:
```bash
sudo nano /etc/nginx/sites-available/healthcare-app
```

### 6.2 Add Configuration
```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP YOUR_PUBLIC_DNS;
    
    root /var/www/healthcare-app/out;
    index index.html;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### 6.3 Enable Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/healthcare-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🚀 Step 7: Deploy and Test

### 7.1 Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

### 7.2 Test Your Application
1. Open browser
2. Go to: `http://YOUR_PUBLIC_IP`
3. Your healthcare app should be live!

---

## 🔒 Step 8: Setup SSL Certificate (Optional but Recommended)

### 8.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 8.2 Get SSL Certificate
```bash
# Replace with your domain name
sudo certbot --nginx -d yourdomain.com

# Or use IP (not recommended for production)
# Follow prompts for email and terms
```

### 8.3 Auto-renewal
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔄 Step 9: Easy Update Process

### 9.1 Create Update Script
```bash
nano ~/update-app.sh
```

Add this content:
```bash
#!/bin/bash
echo "🔄 Updating Healthcare App..."

# Backup current version
sudo cp -r /var/www/healthcare-app/out /var/www/healthcare-app/out.backup

# Set permissions for upload
sudo chown -R ubuntu:ubuntu /var/www/healthcare-app

echo "✅ Ready for file upload via WinSCP"
echo "📁 Upload new 'out' folder to /var/www/healthcare-app/"
echo "🔄 Then run: ~/finish-update.sh"
```

```bash
nano ~/finish-update.sh
```

Add this content:
```bash
#!/bin/bash
echo "🔄 Finishing update..."

# Set correct permissions
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app

# Restart Nginx
sudo systemctl restart nginx

echo "✅ Update completed!"
echo "🌐 Visit: http://$(curl -s ifconfig.me)"
```

Make scripts executable:
```bash
chmod +x ~/update-app.sh ~/finish-update.sh
```

### 9.2 Update Process
1. **Local**: Build new version (`npm run build`)
2. **PuTTY**: Run `~/update-app.sh`
3. **WinSCP**: Upload new `out` folder
4. **PuTTY**: Run `~/finish-update.sh`

---

## 🛠️ Troubleshooting

### Common Issues:

#### 1. **Can't Connect via PuTTY**
- Check Security Group allows SSH (port 22)
- Verify correct IP address
- Ensure `.ppk` key is correct

#### 2. **WinSCP Connection Failed**
- Use same settings as PuTTY
- Check file protocol is SFTP
- Verify private key path

#### 3. **Website Not Loading**
- Check Nginx status: `sudo systemctl status nginx`
- Verify files in `/var/www/healthcare-app/out`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

#### 4. **Permission Denied**
```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

#### 5. **Nginx Configuration Error**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 💰 Cost Estimation

### AWS EC2 t2.micro (Free Tier):
- **First 12 months**: FREE
- **After free tier**: ~$8-10/month
- **Data transfer**: First 1GB free/month

### Additional Costs:
- **Elastic IP** (optional): $0.005/hour when not attached
- **EBS Storage**: 30GB free tier, then $0.10/GB/month

---

## 🔧 Advanced Configuration

### 1. **Custom Domain Setup**
1. Purchase domain from Route 53 or external provider
2. Point A record to your EC2 IP
3. Update Nginx configuration with domain name
4. Get SSL certificate for domain

### 2. **Monitoring Setup**
```bash
# Install htop for system monitoring
sudo apt install htop -y

# Monitor Nginx logs
sudo tail -f /var/log/nginx/access.log
```

### 3. **Backup Strategy**
```bash
# Create backup script
nano ~/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
sudo tar -czf /home/ubuntu/backup_$DATE.tar.gz /var/www/healthcare-app
echo "Backup created: backup_$DATE.tar.gz"
```

---

## 🎉 Success!

Your healthcare application is now deployed on AWS EC2! 

**Access your app at**: `http://YOUR_PUBLIC_IP`

**Next Steps**:
1. Set up custom domain
2. Configure SSL certificate
3. Set up monitoring
4. Create backup strategy
5. Configure auto-scaling (if needed)

**Useful Commands**:
- **Restart Nginx**: `sudo systemctl restart nginx`
- **Check logs**: `sudo tail -f /var/log/nginx/error.log`
- **System status**: `htop`
- **Disk usage**: `df -h`

Your healthcare finder application is now live and accessible to users worldwide! 🏥✨