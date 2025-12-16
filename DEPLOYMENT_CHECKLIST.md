# ✅ EC2 Deployment Checklist

Use this checklist to ensure a smooth deployment process.

---

## 📋 Pre-Deployment

- [ ] AWS account created and active
- [ ] PuTTY installed ([Download](https://www.putty.org/))
- [ ] WinSCP installed ([Download](https://winscp.net/eng/download.php))
- [ ] Node.js installed locally (for building)
- [ ] Project dependencies installed (`npm install`)

---

## 🖥️ EC2 Instance Setup

- [ ] EC2 instance created (Ubuntu 22.04 LTS recommended)
- [ ] Security Group configured:
  - [ ] SSH (port 22) - from your IP
  - [ ] HTTP (port 80) - from anywhere
  - [ ] HTTPS (port 443) - from anywhere (optional)
  - [ ] Custom TCP (port 3000) - from anywhere (optional, for testing)
- [ ] Key pair created and `.pem` file downloaded
- [ ] Instance Public IP and DNS noted

---

## 🔑 Key Preparation

- [ ] `.pem` key converted to `.ppk` using PuTTYgen
- [ ] `.ppk` file saved in a secure location
- [ ] Tested PuTTY connection (can SSH into instance)

---

## 🏗️ Server Initial Setup (via PuTTY)

- [ ] System updated (`sudo apt update && sudo apt upgrade -y`)
- [ ] Node.js installed (v18.x or later)
- [ ] Nginx installed and running
- [ ] Application directory created (`/var/www/healthcare-app`)
- [ ] Directory permissions set correctly

---

## 📦 Local Build Preparation

- [ ] Project built successfully (`npm run build`)
- [ ] `out` folder generated and verified
- [ ] `package.json` and `package-lock.json` ready
- [ ] Environment variables documented (if any)

---

## 📤 File Transfer (via WinSCP)

- [ ] WinSCP connected successfully to EC2 instance
- [ ] Remote directory `/var/www/healthcare-app` accessible
- [ ] `out` folder uploaded completely
- [ ] `package.json` uploaded
- [ ] `package-lock.json` uploaded
- [ ] All files transferred without errors

---

## ⚙️ Server Configuration (via PuTTY)

- [ ] Nginx configuration file created
- [ ] Nginx configuration file points to correct directory
- [ ] Nginx configuration file enabled (symlink created)
- [ ] Default Nginx site removed
- [ ] Nginx configuration tested (`sudo nginx -t`)
- [ ] Nginx restarted successfully
- [ ] File permissions set correctly:
  - [ ] Ownership: `www-data:www-data`
  - [ ] Permissions: `755`

---

## ✅ Testing & Verification

- [ ] Website accessible via HTTP (`http://YOUR_PUBLIC_IP`)
- [ ] Homepage loads correctly
- [ ] All routes/pages working
- [ ] Static assets loading (images, CSS, JS)
- [ ] No 404 errors in browser console
- [ ] Mobile/responsive design working

---

## 🔒 Post-Deployment (Optional but Recommended)

- [ ] SSL certificate configured (HTTPS)
- [ ] Custom domain configured (if applicable)
- [ ] Firewall (UFW) configured
- [ ] Backup strategy implemented
- [ ] Monitoring/logging setup
- [ ] Documentation updated with production URLs

---

## 🔄 Update Process (Future Deployments)

- [ ] Local build completed
- [ ] Old files backed up on server (optional)
- [ ] New `out` folder uploaded via WinSCP
- [ ] Permissions reset
- [ ] Nginx restarted
- [ ] Changes tested and verified

---

## 📝 Notes Section

**Public IP:** _________________________

**Public DNS:** _________________________

**Key Pair Name:** _________________________

**Deployment Date:** _________________________

**Any Issues Encountered:**
```
[Write notes here]
```

---

## 🆘 Troubleshooting Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| Can't connect via PuTTY | Check Security Group, verify IP, check key file |
| Can't connect via WinSCP | Use SFTP protocol, verify credentials |
| 404 errors | Check Nginx config, verify file paths, check permissions |
| Permission denied | Run `sudo chown -R www-data:www-data /var/www/healthcare-app` |
| Nginx won't start | Run `sudo nginx -t` to check config, check logs |

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

