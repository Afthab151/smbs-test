import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="w-full relative flex flex-col justify-center items-center h-full pb-1 md:pb-0 2xl:h-[5vh]">
      <div className="w-full top-0 absolute bg-dark h-[1.7px] mb-1"></div>
      <div className="px-5 w-full flex md:flex-row md:justify-between flex-col justify-center items-center h-auto py-5 md:py-0">
        <div className="text-center md:text-start">
          <p className="text-xs  text-grey md:text-[8px] lg:text-xs 2xl:text-[1.5vh]">
            Copyright &#169; www.essential-invest.com
          </p>
        </div>
        <div className="text-center flex flex-col md:flex-row items-center justify-between w-full md:w-auto md:mt-0 mt-2">
          <div className="text-center flex items-center">
            <a href="https://www.linkedin.com/company/texas-essential-investments/">
              <svg
                fill="#000000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                // width="12px"
                // height="12px"
                viewBox="0 0 512 512"
                className="ml-5 w-[12px] h-[12px]"
              >
                <g id="7935ec95c421cee6d86eb22ecd125aef">
                  <path
                    d="M116.504,500.219V170.654H6.975v329.564H116.504
                  L116.504,500.219z M61.751,125.674c38.183,0,61.968-25.328,61.968-56.953c-0.722-32.328-23.785-56.941-61.252-56.941
                  C24.994,11.781,0.5,36.394,0.5,68.722c0,31.625,23.772,56.953,60.53,56.953H61.751L61.751,125.674z M177.124,500.219
                  c0,0,1.437-298.643,0-329.564H286.67v47.794h-0.727c14.404-22.49,40.354-55.533,99.44-55.533
                  c72.085,0,126.116,47.103,126.116,148.333v188.971H401.971V323.912c0-44.301-15.848-74.531-55.497-74.531
                  c-30.254,0-48.284,20.38-56.202,40.08c-2.897,7.012-3.602,16.861-3.602,26.711v184.047H177.124L177.124,500.219z"
                  ></path>
                </g>
              </svg>
            </a>
            {/* <svg
              className="ml-5 w-[12px] h-[12px]"
              // width="12px"
              // height="12px"
              viewBox="-5 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>facebook [#176]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-385.000000, -7399.000000)"
                  fill="#000000"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                      id="facebook-[#176]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <svg
              className="ml-5 w-[15px] h-[15px]"
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              // width="12px"
              // height="12px"
              viewBox="0 0 256 256"
              
            >
              <g>
                <g transform="scale(5.33333,5.33333)">
                  <path
                    d="M41,6l-31.071,36h-3.714l31.072,-36z"
                    fill="#000000"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M31.143,41l-23.323,-34h8.957l23.323,34z"
                    fill="#ffffff"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    d="M15.724,9l20.578,30h-4.106l-20.578,-30h4.106M17.304,6h-11.382l24.694,36h11.382l-24.694,-36z"
                    fill="#000000"
                    fill-rule="nonzero"
                  ></path>
                </g>
              </g>
            </svg> */}
            {/* <svg
              className="ml-5 w-[12px] h-[12px]"
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              // width="12px"
              // height="12px"
              viewBox="0 0 512 512"
            >
              <g id="7935ec95c421cee6d86eb22ecd12f847">
                <path
                  d="M459.186,151.787c0.203,4.501,0.305,9.023,0.305,13.565
                  c0,138.542-105.461,298.285-298.274,298.285c-59.209,0-114.322-17.357-160.716-47.104c8.212,0.973,16.546,1.47,25.012,1.47
                  c49.121,0,94.318-16.759,130.209-44.884c-45.887-0.841-84.596-31.154-97.938-72.804c6.408,1.227,12.968,1.886,19.73,1.886
                  c9.55,0,18.816-1.287,27.617-3.68c-47.955-9.633-84.1-52.001-84.1-102.795c0-0.446,0-0.882,0.011-1.318
                  c14.133,7.847,30.294,12.562,47.488,13.109c-28.134-18.796-46.637-50.885-46.637-87.262c0-19.212,5.16-37.218,14.193-52.7
                  c51.707,63.426,128.941,105.156,216.072,109.536c-1.784-7.675-2.718-15.674-2.718-23.896c0-57.891,46.941-104.832,104.832-104.832
                  c30.173,0,57.404,12.734,76.525,33.102c23.887-4.694,46.313-13.423,66.569-25.438c-7.827,24.485-24.434,45.025-46.089,58.002
                  c21.209-2.535,41.426-8.171,60.222-16.505C497.448,118.542,479.666,137.004,459.186,151.787z"
                ></path>
              </g>
            </svg> */}
          </div>
          <Link to="/privacy">
            <p className="pl-5 pt-2 md:pt-0 text-xs text-gray text-center md:text-[8px] lg:text-xs  2xl:text-[1.5vh]">
              Privacy Policy
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
