import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminTheme = ({ children }) => {
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
                    onClick={() => {
                      navigate('/')
                    }}
                  >
                    <p className='inline-block no-underline cursor-pointer hover:text-black hover:underline py-2'>
                      Home
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      navigate('/admin')
                    }}
                  >
                    <p className='inline-block no-underline cursor-pointer hover:text-black hover:underline py-2'>
                      Product
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      navigate('/admin/order')
                    }}
                  >
                    <p className='inline-block no-underline cursor-pointer hover:text-black hover:underline py-2'>
                      Order
                    </p>
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
            <div className='order-2 md:order-3 flex items-center' id='nav-content'></div>
          </div>
        </nav >

        {/* Main */}
        <main className='flex flex-col flex-1'>
          <section className='bg-white py-8 px-1'>
            <div className='container flex items-start flex-wrap pt-4 pb-12'>
              {/* Content */}
              <div className='px-2 w-full'>{children}</div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className='relative container mx-auto bg-white py-8 border-t border-gray-400' >
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
      </div >
    </>
  )
}

export default AdminTheme
