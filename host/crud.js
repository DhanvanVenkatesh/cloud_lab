var rollV, nameV, genderV, addressV;

function readForm() {
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  genderV = document.getElementById("gender").value;
  addressV = document.getElementById("address").value;
  console.log(rollV, nameV, genderV, addressV);
}

document.getElementById("insert").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .set({
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
    })
    .then(function () {
      alert("Data Inserted");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    })
    .catch(function (error) {
      console.error("Error inserting data:", error);
    });
};

document.getElementById("read").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .once("value")
    .then(function (snap) {
      if (snap.exists()) {
        document.getElementById("roll").value = snap.val().rollNo;
        document.getElementById("name").value = snap.val().name;
        document.getElementById("gender").value = snap.val().gender;
        document.getElementById("address").value = snap.val().address;
      } else {
        alert("Data not found");
      }
    })
    .catch(function (error) {
      console.error("Error reading data:", error);
    });
};

document.getElementById("update").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .update({
      name: nameV,
      gender: genderV,
      address: addressV,
    })
    .then(function () {
      alert("Data Updated");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    })
    .catch(function (error) {
      console.error("Error updating data:", error);
    });
};

document.getElementById("delete").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .remove()
    .then(function () {
      alert("Data Deleted");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    })
    .catch(function (error) {
      console.error("Error deleting data:", error);
    });
};
