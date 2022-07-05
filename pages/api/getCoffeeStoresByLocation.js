import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200).json({ response });
  } catch (error) {
    res.status(200).json({ message: error });
    console.error(error);
  }
};

export default getCoffeeStoresByLocation;
