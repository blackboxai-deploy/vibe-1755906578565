// Utility functions with intentional build issues

import { useState } from 'react';
import fs from 'fs'; // Node.js module in client-side code
import { NonExistentType } from './non-existent-module';

export interface UserData {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Missing return type annotation
export function processUserData(users) {
  return users.map(user => ({
    ...user,
    displayName: user.name.toUpperCase(),
    status: user.isActive ? 'active' : 'inactive'
  }));
}

// Using React hook outside component
const [count, setCount] = useState(0);

// Async function without proper error handling
export async function fetchUserData(id: string): Promise<UserData> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data; // No error checking
}

// Type mismatch
export function calculateAge(birthDate: Date): string {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age; // Returning number instead of string
}

// Using Node.js fs in browser context
export function readConfigFile(): string {
  return fs.readFileSync('./config.json', 'utf8');
}

// Undefined variable reference
export function formatCurrency(amount: number): string {
  return `${currencySymbol}${amount.toFixed(2)}`; // currencySymbol not defined
}

// Missing dependency
export function validateEmail(email: string): boolean {
  return validator.isEmail(email); // validator not imported
}

// Incorrect generic usage
export function createArray<T>(length: number, value: T): Array<string> {
  return new Array(length).fill(value);
}

// Missing await
export async function saveUserData(userData: UserData): Promise<void> {
  const result = fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }); // Missing await
  
  console.log('User saved');
}