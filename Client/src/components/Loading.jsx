import React from 'react'

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 animate-spin rounded-full"></div>
    </div>
  )
}

export default Loading