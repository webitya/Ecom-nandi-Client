
import { FooterEl } from "../FooterEl"
import NavbarEl from "../NavbarEl"
import MobileBottom from "../../Components/MobileBottom"
import { FooterEl2 } from "../FooterEl2"



const LayoutEl=(data)=>{
      const display=(
        <>
           <NavbarEl/>
           {data.children}
          
           {/* <FooterEl/>*/}
           <FooterEl2/>
           <MobileBottom/>

        </>
      )
      return display
}
export default LayoutEl