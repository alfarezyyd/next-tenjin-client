const Banner1 = () => {
  return (<div
    className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px] justify-center"
    style={{backgroundImage: `url(/assets/img/nfts/NftBanner1.png)`}}
  >
    <div className="w-full">
      <h4
        className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
        Temukan Mentor Terbaik untuk Anda
      </h4>
      <p
        className="mt-12 mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
        Jelajahi daftar mentor berkualitas yang siap membantu Anda mencapai tujuan. Pilih mentor berdasarkan keahlian,
        pengalaman, atau jadwal yang sesuai dengan kebutuhan Anda.
      </p>
    </div>
  </div>);
};

export default Banner1;
