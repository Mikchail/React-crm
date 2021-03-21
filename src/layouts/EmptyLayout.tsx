import React, { ReactNode } from "react";

interface EmptyLayoutProps {
  children: ReactNode
}

const EmptyLayout = (props: EmptyLayoutProps) => {
  return (
    <div className="grey darken-1 empty-layout">
      {props.children}
    </div>
  )
}

export default EmptyLayout;