import type { PrismaClient } from "@prisma/client";

const images = [
  'https://loremflickr.com/cache/resized/65535_53058868236_4fa68aab20_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52894118405_4a47c5607c_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53081069785_57cd70d4b2_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52730973782_9404e092fa_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52894118405_4a47c5607c_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52955195265_0abf3179e8_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52877541090_b82e3183f3_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52770574954_c85ff64d9e_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52959610110_89de3575b7_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52955195265_0abf3179e8_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53035727810_380f561cc8_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53030509507_3ef624a1cc_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52810057492_6041fb00b3_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52886062671_91613f5bec_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52729631018_76db6a371a_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52733102927_eb4014ce29_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52979468713_909764c2e8_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52948237664_2a369ffe60_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53503190971_73aaeca787_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52856546944_fd6d3c8ff0_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53148893198_24eaef5329_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53288889318_ea82b01f51_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52801131669_9d7e0ee95e_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53073213831_d2e8f540ab_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52729660593_f17ae91869_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52753845660_6541ffe638_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52729631018_76db6a371a_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52963985446_65a38b0530_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_52801131669_9d7e0ee95e_n_320_240_nofilter.jpg',
  'https://loremflickr.com/cache/resized/65535_53035727810_380f561cc8_n_320_240_nofilter.jpg'
]

export const createProductsImage = async (prisma: PrismaClient) => {
  console.log("Seeding Products Image");

  const productsImage = Array.from({ length: 30 }, (_, i) => {
    return {
      image: images[i],
      productId: i + 1,
    };
  });

  await prisma.productImage.createMany({ data: productsImage});
};

