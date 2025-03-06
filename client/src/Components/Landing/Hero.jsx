import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import SahayataLogo from '../../Assets/Logo/Sahayata.png';
import Logo from '../../Assets/Logo/Logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import styled from 'styled-components';

const Img = styled.img`
  width: 450px;
  height: 450px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  // animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Hero = () => {
  const { isLoggedIn, user } = useAuth();
  console.log(user);

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <span>
            <img src={Logo} width="50" height="30" alt='' />
          </span>
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">Empowering Assistance</p>
            </div>
            <p className="text-sm font-medium">Join our mission &rarr;</p>
          </div>
          <h1 className="mt-8 text-m font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Sahayata-Setu: <br />
            Bridging Assistance, Connecting Lives.
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            A unified platform to streamline public service complaints and ensure effective routing for quick resolutions.
          </p>
          <form action="" className="mt-8 flex items-start space-x-2">
            {isLoggedIn ? (
              <>
                {user.role === "admin" ? (
                  <>
                    <div className="hidden lg:block">
                      <NavLink to="/admin">
                        <button
                          type="button"
                          className="rounded-md lg:ml-3 bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Dashboard
                        </button>
                      </NavLink>
                    </div>
                    <div className="hidden lg:block">
                      <NavLink to="/profile">
                        <button
                          type="button"
                          className="rounded-md lg:ml-3 bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Profile
                        </button>
                      </NavLink>
                    </div>
                  </>
                ) : (
                  <div className="hidden lg:block">
                    <NavLink to="/profile">
                      <button
                        type="button"
                        className="rounded-md lg:ml-3 bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Profile
                      </button>
                    </NavLink>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <Link to="/signin">
                    <button
                      type="button"
                      className="rounded-md bg-primary px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>

                <div>
                  <Link to='/signup'>
                    <button
                      type="button"
                      className="rounded-md border border-black px-8 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={7} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.1}>
                <MeshDistortMaterial
                  color="black"
                  attach="material"
                  distort={0.5}
                  speed={2}
                />
              </Sphere>
            </Suspense>
          </Canvas>
          <Img src={SahayataLogo} />
        </div>
      </div>
    </div>
  );
};

export default Hero;