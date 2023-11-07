import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import logo from '../../assets/logo_icon.png';
import { ChonkyIconFA } from '@aperturerobotics/chonky-icon-fontawesome';
import { ChonkyIconName } from '@aperturerobotics/chonky';

interface Props {
  canLogin: boolean;
  canRegister: boolean;

}

export default function Welcome({
  canLogin,
  canRegister,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
    
      <Head title="Welcome" />

      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-black selection:text-white">
        {canLogin ? (
          <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            {page.props.auth.user ? (
              <Link
                href={route('dashboard')}
                className="p-2 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-black"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="p-2 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-black"
                >
                  Log in
                </Link>

                {canRegister ? (
                  <Link
                    href={route('register')}
                    className="p-2 ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-black"
                  >
                    Register
                  </Link>
                ) : null}
              </>
            )}
          </div>
        ) : null}

        <div className="max-w-7xl mx-auto lg:p-8">
          <div className="flex justify-center mb-4">
                <img src={logo} />
          </div>
          <div className="text-center mb-4">
            <h1 className='text-3xl font-semibold text-gray-900 dark:text-white"'> Phonics Assistant </h1>
          </div>
          <div >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div
                
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
              >
                <div>
                  <div className='flex text-xl font-semibold text-gray-900 dark:text-white justify-between'>
                      <h2> Create Customized Word Lists </h2>
                      <ChonkyIconFA icon={ChonkyIconName.file} />
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Easily create customized word lists tailored to specific phonics patterns. Our user-friendly interface empowers you to curate educational content that suits your teaching or learning needs. Build engaging word lists that enhance language skills effortlessly.
                  </p>
                </div>
              </div>
              <div
                
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
              >
                <div>
                  <div className='flex text-xl font-semibold text-gray-900 dark:text-white justify-between'>
                      <h2> Generate PDFs for Printing </h2>
                      <ChonkyIconFA icon={ChonkyIconName.pdf} />
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Take your word lists beyond the digital realm with our PDF export feature. Convert your phonics pattern word lists into beautifully formatted PDFs, making it convenient to print or share physical copies. Seamlessly bridge the gap between digital and traditional learning.
                  </p>
                </div>
              </div>

              <div
                
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
              >
                <div>
                  <div className='flex text-xl font-semibold text-gray-900 dark:text-white justify-between'>
                      <h2> Effortless Organization </h2>
                      <ChonkyIconFA icon={ChonkyIconName.list} />
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Stay organized with our virtual file system. Effortlessly manage and categorize your word lists, ensuring easy access and efficient organization. Keep your teaching resources neatly arranged for a hassle-free teaching or learning experience.
                  </p>
                </div>
              </div>

              <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                <div>
                  <div className='flex text-xl font-semibold text-gray-900 dark:text-white justify-between'>
                      <h2> Share with Unique Links </h2>
                      <ChonkyIconFA icon={ChonkyIconName.share} />
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Collaborate and share your word lists securely with our link-sharing feature. Generate unique links for each list, allowing you to share them with students, colleagues, or anyone else with ease. Maintain control over who can access your valuable educational content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
