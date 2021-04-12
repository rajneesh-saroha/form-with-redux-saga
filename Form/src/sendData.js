const sendData = async () => {
  const response = await fetch("http://localhost:4000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export default sendData;
