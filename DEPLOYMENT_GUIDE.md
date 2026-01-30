# 🚀 Deployment Guide: Vercel + Supabase Auth

## 📋 Prerequisites

1. **Vercel Account** - [vercel.com](https://vercel.com)
2. **Supabase Account** - [supabase.com](https://supabase.com)
3. **GitHub Account** - [github.com](https://github.com)

## 🔧 Step 1: Set Up Supabase

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name:** `windows95-mental-health-monitor`
   - **Database Password:** (generate a strong password)
   - **Region:** Choose closest to your users
5. Click "Create new project"

### 1.2 Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

### 1.3 Enable Email Auth
1. Go to **Authentication** → **Settings**
2. Enable **Email auth**
3. Configure email templates if desired

## 🚀 Step 2: Deploy to Vercel

### 2.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Add Supabase authentication"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/windows95-mental-health-monitor.git
git push -u origin main
```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 2.3 Add Environment Variables
1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Click "Save"

### 2.4 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## 🔐 Step 3: Test Authentication

### 3.1 Test Sign Up
1. Visit your deployed app
2. Click "Sign In"
3. Click "Sign Up" in the modal
4. Enter email and password
5. Check your email for confirmation

### 3.2 Test Sign In
1. Use the credentials you just created
2. Sign in successfully
3. Verify you can access the app

## 🛠️ Step 4: Database Setup (Optional)

### 4.1 Create Tables for User Data
```sql
-- Create table for user mental health data
CREATE TABLE user_mental_health_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slider_values JSONB,
  environment_checkboxes JSONB,
  timeline_events JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_mental_health_data ENABLE ROW LEVEL SECURITY;

-- Create policy for users to access only their data
CREATE POLICY "Users can view own data" ON user_mental_health_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON user_mental_health_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON user_mental_health_data
  FOR UPDATE USING (auth.uid() = user_id);
```

## 🔧 Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable HTTPS

## 📊 Step 6: Monitoring

### 6.1 Supabase Monitoring
1. In Supabase dashboard, go to **Logs**
2. Monitor authentication and database activity
3. Set up alerts for errors

## 🚨 Troubleshooting

### Common Issues:

1. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Redeploy after adding variables
   - Check browser console for errors

2. **Authentication Not Working**
   - Verify Supabase URL and key are correct
   - Check Supabase dashboard for auth settings
   - Ensure email confirmation is enabled

3. **Build Failures**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files to git
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Supabase Security**
   - Enable Row Level Security (RLS)
   - Use service role keys only on server
   - Monitor auth logs regularly

3. **App Security**
   - Validate all user inputs
   - Implement proper error handling
   - Use HTTPS in production

## 📈 Next Steps

1. **Add Database Integration**
   - Save user data to Supabase
   - Implement data synchronization
   - Add data export functionality

2. **Enhance Authentication**
   - Add social login (Google, GitHub)
   - Implement password reset
   - Add two-factor authentication

3. **Add Features**
   - Data visualization
   - Export reports
   - Share data with healthcare providers

## 🎉 Success!

Your Windows 95 Mental Health Monitor is now deployed with:
- ✅ Vercel hosting
- ✅ Supabase authentication
- ✅ Secure environment variables
- ✅ Production-ready setup

The app is now live and ready for users! 🚀
