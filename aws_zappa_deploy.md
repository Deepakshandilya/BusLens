# 🚀 AWS Deployment Guide for BusLens

This guide covers setting up **AWS CLI, Zappa (Flask API on AWS Lambda), S3 (Static Website Hosting), and CORS Fixes** for deploying BusLens.

---

## **1️⃣ Install & Configure AWS CLI**
### **Download & Install AWS CLI**  
🔗 [Download AWS CLI](https://awscli.amazonaws.com/AWSCLIV2.msi) (Windows)  
For macOS/Linux, install via Homebrew or package manager:
```bash
brew install awscli   # macOS
sudo apt install awscli  # Ubuntu/Debian
```

### **Configure AWS CLI**
Run the following command and enter your credentials:
```bash
aws configure
```
✅ Required Inputs:
- **AWS Access Key ID**  
- **AWS Secret Access Key**  
- **Default region name** → `ap-south-1` (Mumbai)  
- **Default output format** → Leave blank (Press Enter)  

Verify installation:
```bash
aws --version
aws sts get-caller-identity
```

---

## **2️⃣ Deploy Flask API with Zappa (AWS Lambda + API Gateway)**
### **Install Dependencies & Initialize Zappa**
```bash
pip install virtualenv flask zappa flask-cors pymysql python-dotenv
virtualenv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
zappa init
```

### **Update `zappa_settings.json`**
```json
{
    "dev": {
        "app_function": "app.app",
        "aws_region": "ap-south-1",
        "s3_bucket": "your-s3-bucket-name",
        "runtime": "python3.12"
    }
}
```

### **Deploy Flask API**
```bash
zappa deploy dev
```
✅ Zappa will generate an API Gateway URL like:  
```
https://xyz123.execute-api.ap-south-1.amazonaws.com/dev
```
Test API:
```bash
curl -X GET "https://xyz123.execute-api.ap-south-1.amazonaws.com/dev/"
```

### **Update Flask API**
```bash
zappa update dev
```

---

## **3️⃣ Deploy Frontend (HTML, CSS, JS) on AWS S3**
### **Create S3 Bucket**
1. Go to **AWS Console** → **S3** → **Create Bucket**  
2. **Bucket Name:** `bucket-name`  
3. **AWS Region:** `ap-south-1` (Mumbai)  
4. **Block Public Access:** **Uncheck** (Allow public access)  
5. **Enable Static Website Hosting**  
6. **Index Document:** `index.html`  

### **Upload Frontend Files**
```bash
aws s3 cp index.html s3://bucket-name/ --acl public-read
aws s3 cp style.css s3://bucket-name/ --acl public-read
aws s3 cp script.js s3://bucket-name/ --acl public-read
```
✅ Your website URL:  
```
http://your-busket-name.s3-website.ap-south-1.amazonaws.com
```

---

## **4️⃣ Fix CORS Issues (API & S3)**
### **Enable CORS in Flask API**
Modify `app.py`:
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Allow all origins
```
Redeploy API:
```bash
zappa update dev
```

### **Enable CORS in API Gateway**
1. Open **AWS API Gateway** → Select API
2. Click **Actions** → **Enable CORS**
3. **Allowed Origins:** `http://bucket-name.s3-website.ap-south-1.amazonaws.com`
4. **Allowed Methods:** `GET, POST, OPTIONS`
5. Click **Deploy API**

### **Enable CORS in S3**
Go to **S3** → **Permissions** → **CORS Policy** → Add:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "POST"],
    "AllowedOrigins": ["*"]
  }
]
```

---

## **5️⃣ Updating Backend & Frontend**
### **Update Flask API (Backend - Zappa)**
```bash
zappa update dev
```

### **Update Frontend (S3 - HTML, CSS, JS)**
```bash
aws s3 cp index.html s3://bucket-name/ --acl public-read
```

---

## **🎯 Final Project Flow**
| **Component** | **Service Used** | **Purpose** |
|--------------|----------------|------------|
| **Backend (Flask API)** | AWS Lambda + API Gateway | Handles API requests |
| **Frontend (Static Website)** | AWS S3 | Displays UI & calls API |
| **CORS Handling** | Flask-CORS, API Gateway, S3 | Ensures smooth frontend-backend communication |

---
