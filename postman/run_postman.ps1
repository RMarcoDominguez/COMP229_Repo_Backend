# PowerShell helper to run the Postman collection using Newman
Write-Host "Running Postman collection with Newman..."
npx newman run postman/COMP229_Backend.collection.json -e postman/local.postman_environment.json
