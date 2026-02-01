NDVI Change Detection Using Remote Sensing
Abstract

This project presents an NDVI-based change detection approach to assess spatio-temporal variations in vegetation cover using multispectral satellite imagery. By comparing NDVI values across multiple time periods, areas of vegetation increase, decrease, and stability are identified. The methodology supports applications in agricultural monitoring, land-use analysis, and environmental assessment.

Objectives

The objectives of this study are to compute NDVI from multispectral satellite data, analyze temporal changes in vegetation, identify regions of significant vegetation gain and loss, and visualize NDVI patterns and change dynamics over time.

Data

Sentinel-2 Level-2A imagery was used due to its high spatial and temporal resolution. The analysis employed Band 4 (Red) and Band 8 (Near Infrared) at 10 m spatial resolution. Multi-temporal imagery covering different seasons/years was obtained from the Copernicus Open Access Hub and Google Earth Engine.

Methodology

Satellite imagery was first pre-processed through cloud masking and clipping to the defined region of interest. NDVI was computed for each time period using the standard normalized difference formulation. Change detection was performed by differencing NDVI images from two time points (ΔNDVI = NDVIₜ₂ − NDVIₜ₁). The resulting change map was classified into vegetation increase, vegetation decrease, and no significant change categories. Spatial and statistical analyses were conducted to interpret vegetation dynamics.

NDVI Computation

NDVI was calculated using the equation:

NDVI = (NIR − Red) / (NIR + Red)

where NIR represents reflectance from the Near Infrared band and Red represents reflectance from the Red band. NDVI values range from −1 to +1, with higher values indicating healthier vegetation.

Tools and Software

The analysis was conducted using Google Earth Engine (JavaScript/Python API), QGIS, and Python libraries including NumPy, Rasterio, and Matplotlib.

Results

The study produced NDVI maps for multiple time periods and NDVI difference maps highlighting vegetation changes. The results reveal clear spatial patterns of vegetation gain and loss within the study area, supported by quantitative NDVI statistics.

Applications

NDVI change detection is useful for crop health monitoring, drought assessment, land use and land cover change analysis, and long-term environmental monitoring.

Conclusion

This project demonstrates the effectiveness of NDVI-based change detection in capturing vegetation dynamics using remote sensing data. The approach is computationally efficient and scalable for regional to large-area analysis.

Future Scope

Future work may include multi-year NDVI time-series analysis, integration of additional vegetation indices such as EVI and SAVI, and the application of machine learning techniques for improved change classification.
