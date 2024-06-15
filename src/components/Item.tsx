import { useContext, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@mdi/react";
import { mdiHeartOutline, mdiHeart } from "@mdi/js";
import { AppContext } from "../appContext";
import AddToCartButton from "./cart/AddToCartButton";
import { RouteNames } from "../types/RouteNames";

interface plantDataProps {
  plantData: {
    id: number;
    name: string;
    price: number;
    img: string;
    description: string;
    isFavorite: boolean;
    forBeginners: boolean;
    isPetSafe: boolean;
  };
}

const Item: React.FC<plantDataProps> = ({ plantData }) => {
  const context = useContext(AppContext);

  const setFavorite = (e: SyntheticEvent) => {
    e.stopPropagation();
    context?.toggleFavorite(plantData.id);
  };

  console.log(plantData, "plantdata...............")

  return (
    <div className="border-[0.5px] border-[#d885c6] flex flex-col overflow-hidden rounded-md  w-full min-w-[240px] max-w-[250px] sm:w-4/5 mx-10">
      <div className="z-10 relative">
        <div
          onClick={setFavorite}
          className="absolute left-3 top-3 cursor-pointer text-red-500"
        >
          {plantData.isFavorite ? (
            <Icon path={mdiHeart} size={1.4} />
          ) : (
            <Icon path={mdiHeartOutline} size={1.4} />
          )}
        </div>
      </div>
      <Link
        to={`${RouteNames.HOME + RouteNames.SHOP}/${plantData.id}`}
        aria-label="Plant details"
      >
        <img
          src={plantData.img}
          alt="Plant image"
          className="w-[400px] h-[270px] object-cover transition duration-400 ease-in-out transform hover:scale-110 cursor-pointer border-b border-[#c038a2]"
        />
      </Link>
      <div className="z-10 flex flex-col items-center pt-2 bg-white text-gray-800">
        <Link
          to={`${RouteNames.HOME + RouteNames.SHOP}/${plantData.id}`}
          aria-label="Plant details"
          className="mb-1 cursor-pointer text-lg text-[#c038a2] font-semibold no-underline"
        >
          {plantData.name}
        </Link>
        <div className="text-lg">€{plantData.price}.00</div>
        <AddToCartButton id={plantData.id} />
      </div>
    </div>
  );
};

export default Item;