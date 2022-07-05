import React from 'react'

export const Context = ({ children }) => {
    const [name, setName] = useState("John Doe");
    const [age, setAge] = useState(1);
    const happyBirthday = () => setAge(age + 1);
    return (
      <UserContext.Provider value={{ name, age, happyBirthday }}>
        {children}
      </UserContext.Provider>
    );
  };