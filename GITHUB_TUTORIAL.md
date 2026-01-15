# 🚀 Complete GitHub Tutorial for StarMaker Project

## 📚 Table of Contents
1. [Initial Setup](#1-initial-setup)
2. [First Commit and Push](#2-first-commit-and-push)
3. [Creating and Working with Branches](#3-creating-and-working-with-branches)
4. [Commit Examples for Each Branch](#4-commit-examples-for-each-branch)
5. [Merging Branches into Main](#5-merging-branches-into-main)
6. [Merge Conflicts](#6-merge-conflicts)
7. [Final Push Workflow](#7-final-push-workflow)

---

## 1. Initial Setup

### Step 1.1: Install Git (if not installed)
- **Windows**: Download from https://git-scm.com/download/win
- **Mac**: Run `brew install git` or download from website
- **Linux**: `sudo apt-get install git` (Ubuntu/Debian)

### Step 1.2: Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 1.3: Check if Git is Already Initialized
```bash
cd C:\Users\HP\OneDrive\Desktop\StarMaker
git status
```

**If you see**: `fatal: not a git repository` → Git is NOT initialized yet  
**If you see**: Branch info → Git is already initialized

---

## 2. First Commit and Push

### Step 2.1: Initialize Git Repository
```bash
cd C:\Users\HP\OneDrive\Desktop\StarMaker
git init
```

This creates a `.git` folder in your project (hidden folder).

### Step 2.2: Create `.gitignore` File
Create a file named `.gitignore` in the root directory with this content:

```gitignore
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
*.log

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Database
*.sqlite
*.db

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
```

### Step 2.3: Stage All Files (First Time)
```bash
git add .
```

This adds all files to the staging area (except those in `.gitignore`).

### Step 2.4: Make Your First Commit
```bash
git commit -m "Initial commit: StarMaker coaching institute project setup"
```

**Commit Message Best Practices:**
- Use present tense: "Add feature" not "Added feature"
- Be descriptive but concise
- Capitalize first letter
- No period at the end

### Step 2.5: Create GitHub Repository
1. Go to https://github.com
2. Click the **+** icon (top right) → **New repository**
3. Name: `StarMaker` (or `starmaker-coaching`)
4. Description: "Full-stack coaching institute management system"
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **Create repository**

### Step 2.6: Connect Local to GitHub
GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/StarMaker.git

# Verify remote is added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username.

**If authentication fails**, use Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use token as password when pushing

---

## 3. Creating and Working with Branches

### Step 3.1: Check Current Branch
```bash
git branch
```

You should see: `* main` (the `*` means you're currently on main branch)

### Step 3.2: Create Feature Branches

**Create feature-ui branch:**
```bash
git checkout -b feature-ui
```

**Create feature-auth branch:**
```bash
git checkout main
git checkout -b feature-auth
```

**Create feature-database branch:**
```bash
git checkout main
git checkout -b feature-database
```

**Quick command to list all branches:**
```bash
git branch -a
```

### Step 3.3: Switch Between Branches
```bash
# Switch to main branch
git checkout main

# Switch to feature-ui branch
git checkout feature-ui

# Switch to feature-auth branch
git checkout feature-auth

# Switch to feature-database branch
git checkout feature-database
```

**Modern alternative (Git 2.23+):**
```bash
git switch main
git switch feature-ui
```

---

## 4. Commit Examples for Each Branch

### Branch: `feature-ui`

**Example 1: Add Home Page**
```bash
git checkout feature-ui

# Make changes to frontend/src/pages/Home.jsx
# Save the file

git add frontend/src/pages/Home.jsx
git commit -m "Add Home page with hero section and CTA buttons"

git push origin feature-ui
```

**Example 2: Add Navbar Component**
```bash
git add frontend/src/components/Navbar.jsx frontend/src/components/Navbar.css
git commit -m "Create reusable Navbar component with responsive design"

git push origin feature-ui
```

**Example 3: Update Styling**
```bash
git add frontend/src/App.css frontend/src/index.css
git commit -m "Update global styles with gradient themes and animations"

git push origin feature-ui
```

---

### Branch: `feature-auth`

**Example 1: Add Login Page**
```bash
git checkout feature-auth

git add frontend/src/pages/Login.jsx frontend/src/pages/Auth.css
git commit -m "Implement Login page with form validation"

git push origin feature-auth
```

**Example 2: Add Backend Auth Routes**
```bash
git add backend/src/routes/authRoutes.js backend/src/controllers/authController.js
git commit -m "Add authentication routes and controller for login/register"

git push origin feature-auth
```

**Example 3: Implement JWT Authentication**
```bash
git add backend/src/utils/jwt.js backend/src/middleware/authJwt.js
git commit -m "Add JWT token generation and authentication middleware"

git push origin feature-auth
```

**Example 4: Connect Frontend to Backend API**
```bash
git add frontend/src/api/api.js
git commit -m "Create API service with axios for authentication endpoints"

git push origin feature-auth
```

---

### Branch: `feature-database`

**Example 1: Create Database Schema**
```bash
git checkout feature-database

git add backend/database/schema.sql
git commit -m "Create database schema with users and otps tables"

git push origin feature-database
```

**Example 2: Add Database Configuration**
```bash
git add backend/src/config/db.js
git commit -m "Add MySQL database connection pool configuration"

git push origin feature-database
```

**Example 3: Implement Database Migrations**
```bash
git add backend/database/migrations/
git commit -m "Add database migration scripts for version control"

git push origin feature-database
```

---

## 5. Merging Branches into Main

### Step 5.1: Merge feature-ui into main

```bash
# Switch to main branch
git checkout main

# Pull latest changes (if working with team)
git pull origin main

# Merge feature-ui branch
git merge feature-ui

# If merge is successful, push to GitHub
git push origin main
```

**Merge commit message will appear:**
```
Merge branch 'feature-ui' into main
```

### Step 5.2: Merge feature-auth into main

```bash
git checkout main
git pull origin main  # Get latest changes

git merge feature-auth

# Resolve any conflicts (see section 6)
git push origin main
```

### Step 5.3: Merge feature-database into main

```bash
git checkout main
git pull origin main

git merge feature-database
git push origin main
```

### Step 5.4: Delete Merged Branches (Optional)

After merging, you can delete the feature branch:

```bash
# Delete local branch
git branch -d feature-ui

# Delete remote branch
git push origin --delete feature-ui
```

---

## 6. Merge Conflicts

### What are Merge Conflicts?

Merge conflicts happen when:
- Two branches modify the same lines in the same file
- Git doesn't know which version to keep
- You must manually decide what to keep

### Step 6.1: Identify Conflicts

When you run `git merge feature-auth`, you might see:
```
Auto-merging backend/src/controllers/authController.js
CONFLICT (content): Merge conflict in backend/src/controllers/authController.js
Automatic merge failed; fix conflicts and then commit the result.
```

### Step 6.2: View Conflicts in Cursor

1. **Open the conflicted file** in Cursor
2. You'll see conflict markers:

```javascript
<<<<<<< HEAD
// Code from main branch
const PORT = 5000;
=======
// Code from feature-auth branch
const PORT = process.env.PORT || 5000;
>>>>>>> feature-auth
```

### Step 6.3: Resolve Conflicts in Cursor

**Method 1: Manual Resolution**
1. Look for conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
2. Decide which code to keep (or combine both)
3. Delete the conflict markers
4. Keep the correct code

**Example - Keep both changes:**
```javascript
// Before (with conflicts)
<<<<<<< HEAD
const PORT = 5000;
=======
const PORT = process.env.PORT || 5000;
>>>>>>> feature-auth

// After (resolved)
const PORT = process.env.PORT || 5000;
```

**Method 2: Using Cursor's Conflict Resolution UI**
1. Cursor will show conflict buttons: **Accept Current**, **Accept Incoming**, **Accept Both**
2. Click the appropriate button
3. Review the changes
4. Save the file

### Step 6.4: Mark Conflicts as Resolved

After fixing all conflicts:

```bash
# Stage the resolved files
git add backend/src/controllers/authController.js

# Complete the merge
git commit -m "Merge feature-auth into main - resolved conflicts"

# Push to GitHub
git push origin main
```

### Step 6.5: Abort Merge (If Needed)

If conflicts are too complex, you can cancel the merge:

```bash
git merge --abort
```

---

## 7. Final Push Workflow

### Recommended Daily Workflow

**Morning - Start Working:**
```bash
# 1. Switch to main and get latest changes
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature-auth

# 3. Update your branch with latest main (optional but recommended)
git merge main
```

**During Development:**
```bash
# Make changes, save files

# Stage specific files
git add backend/src/controllers/authController.js

# Commit with descriptive message
git commit -m "Add email validation in forgot password endpoint"

# Push to remote branch
git push origin feature-auth
```

**End of Day:**
```bash
# Commit any remaining changes
git add .
git commit -m "Save progress: implemented OTP email sending"

# Push to remote
git push origin feature-auth
```

### Final Push Workflow (When Feature is Complete)

**Step 1: Ensure Your Branch is Up to Date**
```bash
git checkout feature-auth
git pull origin feature-auth  # Get latest from remote
```

**Step 2: Merge Latest Main into Your Branch**
```bash
git merge main
# Resolve any conflicts if they occur
git push origin feature-auth
```

**Step 3: Switch to Main and Merge**
```bash
git checkout main
git pull origin main  # Ensure main is latest
git merge feature-auth
```

**Step 4: Resolve Conflicts (if any)**
```bash
# Fix conflicts in Cursor (see section 6)
git add .
git commit -m "Merge feature-auth: complete authentication system"
```

**Step 5: Push to GitHub**
```bash
git push origin main
```

**Step 6: Clean Up (Optional)**
```bash
# Delete local branch
git branch -d feature-auth

# Delete remote branch
git push origin --delete feature-auth
```

---

## 🎯 Quick Reference Commands

### Essential Commands
```bash
# Status
git status                    # Check what files changed
git log --oneline            # View commit history

# Staging
git add .                    # Stage all files
git add file.js              # Stage specific file
git add folder/              # Stage entire folder

# Committing
git commit -m "Message"      # Commit staged changes
git commit -am "Message"     # Stage and commit (only tracked files)

# Pushing/Pulling
git push origin branch-name  # Push to remote
git pull origin branch-name  # Pull from remote

# Branches
git branch                   # List local branches
git branch -a                # List all branches
git checkout -b new-branch   # Create and switch to branch
git checkout branch-name     # Switch to branch
git branch -d branch-name    # Delete local branch

# Merging
git merge branch-name        # Merge branch into current branch
git merge --abort            # Cancel merge
```

---

## ✅ Checklist Before First Push

- [ ] Git is installed and configured
- [ ] `.gitignore` file is created
- [ ] Git repository is initialized (`git init`)
- [ ] All files are staged (`git add .`)
- [ ] First commit is made (`git commit`)
- [ ] GitHub repository is created
- [ ] Remote is added (`git remote add origin`)
- [ ] First push is successful (`git push -u origin main`)

---

## 🎓 Best Practices

1. **Commit Often**: Make small, frequent commits
2. **Write Good Messages**: Be descriptive about what changed
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Use Branches**: Never commit directly to main for features
5. **Test Before Merge**: Ensure your code works before merging
6. **Review Changes**: Use `git status` and `git diff` before committing

---

## 🆘 Common Issues & Solutions

### Issue: "Please tell me who you are"
**Solution**: Run git config commands (see Step 1.2)

### Issue: "Authentication failed"
**Solution**: Use Personal Access Token instead of password

### Issue: "Branch is behind"
**Solution**: Run `git pull origin main` before merging

### Issue: "Merge conflict"
**Solution**: Follow section 6 to resolve conflicts

### Issue: "Nothing to commit"
**Solution**: Make changes to files first, then stage them

---

**Happy Coding! 🚀**
