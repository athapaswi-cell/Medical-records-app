# 🚀 Step-by-Step EC2 Deployment Guide

This is your complete, sequential guide to deploy your Healthcare App to AWS EC2 using WinSCP and PuTTY. Follow each step in order.

---

## 📋 STEP 1: Prepare Your Local Environment

### 1.1 Install Required Software

**Download and Install:**

1. **Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Install the LTS version
   - Verify: Open Command Prompt and run `node --version`

2. **PuTTY**
   - Download from: https://www.putty.org/
   - Install the Windows installer (.msi)
   - PuTTYgen comes included

3. **WinSCP**
   - Download from: https://winscp.net/eng/download.php
   - Install the standard version

### 1.2 Build Your Application

1. **Open Command Prompt** (Press `Win + R`, type `cmd`, press Enter)

2. **Navigate to your project:**
   ```cmd
   cd C:\Project\medical-records-app
   ```

3. **Run the build script:**
   ```cmd
   build-for-ec2.bat
   ```

   **OR manually:**
   ```cmd
   npm install
   npm run build
   ```

4. **Verify build completed:**
   - Check that `out` folder exists in your project directory
   - Check that `out\index.html` exists

✅ **Checkpoint:** You should have:
- `out` folder with built files
- `package.json` and `package-lock.json` ready

---

## 🖥️ STEP 2: Create AWS EC2 Instance

### 2.1 Launch EC2 Instance

1. **Login to AWS Console**
   - Go to: https://aws.amazon.com/console/
   - Sign in to your account

2. **Navigate to EC2**
   - Search for "EC2" in the top search bar
   - Click "EC2" service

3. **Launch Instance**
   - Click orange "Launch Instance" button

### 2.2 Configure Instance

1. **Name your instance:**
   - Name: `healthcare-app-server`

2. **Choose AMI (Amazon Machine Image):**
   - Click "Browse more AMIs"
   - Search for "Ubuntu Server 22.04 LTS"
   - Select "Ubuntu Server 22.04 LTS" (Free tier eligible)
   - Click "Select"

3. **Choose Instance Type:**
   - Select `t2.micro` (Free tier eligible)
   - Click "Next: Configure Instance Details"

4. **Configure Instance Details:**
   - Leave default settings
   - Click "Next: Add Storage"

5. **Add Storage:**
   - Keep default 8 GB (free tier)
   - Click "Next: Add Tags"

6. **Add Tags:**
   - Click "Next: Configure Security Group"

7. **Configure Security Group:**
   - Security group name: `healthcare-app-sg`
   - Description: `Security group for healthcare app`
   
   **Add these rules:**
   
   | Type | Protocol | Port Range | Source |
   |------|----------|------------|--------|
   | SSH | TCP | 22 | My IP (or 0.0.0.0/0 for any IP) |
   | HTTP | TCP | 80 | 0.0.0.0/0, ::/0 |
   | HTTPS | TCP | 443 | 0.0.0.0.0/0, ::/0 |
   | Custom TCP | TCP | 3000 | 0.0.0.0/0, ::/0 (optional, for testing) |
   
   - Click "Review and Launch"

8. **Review Instance Launch:**
   - Review your settings
   - Click "Launch"

### 2.3 Create and Download Key Pair

1. **Select or create a key pair:**
   - Select "Create a new key pair"
   - Key pair name: `healthcare-app-key`
   - Key pair type: **RSA**
   - Private key file format: **.pem**
   - Click "Download Key Pair"

2. **Save the key file:**
   - Save `healthcare-app-key.pem` to a secure location
   - **IMPORTANT:** Remember where you saved it!
   - Example: `C:\Users\YourName\Downloads\healthcare-app-key.pem`

3. **Launch Instance:**
   - Check the box "I acknowledge that I have access to the selected private key file"
   - Click "Launch Instances"

4. **Wait for instance to start:**
   - Click "View Instances"
   - Wait for "Instance State" to show "Running" (green circle)
   - Wait for "Status Checks" to show "2/2 checks passed"

### 2.4 Note Your Instance Details

1. **Click on your instance** (check the checkbox)

2. **In the bottom panel, find and copy:**
   - **Public IPv4 address:** (e.g., `54.123.45.67`) ⬅️ **SAVE THIS!**
   - **Public IPv4 DNS:** (e.g., `ec2-54-123-45-67.compute-1.amazonaws.com`) ⬅️ **SAVE THIS!**

✅ **Checkpoint:** You should have:
- EC2 instance running
- Public IP address
- `.pem` key file downloaded

---

## 🔑 STEP 3: Convert PEM Key to PPK Format

### 3.1 Open PuTTYgen

1. **Open PuTTYgen:**
   - Press `Win` key, type "PuTTYgen", press Enter
   - Or navigate to: `C:\Program Files\PuTTY\puttygen.exe`

### 3.2 Load Your PEM Key

1. **Click "Load" button**

