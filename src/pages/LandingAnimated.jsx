import planet_1 from "../assets/planet_1.png";
import planet_2 from "../assets/planet_2.png";
import planet_3 from "../assets/planet_3.png";
import ground from "../assets/ground_2.png";
import logo from "../assets/logo.png";
import cloud from "../assets/cloud_2.png";
import balls_1 from "../assets/balls_1.png";
import balls_2 from "../assets/balls_2.png";
import backdrop from "../assets/backdrop.png";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api/user/signOut";
import { Bar } from "../components/Bar";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const LandingAnimated = () => {
  const goto = useNavigate();
  const { isLoggedIn } = useFirebaseAuth();

  const layout = [
    {
      image: backdrop,
      offset: 0,
      speed: 0.1,
      factor: 5,
      size: "cover",
      position: "center",
    },
    {
      image: logo,
      offset: 0,
      speed: 0.01,
      factor: 10,
      size: "30%",
      position: "50% 2%",
    },
    {
      image: cloud,
      offset: 0,
      speed: 0.2,
      factor: 8,
      size: "100%",
      position: "30% 0.5%",
    },

    {
      image: balls_2,
      offset: 0,
      speed: 3,
      factor: 5,
      size: "100%",
      position: "30% 55%",
    },
    {
      image: planet_1,
      offset: 0,
      speed: 0.5,
      factor: 7,
      size: "20%",
      position: "50% 5%",
    },
    {
      image: planet_2,
      offset: 0,
      speed: 1.5,
      factor: 2,
      size: "10%",
      position: "65% 40%",
    },
    {
      image: planet_3,
      offset: 0,
      speed: 2,
      factor: 2,
      size: "12%",
      position: "30% 35%",
    },

    {
      image: balls_1,
      offset: 0,
      speed: 0.5,
      factor: 2,
      size: "100%",
      position: "30% 35%",
    },
    {
      image: balls_2,
      offset: 0,
      speed: 2,
      factor: 5,
      size: "100%",
      position: "30% 15%",
    },

    {
      image: ground,
      offset: 0,
      speed: 3,
      factor: 4,
      size: "100%",
      position: "50% 100%",
    },
    {
      image: "",
      offset: 0,
      speed: 1,
      factor: 410,
      size: "0",
      position: "0",
      Comp: (
        <>
          <div
            style={{
              width: "100vw",
              height: "200vh",
              backgroundColor: "transparent",
            }}
          >
            <Bar>
              {isLoggedIn ? (
                <>
                  <Link to={"/dash"}>
                    <u>Go to dashboard </u>{" "}
                  </Link>
                  <div onClick={() => signOut()}>
                    <u> Sign out</u>{" "}
                  </div>
                  <Link to={"/delete-account"}>
                    <u> </u>
                    <u>Delete User</u>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/signin"}>
                    <u> Sign In </u>
                  </Link>
                  <Link to={"/signup"}>
                    <u> Sign Up</u>
                  </Link>
                </>
              )}
              scroll for more
            </Bar>
          </div>

          <div className="flex w-screen h-screen justify-center bg-black">
            <div className="shadow-2xl rounded-xl self-center p-10 ">
              <h1>Welcome to NEOvis</h1>
              <h2>Find Near Earth Objects within a given timeframe</h2>
              <h5>
                {isLoggedIn
                  ? "Welcome back"
                  : "Sign In or Sign Up to get started"}
              </h5>
              <Bar>
                {isLoggedIn ? (
                  <>
                    <button onClick={() => goto("/dash")}>
                      Go to dashboard
                    </button>
                    <button onClick={() => signOut()}>Sign out</button>
                    <button onClick={() => goto("/delete-account")}>
                      Delete User
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => goto("/signin")}>Sign In</button>
                    <button onClick={() => goto("/signup")}>Sign Up</button>
                  </>
                )}
              </Bar>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Parallax pages={2}>
        {layout.map((item) => (
          <ParallaxLayer
            offset={item.offset}
            speed={item.speed}
            factor={item.factor}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: item.size,
              backgroundPosition: item.position,
            }}
          >
            {item.Comp}
          </ParallaxLayer>
        ))}
      </Parallax>
    </div>
  );
};
