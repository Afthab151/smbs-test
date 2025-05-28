import { Link } from "react-router-dom";
import { LOGO } from "../../asset";
import { HashLink } from "react-router-hash-link";
export const navLink = [
  {
    id: 0,
    title: "HOME",
    link: "/home",
    hashed: false,
  },
  {
    id: 1,
    title: "ABOUT US",
    link: "/about",
    hashed: false,
  },
  {
    id: 2,
    title: "INVESTMENTS",
    link: "/investments",
    // link: "/portal",
    hashed: false,
  },
  // {
  //   id: 4,
  //   title: "TEI SIDE HUSTLES",
  //   link: "/home/#side-hustles",
  //   hashed: true,
  // },
  {
    id: 3,
    title: "TEI FOMO FUND I",
    link: "/fomo_fund",
    hashed: false,
  },
  {
    id: 4,
    title: "CONTACT US",
    link: "/contact",
    hashed: false,
  },
];

const Hamburger = ({ open, setOpen }) => {
  return (
    <div
      className="flex relative w-8 h-8 flex-col justify-between items-center md:hidden z-20 pr-5"
      onClick={() => {
        setOpen(!open);
      }}
    >
      {/* hamburger button */}
      <span
        className={`h-1 w-8 rounded-lg transform transition duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-3.5 bg-black" : "bg-black"
        }`}
      />
      <span
        className={`h-1 bg-black rounded-lg transition-all duration-300 ease-in-out ${
          open ? "w-[0px] bg-black" : "w-8"
        }`}
      />
      <span
        className={`h-1 w-8 rounded-lg transform transition duration-300 ease-in-out ${
          open ? "-rotate-45 -translate-y-3.5 bg-black" : "bg-black"
        }`}
      />
    </div>
  );
};
function MobileNav({ open, setOpen, id, setId }) {
  return (
    <div
      className={`absolute top-0 left-0 h-auto w-screen bg-white transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md z-10`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="h-[70px] w-[250px]">
          <img
            src={LOGO.logo}
            alt="images"
            style={{ width: "100%", height: "100%" }}
            className=" object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col px-4 my-5 w-full">
        {navLink.map((data, index) => (
          <>
            {data.hashed ? (
              <HashLink
                smooth
                className="no-underline text-xl font-medium text-center"
                key={data.id}
                to={data.link}
                onClick={() => {
                  setId(data.id);
                  setTimeout(() => {
                    setOpen(!open);
                  }, 100);
                }}
              >
                <p
                  className={`font-semibold ${
                    index === id
                      ? "text-primary border-b-2 border-secondary"
                      : "text-dark"
                  }`}
                >
                  {data.title}
                </p>
              </HashLink>
            ) : (
              <Link
                className="no-underline text-xl font-medium text-center "
                key={data.id}
                to={data.link}
                onClick={() => {
                  setId(data.id);
                  setTimeout(() => {
                    setOpen(!open);
                  }, 100);
                }}
              >
                <p
                  className={`font-semibold pt-3 ${
                    index === id
                      ? "text-primary border-b-2 border-secondary"
                      : "text-dark"
                  }`}
                >
                  {data.title}
                </p>
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default function Header({ setOpen, open, id, setId }) {
  return (
    <>
      <nav className="flex filter items-center relative justify-center z-10 w-full px-10">
        <div className="w-full h-full flex justify-center">
          <MobileNav open={open} setOpen={setOpen} id={id} setId={setId} />
          <Link
            to="/"
            className="w-full md:w-2/12 h-full flex items-center justify-start"
          >
            <img
              src={LOGO.logo}
              alt="images"
              // style={{ height: "100%" }}
              className="object-contain"
            />
          </Link>
          <div className="w-10/12 flex justify-end items-center">
            <Hamburger open={open} setOpen={setOpen} />

            <div className="hidden md:flex justify-between items-start w-auto">
              {navLink.map((data, index) => (
                <>
                  {data.hashed ? (
                    <HashLink
                      smooth
                      className="no-underline"
                      key={data.id}
                      to={data.link}
                      onClick={() => {
                        setId(data.id);
                      }}
                    >
                      <p
                        className={`mr-8 text-[12px] font-semibold ${
                          index === id
                            ? "text-primary border-b-2 border-secondary"
                            : "text-dark"
                        }`}
                      >
                        {data.title}
                      </p>
                    </HashLink>
                  ) : (
                    <Link
                      key={data.id}
                      to={data.link}
                      onClick={() => {
                        setId(data.id);
                      }}
                    >
                      <p
                        className={`mr-8 text-[15px] md:text-[12px] lg:text-[15px] font-semibold ${
                          index === id
                            ? "text-primary border-b-2 border-secondary"
                            : "text-dark"
                        }`}
                      >
                        {data.title}
                      </p>
                    </Link>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