2. **In the file dialog:**
   - Change "Files of type" dropdown to **"All Files (*.*)"**
   - Navigate to where you saved `healthcare-app-key.pem`
   - Select the `.pem` file
   - Click "Open"

3. **PuTTYgen will show:**
   - "Successfully imported foreign key"
   - Click "OK"

### 3.3 Save as PPK

1. **Click "Save private key" button**

2. **Security Warning:**
   - Message: "Are you sure you want to save this key without a passphrase?"
   - Click **"Yes"**

3. **Save the file:**
   - Navigate to a folder (e.g., `C:\Users\YourName\Documents`)
   - File name: `healthcare-app-key.ppk`
   - Click "Save"

4. **Close PuTTYgen**

✅ **Checkpoint:** You should have:
- `healthcare-app-key.ppk` file saved
- Remember the location!

---

## 🔌 STEP 4: Connect to EC2 with PuTTY (Initial Setup)

### 4.1 Configure PuTTY

1. **Open PuTTY:**
   - Press `Win` key, type "PuTTY", press Enter

2. **Enter connection details:**
   - **Host Name (or IP address):** Type `ubuntu@YOUR_PUBLIC_IP`
     - Replace `YOUR_PUBLIC_IP` with the IP you noted in Step 2.4
     - Example: `ubuntu@54.123.45.67`
   - **Port:** `22` (should be default)
   - **Connection type:** `SSH` (should be selected)

3. **Configure SSH Key:**
   - In the left panel, expand: **Connection** → **SSH** → **Auth**
   - Click **"Auth"**
   - Under "Authentication parameters"
   - Click **"Browse..."** next to "Private key file for authentication"
   - Navigate to and select `healthcare-app-key.ppk`
   - Click "Open"

4. **Save session:**
   - Go back to **"Session"** in left panel
   - Under "Saved Sessions", type: `Healthcare App EC2`
   - Click **"Save"** button

5. **Connect:**
   - Click **"Open"** button

### 4.2 First Connection

1. **Security Alert (first time only):**
   - Window: "PuTTY Security Alert"
   - Message: "The server's host key is not cached in the registry"
   - Click **"Yes"**

2. **You're connected!**
   - You should see a terminal window
   - Prompt: `ubuntu@ip-xxx-xxx-xxx-xxx:~$`

✅ **Checkpoint:** PuTTY terminal open and connected to EC2

---

## ⚙️ STEP 5: Setup Server Environment (via PuTTY)

**Run these commands one by one in your PuTTY terminal:**

### 5.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

Wait for it to complete (may take a few minutes).

### 5.2 Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

```bash
sudo apt-get install -y nodejs
```

```bash
node --version
```

You should see: `v18.x.x` or higher

```bash
npm --version
```

You should see: `9.x.x` or higher

### 5.3 Install Nginx

```bash
sudo apt install nginx -y
```

```bash
sudo systemctl start nginx
```

```bash
sudo systemctl enable nginx
```

```bash
sudo systemctl status nginx
```

You should see: `Active: active (running)` in green

Press `q` to exit the status view.

### 5.4 Create Application Directory

```bash
sudo mkdir -p /var/www/healthcare-app
```

```bash
sudo chown -R ubuntu:ubuntu /var/www/healthcare-app
```

```bash
cd /var/www/healthcare-app
```

```bash
pwd
```

Should show: `/var/www/healthcare-app`

✅ **Checkpoint:** Server is set up with Node.js, Nginx, and app directory created

---

## 📁 STEP 6: Upload Files with WinSCP

### 6.1 Connect WinSCP

1. **Open WinSCP**

2. **Login dialog appears:**

   **Connection Settings:**
   - **File protocol:** Select `SFTP` from dropdown
   - **Host name:** Enter your EC2 Public IP (same as Step 2.4)
   - **Port number:** `22`
   - **User name:** `ubuntu`

3. **Configure SSH Key:**
   - Click **"Advanced..."** button
   - In left panel: **SSH** → **Authentication**
   - Click **"Authentication"**
   - Under "Private key file", click **"..."** (browse button)
   - Navigate to and select `healthcare-app-key.ppk`
   - Click "OK"

4. **Save session:**
   - Back in Login dialog, click **"Save"**
   - Name: `Healthcare App EC2`
   - Click "OK"

5. **Connect:**
   - Click **"Login"** button

6. **First-time security alert:**
   - Check "Add server's host key to cache"
   - Click "Yes"

7. **You're connected!**
   - Left panel: Your local computer files
   - Right panel: EC2 server files

### 6.2 Navigate to App Directory

**In Right Panel (Server):**
1. In the address bar at the top, type: `/var/www/healthcare-app`
2. Press Enter
3. The folder should be empty (or show current contents)

**In Left Panel (Local):**
1. Navigate to your project folder: `C:\Project\medical-records-app`
2. You should see: `out` folder, `package.json`, `package-lock.json`, etc.

### 6.3 Upload Files

**Upload the `out` folder:**
1. In left panel, click on `out` folder to select it
2. **Drag** the `out` folder from left panel to right panel
   - OR click "Upload" button in toolbar
