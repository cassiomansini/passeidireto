document.addEventListener('DOMContentLoaded', function () {

  var adContent = document.querySelector('.question.ad');
  adContent.addEventListener("click", openModal);

  var closeModalBtn = document.querySelector('.close-modal');
  closeModalBtn.addEventListener("click", closeModal);

  function openModal(){
    console.log('abrindo modal');
    document.querySelector('.blackout').classList.add('show');
  }

  function closeModal(){
    console.log('fechando modal');
    if(document.querySelector('.blackout').classList.contains('show')){
      document.querySelector('.blackout').classList.remove('show')
    }
  }
});