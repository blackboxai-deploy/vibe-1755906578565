// Intentionally broken layout file
import './globals.css'
// Missing React import - will cause error

export default function RootLayout({
  children,
}: {
  children: React.ReactNode // Using React.ReactNode without import
}) {
  // Missing return statement will cause error
  const invalidVariable = undefinedFunction(); // Calling undefined function
  
  <html lang="en">
    <body className="invalidClassName">
      {children}
      {/* Missing closing div will cause JSX error */}
      <div>
        <ComponentThatDoesntExist />
    </body>
  </html>
}

// Invalid export at end of file
export const