3. Confirm destination: `/var/www/healthcare-app`
4. Click "OK"
5. Wait for upload to complete

**Upload `package.json`:**
1. In left panel, select `package.json`
2. Drag to right panel (to `/var/www/healthcare-app`)
3. If asked about overwriting, click "Yes"

**Upload `package-lock.json`:**
1. In left panel, select `package-lock.json`
2. Drag to right panel (to `/var/www/healthcare-app`)
3. If asked about overwriting, click "Yes"

**Verify upload:**
- In right panel, you should see:
  - `out` folder
  - `package.json`
  - `package-lock.json`

✅ **Checkpoint:** Files uploaded to `/var/www/healthcare-app` on server

---

## 🌐 STEP 7: Configure Nginx (via PuTTY)

**Go back to your PuTTY window** and run these commands:

### 7.1 Create Nginx Configuration File

```bash
sudo nano /etc/nginx/sites-available/healthcare-app
```

This opens the nano text editor.

### 7.2 Add Configuration

**Copy and paste this configuration** (right-click in PuTTY to paste):

```nginx
server {
    listen 80;
    server_name _;
    
    root /var/www/healthcare-app/out;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

**Save the file:**
- Press `Ctrl + X`
- Press `Y` (to confirm)
- Press `Enter` (to confirm filename)

### 7.3 Enable the Site

```bash
sudo ln -s /etc/nginx/sites-available/healthcare-app /etc/nginx/sites-enabled/
```

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 7.4 Test and Restart Nginx

```bash
sudo nginx -t
```

You should see: `syntax is ok` and `test is successful`

```bash
sudo systemctl restart nginx
```

```bash
sudo systemctl status nginx
```

Should show: `Active: active (running)`

Press `q` to exit.

### 7.5 Set File Permissions

```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
```

```bash
sudo chmod -R 755 /var/www/healthcare-app
```

✅ **Checkpoint:** Nginx configured and restarted, permissions set

---

## ✅ STEP 8: Test Your Deployment

### 8.1 Open Your Website

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)

2. **Enter your EC2 Public IP:**
   ```
   http://YOUR_PUBLIC_IP
   ```
   Replace `YOUR_PUBLIC_IP` with the IP from Step 2.4
   - Example: `http://54.123.45.67`

3. **Press Enter**

### 8.2 Verify It's Working

**You should see:**
- Your Healthcare App homepage loading
- No error messages
- All pages accessible

**If you see errors:**
- Check PuTTY for any error messages
- Run: `sudo tail -f /var/log/nginx/error.log` to see errors
- Press `Ctrl + C` to stop viewing logs

✅ **Checkpoint:** Website loads successfully!

---

## 🎉 SUCCESS! Your App is Deployed!

Your Healthcare App is now live on AWS EC2!

**Your website URL:**
```
http://YOUR_PUBLIC_IP
```

---

## 🔄 Future Updates (When You Make Changes)

### Quick Update Process:

1. **Build locally (Windows):**
   ```cmd
   cd C:\Project\medical-records-app
   build-for-ec2.bat
   ```

2. **Upload via WinSCP:**
   - Connect WinSCP (use saved session)
   - Navigate to `/var/www/healthcare-app`
   - **Delete** the old `out` folder (right-click → Delete)
   - **Upload** the new `out` folder

3. **Set permissions via PuTTY:**
   ```bash
   sudo chown -R www-data:www-data /var/www/healthcare-app
   sudo chmod -R 755 /var/www/healthcare-app
   sudo systemctl restart nginx
   ```

4. **Refresh your browser** - changes should be live!

---

## 🛠️ Troubleshooting

### Problem: Can't connect with PuTTY

**Solutions:**
- Verify Security Group allows SSH (port 22) from your IP
- Check that instance is "Running" and status checks passed
- Verify you're using the correct Public IP
- Make sure you're using the `.ppk` key file, not `.pem`

### Problem: Can't connect with WinSCP

**Solutions:**
- Use SFTP protocol (not FTP)
- Verify username is `ubuntu`
- Check that `.ppk` key file is selected
- Try the same settings that work in PuTTY

### Problem: Website shows 404 or won't load

**Solutions:**
```bash
# Check Nginx status
sudo systemctl status nginx

# Check if files exist
ls -la /var/www/healthcare-app/out/

# Check Nginx configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### Problem: Permission denied errors

**Solution:**
```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

### Problem: Build fails locally

**Solutions:**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check for error messages in the console

---

## 📚 Additional Resources

- **Detailed Guides:** See `EC2_DEPLOYMENT_GUIDE.md` for advanced configurations
- **Connection Help:** See `PUTTY_CONNECTION_GUIDE.md` and `WINSCP_CONNECTION_GUIDE.md`
- **Checklist:** Use `DEPLOYMENT_CHECKLIST.md` to track your progress

---

**Congratulations! Your Healthcare App is now deployed on AWS EC2! 🚀**

