import styles from "./styles/ProfileImages.module.css";
import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import useImg from "../hooks/useImg";
import SaveImages from "../../utils/requests/PostImages";
import ProfileImageData from "../../data/ProfileImageData";
import useLoadAnimation from "../hooks/useLoadAnimation";
import Icon from "../../utils/other/Icon";
import ReactPaginate from "react-paginate";

function AllProfileImages({ filteredImages, itemsPerPage }) {
  const { userId } = useAuth();

  const { imageData, setImageData } = useImg();

  const { fadeAnim } = useLoadAnimation();

  const handleProfilePic = async (pathname: string) => {
    // Store image pathname to db
    const imgSaveData = { profilePathname: pathname, userId };
    const result = await SaveImages({ imgSaveData });

    // update image pathname in context
    if (result) {
      setImageData({ ...imageData, profile_pathname: pathname });
    }
  };

  // Mark profile image as checked when profile image is changed/selected by user
  const handleCheckbox = (slug: string): boolean => {
    if (
      imageData.profile_pathname &&
      slug === imageData.profile_pathname.split("%2F")[2]
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleColours = (path) => {
    let style = "text-sky-700 border-sky-400";
    if (imageData.profile_pathname === path) {
      style = "text-green-600 border-green-300";
    }

    return style;
  };

  return (
    <div
      id="profile-img"
      className={`${fadeAnim} grid gap-14 px-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-16 xl:gap-y-10`}
    >
      {filteredImages.map((data, dataIndex) => {
        return data.imgSlugs.map((slug, index) => {
          const path = `/origami%2F${data.subFolder}%2F${slug}`;
          if (dataIndex <= itemsPerPage) {
            return (
              <div
                className="allImages-center group flex cursor-pointer flex-col justify-center text-sm hover:border-green-400 hover:text-green-600"
                key={slug + index + dataIndex}
              >
                {" "}
                <button
                  className={`${styles["unlockable-img-card"]} allImages-center flex flex-col justify-center gap-3 text-sm`}
                  onClick={() => handleProfilePic(path)}
                >
                  <h3 className="flex w-full items-center justify-center capitalize">
                    {slug.split("-").join(" ")}
                  </h3>
                  <picture className="relative flex h-[210px] w-[160px] justify-center">
                    <source
                      srcSet={`https://www.honeycombartist.com${path}.webp`}
                      type="image/webp"
                    />
                    <img
                      src={`https://www.honeycombartist.com${path}.jpg`}
                      alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
                      className={`${styles["unlockable-img"]} relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
                      width={190}
                      height={245}
                      loading="lazy"
                    />
                    <div className="absolute -bottom-2 scale-[1.6] text-red-500 group-hover:text-green-400">
                      <Icon
                        icon="lockClosed"
                        title="locked-images"
                        customStyle=""
                      />
                    </div>
                  </picture>
                </button>
                <label
                  htmlFor={`profile-img-checkbox${index}`}
                  className={`mt-12 cursor-pointer rounded-lg border-2 px-8 py-2 text-center  ${
                    path !== imageData.profile_pathname &&
                    "group-hover:border-green-400 group-hover:text-green-600"
                  }   ${handleColours(path)}`}
                >
                  {imageData.profile_pathname === path
                    ? "Equipped"
                    : "Apply (Unlock)"}
                </label>
                <input
                  id={`profile-img-checkbox${index}`}
                  type="checkbox"
                  name="all-imgs"
                  className="hidden"
                  checked={handleCheckbox(slug)}
                  readOnly
                />
              </div>
            );
          }
        });
      })}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const allImages = useMemo(() => ProfileImageData(), [])[0].folderData; //Object of images to be fetched

  const endOffset = itemOffset + itemsPerPage;
  const filteredImages = allImages.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(allImages.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allImages.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <AllProfileImages
        filteredImages={filteredImages}
        itemsPerPage={itemsPerPage}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1 text-sm text-sky-700 lg:gap-3"
        nextLinkClassName="border-2 px-4 py-2 rounded-lg border-sky-500 hover:border-green-400 hover:text-green-600"
        previousLinkClassName="border-2 px-4 py-2 rounded-lg border-sky-500 hover:border-green-400 hover:text-green-600"
        pageLinkClassName="hidden sm:flex border-2 px-3 py-2 rounded-lg border-sky-500 hover:border-green-400 hover:text-green-600"
        activeLinkClassName="!flex mx-8 sm:mx-0 text-green-600 !border-green-400"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

//Used by Profile.tsx component
export default function ProfileImages() {
  const itemsPerPage = 20;
  return (
    <div className="text-defaultblue">
      <div className="allImages-center flex flex-col items-center justify-center gap-10 text-3xl">
        <h2>Profile Images</h2>
        <PaginatedItems itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}
