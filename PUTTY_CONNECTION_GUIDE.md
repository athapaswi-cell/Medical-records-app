# 🔌 PuTTY Connection Guide for EC2

This guide provides detailed step-by-step instructions for connecting to your EC2 instance using PuTTY.

---

## 📥 Installing PuTTY

1. Download PuTTY from: https://www.putty.org/
2. Download the Windows installer (.msi file)
3. Run the installer and follow the setup wizard
4. PuTTYgen (for key conversion) is included with PuTTY

---

## 🔑 Step 1: Convert PEM Key to PPK Format

Before connecting with PuTTY, you need to convert your AWS `.pem` key to `.ppk` format.

### Using PuTTYgen:

1. **Open PuTTYgen**
   - Search for "PuTTYgen" in Windows Start menu
   - Or navigate to: `C:\Program Files\PuTTY\puttygen.exe`

2. **Load your PEM key:**
   - Click the **"Load"** button
   - In the file dialog:
     - Change **"Files of type"** to **"All Files (*.*)"**
     - Navigate to your `.pem` key file (downloaded from AWS)
     - Select it and click **"Open"**

3. **Save as PPK:**
   - Click **"Save private key"** button
   - When prompted "Are you sure you want to save this key without a passphrase?", click **"Yes"**
   - Choose a location and name (e.g., `healthcare-app-key.ppk`)
   - Click **"Save"**

4. **Remember the location** of your `.ppk` file

---

## 🔌 Step 2: Configure PuTTY Session

### Basic Connection Settings:

1. **Open PuTTY**
   - Search for "PuTTY" in Windows Start menu

2. **In the PuTTY Configuration window:**

   **Session Category (default view):**
   - **Host Name (or IP address):** Enter `ubuntu@YOUR_PUBLIC_IP`
     - Replace `YOUR_PUBLIC_IP` with your EC2 instance's Public IP
     - Example: `ubuntu@54.123.45.67`
     - Or use Public DNS: `ubuntu@ec2-54-123-45-67.compute-1.amazonaws.com`
   
   - **Port:** `22` (default SSH port)
   - **Connection type:** Select **SSH** (should be default)

### Configure SSH Key:

1. **In the left panel, expand:** Connection → SSH → Auth

2. **Click "Auth"** in the tree

3. **Under "Authentication parameters":**
   - Click **"Browse..."** next to "Private key file for authentication"
   - Navigate to and select your `.ppk` key file
   - Click **"Open"**

### Save Your Session (Recommended):

1. **Go back to "Session"** in the left panel

2. **Under "Saved Sessions":**
   - Type a name: `Healthcare App EC2` (or any name you prefer)
   - Click **"Save"** button
   - Your session settings are now saved

3. **Click "Open"** to connect

---

## ✅ Step 3: Connect to EC2

1. **Click "Open"** button in PuTTY

2. **First-time connection warning:**
   - You'll see: "PuTTY Security Alert - The server's host key is not cached"
   - Click **"Yes"** to accept and cache the host key
   - (This only happens the first time you connect)

3. **If connection is successful:**
   - You should see a terminal window
   - You'll see a prompt like: `ubuntu@ip-xxx-xxx-xxx-xxx:~$`
   - You're now connected to your EC2 instance!

---

## 💻 Basic PuTTY Commands

### Navigation:
```bash
pwd                    # Show current directory
ls                     # List files in current directory
ls -la                 # List all files with details
cd /var/www            # Change to /var/www directory
cd ~                   # Go to home directory
cd ..                  # Go to parent directory
```

### File Operations:
```bash
nano filename          # Open file in nano editor
cat filename           # Display file contents
sudo apt update        # Update package list
sudo apt upgrade -y    # Upgrade packages
```

### Nano Editor Tips:
- **Edit text:** Just type normally
- **Save:** Press `Ctrl+O`, then `Enter`
- **Exit:** Press `Ctrl+X`
- **Cancel:** Press `Ctrl+X`, then `N` when asked to save

### System Commands:
```bash
sudo systemctl status nginx    # Check Nginx status
sudo systemctl restart nginx   # Restart Nginx
sudo systemctl start nginx     # Start Nginx
sudo systemctl stop nginx      # Stop Nginx
```

