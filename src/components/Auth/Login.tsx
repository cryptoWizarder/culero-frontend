import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import GoogleIcon from '@/assets/images/google.png'
import LinkedinIcon from '@/assets/images/linkedin.svg'
import {
  LoginSocialGoogle,
  LoginSocialLinkedin,
  IResolveParams
} from 'reactjs-social-login';
import { api } from '@/store/culero.api';
import { LoginRequest } from '@/store/interface';
// import { useSelector, useDispatch } from "react-redux";
// import { selectAvatarURL, selectUserName, selectLoginStatus, setLoginStatus, setAvatarURL, setUserName, setUserId, setUserEmail, selectUserId, selectUserEmail, setLoginProvider } from "@/store/status";
import { useAuth0 } from "@auth0/auth0-react";

const customStyles = {
  overlay: {
    backgroundColor: '#6c83b191',
  },
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2a349b',
    borderRadius: '15px',
    border: 'none',
    marginTop: '35px',
    color: 'white',
    height: '53%',
    scrollbars: false,
  },
};

export type LoginProps = {
  authModalIsOpen: boolean,
  closeModal: () => void
}
export const AuthModal: React.FC<LoginProps> = ({ authModalIsOpen, closeModal }: LoginProps) => {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  console.log(user);
  const [login] = api.useLoginMutation();

  const navigate = useNavigate();

  const handleGoogleSignIn = async (req: LoginRequest) => {
    const result = await login(req)
    if ((result as any).data) {
      closeModal();
      navigate(`/profile/${(result as any).data.user._id}`);
    }
  }

  const handleLinkedinSignin = async () => {
    console.log("Linkedin Login");
  }

  const authLogin = async (provider: string, profile: any) => {
    console.log("Interacting Provider ", provider);
    console.log("Interacting Profile ", profile);
  }

  useEffect(() => {
    if (provider && profile) {
      authLogin(provider, profile)
    }
  }, [provider, profile])

  return (
    <div>
      <Modal
        closeTimeoutMS={200}
        isOpen={authModalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <div className="text-center font-poppins text-[20px]">
          <div className='w-full text-center text-[50px] font-semibold mt-8 pb-6'>
            Log in
          </div>
          <div className='px-20'>
            <div className='w-full flex flex-col space-y-14 py-8 px-10'>
              <div className='w-full flex space-x-4 justify-center items-center cursor-pointer' >
                {/* <LoginSocialGoogle
                  client_id={"1044491487797-iu6gkav7vtunq9a6l432tvufgv5eqoch.apps.googleusercontent.com"}
                  // typeResponse="idToken"
                  scope="openid profile email"
                  ux_mode="popup"
                  access_type="online"
                  onResolve={({ provider, data }: IResolveParams) => {
                    console.log("provider", provider);
                    console.log("data", data);
                    const req = {
                      email: data.email,
                      firstname: data.given_name,
                      lastname: data.family_name,
                      name: data.name,
                      picture: data.picture,
                      token: data.access_token,
                      type: provider
                    }
                    handleGoogleSignIn(req)
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                > */}
                  <img src={GoogleIcon} alt='Google Icon' className='w-[100px]' onClick={() => loginWithRedirect({})} />
                {/* </LoginSocialGoogle> */}
              </div>

              <div className='w-full flex space-x-4 justify-center items-center cursor-pointer'>
                {/* <LoginSocialLinkedin
                  client_id={'78vop33tng3dru'}
                  client_secret={'hVHwBx6eke9temBr'}
                  redirect_uri={'http://localhost:4000'}
                  scope="email"
                  onResolve={({ provider, data }: IResolveParams) => {
                    console.log(
                      "asd"
                    )
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                > */}
                  <img src={LinkedinIcon} alt='Linkedin Icon' className='w-[100px]' onClick={() => loginWithRedirect({})}/>
                {/* </LoginSocialLinkedin> */}
                <LoginSocialLinkedin
                  isOnlyGetToken
                  client_id={'86e6qf8zqc75ve'}
                  client_secret={'2hpm6KXIBu4B0bO1'}
                  redirect_uri={"http://localhost:4000"}
                  scope="profile"
                  // typeResponse="idToken"
                  // onLoginStart={handleLinkedinSignin}
                  ux_mode="popup"
                  access_type="online"
                  onResolve={({ provider, data }: IResolveParams) => {
                    console.log("asdfasd")
                    console.log("provider", provider);
                    console.log("data", data);
                    const req = {
                      email: data.email,
                      firstname: data.given_name,
                      lastname: data.family_name,
                      name: data.name,
                      picture: data.picture,
                      token: data.access_token,
                      type: provider
                    }
                    handleGoogleSignIn(req)
                  }}
                  onReject={(err: any) => {
                    console.log(err)
                  }}
                >

                  <img src={LinkedinIcon} alt='Linkedin Icon' className='w-[100px]' />
                </LoginSocialLinkedin>
              </div>

            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}