import { Contact } from './Contact'

export const Footer = () => {
  return (
    <footer>
      <Contact />
      <div className="bg-cblack-500 w-full">
        <div className="max-w-[1920px] mx-auto flex-col lg:flex-row flex gap-2 justify-between items-center px-9 py-3 lg:px-[180px]  text-white font-normal text-sm md:text-md lg:text-[16px]">
          <div className="text-center">©2023@Culero All rights reserved Developed by Agency </div>
          <div className="flex justify-center items-center space-x-2 sm:space-x-4">
            <a
              href="#"
              target="_blank"
              className="text-white cursor-pointer"
            >
              <span className="cursor-pointer">FACEBOOK</span>
            </a>
            <span>|</span>
            <a href="#" target="_blank" className="text-white cursor-pointer">
              <span>LINKEDIN</span>
            </a>
            <span>|</span>
            <a href="#" target="_blank" className="text-white cursor-pointer">
              <span className="cursor-pointer">TWITTER</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
