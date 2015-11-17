angular.module('didacticMeowApp').controller('selectionCtrl',function($scope, selectionRef, selectionService, $firebaseArray){
  $scope.patients = $firebaseArray(selectionRef);
  $scope.newPatient = {};
  $scope.newPatient.breed = '';
  $scope.newPatient.dateAdded = Date.now();
  $scope.newPatient.species = 'dog';
  $scope.newPatient.speciesThumb = 'static/dog.svg'
  $scope.speciesIndex = 0;
  $scope.fileChanged = function() {
    var reader = new FileReader();
    var imgFileInput = document.getElementById('file-upload');
    var imgFile = imgFileInput.files[0];
    reader.readAsDataURL(imgFile);
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
      photograph: $scope.newPatient.photograph
    });
    $scope.patients.$add({
      Name: $scope.newPatient.Name,
      dateAdded: Date.now(),
      owner: $scope.newPatient.owner,
      breed: $scope.newPatient.breed,
      species: $scope.newPatient.species,
      speciesThumb: $scope.newPatient.speciesThumb,
      photograph: $scope.newPatient.photograph
    }).then(function(resolve){
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
    if($scope.speciesIndex < selectionService.speciesList.length - 1){
      $scope.speciesIndex++;
    } else {
      $scope.speciesIndex = 0;
    }
    console.log(Object.keys(selectionService.speciesList[$scope.speciesIndex]));
    $scope.newPatient.species = Object.keys(selectionService.speciesList[$scope.speciesIndex]);
    $scope.newPatient.speciesThumb = selectionService.speciesList[$scope.speciesIndex][Object.keys(selectionService.speciesList[$scope.speciesIndex])];
    console.log($scope.newPatient.speciesThumb)
  }
})
