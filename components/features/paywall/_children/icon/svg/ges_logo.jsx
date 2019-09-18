import React from 'react'

function CustomIcon({ theme, ...props }) {
  return (
    <svg width="140" height="30" viewBox="0 0 140 30" {...props}>
      <g id="Grupo_339" data-name="Grupo 339" transform="translate(1)">
        <path
          id="Trazado_142"
          data-name="Trazado 142"
          d="M25.22,16.83H16.076a4.014,4.014,0,0,1,1.252,1.352c.2.363.324.577.349.643a3.017,3.017,0,0,1,.17,1.113v5.721l-.281.1H15.343a6.14,6.14,0,0,1-5.373-3.223,13.771,13.771,0,0,1-1.907-7.477,10.786,10.786,0,0,1,1.345-5.7c1.252-2.012,3.312-3.141,6.2-3.388h.451a10.014,10.014,0,0,1,2.844.495,8.15,8.15,0,0,1,2.009.824l1.626.956V2.551a22.314,22.314,0,0,0-6.667-.841A16.644,16.644,0,0,0,4.734,5.75,12.729,12.729,0,0,0,0,15.8,12.905,12.905,0,0,0,4.887,26.368,17.014,17.014,0,0,0,15.973,30.02a35.867,35.867,0,0,0,5.347-.47,26.253,26.253,0,0,0,3.9-.775Z"
          transform="translate(-1 -0.3)"
          fill={theme.palette.primary.contrastText}
        />
        <path
          id="Trazado_143"
          data-name="Trazado 143"
          d="M137.744,6.529c.213.181-.607.412-.437.692a8.719,8.719,0,0,1,.843,1.764,3.057,3.057,0,0,1,.128.915v10.66L127.438,6.529h-7.357a3.49,3.49,0,0,1,.724.758,6.652,6.652,0,0,1,.783,1.228,4.355,4.355,0,0,1,.417,1.212,8.691,8.691,0,0,1,.1,1.467V25.556a4.518,4.518,0,0,1-.715,2.514,4.827,4.827,0,0,1-.886,1.047h7.016a4.7,4.7,0,0,1-.911-1.047,4.4,4.4,0,0,1-.715-2.49V15.062l8.131,10.519a7.987,7.987,0,0,0,1.482,1.492,14.706,14.706,0,0,0,2.657,1.657,10.383,10.383,0,0,0,1.814.783,19.054,19.054,0,0,0,1.984.486V9.926a3.58,3.58,0,0,1,.2-1.245,4.143,4.143,0,0,1,.324-.692c.255-.445.409-.709.468-.8a3.364,3.364,0,0,1,.613-.66h-5.83ZM109.822,0,103.4,3.66l1.6.89,6.1-2.325Zm2.393,24.122a5.4,5.4,0,0,1-4.675,2.209,5.456,5.456,0,0,1-4.709-2.927,11.645,11.645,0,0,1-1.711-6.356A8.679,8.679,0,0,1,102.6,11.8a5.212,5.212,0,0,1,4.453-2.185,5.557,5.557,0,0,1,5.024,2.984,12.614,12.614,0,0,1,1.516,6.463,8.571,8.571,0,0,1-1.379,5.062M116.88,9.34a13.932,13.932,0,0,0-9.341-3.092,13.52,13.52,0,0,0-9.485,3.38,11.016,11.016,0,0,0-3.7,8.467,11.043,11.043,0,0,0,3.363,8.178,12.4,12.4,0,0,0,9.068,3.479q6.131,0,9.868-3.232a11.247,11.247,0,0,0,3.849-9A10.167,10.167,0,0,0,116.88,9.34M93.405,28.648a2.685,2.685,0,0,1-.485-.577,2.2,2.2,0,0,1-.383-.833,5.3,5.3,0,0,1-.068-1.022V9.093a3.967,3.967,0,0,1,.153-.66,2.193,2.193,0,0,1,.358-.8A6.47,6.47,0,0,1,93.465,7a2.709,2.709,0,0,1,.6-.47H84.184a2.627,2.627,0,0,1,.656.445,4.749,4.749,0,0,1,.511.594,2.27,2.27,0,0,1,.375.816,3.229,3.229,0,0,1,.111.717V26.257a4.114,4.114,0,0,1-.2,1.336,2.955,2.955,0,0,1-1.43,1.533h9.843a5.835,5.835,0,0,1-.647-.478M66.056,6.529,64.72,11.393a5.524,5.524,0,0,1,1.482-.882,4.242,4.242,0,0,1,1.652-.47h2.512l.289.107V26.216a3.475,3.475,0,0,1-.826,2.35,3.677,3.677,0,0,1-.656.61h9.868a3.98,3.98,0,0,1-1.184-1.121,3.868,3.868,0,0,1-.545-.965,6.256,6.256,0,0,1-.068-1.228V10.256l.511-.223h1.771a2.393,2.393,0,0,1,1.737.635c.06.058.162.165.315.33a1.7,1.7,0,0,1,.341.528l1.311-5H66.056ZM64.941,18.293a8.062,8.062,0,0,0-3.167-2.432l-2.342-1.047c-1.2-.552-1.907-.89-2.137-1.022-1.107-.61-1.652-1.261-1.652-1.962a2,2,0,0,1,.17-.742A2.134,2.134,0,0,1,57.022,9.9a5.355,5.355,0,0,1,1.984-.33,6.211,6.211,0,0,1,1.8.28,9.33,9.33,0,0,1,1.541.577l1.4.742V7.164l-2.222-.528a12.73,12.73,0,0,0-1.95-.33c-.622-.058-1.286-.082-2.009-.082a10.343,10.343,0,0,0-6,1.7,5.216,5.216,0,0,0-2.469,4.485,6.3,6.3,0,0,0,1.345,4.171,12.757,12.757,0,0,0,4.419,3.009L57.3,20.75a6.264,6.264,0,0,1,1.771,1.162,2.489,2.489,0,0,1,.741,1.764,2.027,2.027,0,0,1-.928,1.822,4.4,4.4,0,0,1-2.435.61,12.721,12.721,0,0,1-2.742-.322,9.523,9.523,0,0,1-2.427-.841l-2.537-1.41L49.8,28.261l.886.305a18.768,18.768,0,0,0,3.082.8,17.815,17.815,0,0,0,2.938.247,11.2,11.2,0,0,0,6.948-2.045,6.488,6.488,0,0,0,2.7-5.441,6.2,6.2,0,0,0-1.413-3.833M46.422,25.276a8.048,8.048,0,0,1-2.742.66,2.118,2.118,0,0,0-.426.058h-.46a12.519,12.519,0,0,1-2.052-.165,9.306,9.306,0,0,1-1.652-.412V18.928h2.342a4.078,4.078,0,0,1,.766.1,2.12,2.12,0,0,1,.8.322,2.2,2.2,0,0,1,.886,1.1V15.342l-.46.223H39.108V10.041h3.508a2.776,2.776,0,0,1,.741.148,3.163,3.163,0,0,1,.86.412,3.746,3.746,0,0,1,.528.429,2.194,2.194,0,0,1,.332.552V6.331l-.392.2H30.934a2.543,2.543,0,0,1,.63.495,4.8,4.8,0,0,1,.511.61,2.259,2.259,0,0,1,.358.783,3.107,3.107,0,0,1,.128.676v17.1a3.9,3.9,0,0,1-.187,1.311,2.9,2.9,0,0,1-.673,1.039,1.8,1.8,0,0,1-.289.28c-.017.016-.213.124-.57.305H46.7l1.482-5.218a13.983,13.983,0,0,1-1.763,1.369"
          transform="translate(-4.574)"
          fill={theme.palette.primary.contrastText}
        />
      </g>
    </svg>
  )
}

export default CustomIcon
