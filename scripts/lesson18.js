const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
xhr.open("GET", "https://supersimplebackend.dev/greeting");
xhr.send();

fetch("https://supersimplebackend.dev/greeting")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    console.log(text);
  });

async function greet() {
  const response = await fetch("https://supersimplebackend.dev/greeting");
  const text = await response.text();
  console.log(text);

  const response2 = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Mani",
    }),
  });
  const text2 = await response2.text();
  console.log(text2);

  try {
    const response3 = await fetch("https://amazon.com");
  } catch (error) {
    console.log("Your request was blocked by backend");
  }

  try {
    const response4 = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response4.status >= 400) {
      throw response4;
    }
  } catch (error) {
    if (error.status === 400) {
      console.log(await error.json());
    } else {
      console.log("Network Error, Please try again later");
    }
  }
}
greet();
