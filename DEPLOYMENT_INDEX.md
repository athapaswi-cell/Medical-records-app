# 📚 EC2 Deployment Documentation Index

Welcome! This directory contains all the documentation you need to deploy your Healthcare App to AWS EC2 using WinSCP and PuTTY.

---

## 🚀 Quick Start Guide

**New to EC2 deployment?** Start here:

👉 **[EC2_QUICK_START.md](EC2_QUICK_START.md)** - Step-by-step quick start guide

This guide walks you through the entire deployment process from start to finish in the fastest way possible.

---

## 📖 Documentation Files

### For Beginners:

1. **[EC2_QUICK_START.md](EC2_QUICK_START.md)**
   - Fast deployment guide
   - Essential steps only
   - Perfect for first-time deployment

2. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)**
   - Printable checklist
   - Track your progress
   - Ensure nothing is missed

3. **[PUTTY_CONNECTION_GUIDE.md](PUTTY_CONNECTION_GUIDE.md)**
   - Detailed PuTTY setup instructions
   - First-time PuTTY user? Start here!
   - Common commands reference

4. **[WINSCP_CONNECTION_GUIDE.md](WINSCP_CONNECTION_GUIDE.md)**
   - Detailed WinSCP setup instructions
   - File transfer walkthrough
   - Troubleshooting tips

### For Advanced Users:

5. **[EC2_DEPLOYMENT_GUIDE.md](EC2_DEPLOYMENT_GUIDE.md)**
   - Comprehensive deployment guide
   - SSL certificate setup
   - Advanced configurations
   - Monitoring and backup strategies

---

## 🛠️ Build Scripts

### Windows:
- **[build-for-ec2.bat](build-for-ec2.bat)** - Build script for Windows
  - Run this to prepare your app for deployment
  - Automatically installs dependencies and builds

---

## 📋 Deployment Workflow Summary

```
┌─────────────────────────────────────────┐
│  1. Build Your App (Windows)            │
│     → Run: build-for-ec2.bat            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. Setup EC2 Instance (AWS Console)    │
│     → Create instance, configure SG     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Convert Key (PuTTYgen)              │
│     → Convert .pem to .ppk              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. Initial Server Setup (PuTTY)        │
│     → Install Node.js, Nginx            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. Upload Files (WinSCP)               │
│     → Transfer out folder, package.json │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  6. Configure Nginx (PuTTY)             │
│     → Create config, enable site        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  7. Test & Verify                       │
│     → Visit http://YOUR_PUBLIC_IP       │
└─────────────────────────────────────────┘
```

---

## 🎯 Which Guide Should I Use?

### "I want to deploy quickly and get it done"
→ Use **[EC2_QUICK_START.md](EC2_QUICK_START.md)**

### "I want to make sure I don't miss anything"
→ Use **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** alongside your chosen guide

### "I've never used PuTTY before"
→ Read **[PUTTY_CONNECTION_GUIDE.md](PUTTY_CONNECTION_GUIDE.md)** first

### "I've never used WinSCP before"
→ Read **[WINSCP_CONNECTION_GUIDE.md](WINSCP_CONNECTION_GUIDE.md)** first

### "I want detailed documentation with all options"
→ Use **[EC2_DEPLOYMENT_GUIDE.md](EC2_DEPLOYMENT_GUIDE.md)**

### "I just need help with one specific thing"
→ Use the appropriate guide from the list above

---

## 🆘 Getting Help

### Common Issues:

| Issue | Where to Look |
|-------|---------------|
| Can't connect with PuTTY | [PUTTY_CONNECTION_GUIDE.md](PUTTY_CONNECTION_GUIDE.md) → Troubleshooting |
| Can't connect with WinSCP | [WINSCP_CONNECTION_GUIDE.md](WINSCP_CONNECTION_GUIDE.md) → Troubleshooting |
| Website not loading | [EC2_DEPLOYMENT_GUIDE.md](EC2_DEPLOYMENT_GUIDE.md) → Troubleshooting |
| Build errors | Check Node.js version, run `npm install` again |
| Permission errors | [EC2_QUICK_START.md](EC2_QUICK_START.md) → Step 6 |

---

## 📦 Files You'll Need

Before starting deployment, make sure you have:

- ✅ AWS account
- ✅ PuTTY installed
- ✅ WinSCP installed
- ✅ Your EC2 instance Public IP
- ✅ Your `.pem` key file from AWS
- ✅ Node.js installed locally (for building)

---

## 🔄 Update Process

For future updates after initial deployment:

1. **Build locally:** Run `build-for-ec2.bat`
2. **Upload via WinSCP:** Upload new `out` folder
3. **Set permissions via PuTTY:** 
   ```bash
   sudo chown -R www-data:www-data /var/www/healthcare-app
   sudo chmod -R 755 /var/www/healthcare-app
   sudo systemctl restart nginx
   ```

---

## 🎉 Ready to Deploy?

**Recommended Path:**
1. Read **[EC2_QUICK_START.md](EC2_QUICK_START.md)**
2. Use **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** to track progress
3. Refer to connection guides if you get stuck
4. Use comprehensive guide for advanced features

**Good luck with your deployment! 🚀**

