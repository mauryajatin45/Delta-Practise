
fetch('https://api.tomorrow.io/v4/weather/forecast?location=new%20york&apikey=AlhflQbjd5mlQA7eCgFriQ7rgh238IqN')
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));