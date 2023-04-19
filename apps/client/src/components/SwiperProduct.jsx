// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default ({ imgUrl, imgUrl1, imgUrl2, imgUrl3, imgUrl4 }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {imgUrl && 
        <SwiperSlide>
          <div className="flex justify-center h-60">
          <img className="object-contain" src={imgUrl} alt="image1" />
          </div>
        </SwiperSlide>}
      {imgUrl1 && 
        <SwiperSlide>
          <div className="flex justify-center h-60">
          <img className="object-contain" src={imgUrl1} alt="image2" />
          </div>
        </SwiperSlide>}      
      {imgUrl2 && 
        <SwiperSlide>
          <div className="flex justify-center h-60">
          <img className="object-contain" src={imgUrl2} alt="image3" />
          </div>
        </SwiperSlide>}      
      {imgUrl3 && 
        <SwiperSlide>
          <div className="flex justify-center h-60">
          <img className="object-contain" src={imgUrl3} alt="image3" />
          </div>
        </SwiperSlide>}
      {imgUrl4 && 
        <SwiperSlide>
          <div className="flex justify-center h-60">
          <img className="object-contain" src={imgUrl4} alt="image3" />
          </div>
        </SwiperSlide>}
      
      
      
    </Swiper>
  );
};