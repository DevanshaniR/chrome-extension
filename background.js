chrome.runtime.onInstalled.addListener(() => {
  callJenkinsApi();
});

callJenkinsApi = () => {
  fetch("http://localhost:8080/api/json?tree=jobs[name,color]")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.jobs);
      chrome.storage.sync.set({ jenkinsData: data.jobs });
    });
};

chrome.tabs.onUpdated.addListener(function(id,changeInfo,tab){
    console.log("call tabs");
    callJenkinsApi();
})
