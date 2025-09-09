# JSON and Excel Converter

This Node.js application allows you to convert JSON files to an Excel file and convert an Excel file back to JSON format. It is useful for managing translations in different languages.

## Features

- Convert English and Arabic JSON translation files to a single Excel file.
- Convert an Excel file back to JSON files for English and Arabic translations.
- Supports deeply nested JSON structures.

## Requirements

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://yarnpkg.com/) (optional, can also use npm)

## Installation

1. **Clone the repository or download the source code.**

   ```bash
   git clone <repository-url>
   cd json2excel
   ```

2. **Install dependencies using Yarn:**

   ```bash
   yarn install
   ```

   Or using npm:

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root of the project directory** with the following structure:

   ```plaintext
   EN_JSON_PATH=./path_to_english_json.json
   AR_JSON_PATH=./path_to_arabic_json.json
   EXCEL_PATH_INPUT=./path_to_updated_excel_file.xlsx
   ```

   Replace the paths with the actual paths to your JSON and Excel files.

## Usage

### JSON to Excel Conversion

To convert your English and Arabic JSON files to an Excel file, follow these steps:

1. **Prepare Your JSON Files:** Ensure you have the English and Arabic JSON files specified in your `.env` file.

2. **Run the Conversion Script:** Execute the following command in your terminal:

   ```bash
   node json-to-excel.js
   ```

3. **Check the Output:** After running the command, an Excel file named `translations.xlsx` will be generated in the root of the project directory.

#### Sample Output (translations.xlsx)

| Key                         | en                    | ar           |
| --------------------------- | --------------------- | ------------ |
| app.title                   | Audit Platform        | منصة التدقيق |
| textEditor.enterDescription | Enter the description | أدخل الوصف   |
| textEditor.headings.h1      | Heading 1             | العنوان 1    |
| textEditor.headings.h2      | Heading 2             | العنوان 2    |
| textEditor.bold             | Bold                  | غامق         |
| textEditor.italic           | Italic                | مائل         |

### Excel to JSON Conversion

To convert an Excel file back into JSON files, follow these steps:

1. **Prepare Your Excel File:** Ensure you have the Excel file specified in your `.env` file.

2. **Run the Conversion Script:** Execute the following command in your terminal:

   ```bash
   node excel-to-json.js
   ```

3. **Check the Output:** After running the command, two JSON files named `output_en.json` and `output_ar.json` will be generated based on the content of the Excel file.

#### Sample Output (output_en.json)

```json
{
  "app": {
    "title": "Audit Platform"
  },
  "textEditor": {
    "enterDescription": "Enter the description",
    "headings": {
      "h1": "Heading 1",
      "h2": "Heading 2"
    },
    "bold": "Bold",
    "italic": "Italic"
  }
}
```

#### Sample Output (output_ar.json)

```json
{
  "app": {
    "title": "منصة التدقيق"
  },
  "textEditor": {
    "enterDescription": "أدخل الوصف",
    "headings": {
      "h1": "العنوان 1",
      "h2": "العنوان 2"
    },
    "bold": "غامق",
    "italic": "مائل"
  }
}
```

## Folder Structure

```
json2excel/
│
├── .env                      # Stores the JSON and Excel file paths
├── json-to-excel.js          # Script for converting JSON to Excel
├── excel-to-json.js          # Script for converting Excel to JSON
├── package.json              # Project metadata
├── package-lock.json         # Exact versions of installed dependencies
└── node_modules/             # Installed dependencies
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [xlsx](https://github.com/SheetJS/sheetjs) - For reading and writing Excel files.
- [jsonfile](https://www.npmjs.com/package/jsonfile) - For reading and writing JSON files.
- [dotenv](https://www.npmjs.com/package/dotenv) - For managing environment variables.
