# 🚀 EC2 Deployment Quick Start Guide

## Quick Checklist

Use this guide for a fast deployment to EC2 using WinSCP and PuTTY.

---

## 📦 Step 1: Prepare Your Build (Windows)

**Run the build script:**
```cmd
build-for-ec2.bat
```

**Or manually:**
```cmd
npm install
npm run build
```

**Result:** You'll have a `out` folder ready to upload.

---

## 🖥️ Step 2: Setup EC2 Instance (One-Time Setup)

### A. Create EC2 Instance
1. AWS Console → EC2 → Launch Instance
2. **AMI:** Ubuntu 22.04 LTS
3. **Instance Type:** t2.micro (free tier)
4. **Key Pair:** Create new → Download `.pem` file
5. **Security Group:** Allow SSH (22), HTTP (80), HTTPS (443), Custom TCP (3000)
6. **Launch**

### B. Note Your Instance Details
- **Public IP:** (e.g., 54.123.45.67)
- **Public DNS:** (e.g., ec2-54-123-45-67.compute-1.amazonaws.com)

---

## 🔑 Step 3: Convert PEM Key for PuTTY/WinSCP

1. Open **PuTTYgen** (comes with PuTTY)
2. Click **"Load"**
3. Change filter to **"All Files (*.*)"**
4. Select your `.pem` file
5. Click **"Open"**
6. Click **"Save private key"** → Save as `.ppk` file

---

## ⚙️ Step 4: Initial Server Setup (via PuTTY)

### Connect with PuTTY:
1. Open PuTTY
2. **Host:** `ubuntu@YOUR_PUBLIC_IP`
3. **SSH → Auth → Credentials:** Browse for your `.ppk` file
4. **Session → Saved Sessions:** Type name → **Save** → **Open**

### Run these commands in PuTTY:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Create app directory
sudo mkdir -p /var/www/healthcare-app
sudo chown -R ubuntu:ubuntu /var/www/healthcare-app
```

---

## 📁 Step 5: Upload Files via WinSCP

### Connect with WinSCP:
1. Open WinSCP
2. **Protocol:** SFTP
3. **Host:** YOUR_PUBLIC_IP
4. **Port:** 22
5. **Username:** ubuntu
6. **Advanced → SSH → Authentication → Private key file:** Select your `.ppk` file
7. **Login**

### Upload Files:
1. **Left panel (Local):** Navigate to your project folder
2. **Right panel (Remote):** Navigate to `/var/www/healthcare-app`
3. **Upload these items:**
   - Select the `out` folder → **Upload** (make sure it uploads as `out` folder)
   - Upload `package.json`
   - Upload `package-lock.json`

---

## 🌐 Step 6: Configure Nginx (via PuTTY)

### Create Nginx config:
```bash
sudo nano /etc/nginx/sites-available/healthcare-app
```

### Paste this configuration:
```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP YOUR_PUBLIC_DNS;
    
    root /var/www/healthcare-app/out;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/healthcare-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Set permissions:
```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

---

## ✅ Step 7: Test Your Deployment

Open your browser and visit:
```
http://YOUR_PUBLIC_IP
```

Your app should be live! 🎉

---

## 🔄 Updating Your App

### Quick Update Process:

1. **Windows:** Run `build-for-ec2.bat` to rebuild
2. **WinSCP:** Delete old `out` folder on server, upload new `out` folder
3. **PuTTY:** Run:
   ```bash
   sudo chown -R www-data:www-data /var/www/healthcare-app
   sudo chmod -R 755 /var/www/healthcare-app
   sudo systemctl restart nginx
   ```

---

## 🛠️ Common Issues

### Can't connect via PuTTY/WinSCP?
- Check Security Group allows SSH (port 22) from your IP
- Verify you're using the correct `.ppk` key file
- Make sure username is `ubuntu` (for Ubuntu AMI)

### Website shows 404 or not loading?
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify files exist
ls -la /var/www/healthcare-app/out/
```

### Permission denied errors?
```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

---

## 📚 Full Documentation

For detailed instructions, troubleshooting, SSL setup, and advanced configurations, see:
- **EC2_DEPLOYMENT_GUIDE.md** - Complete deployment guide

---

## 🔒 Security Recommendations

1. **Setup SSL Certificate** (using Let's Encrypt/Certbot)
2. **Configure Firewall** (UFW) to restrict ports
3. **Regular Updates:** `sudo apt update && sudo apt upgrade`
4. **Backup Strategy:** Regular backups of your application files

---

**Need Help?** Refer to EC2_DEPLOYMENT_GUIDE.md for comprehensive documentation.

