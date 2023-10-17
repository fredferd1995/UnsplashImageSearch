import { readConfigFile, readJsonConfigFile } from "typescript"

export default function QuerySanitizer(inputQuery: string): string {
    // This function is currently here in case I decide I need to sanitize input for some reason.
    
    console.log(`You want to search: ${inputQuery}`);
    return inputQuery;
};