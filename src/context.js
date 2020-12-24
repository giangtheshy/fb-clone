import React, { useContext, useEffect, useState, useCallback } from "react";
import db, { auth } from "./firebase";
import FetchVideo from "./FetchVideo";
import productData from "./apis/Products";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [dataPost, setDataPost] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [collectionRoom, setCollectionRoom] = useState([]);
  const [stateMinimize, setStateMinimized] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [listVideos, setListVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cart, setCart] = useState([]);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
    db.collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => setDataPost(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));

    db.collection("users").onSnapshot((snapshot) => setUsers(snapshot.docs.map((doc) => doc.data())));
    db.collection("rooms").onSnapshot((snapshot) => setCollectionRoom(snapshot.docs.map((doc) => doc.data())));
    getVideoFromAPI();
    productData().then((data) => setProducts(data));
  }, []);
  useEffect(() => {
    if (user) {
      setCart(users.find((item) => item.uid === user.uid).cart);
    }
    if (users && users.length > 0 && user) {
      setRooms(users.find((item) => item.uid === user.uid).room);
    }
  }, [users]);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(`${user.uid}`).update({ cart: cart });
    }
  }, [cart]);
  useEffect(() => {
    if (rooms.length > 0) {
      const temp = rooms.map((room) => ({ id: room, isMinimized: true }));
      setStateMinimized(temp);
    }
  }, [rooms]);
  const fetchRoomList = useCallback(() => {
    return collectionRoom.filter((room) => {
      return rooms.find((item) => room.id === item);
    });
  }, [collectionRoom]);
  useEffect(() => {
    setListRoom(fetchRoomList());
  }, [fetchRoomList]);
  const changeMinimized = useCallback(
    (id) => {
      const temp = stateMinimize.map((state) => {
        if (state.id === id) {
          return { ...state, isMinimized: !state.isMinimized };
        } else {
          return { ...state, isMinimized: true };
        }
      });
      setStateMinimized(temp);
    },
    [stateMinimize]
  );
  const changeOther = () => {
    if (users && users.length > 0 && user) {
      db.collection("users")
        .doc(`${user.uid}`)
        .update({
          others: users
            .filter((item) => {
              if (users.find((u) => u.uid === user.uid)) {
                return !users.find((u) => u.uid === user.uid).friends.some((i) => i.uid === item.uid);
              }
            })
            .filter((item) => item.uid !== user.uid)
            .map((item) => item.uid),
        });
    }
  };
  changeOther();
  const setLoginUser = (user) => {
    setUser(user);
  };
  const concatRoomID = (user, friend) => {
    if (friend.uid > user.uid) {
      return `${user.uid}${friend.uid}`;
    } else {
      return `${friend.uid}${user.uid}`;
    }
  };
  const getVideoFromAPI = async () => {
    // try {
    const response = await FetchVideo.get("/search", {
      params: {
        q: "yasuo highlight",
      },
    });
    setListVideos(response.data.items);
  };

  const getCurrentVideo = (id) => {
    setCurrentVideo(id);
  };
  const changeShowModal = () => {
    setShowModal(!showModal);
  };
  const getCurrentPosition = (pos) => {
    setCurrentPosition(pos);
  };
  const filterProducts = (filter) => {
    if (filter === "all") {
      productData().then((data) => setProducts(data));
    }
    setProducts((prevProducts) => prevProducts.filter((product) => product.category === filter));
  };
  const handleCartState = () => {
    setCartState((prev) => !prev);
  };
  const addProductToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  const removeProductToCart = (id) => {
    if (id) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart([]);
    }
  };
  const checkOutProduct = () => {
    setCart((prev) =>
      prev.map((item) => {
        return { ...item, statusCheckout: true };
      })
    );
  };
  const changeShowBar = () => {
    setShowBar(!showBar);
  };
  return (
    <AppContext.Provider
      value={{
        dataPost,
        user,
        setLoginUser,
        users,
        concatRoomID,
        changeMinimized,
        stateMinimize,
        listRoom,
        getVideoFromAPI,
        listVideos,
        getCurrentVideo,
        currentVideo,
        changeShowModal,
        showModal,
        getCurrentPosition,
        currentPosition,
        products,
        filterProducts,
        handleCartState,
        cartState,
        addProductToCart,
        cart,
        removeProductToCart,
        checkOutProduct,
        changeShowBar,
        showBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
