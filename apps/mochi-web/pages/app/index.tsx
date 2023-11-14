import { Alert } from '@consolelabs/core'
import { Modal, ModalContent, ModalTrigger } from '@consolelabs/core'
import AuthLayout from '~components/auth-layout'
import Link from 'next/link'
import useSWR from 'swr'
import { shallow } from 'zustand/shallow'
import { API } from '~constants/api'
import { useProfileStore } from '~store'
import { boringAvatar } from '~utils/string'
import clsx from 'clsx'
import NewAppForm from '~cpn/new-app-form'
import Button from '~cpn/base/button/button'
import CopyButton from '~cpn/CopyButton'
import { NextPageWithLayout } from '~pages/_app'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { useState } from 'react'

const Pattern = (props: any) => {
  return (
    <svg
      {...props}
      viewBox="0 0 672 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M506.166 -22.9502C502.724 -18.6862 499.287 -14.421 495.849 -10.1553L495.848 -10.1547C492.408 -5.88633 488.968 -1.61742 485.523 2.6504L485.523 2.65066C484.734 3.62725 484.531 4.34178 484.569 4.86814C484.607 5.38505 484.903 6.06002 485.867 6.90677L485.87 6.90887C494.062 14.1315 502.244 21.3765 510.422 28.6178C512.018 30.031 513.614 31.4441 515.21 32.8569L515.289 32.7628L516.446 33.7174C518.142 35.1167 519.821 36.5204 521.496 37.9201C525.414 41.195 529.306 44.448 533.325 47.5714L533.326 47.572C537.888 51.121 542.671 54.4357 547.533 57.61L506.166 -22.9502ZM506.166 -22.9502C506.27 -23.0751 506.369 -23.2034 506.449 -23.3078L506.463 -23.3253C506.554 -23.4443 506.626 -23.5363 506.695 -23.6193C506.826 -23.7739 506.886 -23.8178 506.894 -23.8232C506.894 -23.8236 506.895 -23.8238 506.895 -23.8238L506.902 -23.8278C507.985 -24.4337 509.088 -24.981 510.224 -25.5415C510.272 -25.4517 510.32 -25.3629 510.368 -25.2757C510.516 -25.002 510.656 -24.7436 510.774 -24.5152C511.159 -23.7694 511.43 -23.1315 511.547 -22.5192L511.547 -22.516C512.884 -15.602 514.156 -8.70285 515.429 -1.79682C516.45 3.74351 517.472 9.28828 518.529 14.8488C519.296 18.8825 520.59 21.9089 522.998 23.9376C525.394 25.9575 528.64 26.7721 532.791 26.9887C535.509 27.1313 538.226 27.2708 540.941 27.4101C550.665 27.9092 560.376 28.4075 570.079 29.0514C570.751 29.0967 571.653 29.323 572.433 29.6773C572.818 29.8521 573.129 30.0388 573.351 30.2153C573.585 30.4014 573.639 30.5125 573.639 30.5124L573.64 30.5141C573.713 30.6888 573.753 31.2416 573.48 32.1274C573.227 32.9475 572.802 33.737 572.391 34.2238L572.391 34.2246C568.767 38.5273 565.081 42.7025 561.383 46.8918C558.514 50.1416 555.638 53.3998 552.778 56.7326L552.777 56.7329C551.84 57.8256 550.971 58.2732 550.216 58.3805C549.46 58.4878 548.573 58.2887 547.533 57.6101L506.166 -22.9502Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M528.083 8.75072L528.082 8.74766C525.185 -5.32962 522.471 -19.4423 520.116 -33.6027L520.115 -33.6036C520.041 -34.0503 520.201 -34.863 520.713 -35.8447C521.206 -36.7886 521.887 -37.6212 522.484 -38.0833L522.485 -38.084C522.655 -38.2159 523.266 -38.4194 524.264 -38.3826C525.207 -38.348 526.055 -38.1123 526.496 -37.8419L526.499 -37.8401C531.181 -34.9837 535.649 -31.7148 540.019 -28.313L540.02 -28.3128C555.364 -16.3737 570.262 -4.03092 583.429 10.173C584.097 10.8952 584.799 11.9199 585.272 12.9532C585.773 14.0477 585.886 14.8615 585.781 15.2868L585.781 15.2883C585.186 17.7066 582.717 19.1846 579.593 19.0268C565.014 18.2816 550.441 17.3977 535.87 16.4214L535.869 16.4213C535.22 16.3786 534.525 16.1752 533.654 15.8466C533.39 15.7472 533.096 15.63 532.781 15.5048C532.307 15.3159 531.787 15.109 531.259 14.9177C530.911 14.3011 530.523 13.6724 530.157 13.0797C529.897 12.6581 529.648 12.2547 529.432 11.8868C528.773 10.7605 528.287 9.75328 528.083 8.75072Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M331.022 26.2542L331.198 26.0461L332.344 27.0135C334.47 28.807 336.578 30.6083 338.683 32.4061C343.519 36.5385 348.335 40.6526 353.29 44.6125L353.291 44.6128C358.813 49.0287 366.521 46.8807 369.506 40.2146L369.506 40.2146C371.686 35.3479 371.166 30.3214 370.599 24.8363C370.572 24.5758 370.545 24.3144 370.518 24.0518C370.183 20.7891 369.109 18.708 367.563 17.4984C366.01 16.2837 363.696 15.7256 360.408 16.1219L360.407 16.122C357.26 16.4998 354.12 16.9745 350.955 17.4529C350.375 17.5407 349.794 17.6285 349.212 17.7159L331.022 26.2542ZM331.022 26.2542C329.132 24.6594 327.24 23.0654 325.349 21.4715C320.803 17.6399 316.258 13.8089 311.722 9.96935M331.022 26.2542L311.723 9.97011C311.723 9.96985 311.723 9.9696 311.722 9.96935M311.722 9.96935C309.68 8.23635 309.151 7.20263 309.141 6.50932C309.132 5.83509 309.609 4.82205 311.622 3.10891L311.622 3.1086M311.722 9.96935L311.622 3.1086M311.622 3.1086C317.47 -1.87249 324.044 -5.3513 331.585 -6.6746C333.993 -7.09692 335.186 -6.92235 335.936 -6.45213C336.699 -5.97329 337.385 -4.95206 338.126 -2.61938C339.858 2.86098 341.577 8.33266 343.215 13.8185L343.215 13.8193M311.622 3.1086L343.215 13.8193M343.215 13.8193C343.609 15.1344 344.262 16.2989 345.368 17.0365M343.215 13.8193L345.368 17.0365M345.368 17.0365C346.488 17.7829 347.818 17.9259 349.211 17.716L345.368 17.0365Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M373.17 -14.8458L373.167 -14.8486C372.746 -15.2665 372.317 -15.6131 371.828 -16.0086C371.58 -16.2089 371.317 -16.4218 371.031 -16.6628C370.703 -16.9395 370.416 -17.1951 370.146 -17.4346C369.632 -17.8917 369.184 -18.2898 368.649 -18.6621L368.645 -18.6652L368.645 -18.6652C365.666 -20.7541 362.847 -21.5587 360.347 -21.2647C357.87 -20.9734 355.463 -19.5746 353.336 -16.7669L373.17 -14.8458ZM373.17 -14.8458C375.509 -12.534 376.524 -10.5308 376.603 -8.72202M373.17 -14.8458L376.603 -8.72202M350.198 -8.44729L350.198 -8.44725C349.839 -4.85776 352.035 -1.1442 355.463 1.31485C358.891 3.7747 363.094 4.65109 366.345 3.15103C368.997 1.92517 371.409 -0.298332 373.663 -2.65835L350.198 -8.44729ZM350.198 -8.44729C350.487 -11.3446 351.636 -14.5197 353.336 -16.7663L350.198 -8.44729ZM376.603 -8.72202C376.681 -6.93799 375.863 -4.96226 373.664 -2.65844L376.603 -8.72202Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <mask id="path-5-inside-1_5855_75808" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M404.434 88.0883C393.196 75.8007 380.651 74.6069 369.25 84.7333C361.728 91.4087 358.802 100.375 360.737 108.697C355.375 108.723 349.468 109.569 344.101 111.033C343.534 111.188 342.924 111.352 342.282 111.524C331.958 114.296 313.116 119.355 321.423 128.8C357.723 170.063 360.084 172.246 368.137 155.071L368.144 155.064C373.566 143.495 376.903 134.735 378.328 128.098C385.921 130.822 393.899 128.563 402.212 121.319C413.181 111.767 414.062 98.6164 404.434 88.0883Z"
        />
      </mask>
      <path
        d="M369.25 84.7333L371.24 86.9778L371.241 86.9771L369.25 84.7333ZM404.434 88.0883L406.647 86.0629L406.647 86.0629L404.434 88.0883ZM360.737 108.697L360.752 111.697L364.51 111.679L363.659 108.017L360.737 108.697ZM344.101 111.033L343.312 108.138L343.31 108.138L344.101 111.033ZM342.282 111.524L343.06 114.422L343.06 114.422L342.282 111.524ZM321.423 128.8L319.171 130.783L319.171 130.783L321.423 128.8ZM368.137 155.071L366.102 152.866L365.67 153.265L365.421 153.796L368.137 155.071ZM368.144 155.064L370.179 157.268L370.61 156.87L370.86 156.338L368.144 155.064ZM378.328 128.098L379.341 125.273L376.116 124.116L375.396 127.467L378.328 128.098ZM402.212 121.319L400.243 119.056L400.242 119.056L402.212 121.319ZM371.241 86.9771C376.479 82.3246 381.673 80.5213 386.618 80.9926C391.617 81.469 396.924 84.322 402.221 90.1138L406.647 86.0629C400.706 79.5671 394.121 75.6793 387.188 75.0185C380.201 74.3526 373.421 77.0156 367.258 82.4895L371.241 86.9771ZM363.659 108.017C361.999 100.883 364.449 93.0056 371.24 86.9778L367.259 82.4888C359.008 89.8118 355.604 99.8669 357.816 109.377L363.659 108.017ZM344.89 113.928C350.023 112.527 355.669 111.723 360.752 111.697L360.722 105.696C355.081 105.724 348.913 106.61 343.312 108.138L344.89 113.928ZM343.06 114.422C343.7 114.25 344.316 114.085 344.892 113.927L343.31 108.138C342.751 108.291 342.149 108.453 341.505 108.626L343.06 114.422ZM323.675 126.818C322.096 125.023 322.305 124.122 322.499 123.648C322.859 122.774 323.999 121.59 326.336 120.275C330.902 117.706 337.786 115.838 343.06 114.422L341.505 108.626C336.454 109.982 328.755 112.029 323.396 115.044C320.77 116.521 318.111 118.547 316.952 121.364C315.628 124.582 316.596 127.855 319.171 130.783L323.675 126.818ZM365.421 153.796C364.422 155.927 363.559 157.653 362.738 159.016C361.905 160.397 361.222 161.223 360.65 161.688C360.152 162.095 359.792 162.19 359.426 162.186C358.964 162.18 358.166 162.002 356.877 161.254C354.228 159.718 350.546 156.417 345.078 150.661C339.674 144.973 332.762 137.148 323.675 126.818L319.171 130.783C328.234 141.084 335.23 149.006 340.729 154.795C346.165 160.517 350.382 164.425 353.868 166.446C355.646 167.476 357.474 168.163 359.351 168.187C361.324 168.211 363.017 167.5 364.44 166.341C365.789 165.24 366.895 163.74 367.875 162.115C368.866 160.471 369.838 158.508 370.852 156.345L365.421 153.796ZM366.109 152.86L366.102 152.866L370.172 157.275L370.179 157.268L366.109 152.86ZM375.396 127.467C374.044 133.761 370.827 142.271 365.428 153.79L370.86 156.338C376.305 144.72 379.761 135.709 381.261 128.728L375.396 127.467ZM400.242 119.056C392.409 125.882 385.548 127.5 379.341 125.273L377.316 130.922C386.293 134.143 395.389 131.244 404.182 123.582L400.242 119.056ZM402.221 90.1138C406.573 94.873 408.379 100.014 408.054 104.869C407.729 109.733 405.238 114.706 400.243 119.056L404.181 123.582C410.155 118.38 413.589 112.001 414.039 105.27C414.49 98.5296 411.922 91.8318 406.647 86.0629L402.221 90.1138Z"
        fill="#F0EDE8"
        mask="url(#path-5-inside-1_5855_75808)"
      />
      <path
        d="M490.334 60.962L491.12 61.6491L492.037 61.1515C493.547 60.3323 494.984 59.5485 496.348 58.8036C501.246 56.1308 505.223 53.9605 508.397 52.4621C510.424 51.5048 512.045 50.8605 513.314 50.5341C514.627 50.1962 515.305 50.2688 515.625 50.4103C515.812 50.4935 516.097 50.6928 516.254 51.5609C516.419 52.4775 516.381 53.8818 516.051 55.9259C515.395 59.9911 513.687 66.0334 511.006 74.566L510.1 77.4489L512.944 76.4274C518.585 74.4012 523.02 73.0065 526.274 72.36C527.905 72.0361 529.162 71.9164 530.087 71.9697C531.034 72.0243 531.427 72.2474 531.577 72.3914C531.677 72.4876 531.849 72.7186 531.798 73.4141C531.745 74.1403 531.455 75.1833 530.814 76.613C529.537 79.4608 527.066 83.4242 523.295 88.7079L521.357 91.4239L524.675 91.0707C528.487 90.6649 531.27 90.6899 533.213 90.9997C535.205 91.3172 536.045 91.8897 536.356 92.3089C536.591 92.6262 536.72 93.1359 536.319 94.1009C535.909 95.0884 535.026 96.3013 533.677 97.6423C530.996 100.306 526.812 103.144 522.219 105.342C517.615 107.545 512.76 109.028 508.752 109.127C484.601 109.72 465.359 91.0556 469.251 68.294C470.425 65.9766 471.582 63.5676 472.714 61.2017C472.815 60.989 472.917 60.7765 473.018 60.5646C474.079 58.3459 475.117 56.1766 476.133 54.1445C478.391 49.6323 480.443 46.0145 482.271 44.1083C483.2 43.1393 483.828 42.8735 484.175 42.8551C484.385 42.8441 484.848 42.9076 485.542 43.9015C486.247 44.9108 486.999 46.6354 487.742 49.3299C488.478 52.0001 489.178 55.5202 489.831 60.0418L489.91 60.5911L490.328 60.9565L490.334 60.962Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M401.14 43.1364C402.789 44.612 404.437 46.0882 406.086 47.5644C415.563 56.0515 425.041 64.5387 434.613 72.9185C438.895 76.6783 443.734 76.6941 447.26 72.8226L401.14 43.1364ZM401.14 43.1364L401.029 43.0414C393.174 36.3186 382.443 27.1335 390.946 16.5432L401.14 43.1364ZM442.568 18.6465L442.505 18.718L443.631 19.7093L443.638 19.715C446.252 22.0171 448.867 24.3172 451.482 26.6171C456.709 31.2154 461.936 35.8125 467.153 40.4219L442.568 18.6465ZM442.568 18.6465C437.208 14.0371 431.796 9.51333 426.373 4.98128C422.696 1.90766 419.014 -1.16975 415.341 -4.2802C414.492 -4.99333 413.851 -5.22717 413.385 -5.23145C412.976 -5.23521 412.418 -5.06319 411.694 -4.2641L442.568 18.6465ZM446.155 71.8075L446.156 71.8069C453.542 63.7059 460.756 55.4253 467.845 47.0517C469.225 45.4206 469.53 44.398 469.446 43.6483C469.357 42.8561 468.783 41.8623 467.154 40.4221L446.155 71.8075ZM446.155 71.8075C444.635 73.4766 442.926 74.221 441.212 74.2289C439.475 74.2369 437.534 73.4872 435.597 71.7867L435.596 71.7854M446.155 71.8075L435.596 71.7854M435.596 71.7854C426.031 63.4117 416.561 54.931 407.083 46.4438C405.434 44.9672 403.785 43.4905 402.135 42.0141L402.123 42.0031M435.596 71.7854L402.123 42.0031M402.123 42.0031L402.11 41.9924M402.123 42.0031L402.11 41.9924M402.11 41.9924C398.124 38.5805 393.659 34.7585 391.178 30.5415M402.11 41.9924L391.178 30.5415M391.178 30.5415C389.957 28.4654 389.274 26.3821 389.325 24.2778M391.178 30.5415L389.325 24.2778M389.325 24.2778C389.375 22.198 390.144 19.9425 392.098 17.5034M389.325 24.2778L392.098 17.5034M392.098 17.5034C396.536 12.281 401.162 7.24032 405.811 2.17417C407.772 0.0379209 409.737 -2.10285 411.693 -4.26369L392.098 17.5034ZM453.172 54.6859L453.178 54.6781C454.664 52.9484 454.876 50.8718 454.35 49.001C453.838 47.1772 452.629 45.5098 451.173 44.2907C449.722 43.0754 447.877 42.1823 445.984 42.118C444.025 42.0515 442.139 42.8864 440.834 44.8559C439.311 46.7289 438.821 48.8158 439.153 50.774C439.483 52.7161 440.598 54.4144 442.068 55.6058C445.018 57.9963 449.75 58.5596 453.165 54.6937L453.172 54.6859Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M422.633 -12.6039L422.619 -12.6175L422.603 -12.6307C422.206 -12.9753 422.08 -13.5111 422.218 -13.9824C422.319 -14.3306 422.536 -14.5757 422.881 -14.6593C433.704 -9.95839 444.295 -4.5537 454.917 0.867248C460.237 3.58169 465.564 6.30021 470.932 8.93648C473.319 10.156 474.083 11.2276 474.221 12.0931C474.367 13.0062 473.941 14.3671 472.238 16.4566C471.382 17.2516 470.545 18.3369 469.785 19.3242L469.74 19.3824C468.897 20.4752 468.113 21.4893 467.31 22.262C466.489 23.0514 465.854 23.3814 465.362 23.4256C464.972 23.4606 464.332 23.343 463.387 22.3056L463.333 22.2472L463.274 22.1947C459.836 19.1389 456.298 16.3061 452.79 13.5035L452.555 13.3157C449.197 10.6334 445.869 7.97491 442.63 5.13595C442.533 4.95521 442.333 4.66944 441.957 4.48539C441.929 4.4716 441.901 4.45878 441.872 4.4469C440.345 3.10293 438.816 1.7636 437.288 0.425342C432.363 -3.88885 427.451 -8.19196 422.633 -12.6039ZM442.357 6.87157C442.354 6.87419 442.352 6.87715 442.349 6.88041C442.036 6.60972 441.724 6.33746 441.413 6.06348C441.328 6.16105 441.324 6.07759 441.324 5.98517C441.324 5.98072 441.324 5.97625 441.324 5.97179C441.324 5.96866 441.324 5.96553 441.324 5.96241L441.424 6.0506L442.357 6.87157Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M497.627 138.022L497.482 138.318L497.474 138.649C497.419 140.818 496.495 142.779 495.333 144.933L495.323 144.95C489.774 154.336 478.962 159.605 466.629 162.699C455.249 165.553 442.889 166.483 432.816 167.242C432.125 167.294 431.444 167.345 430.775 167.396C426.937 165.728 425.016 162 424.101 157.268C423.278 153.01 423.336 148.286 423.386 144.207C423.393 143.625 423.4 143.057 423.405 142.505L423.406 142.314L423.36 142.129C422.789 139.832 422.584 138.214 422.598 136.24C423.045 128.532 425.173 119.743 429.069 112.162C432.976 104.563 438.584 98.3158 445.911 95.4492L446.003 95.4134L446.089 95.3658C448.891 93.8183 451.418 93.7374 453.679 94.5403C455.998 95.3637 458.168 97.1675 460.057 99.6124C463.845 104.515 466.15 111.539 466.213 116.502C466.189 117.073 466.255 117.671 466.521 118.211C466.82 118.817 467.31 119.225 467.881 119.435C468.403 119.626 468.929 119.631 469.352 119.592C469.786 119.551 470.224 119.451 470.622 119.342C471.023 119.231 471.434 119.097 471.81 118.973C471.846 118.961 471.881 118.949 471.916 118.938C472.264 118.823 472.583 118.717 472.89 118.627C473.228 118.528 473.505 118.462 473.73 118.43C473.839 118.414 473.922 118.408 473.981 118.408C474.035 118.408 474.059 118.413 474.059 118.413L474.797 118.583L475.113 118.308L475.651 118.595L476.187 118.161L476.757 118.431L477.164 118.135L477.333 118.252L477.893 118.187C478.078 118.165 478.263 118.142 478.441 118.12L478.444 118.12C478.625 118.097 478.799 118.075 478.971 118.055L479.027 118.049L479.082 118.038C483.919 117.099 489.943 119.392 494.104 123.461C498.235 127.501 500.15 132.879 497.627 138.022Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M619.351 99.9574L619.349 99.9658L619.347 99.9742C616.557 110.881 610.478 117.659 603.179 121.221C595.839 124.803 587.129 125.198 579.043 123.051C577.28 122.578 575.456 123.218 574.301 124.521L532.956 171.139C532.311 171.866 531.215 171.928 530.509 171.306L525.572 166.965C525.2 166.637 524.988 166.171 524.989 165.69L524.989 165.685L524.947 144.269L524.947 144.262C524.945 143.84 525.099 143.429 525.388 143.104L555.15 109.546C556.333 108.212 556.706 106.298 555.989 104.617L555.988 104.617C552.152 95.6417 553.227 84.0032 563.871 71.0497L563.92 70.9901L563.963 70.9258C571.558 59.4582 587.327 58.4866 600.593 64.8306C613.785 71.1396 623.558 84.2752 619.351 99.9574ZM601.01 96.3086C602.887 89.2819 598.41 83.6328 593.031 81.0606C587.744 78.5325 580.653 78.5748 577.035 83.9533C573.263 88.5722 572.306 93.0897 573.419 96.9738C574.52 100.815 577.556 103.714 581.115 105.32C584.675 106.927 588.937 107.327 592.7 105.975C596.525 104.599 599.691 101.459 601.01 96.3086Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M598.099 42.1577L598.063 42.1228L598.025 42.0904C596.341 40.6642 595.698 39.6816 595.553 38.892C595.422 38.1798 595.634 37.2247 596.836 35.648L596.836 35.6477C603.246 27.2326 610.568 19.5549 617.94 11.8248C618.594 11.1388 619.248 10.4523 619.903 9.76487L619.906 9.76162C622.922 6.57427 626.233 4.77239 629.791 4.15124C633.365 3.52731 637.313 4.0734 641.62 5.79902L641.628 5.8022L641.636 5.80529C653.854 10.5394 665.923 16.2562 671.45 28.1384L671.457 28.1545L671.465 28.1704C674.193 33.6895 673.768 38.8723 671.23 43.4376L671.229 43.4381C666.3 52.314 660.947 60.9318 655.57 69.5873C654.168 71.8434 652.765 74.1021 651.367 76.3687L651.367 76.3692C650.587 77.6347 649.779 78.1189 649.031 78.2287C648.234 78.3455 647.144 78.0934 645.727 77.1361C643.888 75.8576 642.189 74.708 640.666 73.6768C637.79 71.7301 635.538 70.2056 634.136 69.0335C633.95 68.8372 633.715 68.6466 633.539 68.5054C633.259 68.2808 632.892 68.003 632.459 67.6831C631.59 67.0416 630.406 66.1968 629.002 65.2059C627.886 64.4184 626.633 63.5394 625.282 62.5916C623.215 61.1409 620.917 59.5288 618.53 57.8367C610.612 52.224 601.974 45.9128 598.099 42.1577Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M659.142 5.2344L659.095 5.20596L659.047 5.181C651.31 1.20805 648.817 -6.50512 650.328 -12.9822C651.83 -19.4267 657.247 -24.543 665.554 -23.545L665.568 -23.5432L665.583 -23.5418C679.189 -22.1738 684.934 -10.342 683.542 -1.05974C682.85 3.55281 680.431 7.28274 676.577 8.8435C672.712 10.4088 666.935 9.98315 659.142 5.2344Z"
        stroke="#F0EDE8"
        strokeWidth="3"
      />
      <path
        d="M630.446 166.444L626.881 165.19C625.608 164.723 624.547 163.811 623.894 162.622L622.119 159.286C617.635 150.82 615.801 141.202 616.856 131.68C617.911 122.159 621.806 113.175 628.034 105.896L637.173 95.2656C641.67 100.402 649.147 102.279 655.638 104.396C658.113 105.203 660.654 105.75 663.22 106.035C669.354 106.716 674.918 111.888 676.628 117.818C678.728 125.102 683.798 131.413 692.198 137.707L681.507 153.555C675.246 160.805 667.784 165.032 658.529 167.504C649.274 169.976 639.489 169.607 630.446 166.444Z"
        stroke="#F0EDE8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Box = ({
  className = '',
  children,
  title,
  cta,
}: {
  className?: string
  children: React.ReactNode
  title: string
  cta?: React.ReactNode
}) => {
  return (
    <div
      className={clsx(
        'py-4 px-6 rounded-xl flex overflow-hidden border border-gray-300/70',
        className,
      )}
    >
      <div className="flex flex-col w-2/3">
        <span className="relative mb-1 text-lg font-medium">{title}</span>
        {children}
      </div>
      <div className="flex relative justify-end items-center w-1/3">{cta}</div>
    </div>
  )
}

