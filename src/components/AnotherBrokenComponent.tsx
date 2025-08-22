'use client'

// Import that doesn't exist
import { NonExistentComponent } from '@/components/fantasy-component'
import { useState } from 'react' 
// Import from wrong path
import { invalidHelper } from '../utils/nonexistent-helpers'

interface BrokenProps {
  title: string
  count: number
  // Invalid type reference
  callback: InvalidCallbackType
}

export default function AnotherBrokenComponent({ title, count, callback }: BrokenProps) {
  const [data, setData] = useState<string>() // No initial value
  
  // Using undefined variables
  const result = nonExistentVariable + " test"
  
  // Calling method on potentially undefined
  const upperTitle = title.toUpperCase()
  
  // Invalid hook usage (conditional)
  if (count > 5) {
    const [extraState] = useState("invalid") // Hooks can't be conditional
  }
  
  // Missing return statement for some code paths
  if (!title) {
    return null
  }
  
  // Invalid JSX structure
  return (
    <div className="broken-container">
      <h1>{title.substring(0, invalid_index)}</h1>
      <p>{count * undefined_multiplier}</p>
      <button onClick={() => callback()}>
        Click me
      </>
      {/* Unclosed component */}
      <NonExistentComponent>
        <div>
          Some content
      </NonExistentComponent>
    <div>
  )
}

// Invalid syntax at the end
const broken = {
  prop1: 'value1'
  // Missing comma