import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
    <div className='bg-[#202020] w-full'>
      <div className='py-5 px-20 flex justify-between'>
        <div className='text-white text-3xl'>
          <FontAwesomeIcon className='hover:text-[aqua] hover:cursor-pointer mr-5' icon={faFacebook} />
          <FontAwesomeIcon className='hover:text-[aqua] hover:cursor-pointer mr-5' icon={faTwitter} />
          <FontAwesomeIcon className='hover:text-[aqua] hover:cursor-pointer' icon={faYoutube} />
        </div>
        <div className='text-white text-3xl'>
          <FontAwesomeIcon onClick={scrollToTop} className='hover:text-[aqua] hover:cursor-pointer duration-300' icon={faArrowUp} />
        </div>
      </div>
      <div className='px-20 text-white w-[50%] text-sm'>
        <p>© 2024, Game Vortex, Inc. All rights reserved. <br />
        <br />
        Our website may contain links to other sites and resources provided by third parties. These links are provided for your convenience only. Game Vortex has no control over the contents of those sites or resources, and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>
      </div>
      <div className='px-20 pb-5 mt-4 '>
        <Link to="customerservice" className='text-white border-b-2 border-white hover:text-blue-500 hover:border-blue-500 duration-300'>Customer Service</Link>
      </div>
    </div>
    </>
  );
}

export default Footer;
