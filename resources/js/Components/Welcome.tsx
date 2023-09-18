import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome() {
  return (
    <div>
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        <ApplicationLogo className="block h-12 w-auto" />

       </div>
    </div>
  );
}
