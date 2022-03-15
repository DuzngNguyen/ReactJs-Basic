const content = document.querySelector("#root");

function Component() {
  const [usersJava, setUserJava] = React.useState([
    { name: "Nguyen Dung", age: 18, classType: "java" },
    { name: "Dung Nguyen", age: 19, classType: "java" },
    { name: "Dung", age: 20, classType: "java" },
  ]);
  const [usersReact, setUserReact] = React.useState([
    { name: "HTML", age: 20, classType: "react" },
    { name: "CSS", age: 18, classType: "react" },
    { name: "JavaScript", age: 19, classType: "react" },
  ]);

  const INIT_DATA = {
    index: 0,
    name: "",
    age: "",
    classType: "react",
    nameSearch: "",
  };

  function createLogger(namespace) {
    function logger(message) {
      console.log(`[${namespace}] ${message}`);
    }
    return logger;
  }
  const logDebug = createLogger("DEBUG");

  const [formData, setFormData] = React.useState(INIT_DATA);

  const transferJavaToReactClass = (item, index) => {
    usersReact.push(item);
    usersJava.splice(index, 1);
    setUserReact([...usersReact]);
    setUserJava([...usersJava]);
  };
  const transferReactToJavaClass = (item, index) => {
    usersJava.push(item);
    usersReact.splice(index, 1);
    setUserReact([...usersReact]);
    setUserJava([...usersJava]);
  };

  const User = (props) => {
    const { name, age, handleTransfer, handleUpdate, handleDeleteUser } = props;
    return (
      <div>
        <span>
          Name: {name}, Age: {age}
        </span>
        <button type="button" onClick={() => handleUpdate()}>
          Update
        </button>
        <button type="button" onClick={() => handleTransfer()}>
          Transfer
        </button>
        <button type="button" onClick={() => handleDeleteUser()}>
          Xóa
        </button>
      </div>
    );
  };

  React.useEffect(() => {
    if (usersReact.length === 0) {
      alert("Class is empty!");
    } else if (usersJava.length === 0) {
      alert("Class is empty!");
    }
  }, [usersJava.length, usersReact.length]);

  /* -----------xu li input value----------- */
  const handleInput = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  /* -----------them data----------- */
  const addData = () => {
    if (formData.classType === "react") {
      usersReact.push(formData);
      setUserReact([...usersReact]);
    } else {
      usersJava.push(formData);
      setUserJava([...usersJava]);
    }
    setFormData(INIT_DATA);
  };

  /* -----------update data----------- */
  const updateChange = () => {
    if (formData.classType === "react") {
      usersReact[formData.index].name = formData.name;
      usersReact[formData.index].age = formData.age;
      setUserReact([...usersReact]);
    } else if (formData.classType === "java") {
      usersJava[formData.index].name = formData.name;
      usersJava[formData.index].age = formData.age;
      setUserJava([...usersJava]);
    }
    document.getElementById("submit").innerHTML = "Add";
    setFormData(INIT_DATA);
  };

  //xu li add user
  const handleSubmit = () => {
    if (document.getElementById("submit").innerHTML === "Add") {
      addData();
    } else {
      updateChange();
    }
  };

  /* -----------sua thong tin user----------- */
  const updateData = (item, index) => {
    setFormData({
      ...formData,
      name: item.name,
      age: item.age,
      classType: item.classType,
      index: index,
    });
    document.getElementById("submit").innerHTML = "Update";
    autoFocus.current.focus();
  };

  /* -----------tim kiem data----------- */
  const SORT = {
    NO: 0,
    UP: 1,
    DOWN: 2,
  };
  const [sortTitle, setSortTitle] = React.useState(SORT.NO);
  const [searchUser, setSearchUser] = React.useState();
  const autoFocus = React.useRef();
  const totalGetUser = (list) => {
    logDebug("GetUser");
    let res = [...list];
    if (searchUser) {
      res = res.filter((el) => {
        return el.name.toLowerCase().includes(searchUser);
      });
    }
    if (sortTitle !== SORT.NO) {
      if (sortTitle === SORT.UP) {
        res.sort((a, b) => {
          return a.age - b.age;
        });
      } else if (sortTitle === SORT.DOWN) {
        res.sort((a, b) => {
          return b.age - a.age;
        });
      }
    }
    return res;
  };
  const getUserJava = React.useMemo(
    () => totalGetUser(usersJava),
    [searchUser, sortTitle, usersJava]
  );
  const getUserReact = React.useMemo(
    () => totalGetUser(usersReact),
    [searchUser, sortTitle, usersReact]
  );

  // const handleSort = () => {
  //   const newusersJava = [...usersJava];
  //   const arrUsersJavaSorted = newusersJava.sort((a, b) =>
  //     a.age > b.age ? 1 : -1
  //   );
  //   const newusersReact = [...usersReact];
  //   const arrUserReactSorted = newusersReact.sort((a, b) =>
  //     a.age > b.age ? 1 : -1
  //   );
  //   setUserJava(arrUsersJavaSorted);
  //   setUserReact(arrUserReactSorted);
  // };

    /* -----------sap xep data----------- */
  const totalSetTitle = () => {
    logDebug("hàm setTitle");

    if (sortTitle === SORT.NO) {
      return "no";
    } else if (sortTitle === SORT.UP) {
      return "up";
    } else {
      return "down";
    }
  };
  const setTitle = React.useMemo(() => totalSetTitle(), [sortTitle]);

  const handleSort = () => {
    if (sortTitle === SORT.NO) {
      setSortTitle(SORT.UP);
    } else if (sortTitle === SORT.UP) {
      setSortTitle(SORT.DOWN);
    } else {
      setSortTitle(SORT.NO);
    }
  };

  const deleteData = (el, index) => {
    console.log(index);
    console.log("el", el);
    if (el.classType === "react") {
      let confirmAction = confirm("Bạn có chắc muốn xóa ?");
      if (confirmAction) {
        usersReact.splice(index, 1);
        setUserReact([...usersReact]);
      }
    } else if (el.classType === "java") {
      let confirmAction = confirm("Bạn có chắc muốn xóa ?");
      if (confirmAction) {
        usersJava.splice(index, 1);
        setUserJava([...usersJava]);
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search by name"
        id="search"
        name="searchUser"
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
        }}
      />
      {/* <button type="button" onClick={handleSearch}>
        Search
      </button> */}
      <button type="button" onClick={handleSort}>
        SoftByAge : {setTitle}
      </button>

      <h1>List member of Java Class</h1>
      {usersJava.length > 0 ? (
        getUserJava.map((item, index) => {
          return (
            <User
              key={index}
              name={item.name}
              age={item.age}
              handleTransfer={() => transferJavaToReactClass(item, index)}
              handleUpdate={() => updateData(item, index)}
              handleDeleteUser={() => deleteData(item, index)}
            />
          );
        })
      ) : (
        <span>Class is empty</span>
      )}

      <h1>List member of React Class</h1>
      {usersReact.length > 0 ? (
        getUserReact.map((item, index) => {
          return (
            <User
              key={index}
              name={item.name}
              age={item.age}
              handleTransfer={() => transferReactToJavaClass(item, index)}
              handleUpdate={() => updateData(item, index)}
              handleDeleteUser={() => deleteData(item, index)}
            />
          );
        })
      ) : (
        <span>Class is empty</span>
      )}

      <h1>Add a new user</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Name{" "}
        <input
          name="name"
          value={formData.name}
          onChange={(e) => handleInput(e)}
          type="text"
          ref={autoFocus}
        />
        Age{" "}
        <input
          name="age"
          value={formData.age}
          onChange={(e) => handleInput(e)}
          type="text"
        />
        Type{" "}
        <select
          name="classType"
          value={formData.classType}
          onChange={(e) => handleInput(e)}
        >
          <option value="react">React</option>
          <option value="java">Java</option>
        </select>
        <br />
        <button id="submit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

ReactDOM.render(
  <div>
    <Component props />
  </div>,
  content
);
