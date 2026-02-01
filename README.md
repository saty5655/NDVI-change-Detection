🌱 NDVI Change Detection using Remote Sensing
📌 Project Overview

This project focuses on Normalized Difference Vegetation Index (NDVI) change detection to analyze vegetation dynamics over time using satellite imagery. NDVI is widely used to monitor crop health, vegetation cover, land degradation, and environmental changes.

The study compares NDVI values across different time periods to identify vegetation increase, decrease, or stability in the selected region of interest (ROI).

🎯 Objectives

Compute NDVI from multispectral satellite imagery

Perform temporal NDVI change detection

Identify areas of vegetation gain and loss

Visualize NDVI maps and change results

Support applications such as agriculture monitoring, land use analysis, and environmental assessment

🛰️ Data Used

Satellite: Sentinel-2 (Level-2A)

Spatial Resolution: 10 m

Spectral Bands:

Red (Band 4)

Near Infrared – NIR (Band 8)

Temporal Coverage: Multi-year / multi-season imagery

Source: Copernicus Open Access Hub / Google Earth Engine

🧮 NDVI Formula
𝑁
𝐷
𝑉
𝐼
=
(
𝑁
𝐼
𝑅
−
𝑅
𝑒
𝑑
)
(
𝑁
𝐼
𝑅
+
𝑅
𝑒
𝑑
)
NDVI=
(NIR+Red)
(NIR−Red)
	​


Where:

NIR = Near Infrared reflectance

Red = Red band reflectance

NDVI values range from -1 to +1:

High NDVI → Healthy vegetation

Low NDVI → Bare soil / water / degraded land

🔍 Methodology

Data Acquisition

Download Sentinel-2 imagery or access via Google Earth Engine

Pre-processing

Cloud masking

Image clipping to ROI

NDVI Calculation

Compute NDVI for each time period

Change Detection

NDVI Difference:

Δ
𝑁
𝐷
𝑉
𝐼
=
𝑁
𝐷
𝑉
𝐼
𝑡
2
−
𝑁
𝐷
𝑉
𝐼
𝑡
1
ΔNDVI=NDVI
t2
	​

−NDVI
t1
	​


Classification of Change

Vegetation Increase

Vegetation Decrease

No Significant Change

Visualization & Analysis

NDVI maps

NDVI difference maps

Temporal trend analysis

🛠️ Tools & Technologies

Google Earth Engine (JavaScript / Python API)

QGIS / ArcGIS

Python (NumPy, Rasterio, Matplotlib)

Jupyter Notebook

📊 Results

Generated NDVI maps for multiple time periods

Identified spatial patterns of vegetation change

Highlighted regions with significant vegetation loss and gain

Provided quantitative NDVI statistics for analysis
