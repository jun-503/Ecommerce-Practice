import React ,{useState,useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import CardTemplate from './Cards/Card';
import img1 from './images/image1.jpg';
import img2 from './images/image2.jpg';
import img3 from './images/image3.jpg';
import img4 from './images/image4.jpg';
import 'swiper/css'
import 'swiper/css/pagination'
import './styles.css'

const ProductSlider = () => {
  return (
    <div  className='container py-4 px-4 justify-content-center' >
      <Swiper
        freeMode={true}
        slidesPerView={1}
        pagination={{
            clickable: true
        }}
        modules={[Pagination]}
        className='mySwiper'
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
        }}
      >
        <SwiperSlide>
          <CardTemplate img={img1} price={100} title="Product 1" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img2} price={200} title="Product 2" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img3} price={300} title="Product 3" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img4} price={400} title="Product 4" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img1} price={100} title="Product 1" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img2} price={200} title="Product 2" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img3} price={300} title="Product 3" />
        </SwiperSlide>
        <SwiperSlide>
          <CardTemplate img={img4} price={400} title="Product 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductSlider;