const App: NextPageWithLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useProfileStore(
    (s) => ({
      id: s.me?.id,
      name: s.me?.profile_name,
      avatar: s.me?.avatar,
    }),
    shallow,
  )
  const { data: apps, mutate: refresh } = useSWR(
    ['get-list-apps', id],
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI_PROFILE.get(`/applications/list-by-owner/${id}`).json(
        (r) => r ?? [],
      )
    },
  )

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-3">
            <span className="text-lg font-medium"> App list </span>
            <div className="flex flex-wrap gap-3 max-w-3xl">
              {apps?.length ? (
                apps?.map((a: any) => {
                  return (
                    <Link
                      href={`/app/${a.id}`}
                      key={a.application_profile_id}
                      className="flex flex-col gap-y-2 items-center w-20"
                    >
                      <div className="p-1 w-20 h-20 rounded-lg border border-gray-300 hover:bg-gray-200 aspect-square">
                        <img
                          src={a.avatar || boringAvatar(a.id)}
                          alt=""
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <span className="text-xs font-medium break-words">
                        {a.name}
                      </span>
                    </Link>
                  )
                })
              ) : (
                <Alert title="There are nothing yet" className="w-full">
                  <span className="text-sm">
                    You have no apps right now, might consider creating one
                  </span>
                </Alert>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Box
              title="Build an app"
              className="relative bg-[#faf9f7]"
              cta={
                <ModalTrigger asChild>
                  <Button type="button" appearance="secondary" size="sm">
                    Create an app
                  </Button>
                </ModalTrigger>
              }
            >
              <Pattern className="absolute top-0 left-0 w-full" />
              <span className="relative text-sm text-gray-500">
                Create an app to get a live API key with access to multiple
                Mochi products.
              </span>
            </Box>
            <Box title="Test API Key">
              <span className="text-sm text-gray-500">
                Make a sample request to any Mochi product with the key below.
              </span>
              <CopyButton className="self-start mt-2">1234567890</CopyButton>
            </Box>
            <Box
              title="Account settings"
              cta={
                <Button appearance="text" size="sm">
                  Edit
                </Button>
              }
            >
              <span className="text-sm text-gray-500">
                Update your personal information, such as your name, email, and
                password.
              </span>
            </Box>
          </div>
          <ModalContent className="!p-0">
            <NewAppForm
              onClose={() => setIsOpen(false)}
              onCreated={() => refresh()}
            />
          </ModalContent>
        </div>
      </div>
    </Modal>
  )
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default App
