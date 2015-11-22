angular.module('didacticMeowApp').controller('selectionCtrl',function($scope, selectionRef, selectionService, $firebaseArray){
  //selection ref has been passed in
  //setup a firebase array from selection Ref
  $scope.patients = $firebaseArray(selectionRef);
  //new patient object
  $scope.newPatient = {};
  //add breed to newPatient (empty)
  $scope.newPatient.breed = '';
  //add current date to newPatient
  $scope.newPatient.dateAdded = Date.now();
  //add species to newPatient, default to dog
  $scope.newPatient.species = 'dog';
  //add path for dog icon
  $scope.newPatient.speciesThumb = 'static/dog.svg'
  //initialize species index
  $scope.speciesIndex = 0;
  //emit a 'patientSelected' event up scope
  $scope.selectPatient = function(id){
      $scope.$emit('patientSelected', {
        data: id
      });
  }
  //get the file
  $scope.fileChanged = function() {
    //create a new FileReader object
    var reader = new FileReader();
    //select the image input
    var imgFileInput = document.getElementById('file-upload');
    //select the file that has been uploade
    var imgFile = imgFileInput.files[0];
    //pass the image file into the reader object's readasdataurl method
    reader.readAsDataURL(imgFile);
    //when the reader is loaded, put the image in the newpatient object on the scope
    reader.onload = function(e) {
        $scope.$apply(function() {
            $scope.newPatient.photograph = reader.result;
            console.log($scope.newPatient.photograph)
        });
    };
  };
  $scope.addNewPatient = function(){
    console.log({
      Name: $scope.newPatient.Name,
      dateAdded: Date.now(),
      owner: $scope.newPatient.owner,
      breed: $scope.newPatient.breed,
      species: $scope.newPatient.species,
      speciesThumb: $scope.newPatient.speciesThumb,
      photograph: $scope.newPatient.photograph,
      enteredBy: $scope.authObj.uid
    });
    //add the newpatient object to the firebase array
    $scope.patients.$add({
      Name: $scope.newPatient.Name,
      dateAdded: Date.now(),
      owner: $scope.newPatient.owner,
      breed: $scope.newPatient.breed,
      species: $scope.newPatient.species,
      speciesThumb: $scope.newPatient.speciesThumb,
      photograph: $scope.newPatient.photograph,
      internalId: Math.floor(Math.random() * 100000),
      enteredBy: $scope.authObj.uid
    }).then(function(resolve){
      //empty the newpatient object
      console.log(resolve);
      $scope.newPatient.Name = '';
      $scope.newPatient.owner = '';
      $scope.newPatient.breed = '';
      $scope.newPatient.dateAdded = Date.now();
      $scope.newPatient.species = 'dog';
      $scope.newPatient.speciesThumb = 'static/dog.svg'
      $scope.newPatient.photograph = '';
      document.getElementById('file-upload').files[0] = '';
      $scope.speciesIndex = 0;
    })
  }
  $scope.changeSpecies = function(){
    //change the species selected on the newPatient object
    if($scope.speciesIndex < selectionService.speciesList.length - 1){
      $scope.speciesIndex++;
    } else {
      $scope.speciesIndex = 0;
    }
    console.log(Object.keys(selectionService.speciesList[$scope.speciesIndex]));
    //weird fancy object decomposition
    $scope.newPatient.species = Object.keys(selectionService.speciesList[$scope.speciesIndex]);
    $scope.newPatient.speciesThumb = selectionService.speciesList[$scope.speciesIndex][Object.keys(selectionService.speciesList[$scope.speciesIndex])];
    console.log($scope.newPatient.speciesThumb)
  }
})
