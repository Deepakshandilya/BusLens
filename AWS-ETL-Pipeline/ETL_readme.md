# ETL Data Pipeline using AWS Glue, Redshift, PySpark, and S3

## Overview
This project demonstrates the creation of a data pipeline leveraging AWS Glue, Amazon Redshift, PySpark, and Amazon S3. The pipeline extracts data from S3, transforms it using PySpark in Glue, and loads the transformed data into Redshift for further analysis.

---

## Key AWS Services Used

### 1. Amazon Redshift
A fully managed data warehouse service that allows running complex queries against large datasets.

- **Purpose:** Store transformed data for querying and analytics.
- **Setup:**
  - Created a Redshift cluster (non-public) in a VPC with security groups configured to allow access from Glue.
  - Database `dev` with user `admin`.

### 2. AWS Glue
A serverless data integration service for ETL (Extract, Transform, Load) processes.

- **Purpose:** Extract data from S3, transform using PySpark, and load into Redshift.
- **Components Used:**
  - **Connections:** Established a connection between Glue and Redshift using JDBC.
  - **Crawler:** Cataloged S3 data into the Glue Data Catalog.
  - **Jobs:** Created ETL jobs to transform and load data.

### 3. PySpark
A Python API for Apache Spark, used within AWS Glue for data processing.

- **Purpose:** Transform data within Glue ETL Jobs.

### 4. Amazon S3
Object storage service used to store raw data and output files.

- **Purpose:** Store input CSV files and output parquet files.

---

## Step-by-Step Implementation

### 1. IAM Permissions Setup
Create and configure an IAM role `AWSGlueServiceRole` with the following policies:
- AmazonS3FullAccess
- AmazonRedshiftFullAccess
- SecretsManagerReadWrite
- AWSGlueServiceRole

### 2. S3 Data Storage
Upload raw data (e.g., CSV files) to an S3 bucket.

### 3. Redshift Setup
- Created a Redshift cluster.
- Created a database named `dev` with user `admin`.
- Security group with inbound rules allowing Glue access (Redshift port 5439).

### 4. Glue Connection to Redshift
- Created a connection in AWS Glue:
  - **Database type:** Amazon Redshift
  - **Database Name:** `dev`
  - **JDBC URL:** `jdbc:redshift://<redshift-cluster-endpoint>:5439/dev`
  - **Username:** `admin`
  - **Password:** `******`
  - **VPC, Subnets, Security Groups:** Selected based on Redshift configuration.

### 5. Glue Crawler
- Created a crawler to catalog the S3 data.
- Output: Created a table in the Glue Data Catalog.

### 6. Glue ETL Job (Visual & PySpark)
- Created a Visual ETL job with the following steps:
  - **Source:** S3 (Data Catalog table).
  - **Transform:** SQL Query (e.g., `SELECT * FROM dataset`).
  - **Target:** S3 (Output in Parquet format).
- Alternatively, used PySpark script for custom transformations.

### 7. Load Data into Redshift
- Added Redshift as a target in the Glue Job.
- Used the connection created earlier.
- Loaded transformed data into a Redshift table.

### 8. Execute and Validate
- Ran the Glue Job.
- Verified the data in Redshift using Query Editor.

---

## PySpark Example
```python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

glueContext = GlueContext(SparkContext.getOrCreate())

dyf = glueContext.create_dynamic_frame.from_catalog(database="my_database", table_name="my_table")
df = dyf.toDF()
df_transformed = df.filter(df['column_name'] == 'desired_value')

dyf_output = DynamicFrame.fromDF(df_transformed, glueContext, "dyf_output")
glueContext.write_dynamic_frame.from_options(
    frame=dyf_output,
    connection_type="s3",
    connection_options={"path": "s3://my-bucket/output/"},
    format="parquet"
)
```

---

## Key Learnings
- AWS Glue automates ETL workflows with serverless capabilities.
- PySpark within Glue allows scalable data transformations.
- Integrating Glue with Redshift requires VPC, security groups, and IAM role configurations.

---

## Final Project Structure
- **S3 Bucket:** Raw data and output data.
- **Glue Data Catalog:** Table metadata from S3.
- **Glue Connection:** Linked to Redshift.
- **Glue Crawler:** Discovered data from S3.
- **Glue Job:** Transformed data and loaded it into Redshift.

---
![alt text](<aws_ss\Screenshot 2025-02-14 232340.png>)

![alt text](<AWS-ETL-Pipeline\aws_ss\Screenshot 2025-02-14 232107.png>)

![alt text](<Screenshot 2025-02-14 232237.png>)

![alt text](<BusLens\AWS-ETL-Pipeline\aws_ss\Screenshot 2025-02-14 232803.png>)