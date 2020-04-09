$(document).ready(function() {
  var foundsubmitbtn = document.getElementById("foundsubmitbtn");
  var petname = document.querySelector("pet-name");
  var pettype = document.querySelector("pet_type");
  var description = document.querySelector("description");
  var color = document.querySelector("color");
  var sex = document.querySelector("sex");
  var date = document.querySelector("date-found");
  var foundlocation = document.querySelector("lastseen");
  var imagelink = document.querySelector("photo");

  foundsubmitbtn.addEventListener("click", function(event) {
    console.log("found button clicked"); //this is logging
    event.preventDefault();

    var foundPet = {
      petname: petname.value,
      pettype: pettype.value,
      description: description.value,
      color: color.value,
      sex: sex.value,
      date: date.value,
      foundlocation: foundlocation.value,
      imagelink: imagelink.value
    };

    console.log(foundPet);
    console.log("foundPetdata");

    if (
      !foundPet.petname ||
      !foundPet.pettype ||
      !foundPet.description ||
      !foundPet.color ||
      !foundPet.sex ||
      !foundPet.date ||
      !foundPet.lostlocation ||
      !foundPet.imagelink
    ) {
      console.log("FOUND Pet DATA");
      return;
    }
    enterfoundpet(
      foundPet.petname,
      foundPet.pettype,
      foundPet.description,
      foundPet.petcolor,
      foundPet.petsex,
      foundPet.datelastseen,
      foundPet.lostlocation
    );
  });

  function enterfoundpet(
    petname,
    pettype,
    description,
    petcolor,
    petsex,
    datelastseen,
    foundlocation,
    imagelink
  ) {
    console.log("found pet entered");
    $.post("api/lostpet", {
      petname: petname,
      pettype: pettype,
      description: description,
      petcolor: petcolor,
      petsex: petsex,
      datelastseen: datelastseen,
      foundlocation: foundlocation,
      imagelink: imagelink
    })
      .then(function(response) {
        location.reload();
        console.log(response, "added found pet");
      })
      .catch(handleAddedErr);
  }
  function handleAddedErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
