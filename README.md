# 🚀 BusLens: Smart Bus Route Finder 

BusLens is a **smart bus route search system** that allows users to find buses between two locations in **Chandigarh, Mohali, and nearby areas**. The system uses **AWS for deployment**, with a **Flask API on AWS Lambda** and a **frontend hosted on S3**.

---

## **🛠️ Tech Stack**

| Component    | Technology Used |
|-------------|----------------|
| **Frontend** | HTML, CSS, JavaScript (Hosted on AWS S3) |
| **Backend**  | Flask, Python (Deployed with Zappa on AWS Lambda) |
| **Database** | MySQL (AWS RDS) |
| **Hosting**  | AWS S3, API Gateway |

---

## **🌍 Features**
✅ Find buses between any two locations  
✅ Real-time bus route search  
✅ AWS-powered serverless backend  
✅ Responsive frontend with smooth UI  
✅ Secure and scalable deployment  

---

## **📌 Project Structure**

```
BusLens/
│── static/       # CSS, JS, images
│── templates/    # HTML files
│── app.py        # Flask backend
│── requirements.txt  # Dependencies
│── zappa_settings.json  # Zappa configuration (ignored in GitHub)
```

---

## **🚀 How to Set Up Locally**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/buslens.git
cd buslens
```

### **2️⃣ Set Up a Virtual Environment & Install Dependencies**
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### **3️⃣ Run Flask Locally**
```bash
python app.py
```
🔗 Open **`http://127.0.0.1:5000/`** in your browser.

**Note:**
- You need to configure **database credentials** in `app.py` before running locally.
- Adjust the **Flask port** if needed (default is `5000`).
- Modify the **fetch API route** in `script.js` to use `http://127.0.0.1:5000/bus-routes` instead of the deployed API URL.

---

## **🚀 Deployment Guide**

Follow the complete deployment guide here:  
📌 **[My AWS Notes](aws_zappa_deploy.md)**

---

## **🔧 API Endpoints**

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/bus-routes` | Get buses between two stops |

### **Example API Request**
```bash
curl -X POST "https://xyz123.execute-api.ap-south-1.amazonaws.com/dev/bus-routes" \
     -H "Content-Type: application/json" \
     -d '{"stop1": "PGI", "stop2": "ISBT-17"}'
```

---

## **📌 Updating Backend & Frontend**
### **🔄 Update Flask API (Backend - Zappa)**
```bash
zappa update dev
```
### **🔄 Update Frontend (S3 - HTML, CSS, JS)**
```bash
aws s3 cp index.html s3://bucket-name/ --acl public-read

 aws s3 sync . s3://bucket-name --delete  
 aws s3 ls s3://bucket-name --recursive 
 aws cloudfront create-invalidation --distribution-id distribution_id --paths "/*"
 aws cloudfront get-distribution --id distribution_id --query "Distribution.Status"
```

---

## **🎯 Final Project Flow**

1️⃣ **User visits website (S3 Bucket URL)**  
2️⃣ **Enters "FROM" and "TO" locations**  
3️⃣ **Frontend calls Flask API (AWS Lambda)**  
4️⃣ **API fetches bus routes from MySQL (RDS)**  
5️⃣ **Results are displayed to the user**  

---

