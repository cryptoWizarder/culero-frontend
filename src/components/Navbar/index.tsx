import { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Logo } from '../UI/Logo'
import { Divide as Hamburger } from 'hamburger-react'
import { NavItem, items } from '../../contents/Navbar'
import { Link } from 'react-router-dom'
import { AuthModal } from '../Auth'
import DefaultAvatar from '@/assets/images/default_avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser, setAuthToken } from '@/store/status';
import SearchBox from '../SearchBox';
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const dispatch = useDispatch();

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [nav, setNav] = useState(false)
  const [navbarClass, setNavbarClass] = useState('')
  const [tempLocation, setTempLocation] = useState('/')
  const [authModalIsOpen, setAuthIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearhText] = useState('');

  let navigate = useNavigate();

  // const isLoginStatus = true;
  // const user = useSelector(selectUser);
  const ref = useRef(null)

  const showNav = () => {
    setNav((v) => !v)
  }
  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction() {
    const scrollY = window.pageYOffset
    if (scrollY > 70) {
      setNavbarClass(
        ' py-[4px] md:py-[8px] lg:py-[12px] xl:py-[15px] backdrop-blur shadow-[0_0_9px_1px_rgba(0,0,0,0.5)]',
      )
    } else {
      setNavbarClass('')
    }
  }
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    });
  function closeAuthModal() {
    setAuthIsOpen(false);
  }

  function openModal() {
    setAuthIsOpen(true);
  }

  const openPage = (page: string) => {
    navigate(`/${page}`)
  }

  const signOut = () => {
    navigate(`/`)
    dispatch(setUser(null));
    dispatch(setAuthToken(null));
  }

  useEffect(() => {
    console.log(searchText);
    setTempLocation(location.pathname)
  }, []);

  useEffect(() => {
    const handleOutSideClick = (event: { target: any; }) => {
      const currentEle = ref.current as any
      if (!currentEle) {
        return
      }
      if (!currentEle.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref])

  return (
    <div
      className={
        'w-full fixed z-50 top-0 flex justify-center transition-all duration-300 py-[10px] lg:py-[33px] md:py-[15px]  ' +
        navbarClass
      }
    >
      <header className={`w-full  max-w-[1920px] flex justify-between items-center px-9 xl:px-[180px] lg:px-[50px] `}>
        <Logo />
        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-16">
          <div className="">
            {/* <input type="input" className="w-full focus:outline-none border-2 px-2 py-2 rounded-[10px] border-[#5f6fdb] bg-transparent placeholder:text-[#00000078]" placeholder='Search...' onChange={(e) => setSearhText(e.target.value)} /> */}
            <SearchBox />
          </div>

          {items.map((item: NavItem, index: number) => (
            <Link
              key={index}
              to={item.link}
              // spy={true}
              // smooth={true}
              // offset={-70}
              // duration={500}
              className={
                'text-cblack-500 font-medium hover:cursor-pointer active:text-[#9C11F3] active:font-bold navbar_active ' +
                (tempLocation == item.link && ' text-[#9c11f3] font-bold')
              }
            >
              {item.title}
            </Link>
          ))}
          {
            isAuthenticated ?
              <div className="relative">
                <span className="" onClick={() => setIsDropdownOpen(true)}>
                  <img src={DefaultAvatar} alt="Profile Icon" className="rounded-[50%] w-[35px] h-[33px] cursor-pointer" />
                </span>
                {
                  isDropdownOpen &&
                  <div className="absolute w-[260px] bg-[#5f6fdb] px-6 py-4 rounded-[10px] right-0" ref={ref}>
                    <div className="w-full flex justify-center items-center space-x-4 px-1 pb-4 border-b border-[#6F6E6E] mb-4">
                      <img src={DefaultAvatar} alt="Profile Icon" className="rounded-[50%] w-[35px] h-[33px]" />
                      <span className="text-[18px]">User Name</span>
                    </div>
                    <button className="w-full text-center text-[18px] px mb-4 hover:text-[#01A7F5]" onClick={() => openPage(`profile/${user._id}`)}>
                      Profile & Settings
                    </button>
                    <button className="w-full text-center text-[18px] px mb-4 hover:text-[#01A7F5]" onClick={() => openPage('feed')}>
                      Feed
                    </button>
                    <button className="w-full text-center text-[18px] px mb-4 hover:text-[#01A7F5]" onClick={() => openPage('review')}>
                      Review
                    </button>
                    <button className="w-full text-center text-[18px] hover:text-[#01A7F5]" onClick={() => logoutWithRedirect()}>
                      Sign out
                    </button>
                  </div>
                }

              </div>
              :
              <a className={'text-cblack-500 font-medium hover:cursor-pointer navbar_active'} onClick={() => loginWithRedirect()}><span>Login</span></a>
          }
        </nav>

        {/* hamburger */}
        {nav ? (
          <i className="fixed right-[30px] z-50 lg:hidden">
            <Hamburger onToggle={showNav} toggled={nav} />
          </i>
        ) : (
          <i className="lg:hidden">
            <Hamburger onToggle={showNav} toggled={nav} />
          </i>
        )}

        {/* mobile nav */}
        <nav
          className={`h-[300px] right-0 fixed flex flex-col justify-around items-center w-full lg:hidden bg-white shadow-[0_0_9px_1px_rgba(0,0,0,0.5)] z-40 duration-1000 ${nav ? 'top-[0px]' : '-top-[300px]'
            } `}
        >
          {items.map((item: NavItem, index: number) => (
            <a
              key={index}
              href={item.link}
              className=" text-cblack-500 font-medium hover:cursor-pointer"
              onClick={() => showNav()}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </header>
      <AuthModal
        closeModal={closeAuthModal}
        authModalIsOpen={authModalIsOpen}
      />
    </div>
  )
}
