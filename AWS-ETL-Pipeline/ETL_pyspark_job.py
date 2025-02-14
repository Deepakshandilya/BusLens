import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from awsgluedq.transforms import EvaluateDataQuality
from awsglue import DynamicFrame


def sparkSqlQuery(glueContext, query, mapping, transformation_ctx) -> DynamicFrame:
    for alias, frame in mapping.items():
        frame.toDF().createOrReplaceTempView(alias)
    result = spark.sql(query)
    return DynamicFrame.fromDF(result, glueContext, transformation_ctx)


args = getResolvedOptions(sys.argv, ["JOB_NAME"])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args["JOB_NAME"], args)

# Default ruleset used by all target nodes with data quality enabled
DEFAULT_DATA_QUALITY_RULESET = """
    Rules = [
        ColumnCount > 0
    ]
"""

# Script generated for node Amazon S3
AmazonS3_node1739543022855 = glueContext.create_dynamic_frame.from_options(
    format_options={
        "quoteChar": '"',
        "withHeader": True,
        "separator": ",",
        "optimizePerformance": False,
    },
    connection_type="s3",
    format="csv",
    connection_options={"paths": ["s3://datapipeline-bucket1"], "recurse": True},
    transformation_ctx="AmazonS3_node1739543022855",
)

# Script generated for node SQL Query
SqlQuery105 = """
select * from myDataSource

"""
SQLQuery_node1739543144692 = sparkSqlQuery(
    glueContext,
    query=SqlQuery105,
    mapping={"myDataSource": AmazonS3_node1739543022855},
    transformation_ctx="SQLQuery_node1739543144692",
)

# Script generated for node Amazon S3
EvaluateDataQuality().process_rows(
    frame=SQLQuery_node1739543144692,
    ruleset=DEFAULT_DATA_QUALITY_RULESET,
    publishing_options={
        "dataQualityEvaluationContext": "EvaluateDataQuality_node1739542936636",
        "enableDataQualityResultsPublishing": True,
    },
    additional_options={
        "dataQualityResultsPublishing.strategy": "BEST_EFFORT",
        "observations.scope": "ALL",
    },
)
AmazonS3_node1739548061719 = glueContext.write_dynamic_frame.from_options(
    frame=SQLQuery_node1739543144692,
    connection_type="s3",
    format="glueparquet",
    connection_options={"path": "s3://datapipeline-bucket1", "partitionKeys": []},
    format_options={"compression": "snappy"},
    transformation_ctx="AmazonS3_node1739548061719",
)

job.commit()
