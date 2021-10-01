const person = {
  firstname: "Harsh",
  lastname: "Kalmegh",
  age: 25,
};
const goodperson = new Proxy(person, {
  set: function (target, key, value) {
    Object.freeze(goodperson);
    console.log("Set the value of", key, "to", value + " " + new Date());
    const isFreeze = Object.isFrozen(target);
    console.log({ isFreeze });
    localStorage.setItem("key", value);
    if (isFreeze) {
      throw new Error("Object is frozen");
    } else {
      throw new Error("Object is not frozen");
    }
  },
  deleteProperty(target, key) {
    Object.freeze(goodperson);
    if (key in target) {
      delete target[key];
      console.log("This item delete:", key, new Date());
      const isFreeze = Object.isFrozen(target);
      console.log({ isFreeze });
      localStorage.setItem("key", key);
      if (isFreeze) {
        throw new Error("Object is frozen");
      } else {
        throw new Error("Object is not frozen");
      }
    }
  },
});