---

## 🛠️ Step 4: Initial Server Setup Commands

Once connected, run these commands to set up your server:

### 1. Update System:
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Verify installation
npm --version   # Verify npm
```

### 3. Install Nginx:
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx  # Check if running
```

### 4. Create Application Directory:
```bash
sudo mkdir -p /var/www/healthcare-app
sudo chown -R ubuntu:ubuntu /var/www/healthcare-app
cd /var/www/healthcare-app
```

---

## 🔄 Reconnecting Later

1. **Open PuTTY**
2. **Select your saved session** from the list
3. **Click "Load"** to load saved settings
4. **Click "Open"** to connect

You can also double-click your saved session name to connect directly.

---

## 🛠️ Troubleshooting

### Connection Issues:

**Problem:** "Network error: Connection refused"
- **Solution:**
  - Check your EC2 instance is running in AWS Console
  - Verify Security Group allows SSH (port 22) from your IP
  - Check that you're using the correct Public IP address

**Problem:** "Access denied" or "Authentication failed"
- **Solution:**
  - Verify username is `ubuntu` (for Ubuntu AMI)
  - Make sure you've selected the correct `.ppk` key file in PuTTY settings
  - Verify the key file was converted correctly from `.pem` to `.ppk`

**Problem:** "Server's host key does not match"
- **Solution:**
  - You might be connecting to a different server
  - Delete the cached host key: In PuTTY, go to Connection → SSH → Host Keys → Remove the entry for your hostname
  - Try connecting again

**Problem:** "Connection timeout"
- **Solution:**
  - Check your internet connection
  - Verify Security Group settings
  - Make sure your EC2 instance has a public IP address

### Key Issues:

**Problem:** "Couldn't load private key"
- **Solution:**
  - Make sure you converted the `.pem` to `.ppk` format using PuTTYgen
  - Verify the key file path is correct
  - Try converting the key again

---

## 💡 Pro Tips

1. **Copy/Paste in PuTTY:**
   - **Copy:** Select text (it's automatically copied)
   - **Paste:** Right-click in the PuTTY window

2. **Adjust Font Size:**
   - Right-click on PuTTY window → Change Settings → Window → Appearance
   - Adjust font size for better readability

3. **Change Colors:**
   - Window → Colours → Adjust for better visibility

4. **Save Logs:**
   - Session → Logging → Enable session logging
   - Useful for debugging and keeping records

5. **Keep Connection Alive:**
   - Connection → Seconds between keepalives: Set to `60`
   - Prevents connection from timing out during inactivity

---

## 🔒 Security Best Practices

1. **Use Key-Based Authentication Only:**
   - Never enable password authentication
   - Always use your `.ppk` key file

2. **Keep Your Key Secure:**
   - Store `.ppk` file in a secure location
   - Never share your private key

3. **Limit SSH Access:**
   - In Security Group, only allow SSH from your specific IP
   - Not from "Anywhere" (0.0.0.0/0)

4. **Regular Updates:**
   - Run `sudo apt update && sudo apt upgrade` regularly
   - Keep your system secure

---

## 📚 Common Commands Reference

### File Permissions (Important for Deployment):
```bash
sudo chown -R www-data:www-data /var/www/healthcare-app
sudo chmod -R 755 /var/www/healthcare-app
```

### Nginx Management:
```bash
sudo nginx -t                          # Test Nginx configuration
sudo systemctl restart nginx           # Restart Nginx
sudo tail -f /var/log/nginx/error.log # View error logs
sudo tail -f /var/log/nginx/access.log # View access logs
```

### Directory Operations:
```bash
ls -la                                 # List files with permissions
cd /path/to/directory                  # Change directory
mkdir newfolder                        # Create directory
rm filename                            # Delete file
rm -rf foldername                      # Delete folder (be careful!)
```

### Process Management:
```bash
htop                                   # Monitor system (install first: sudo apt install htop)
df -h                                  # Check disk space
free -h                                # Check memory
```

---

**Need more help?** 
- See `EC2_DEPLOYMENT_GUIDE.md` for complete deployment instructions
- See `WINSCP_CONNECTION_GUIDE.md` for file transfer instructions

