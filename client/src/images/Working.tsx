import { ReactElement } from 'react';
import styled from 'styled-components';

interface PropsType {
  transform?: string;
}

const Wrapper = styled.div<PropsType>`
  transform: ${(props) => props.transform};
`;
const Working = ({ transform }: PropsType): ReactElement => {
  return (
    <Wrapper transform={transform}>
      <svg
        width="600"
        height="280"
        viewBox="0 0 600 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(0,4)"
      >
        <path
          d="M280.84 176.728C280.84 176.728 287.23 179.118 289.01 179.138C290.79 179.158 295.03 177.718 296.93 177.938C298.83 178.158 302.45 178.608 302.45 178.608"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M302.45 178.608C302.45 178.608 316.88 183.178 320.9 186.188C324.92 189.198 327.7 195.028 324.8 194.118C321.9 193.208 317.08 189.798 317.08 189.798"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.5s"
            values="-10,302.45,178.61;5,302.45,178.61;-10,302.45,178.61;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M298.85 181.008C298.85 181.008 305.55 175.138 311.71 177.148C317.87 179.158 317.75 191.378 317.81 192.788C317.87 194.198 313.97 193.198 312.91 190.188C311.85 187.178 310.58 183.818 310.58 183.818C310.58 183.818 306.47 184.928 304.65 184.548"
          fill="white"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.6s"
            values="5,302.45,178.61;-10,302.45,178.61;5,302.45,178.61;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M298.82 186.178C298.82 186.178 305.29 183.728 309.08 185.458C312.87 187.188 320.9 197.218 320.9 199.228C320.9 201.238 319.28 201.778 317.08 200.508C314.88 199.238 309.75 193.798 306.8 192.498"
          fill="white"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.5s"
            begin="0.1s"
            values="5,302.45,178.61;-10,302.45,178.61;5,302.45,178.61;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M298.48 192.038C298.48 192.038 299.02 191.898 299.99 191.878C301.44 191.848 303.84 192.078 306.85 193.408C311.87 195.628 312.87 199.218 313.33 201.098C313.79 202.978 313.87 207.248 311.72 206.748C309.57 206.248 306.85 201.218 304.66 198.938C303.521 197.753 301.174 197.876 298.48 198.35"
          fill="white"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.8s"
            begin="0.2s"
            values="5,298.48,192.038;-10,298.48,192.038;5,298.48,192.038;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M276.09 195.668C276.09 195.668 285.81 200.398 290.81 199.808C293.21 199.525 295.993 198.788 298.48 198.35"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M358.42 183.398C358.42 183.398 364.03 182.168 366.04 186.178C368.05 190.188 367.04 196.208 366.04 197.218C365.04 198.228 362.26 195.638 362.65 193.418C363.04 191.198 362.13 188.408 359.07 188.298"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M362.67 181.968C362.67 181.968 368.05 183.168 369.05 186.178C370.05 189.188 370.05 193.198 370.05 195.208C370.05 197.218 368.04 198.218 367.04 195.208"
          fill="#FFFFFF"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.8s"
            begin="0s"
            values="5,362.67,181.97;-10,362.67,181.97;5,362.67,181.97;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M342.87 175.418C342.87 175.418 350.89 176.158 352.45 176.148C354.01 176.138 371.81 178.368 371.44 189.298"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M358.42 183.398C358.42 183.398 364.03 182.168 366.04 186.178C368.05 190.188 367.04 196.208 366.04 197.218C365.04 198.228 362.26 195.638 362.65 193.418C363.04 191.198 362.13 188.408 359.07 188.298"
          stroke="#262626"
          fill="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.8s"
            begin="0.3s"
            values="5,362.67,181.97;-10,362.67,181.97;5,362.67,181.97;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M346.52 193.198C346.52 193.198 351.54 192.978 355.78 195.088C360.02 197.198 357.64 207.238 361.84 206.238C366.04 205.238 363.87 198.178 362.44 193.678C361.01 189.178 353.85 186.888 350.98 186.168"
          fill="#FFFFFF"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="0.7s"
            begin="0.4s"
            values="5,346.52,193.2;-10,346.52,193.2;5,346.52,193.2;"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M334.26 185.658C334.26 185.658 338.18 200.038 343.08 201.638C347.98 203.238 354 204.238 354 202.228C354 200.218 351.9 198.818 349.44 198.008C346.98 197.198 346.06 195.208 346.52 193.198"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M237.61 82.8281C224.57 79.8181 228.99 65.8481 228.53 62.5481C228.07 59.2481 229.89 52.3081 241.02 44.7481C252.15 37.1781 258.9 33.1981 272.83 32.4281C286.77 31.6581 301.74 31.3981 307.8 31.0281C313.86 30.6581 320.53 34.0181 324.22 36.3481C327.91 38.6781 337.86 43.8481 336.9 49.7981C335.94 55.7481 331.8 63.0281 331.8 63.0281C331.8 63.0281 340.06 61.3381 341.51 62.5481C342.96 63.7581 346.97 66.7781 330.92 67.7781"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M323.54 65.0082C325.91 72.7982 330.93 79.5782 345.98 79.1982"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M303.04 65.9982C303.04 65.9982 303.84 71.7982 311.87 73.7982"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M295.15 69.4581C295.15 69.4581 294.45 71.7981 300.14 73.8081"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M255.72 86.5581C252.66 78.8181 247.01 78.6481 244.32 86.7581C241.63 94.8681 240.51 101.278 245.08 102.588C249.65 103.898 251.66 100.888 251.66 100.888"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M248.65 91.8582C248.65 91.8582 249.94 92.8282 250.21 95.0082"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M270.41 93.9182C267.59 102.248 265.48 109.568 272.62 109.248C279.76 108.928 286.1 106.778 289.45 96.8082C292.8 86.8382 293.47 83.6382 286.61 79.7182C279.75 75.7982 273.11 85.9382 270.41 93.9082V93.9182Z"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M302.27 94.4882C296.98 103.998 296.22 109.448 302.03 111.188C307.84 112.928 316.87 108.918 320.88 99.8882C324.89 90.8582 323.89 83.8882 319.88 80.8282C315.87 77.7682 309.74 81.0582 302.27 94.4882Z"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M292.8 96.9381L296.81 97.0681"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M297.78 111.188C297.78 111.188 307.45 113.718 305.14 118.848C302.83 123.978 294.63 118.848 294.63 118.848"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="3s"
            begin="0s"
            values="0,0;5,0;0,0"
            keyTimes="0;0.75;1"
            repeatCount="indefinite"
          />
          <path
            d="M279.38 96.9381V97.2181"
            stroke="#262626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M310.39 99.1781V99.4781"
            stroke="#262626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <path
          d="M331.35 76.4481C331.35 76.4481 333.78 102.048 321.82 117.518C309.86 132.988 295.15 143.838 281.93 146.938C268.72 150.048 259.88 144.288 256.77 139.638"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M279.54 134.928C279.54 134.928 286.78 129.998 289.79 129.998C289.79 129.998 292.19 134.798 294.5 134.398"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M238.9 107.588C238.9 107.588 228.7 94.3082 210.08 97.5982C191.46 100.888 180.15 106.648 165.74 118.318C151.33 129.988 132.34 147.018 127.79 154.058C123.24 161.098 102.19 203.128 100.17 212.718C98.1499 222.308 99.3599 225.088 103.27 228.208L102.72 230.478"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M198.8 100.148C214.88 96.0581 221.43 110.318 220.99 113.628C220.55 116.938 222.08 126.068 219.31 132.538C216.54 139.008 220.16 153.578 224.37 158.338C228.58 163.098 238.18 171.468 249.94 171.798C261.7 172.128 282.49 172.298 284.13 172.718C284.13 172.718 276.74 179.148 275.74 188.178C274.74 197.208 279.06 202.768 279.06 202.768C279.06 202.768 278.13 203.828 276.43 204.528C274.73 205.228 239.28 203.188 228.41 201.698C217.54 200.208 197.04 195.988 192.24 193.588C187.44 191.188 175.74 186.548 169.05 169.308C162.36 152.058 166.71 142.028 169.05 136.008C171.39 129.988 178.05 105.428 198.8 100.148V100.148Z"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M220.04 234.688C220.04 234.688 216.46 228.528 219.01 228.928C221.56 229.328 359.07 228.108 359.07 228.108L363.54 234.418"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M359.07 228.098C359.07 228.098 413.8 140.608 414.53 139.088C415.26 137.568 418.22 135.008 428.25 135.008C438.28 135.008 550.48 144.818 555.59 145.428C560.7 146.038 558.69 152.058 557.68 154.068C556.67 156.078 511.3 231.508 511.3 231.508C511.3 231.508 509.4 235.028 505.95 234.678"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M323.12 168.678C323.12 168.678 341.96 172.128 345.97 174.128C345.97 174.128 330.38 178.438 333.16 194.848H330.25"
          fill="white"
        />
        <path
          d="M323.12 168.678C323.12 168.678 341.96 172.128 345.97 174.128C345.97 174.128 330.38 178.438 333.16 194.848H330.25"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M281.83 208.138C278.75 213.268 280.16 223.608 282.97 224.458"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M320 130.898C329.92 135.008 336.34 139.508 329.12 151.308C321.9 163.108 323.68 163.148 323.68 163.148"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M451.29 193.298C450.13 192.118 449.58 190.468 449.25 188.848C449.05 187.868 448.93 186.838 449.18 185.878C449.49 184.718 450.35 183.748 451.38 183.128C452.41 182.508 453.61 182.218 454.81 182.098C456.01 181.978 457.26 182.018 458.38 182.478C460.79 183.478 462.08 186.418 461.51 188.958C460.63 192.948 454.74 196.818 451.28 193.298H451.29Z"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M470.17 191.458C469.23 191.028 468.1 191.098 467.18 191.568C466.26 192.038 465.57 192.908 465.23 193.878C465.07 194.338 464.98 194.838 465.12 195.298C465.3 195.928 465.88 196.398 466.5 196.598C467.12 196.798 467.8 196.788 468.46 196.728C468.81 196.698 469.17 196.648 469.46 196.458C469.74 196.278 469.93 195.988 470.09 195.708C470.68 194.658 471.05 193.478 471.16 192.278C471.25 193.458 471.33 194.638 471.42 195.818C471.44 196.158 471.48 196.518 471.66 196.808C471.74 196.928 471.84 197.028 471.88 197.158C471.92 197.288 471.9 197.468 471.78 197.528"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M476.69 188.628C477.14 187.698 477.86 186.858 478.81 186.468C480.15 185.928 481.69 186.358 482.97 187.028C483.49 187.298 484 187.618 484.38 188.068C484.83 188.608 485.07 189.298 485.16 189.988C485.4 191.838 484.68 193.678 483.81 195.328C483.59 195.748 483.36 196.168 483.01 196.478C482.49 196.938 481.76 197.118 481.07 197.138C478.97 197.198 477.65 196.158 476.76 194.338C475.87 192.518 475.82 190.408 476.69 188.628Z"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M295.42 199.338C295.42 199.338 297.09 204.758 298.96 204.498C300.83 204.238 301.53 198.528 301.53 198.528"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Wrapper>
  );
};
export default Working;
