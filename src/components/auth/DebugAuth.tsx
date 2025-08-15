'use client'

export default function DebugAuth() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  return (
    <div className="bg-gray-100 p-4 mt-4 rounded text-xs">
      <h3 className="font-bold mb-2">Firebase Config Debug:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(firebaseConfig, null, 2)}
      </pre>
    </div>
  );
}