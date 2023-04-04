import React, { useState } from 'react';

export default function Carousel() {
  // ปรับกาศไอดีที่ต้องการแสดงของสไลด์โดยค่าเริ่มต้นเป็น 1
  const [activeCarousel, setActiveCarousel] = useState(1)

  // ประกาศรูปภาพสไลด์
  const [carousels, setCarousels] = useState([
    {
      id: 1,
      image: 'unsplash1.jpg',
      title: 'Stripy Zig Zag Jigsaw Pillow and Duvet Set',
      subtitle: 'view product'
    },
    {
      id: 2,
      image: 'unsplash2.jpg',
      title: 'Stripy Zig Zag Jigsaw Pillow and Duvet Set',
      subtitle: 'view product'
    },
    {
      id: 3,
      image: 'unsplash3.jpg',
      title: 'Stripy Zig Zag Jigsaw Pillow and Duvet Set',
      subtitle: 'view product'
    },
  ])

  // ฟังก์ชันจัดการการย้อนกลับสไลด์ ถ้าไอดีตรงกับตัวแรกให้ไม่ทำงานฟังก์ชันนี้
  const handlePrev = () => {
    if (activeCarousel === carousels[0].id) return;
    setActiveCarousel(activeCarousel - 1);
  };

  // ฟังก์ชันจัดการการย้อนกลับสไลด์ ถ้าไอดีตรงกับตัวสุดท้ายให้ไม่ทำงานฟังก์ชันนี้
  const handleNext = () => {
    if (activeCarousel === carousels[carousels.length - 1].id) return;
    setActiveCarousel(activeCarousel + 1);
  };

  return (
    <div className='carousel relative container mx-auto'>
      <div className='carousel-inner relative overflow-hidden w-full'>
        {carousels.filter((carousel) => carousel.id === activeCarousel).map((item, index) => (
          <div key={index}>
            <input
              type='radio'
              className='carousel-open opacity-0'
              name='carousel'
              aria-hidden='true'
              checked={true}
              onChange={() => { }}
            />
            <div className='carousel-item absolute' style={{ height: '50vh' }}>
              <div
                className='h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right'
                style={{ backgroundImage: `url("/${item.image}")` }}
              >
                <div className='container mx-auto'>
                  <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
                    <p className='text-black text-2xl my-4'>
                      {item.title}
                    </p>
                    <a
                      className='text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black'
                      href=''
                    >
                      {item.subtitle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <label
              style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
              onClick={handlePrev}
              className='prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer  text-3xl font-bold text-black rounded-full bg-white leading-tight text-center z-10 inset-y-0 left-0 my-auto'
            >
              ‹
            </label>
            <label
              style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
              onClick={handleNext}
              className='next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer  text-3xl font-bold text-black rounded-full bg-white leading-tight text-center z-10 inset-y-0 right-0 my-auto'
            >
              ›
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
