
import React, { useContext, useEffect } from "react";
import Routing from "./Router.jsx";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
import { Type } from "./Utility/action.type.jsx";
import { auth } from "./Utility/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser,
      });
    });

    return () => unsubscribe(); // ✅ cleanup
  }, [dispatch]);

  return <Routing />;
}

export default App;








// import React, {useContext, useEffect} from "react";
// import Routing from "./Router.jsx";
// import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
// import { Type } from "./Utility/action.type.jsx";
// import {auth} from "./Utility/firebase.jsx"

// function App() {
//  const [{user},dispatch] = useContext(DataContext)
//   useEffect(()=> {
//     auth.onAuthStateChanged((authUser) => {
//       if(authUser) {
//         dispatch({
//           type:Type.SET_USER,
//           user:authUser,
//         })
//       }else {
//         dispatch({
//           type: Type.SET_USER,
//           user: null,
//         })
//       }
//     })
   
//   })
//   return <Routing/>  
// }
// export default App;
