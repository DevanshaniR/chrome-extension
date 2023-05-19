chrome.notifications.create(`my-notification-${Date.now()}`, {
  type: "basic",
  iconUrl: "icon.png",
  title: "Jenkins build status check",
  message: "succesfully checked for all jobs",
});

function updatePopup() {
  console.log("DOM loaded");
  chrome.storage.sync.get(["jenkinsData"], function (data) {
    var jobs = data.jenkinsData;
    var table = document.createElement("table");
    var th1 = document.createElement("th");
    th1.innerHTML = "Job";
    var th2 = document.createElement("th");
    th2.innerHTML = "Status";
    table.appendChild(th1);
    table.appendChild(th2);
    for (var i = 0; i < jobs.length; i++) {
      var tr = document.createElement("tr");

      var td1 = document.createElement("td");
      var td2 = document.createElement("td");

      var text1 = document.createTextNode(jobs[i].name);
      var status = "not built";
      if (jobs[i].color == "red") {
        status = "Failed";
      } else if (jobs[i].color == "blue") {
        status = "Success";
      }

      var text2 = document.createTextNode(status);

      td1.appendChild(text1);
      td2.appendChild(text2);
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }
    document.body.appendChild(table);
  });
}
document.addEventListener("DOMContentLoaded", updatePopup);
