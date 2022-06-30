import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
  });

  const unsplashResults = photos.response.results.map((el) => el.urls.small);
  return unsplashResults;
};

export const fetchCoffeeStores = async () => {
  const photo = await getListOfCoffeePhotos();

  const response = await fetch('https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105&limit=6', {
    headers: {
      Authorization: process.env.CLIENT_SECRET,
    },
  });

  const data = await response.json();

  const transformedData =
    data?.results?.map((venue, idx) => {
      return {
        id: venue.fsq_id,
        imgUrl: photo[idx],
        ...venue,
      };
    }) || [];

  return transformedData;
};
