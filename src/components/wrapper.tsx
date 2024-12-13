import { ReactNode } from "react";

export default function Wrapper ({children}: {children: ReactNode}){
    return(
        <div className="p-4 flex flex-wrap justify-between items center mx-auto bg-white">
          {children}
        </div>
    )
}