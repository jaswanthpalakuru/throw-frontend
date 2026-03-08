// // import NavBar from "./components/NavBar";

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Landing from "./pages/Landing";
// import RootLayout from "./layouts/RootLayout";
// import ThrowReceive from "./pages/ThrowReceive";

// export default function App() {
//   return (
//     // <div className="min-h-screen bg-ink p-12 flex flex-col gap-8">
//     //   {/* <NavBar /> */}

//     // </div>
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RootLayout />}>
//           <Route path="/" element={<Landing />} />
//           {/* /dashboard/:roomId  - to read this param use useParam hook*/}
//           {/* useNavigate hook - this is used to navigate the user programmatically even though there is no click event or something */}
//           {/* useLocation - it gives us current url info like pathname, search, hash, state */}
//           <Route path="/throw" element={<ThrowReceive />} />
//           {/* <Route path = '/dashboard'>
//             <Route index element={<Overview />} />
//             <Route path="/home" element={<Home />} />} - /dashboard/home
//             <Route path="/user" element={<Home />} />} - /dashboard/user
//             </Route> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import RootLayout from "./layouts/RootLayout";
import ThrowReceive from "./pages/ThrowReceive";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/throw" element={<ThrowReceive />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
