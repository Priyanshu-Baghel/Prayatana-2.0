import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import SahayataLogo from '../../Assets/Logo/Sahayata.png';
import Logo from '../../Assets/Logo/Logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const Hero = () => {
  const { isLoggedIn, user } = useAuth();
  console.log(user);

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 py-12 md:py-16 lg:px-8 lg:py-24">
        {/* Left Section */}
        <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-6">
          <span>
            <img src={Logo} width="50" height="30" alt="Sahayata Logo" />
          </span>

          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-full bg-gray-100 p-2">
            <div className="rounded-full bg-white px-3 py-1">
              <p className="text-sm font-medium">Empowering Assistance</p>
            </div>
            <p className="text-sm font-medium">Join our mission &rarr;</p>
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl lg:text-6xl font-bold text-black">
            Sahayata-Setu: <br />
            Bridging Assistance, Connecting Lives.
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-700 max-w-prose">
            A unified platform to streamline public service complaints and ensure effective routing for quick resolutions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {isLoggedIn ? (
              <>
                {user.role === "admin" && (
                  <NavLink to="/admin">
                    <button className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white shadow hover:bg-primary/80">
                      Dashboard
                    </button>
                  </NavLink>
                )}
                <NavLink to="/profile">
                  <button className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white shadow hover:bg-primary/80">
                    Profile
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <button className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white shadow hover:bg-black/80">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-md border border-black px-6 py-2 text-sm font-semibold text-black shadow">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:col-span-5 xl:col-span-6">
          <Canvas className="w-full h-full">
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.8} />
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

          <img
            src={SahayataLogo}
            alt="3D Sphere"
            className="absolute top-0 bottom-0 left-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] object-contain m-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
