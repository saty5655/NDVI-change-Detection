/*******************************************************
 * NDVI Change Detection (2016 vs 2025) - INDIA
 * Data: Landsat 8/9 Collection 2 Level 2 (SR)
 * Output: NDVI 2016, NDVI 2025, dNDVI (2025-2016)
 *******************************************************/

// =====================
// ROI: India Boundary
// =====================
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var roi = countries.filter(ee.Filter.eq('country_na', 'India'));

Map.centerObject(roi, 5);
Map.addLayer(roi, {color: 'red'}, 'India ROI');


// =====================
// Helpers: Landsat C2 L2 scaling + masking + NDVI
// =====================

// Apply scale factors
function applyScaleFactorsL8L9(img) {
  var optical = img.select([
    'SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'
  ]).multiply(0.0000275).add(-0.2);
  return img.addBands(optical, null, true);
}

// Mask clouds/shadows/snow
function maskLandsatC2L2(img) {
  var qa = img.select('QA_PIXEL');

  var mask = qa.bitwiseAnd(1 << 0).eq(0)
    .and(qa.bitwiseAnd(1 << 1).eq(0))
    .and(qa.bitwiseAnd(1 << 2).eq(0))
    .and(qa.bitwiseAnd(1 << 3).eq(0))
    .and(qa.bitwiseAnd(1 << 4).eq(0))
    .and(qa.bitwiseAnd(1 << 5).eq(0));

  return img.updateMask(mask);
}

// Add NDVI band
function addNDVI(img) {
  var ndvi = img.normalizedDifference(['SR_B5','SR_B4'])
    .rename('NDVI');
  return img.addBands(ndvi);
}


// =====================
// Landsat 8 + 9 Collection
// =====================
var l89 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .merge(ee.ImageCollection('LANDSAT/LC09/C02/T1_L2'))
  .filterBounds(roi)
  .map(applyScaleFactorsL8L9)
  .map(maskLandsatC2L2)
  .map(addNDVI);


// =====================
// Time windows
// =====================
var start2016 = '2016-01-01';
var end2016   = '2016-12-31';

var start2025 = '2025-01-01';
var end2025   = '2025-12-31';

var ndvi2016 = l89.filterDate(start2016, end2016)
  .median()
  .select('NDVI')
  .clip(roi);

var ndvi2025 = l89.filterDate(start2025, end2025)
  .median()
  .select('NDVI')
  .clip(roi);


// =====================
// Visualization
// =====================
var ndviVis = {
  min: -0.2,
  max: 0.9,
  palette: [
    '8c510a','bf812d','dfc27d','f6e8c3',
    'c7eae5','80cdc1','35978f','01665e',
    '1a9850','006837'
  ]
};

var dndviVis = {
  min: -0.5,
  max: 0.5,
  palette: ['b2182b','ef8a62','f7f7f7','67a9cf','2166ac']
};

Map.addLayer(ndvi2016, ndviVis, 'NDVI 2016 (India)');
Map.addLayer(ndvi2025, ndviVis, 'NDVI 2025 (India)');

var dndvi = ndvi2025.subtract(ndvi2016).rename('dNDVI');
Map.addLayer(dndvi, dndviVis, 'dNDVI (2025 - 2016)');


// =====================
// Loss / Gain Masks
// =====================
var lossThr = -0.2;
var gainThr =  0.2;

var lossMask = dndvi.lte(lossThr).selfMask();
var gainMask = dndvi.gte(gainThr).selfMask();

Map.addLayer(lossMask, {palette: ['ff0000']}, 'Vegetation Loss');
Map.addLayer(gainMask, {palette: ['0000ff']}, 'Vegetation Gain');


// =====================
// Legends
// =====================
function addNdviLegend() {
  var panel = ui.Panel({
    style: { position: 'bottom-left', padding: '8px 10px' }
  });

  panel.add(ui.Label({
    value: 'NDVI',
    style: { fontWeight: 'bold', fontSize: '14px' }
  }));

  var rows = [
    ['#8c510a', 'Very low / Bare'],
    ['#dfc27d', 'Low'],
    ['#c7eae5', 'Moderate'],
    ['#35978f', 'High'],
    ['#006837', 'Very high']
  ];

  rows.forEach(function(r) {
    panel.add(ui.Panel({
      widgets: [
        ui.Label({style:{backgroundColor:r[0],padding:'8px'}}),
        ui.Label({value:r[1], style:{margin:'0 0 0 6px'}})
      ],
      layout: ui.Panel.Layout.Flow('horizontal')
    }));
  });

  Map.add(panel);
}

function addChangeLegend() {
  var panel = ui.Panel({
    style: { position: 'bottom-right', padding: '8px 10px' }
  });

  panel.add(ui.Label({
    value: 'NDVI Change',
    style: { fontWeight: 'bold', fontSize: '14px' }
  }));

  panel.add(ui.Label('🔴 Vegetation loss'));
  panel.add(ui.Label('⚪ No change'));
  panel.add(ui.Label('🔵 Vegetation gain'));

  Map.add(panel);
}

addNdviLegend();
addChangeLegend();


// =====================
// Exports
// =====================
Export.image.toDrive({
  image: ndvi2016,
  description: 'India_NDVI_2016',
  region: roi,
  scale: 30,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: ndvi2025,
  description: 'India_NDVI_2025',
  region: roi,
  scale: 30,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: dndvi,
  description: 'India_dNDVI_2025_minus_2016',
  region: roi,
  scale: 30,
  maxPixels: 1e13
});
