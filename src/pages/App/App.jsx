import { UserIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import Cart from './ProductCart';

// ประกาศฟังก์ชัน app
const App = () => {
  // เรียกใช้ navigate เพื่อให้สามารถเปลี่ยนเส้นทางได้
  const navigate = useNavigate()

  return (
    <>
      <div className='relative p-2 min-h-[100vh] flex flex-col bg-white text-gray-600 work-sans leading-normal text-base tracking-normal'>
        {/* Nav */}
        <nav id='header' className='w-full top-0 py-1'>
          <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-3'>
            <label htmlFor='menu-toggle' className='cursor-pointer md:hidden block'>
              <svg
                className='fill-current text-gray-900'
                xmlns='http:www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
              >
                <title>menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
              </svg>
            </label>
            <input className='hidden' type='checkbox' id='menu-toggle' />

            <div
              className='hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1'
              id='menu'
            >
              <nav>
                <ul className='md:flex items-center justify-between text-base text-gray-700 pt-4 gap-2 md:pt-0'>
                  <li
                    onClick={() => navigate('/')}
                  >
                    <p className='inline-block no-underline cursor-pointer hover:text-black hover:underline py-2'>
                      Home
                    </p>
                  </li>
                  <li>
                    <a href='#about' className='inline-block no-underline cursor-pointer hover:text-black hover:underline py-2'>
                      About
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='order-1 md:order-2'>
              <div className='flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
                <svg
                  className='fill-current text-gray-800 mr-2'
                  xmlns='http:www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z' />
                </svg>
                ANUA
              </div>
            </div>
            <div className='order-2 md:order-3 flex items-center gap-2' id='nav-content'>
              <UserIcon className="cursor-pointer text-indigo-500 w-[24px] h-[24px]" onClick={() => navigate('/admin')} />
            </div>

          </div>
        </nav >

        {/* Main */}
        <main className='flex flex-col flex-1 '>
          {/* Carousel */}
          <Carousel />
          <section className='bg-white py-8'>
            <div className='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
              {/* Cart Component */}
              <Cart />
            </div>
          </section>
        </main>

        <section className='bg-white py-8'>
          <div className='container py-8 px-6 mx-auto'>
            <a
              id='about'
              className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8'
              href='#'
            >
              About
            </a>
            <p className='mt-8 mb-8'>
              This template is inspired by the stunning nordic minamalist design - in particular:
              <br />
              <a
                className='text-gray-800 underline hover:text-gray-900'
                href='http:savoy.nordicmade.com/'
                target='_blank'
                rel='noreferrer'
              >
                Savoy Theme
              </a>{' '}
              created by{' '}
              <a
                className='text-gray-800 underline hover:text-gray-900'
                href='https:nordicmade.com/'
              >
                https:nordicmade.com/
              </a>{' '}
              and{' '}
              <a
                className='text-gray-800 underline hover:text-gray-900'
                href='https:www.metricdesign.no/'
                target='_blank'
                rel='noreferrer'
              >
                https:www.metricdesign.no/
              </a>
            </p>
            <p className='mb-8'>
              Lorem ipsum dolor sit amet, consectetur <a href='#'>random link</a> adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo
              viverra maecenas accumsan lacus vel facilisis volutpat. Vitae aliquet nec ullamcorper
              sit. Nullam eget felis eget nunc lobortis mattis aliquam. In est ante in nibh mauris.
              Egestas congue quisque egestas diam in. Facilisi nullam vehicula ipsum a arcu. Nec nam
              aliquam sem et tortor consequat. Eget mi proin sed libero enim sed faucibus turpis in.
              Hac habitasse platea dictumst quisque. In aliquam sem fringilla ut. Gravida rutrum
              quisque non tellus orci ac auctor augue mauris. Accumsan lacus vel facilisis volutpat
              est velit egestas dui id. At tempor commodo ullamcorper a. Volutpat commodo sed
              egestas egestas fringilla. Vitae congue eu consequat ac.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className='relative container mx-auto bg-white py-8 border-t border-gray-400'>
          <div className='container flex px-3 py-8 '>
            <div className='w-full mx-auto flex flex-wrap'>
              <div className='flex w-full lg:w-1/2 '>
                <div className='px-3 md:px-0 text-left'>
                  <h3 className='font-bold text-gray-900'>About</h3>
                  <p className='py-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut
                    felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut
                    lacinia.
                  </p>
                </div>
              </div>
              <div className='flex w-full lg:w-1/2 lg:justify-end lg:text-right'>
                <div className='px-3 md:px-0'>
                  <h3 className='font-bold text-gray-900'>Social</h3>
                  <ul className='list-reset items-center pt-3'>
                    <li>
                      <a
                        className='inline-block no-underline hover:text-black hover:underline py-1'
                        href='#'
                      >
                        Add social links
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
