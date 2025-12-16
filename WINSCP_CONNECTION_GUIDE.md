# 🔌 WinSCP Connection Guide for EC2

This guide provides detailed step-by-step instructions for connecting to your EC2 instance using WinSCP.

---

## 📥 Installing WinSCP

1. Download WinSCP from: https://winscp.net/eng/download.php
2. Run the installer
3. Follow the installation wizard (accept default settings)

---

## 🔑 Step 1: Prepare Your Key File

Before connecting, you need to convert your `.pem` key to `.ppk` format:

### Using PuTTYgen:

1. **Open PuTTYgen** (comes with PuTTY, or download separately)
2. Click **"Load"** button
3. In the file dialog:
   - Change **"Files of type"** dropdown to **"All Files (*.*)"**
   - Navigate to your `.pem` key file
   - Select it and click **"Open"**
4. Click **"Save private key"**
5. Click **"Yes"** when asked about saving without a passphrase
6. Save the file as `healthcare-app-key.ppk` (or any name you prefer)
7. **Remember the location** where you saved the `.ppk` file

---

## 🔌 Step 2: Configure WinSCP Connection

### Initial Setup:

1. **Open WinSCP**
2. The **Login** dialog should appear automatically
   - If not, click **"New Site"** button or **File → New Site**

### Connection Settings:

1. **File protocol:** Select **SFTP** from the dropdown
2. **Host name:** Enter your EC2 instance **Public IP** or **Public DNS**
   - Example IP: `54.123.45.67`
   - Example DNS: `ec2-54-123-45-67.compute-1.amazonaws.com`
3. **Port number:** `22` (default for SSH/SFTP)
4. **User name:** `ubuntu` (for Ubuntu AMI)

### SSH Authentication:

1. Click **"Advanced..."** button at the bottom
2. In the left panel, navigate to: **SSH → Authentication**
3. In the **"Private key file"** field, click **"..."** (browse button)
4. Navigate to and select your `.ppk` key file
5. Click **"OK"** to close the Advanced settings

### Save Session (Optional but Recommended):

1. Back in the Login dialog, click **"Save"** button
2. Enter a name for your session (e.g., "Healthcare App EC2")
3. Click **"OK"**
4. The session will be saved for future use

---

## 🔐 Step 3: Connect to EC2

1. Click **"Login"** button
2. **First-time connection:** You'll see a security alert about host key
   - Check **"Add server's host key to cache"**
   - Click **"Yes"**
3. If connection is successful, you'll see:
   - **Left panel:** Your local computer files
   - **Right panel:** Your EC2 server files

---

## 📁 Step 4: Navigate to Application Directory

### On the Server (Right Panel):

1. Double-click `..` (parent directory) if you're in a subdirectory
2. Navigate to: `/var/www/healthcare-app`
   - Or type the path in the address bar at the top
3. If the directory doesn't exist, you'll need to create it first (via PuTTY)

### On Your Computer (Left Panel):

1. Navigate to your project folder
2. Locate the `out` folder and `package.json` files

---

## 📤 Step 5: Upload Files

### Method 1: Drag and Drop (Easiest)

1. **Select files/folders** in the left panel (your computer)
2. **Drag** them to the right panel (server)
3. Confirm the transfer when prompted

### Method 2: Upload Button

1. **Select files/folders** in the left panel
2. Click **"Upload"** button in the toolbar
3. Confirm the destination directory
4. Click **"OK"**

### Files to Upload:

- ✅ `out/` folder (entire folder)
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `.env.local` (if you have environment variables)

---

## 📊 Understanding WinSCP Interface

### Left Panel (Local):
- Shows files on your Windows computer
- Default location: Usually your user folder
- Navigate using the folder tree or address bar

### Right Panel (Remote):
- Shows files on your EC2 server
- Default location: `/home/ubuntu`
- Navigate using the folder tree or address bar

### Toolbar Buttons:
- **Upload** (↑): Transfer files from local to remote
- **Download** (↓): Transfer files from remote to local
- **Synchronize**: Sync directories
- **New Directory**: Create folder
- **Refresh**: Reload file list

---

## ⚙️ Step 6: Set File Permissions (via PuTTY)

After uploading files, you need to set permissions using PuTTY:

1. **Open PuTTY** and connect to your EC2 instance
2. Run these commands:

```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

---

## 🔄 Quick Update Workflow

For future updates:

1. **Build locally:** Run `build-for-ec2.bat`
2. **Open WinSCP:** Connect to your saved session
3. **Navigate to:** `/var/www/healthcare-app`
4. **Delete old `out` folder** (if it exists)
5. **Upload new `out` folder**
6. **Set permissions** (via PuTTY): `sudo chown -R www-data:www-data /var/www/healthcare-app`
7. **Restart Nginx** (via PuTTY): `sudo systemctl restart nginx`

---

## 🛠️ Troubleshooting

### Connection Issues:

**Problem:** "Connection timeout" or "Network error"
- **Solution:** Check Security Group allows SSH (port 22) from your IP
- Verify your EC2 instance is running
- Check your internet connection

**Problem:** "Authentication failed"
- **Solution:** 
  - Verify username is `ubuntu` (for Ubuntu AMI)
  - Check that you're using the correct `.ppk` key file
  - Verify the key file wasn't corrupted during conversion

**Problem:** "Server refused our key"
- **Solution:**
  - Make sure you converted the `.pem` to `.ppk` correctly
  - Verify the key pair name matches the one used when creating the EC2 instance
  - Try converting the key again with PuTTYgen

### File Transfer Issues:

**Problem:** "Permission denied" when uploading
- **Solution:** Make sure you're uploading to `/var/www/healthcare-app` (or a directory owned by ubuntu user)
- Check directory exists and has correct permissions

**Problem:** Files upload but don't appear
- **Solution:** Click the **Refresh** button (F5) in WinSCP
- Check you're in the correct directory

---

## 💡 Pro Tips

1. **Save Your Session:** Always save your connection for easy access later
2. **Keep Key File Secure:** Store your `.ppk` file in a secure location
3. **Use Synchronization:** For frequent updates, use WinSCP's "Synchronize" feature
4. **Edit Files Directly:** WinSCP can open files in your default editor for quick edits
5. **Compare Directories:** Use "Compare directories" to see what's different between local and remote

---

## 🔒 Security Best Practices

1. **Never share your `.ppk` key file**
2. **Use strong passphrase** when creating keys (optional but recommended)
3. **Only allow SSH from your IP** in Security Group (not "Anywhere")
4. **Regularly update your EC2 instance:** `sudo apt update && sudo apt upgrade`
5. **Disable password authentication** (use keys only)

---

**Need more help?** See `EC2_DEPLOYMENT_GUIDE.md` for comprehensive deployment instructions.

