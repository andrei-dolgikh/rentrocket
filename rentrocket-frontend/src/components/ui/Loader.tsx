import Image from 'next/image';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center " style={{zIndex: '100'}}>
        <Image src="/loader-onion.png" alt="Onion" width={50} height={50} className='animate-spin'/>
        {/* <Image
          src="/loader-nimb.png"
          alt="Nimb"
          width={40}
          height={40}
          className="animate-spin"
          style={{ transformOrigin: 'left bottom' }}
        /> */}
    </div>
  );
};

export default Loader;