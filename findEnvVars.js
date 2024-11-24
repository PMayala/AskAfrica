const fs = require("fs");
const path = require("path");

// Directories to ignore
const IGNORED_DIRECTORIES = ["node_modules", ".git", ".vscode", "public"];

// File extensions to scan
const ALLOWED_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

// Regex pattern to match process.env variables
const ENV_VAR_REGEX = /process\.env\.([A-Z_][A-Z0-9_]*)/g;

const scanDirectory = (directory, envVars) => {
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);

    // Skip ignored directories
    if (IGNORED_DIRECTORIES.includes(item)) {
      continue;
    }

    // If it's a directory, recursively scan it
    if (fs.statSync(itemPath).isDirectory()) {
      scanDirectory(itemPath, envVars);
    } else {
      const extension = path.extname(item);

      // Only process files with allowed extensions
      if (ALLOWED_EXTENSIONS.includes(extension)) {
        extractEnvVars(itemPath, envVars);
      }
    }
  }
};

const extractEnvVars = (filePath, envVars) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Match all occurrences of process.env.<VARIABLE>
  let match;
  while ((match = ENV_VAR_REGEX.exec(fileContent)) !== null) {
    envVars.add(match[1]);
  }
};

const main = () => {
  const rootDir = path.resolve(__dirname);
  const envVars = new Set();

  console.log("Scanning for environment variables...");

  scanDirectory(rootDir, envVars);

  if (envVars.size > 0) {
    console.log("Found environment variables:");
    envVars.forEach((envVar) => console.log(`- ${envVar}`));
  } else {
    console.log("No environment variables found.");
  }
};

main();
