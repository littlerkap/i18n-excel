require('dotenv').config(); // Load environment variables
const jsonfile = require('jsonfile');
const XLSX = require('xlsx');

// Helper function to flatten deeply nested JSON
function flattenJson(data, parentKey = '', sep = '.') {
  let result = {};
  for (let key in data) {
    let newKey = parentKey ? `${parentKey}${sep}${key}` : key;
    if (typeof data[key] === 'object' && !Array.isArray(data[key]) && data[key] !== null) {
      Object.assign(result, flattenJson(data[key], newKey, sep)); // Recursively flatten
    } else {
      result[newKey] = data[key]; // Assign value if it's not an object
    }
  }
  return result;
}

// Function to convert JSON to Excel
function jsonToExcel() {
  const enJsonPath = process.env.EN_JSON_PATH;
  const arJsonPath = process.env.AR_JSON_PATH;

  if (!enJsonPath || !arJsonPath) {
    console.error('Please provide both EN_JSON_PATH and AR_JSON_PATH in the .env file.');
    process.exit(1);
  }

  // Load the English and Arabic JSON files
  const enData = jsonfile.readFileSync(enJsonPath);
  const arData = jsonfile.readFileSync(arJsonPath);

  // Flatten both JSON objects
  const flatEn = flattenJson(enData);
  const flatAr = flattenJson(arData);

  // Merge the keys and values into one array for Excel output
  const rows = [['Key', 'en', 'ar']]; // Headers for Excel
  const allKeys = new Set([...Object.keys(flatEn), ...Object.keys(flatAr)]);

  allKeys.forEach(key => {
    rows.push([
      key,                // Key
      flatEn[key] || '',  // English value (or empty if not available)
      flatAr[key] || ''   // Arabic value (or empty if not available)
    ]);
  });

  // Create a new Excel workbook and add the rows
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Translations');
  XLSX.writeFile(workbook, 'translations.xlsx');

  console.log('Combined JSON has been exported to translations.xlsx');
}

// Run the conversion
jsonToExcel();
