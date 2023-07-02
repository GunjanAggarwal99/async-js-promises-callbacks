// Import stylesheets
import './style.css';

// Write Javascript code!
const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (options) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      options
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done!');
    }, duration);
  });
  return promise;
};

async function trackUserHandling() {
  //async simply create promise for us
  let posData;
  let setTimerData;
  try {
    posData = await getPosition();
    setTimerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  console.log(setTimerData, posData);
}

function trackUserHandler() {
  let positionData;
  getPosition()
    .then((posData) => {
      positionData = posData;
      return setTimer(2000);
    })
    .catch((err) => {
      // if there is error then it will cancel the then() block n find first catch() , after all then() block will excecute,so its better to check catch() after all the then() block;
      console.log(err);
      return 'on going ....';
    })
    .then((data) => {
      console.log(data, positionData);
    });

  // navigator.geolocation.getCurrentPosition(
  //   (posData) => {
  //     setTimer(2000).then((data) => {
  //       console.log(data, posData);
  //     });

  // setTimeout(() => {
  //   console.log(posData);
  // }, 2000);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  setTimer(1000).then(() => {
    console.log('time finish');
  });
  // setTimeout(() => {
  //   console.log('Timer finish!');
  // }, 0);
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandling);

// Promise.race([getPosition(), setTimer(2000)]).then((data) => {
//   console.log(data);
// });
// Promise.all([getPosition(), setTimer(2000)]).then((dataLoad) => {
//   console.log(dataLoad);
// });
Promise.allSettled([getPosition(), setTimer(2000)]).then((dataLoad) => {
  console.log(dataLoad);
});

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
