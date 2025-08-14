# 🚀 Git + Netlify Deployment Guide

## ✅ Your Site is Ready for Git + Netlify Deployment!

This is the best approach - you'll get automatic deployments every time you update your code.

## 📋 Pre-Deployment Checklist

✅ **Configuration Updated**:
- Email: `inkedbyvalhalla@gmail.com`
- Instagram: `https://www.instagram.com/valhallatattoollc/`
- Facebook: `https://www.facebook.com/Valhallatattoollc`
- Contact forms: Configured for Netlify Forms
- Portfolio folders: Created for all artists

## 🔧 Step 1: Initialize Git Repository

If you haven't already, run these commands in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit - Valhalla Tattoo website ready for deployment"
```

## 📤 Step 2: Push to GitHub

### Option A: Create New Repository on GitHub
1. **Go to [github.com](https://github.com)**
2. **Click "New Repository"**
3. **Name it**: `valhalla-tattoo-website`
4. **Make it Public** (or Private if you prefer)
5. **Don't initialize with README** (you already have files)
6. **Copy the repository URL**

### Option B: Use GitHub Desktop (Easier)
1. **Download GitHub Desktop**
2. **Add your project folder**
3. **Publish to GitHub**

### Push Your Code:
```bash
# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/valhalla-tattoo-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Deploy to Netlify

### Connect GitHub to Netlify:
1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login**
3. **Click "New site from Git"**
4. **Choose "GitHub"**
5. **Authorize Netlify to access your repos**
6. **Select your `valhalla-tattoo-website` repository**

### Configure Build Settings:
- **Branch to deploy**: `main`
- **Build command**: `npm run build` (or leave empty)
- **Publish directory**: `.` (root directory)
- **Click "Deploy site"**

## ⚡ Step 4: Configure Netlify Settings

### After Your Site Deploys:

1. **Site Settings**:
   - Go to Site settings → General
   - Change site name to something memorable like `valhalla-tattoo`
   - Your URL will be `https://valhalla-tattoo.netlify.app`

2. **Forms Setup**:
   - Go to Forms in your Netlify dashboard
   - You should see your contact form listed
   - Set up email notifications:
     - Click on the form
     - Go to Settings & usage
     - Add notification email: `inkedbyvalhalla@gmail.com`

3. **Domain Setup** (Optional):
   - If you have a custom domain, go to Domain settings
   - Add your domain and follow DNS instructions
   - SSL certificate will be automatic

## 🔄 Step 5: Test Everything

### Immediate Tests:
- [ ] **Visit your live site**
- [ ] **Test contact form** (submit a test inquiry)
- [ ] **Check social media links**
- [ ] **Test on mobile device**
- [ ] **Verify all artist pages load**

### Check Netlify Dashboard:
- [ ] **Forms tab** - should show your test submission
- [ ] **Deploy tab** - should show successful deployment
- [ ] **Functions tab** - should be empty (not using functions)

## 📧 Step 6: Set Up Form Notifications

1. **In Netlify Dashboard → Forms**
2. **Click on your contact form**
3. **Go to "Settings & usage"**
4. **Add email notification**:
   - Email: `inkedbyvalhalla@gmail.com`
   - Event: "New form submission"
5. **Save settings**

## 🔄 Future Updates

**The beauty of this setup**:
- Make changes to your code locally
- Commit and push to GitHub: `git add . && git commit -m "Update" && git push`
- Netlify automatically rebuilds and deploys your site
- Changes are live in 1-2 minutes

## 📸 Adding Portfolio Images Later

**When you're ready to add portfolio images**:

1. **Add images to the correct folders**:
   ```
   images/portfolio/pagan/your-image.jpg
   images/portfolio/micah/your-image.jpg
   etc.
   ```

2. **Update the artist data** (I can help with this)

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add portfolio images"
   git push
   ```

4. **Site updates automatically**

## 🆘 Troubleshooting

### **Build Fails?**
- Check the deploy log in Netlify
- Most likely cause: missing files or syntax errors
- Contact me if you need help

### **Forms Not Working?**
- Check that form has `data-netlify="true"` ✅ (already set)
- Verify email notifications are configured
- Check spam folder

### **Images Not Loading?**
- Verify file paths are correct
- Check that images are committed to Git
- Clear browser cache

## 📊 Monitoring Your Site

**Netlify provides**:
- **Analytics**: Visitor stats
- **Forms**: Submission tracking  
- **Deploy logs**: Build history
- **Performance**: Site speed metrics

## 🎯 Next Steps

1. **Deploy now** following the steps above
2. **Test the contact form**
3. **Add portfolio images when ready**
4. **Start promoting your new website!**

## 📞 Need Help?

**Common Issues**:
- Git/GitHub setup problems
- Netlify configuration questions
- Form submission issues
- Image upload questions

**Resources**:
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Guides](https://guides.github.com/)
- Contact me for technical support

Your website is professional and ready to bring in business. Let's get it live!