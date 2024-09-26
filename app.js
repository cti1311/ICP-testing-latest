const paymentButton = document.getElementById("payment-button");

// Jmlulb|dfsdfsdfasdfasddd|5000.00|BOLT|surbhi|text@example.com|||||||||||7LbabsOo7VuVtgzEqs27ldAFqP4EJQJn
async function sha512(str) {
  return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  });
}

paymentButton.addEventListener("click", async () => {
  var data = {
    key: "evEiGQ",
    hash: "acda52ae0f08bb2a63a713d06fdc4362ad2b97b8cdf28918617b36edd5f6ddcbf5cff1b5f856cc74dbd503e56949d68b27aebdede55f3492446febe202444ac9",
    txnid: Math.floor(Math.random()*100000000),
    amount: "5000.00",
    firstname: "surbhi",
    email: "text@example.com",
    phone: "1234567890",
    productinfo: "BOLT",
    surl: "https://webhook.site/4a14a5d4-3df5-4d5c-8b18-18c92ff02c6d",
    furl: "https://test.payu.in/admin/test_response",
    lastname: "soni",
    // service_provider: "payu_paisa"
  };
  let salt = "pHEp8ohtYEZK6DUdkxQ4dP8tKCbVw28I" ; //Your organization's data cannot be pasted here. //await fetch("https://payu.0xcti.tech/api/getSalt/"+data.key);
  
  let hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`;
  data.hash = await sha512(hashString)

  console.log(salt)
  var handlers = {
    responseHandler: function (BOLT) {
      console.log(JSON.stringify(BOLT.response))
      if (BOLT.response.txnStatus == "SUCCESS") {
        console.log(`Print success response`);
      }
      if (BOLT.response.txnStatus == "FAILED") {
        console.log("Payment failed. Please try again.");
      }
      if (BOLT.response.txnStatus == "CANCEL") {
        console.log("Payment failed. Please try again.");
      }
    },
    
  };
  bolt.launch(data, handlers);
});
