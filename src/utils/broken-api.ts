// API utilities with multiple issues

// Import from non-existent module
import fetch from 'node-fetch'
import { InvalidType, AnotherInvalidType } from '@/types/missing-types'

// Interface with invalid syntax
interface ApiResponse {
  data: any
  error?: string
  // Missing semicolon
  timestamp: number
  // Invalid property type
  callback: () => Promise<InvalidReturnType>
}

// Function with multiple issues
export async function fetchUserData(userId?: string): Promise<ApiResponse> {
  // Using undefined variable
  const baseUrl = UNDEFINED_BASE_URL
  
  // Incorrect async/await usage
  const response = await fetch(`${baseUrl}/users/${userId}`)
    .then(res => res.json()) // Mixing async/await with .then()
    .catch(err => {
      // Invalid return in catch
      return undefined
    })
  
  // Type mismatch
  const result: ApiResponse = {
    data: response,
    error: null, // null instead of undefined
    timestamp: "invalid_timestamp", // String instead of number
    callback: () => {
      // Invalid return type
      return "not a promise"
    }
  }
  
  return result
}

// Export with syntax error
export const processData = (data: UnknownType): ProcessedData => {
  // Undefined function call
  const processed = transformData(data)
  
  // Invalid array method usage
  return data.map() // Missing callback parameter
}

// Invalid function declaration
function invalidFunction(
  param1: string,
  param2: number,
  // Trailing comma without parameter
) {
  // Function body missing return
  const value = param1 + param2
  
// Missing closing brace