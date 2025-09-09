require('dotenv').config(); // Load environment variables
const XLSX = require('xlsx');
const jsonfile = require('jsonfile');

// Helper function to unflatten JSON keys back into a nested structure
function unflatten(data) {
  const result = {};
  for (const key in data) {
    const keys = key.split('.');
    keys.reduce((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = data[key]; // Assign value
      } else {
        acc[part] = acc[part] || {}; // Create an empty object if not already there
      }
      return acc[part];
    }, result);
  }
  return result;
}

// Function to convert Excel to JSON
function excelToJson() {
  const excelFilePath = process.env.EXCEL_PATH_INPUT;

  if (!excelFilePath) {
    console.error('Please provide EXCEL_PATH_INPUT in the .env file.');
    process.exit(1);
  }

  // Load the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to array of arrays

  // Initialize objects for English and Arabic translations
  let enTranslations = {};
  let arTranslations = {};

  // Loop through the rows, starting from the second row (index 1)
  for (let i = 1; i < rows.length; i++) {
    const [key, en, ar] = rows[i]; // Destructure the columns for Key, en, ar
    if (key) {
      enTranslations[key] = en || ''; // English value
      arTranslations[key] = ar || en || ''; // Arabic value
    }
  }

  // Unflatten the keys to form nested JSON objects
  enTranslations = unflatten(enTranslations);
  arTranslations = unflatten(arTranslations);

  // Save the JSON files
  jsonfile.writeFileSync('output_en.json', enTranslations, { spaces: 2 });
  jsonfile.writeFileSync('output_ar.json', arTranslations, { spaces: 2 });

  console.log('English and Arabic translations have been saved to output_en.json and output_ar.json.');
}

// Run the conversion
excelToJson();
