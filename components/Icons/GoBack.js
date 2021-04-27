import * as React from 'react'

export default function LeftArrow(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill={props.fill ? props.fill : 'transparent'}
        fillRule="evenodd"
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.499 6.497L3.5 10.499l4 4.001M16.5 10.5h-13" />
      </g>
    </svg>
  )
}
